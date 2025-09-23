import { Download, X, CheckCircle, Clock, AlertCircle, FileImage, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ConversionFile, downloadBlob, getFileExtension, generateConvertedFilename } from '@/utils/imageConverter';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
  files: ConversionFile[];
  targetFormat: string;
  onRemoveFile: (id: string) => void;
  onDownloadFile: (file: ConversionFile) => void;
  fileGroup?: string;
  ProtectedDownloadButton?: React.ComponentType<{ file: ConversionFile; children: React.ReactNode }>;
}

// Helper function to detect DNG files
const isDngFile = (file: ConversionFile): boolean => {
  return file.file.type === 'image/x-adobe-dng' || file.file.name.toLowerCase().endsWith('.dng');
};

// DNG Preview Component
const DngPreview = ({ file }: { file: ConversionFile }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30 p-4">
    <FileImage className="h-12 w-12 text-muted-foreground mb-2" />
    <div className="text-center">
      <p className="text-sm font-medium text-foreground">DNG File</p>
      <p className="text-xs text-muted-foreground">Raw Image Format</p>
    </div>
    <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
      <AlertTriangle className="h-3 w-3" />
      <span>Limited browser support</span>
    </div>
  </div>
);

export const ImagePreview = ({ 
  files, 
  targetFormat, 
  onRemoveFile, 
  onDownloadFile,
  fileGroup = 'images',
  ProtectedDownloadButton
}: ImagePreviewProps) => {
  if (files.length === 0) return null;

  const completedFiles = files.filter(f => f.status === 'completed').length;
  const allCompleted = completedFiles === files.length && files.length > 0;
  
  const getSectionTitle = () => {
    if (allCompleted) {
      return `${fileGroup.charAt(0).toUpperCase() + fileGroup.slice(1)} Converted (${files.length})`;
    }
    return `Uploaded ${fileGroup.charAt(0).toUpperCase() + fileGroup.slice(1)} (${files.length})`;
  };

  const getStatusIcon = (status: ConversionFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'converting':
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getDisplayFilename = (file: ConversionFile) => {
    if (file.status === 'completed' && file.converted) {
      return generateConvertedFilename(file.file.name, getFileExtension(targetFormat as any));
    }
    return file.file.name;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {getSectionTitle()}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <Card key={file.id} className="overflow-hidden bg-gradient-card shadow-card border-border/50">
            <div className="aspect-square relative overflow-hidden">
              {isDngFile(file) ? (
                <DngPreview file={file} />
              ) : (
                <img
                  src={file.preview}
                  alt={getDisplayFilename(file)}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              )}
              
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => onRemoveFile(file.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                {getStatusIcon(file.status)}
                <span className="text-xs font-medium">
                  {file.status}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <p className="font-medium truncate" title={getDisplayFilename(file)}>
                  {getDisplayFilename(file)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              
              {file.status === 'converting' && (
                <Progress value={file.progress} className="h-2" />
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  → .{getFileExtension(targetFormat as any)}
                </span>
                
                {ProtectedDownloadButton ? (
                  <ProtectedDownloadButton file={file}>
                    <Button
                      onClick={() => onDownloadFile(file)}
                      disabled={file.status !== 'completed' || !file.converted}
                      variant="outline"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </ProtectedDownloadButton>
                ) : (
                  <Button
                    onClick={() => onDownloadFile(file)}
                    disabled={file.status !== 'completed' || !file.converted}
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};