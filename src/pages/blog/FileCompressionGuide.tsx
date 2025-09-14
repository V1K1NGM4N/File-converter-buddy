import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const FileCompressionGuide = () => {
  const navigate = useNavigate();

  const compressionFormatData = [
    {
      format: 'ZIP',
      bestFor: 'General use, Windows',
      compression: 'Good',
      compatibility: 'Universal',
      features: 'Basic encryption, comments',
      fileSize: 'Medium',
      speed: 'Fast'
    },
    {
      format: 'RAR',
      bestFor: 'High compression',
      compression: 'Excellent',
      compatibility: 'Good',
      features: 'Strong encryption, recovery',
      fileSize: 'Small',
      speed: 'Slow'
    },
    {
      format: '7Z',
      bestFor: 'Open source, high compression',
      compression: 'Excellent',
      compatibility: 'Good',
      features: 'Strong encryption, solid',
      fileSize: 'Small',
      speed: 'Slow'
    },
    {
      format: 'TAR',
      bestFor: 'Unix/Linux systems',
      compression: 'None',
      compatibility: 'Unix/Linux',
      features: 'Archive only, no compression',
      fileSize: 'Original',
      speed: 'Very fast'
    },
    {
      format: 'GZIP',
      bestFor: 'Single file compression',
      compression: 'Good',
      compatibility: 'Unix/Linux',
      features: 'Fast compression, standard',
      fileSize: 'Small',
      speed: 'Fast'
    },
    {
      format: 'BZIP2',
      bestFor: 'Maximum compression',
      compression: 'Excellent',
      compatibility: 'Unix/Linux',
      features: 'High compression ratio',
      fileSize: 'Very small',
      speed: 'Very slow'
    }
  ];

  const columns = [
    { header: 'Format', key: 'format', width: '12%' },
    { header: 'Best For', key: 'bestFor', width: '18%' },
    { header: 'Compression', key: 'compression', width: '12%' },
    { header: 'Compatibility', key: 'compatibility', width: '15%' },
    { header: 'Features', key: 'features', width: '20%' },
    { header: 'File Size', key: 'fileSize', width: '12%' },
    { header: 'Speed', key: 'speed', width: '11%' }
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
              File Compression Guide: Understanding Different Compression Formats
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn about different file compression formats, their features, and when to use each one for optimal file size reduction and compatibility.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>File Compression</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              File compression is essential for reducing file sizes, saving storage space, and improving transfer speeds. With various compression formats available, understanding their differences and use cases is crucial for making informed decisions about file management.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore the most common compression formats, their features, compression ratios, and compatibility. Whether you're archiving files, sharing large documents, or optimizing storage, this guide will help you choose the right compression format for your needs.
            </p>
          </section>

          {/* Main Compression Format Comparison Table */}
          <BlogTable
            title="Compression Format Comparison"
            description="Compare different compression formats and their characteristics"
            columns={columns}
            data={compressionFormatData}
          />

          {/* Format-Specific Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Format-Specific Details and Use Cases</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">ZIP - Universal Compression</h3>
                <p className="mb-4">
                  ZIP is the most widely supported compression format, offering good compression ratios and universal compatibility. It's the standard choice for most file compression needs across different platforms and applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal compatibility</li>
                      <li>• Fast compression and decompression</li>
                      <li>• Built-in support in most operating systems</li>
                      <li>• Good balance of compression and speed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Moderate compression ratio</li>
                      <li>• Limited encryption options</li>
                      <li>• Not the best for very large files</li>
                      <li>• Basic error recovery</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">RAR - High Compression</h3>
                <p className="mb-4">
                  RAR offers excellent compression ratios and advanced features like strong encryption and error recovery. It's ideal for situations where maximum compression is needed and compatibility is less critical.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Excellent compression ratios</li>
                      <li>• Strong encryption capabilities</li>
                      <li>• Advanced error recovery</li>
                      <li>• Support for large files</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Slower compression speed</li>
                      <li>• Requires proprietary software</li>
                      <li>• Limited free software support</li>
                      <li>• Not as widely supported as ZIP</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">7Z - Open Source High Compression</h3>
                <p className="mb-4">
                  7Z is an open-source compression format that offers excellent compression ratios and advanced features. It's perfect for users who want high compression without proprietary software limitations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Open source and free</li>
                      <li>• Excellent compression ratios</li>
                      <li>• Strong encryption support</li>
                      <li>• Solid compression for better ratios</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Slower compression speed</li>
                      <li>• Limited native OS support</li>
                      <li>• Requires third-party software</li>
                      <li>• Not as widely adopted as ZIP</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Choose the Right Format */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Choose the Right Compression Format</h2>
            <p className="mb-4">
              Selecting the appropriate compression format depends on your specific needs, target audience, and intended use. Here's a guide to help you make the right choice:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Maximum Compatibility:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>ZIP</strong> - Best for sharing and general use</li>
                  <li>• <strong>TAR</strong> - For Unix/Linux systems</li>
                  <li>• <strong>GZIP</strong> - For single file compression</li>
                  <li>• <strong>BZIP2</strong> - For maximum compression</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For High Compression:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>RAR</strong> - Best compression with features</li>
                  <li>• <strong>7Z</strong> - Open source high compression</li>
                  <li>• <strong>BZIP2</strong> - Maximum compression ratio</li>
                  <li>• <strong>ZIP</strong> - Good balance of speed and compression</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Compression Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Compression Best Practices</h2>
            <p className="mb-4">
              Following best practices ensures optimal compression results and maintains file integrity:
            </p>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Compression Guidelines:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Choose format based on use case</li>
                      <li>• Test compression ratios</li>
                      <li>• Use appropriate compression levels</li>
                      <li>• Verify file integrity after compression</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using wrong format for target audience</li>
                      <li>• Over-compressing already compressed files</li>
                      <li>• Not testing decompression</li>
                      <li>• Ignoring compatibility requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Which compression format has the best compression ratio?</h3>
                <p className="text-muted-foreground">
                  BZIP2 typically offers the best compression ratio, followed by RAR and 7Z. However, these formats are slower to compress and decompress. ZIP offers a good balance of compression ratio and speed, making it suitable for most general-purpose compression needs.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I compress already compressed files?</h3>
                <p className="text-muted-foreground">
                  Compressing already compressed files (like JPEG images, MP3 audio, or MP4 video) will typically result in little to no size reduction, and may even increase file size. Compression works best on uncompressed or lightly compressed files like text documents, raw images, or uncompressed audio.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between archiving and compressing?</h3>
                <p className="text-muted-foreground">
                  Archiving combines multiple files into a single file without necessarily reducing size (like TAR). Compression reduces file size using algorithms (like ZIP, RAR, 7Z). Many formats combine both functions, creating compressed archives that contain multiple files in a smaller package.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I choose between speed and compression ratio?</h3>
                <p className="text-muted-foreground">
                  Choose speed (ZIP, GZIP) when you need quick compression/decompression for frequent use or large batches. Choose high compression (RAR, 7Z, BZIP2) when file size is more important than speed, such as for long-term storage or slow network transfers.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Understanding different compression formats is essential for efficient file management. Each format has its strengths and use cases, from universal compatibility with ZIP to maximum compression with RAR and 7Z.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              By choosing the right compression format for your specific needs, you can optimize file sizes, improve transfer speeds, and ensure compatibility across different platforms and applications. With our free online file converter, you can easily compress and decompress files in various formats as needed.
            </p>
            
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
        </div>
      </article>
    </div>
  );
};

export default FileCompressionGuide;