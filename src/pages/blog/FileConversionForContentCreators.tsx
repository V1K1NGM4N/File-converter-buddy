import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
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
              File Conversion for Content Creators: Optimizing Media for Different Platforms
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to convert and optimize your media files for different social media platforms, ensuring the best quality and compatibility for your content.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>18 min read</span>
              <span>•</span>
              <span>Content Creation</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              As a content creator, understanding how to convert and optimize your media files for different platforms is crucial for maximizing engagement and maintaining quality. Each social media platform has specific requirements for video, audio, and image formats that can significantly impact your content's performance.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore the optimal file formats, resolutions, and settings for major social media platforms. Whether you're creating content for YouTube, Instagram, TikTok, or other platforms, this guide will help you optimize your media for the best results.
            </p>
          </section>

          {/* Main Platform Comparison Table */}
          <BlogTable
            title="Social Media Platform Media Requirements"
            description="Compare media format requirements across different social media platforms"
            columns={columns}
            data={contentCreatorData}
          />

          {/* Platform-Specific Optimization */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Platform-Specific Optimization Strategies</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">YouTube Optimization</h3>
                <p className="mb-4">
                  YouTube supports high-quality video formats and offers excellent compression. For the best results, use MP4 with H.264 codec and AAC audio, with resolutions up to 4K for maximum quality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use MP4 with H.264 codec</li>
                      <li>• AAC audio at 128-320 kbps</li>
                      <li>• 1080p or 4K resolution</li>
                      <li>• 8-15 Mbps bitrate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Very high bitrates (over 15 Mbps)</li>
                      <li>• Uncompressed formats</li>
                      <li>• Aspect ratios other than 16:9</li>
                      <li>• Audio below 128 kbps</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Instagram Optimization</h3>
                <p className="mb-4">
                  Instagram has specific requirements for different content types. Square videos work best for feed posts, while vertical videos are ideal for Stories and Reels. Keep file sizes reasonable for faster uploads.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Square format (1080x1080) for feed</li>
                      <li>• Vertical format (1080x1920) for Stories</li>
                      <li>• MP4 with H.264 codec</li>
                      <li>• 3-5 Mbps bitrate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Landscape videos for feed posts</li>
                      <li>• Very high bitrates</li>
                      <li>• Long videos (over 60 seconds)</li>
                      <li>• Unsupported formats</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">TikTok Optimization</h3>
                <p className="mb-4">
                  TikTok is optimized for vertical, mobile-first content. Use vertical video format with good quality but reasonable file sizes for faster uploads and better user experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Vertical format (1080x1920)</li>
                      <li>• MP4 with H.264 codec</li>
                      <li>• 2-4 Mbps bitrate</li>
                      <li>• 15-60 second duration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Landscape or square formats</li>
                      <li>• Very high bitrates</li>
                      <li>• Videos over 60 seconds</li>
                      <li>• Poor audio quality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Our File Converter */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use Our File Converter for Content Creation</h2>
            <p className="mb-4">
              Our free online file converter makes it easy to optimize your media files for different social media platforms. Here's how to use it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Content Optimization Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your original media file (video, audio, or image)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select the target platform format (YouTube, Instagram, TikTok, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Choose your preferred quality settings and resolution</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Preview the conversion settings and adjust if needed</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download your optimized media file ready for upload</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                Try Our File Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Content Creation Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">File Management:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Keep original high-quality files</li>
                  <li>• Create platform-specific versions</li>
                  <li>• Use consistent naming conventions</li>
                  <li>• Organize files by platform and date</li>
                  <li>• Backup important content</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Quality Optimization:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Balance quality with file size</li>
                  <li>• Test different settings</li>
                  <li>• Monitor upload times</li>
                  <li>• Check playback quality</li>
                  <li>• Optimize for mobile viewing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best video format for social media?</h3>
                <p className="text-muted-foreground">
                  MP4 with H.264 codec is the best choice for most social media platforms. It offers excellent compatibility, good compression, and is supported by all major platforms. The specific resolution and bitrate depend on the platform and your content type.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I optimize videos for mobile viewing?</h3>
                <p className="text-muted-foreground">
                  For mobile optimization, use vertical or square formats, keep file sizes reasonable (under 100MB), use appropriate bitrates (2-5 Mbps), and ensure good audio quality. Test your videos on actual mobile devices to ensure they look and sound good.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I use the same video for all platforms?</h3>
                <p className="text-muted-foreground">
                  While you can use the same video for all platforms, it's better to create platform-specific versions. Each platform has different optimal formats, resolutions, and aspect ratios. Creating tailored versions ensures the best quality and user experience on each platform.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I reduce file sizes without losing quality?</h3>
                <p className="text-muted-foreground">
                  To reduce file sizes while maintaining quality, use efficient codecs like H.264, optimize bitrates for your content type, remove unnecessary audio tracks, and consider using platform-specific compression settings. Test different settings to find the best balance for your content.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Optimizing your media files for different social media platforms is essential for content creators who want to maximize engagement and maintain quality. By understanding each platform's requirements and using the right tools, you can ensure your content looks and performs its best.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online file converter, you can easily optimize your media files for any social media platform. Whether you're creating content for YouTube, Instagram, TikTok, or other platforms, we've got you covered with tools that simplify the optimization process and help you achieve the best results.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                Start Optimizing Your Content
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