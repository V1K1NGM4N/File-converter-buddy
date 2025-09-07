import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const CompleteGuideToAudioFileFormats = () => {
  const navigate = useNavigate();

  const audioFormatData = [
    {
      format: 'MP3',
      bestFor: 'Music, podcasts, web',
      fileSize: 'Small',
      quality: 'Good (lossy)',
      browserSupport: '100%',
      compression: 'Lossy',
      bitrate: '128-320 kbps'
    },
    {
      format: 'WAV',
      bestFor: 'Professional, archival',
      fileSize: 'Very Large',
      quality: 'Excellent (lossless)',
      browserSupport: '100%',
      compression: 'Uncompressed',
      bitrate: '1411 kbps'
    },
    {
      format: 'FLAC',
      bestFor: 'High-quality music',
      fileSize: 'Large',
      quality: 'Excellent (lossless)',
      browserSupport: 'Good',
      compression: 'Lossless',
      bitrate: 'Variable'
    },
    {
      format: 'AAC',
      bestFor: 'Apple devices, streaming',
      fileSize: 'Small',
      quality: 'Excellent',
      browserSupport: '95%',
      compression: 'Lossy',
      bitrate: '128-320 kbps'
    },
    {
      format: 'OGG',
      bestFor: 'Open source, gaming',
      fileSize: 'Small',
      quality: 'Good',
      browserSupport: 'Limited',
      compression: 'Lossy',
      bitrate: 'Variable'
    },
    {
      format: 'M4A',
      bestFor: 'iTunes, Apple ecosystem',
      fileSize: 'Small',
      quality: 'Excellent',
      browserSupport: 'Good',
      compression: 'Lossy/Lossless',
      bitrate: 'Variable'
    }
  ];

  const columns = [
    { header: 'Format', key: 'format', width: '12%' },
    { header: 'Best For', key: 'bestFor', width: '18%' },
    { header: 'File Size', key: 'fileSize', width: '12%' },
    { header: 'Quality', key: 'quality', width: '18%' },
    { header: 'Browser Support', key: 'browserSupport', width: '15%' },
    { header: 'Compression', key: 'compression', width: '12%' },
    { header: 'Bitrate', key: 'bitrate', width: '13%' }
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
              Complete Guide to Audio File Formats: MP3 vs WAV vs FLAC vs AAC
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Everything you need to know about audio formats, their differences, and when to use each one for optimal sound quality.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>14 min read</span>
              <span>•</span>
              <span>Audio Conversion</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Audio formats can be confusing, but choosing the right one is crucial for your content's success. Whether you're creating music, podcasts, or sound effects, the format you choose affects file size, quality, and compatibility across different devices and platforms.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll break down the most popular audio formats, compare their strengths and weaknesses, and show you exactly when to use each one. Plus, we'll show you how to easily convert between formats using our free online audio converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Audio Format Comparison"
            description="Compare different audio formats to choose the best one for your needs"
            columns={columns}
            data={audioFormatData}
          />

          {/* Detailed Format Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Format Analysis</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">MP3 (MPEG-1 Audio Layer 3)</h3>
                <p className="mb-4">
                  MP3 is the most widely used audio format in the world. It offers excellent compression while maintaining good quality, making it perfect for music distribution and web use.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal compatibility</li>
                      <li>• Small file sizes</li>
                      <li>• Perfect for web and mobile</li>
                      <li>• Excellent compression ratio</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Lossy compression</li>
                      <li>• Quality loss at low bitrates</li>
                      <li>• Not suitable for professional mastering</li>
                      <li>• Limited metadata support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">WAV (Waveform Audio File Format)</h3>
                <p className="mb-4">
                  WAV is an uncompressed audio format that preserves the original sound quality perfectly. It's ideal for professional audio work and archival purposes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Perfect quality preservation</li>
                      <li>• No compression artifacts</li>
                      <li>• Universal compatibility</li>
                      <li>• Ideal for professional use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Very large file sizes</li>
                      <li>• Not suitable for web use</li>
                      <li>• Takes up significant storage</li>
                      <li>• Slow to upload/download</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">FLAC (Free Lossless Audio Codec)</h3>
                <p className="mb-4">
                  FLAC is a lossless audio format that compresses audio without losing any quality. It's perfect for audiophiles and high-quality music distribution.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Lossless compression</li>
                      <li>• 50% smaller than WAV</li>
                      <li>• Open source and free</li>
                      <li>• Perfect for audiophiles</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited browser support</li>
                      <li>• Not supported by all devices</li>
                      <li>• Larger than lossy formats</li>
                      <li>• Requires more processing power</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Convert Audio */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Convert Audio Between Formats</h2>
            <p className="mb-4">
              Converting audio between different formats is easy with our free online audio converter. Here's how to do it:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Conversion Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your audio files (supports drag & drop or click to browse)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select your desired output format (MP3, WAV, FLAC, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Click "Start Conversion" to process your files</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Download your converted audio files individually or as a ZIP file</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/audio')}
                className="mr-4"
              >
                Try Our Audio Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Audio Formats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Web Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use MP3 at 128-192 kbps for good quality and small size</li>
                  <li>• Consider AAC for better quality at same bitrate</li>
                  <li>• Use WAV for short sound effects</li>
                  <li>• Optimize file sizes for faster loading</li>
                  <li>• Test across different browsers and devices</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Professional Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use WAV or FLAC for mastering and editing</li>
                  <li>• Maintain high bitrates (320 kbps+) for final distribution</li>
                  <li>• Use lossless formats for archival storage</li>
                  <li>• Consider the target platform's requirements</li>
                  <li>• Test quality on different playback systems</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between MP3 and WAV?</h3>
                <p className="text-muted-foreground">
                  MP3 is a compressed format that reduces file size by removing some audio data, while WAV is uncompressed and preserves the original quality perfectly. MP3 is better for distribution, WAV is better for professional work.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use FLAC for my music collection?</h3>
                <p className="text-muted-foreground">
                  FLAC is excellent for music collections if you have the storage space and want the best possible quality. It's lossless like WAV but with better compression, making it ideal for audiophiles and music enthusiasts.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I convert audio without losing quality?</h3>
                <p className="text-muted-foreground">
                  Converting between lossy formats (like MP3 to AAC) will result in quality loss. However, converting from lossless to lossless (WAV to FLAC) or from lossy to lossless (MP3 to WAV) won't restore lost quality but won't cause additional loss.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best format for podcasts?</h3>
                <p className="text-muted-foreground">
                  MP3 at 128-192 kbps is ideal for podcasts. It provides good quality for speech while keeping file sizes manageable for download and streaming. AAC can also work well for better quality at similar file sizes.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right audio format depends on your specific needs: use MP3 for web and mobile, WAV for professional work, FLAC for high-quality music, and AAC for Apple devices. The key is understanding each format's strengths and limitations.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online audio converter, you can easily convert between any of these formats in seconds. Whether you're optimizing for web performance, preparing audio for professional use, or converting for specific applications, we've got you covered.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/audio')}
                className="mr-4"
              >
                Start Converting Audio Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default CompleteGuideToAudioFileFormats;
