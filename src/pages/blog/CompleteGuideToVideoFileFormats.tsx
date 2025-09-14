import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const CompleteGuideToVideoFileFormats = () => {
  const navigate = useNavigate();

  const videoFormatData = [
    {
      format: 'MP4',
      bestFor: 'Web, mobile, streaming',
      fileSize: 'Small',
      quality: 'Excellent',
      browserSupport: '100%',
      compression: 'H.264/H.265',
      audioSupport: 'Yes'
    },
    {
      format: 'AVI',
      bestFor: 'Windows, archival',
      fileSize: 'Large',
      quality: 'Excellent',
      browserSupport: 'Limited',
      compression: 'Various codecs',
      audioSupport: 'Yes'
    },
    {
      format: 'MOV',
      bestFor: 'Mac, professional',
      fileSize: 'Large',
      quality: 'Excellent',
      browserSupport: 'Good',
      compression: 'QuickTime',
      audioSupport: 'Yes'
    },
    {
      format: 'WebM',
      bestFor: 'Modern web',
      fileSize: 'Very Small',
      quality: 'Excellent',
      browserSupport: '95%',
      compression: 'VP8/VP9',
      audioSupport: 'Yes'
    },
    {
      format: 'MKV',
      bestFor: 'High quality, features',
      fileSize: 'Large',
      quality: 'Excellent',
      browserSupport: 'Limited',
      compression: 'Multiple codecs',
      audioSupport: 'Yes'
    },
    {
      format: 'FLV',
      bestFor: 'Flash streaming',
      fileSize: 'Small',
      quality: 'Good',
      browserSupport: 'Deprecated',
      compression: 'H.264',
      audioSupport: 'Yes'
    }
  ];

  const columns = [
    { header: 'Format', key: 'format', width: '12%' },
    { header: 'Best For', key: 'bestFor', width: '18%' },
    { header: 'File Size', key: 'fileSize', width: '12%' },
    { header: 'Quality', key: 'quality', width: '12%' },
    { header: 'Browser Support', key: 'browserSupport', width: '15%' },
    { header: 'Compression', key: 'compression', width: '18%' },
    { header: 'Audio Support', key: 'audioSupport', width: '13%' }
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
              Complete Guide to Video File Formats: MP4 vs AVI vs MOV vs WebM
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Everything you need to know about video formats, their differences, and when to use each one for optimal results.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>18 min read</span>
              <span>•</span>
              <span>Video Conversion</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Video file formats can be confusing, with dozens of options available. Choosing the right format affects file size, quality, compatibility, and playback performance. Understanding the differences between formats like MP4, AVI, MOV, and WebM is crucial for content creators, developers, and anyone working with video.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll break down each major video format, compare their strengths and weaknesses, and show you exactly when to use each one. Plus, we'll show you how to easily convert between formats using our free online video converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Video Format Comparison"
            description="Compare different video formats to choose the best one for your needs"
            columns={columns}
            data={videoFormatData}
          />

          {/* Detailed Format Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Format Analysis</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">MP4 (MPEG-4 Part 14)</h3>
                <p className="mb-4">
                  MP4 is the most widely used video format today, especially for web content and mobile devices. It's based on the QuickTime file format and supports multiple codecs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal compatibility</li>
                      <li>• Excellent compression</li>
                      <li>• Supports multiple codecs</li>
                      <li>• Great for streaming</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited advanced features</li>
                      <li>• Not ideal for professional editing</li>
                      <li>• Some codec limitations</li>
                      <li>• Metadata support varies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">AVI (Audio Video Interleave)</h3>
                <p className="mb-4">
                  AVI is one of the oldest video formats, developed by Microsoft. It's widely supported but has some limitations compared to modern formats.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Excellent quality</li>
                      <li>• Wide codec support</li>
                      <li>• Good for archival</li>
                      <li>• Simple structure</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Large file sizes</li>
                      <li>• Limited web support</li>
                      <li>• No streaming features</li>
                      <li>• Outdated technology</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">MOV (QuickTime Movie)</h3>
                <p className="mb-4">
                  MOV is Apple's video format, based on the QuickTime framework. It's popular in professional video production and Mac environments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• High quality</li>
                      <li>• Professional features</li>
                      <li>• Excellent codec support</li>
                      <li>• Good for editing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Large file sizes</li>
                      <li>• Limited web compatibility</li>
                      <li>• Mac-centric</li>
                      <li>• Requires QuickTime</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">WebM</h3>
                <p className="mb-4">
                  WebM is Google's open-source video format designed specifically for web use. It provides excellent compression and is widely supported by modern browsers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Excellent compression</li>
                      <li>• Open source</li>
                      <li>• Great for web</li>
                      <li>• Modern codecs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited browser support</li>
                      <li>• Not ideal for editing</li>
                      <li>• Newer format</li>
                      <li>• Limited professional use</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Convert Videos */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Convert Videos Between Formats</h2>
            <p className="mb-4">
              Converting videos between different formats is easy with our free online video converter. Here's how to do it:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Conversion Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your video files (supports drag & drop or click to browse)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select your desired output format (MP4, AVI, MOV, WebM, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Choose quality settings and compression options</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Click "Start Conversion" to process your videos</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download your converted videos individually or as a ZIP file</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/videos')}
                className="mr-4"
              >
                Try Our Video Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Video Formats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Web Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use MP4 with H.264 codec for maximum compatibility</li>
                  <li>• Consider WebM for modern browsers with MP4 fallback</li>
                  <li>• Optimize file sizes for faster loading</li>
                  <li>• Use appropriate resolution for your use case</li>
                  <li>• Test playback across different browsers</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Professional Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use MOV for professional editing workflows</li>
                  <li>• Consider AVI for archival purposes</li>
                  <li>• Use high-quality codecs for production</li>
                  <li>• Maintain original quality when possible</li>
                  <li>• Use appropriate bitrates for your content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between a container and a codec?</h3>
                <p className="text-muted-foreground">
                  A container (like MP4, AVI, MOV) is the file format that holds the video and audio data, while a codec (like H.264, VP9) is the compression method used to encode the video data. The same codec can be used in different containers.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Which format is best for YouTube?</h3>
                <p className="text-muted-foreground">
                  YouTube recommends MP4 with H.264 codec for the best compatibility and quality. This format provides excellent compression while maintaining high quality and works well with YouTube's processing system.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I convert videos without losing quality?</h3>
                <p className="text-muted-foreground">
                  Converting from lossy formats to lossless formats won't restore lost quality, but it will prevent further quality loss. Converting between lossless formats maintains perfect quality. For best results, use high-quality source files and appropriate output settings.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best format for mobile devices?</h3>
                <p className="text-muted-foreground">
                  MP4 with H.264 codec is the best choice for mobile devices due to its excellent compatibility, good compression, and support for hardware acceleration. It works well on both iOS and Android devices.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right video format depends on your specific needs: use MP4 for web and mobile, MOV for professional editing, AVI for archival, and WebM for modern web optimization. The key is understanding each format's strengths and limitations.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online video converter, you can easily convert between any of these formats in seconds. Whether you're optimizing for web performance, preparing videos for professional use, or converting for specific applications, we've got you covered.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/videos')}
                className="mr-4"
              >
                Start Converting Videos Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default CompleteGuideToVideoFileFormats;