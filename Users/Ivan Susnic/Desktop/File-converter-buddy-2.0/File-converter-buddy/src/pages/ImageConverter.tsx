import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalFileUpload } from '@/components/UniversalFileUpload';
import { ImagePreview } from '@/components/ImagePreview';
import { SmartFormatSelector } from '@/components/SmartFormatSelector';
import { ConversionControls } from '@/components/ConversionControls';
import { Button } from '@/components/ui/button';
import { ImageUpload, ImageFormat } from '@/components/ImageUpload';
import { 
  ConversionFile, 
  convertImage, 
  createPreviewUrl, 
  downloadBlob, 
  getFileExtension, 
  generateConvertedFilename 
} from '@/utils/imageConverter';
import { downloadMultipleFilesAsZip } from '@/utils/zipDownload';
import { toast } from 'sonner';
import { Zap, Image as ImageIcon, Upload, Download, X, RefreshCw, Play, Video, Music, Package } from 'lucide-react';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ImageConverter = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>('png');
  const [isConverting, setIsConverting] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const conversionFiles: ConversionFile[] = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: createPreviewUrl(file),
      progress: 0,
      status: 'pending' as const
    }));
    
    setFiles(prev => [...prev, ...conversionFiles]);
    toast.success(`Added ${newFiles.length} image(s) for conversion`);
  }, []);

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
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const handleStartConversion = useCallback(async () => {
    if (files.length === 0) return;
    
    setIsConverting(true);
    setOverallProgress(0);
    
    try {
      const totalFiles = files.length;
      let completedFiles = 0;
      
      // Convert files in parallel with progress tracking
      const conversions = files.map(async (file, index) => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'converting', progress: 0 } : f
        ));
        
        try {
          const converted = await convertImage(file.file, selectedFormat);
          
          setFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'completed', progress: 100, converted }
              : f
          ));
          
          completedFiles++;
          setOverallProgress((completedFiles / totalFiles) * 100);
          
        } catch (error) {
          console.error(`Failed to convert ${file.file.name}:`, error);
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'error', progress: 0 } : f
          ));
        }
      });
      
      await Promise.all(conversions);
      toast.success(`Conversion complete! ${completedFiles} files converted.`);
      
    } catch (error) {
      toast.error('Conversion failed. Please try again.');
      console.error('Conversion error:', error);
    } finally {
      setIsConverting(false);
    }
  }, [files, selectedFormat]);

  const handleDownloadFile = useCallback((file: ConversionFile) => {
    if (!file.converted) return;
    
    const filename = generateConvertedFilename(file.file.name, selectedFormat);
    downloadBlob(file.converted, filename);
    toast.success(`Downloaded ${filename}`);
  }, [selectedFormat]);

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
      toast.success(`Downloaded ${completedFiles.length} images as organized ZIP`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download files. Please try again.');
    }
  }, [files, selectedFormat, handleDownloadFile]);

  const handleReset = useCallback(() => {
    setFiles(prev => {
      prev.forEach(file => URL.revokeObjectURL(file.preview));
      return [];
    });
    setSelectedFormat('png');
    setIsConverting(false);
    setOverallProgress(0);
    toast.success('Cleared all images');
  }, []);

  return (
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
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                <span>All Formats</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span>Bulk Convert</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Upload className="h-4 w-4" />
                <span>High Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-6 py-12">
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
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-xl font-semibold mb-6 animate-fade-in-up delay-300">Choose Your Tool</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/images')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-blue-500/20 bg-blue-500/10 animate-fade-in-up"
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
                    Supports PNG, JPEG, WebP, TIFF, BMP, GIF and other image formats
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
  );
};

export default ImageConverter;
