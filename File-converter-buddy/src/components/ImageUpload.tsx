import { useCallback, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isImageFile } from '@/utils/imageConverter';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onFilesSelected: (files: File[]) => void;
  className?: string;
}

export const ImageUpload = ({ onFilesSelected, className }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(isImageFile);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(isImageFile);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed border-border rounded-xl p-8 text-center transition-all duration-300",
        "bg-gradient-upload shadow-upload",
        "hover:border-primary/50 hover:shadow-glow",
        isDragOver && "border-primary bg-primary/5 shadow-glow",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-primary">
          <Upload className="h-8 w-8" />
          <ImageIcon className="h-8 w-8" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {isDragOver ? 'Drop your images here' : 'Upload Images'}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your images here, or click to select files
          </p>
          <p className="text-sm text-muted-foreground">
            Supports JPEG, PNG, WebP, and other image formats
          </p>
        </div>
        
        <Button variant="secondary">
          Choose Files
        </Button>
      </div>
    </div>
  );
};