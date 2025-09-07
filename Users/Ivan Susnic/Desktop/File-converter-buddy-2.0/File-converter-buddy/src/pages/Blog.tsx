import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Blog = () => {
  const navigate = useNavigate();

  return (
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
              
              {/* Authentication */}
              <div className="flex items-center space-x-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 text-sm border border-input bg-background rounded-md hover:bg-accent">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          
          <div className="space-y-8">
            {/* Product Feed Image Downloader Posts */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Product Feed Image Downloader</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/complete-guide-to-product-feed-image-downloading')}
                >
                  <h3 className="text-lg font-semibold mb-2">Complete Guide to Product Feed Image Downloading</h3>
                  <p className="text-muted-foreground text-sm mb-3">Extract images from any product feed format efficiently.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>22 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/how-to-extract-images-from-xml-product-feeds')}
                >
                  <h3 className="text-lg font-semibold mb-2">How to Extract Images from XML Product Feeds</h3>
                  <p className="text-muted-foreground text-sm mb-3">A complete tutorial for parsing XML feeds and extracting image URLs.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>18 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/bulk-product-image-downloader-for-ecommerce')}
                >
                  <h3 className="text-lg font-semibold mb-2">Bulk Product Image Downloader for E-commerce</h3>
                  <p className="text-muted-foreground text-sm mb-3">Scale your image management with bulk processing techniques.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>20 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/product-feed-image-optimization-best-practices')}
                >
                  <h3 className="text-lg font-semibold mb-2">Product Feed Image Optimization Best Practices</h3>
                  <p className="text-muted-foreground text-sm mb-3">Maximize performance and quality for different platforms.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>21 min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* File Format Guides */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">File Format Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/complete-guide-to-image-file-formats')}
                >
                  <h3 className="text-lg font-semibold mb-2">Complete Guide to Image File Formats</h3>
                  <p className="text-muted-foreground text-sm mb-3">JPEG vs PNG vs WebP vs GIF - everything you need to know.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>15 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/complete-guide-to-video-file-formats')}
                >
                  <h3 className="text-lg font-semibold mb-2">Complete Guide to Video File Formats</h3>
                  <p className="text-muted-foreground text-sm mb-3">MP4 vs AVI vs MOV vs WebM - choose the right format.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>12 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/complete-guide-to-audio-file-formats')}
                >
                  <h3 className="text-lg font-semibold mb-2">Complete Guide to Audio File Formats</h3>
                  <p className="text-muted-foreground text-sm mb-3">MP3 vs WAV vs FLAC vs AAC - find the perfect balance.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>14 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/document-format-guide')}
                >
                  <h3 className="text-lg font-semibold mb-2">Document Format Guide</h3>
                  <p className="text-muted-foreground text-sm mb-3">DOCX vs DOC vs TXT vs RTF - which format to choose?</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>14 min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization & Performance */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Optimization & Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/image-optimization-for-web-performance')}
                >
                  <h3 className="text-lg font-semibold mb-2">Image Optimization for Web Performance</h3>
                  <p className="text-muted-foreground text-sm mb-3">Speed up your website with optimized images.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>17 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/video-compression-techniques')}
                >
                  <h3 className="text-lg font-semibold mb-2">Video Compression Techniques</h3>
                  <p className="text-muted-foreground text-sm mb-3">Reduce file sizes without losing quality.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>18 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/audio-quality-vs-file-size-guide')}
                >
                  <h3 className="text-lg font-semibold mb-2">Audio Quality vs File Size Guide</h3>
                  <p className="text-muted-foreground text-sm mb-3">Finding the perfect balance for your needs.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>15 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/file-compression-guide')}
                >
                  <h3 className="text-lg font-semibold mb-2">File Compression Guide</h3>
                  <p className="text-muted-foreground text-sm mb-3">ZIP vs RAR vs 7Z - which format to choose?</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>13 min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices & Tips */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Best Practices & Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/pdf-conversion-best-practices')}
                >
                  <h3 className="text-lg font-semibold mb-2">PDF Conversion Best Practices</h3>
                  <p className="text-muted-foreground text-sm mb-3">Convert PDFs without losing quality.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>16 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/batch-file-conversion-tips')}
                >
                  <h3 className="text-lg font-semibold mb-2">Batch File Conversion Tips</h3>
                  <p className="text-muted-foreground text-sm mb-3">Convert multiple files efficiently.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>16 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/file-format-security-best-practices')}
                >
                  <h3 className="text-lg font-semibold mb-2">File Format Security Best Practices</h3>
                  <p className="text-muted-foreground text-sm mb-3">Protect your data during conversion.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>19 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/cross-platform-file-compatibility')}
                >
                  <h3 className="text-lg font-semibold mb-2">Cross-Platform File Compatibility</h3>
                  <p className="text-muted-foreground text-sm mb-3">Ensure your files work everywhere.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>17 min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialized Guides */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Specialized Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/file-conversion-for-content-creators')}
                >
                  <h3 className="text-lg font-semibold mb-2">File Conversion for Content Creators</h3>
                  <p className="text-muted-foreground text-sm mb-3">Optimize for every platform.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>20 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/mobile-file-management-guide')}
                >
                  <h3 className="text-lg font-semibold mb-2">Mobile File Management Guide</h3>
                  <p className="text-muted-foreground text-sm mb-3">Organize and optimize your mobile files.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>18 min read</span>
                  </div>
                </div>
                <div 
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/blog/file-format-future-trends')}
                >
                  <h3 className="text-lg font-semibold mb-2">File Format Future Trends</h3>
                  <p className="text-muted-foreground text-sm mb-3">What's coming next in digital media.</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>19 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
