import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
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
              Complete Guide to Video File Formats: MP4 vs AVI vs MOV vs WebM
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Everything you need to know about video formats, their differences, and when to use each one for optimal results.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>Video Conversion</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Video formats can be confusing, but choosing the right one is crucial for your content's success. Whether you're uploading to YouTube, creating a website, or archiving memories, the format you choose affects file size, quality, and compatibility.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll break down the most popular video formats, compare their strengths and weaknesses, and show you exactly when to use each one. Plus, we'll show you how to easily convert between formats using our free online video converter.
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
                  MP4 is the most widely used video format today, especially for web content and mobile devices. It offers excellent compression while maintaining high quality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal compatibility</li>
                      <li>• Excellent compression</li>
                      <li>• Perfect for web and mobile</li>
                      <li>• Supports multiple codecs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited advanced features</li>
                      <li>• Not ideal for professional editing</li>
                      <li>• Some codecs require licensing</li>
                      <li>• Less flexible than container formats</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">AVI (Audio Video Interleave)</h3>
                <p className="mb-4">
                  AVI is one of the oldest video formats, developed by Microsoft. It's great for archival purposes and maintains high quality, but creates larger file sizes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Excellent quality preservation</li>
                      <li>• Wide codec support</li>
                      <li>• Good for archival storage</li>
                      <li>• No compression artifacts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Very large file sizes</li>
                      <li>• Limited web compatibility</li>
                      <li>• Not suitable for streaming</li>
                      <li>• Outdated format</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">WebM (Web Media)</h3>
                <p className="mb-4">
                  WebM is Google's open-source video format designed specifically for web use. It provides excellent compression and is royalty-free.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Excellent web performance</li>
                      <li>• Open source and royalty-free</li>
                      <li>• Great compression efficiency</li>
                      <li>• HTML5 native support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited browser support (95%)</li>
                      <li>• Not supported by older devices</li>
                      <li>• Requires fallback formats</li>
                      <li>• Less editing software support</li>
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
                  <span>Select your desired output format (MP4, WebM, AVI, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Click "Start Conversion" to process your files</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Download your converted videos individually or as a ZIP file</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/video')}
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
                  <li>• Consider adaptive bitrate streaming for long videos</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Professional Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use MOV for professional editing workflows</li>
                  <li>• Consider MKV for high-quality archival</li>
                  <li>• Use lossless codecs for intermediate editing</li>
                  <li>• Maintain original quality until final export</li>
                  <li>• Use appropriate frame rates for your content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between MP4 and AVI?</h3>
                <p className="text-muted-foreground">
                  MP4 is a modern, compressed format perfect for web use and mobile devices. AVI is an older format that maintains higher quality but creates much larger files. MP4 is generally better for most use cases today.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use WebM for my website?</h3>
                <p className="text-muted-foreground">
                  WebM is excellent for modern websites due to its superior compression and open-source nature. However, you should always provide MP4 fallback for older browsers and devices that don't support WebM.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I convert videos without losing quality?</h3>
                <p className="text-muted-foreground">
                  Converting between lossy formats will always result in some quality loss. However, using high-quality settings and appropriate codecs can minimize this loss. For archival purposes, consider using lossless formats.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best format for YouTube?</h3>
                <p className="text-muted-foreground">
                  YouTube accepts many formats, but MP4 with H.264 codec is recommended for the best compatibility and upload speed. YouTube will automatically convert your video to their preferred formats for streaming.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right video format depends on your specific needs: use MP4 for web and mobile, WebM for modern web optimization, AVI for archival storage, and MOV for professional editing. The key is understanding each format's strengths and limitations.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online video converter, you can easily convert between any of these formats in seconds. Whether you're optimizing for web performance, preparing videos for professional use, or converting for specific applications, we've got you covered.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/video')}
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
