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
              File Compression Guide: ZIP vs RAR vs 7Z - Which Format to Choose?
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn about different compression formats, their strengths, and when to use each one for optimal file size reduction and compatibility.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>13 min read</span>
              <span>•</span>
              <span>File Compression</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              File compression is essential for reducing file sizes, making files easier to share, store, and transfer. With so many compression formats available, choosing the right one can be confusing. Each format has its own strengths and use cases.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll break down the most popular compression formats, compare their features, and help you choose the best one for your needs. Plus, we'll show you how to easily compress and extract files using our free online file converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Compression Format Comparison"
            description="Compare different compression formats to choose the best one for your needs"
            columns={columns}
            data={compressionFormatData}
          />

          {/* Detailed Format Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Format Analysis</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">ZIP (ZIP Archive)</h3>
                <p className="mb-4">
                  ZIP is the most widely used compression format, supported by virtually every operating system and software. It offers good compression with fast processing speeds.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal compatibility</li>
                      <li>• Fast compression and extraction</li>
                      <li>• Built into most operating systems</li>
                      <li>• Good for general use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Lower compression ratio</li>
                      <li>• Limited encryption options</li>
                      <li>• No recovery records</li>
                      <li>• Basic features only</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">RAR (Roshal Archive)</h3>
                <p className="mb-4">
                  RAR offers excellent compression ratios and advanced features like strong encryption and recovery records. It's popular for archiving large amounts of data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Excellent compression ratio</li>
                      <li>• Strong encryption support</li>
                      <li>• Recovery records for damaged archives</li>
                      <li>• Advanced features</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Slower compression</li>
                      <li>• Requires special software to extract</li>
                      <li>• Proprietary format</li>
                      <li>• Not built into operating systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">7Z (7-Zip Archive)</h3>
                <p className="mb-4">
                  7Z is an open-source compression format that offers excellent compression ratios and advanced features. It's free and supports many compression algorithms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Open source and free</li>
                      <li>• Excellent compression ratio</li>
                      <li>• Strong encryption support</li>
                      <li>• Multiple compression algorithms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Slower compression</li>
                      <li>• Requires special software</li>
                      <li>• Less universal support</li>
                      <li>• Can be complex for beginners</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Compress Files */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Compress Files Effectively</h2>
            <p className="mb-4">
              Compressing files effectively requires understanding your needs and choosing the right format. Here's how to do it:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Compression Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Select the files and folders you want to compress</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Choose the appropriate compression format for your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Set compression level and other options as needed</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Create the compressed archive and verify the results</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Try Our File Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for File Compression</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For General Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use ZIP for maximum compatibility</li>
                  <li>• Choose appropriate compression level</li>
                  <li>• Consider file types and their compressibility</li>
                  <li>• Test different formats for your specific files</li>
                  <li>• Keep original files until you verify the archive</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Maximum Compression:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use RAR or 7Z for best compression ratios</li>
                  <li>• Enable solid compression for multiple files</li>
                  <li>• Use highest compression settings</li>
                  <li>• Consider the time vs space trade-off</li>
                  <li>• Test with your specific file types</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Which compression format should I use?</h3>
                <p className="text-muted-foreground">
                  Use ZIP for general compatibility, RAR for maximum compression with advanced features, or 7Z for open-source high compression. Consider your audience's ability to extract the files when choosing.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Why don't some files compress much?</h3>
                <p className="text-muted-foreground">
                  Some files are already compressed (like JPEG images, MP3 audio, or MP4 video) and won't compress much further. Text files, documents, and uncompressed media compress the best.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Is it safe to compress important files?</h3>
                <p className="text-muted-foreground">
                  Yes, compression is generally safe, but always keep backups of important files. Use formats with recovery records (like RAR) for critical archives, and test extraction before deleting originals.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I password-protect compressed files?</h3>
                <p className="text-muted-foreground">
                  Yes, most modern compression formats support password protection and encryption. ZIP offers basic encryption, while RAR and 7Z provide stronger encryption options for sensitive data.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right compression format depends on your specific needs: use ZIP for universal compatibility, RAR for maximum compression with advanced features, or 7Z for open-source high compression. The key is understanding each format's strengths and limitations.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online file converter, you can easily compress and extract files in various formats. Whether you need to reduce file sizes for sharing, create secure archives, or optimize storage space, we've got you covered.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Start Compressing Files Now
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
