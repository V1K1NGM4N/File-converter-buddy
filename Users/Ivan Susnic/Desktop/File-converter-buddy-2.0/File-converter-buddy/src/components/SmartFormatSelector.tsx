import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown, FileType, Info } from 'lucide-react';
import { FileTypeInfo, detectFileType, getCompatibleFormats } from '@/utils/fileTypeDetector';

interface SmartFormatSelectorProps {
  files: File[];
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  className?: string;
}

export const SmartFormatSelector = ({ 
  files, 
  selectedFormat, 
  onFormatChange, 
  className 
}: SmartFormatSelectorProps) => {
  // Detect file type from the first file (assuming all files are the same type)
  const firstFile = files[0];
  const fileTypeInfo = firstFile ? detectFileType(firstFile) : null;
  
  if (!fileTypeInfo) {
    return (
      <Card className={cn("p-6 bg-gradient-card shadow-card border-border/50", className)}>
        <div className="flex items-center gap-3 mb-4">
          <FileType className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Choose Output Format</h3>
        </div>
        <p className="text-muted-foreground">
          Unable to detect file type. Please ensure you've uploaded a supported file.
        </p>
      </Card>
    );
  }

  const compatibleFormats = getCompatibleFormats(fileTypeInfo);
  
  // Group formats into main (most common) and other formats
  // Only show "More" dropdown if there are 4 or more total formats
  const shouldShowMore = compatibleFormats.length >= 4;
  const mainFormats = shouldShowMore ? compatibleFormats.slice(0, 2) : compatibleFormats;
  const otherFormats = shouldShowMore ? compatibleFormats.slice(2) : [];
  
  // Get current file extension for display
  const currentExtension = fileTypeInfo.extensions[0]?.toUpperCase() || 'Unknown';
  
  // Find the selected format info
  const selectedFormatInfo = compatibleFormats.includes(selectedFormat) 
    ? selectedFormat 
    : compatibleFormats[0];

  const selectedOtherFormat = otherFormats.find(f => f === selectedFormatInfo);

  return (
    <Card className={cn("p-6 bg-gradient-card shadow-card border-border/50", className)}>
      <div className="flex items-center gap-3 mb-4">
        <FileType className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Choose Output Format</h3>
      </div>
      
      {/* File Type Info */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Detected File Type</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Current: <span className="font-mono font-medium text-foreground">.{currentExtension}</span>
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{fileTypeInfo.description}</span>
        </div>
      </div>
      
      {/* Format Selection */}
      <div className={`grid grid-cols-1 gap-3 ${
        mainFormats.length === 1 ? 'md:grid-cols-1' :
        mainFormats.length === 2 ? 'md:grid-cols-2' :
        mainFormats.length === 3 ? 'md:grid-cols-3' :
        'md:grid-cols-3'
      }`}>
        {mainFormats.map((format) => (
          <Button
            key={format}
            variant={selectedFormatInfo === format ? 'hero' : 'secondary'}
            className={cn(
              "h-auto p-4 flex flex-col items-center gap-2 text-left",
              selectedFormatInfo === format && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
            onClick={() => onFormatChange(format)}
          >
            <span className="text-lg font-bold">
              {format.toUpperCase()}
            </span>
            <span className="text-xs opacity-80 text-center">
              {getFormatDescription(format, fileTypeInfo.category)}
            </span>
          </Button>
        ))}
        
        {otherFormats.length > 0 && (
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
                  {selectedOtherFormat ? selectedOtherFormat.toUpperCase() : 'More'}
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
                  key={format}
                  onClick={() => onFormatChange(format)}
                  className={selectedFormatInfo === format ? 'bg-accent' : ''}
                >
                  {format.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      {/* Conversion Info */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-xs text-primary/80 text-center">
          Converting from <span className="font-medium">{currentExtension}</span> to <span className="font-medium">{selectedFormatInfo.toUpperCase()}</span>
        </p>
      </div>
    </Card>
  );
};

/**
 * Get a human-readable description for each format based on file category
 */
const getFormatDescription = (format: string, category: string): string => {
  const formatDescriptions: Record<string, Record<string, string>> = {
    image: {
      'png': 'Lossless, supports transparency',
      'jpeg': 'Smaller size, best for photos',
      'webp': 'Modern format, excellent compression',
      'tiff': 'High quality, professional use',
      'gif': 'Supports animation',
      'bmp': 'Uncompressed, large size',
      'svg': 'Vector format, scalable',
      'ico': 'Icon format',
      'heic': 'High efficiency format',
      'avif': 'Next-gen compression'
    },
    video: {
      'mp4': 'Most compatible, high quality',
      'avi': 'Uncompressed, large size',
      'mov': 'Apple ecosystem',
      'wmv': 'Windows Media',
      'flv': 'Flash video',
      'webm': 'Web optimized',
      'mkv': 'Open container format',
      '3gp': 'Mobile optimized',
      'ogv': 'Open source format',
      'm4v': 'iTunes format',
      'ts': 'Transport stream',
      'vob': 'DVD format',
      'asf': 'Advanced Systems Format',
      'rm': 'RealMedia format',
      'rmvb': 'Variable bitrate RM',
      'swf': 'Flash format'
    },
    audio: {
      'mp3': 'Most compatible, good compression',
      'wav': 'Uncompressed, high quality',
      'aac': 'Better quality than MP3',
      'ogg': 'Open source format',
      'flac': 'Lossless compression',
      'wma': 'Windows Media Audio',
      'm4a': 'iTunes format',
      'opus': 'Modern codec',
      'aiff': 'Apple format',
      'alac': 'Apple lossless',
      'ac3': 'Dolby Digital'
    },
    archive: {
      'zip': 'Most compatible',
      'rar': 'High compression',
      '7z': 'Best compression',
      'tar': 'Unix standard',
      'gz': 'Gzip compressed',
      'bz2': 'Bzip2 compressed',
      'xz': 'LZMA compression'
    },
    spreadsheet: {
      'xlsx': 'Modern Excel format',
      'xls': 'Legacy Excel format',
      'csv': 'Simple text format',
      'ods': 'OpenDocument format',
      'tsv': 'Tab-separated values',
      'json': 'Structured data',
      'xml': 'Markup format'
    },
    text: {
      'txt': 'Plain text format',
      'md': 'Markdown format',
      'html': 'Web markup format',
      'css': 'Stylesheet format',
      'js': 'JavaScript format',
      'json': 'Data format',
      'xml': 'Markup format',
      'csv': 'Comma-separated values',
      'tsv': 'Tab-separated values',
      'log': 'Log file format'
    },
    document: {
      'pdf': 'Portable Document Format',
      'png': 'Lossless image format',
      'jpeg': 'Compressed image format',
      'webp': 'Modern web image format',
      'tiff': 'High quality image format',
      'txt': 'Plain text format',
      'md': 'Markdown format',
      'html': 'Web markup format',
      'docx': 'Microsoft Word document'
    }
  };

  return formatDescriptions[category]?.[format] || 'Compatible format';
};
