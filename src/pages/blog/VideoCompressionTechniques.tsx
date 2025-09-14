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
              Video Compression Techniques: Optimize Your Video Files for Better Performance
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn advanced video compression techniques to reduce file sizes while maintaining quality, including codec selection, bitrate optimization, and resolution scaling.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>17 min read</span>
              <span>•</span>
              <span>Video Compression</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Video compression is essential for reducing file sizes, improving streaming performance, and optimizing storage space. With the right techniques, you can significantly reduce video file sizes while maintaining acceptable quality for your intended use.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore the most effective video compression techniques, from codec selection to advanced optimization strategies. Whether you're creating content for web, mobile, or storage, this guide will help you achieve optimal compression results.
            </p>
          </section>

          {/* Main Compression Techniques Table */}
          <BlogTable
            title="Video Compression Techniques Comparison"
            description="Compare different video compression techniques and their impact on file size and quality"
            columns={columns}
            data={compressionData}
          />

          {/* Codec Selection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Codec Selection and Optimization</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">H.264 - The Universal Standard</h3>
                <p className="mb-4">
                  H.264 is the most widely supported video codec, offering excellent compression and universal compatibility. It's ideal for most applications, from web streaming to mobile devices, providing a good balance of quality and file size.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal browser and device support</li>
                      <li>• Good compression efficiency</li>
                      <li>• Fast encoding and decoding</li>
                      <li>• Hardware acceleration support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Not the most efficient codec</li>
                      <li>• Limited compression for very large files</li>
                      <li>• Older technology</li>
                      <li>• May not be optimal for 4K content</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">H.265/HEVC - The Efficiency Leader</h3>
                <p className="mb-4">
                  H.265 (HEVC) offers significantly better compression than H.264, typically reducing file sizes by 50% while maintaining the same quality. It's ideal for high-resolution content and storage optimization.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• 50% better compression than H.264</li>
                      <li>• Excellent for 4K and 8K content</li>
                      <li>• Better quality at lower bitrates</li>
                      <li>• Growing hardware support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited browser support</li>
                      <li>• Higher encoding complexity</li>
                      <li>• Licensing requirements</li>
                      <li>• Slower encoding times</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">VP9 - The Open Source Alternative</h3>
                <p className="mb-4">
                  VP9 is Google's open-source video codec that offers better compression than H.264 and is royalty-free. It's particularly effective for web streaming and is supported by major browsers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Royalty-free and open source</li>
                      <li>• Better compression than H.264</li>
                      <li>• Good browser support</li>
                      <li>• No licensing fees</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited hardware support</li>
                      <li>• Slower encoding than H.264</li>
                      <li>• Not as widely adopted</li>
                      <li>• May not be optimal for all content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Our Video Compressor */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use Our Video Compressor</h2>
            <p className="mb-4">
              Our free online video compressor makes it easy to compress your videos with optimal settings. Here's how to use it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Video Compression Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your video file (MP4, AVI, MOV, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select your target codec and quality settings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Choose resolution and bitrate settings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Preview compression settings and adjust if needed</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download your compressed video</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/videos')}
                className="mr-4"
              >
                Try Our Video Compressor
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Video Compression Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Quality Optimization:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Test different quality settings</li>
                  <li>• Use appropriate bitrates for content</li>
                  <li>• Consider target audience and devices</li>
                  <li>• Balance quality with file size</li>
                  <li>• Monitor compression artifacts</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Performance Considerations:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Choose codecs based on compatibility</li>
                  <li>• Optimize for target platforms</li>
                  <li>• Consider encoding time vs. quality</li>
                  <li>• Test on different devices</li>
                  <li>• Monitor playback performance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best video codec for web streaming?</h3>
                <p className="text-muted-foreground">
                  H.264 is the best choice for web streaming due to its universal browser support and good compression. For modern browsers, VP9 offers better compression, while H.265 provides the best compression but has limited browser support.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How much can I reduce video file sizes?</h3>
                <p className="text-muted-foreground">
                  File size reduction depends on the original video and compression settings. Typically, you can achieve 30-80% reduction without significant quality loss. H.265 can provide 50% better compression than H.264, while resolution scaling can reduce file sizes by 50-80%.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use H.265 for all videos?</h3>
                <p className="text-muted-foreground">
                  H.265 is great for high-resolution content and storage optimization, but it has limited browser support and slower encoding. Use H.264 for web streaming and universal compatibility, H.265 for storage and high-quality content, and VP9 for modern web browsers.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I choose the right bitrate for my video?</h3>
                <p className="text-muted-foreground">
                  Choose bitrate based on your content type and target quality. For web streaming, use 1-5 Mbps for 720p, 5-10 Mbps for 1080p, and 15-25 Mbps for 4K. Test different bitrates to find the best balance between quality and file size for your specific content.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Video compression is essential for optimizing file sizes, improving streaming performance, and reducing storage requirements. By understanding different codecs and compression techniques, you can achieve optimal results for your specific needs and target platforms.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online video compressor, you can easily compress your videos with optimal settings. Whether you're creating content for web, mobile, or storage, we've got you covered with tools that simplify the compression process and help you achieve the best results.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/videos')}
                className="mr-4"
              >
                Start Compressing Your Videos
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