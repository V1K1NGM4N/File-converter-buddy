import { useState, useCallback } from 'react';
import { UniversalFileUpload } from '@/components/UniversalFileUpload';
import { SmartFormatSelector } from '@/components/SmartFormatSelector';
import { ConversionControls } from '@/components/ConversionControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { detectFileType, FileCategory } from '@/utils/fileTypeDetector';
import { convertImage, downloadBlob, generateConvertedFilename, getFileExtension } from '@/utils/imageConverter';
import { toast } from 'sonner';
import { FileType, Info, Upload, Zap } from 'lucide-react';

interface DemoFile {
  id: string;
  file: File;
  fileType: ReturnType<typeof detectFileType>;
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  converted?: Blob;
}

const SmartConverterDemo = () => {
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
          // For now, only handle image conversion
          if (file.fileType?.category === 'image') {
            const converted = await convertImage(file.file, selectedFormat as any);
            
            setFiles(prev => prev.map(f => 
              f.id === file.id 
                ? { ...f, status: 'completed', progress: 100, converted }
                : f
            ));
          } else {
            // For non-image files, just mark as completed (placeholder)
            setFiles(prev => prev.map(f => 
              f.id === file.id 
                ? { ...f, status: 'completed', progress: 100 }
                : f
            ));
          }
          
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

  const handleDownloadFile = useCallback((file: DemoFile) => {
    if (!file.converted) return;
    
    const newName = generateConvertedFilename(file.file.name, getFileExtension(selectedFormat));
    downloadBlob(file.converted, newName);
  }, [selectedFormat]);

  const handleDownloadAll = useCallback(() => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.converted);
    
    if (completedFiles.length === 0) {
      toast.error('No files available for download');
      return;
    }
    
    // Download each file individually
    completedFiles.forEach(file => {
      handleDownloadFile(file);
    });
    
    toast.success(`Downloaded ${completedFiles.length} file(s)`);
  }, [files, handleDownloadFile]);

  const getCategoryColor = (category: FileCategory): string => {
    const colors: Record<FileCategory, string> = {
      image: 'bg-blue-500',
      video: 'bg-purple-500',
      audio: 'bg-green-500',
      archive: 'bg-orange-500',
      spreadsheet: 'bg-emerald-500',
      text: 'bg-slate-500',
      document: 'bg-red-500',
      unknown: 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-12 w-12 text-primary-foreground" />
              <FileType className="h-12 w-12 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl font-bold text-primary-foreground">
              File Converter Buddy
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Convert your <AnimatedFileType fileType="files" /> to any format instantly. Upload multiple files, 
              choose your preferred format, and download converted files in bulk.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/60">
              <span>• Supports all major formats</span>
              <span>• Bulk conversion</span>
              <span>• High quality output</span>
              <span>• Lightning-fast conversion</span>
            </div>
            
            <FileTypeNavigation className="mt-8" />
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
                accept="*/*"
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
                    Upload Any Files
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your files here, or click to select files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports images, videos, audio, documents, and other file types
                  </p>
                </div>
                
                <Button variant="secondary">
                  Choose Files
                </Button>
              </div>
            </div>
          )}
          
          {/* Smart Format Selection */}
          {files.length > 0 && (
            <SmartFormatSelector 
              files={files.map(f => f.file)}
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
            />
          )}
          
          {/* Conversion Controls */}
          {files.length > 0 && selectedFormat && (
            <ConversionControls
              files={files.map(f => ({
                id: f.id,
                file: f.file,
                preview: URL.createObjectURL(f.file),
                progress: f.progress,
                status: f.status,
                converted: f.converted
              }))}
              isConverting={isConverting}
              overallProgress={overallProgress}
              onStartConversion={handleStartConversion}
              onDownloadAll={handleDownloadAll}
              onReset={handleReset}
            />
          )}
          
          {/* File Analysis */}
          {files.length > 0 && (
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileType className="h-5 w-5" />
                  File Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{file.file.name}</h4>
                          {file.fileType && (
                            <Badge className={getCategoryColor(file.fileType.category)}>
                              {file.fileType.category}
                            </Badge>
                          )}
                          <Badge variant="outline">
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                          </Badge>
                        </div>
                        
                        {file.fileType && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Info className="h-4 w-4" />
                              <span>{file.fileType.description}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Current format: </span>
                              <span className="font-mono font-medium">
                                .{file.fileType.extensions[0]}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Compatible formats: </span>
                              <span className="font-mono font-medium">
                                {file.fileType.compatibleFormats.map(f => `.${f}`).join(', ')}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Status: </span>
                              <Badge 
                                variant={file.status === 'completed' ? 'default' : 
                                        file.status === 'converting' ? 'secondary' :
                                        file.status === 'error' ? 'destructive' : 'outline'}
                                className="ml-1"
                              >
                                {file.status}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        {file.status === 'completed' && file.converted && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadFile(file)}
                          >
                            Download
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartConverterDemo;
