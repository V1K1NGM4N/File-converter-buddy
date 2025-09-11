import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const VideoCompressionTechniques = () => {
  const navigate = useNavigate();

  const compressionData = [
    {
      technique: 'Codec Selection',
      impact: 'Very High',
      effort: 'Low',
      description: 'Choose the right codec (H.264, H.265, VP9)',
      fileSize: '40-70% reduction',
      quality: 'Excellent'
    },
    {
      technique: 'Bitrate Optimization',
      impact: 'High',
      effort: 'Medium',
      description: 'Adjust bitrate for target quality',
      fileSize: '30-50% reduction',
      quality: 'Good'
    },
    {
      technique: 'Resolution Scaling',
      impact: 'Very High',
      effort: 'Medium',
      description: 'Reduce resolution for target display',
      fileSize: '50-80% reduction',
      quality: 'Variable'
    },
    {
      technique: 'Frame Rate Reduction',
      impact: 'Medium',
      effort: 'Low',
      description: 'Lower frame rate for smaller files',
      fileSize: '20-40% reduction',
      quality: 'Good'
    },
    {
      technique: 'Keyframe Interval',
      impact: 'Low',
      effort: 'Low',
      description: 'Optimize keyframe frequency',
      fileSize: '5-15% reduction',
      quality: 'Excellent'
    },
    {
      technique: 'Audio Compression',
      impact: 'Medium',
      effort: 'Low',
      description: 'Compress audio track separately',
      fileSize: '10-30% reduction',
      quality: 'Good'
    }
  ];

  const columns = [
    { header: 'Technique', key: 'technique', width: '18%' },
    { header: 'Impact', key: 'impact', width: '12%' },
    { header: 'Effort', key: 'effort', width: '12%' },
    { header: 'Description', key: 'description', width: '25%' },
    { header: 'File Size Reduction', key: 'fileSize', width: '18%' },
    { header: 'Quality', key: 'quality', width: '15%' }
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


                    <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Sign In
                    </button>


                    <button className="px-4 py-2 text-sm border border-input bg-background rounded-md hover:bg-accent">
                      Sign Up
                    </button>





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
              Video Compression Techniques: Reduce File Sizes Without Losing Quality
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn advanced video compression techniques to reduce file sizes while maintaining quality for web, mobile, and storage applications.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>18 min read</span>
              <span>•</span>
              <span>Video Compression</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Video compression is essential for reducing file sizes, improving streaming performance, and optimizing storage. With the right techniques, you can significantly reduce video file sizes while maintaining acceptable quality for your specific use case.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll cover the most effective video compression techniques, explain how different codecs work, and help you choose the right settings for your needs. Plus, we'll show you how to easily compress videos using our free online video converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Video Compression Techniques"
            description="Compare different compression techniques and their impact on file size and quality"
            columns={columns}
            data={compressionData}
          />

          {/* Detailed Compression Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Compression Techniques</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Codec Selection and Optimization</h3>
                <p className="mb-4">
                  Choosing the right codec is crucial for video compression. Modern codecs like H.265 (HEVC) and VP9 offer superior compression compared to older formats like H.264, but compatibility varies across devices and platforms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use H.264 for maximum compatibility</li>
                      <li>• Consider H.265 for better compression</li>
                      <li>• Use VP9 for web optimization</li>
                      <li>• Test on target devices and platforms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using outdated codecs unnecessarily</li>
                      <li>• Not considering device compatibility</li>
                      <li>• Ignoring encoding time vs file size trade-offs</li>
                      <li>• Using wrong codec for content type</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Bitrate and Quality Optimization</h3>
                <p className="mb-4">
                  Bitrate directly affects both file size and quality. Finding the right balance requires understanding your content type, target audience, and delivery method. Different content types have different optimal bitrate requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use variable bitrate (VBR) for most content</li>
                      <li>• Adjust bitrate based on content complexity</li>
                      <li>• Consider target device capabilities</li>
                      <li>• Test different bitrate settings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using constant bitrate unnecessarily</li>
                      <li>• Setting bitrate too high or too low</li>
                      <li>• Not considering content type</li>
                      <li>• Ignoring target audience needs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Resolution and Frame Rate Optimization</h3>
                <p className="mb-4">
                  Resolution and frame rate have the biggest impact on file size. Reducing resolution can dramatically decrease file size, while frame rate reduction is effective for content that doesn't require smooth motion.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Match resolution to display requirements</li>
                      <li>• Use 24-30 fps for most content</li>
                      <li>• Consider content type and motion</li>
                      <li>• Test on target devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using unnecessarily high resolution</li>
                      <li>• Not considering display size</li>
                      <li>• Using wrong frame rate for content</li>
                      <li>• Ignoring aspect ratio considerations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Compress Videos */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Compress Videos Effectively</h2>
            <p className="mb-4">
              Compressing videos effectively requires understanding your content and target requirements. Here's how to do it:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Compression Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your video file (supports drag & drop or click to browse)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select the appropriate codec and format for your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Adjust compression settings (bitrate, resolution, frame rate)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Start compression and download the optimized video</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/video')}
                className="mr-4"
              >
                Try Our Video Compressor
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Video Compression</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Web and Streaming:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use H.264 codec for maximum compatibility</li>
                  <li>• Optimize for target bitrate and resolution</li>
                  <li>• Consider adaptive bitrate streaming</li>
                  <li>• Use appropriate frame rates (24-30 fps)</li>
                  <li>• Test on different devices and connections</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Storage and Archival:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use H.265 for maximum compression</li>
                  <li>• Consider lossless compression for critical content</li>
                  <li>• Balance compression time vs file size</li>
                  <li>• Use appropriate resolution for future use</li>
                  <li>• Consider long-term codec support</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How much can I reduce video file sizes?</h3>
                <p className="text-muted-foreground">
                  With proper compression techniques, you can typically reduce video file sizes by 50-80% without significant quality loss. The exact reduction depends on the original format, content type, and compression settings used.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Which codec should I use for different purposes?</h3>
                <p className="text-muted-foreground">
                  Use H.264 for maximum compatibility and web streaming, H.265 for better compression and modern devices, and VP9 for web optimization. Consider your target audience and device capabilities when choosing.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between constant and variable bitrate?</h3>
                <p className="text-muted-foreground">
                  Constant bitrate (CBR) maintains the same bitrate throughout the video, while variable bitrate (VBR) adjusts based on content complexity. VBR generally provides better quality at the same file size but may cause streaming issues.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I choose the right resolution for my video?</h3>
                <p className="text-muted-foreground">
                  Choose resolution based on your target display size and audience. Use 1080p for most web content, 720p for mobile devices, and 4K only when necessary. Consider the content type and viewing distance when deciding.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Video compression is essential for reducing file sizes, improving streaming performance, and optimizing storage. By choosing the right codec, optimizing bitrate and resolution, and following best practices, you can achieve significant file size reductions while maintaining acceptable quality.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online video converter, you can easily compress your videos using advanced techniques. Whether you need to optimize for web streaming, reduce storage requirements, or convert between formats, we've got you covered with tools that help you achieve the best results.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/video')}
                className="mr-4"
              >
                Start Compressing Videos Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default VideoCompressionTechniques;
