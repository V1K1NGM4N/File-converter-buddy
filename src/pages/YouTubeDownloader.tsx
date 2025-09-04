import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Youtube, 
  Download, 
  X, 
  RefreshCw, 
  Play,
  Zap,
  Link,
  Music,
  Video,
  AlertCircle
} from 'lucide-react';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { AnimatedFileType } from '@/components/AnimatedFileType';

interface DownloadItem {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  format: 'mp4' | 'mp3';
  converted?: Blob;
  error?: string;
}

const YouTubeDownloader = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<'mp4' | 'mp3'>('mp4');
  const [isDownloading, setIsDownloading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);

  // Function to extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/watch\?.*&v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Function to fetch video information from YouTube
  const fetchVideoInfo = async (url: string): Promise<{ title: string; thumbnail: string; duration: string } | null> => {
    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      // Try to fetch from backend API first
      try {
        const response = await fetch(`http://localhost:3001/api/youtube/info?videoId=${videoId}`);
        if (response.ok) {
          const data = await response.json();
          return {
            title: data.title,
            thumbnail: data.thumbnail,
            duration: data.duration
          };
        }
      } catch (apiError) {
        console.log('Backend API not available, using fallback');
      }

      // Fallback to mock data if backend is not available
      const mockData = {
        title: `YouTube Video ${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: '3:45'
      };

      return mockData;
    } catch (error) {
      console.error('Error fetching video info:', error);
      return null;
    }
  };

  const handleUrlSubmit = useCallback(async () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }

    if (!urlInput.includes('youtube.com') && !urlInput.includes('youtu.be')) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }

    setIsFetchingInfo(true);
    
    try {
      const videoInfo = await fetchVideoInfo(urlInput);
      
      if (!videoInfo) {
        toast.error('Failed to fetch video information');
        return;
      }

      const newDownload: DownloadItem = {
        id: crypto.randomUUID(),
        url: urlInput,
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnail,
        duration: videoInfo.duration,
        progress: 0,
        status: 'pending',
        format: selectedFormat
      };

      setDownloads(prev => [...prev, newDownload]);
      setUrlInput('');
      toast.success('Added YouTube video for download');
      
    } catch (error) {
      toast.error('Failed to process YouTube URL');
      console.error('Error:', error);
    } finally {
      setIsFetchingInfo(false);
    }
  }, [urlInput, selectedFormat]);

  const handleRemoveDownload = useCallback((id: string) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
  }, []);

  const handleStartDownload = useCallback(async () => {
    if (downloads.length === 0) return;
    
    setIsDownloading(true);
    setOverallProgress(0);
    
    try {
      const totalDownloads = downloads.length;
      let completedDownloads = 0;
      
      const downloadPromises = downloads.map(async (download) => {
        setDownloads(prev => prev.map(d => 
          d.id === download.id ? { ...d, status: 'downloading', progress: 0 } : d
        ));
        
        try {
          // Try to use real backend API first
          try {
            const response = await fetch('http://localhost:3001/api/youtube/download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                url: download.url,
                format: download.format
              })
            });

            if (response.ok) {
              // Real download - create blob from response
              const blob = await response.blob();
              setDownloads(prev => prev.map(d => 
                d.id === download.id 
                  ? { ...d, status: 'completed', progress: 100, converted: blob }
                  : d
              ));
            } else {
              throw new Error('Download failed');
            }
          } catch (apiError) {
            console.log('Backend API not available, using fallback');
            
            // Fallback to mock download process
            for (let i = 0; i <= 100; i += 10) {
              await new Promise(resolve => setTimeout(resolve, 200));
              setDownloads(prev => prev.map(d => 
                d.id === download.id ? { ...d, progress: i } : d
              ));
            }
            
            // Create a mock file
            const mockContent = `Mock ${download.format.toUpperCase()} content for ${download.title}`;
            const converted = new Blob([mockContent], { 
              type: download.format === 'mp4' ? 'video/mp4' : 'audio/mpeg' 
            });
            
            setDownloads(prev => prev.map(d => 
              d.id === download.id 
                ? { ...d, status: 'completed', progress: 100, converted }
                : d
            ));
          }
          
          completedDownloads++;
          setOverallProgress((completedDownloads / totalDownloads) * 100);
          
        } catch (error) {
          setDownloads(prev => prev.map(d => 
            d.id === download.id 
              ? { ...d, status: 'error', error: 'Download failed' }
              : d
          ));
        }
      });
      
      await Promise.all(downloadPromises);
      toast.success(`Processing complete! ${completedDownloads} videos processed.`);
      
    } catch (error) {
      toast.error('Download failed. Please try again.');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [downloads]);

  const handleDownloadFile = useCallback((download: DownloadItem) => {
    if (!download.converted) return;
    
    const extension = download.format === 'mp4' ? 'mp4' : 'mp3';
    const safeTitle = download.title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
    const newName = `${safeTitle}.${extension}`;
    
    const url = URL.createObjectURL(download.converted);
    const a = document.createElement('a');
    a.href = url;
    a.download = newName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleReset = useCallback(() => {
    setDownloads([]);
    setOverallProgress(0);
    toast.success('Cleared all downloads');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-12 w-12 text-primary-foreground" />
              <Youtube className="h-12 w-12 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl font-bold text-primary-foreground">
              File Converter Buddy
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Download YouTube videos as <AnimatedFileType fileType="video" /> or audio files. 
              Simply paste the URL, choose your format, and download instantly.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/60">
              <span>• YouTube to MP4</span>
              <span>• YouTube to MP3</span>
              <span>• High quality downloads</span>
              <span>• Fast processing</span>
            </div>
            
            <FileTypeNavigation className="mt-8" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* URL Input Section */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Download YouTube Video
                  </h3>
                  <p className="text-muted-foreground">
                    Paste a YouTube URL below to start downloading
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                    disabled={isFetchingInfo}
                  />
                  <Button 
                    onClick={handleUrlSubmit} 
                    className="hover:shadow-glow"
                    disabled={isFetchingInfo}
                  >
                    {isFetchingInfo ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Link className="h-4 w-4 mr-2" />
                    )}
                    {isFetchingInfo ? 'Fetching...' : 'Add'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="text-sm">MP4 Video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-primary" />
                    <span className="text-sm">MP3 Audio</span>
                  </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Note:</p>
                      <p>This is a demo version. To enable real downloads, you'll need to set up a backend service with YouTube download capabilities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Format Selection */}
          {downloads.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Download Format</h3>
                    <p className="text-muted-foreground">Choose your preferred format</p>
                  </div>
                  <Select value={selectedFormat} onValueChange={(value: 'mp4' | 'mp3') => setSelectedFormat(value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          MP4 Video
                        </div>
                      </SelectItem>
                      <SelectItem value="mp3">
                        <div className="flex items-center gap-2">
                          <Music className="h-4 w-4" />
                          MP3 Audio
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Download Controls */}
          {downloads.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {downloads.length} video{downloads.length !== 1 ? 's' : ''} ready for download
                    </h3>
                    <p className="text-muted-foreground">
                      Downloading as {selectedFormat.toUpperCase()} format
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleStartDownload}
                      disabled={isDownloading}
                      className="hover:shadow-glow"
                    >
                      {isDownloading ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      {isDownloading ? 'Processing...' : 'Start Download'}
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
                
                {isDownloading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Download Queue Grid */}
          {downloads.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloads.map((download) => (
                <Card key={download.id} className="overflow-hidden hover:shadow-glow transition-all duration-300 bg-gradient-card shadow-card border-border/50">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
                      <img
                        src={download.thumbnail}
                        alt={download.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if thumbnail fails to load
                          e.currentTarget.src = 'https://via.placeholder.com/320x180/ff0000/ffffff?text=YouTube';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Youtube className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate flex-1 mr-2">
                          {download.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDownload(download.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Duration: {download.duration}
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Format: {download.format.toUpperCase()}
                      </div>
                      
                      {download.status === 'downloading' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Processing...</span>
                            <span>{download.progress}%</span>
                          </div>
                          <Progress value={download.progress} />
                        </div>
                      )}
                      
                      {download.status === 'completed' && (
                        <Button
                          onClick={() => handleDownloadFile(download)}
                          className="w-full hover:shadow-glow"
                          size="sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download {download.format.toUpperCase()}
                        </Button>
                      )}
                      
                      {download.status === 'error' && (
                        <div className="text-sm text-destructive">
                          {download.error || 'Download failed'}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubeDownloader;
