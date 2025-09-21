import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalFileUpload } from '@/components/UniversalFileUpload';
import { ImagePreview } from '@/components/ImagePreview';
import { SmartFormatSelector } from '@/components/SmartFormatSelector';
import { ConversionControls } from '@/components/ConversionControls';
import { Button } from '@/components/ui/button';
import { ImageUpload, ImageFormat } from '@/components/ImageUpload';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SEOHead } from '@/components/SEOHead';
import { 
  ConversionFile, 
  convertImage, 
  createPreviewUrl, 
  downloadBlob, 
  getFileExtension, 
  generateConvertedFilename,
  getMimeType
} from '@/utils/imageConverter';
import { downloadMultipleFilesAsZip } from '@/utils/zipDownload';
import { trackConversion, trackDownload } from '@/utils/conversionTracker';
import { isHEICSupported } from '@/utils/imageConverter';
import { trackUserConversion } from '@/utils/userConversionTracker';
import { toast } from 'sonner';
import { Zap, Image as ImageIcon, Upload, Download, X, RefreshCw, Play, Video, Music, Package, ChevronDown } from 'lucide-react';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useFilePersistence } from '@/hooks/useFilePersistence';

const ImageConverter = () => {
  const navigate = useNavigate();
  const { files, updateFiles, clearFiles } = useFilePersistence('imageConverterFiles');
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>('png');
  const [isConverting, setIsConverting] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  // Helper function to check if file is a reliable image format
  const isReliableImageFormat = (file: File): boolean => {
    const reliableTypes = [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
      'image/heic',
      'image/heif'
    ];
    
    const reliableExtensions = [
      '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg', '.heic', '.heif'
    ];
    
    // File size limits (50MB for HEIC, 20MB for others)
    const maxFileSize = 50 * 1024 * 1024; // 50MB
    const maxRegularFileSize = 20 * 1024 * 1024; // 20MB
    
    // Check file size first
    const isHeicFile = file.type === 'image/heic' || file.type === 'image/heif' || 
                      file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
    
    if (isHeicFile && file.size > maxFileSize) {
      console.log(`❌ HEIC file too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max: 50MB)`);
      return false;
    } else if (!isHeicFile && file.size > maxRegularFileSize) {
      console.log(`❌ File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max: 20MB)`);
      return false;
    }
    
    // Check MIME type
    if (reliableTypes.includes(file.type)) {
      return true;
    }
    
    // Check file extension (fallback for when MIME type is wrong)
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (reliableExtensions.includes(extension)) {
      return true;
    }
    
    return false;
  };

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    console.log('📁 handleFilesSelected called with', newFiles.length, 'files');
    newFiles.forEach(file => {
      console.log('📄 File:', file.name, 'Type:', file.type, 'Size:', file.size);
    });
    
    // Filter to only reliable formats
    const reliableFiles = newFiles.filter(isReliableImageFormat);
    const rejectedFiles = newFiles.filter(file => !isReliableImageFormat(file));
    
    console.log('✅ Reliable files:', reliableFiles.length, 'Rejected files:', rejectedFiles.length);
    
    if (rejectedFiles.length > 0) {
      console.log('❌ Rejected files:', rejectedFiles.map(f => `${f.name} (${f.type})`));
      const hasLargeFiles = rejectedFiles.some(f => f.size > 20 * 1024 * 1024);
      const hasHeicFiles = rejectedFiles.some(f => f.type === 'image/heic' || f.type === 'image/heif' || f.name.toLowerCase().endsWith('.heic') || f.name.toLowerCase().endsWith('.heif'));
      
      if (hasLargeFiles) {
        toast.error(`Skipped ${rejectedFiles.length} file(s). File size limit: 20MB (50MB for HEIC files). Only JPEG, PNG, WebP, GIF, BMP, SVG, and HEIC are supported.`);
      } else {
        toast.error(`Skipped ${rejectedFiles.length} unsupported file(s). Only JPEG, PNG, WebP, GIF, BMP, SVG, and HEIC are supported.`);
      }
    }
    
    if (reliableFiles.length === 0) {
      return;
    }
    
    const conversionFiles: ConversionFile[] = reliableFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: '', // Will be set by the persistence hook
      progress: 0,
      status: 'pending' as const
    }));
    
    console.log('🔄 Calling updateFiles with', conversionFiles.length, 'conversion files');
    updateFiles([...files, ...conversionFiles]);
    toast.success(`Added ${reliableFiles.length} image(s) for conversion`);
  }, [files, updateFiles]);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      handleFilesSelected(files);
    };
    input.click();
  };

  const handleRemoveFile = useCallback((id: string) => {
    const file = files.find(f => f.id === id);
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    updateFiles(files.filter(f => f.id !== id));
  }, [files, updateFiles]);

  const handleStartConversion = useCallback(async () => {
    if (files.length === 0) return;
    
    // Check for HEIC files and browser support
    const heicFiles = files.filter(f => 
      f.file.type === 'image/heic' || f.file.type === 'image/heif' || 
      f.file.name.toLowerCase().endsWith('.heic') || f.file.name.toLowerCase().endsWith('.heif')
    );
    
    if (heicFiles.length > 0 && !isHEICSupported()) {
      toast.error('HEIC conversion is not supported in your browser. Please try Chrome, Firefox, or Safari.');
      return;
    }
    
    setIsConverting(true);
    setOverallProgress(0);
    
    try {
      const totalFiles = files.length;
      let completedFiles = 0;
      let failedFiles = 0;
      let currentFiles = [...files];
      
      // Convert files in parallel with progress tracking
      const conversions = files.map(async (file, index) => {
        // Update status to converting
        currentFiles = currentFiles.map(f => 
          f.id === file.id ? { ...f, status: 'converting', progress: 0 } : f
        );
        updateFiles(currentFiles);
        
        // Add a small delay to ensure UI updates are visible
        await new Promise(resolve => setTimeout(resolve, 100));
        
        try {
          const converted = await convertImage(file.file, selectedFormat);
          
          // Update status to completed
          currentFiles = currentFiles.map(f => 
            f.id === file.id 
              ? { ...f, status: 'completed', progress: 100, converted }
              : f
          );
          updateFiles(currentFiles);
          
          completedFiles++;
          setOverallProgress((completedFiles / totalFiles) * 100);
          
        } catch (error) {
          console.error(`Failed to convert ${file.file.name}:`, error);
          // Update status to error
          currentFiles = currentFiles.map(f => 
            f.id === file.id ? { ...f, status: 'error', progress: 0 } : f
          );
          updateFiles(currentFiles);
          failedFiles++;
        }
      });
      
      // Wait for all conversions to complete, but don't fail if some fail
      await Promise.allSettled(conversions);
      
      // Track successful conversions and show messages
      const successfulConversions = currentFiles.filter(f => f.status === 'completed').length;
      if (successfulConversions > 0) {
        // Track global conversions
        trackConversion('images', successfulConversions);
        
        // Track user-specific conversions
        if (user?.id) {
          trackUserConversion(user.id, 'images', successfulConversions);
        }
      }
      
      // Show appropriate success/error message
      if (failedFiles === 0) {
        // Check if any files were already in target format
        const alreadyInFormat = files.filter(f => f.file.type === getMimeType(selectedFormat));
        if (alreadyInFormat.length > 0 && alreadyInFormat.length === files.length) {
          toast.success(`Files are already in ${selectedFormat.toUpperCase()} format! Ready for download.`);
        } else {
          toast.success(`Conversion complete! ${completedFiles} files converted.`);
        }
      } else if (completedFiles > 0) {
        toast.warning(`Conversion completed with issues. ${completedFiles} files converted, ${failedFiles} failed.`);
      } else {
        toast.error('All conversions failed. Please check your files and try again.');
      }
      
    } catch (error) {
      console.error('Outer conversion error:', error);
      console.error('Failed files count:', failedFiles);
      console.error('Completed files count:', completedFiles);
      
      // Only show error if no files were actually converted
      if (completedFiles === 0) {
        toast.error('Conversion failed. Please try again.');
      } else {
        // Some files converted successfully, show warning instead
        toast.warning(`Conversion completed with issues. ${completedFiles} files converted, ${failedFiles} failed.`);
      }
    } finally {
      setIsConverting(false);
    }
  }, [files, selectedFormat, updateFiles]);

  const handleDownloadFile = useCallback((file: ConversionFile) => {
    if (!file.converted) return;
    
    const filename = generateConvertedFilename(file.file.name, selectedFormat);
    downloadBlob(file.converted, filename);
    
    // Track download event
    trackDownload('images', 1, 'single');
    
    toast.success(`Downloaded ${filename}`);
  }, [selectedFormat]);

  const ProtectedDownloadButton = ({ file, children }: { file: ConversionFile, children: React.ReactNode }) => {
    return (
      <button onClick={() => handleDownloadFile(file)}>
        {children}
      </button>
    );
  };

  const handleDownloadAll = useCallback(async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.converted);
    if (completedFiles.length === 0) return;
    
    if (completedFiles.length === 1) {
      handleDownloadFile(completedFiles[0]);
      return;
    }
    
    try {
      // Prepare files for ZIP download with organized structure
      const filesForZip = completedFiles.map(file => ({
        name: generateConvertedFilename(file.file.name, getFileExtension(selectedFormat)),
        blob: file.converted!,
        folder: 'Converted Images'
      }));
      
      // Create timestamped ZIP filename
      const now = new Date();
      const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const time = now.toTimeString().slice(0, 5); // HH:MM
      const zipFilename = `FileConverterBuddyDownload - ${date} ${time}.zip`;
      
      await downloadMultipleFilesAsZip(filesForZip, zipFilename, true);
      
      // Track bulk download event
      trackDownload('images', completedFiles.length, 'zip');
      
      toast.success(`Downloaded ${completedFiles.length} images as organized ZIP`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download files. Please try again.');
    }
  }, [files, selectedFormat, handleDownloadFile]);

  const handleReset = useCallback(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    clearFiles();
    setSelectedFormat('png');
    setIsConverting(false);
    setOverallProgress(0);
    toast.success('Cleared all images');
  }, [files, clearFiles]);

  return (
    <>
      <SEOHead
        title="Image File Converter"
        description="Convert images between JPG, PNG, WebP, GIF, BMP, TIFF and more formats. Free online image converter with no file size limits and secure processing."
        keywords="image converter, jpg to png, png to jpg, webp converter, image format converter, free image converter"
        canonicalUrl="https://fileconverterbuddy.com/images"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Image File Converter",
          "description": "Free online image format converter",
          "url": "https://fileconverterbuddy.com/images",
          "applicationCategory": "UtilityApplication"
        }}
      />
      <div className="min-h-screen bg-background">
      {/* Global Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="animate-fade-in">
                <AnimatedFileType />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  File Converter <span className="text-primary">Buddy</span>
                </h1>
                <p className="text-muted-foreground text-xs">Convert files with ease</p>
              </div>
            </button>
            
            <div className="flex items-center space-x-6">
              {/* Blog Link */}
              <button 
                onClick={() => navigate('/blog')}
                className="text-sm text-primary font-medium"
              >
                Blog
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-6 py-6 sm:py-12">
          <div className="flex items-center space-x-4">
            <div className="animate-fade-in">
              <AnimatedFileType />
            </div>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold">
                Image <span className="text-primary">File Converter</span>
              </h1>
              <p className="text-muted-foreground text-sm">Convert images between formats with ease</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Navigation */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4 sm:py-8">
          {/* Desktop Tool Navigation */}
          <div className="hidden sm:block">
            <h2 className="text-xl font-semibold mb-6 animate-fade-in-up delay-300">Choose Your Tool</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/images')}
              className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-blue-500/20 bg-blue-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Image File Converter</span>
                    <span className="md:hidden">Images</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, WebP and more
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/video')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-purple-500/20 bg-purple-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <Video className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Video File Converter</span>
                    <span className="md:hidden">Video</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    MP4, AVI, MOV and more
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/audio')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-green-500/20 bg-green-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <Music className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Audio File Converter</span>
                    <span className="md:hidden">Audio</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    MP3, WAV, FLAC and more
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/product-feed-image-downloader')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-orange-500/20 bg-orange-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.7s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-6 w-6 text-orange-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Product Feed Image Downloader</span>
                    <span className="md:hidden">Product Feed</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Easily download product feed images in the format you need
                  </p>
                </div>
              </div>
            </button>
            </div>
          </div>
          
          {/* Mobile Collapsible Tool Navigation */}
          <Collapsible className="block sm:hidden">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Choose Your Tool</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => navigate('/images')}
                  className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-blue-500/20 bg-blue-500/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                      <ImageIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Images</h3>
                      <p className="text-sm text-muted-foreground">JPG, PNG, WebP and more</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/video')}
                  className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-purple-500/20 bg-purple-500/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                      <Video className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Video</h3>
                      <p className="text-sm text-muted-foreground">MP4, AVI, MOV and more</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/audio')}
                  className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-green-500/20 bg-green-500/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                      <Music className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Audio</h3>
                      <p className="text-sm text-muted-foreground">MP3, WAV, FLAC and more</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/product-feed-image-downloader')}
                  className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-orange-500/20 bg-orange-500/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                      <Package className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Product Feed</h3>
                      <p className="text-sm text-muted-foreground">Easily download product feed images in the format you need</p>
                    </div>
                  </div>
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Upload Section */}
          {files.length === 0 && (
            <div className="relative border-2 border-dashed border-border rounded-xl p-8 text-center transition-all duration-300 bg-gradient-upload shadow-upload hover:border-primary/50 hover:shadow-glow">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  handleFilesSelected(files);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Upload className="h-8 w-8" />
                  <ImageIcon className="h-8 w-8" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Upload Image Files
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your image files here, or click to select files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports PNG, JPEG, WebP, GIF, BMP, SVG, HEIC formats
                  </p>
                </div>
                
                <Button variant="secondary">
                  Choose Files
                </Button>
              </div>
            </div>
          )}
          
          {/* Format Selection */}
          {files.length > 0 && (
            <SmartFormatSelector 
              files={files.map(f => f.file)}
              selectedFormat={selectedFormat}
              onFormatChange={(format) => setSelectedFormat(format as ImageFormat)}
            />
          )}
          
          {/* Conversion Controls */}
          {files.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {files.length} image{files.length !== 1 ? 's' : ''} ready for conversion
                    </h3>
                    <p className="text-muted-foreground">
                      Converting to {selectedFormat.toUpperCase()} format
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleStartConversion}
                      disabled={isConverting}
                      className="hover:shadow-glow"
                    >
                      {isConverting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      {isConverting ? 'Converting...' : 'Start Conversion'}
                    </Button>
                                         {files.some(f => f.status === 'completed') && (
                         <Button
                           onClick={handleDownloadAll}
                           className="hover:shadow-glow bg-green-600 hover:bg-green-700 text-white border-green-600"
                           variant="default"
                         >
                           <Download className="h-4 w-4 mr-2" />
                           Download All
                         </Button>
                     )}
                    <Button variant="outline" onClick={handleReset}>
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
                
                {isConverting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Image Preview Grid */}
          <ImagePreview
            files={files}
            targetFormat={selectedFormat}
            onRemoveFile={handleRemoveFile}
            onDownloadFile={handleDownloadFile}
            fileGroup="images"
            ProtectedDownloadButton={ProtectedDownloadButton}
          />
          
          {/* Add More Files Button */}
          {files.length > 0 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleFileUpload}
                className="hover:shadow-glow"
              >
                Add More Images
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ImageConverter;
