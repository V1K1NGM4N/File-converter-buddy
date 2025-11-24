import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Video, Music, Package, Zap, Shield, Clock, BookOpen, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFormattedStats } from '@/utils/conversionTracker';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { SEOHead } from '@/components/SEOHead';

const Home = () => {
  const navigate = useNavigate();
  const [conversionStats, setConversionStats] = useState({
    totalFiles: '0',
    totalDownloads: '0',
    lastConversion: 'Never'
  });

  useEffect(() => {
    const stats = getFormattedStats();
    setConversionStats(stats);
  }, []);

  const tools = [
    {
      icon: ImageIcon,
      title: 'Image File Converter',
      description: 'JPG, PNG, WebP and more',
      path: '/images',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Video,
      title: 'Video File Converter',
      description: 'MP4, AVI, MOV and more',
      path: '/video',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: Music,
      title: 'Audio File Converter',
      description: 'MP3, WAV, FLAC and more',
      path: '/audio',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: Package,
      title: 'Product Feed Image Downloader',
      description: 'Easily download product feed images in the format you need',
      path: '/product-feed-image-downloader',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      icon: Minimize2,
      title: 'File Size Reducer',
      description: 'Reduce file size for images, videos, and documents',
      path: '/reducer',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ];

  const features = [
    { icon: Zap, text: 'Lightning Fast' },
    { icon: Shield, text: 'No Server Storage' },
    { icon: Clock, text: 'No Registration' }
  ];

  return (
    <>
      <SEOHead
        title="Free Online File Converter"
        description="Convert images, videos, audio files, and more with our free online file converter. No registration required, secure processing, and support for 100+ file formats."
        keywords="file converter, image converter, video converter, audio converter, online converter, free converter, file conversion"
        canonicalUrl="https://fileconverterbuddy.com/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "File Converter Buddy",
          "description": "Free online file converter for images, videos, audio, and more",
          "url": "https://fileconverterbuddy.com",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />
      <div className="min-h-screen bg-background">
        {/* Global Header */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="animate-fade-in">
                  <AnimatedFileType />
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    File Converter <span className="text-primary">Buddy</span>
                  </h1>
                  <p className="text-muted-foreground text-xs">Convert files with ease</p>
                </div>
              </button>

              <div className="flex items-center space-x-6">
                {/* Blog Link */}
                <button
                  onClick={() => navigate('/blog')}
                  className="text-sm text-primary font-medium"
                >
                  Blog
                </button>

              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 h-screen flex flex-col">


          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tools Section */}
            <div className="lg:col-span-2">
              <h2 className="text-lg sm:text-xl font-semibold mb-6 animate-fade-in-up delay-300">Choose Your Tool</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.path}
                      onClick={() => navigate(tool.path)}
                      className={`group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${tool.borderColor} ${tool.bgColor} animate-fade-in-up`}
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-6 w-6 ${tool.color}`} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base sm:text-sm">
                            {tool.title}
                          </h3>
                          <p className="text-sm sm:text-xs text-muted-foreground">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stats & Info Sidebar */}
            <div className="space-y-6 animate-fade-in-up delay-500">
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Files Downloaded</span>
                    <span className="text-lg font-bold">{conversionStats.totalDownloads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Files</span>
                    <span className="text-lg font-bold">{conversionStats.totalFiles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Conversion</span>
                    <span className="text-sm font-medium">{conversionStats.lastConversion}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-semibold mb-4 text-primary">Popular Features</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Bulk conversion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>High quality output</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>No watermarks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>No files stored on servers</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="font-semibold mb-4 text-base sm:text-sm">Getting Started</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">1</div>
                    <span>Choose your tool above</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">2</div>
                    <span>Upload your files</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">3</div>
                    <span>Download converted files</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
