import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, FileText, Image, Video, Music, Package, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
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
      case 'images': return <Image className="h-6 w-6" />;
      case 'videos': return <Video className="h-6 w-6" />;
      case 'audio': return <Music className="h-6 w-6" />;
      case 'productFeeds': return <Package className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
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

  const getSuccessMessage = () => {
    if (originalFormat.toLowerCase() === targetFormat.toLowerCase()) {
      return `Your ${getFileTypeLabel(fileType).toLowerCase()} are already in ${targetFormat.toUpperCase()} format!`;
    }
    return `Successfully converted ${successfulFiles} ${getFileTypeLabel(fileType).toLowerCase()}!`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="relative">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Conversion Complete!
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Stats */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950 dark:to-emerald-950 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  {getFileTypeIcon(fileType)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                    {getSuccessMessage()}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    From {originalFormat.toUpperCase()} to {targetFormat.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm px-3 py-1">
                  ✓ {successfulFiles} successful
                </Badge>
                {failedFiles > 0 && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    ✗ {failedFiles} failed
                  </Badge>
                )}
                {totalSizeReduction && totalSizeReduction > 0 && (
                  <Badge variant="outline" className="border-blue-200 text-blue-800 dark:border-blue-800 dark:text-blue-200 text-sm px-3 py-1">
                    📉 {totalSizeReduction}% smaller
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Size Reduction Info */}
          {totalSizeReduction && totalSizeReduction > 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-950 dark:to-cyan-950 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    🎉 Excellent! Your files are {totalSizeReduction}% smaller while maintaining quality.
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={onConvertAnother}
              className="flex-1 h-12 text-base font-semibold"
              variant="default"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Convert More Files
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 text-base font-semibold"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Done
            </Button>
          </div>

          {/* Security Note */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
            🔒 Your files are processed locally and never stored on our servers
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};