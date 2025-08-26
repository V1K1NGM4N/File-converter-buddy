import { Download, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ConversionFile, downloadBlob, getFileExtension } from '@/utils/imageConverter';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
  files: ConversionFile[];
  targetFormat: string;
  onRemoveFile: (id: string) => void;
  onDownloadFile: (file: ConversionFile) => void;
}

export const ImagePreview = ({ 
  files, 
  targetFormat, 
  onRemoveFile, 
  onDownloadFile 
}: ImagePreviewProps) => {
  if (files.length === 0) return null;

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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Uploaded Images ({files.length})
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <Card key={file.id} className="overflow-hidden bg-gradient-card shadow-card border-border/50">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={file.preview}
                alt={file.file.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              
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
                <p className="font-medium truncate" title={file.file.name}>
                  {file.file.name}
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
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onDownloadFile(file)}
                  disabled={file.status !== 'completed' || !file.converted}
                  className={cn(
                    "h-8",
                    file.status === 'completed' && "hover:shadow-glow"
                  )}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};