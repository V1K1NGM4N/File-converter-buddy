import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalFileUpload } from '@/components/UniversalFileUpload';
import { SmartFormatSelector } from '@/components/SmartFormatSelector';
import { ConversionControls } from '@/components/ConversionControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { detectFileType, FileCategory } from '@/utils/fileTypeDetector';
import { convertImage, downloadBlob, generateConvertedFilename, getFileExtension, type ImageFormat } from '@/utils/imageConverter';
import { 
  convertPDFToImage, 
  convertPDFToText, 
  convertPDFToHTML,
  convertPDFToMarkdown,
  convertPDFToWord
} from '@/utils/pdfConverter';
import { toast } from 'sonner';
import { FileType, Info, Upload, Zap, Image as ImageIcon, Video, Music, Package } from 'lucide-react';

interface DemoFile {
  id: string;
  file: File;
  fileType: ReturnType<typeof detectFileType>;
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  converted?: Blob;
}

const UniversalConverter = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<DemoFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const demoFiles: DemoFile[] = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      fileType: detectFileType(file),
      progress: 0,
      status: 'pending' as const
    }));
    
    setFiles(prev => [...prev, ...demoFiles]);
    
    // Auto-select the first compatible format
    if (demoFiles.length > 0 && demoFiles[0].fileType) {
      const firstFile = demoFiles[0];
      const compatibleFormats = firstFile.fileType.compatibleFormats;
      if (compatibleFormats.length > 0) {
        setSelectedFormat(compatibleFormats[0]);
      }
    }
    
    toast.success(`Added ${newFiles.length} file(s) for conversion`);
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    setFiles([]);
    setSelectedFormat('');
    setIsConverting(false);
    setOverallProgress(0);
    toast.success('Cleared all files');
  }, []);

  const handleStartConversion = useCallback(async () => {
    if (files.length === 0 || !selectedFormat) return;
    
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
          let converted: Blob;
          
          // Handle different file types
          if (file.fileType?.category === 'image') {
            converted = await convertImage(file.file, selectedFormat as ImageFormat);
          } else if (file.fileType?.category === 'document' && file.file.type === 'application/pdf') {
            // Handle PDF conversions
            if (['png', 'jpeg', 'webp', 'tiff'].includes(selectedFormat)) {
              converted = await convertPDFToImage(file.file, selectedFormat as 'png' | 'jpeg' | 'webp' | 'tiff');
            } else if (selectedFormat === 'txt') {
              converted = await convertPDFToText(file.file);
            } else if (selectedFormat === 'html') {
              converted = await convertPDFToHTML(file.file);
            } else if (selectedFormat === 'md') {
              converted = await convertPDFToMarkdown(file.file);
            } else if (selectedFormat === 'docx') {
              converted = await convertPDFToWord(file.file);
            } else {
              throw new Error(`Unsupported PDF conversion format: ${selectedFormat}`);
            }
          } else {
            throw new Error(`Unsupported file type for conversion`);
          }
          
          // Update file status to completed
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'completed', progress: 100, converted } : f
          ));
          
          completedFiles++;
          setOverallProgress((completedFiles / totalFiles) * 100);
          
        } catch (error) {
          console.error(`Error converting file ${file.file.name}:`, error);
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'error', progress: 0 } : f
          ));
          
          completedFiles++;
          setOverallProgress((completedFiles / totalFiles) * 100);
        }
      });
      
      await Promise.all(conversions);
      
      toast.success('Conversion completed!');
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  }, [files, selectedFormat]);

  const handleDownloadFile = useCallback(async (file: DemoFile) => {
    if (!file.converted) return;
    
    const filename = generateConvertedFilename(file.file.name, selectedFormat);
    downloadBlob(file.converted, filename);
    toast.success(`Downloaded ${filename}`);
  }, [selectedFormat]);

  const handleDownloadAll = useCallback(async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.converted);
    if (completedFiles.length === 0) return;
    
    completedFiles.forEach(file => {
      const filename = generateConvertedFilename(file.file.name, selectedFormat);
      downloadBlob(file.converted!, filename);
    });
    
    toast.success(`Downloaded ${completedFiles.length} file(s)`);
  }, [files, selectedFormat]);

  const getStatusIcon = (status: DemoFile['status']) => {
    switch (status) {
      case 'pending':
        return <Upload className="h-3 w-3 text-muted-foreground" />;
      case 'converting':
        return <Zap className="h-3 w-3 text-blue-500 animate-pulse" />;
      case 'completed':
        return <FileType className="h-3 w-3 text-green-500" />;
      case 'error':
        return <Info className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getFileTypeBadge = (fileType: ReturnType<typeof detectFileType>) => {
    if (!fileType) return <Badge variant="secondary">Unknown</Badge>;
    
    const categoryColors = {
      image: 'bg-blue-100 text-blue-800',
      document: 'bg-green-100 text-green-800',
      video: 'bg-purple-100 text-purple-800',
      audio: 'bg-orange-100 text-orange-800',
      archive: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge 
        variant="secondary" 
        className={categoryColors[fileType.category] || 'bg-gray-100 text-gray-800'}
      >
        {fileType.category}
      </Badge>
    );
  };

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
                <FileType className="h-4 w-4" />
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
                Universal <span className="text-primary">File Converter</span>
              </h1>
              <p className="text-muted-foreground text-sm">Convert any file type to any format instantly</p>
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
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  handleFilesSelected(files);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Upload className="h-8 w-8" />
                  <FileType className="h-8 w-8" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Upload Any File Type
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your files here, or click to select files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports Images, PDFs, Documents, Videos, Audio and other file formats
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
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Select Output Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SmartFormatSelector
                  files={files.map(f => f.file)}
                  selectedFormat={selectedFormat}
                  onFormatChange={setSelectedFormat}
                />
              </CardContent>
            </Card>
          )}
          
          {/* Conversion Controls */}
          {files.length > 0 && (
            <ConversionControls
              files={files.map(f => ({ id: f.id, file: f.file, status: f.status }))}
              isConverting={isConverting}
              overallProgress={overallProgress}
              onStartConversion={handleStartConversion}
              onDownloadAll={handleDownloadAll}
              onReset={handleReset}
            />
          )}
          
          {/* File Preview Grid */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Files to Convert</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) => (
                  <Card key={file.id} className="overflow-hidden bg-gradient-card shadow-card border-border/50">
                    <div className="aspect-square relative overflow-hidden">
                      {file.fileType?.category === 'image' ? (
                        <img
                          src={URL.createObjectURL(file.file)}
                          alt={file.file.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/50">
                          <FileType className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => handleRemoveFile(file.id)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                        {getStatusIcon(file.status)}
                        <span className="text-xs font-medium">
                          {file.status}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm truncate" title={file.file.name}>
                          {file.file.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          {getFileTypeBadge(file.fileType)}
                          <span className="text-xs text-muted-foreground">
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      
                      {file.status === 'completed' && file.converted && (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleDownloadFile(file)}
                        >
                          Download
                        </Button>
                      )}
                      
                      {file.status === 'error' && (
                        <div className="text-xs text-red-500">
                          Conversion failed
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Add More Files Button */}
          {files.length > 0 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || []);
                    handleFilesSelected(files);
                  };
                  input.click();
                }}
                className="hover:shadow-glow"
              >
                Add More Files
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversalConverter;
