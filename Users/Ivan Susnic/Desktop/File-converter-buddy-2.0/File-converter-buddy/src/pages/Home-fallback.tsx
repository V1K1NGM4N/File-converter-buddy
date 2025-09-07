import React from 'react';
import { Image as ImageIcon, Video, Music, Package, Zap, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';

const Home = () => {
  const navigate = useNavigate();

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
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
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
      description: 'Download product feed images',
      path: '/product-feed-image-downloader',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="animate-fade-in">
              <AnimatedFileType />
            </div>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                File Converter Buddy
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4 animate-fade-in-right">
            <span className="text-sm font-medium text-muted-foreground">🆓 Free for All Users</span>
            <button
              onClick={() => navigate('/blog')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Convert Files
              <br />
              <span className="text-4xl">Instantly</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your files between different formats with our lightning-fast, 
              secure conversion tools. No registration required, no files stored on servers.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl animate-fade-in-up">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.title}
                  className={`group relative overflow-hidden rounded-2xl border-2 ${tool.borderColor} ${tool.bgColor} p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(tool.path)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full ${tool.bgColor} ${tool.color} transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]"></div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center animate-fade-in-up">
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>No files stored on servers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>No Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
