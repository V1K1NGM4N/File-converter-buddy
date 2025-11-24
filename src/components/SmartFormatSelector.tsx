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
  // Show 3 main formats, then "More" dropdown for the rest
  const shouldShowMore = compatibleFormats.length > 3;
  const mainFormats = shouldShowMore ? compatibleFormats.slice(0, 3) : compatibleFormats;
  const otherFormats = shouldShowMore ? compatibleFormats.slice(3) : [];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {mainFormats.map((format) => (
          <Button
            key={format}
            variant={selectedFormatInfo === format ? 'hero' : 'secondary'}
            className={cn(
              "h-auto min-h-[80px] p-4 flex flex-col items-center justify-center gap-2 text-center",
              selectedFormatInfo === format && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
            onClick={() => onFormatChange(format)}
          >
            <span className="text-lg font-bold leading-tight">
              {format.toUpperCase()}
            </span>
            <span className="text-xs opacity-80 text-center leading-tight px-1">
              {getFormatDescription(format, fileTypeInfo.category)}
            </span>
          </Button>
        ))}
      </div>

      {/* More Formats Dropdown - Only show if there are additional formats */}
      {otherFormats.length > 0 && (
        <div className="mt-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedOtherFormat ? 'hero' : 'secondary'}
                className={cn(
                  "h-auto min-h-[80px] p-4 flex flex-col items-center justify-center gap-2 text-center w-full",
                  selectedOtherFormat && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                <span className="text-lg font-bold leading-tight flex items-center gap-1">
                  {selectedOtherFormat ? selectedOtherFormat.toUpperCase() : 'More'}
                  <ChevronDown className="h-4 w-4" />
                </span>
                <span className="text-xs opacity-80 text-center leading-tight px-1">
                  {selectedOtherFormat ? 'Selected format' : 'Other formats'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {otherFormats.map((format) => (
                <DropdownMenuItem
                  key={format}
                  onClick={() => onFormatChange(format)}
                  className={cn(
                    "cursor-pointer",
                    selectedFormatInfo === format ? 'bg-accent' : ''
                  )}
                >
                  <span className="font-medium">{format.toUpperCase()}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

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
      'png': 'Lossless, transparency',
      'jpeg': 'Smaller size, photos',
      'webp': 'Modern, excellent compression',
      'tiff': 'High quality, professional',
      'gif': 'Supports animation',
      'bmp': 'Uncompressed, large',
      'svg': 'Vector, scalable',
      'ico': 'Icon format',
      'heic': 'High efficiency',
      'avif': 'Next-gen compression',
      'dng': 'Raw image format'
    },
    video: {
      'mp4': 'Most compatible',
      'avi': 'Uncompressed, large',
      'mov': 'Apple ecosystem',
      'wmv': 'Windows Media',
      'flv': 'Flash video',
      'webm': 'Web optimized',
      'mkv': 'Open container',
      '3gp': 'Mobile optimized',
      'ogv': 'Open source',
      'm4v': 'iTunes format',
      'ts': 'Transport stream',
      'vob': 'DVD format',
      'asf': 'Advanced Systems',
      'rm': 'RealMedia',
      'rmvb': 'Variable bitrate',
      'swf': 'Flash format'
    },
    audio: {
      'mp3': 'Most compatible',
      'wav': 'Uncompressed, high quality',
      'aac': 'Better than MP3',
      'ogg': 'Open source',
      'flac': 'Lossless compression',
      'wma': 'Windows Media',
      'm4a': 'iTunes format',
      'opus': 'Modern codec',
      'aiff': 'Apple format',
      'alac': 'Apple lossless',
      'ac3': 'Dolby Digital',
      'm4r': 'iPhone Ringtone'
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
      'xlsx': 'Modern Excel',
      'xls': 'Legacy Excel',
      'csv': 'Simple text',
      'ods': 'OpenDocument',
      'tsv': 'Tab-separated',
      'json': 'Structured data',
      'xml': 'Markup format'
    },
    text: {
      'txt': 'Plain text',
      'md': 'Markdown',
      'html': 'Web markup',
      'css': 'Stylesheet',
      'js': 'JavaScript',
      'json': 'Data format',
      'xml': 'Markup format',
      'csv': 'Comma-separated',
      'tsv': 'Tab-separated',
      'log': 'Log file'
    },
    document: {
      'pdf': 'Portable Document',
      'png': 'Lossless image',
      'jpeg': 'Compressed image',
      'webp': 'Modern web image',
      'tiff': 'High quality image',
      'txt': 'Plain text',
      'md': 'Markdown',
      'html': 'Web markup',
      'docx': 'Microsoft Word'
    }
  };

  return formatDescriptions[category]?.[format] || 'Compatible format';
};
