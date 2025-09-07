import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const AudioQualityVsFileSizeGuide = () => {
  const navigate = useNavigate();

  const audioQualityData = [
    {
      format: 'MP3 128 kbps',
      fileSize: '1 MB per minute',
      quality: 'Good',
      useCase: 'Web streaming, podcasts',
      compatibility: 'Universal',
      recommendation: 'General use'
    },
    {
      format: 'MP3 192 kbps',
      fileSize: '1.4 MB per minute',
      quality: 'Very Good',
      useCase: 'Music streaming, web',
      compatibility: 'Universal',
      recommendation: 'Balanced choice'
    },
    {
      format: 'MP3 320 kbps',
      fileSize: '2.4 MB per minute',
      quality: 'Excellent',
      useCase: 'High-quality music',
      compatibility: 'Universal',
      recommendation: 'Premium quality'
    },
    {
      format: 'AAC 128 kbps',
      fileSize: '1 MB per minute',
      quality: 'Very Good',
      useCase: 'Apple devices, streaming',
      compatibility: 'Good',
      recommendation: 'Apple ecosystem'
    },
    {
      format: 'FLAC',
      fileSize: '10-15 MB per minute',
      quality: 'Perfect',
      useCase: 'Audiophiles, archival',
      compatibility: 'Limited',
      recommendation: 'Lossless quality'
    },
    {
      format: 'WAV',
      fileSize: '10-15 MB per minute',
      quality: 'Perfect',
      useCase: 'Professional, editing',
      compatibility: 'Universal',
      recommendation: 'Professional use'
    }
  ];

  const columns = [
    { header: 'Format & Bitrate', key: 'format', width: '18%' },
    { header: 'File Size', key: 'fileSize', width: '15%' },
    { header: 'Quality', key: 'quality', width: '12%' },
    { header: 'Use Case', key: 'useCase', width: '20%' },
    { header: 'Compatibility', key: 'compatibility', width: '15%' },
    { header: 'Recommendation', key: 'recommendation', width: '20%' }
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
              Audio Quality vs File Size Guide: Finding the Perfect Balance
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to balance audio quality and file size for different use cases, from web streaming to professional audio production.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>Audio Quality</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Balancing audio quality and file size is crucial for different applications. Whether you're streaming music, creating podcasts, or producing professional audio, understanding the trade-offs between quality and file size helps you make informed decisions.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore different audio formats and bitrates, explain how they affect quality and file size, and help you choose the right settings for your specific needs. Plus, we'll show you how to easily convert and optimize audio using our free online audio converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Audio Quality vs File Size Comparison"
            description="Compare different audio formats and bitrates to find the perfect balance for your needs"
            columns={columns}
            data={audioQualityData}
          />

          {/* Detailed Quality Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding Audio Quality and File Size</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Bitrate and Quality Relationship</h3>
                <p className="mb-4">
                  Bitrate directly affects both audio quality and file size. Higher bitrates provide better quality but create larger files. Understanding this relationship helps you choose the right settings for your needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Quality Factors:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Higher bitrate = better quality</li>
                      <li>• Lossless formats preserve original quality</li>
                      <li>• Codec efficiency affects quality at same bitrate</li>
                      <li>• Source material quality matters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">File Size Factors:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Higher bitrate = larger files</li>
                      <li>• Lossless formats create very large files</li>
                      <li>• Compression efficiency varies by codec</li>
                      <li>• Audio length directly affects file size</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Format Selection for Different Use Cases</h3>
                <p className="mb-4">
                  Different audio formats are optimized for different use cases. Understanding the strengths and limitations of each format helps you make the right choice for your specific needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use MP3 for maximum compatibility</li>
                      <li>• Consider AAC for better quality at same bitrate</li>
                      <li>• Use FLAC for lossless archival</li>
                      <li>• Choose format based on target audience</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using unnecessarily high bitrates</li>
                      <li>• Not considering target device capabilities</li>
                      <li>• Ignoring format compatibility</li>
                      <li>• Not testing on different playback systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Optimizing for Different Applications</h3>
                <p className="mb-4">
                  Different applications have different requirements for audio quality and file size. Understanding these requirements helps you optimize your audio for the best results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Match quality to application needs</li>
                      <li>• Consider bandwidth limitations</li>
                      <li>• Test on target devices and systems</li>
                      <li>• Balance quality vs accessibility</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using same settings for all applications</li>
                      <li>• Not considering user experience</li>
                      <li>• Ignoring platform-specific requirements</li>
                      <li>• Not testing with real-world conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Optimize Audio */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Optimize Audio Quality and File Size</h2>
            <p className="mb-4">
              Optimizing audio for the right balance of quality and file size requires understanding your needs and testing different settings. Here's how to do it:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Optimization Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your audio file (supports drag & drop or click to browse)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select the appropriate format and bitrate for your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Adjust quality settings and test different options</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Download optimized audio and test on target devices</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/audio')}
                className="mr-4"
              >
                Try Our Audio Optimizer
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Audio Quality and File Size</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Web and Streaming:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use MP3 at 128-192 kbps for good quality and small size</li>
                  <li>• Consider AAC for better quality at same bitrate</li>
                  <li>• Test on different devices and connections</li>
                  <li>• Provide multiple quality options when possible</li>
                  <li>• Consider adaptive bitrate streaming</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Professional Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use lossless formats (FLAC, WAV) for mastering</li>
                  <li>• Maintain high bitrates (320 kbps+) for distribution</li>
                  <li>• Consider the target audience and platform</li>
                  <li>• Test on professional playback systems</li>
                  <li>• Balance quality with accessibility</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best bitrate for music streaming?</h3>
                <p className="text-muted-foreground">
                  For music streaming, 192-320 kbps is generally recommended. 192 kbps provides good quality with reasonable file sizes, while 320 kbps offers excellent quality for premium services. Consider your audience's bandwidth and device capabilities.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I hear the difference between different bitrates?</h3>
                <p className="text-muted-foreground">
                  The ability to hear differences depends on your audio equipment, listening environment, and experience. Most people can hear differences between 128 kbps and 320 kbps, but the difference between 192 kbps and 320 kbps is often subtle.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use lossless formats for all my music?</h3>
                <p className="text-muted-foreground">
                  Lossless formats are ideal for archival and professional use, but they create very large files. For everyday listening and streaming, high-quality lossy formats (MP3 320 kbps, AAC) are usually sufficient and more practical.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I choose the right format for my podcast?</h3>
                <p className="text-muted-foreground">
                  For podcasts, MP3 at 128-192 kbps is usually sufficient since most content is speech. This provides good quality while keeping file sizes manageable for download and streaming. Consider your audience's needs and platform requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Balancing audio quality and file size requires understanding your specific needs and testing different options. By choosing the right format and bitrate for your use case, you can achieve the best results for your audience and application.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online audio converter, you can easily optimize your audio files for the perfect balance of quality and file size. Whether you need to compress for web streaming, optimize for professional use, or convert between formats, we've got you covered.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/audio')}
                className="mr-4"
              >
                Start Optimizing Audio Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default AudioQualityVsFileSizeGuide;
