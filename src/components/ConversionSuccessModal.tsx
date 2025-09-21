import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, FileText, Image, Video, Music, Package, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConvertAnother: () => void;
  conversionResults: {
    totalFiles: number;
    successfulFiles: number;
    failedFiles: number;
    fileType: 'images' | 'videos' | 'audio' | 'productFeeds';
    originalFormat: string;
    targetFormat: string;
    totalSizeReduction?: number;
  };
}

export const ConversionSuccessModal: React.FC<ConversionSuccessModalProps> = ({
  isOpen,
  onClose,
  onConvertAnother,
  conversionResults
}) => {
  const { totalFiles, successfulFiles, failedFiles, fileType, originalFormat, targetFormat, totalSizeReduction } = conversionResults;

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'images': return <Image className="h-5 w-5" />;
      case 'videos': return <Video className="h-5 w-5" />;
      case 'audio': return <Music className="h-5 w-5" />;
      case 'productFeeds': return <Package className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case 'images': return 'Images';
      case 'videos': return 'Videos';
      case 'audio': return 'Audio Files';
      case 'productFeeds': return 'Product Images';
      default: return 'Files';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Conversion Complete!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Success Stats */}
          <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                {getFileTypeIcon(fileType)}
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">
                    {successfulFiles} {getFileTypeLabel(fileType)} Converted
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    From {originalFormat.toUpperCase()} to {targetFormat.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  ✓ {successfulFiles} successful
                </Badge>
                {failedFiles > 0 && (
                  <Badge variant="destructive">
                    ✗ {failedFiles} failed
                  </Badge>
                )}
                {totalSizeReduction && totalSizeReduction > 0 && (
                  <Badge variant="outline" className="border-blue-200 text-blue-800 dark:border-blue-800 dark:text-blue-200">
                    📉 {totalSizeReduction}% smaller
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Size Reduction Info */}
          {totalSizeReduction && totalSizeReduction > 0 && (
            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Great job! Your files are {totalSizeReduction}% smaller while maintaining quality.
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={onConvertAnother}
              className="flex-1"
              variant="default"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Convert More Files
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Done
            </Button>
          </div>

          {/* Tips */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            💡 Tip: Your files are processed locally and never stored on our servers
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
