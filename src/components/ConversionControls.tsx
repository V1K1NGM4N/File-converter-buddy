import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, Play, RotateCcw } from 'lucide-react';
import { ConversionFile } from '@/utils/imageConverter';
import { cn } from '@/lib/utils';

interface ConversionControlsProps {
  files: ConversionFile[];
  isConverting: boolean;
  overallProgress: number;
  onStartConversion: () => void;
  onDownloadAll: () => void;
  onReset: () => void;
  className?: string;
}

export const ConversionControls = ({
  files,
  isConverting,
  overallProgress,
  onStartConversion,
  onDownloadAll,
  onReset,
  className
}: ConversionControlsProps) => {
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const hasFiles = files.length > 0;
  const allCompleted = hasFiles && completedFiles === files.length;

  return (
    <Card className={cn("p-6 bg-gradient-card shadow-card border-border/50", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Conversion Progress
          </h3>
          <span className="text-sm text-muted-foreground">
            {completedFiles} / {files.length} completed
          </span>
        </div>
        
        {isConverting && (
          <div className="space-y-2">
            <Progress value={overallProgress} className="h-3" />
            <p className="text-sm text-muted-foreground text-center">
              Converting images... {Math.round(overallProgress)}%
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="hero"
            size="lg"
            onClick={onStartConversion}
            disabled={!hasFiles || isConverting}
            className="flex-1 w-full sm:w-auto"
          >
            <Play className="h-4 w-4 mr-2" />
            {isConverting ? 'Converting...' : 'Start Conversion'}
          </Button>
          
          <Button
            variant="success"
            size="lg"
            onClick={onDownloadAll}
            disabled={!allCompleted}
            className="flex-1 w-full sm:w-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Download All ({completedFiles})
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            disabled={isConverting}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};