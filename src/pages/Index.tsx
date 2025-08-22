import { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ImagePreview } from '@/components/ImagePreview';
import { FormatSelector } from '@/components/FormatSelector';
import { ConversionControls } from '@/components/ConversionControls';
import { Button } from '@/components/ui/button';
import { 
  ConversionFile, 
  ImageFormat, 
  convertImage, 
  createPreviewUrl, 
  downloadBlob, 
  getFileExtension 
} from '@/utils/imageConverter';
import { downloadMultipleFiles } from '@/utils/zipDownload';
import { toast } from 'sonner';
import { Zap, Image as ImageIcon } from 'lucide-react';

const Index = () => {
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
    
    const originalName = file.file.name;
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
    const newName = `${nameWithoutExt}.${getFileExtension(selectedFormat)}`;
    
    downloadBlob(file.converted, newName);
  }, [selectedFormat]);

  const handleDownloadAll = useCallback(async () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.converted);
    
    if (completedFiles.length === 0) {
      toast.error('No completed conversions to download');
      return;
    }
    
    try {
      const downloadFiles = completedFiles.map(file => {
        const originalName = file.file.name;
        const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
        const newName = `${nameWithoutExt}.${getFileExtension(selectedFormat)}`;
        
        return {
          name: newName,
          blob: file.converted!
        };
      });
      
      await downloadMultipleFiles(downloadFiles);
      toast.success(`Downloaded ${downloadFiles.length} converted images`);
      
    } catch (error) {
      toast.error('Failed to download files');
      console.error('Download error:', error);
    }
  }, [files, selectedFormat]);

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
              <ImageIcon className="h-12 w-12 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl font-bold text-primary-foreground">
              Image Converter Pro
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Convert your images to any format instantly. Upload multiple files, 
              choose your preferred format, and download converted images in bulk.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/60">
              <span>• Supports PNG, JPEG, WebP</span>
              <span>• Bulk conversion</span>
              <span>• High quality output</span>
              <span>• Privacy-focused</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Upload Section */}
          {files.length === 0 && (
            <ImageUpload onFilesSelected={handleFilesSelected} />
          )}
          
          {/* Format Selection */}
          {files.length > 0 && (
            <FormatSelector 
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
            />
          )}
          
          {/* Conversion Controls */}
          {files.length > 0 && (
            <ConversionControls
              files={files}
              isConverting={isConverting}
              overallProgress={overallProgress}
              onStartConversion={handleStartConversion}
              onDownloadAll={handleDownloadAll}
              onReset={handleReset}
            />
          )}
          
          {/* Image Preview Grid */}
          <ImagePreview
            files={files}
            targetFormat={selectedFormat}
            onRemoveFile={handleRemoveFile}
            onDownloadFile={handleDownloadFile}
          />
          
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
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || []);
                    handleFilesSelected(files);
                  };
                  input.click();
                }}
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

export default Index;