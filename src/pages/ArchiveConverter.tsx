import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Archive, 
  Upload, 
  Download, 
  X, 
  RefreshCw, 
  Play,
  Zap
} from 'lucide-react';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { ArchiveFormatSelector, ArchiveFormat } from '@/components/ArchiveFormatSelector';
import { ConversionControls } from '@/components/ConversionControls';
import { generateConvertedFilename } from '@/utils/imageConverter';

interface ConversionFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  converted?: Blob;
}

const ArchiveConverter = () => {
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<ArchiveFormat>('zip');
  const [isConverting, setIsConverting] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const conversionFiles: ConversionFile[] = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' as const
    }));
    
    setFiles(prev => [...prev, ...conversionFiles]);
    toast.success(`Added ${newFiles.length} archive file(s) for conversion`);
  }, []);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.zip,.rar,.7z,.tar,.gz,.bz2,.xz,.lzma';
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
    
    // Simulate conversion process (in real app, this would use JSZip or similar)
    try {
      const totalFiles = files.length;
      let completedFiles = 0;
      
      const conversions = files.map(async (file) => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'converting', progress: 0 } : f
        ));
        
        // Simulate conversion progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress: i } : f
          ));
        }
        
        // Create a mock converted blob (in real app, this would be the actual converted archive)
        const converted = new Blob([file.file], { type: `application/${selectedFormat}` });
        
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'completed', progress: 100, converted }
            : f
        ));
        
        completedFiles++;
        setOverallProgress((completedFiles / totalFiles) * 100);
      });
      
      await Promise.all(conversions);
      toast.success(`Conversion complete! ${completedFiles} archive files converted.`);
      
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
    
    const url = URL.createObjectURL(file.converted);
    const a = document.createElement('a');
    a.href = url;
    a.download = newName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [selectedFormat]);

  const handleReset = useCallback(() => {
    files.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
    setOverallProgress(0);
    toast.success('Cleared all files');
  }, [files]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-12 w-12 text-primary-foreground" />
              <Archive className="h-12 w-12 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl font-bold text-primary-foreground">
              File Converter Buddy
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Convert your <AnimatedFileType fileType="archives" /> to any format instantly. Upload multiple files, 
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
                accept=".zip,.rar,.7z,.tar,.gz,.bz2,.xz,.lzma"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  handleFilesSelected(files);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Upload className="h-8 w-8" />
                  <Archive className="h-8 w-8" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Upload Archive Files
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your archive files here, or click to select files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports ZIP, RAR, 7Z, TAR, GZ, BZ2, XZ, LZMA and other archive formats
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
            <ArchiveFormatSelector 
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
                      {files.length} archive file{files.length !== 1 ? 's' : ''} ready for conversion
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
          
          {/* Archive Preview Grid */}
          {files.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <Card key={file.id} className="overflow-hidden hover:shadow-glow transition-all duration-300 bg-gradient-card shadow-card border-border/50">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
                      <Archive className="h-16 w-16 text-muted-foreground/30" />
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
                      
                      {file.status === 'completed' && (
                        <Button
                          onClick={() => handleDownloadFile(file)}
                          className="w-full hover:shadow-glow"
                          size="sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download {selectedFormat.toUpperCase()}
                        </Button>
                      )}
                      
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
                Add More Archive Files
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchiveConverter;
