import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const FileConversionForContentCreators = () => {
  const navigate = useNavigate();

  const contentCreatorData = [
    {
      platform: 'YouTube',
      videoFormat: 'MP4 (H.264)',
      audioFormat: 'AAC',
      imageFormat: 'JPEG/PNG',
      resolution: '1080p/4K',
      bitrate: '8-15 Mbps'
    },
    {
      platform: 'Instagram',
      videoFormat: 'MP4 (H.264)',
      audioFormat: 'AAC',
      imageFormat: 'JPEG',
      resolution: '1080x1080 (square)',
      bitrate: '3-5 Mbps'
    },
    {
      platform: 'TikTok',
      videoFormat: 'MP4 (H.264)',
      audioFormat: 'AAC',
      imageFormat: 'JPEG',
      resolution: '1080x1920 (vertical)',
      bitrate: '2-4 Mbps'
    },
    {
      platform: 'Facebook',
      videoFormat: 'MP4 (H.264)',
      audioFormat: 'AAC',
      imageFormat: 'JPEG',
      resolution: '1280x720 (landscape)',
      bitrate: '4-8 Mbps'
    },
    {
      platform: 'Twitter',
      videoFormat: 'MP4 (H.264)',
      audioFormat: 'AAC',
      imageFormat: 'JPEG',
      resolution: '1280x720 (landscape)',
      bitrate: '2-5 Mbps'
    },
    {
      platform: 'LinkedIn',
      videoFormat: 'MP4 (H.264)',
      audioFormat: 'AAC',
      imageFormat: 'JPEG',
      resolution: '1280x720 (landscape)',
      bitrate: '3-6 Mbps'
    }
  ];

  const columns = [
    { header: 'Platform', key: 'platform', width: '15%' },
    { header: 'Video Format', key: 'videoFormat', width: '18%' },
    { header: 'Audio Format', key: 'audioFormat', width: '15%' },
    { header: 'Image Format', key: 'imageFormat', width: '15%' },
    { header: 'Resolution', key: 'resolution', width: '20%' },
    { header: 'Bitrate', key: 'bitrate', width: '17%' }
  ];

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
              <button 
                onClick={() => navigate('/blog')}
                className="text-sm text-primary font-medium"
              >
                Blog
              </button>
              
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
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              File Conversion for Content Creators: Optimize for Every Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to convert and optimize your content for different social media platforms, streaming services, and content distribution channels.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>20 min read</span>
              <span>•</span>
              <span>Content Creation</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Content creators need to optimize their files for different platforms, each with its own requirements for video, audio, and image formats. Understanding these requirements and knowing how to convert files efficiently is crucial for successful content distribution.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll cover the specific requirements for major content platforms, share optimization techniques, and help you create content that performs well across different channels. Plus, we'll show you how to easily convert and optimize your content using our free online file converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Platform-Specific Content Requirements"
            description="Compare format requirements across different content platforms"
            columns={columns}
            data={contentCreatorData}
          />

          {/* Detailed Platform Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Platform-Specific Optimization Strategies</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Video Content Optimization</h3>
                <p className="mb-4">
                  Different platforms have different requirements for video content. Understanding these requirements helps you create videos that perform well and look great on each platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use MP4 with H.264 codec for maximum compatibility</li>
                      <li>• Optimize resolution for each platform's requirements</li>
                      <li>• Adjust bitrate based on platform recommendations</li>
                      <li>• Consider aspect ratio for different platforms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using wrong aspect ratios for platforms</li>
                      <li>• Not optimizing for mobile viewing</li>
                      <li>• Ignoring platform-specific requirements</li>
                      <li>• Using unnecessarily high bitrates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Audio Content Optimization</h3>
                <p className="mb-4">
                  Audio quality is crucial for content creators, especially for podcasts, music, and video content. Understanding how to optimize audio for different platforms ensures your content sounds great everywhere.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use AAC codec for better quality at lower bitrates</li>
                      <li>• Optimize bitrate for platform requirements</li>
                      <li>• Consider audio compression for mobile platforms</li>
                      <li>• Test audio quality on different devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using wrong audio codecs for platforms</li>
                      <li>• Not considering mobile audio limitations</li>
                      <li>• Ignoring platform-specific audio requirements</li>
                      <li>• Using unnecessarily high audio bitrates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Image Content Optimization</h3>
                <p className="mb-4">
                  Images are essential for content creators, whether for thumbnails, social media posts, or website content. Optimizing images for different platforms ensures they look great and load quickly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use JPEG for photographs and complex images</li>
                      <li>• Use PNG for graphics and images with transparency</li>
                      <li>• Optimize file sizes for faster loading</li>
                      <li>• Consider platform-specific image requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using wrong image formats for content type</li>
                      <li>• Not optimizing file sizes for web</li>
                      <li>• Ignoring platform-specific image dimensions</li>
                      <li>• Using unnecessarily high image quality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Optimize Content */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Optimize Content for Different Platforms</h2>
            <p className="mb-4">
              Optimizing content for different platforms requires understanding each platform's requirements and using the right tools. Here's how to do it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Content Optimization Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Identify your target platforms and their requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Create or convert content to meet platform specifications</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Optimize file sizes and quality for each platform</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Test content on different devices and platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Monitor performance and adjust optimization as needed</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/video')}
                className="mr-4"
              >
                Try Our Content Optimizer
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Content Creators</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Content Planning and Creation:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Plan content for multiple platforms from the start</li>
                  <li>• Create content that works across different formats</li>
                  <li>• Use consistent branding and styling</li>
                  <li>• Consider platform-specific audience preferences</li>
                  <li>• Test content on different devices and platforms</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Optimization and Distribution:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Optimize files for each platform's requirements</li>
                  <li>• Use appropriate formats and quality settings</li>
                  <li>• Monitor performance and engagement metrics</li>
                  <li>• Adjust optimization based on platform performance</li>
                  <li>• Keep up with platform requirement changes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best video format for content creators?</h3>
                <p className="text-muted-foreground">
                  MP4 with H.264 codec is generally the best format for content creators as it offers excellent compatibility across all platforms, good compression, and high quality. It's supported by YouTube, Instagram, TikTok, and most other platforms.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I optimize content for mobile platforms?</h3>
                <p className="text-muted-foreground">
                  To optimize for mobile platforms, use appropriate aspect ratios (vertical for TikTok, square for Instagram), optimize file sizes for mobile networks, ensure content is readable on small screens, and test on actual mobile devices.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I create different versions for different platforms?</h3>
                <p className="text-muted-foreground">
                  Yes, creating platform-specific versions is often necessary due to different requirements for aspect ratios, file sizes, and quality settings. However, you can create a master version and then optimize it for each platform to save time.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How can I ensure my content looks good on all platforms?</h3>
                <p className="text-muted-foreground">
                  To ensure your content looks good on all platforms, test on different devices and platforms, use appropriate formats and quality settings, consider platform-specific requirements, and monitor performance and user feedback across platforms.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Content creators need to optimize their files for different platforms to ensure maximum reach and engagement. By understanding platform requirements, using appropriate formats, and following best practices, you can create content that performs well across all channels.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online file converter, you can easily optimize your content for different platforms. Whether you need to convert videos, audio, or images for specific platforms, we've got you covered with tools that help you achieve the best results for your content.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/video')}
                className="mr-4"
              >
                Start Optimizing Content Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default FileConversionForContentCreators;
