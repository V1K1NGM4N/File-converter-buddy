import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { trackConversion, trackDownload } from '@/utils/conversionTracker';
import { convertVideo, VideoFormat, needsConversion } from '@/utils/videoConverter';
import { SEOHead } from '@/components/SEOHead';
import { 
  Video, 
  Download, 
  X, 
  RefreshCw, 
  ArrowLeft,
  Play,
  Zap,
  Upload,
  Image as ImageIcon,
  Music,
  Package,
  Clock,
  ChevronDown
} from 'lucide-react';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { SmartFormatSelector } from '@/components/SmartFormatSelector';
import { ConversionControls } from '@/components/ConversionControls';
import { generateConvertedFilename } from '@/utils/imageConverter';
import { downloadMultipleFilesAsZip } from '@/utils/zipDownload';
import { useFilePersistence } from '@/hooks/useFilePersistence';
import { detectFileType } from '@/utils/fileTypeDetector';

interface ConversionFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  converted?: Blob;
}

const VideoConverter = () => {
  const navigate = useNavigate();
  const { files, updateFiles, clearFiles } = useFilePersistence('videoConverterFiles');
  const [selectedFormat, setSelectedFormat] = useState<string>('avi');
  const [isConverting, setIsConverting] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);


  const handleFilesSelected = useCallback((newFiles: File[]) => {
    // Debug logging
    console.log('Selected format:', selectedFormat);
    console.log('New files:', newFiles.map(f => ({ name: f.name, type: f.type })));
    
    // Always add files first, then let user choose format
    const conversionFiles: ConversionFile[] = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: '', // Will be set by the persistence hook
      progress: 0,
      status: 'pending' as const
    }));
    
    updateFiles([...files, ...conversionFiles]);
    toast.success(`Added ${newFiles.length} video(s) for conversion`);
  }, [files, updateFiles]);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'video/*';
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
    
    // Check if any files are already in the target format
    const alreadyInTargetFormat = files.filter(file => {
      const needsConv = needsConversion(file.file, selectedFormat as VideoFormat);
      console.log(`File ${file.file.name}: needs conversion = ${needsConv}`);
      return !needsConv;
    });
    
    if (alreadyInTargetFormat.length > 0) {
      toast.warning(`${alreadyInTargetFormat.length} file(s) are already in ${selectedFormat.toUpperCase()} format and will be skipped`);
    }
    
    const filesToConvert = files.filter(file => {
      return needsConversion(file.file, selectedFormat as VideoFormat);
    });
    
    console.log('Files to convert:', filesToConvert.length);
    
    if (filesToConvert.length === 0) {
      toast.info('No files need conversion - all files are already in the target format');
      setIsConverting(false);
      return;
    }
    
    setIsConverting(true);
    setOverallProgress(0);
    
    try {
      const totalFiles = filesToConvert.length;
      let completedFiles = 0;
      
      let currentFiles = [...files];
      const conversions = filesToConvert.map(async (file) => {
        currentFiles = currentFiles.map(f => 
          f.id === file.id ? { ...f, status: 'converting', progress: 0 } : f
        );
        updateFiles(currentFiles);
        
        // Simulate conversion progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          currentFiles = currentFiles.map(f => 
            f.id === file.id ? { ...f, progress: i } : f
          );
          updateFiles(currentFiles);
        }
        
        // Convert the video using FFmpeg
        console.log(`Starting conversion: ${file.file.name} -> ${selectedFormat}`);
        try {
          const converted = await convertVideo(file.file, selectedFormat as VideoFormat, {
            quality: 'medium',
            resolution: 'original'
          });
          console.log(`Conversion completed: ${file.file.name} -> ${selectedFormat}`, converted);
          
          currentFiles = currentFiles.map(f => 
            f.id === file.id 
              ? { ...f, status: 'completed', progress: 100, converted }
              : f
          );
          updateFiles(currentFiles);
        } catch (conversionError) {
          console.error(`Conversion failed for ${file.file.name}:`, conversionError);
          currentFiles = currentFiles.map(f => 
            f.id === file.id 
              ? { ...f, status: 'error', progress: 0 }
              : f
          );
          updateFiles(currentFiles);
          throw conversionError; // Re-throw to be caught by outer try-catch
        }
        
        completedFiles++;
        setOverallProgress((completedFiles / totalFiles) * 100);
      });
      
      await Promise.all(conversions);
      
      // Track successful conversions
      const successfulConversions = currentFiles.filter(f => f.status === 'completed').length;
      if (successfulConversions > 0) {
        trackConversion('videos', successfulConversions);
      }
      
      toast.success(`Conversion complete! ${completedFiles} videos converted.`);
      
    } catch (error) {
      toast.error('Conversion failed. Please try again.');
      console.error('Conversion error:', error);
    } finally {
      setIsConverting(false);
    }
  }, [files, selectedFormat]);

  const handleDownloadFile = useCallback((file: ConversionFile) => {
    if (!file.converted) return;
    
    const newName = generateConvertedFilename(file.file.name, selectedFormat);
    
    // Detect if we're on Mac/Safari for compatibility
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isMac && isSafari) {
      // Safari on Mac requires a different approach
      try {
        const url = URL.createObjectURL(file.converted);
        const link = document.createElement('a');
        link.href = url;
        link.download = newName;
        link.style.display = 'none';
        
        // Add to DOM temporarily
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      } catch (error) {
        // Fallback: try opening in new window
        const url = URL.createObjectURL(file.converted);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } else {
      // Standard approach for other browsers
      const url = URL.createObjectURL(file.converted);
      const a = document.createElement('a');
      a.href = url;
      a.download = newName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    
    // Track download event
    trackDownload('videos', 1, 'single');
    
    toast.success(`Downloaded ${newName}`);
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
        name: generateConvertedFilename(file.file.name, selectedFormat),
        blob: file.converted!,
        folder: 'Converted Videos'
      }));
      
      // Create timestamped ZIP filename
      const now = new Date();
      const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const time = now.toTimeString().slice(0, 5); // HH:MM
      const zipFilename = `FileConverterBuddyDownload - ${date} ${time}.zip`;
      
      await downloadMultipleFilesAsZip(filesForZip, zipFilename, true);
      
      // Track bulk download event
      trackDownload('videos', completedFiles.length, 'zip');
      
      toast.success(`Downloaded ${completedFiles.length} videos as organized ZIP`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download files. Please try again.');
    }
  }, [files, selectedFormat, handleDownloadFile]);

  const handleReset = useCallback(() => {
    files.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });
    clearFiles();
    setOverallProgress(0);
    toast.success('Cleared all files');
  }, [files, clearFiles]);

  return (
    <>
      <SEOHead
        title="Video File Converter"
        description="Convert videos between MP4, AVI, MOV, MKV, WebM and more formats. Free online video converter with high quality output and no file size limits."
        keywords="video converter, mp4 converter, avi to mp4, video format converter, free video converter, online video converter"
        canonicalUrl="https://fileconverterbuddy.com/video"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Video File Converter",
          "description": "Free online video format converter",
          "url": "https://fileconverterbuddy.com/video",
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
                Video <span className="text-primary">File Converter</span>
              </h1>
              <p className="text-muted-foreground text-sm">Convert videos between formats with ease</p>
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
              className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-purple-500/20 bg-purple-500/10 animate-fade-in-up"
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
              className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-green-500/20 bg-green-500/10 animate-fade-in-up"
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
              className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-orange-500/20 bg-orange-500/10 animate-fade-in-up"
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
                accept="video/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  handleFilesSelected(files);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Upload className="h-8 w-8" />
                  <Video className="h-8 w-8" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Upload Video Files
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your video files here, or click to select files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP4, AVI, MOV, WebM formats (browser-compatible conversion)
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
              onFormatChange={setSelectedFormat}
            />
          )}
          
          {/* Conversion Controls */}
          {files.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {files.length} video{files.length !== 1 ? 's' : ''} ready for conversion
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
          
          {/* Video Preview Grid */}
          {files.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <Card key={file.id} className="overflow-hidden hover:shadow-glow transition-all duration-300 bg-gradient-card shadow-card border-border/50">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
                      <video
                        src={file.preview}
                        className="w-full h-full object-cover"
                        controls={false}
                        muted
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Status Overlay */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium">
                          {file.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate flex-1 mr-2">
                          {file.file.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Size: {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                      
                      {file.status === 'converting' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Converting...</span>
                            <span>{file.progress}%</span>
                          </div>
                          <Progress value={file.progress} />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          → .{selectedFormat}
                        </span>
                        
                        <Button
                          onClick={() => handleDownloadFile(file)}
                          disabled={file.status !== 'completed' || !file.converted}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      {file.status === 'error' && (
                        <div className="text-sm text-destructive">
                          Conversion failed
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Add More Files Button */}
          {files.length > 0 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleFileUpload}
                className="hover:shadow-glow"
              >
                Add More Videos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default VideoConverter;