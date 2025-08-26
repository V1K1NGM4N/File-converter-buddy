import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type VideoFormat = 'mp4' | 'avi' | 'mov' | 'wmv' | 'flv' | 'webm' | 'mkv';

interface VideoFormatSelectorProps {
  selectedFormat: VideoFormat;
  onFormatChange: (format: VideoFormat) => void;
  className?: string;
}

const mainFormats: Array<{ value: VideoFormat; label: string; description: string }> = [
  {
    value: 'mp4',
    label: 'MP4',
    description: 'Most compatible, high quality'
  },
  {
    value: 'avi',
    label: 'AVI',
    description: 'Uncompressed, large file size'
  }
];

const otherFormats: Array<{ value: VideoFormat; label: string }> = [
  { value: 'mov', label: 'MOV' },
  { value: 'wmv', label: 'WMV' },
  { value: 'flv', label: 'FLV' },
  { value: 'webm', label: 'WebM' },
  { value: 'mkv', label: 'MKV' }
];

export const VideoFormatSelector = ({ 
  selectedFormat, 
  onFormatChange, 
  className 
}: VideoFormatSelectorProps) => {
  const selectedOtherFormat = otherFormats.find(f => f.value === selectedFormat);
  
  return (
    <Card className={cn("p-6 bg-gradient-card shadow-card border-border/50", className)}>
      <h3 className="text-lg font-semibold mb-4">
        Choose Output Format
      </h3>
      
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
    </Card>
  );
};