import { useCallback, useState } from 'react';
import { Upload, FileType, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { detectFileType, FileCategory } from '@/utils/fileTypeDetector';
import { cn } from '@/lib/utils';

interface UniversalFileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedCategories?: FileCategory[];
  className?: string;
}

export const UniversalFileUpload = ({ 
  onFilesSelected, 
  acceptedCategories = ['image', 'video', 'audio', 'archive', 'spreadsheet', 'text'],
  className 
}: UniversalFileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setError(null);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected, acceptedCategories]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = Array.from(e.target.files || []);
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected, acceptedCategories]);

  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    for (const file of files) {
      const fileType = detectFileType(file);
      
      if (fileType && acceptedCategories.includes(fileType.category)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      setError(`Unsupported file type(s): ${invalidFiles.slice(0, 3).join(', ')}${invalidFiles.length > 3 ? '...' : ''}`);
    }

    return validFiles;
  };

  const getAcceptedExtensions = (): string => {
    const extensions: string[] = [];
    
    if (acceptedCategories.includes('image')) {
      extensions.push('image/*');
    }
    if (acceptedCategories.includes('video')) {
      extensions.push('video/*');
    }
    if (acceptedCategories.includes('audio')) {
      extensions.push('audio/*');
    }
    if (acceptedCategories.includes('archive')) {
      extensions.push('.zip,.rar,.7z,.tar,.gz,.bz2,.xz');
    }
    if (acceptedCategories.includes('spreadsheet')) {
      extensions.push('.xlsx,.xls,.csv,.ods,.tsv');
    }
    if (acceptedCategories.includes('text')) {
      extensions.push('.txt,.md,.html,.css,.js,.json,.xml,.log');
    }
    
    return extensions.join(',');
  };

  const getCategoryDescription = (): string => {
    if (acceptedCategories.length === 1) {
      return acceptedCategories[0] === 'image' ? 'images' :
             acceptedCategories[0] === 'video' ? 'videos' :
             acceptedCategories[0] === 'audio' ? 'audio files' :
             acceptedCategories[0] === 'archive' ? 'archives' :
             acceptedCategories[0] === 'spreadsheet' ? 'spreadsheets' :
             acceptedCategories[0] === 'text' ? 'text files' : 'files';
    }
    
    return 'files';
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed border-border rounded-xl p-8 text-center transition-all duration-300",
          "bg-gradient-upload shadow-upload",
          "hover:border-primary/50 hover:shadow-glow",
          isDragOver && "border-primary bg-primary/5 shadow-glow"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          accept={getAcceptedExtensions()}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <Upload className="h-8 w-8" />
            <FileType className="h-8 w-8" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isDragOver ? `Drop your ${getCategoryDescription()} here` : `Upload ${getCategoryDescription().charAt(0).toUpperCase() + getCategoryDescription().slice(1)}`}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your {getCategoryDescription()} here, or click to select files
            </p>
            <p className="text-sm text-muted-foreground">
              Supports {acceptedCategories.join(', ')} formats
            </p>
          </div>
          
          <Button variant="secondary">
            Choose Files
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
