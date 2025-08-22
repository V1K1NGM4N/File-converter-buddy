import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageFormat } from '@/utils/imageConverter';
import { cn } from '@/lib/utils';

interface FormatSelectorProps {
  selectedFormat: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
  className?: string;
}

const formats: Array<{ value: ImageFormat; label: string; description: string }> = [
  {
    value: 'png',
    label: 'PNG',
    description: 'Lossless compression, supports transparency'
  },
  {
    value: 'jpeg',
    label: 'JPEG',
    description: 'Smaller file size, best for photos'
  },
  {
    value: 'webp',
    label: 'WebP',
    description: 'Modern format, excellent compression'
  }
];

export const FormatSelector = ({ 
  selectedFormat, 
  onFormatChange, 
  className 
}: FormatSelectorProps) => {
  return (
    <Card className={cn("p-6 bg-gradient-card shadow-card border-border/50", className)}>
      <h3 className="text-lg font-semibold mb-4">
        Choose Output Format
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {formats.map((format) => (
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
      </div>
    </Card>
  );
};