import { useCallback, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { isImageFile } from '@/utils/imageConverter';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type ImageFormat = 'png' | 'jpeg' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'svg' | 'ico' | 'heic' | 'avif';

interface ImageUploadProps {
  onFilesSelected: (files: File[]) => void;
  selectedFormat?: ImageFormat;
  onFormatChange?: (format: ImageFormat) => void;
  className?: string;
}

const mainFormats: Array<{ value: ImageFormat; label: string; description: string }> = [
  {
    value: 'png',
    label: 'PNG',
    description: 'Lossless, supports transparency'
  },
  {
    value: 'jpeg',
    label: 'JPEG',
    description: 'Smaller size, best for photos'
  },
  {
    value: 'webp',
    label: 'WebP',
    description: 'Modern format, excellent compression'
  }
];

// No other formats - only reliable formats that work consistently
const otherFormats: Array<{ value: ImageFormat; label: string }> = [];

export const ImageUpload = ({ 
  onFilesSelected, 
  selectedFormat = 'png',
  onFormatChange,
  className 
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const selectedOtherFormat = otherFormats.find(f => f.value === selectedFormat);

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
    <Card className={cn("p-6 bg-gradient-card shadow-card border-border/50", className)}>
      <h3 className="text-lg font-semibold mb-4">
        Choose Output Format
      </h3>
      
      {/* File Upload Section */}
      <div
        className={cn(
          "relative border-2 border-dashed border-border rounded-xl p-6 text-center transition-all duration-300 mb-6",
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
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <Upload className="h-6 w-6" />
            <ImageIcon className="h-6 w-6" />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">
              {isDragOver ? 'Drop your images here' : 'Upload Images'}
            </h4>
            <p className="text-muted-foreground mb-4">
              Drag and drop your image files here, or click to select files
            </p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, GIF, BMP, TIFF, WebP and other image formats
            </p>
          </div>
          
          <Button variant="secondary">
            Choose Image Files
          </Button>
        </div>
      </div>
      
      {/* Format Selection */}
      {onFormatChange && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mainFormats.map((format) => (
            <Button
              key={format.value}
              variant={selectedFormat === format.value ? 'hero' : 'secondary'}
              className={cn(
                "h-auto p-4 flex flex-col items-center gap-2 text-left",
                selectedFormat === format.value && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
              onClick={() => onFormatChange(format.value)}
            >
              <span className="text-lg font-bold">
                {format.label}
              </span>
              <span className="text-xs opacity-80 text-center">
                {format.description}
              </span>
            </Button>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedOtherFormat ? 'hero' : 'secondary'}
                className={cn(
                  "h-auto p-4 flex flex-col items-center gap-2 text-left",
                  selectedOtherFormat && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                <span className="text-lg font-bold flex items-center gap-1">
                  {selectedOtherFormat ? selectedOtherFormat.label : 'More'}
                  <ChevronDown className="h-4 w-4" />
                </span>
                <span className="text-xs opacity-80 text-center">
                  {selectedOtherFormat ? 'Selected format' : 'Other formats'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              {otherFormats.map((format) => (
                <DropdownMenuItem
                  key={format.value}
                  onClick={() => onFormatChange(format.value)}
                  className={selectedFormat === format.value ? 'bg-accent' : ''}
                >
                  {format.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </Card>
  );
};