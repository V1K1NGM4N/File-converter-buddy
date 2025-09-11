import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const CompleteGuideToImageFileFormats = () => {
  const navigate = useNavigate();

  const imageFormatData = [
    {
      format: 'JPEG',
      bestFor: 'Photos, web images',
      fileSize: 'Small',
      quality: 'Good (lossy)',
      browserSupport: '100%',
      transparency: 'No',
      compression: 'Lossy'
    },
    {
      format: 'PNG',
      bestFor: 'Graphics, logos',
      fileSize: 'Large',
      quality: 'Excellent (lossless)',
      browserSupport: '100%',
      transparency: 'Yes',
      compression: 'Lossless'
    },
    {
      format: 'WebP',
      bestFor: 'Modern web',
      fileSize: 'Very Small',
      quality: 'Excellent',
      browserSupport: '95%',
      transparency: 'Yes',
      compression: 'Lossy/Lossless'
    },
    {
      format: 'GIF',
      bestFor: 'Animations, simple graphics',
      fileSize: 'Medium',
      quality: 'Limited (256 colors)',
      browserSupport: '100%',
      transparency: 'Yes',
      compression: 'Lossless'
    },
    {
      format: 'TIFF',
      bestFor: 'Professional printing',
      fileSize: 'Very Large',
      quality: 'Excellent',
      browserSupport: 'Limited',
      transparency: 'Yes',
      compression: 'Lossless'
    },
    {
      format: 'BMP',
      bestFor: 'Windows applications',
      fileSize: 'Very Large',
      quality: 'Excellent',
      browserSupport: 'Good',
      transparency: 'No',
      compression: 'Uncompressed'
    }
  ];

  const columns = [
    { header: 'Format', key: 'format', width: '12%' },
    { header: 'Best For', key: 'bestFor', width: '18%' },
    { header: 'File Size', key: 'fileSize', width: '12%' },
    { header: 'Quality', key: 'quality', width: '18%' },
    { header: 'Browser Support', key: 'browserSupport', width: '15%' },
    { header: 'Transparency', key: 'transparency', width: '12%' },
    { header: 'Compression', key: 'compression', width: '13%' }
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
              Complete Guide to Image File Formats: JPEG vs PNG vs WebP vs GIF
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Everything you need to know about image formats, their differences, and when to use each one for optimal results.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>File Conversion</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right image format can make or break your website's performance, affect your SEO rankings, and impact user experience. With so many image formats available (JPEG, PNG, WebP, GIF, TIFF, and more), it's crucial to understand their differences and use cases.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll break down each major image format, compare their strengths and weaknesses, and show you exactly when to use each one. Plus, we'll show you how to easily convert between formats using our free online image converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Image Format Comparison"
            description="Compare different image formats to choose the best one for your needs"
            columns={columns}
            data={imageFormatData}
          />

          {/* Detailed Format Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Format Analysis</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">JPEG (Joint Photographic Experts Group)</h3>
                <p className="mb-4">
                  JPEG is the most widely used image format on the web, especially for photographs. It uses lossy compression, which means some image data is permanently removed to reduce file size.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Small file sizes</li>
                      <li>• Universal browser support</li>
                      <li>• Excellent for photographs</li>
                      <li>• Good color reproduction</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• No transparency support</li>
                      <li>• Quality loss with compression</li>
                      <li>• Not suitable for graphics with sharp edges</li>
                      <li>• Artifacts with high compression</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">PNG (Portable Network Graphics)</h3>
                <p className="mb-4">
                  PNG is a lossless image format that supports transparency and is ideal for graphics, logos, and images with sharp edges or text.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Lossless compression</li>
                      <li>• Full transparency support</li>
                      <li>• Perfect for graphics and logos</li>
                      <li>• No quality loss</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Larger file sizes</li>
                      <li>• Not ideal for photographs</li>
                      <li>• Limited color palette options</li>
                      <li>• Slower loading times</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">WebP (Web Picture Format)</h3>
                <p className="mb-4">
                  WebP is Google's modern image format that provides superior compression compared to JPEG and PNG while maintaining high quality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• 25-35% smaller than JPEG</li>
                      <li>• 25-50% smaller than PNG</li>
                      <li>• Supports both lossy and lossless</li>
                      <li>• Transparency support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited browser support (95%)</li>
                      <li>• Not supported by older browsers</li>
                      <li>• Requires fallback formats</li>
                      <li>• Newer format, less adoption</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Convert Images */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Convert Images Between Formats</h2>
            <p className="mb-4">
              Converting images between different formats is easy with our free online image converter. Here's how to do it:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Conversion Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your image files (supports drag & drop or click to browse)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select your desired output format (JPEG, PNG, WebP, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Click "Start Conversion" to process your files</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Download your converted images individually or as a ZIP file</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Try Our Image Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Image Formats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Web Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use JPEG for photographs and complex images</li>
                  <li>• Use PNG for logos, graphics, and images with transparency</li>
                  <li>• Consider WebP for modern browsers with JPEG/PNG fallbacks</li>
                  <li>• Optimize file sizes for faster loading</li>
                  <li>• Use appropriate dimensions for your use case</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Print:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use TIFF for high-quality printing</li>
                  <li>• Ensure 300 DPI resolution minimum</li>
                  <li>• Use CMYK color mode for professional printing</li>
                  <li>• Avoid JPEG for print due to compression artifacts</li>
                  <li>• Consider vector formats for scalable graphics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between lossy and lossless compression?</h3>
                <p className="text-muted-foreground">
                  Lossy compression permanently removes some image data to reduce file size, resulting in smaller files but potential quality loss. Lossless compression reduces file size without losing any image data, maintaining perfect quality but with larger file sizes.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use WebP for my website?</h3>
                <p className="text-muted-foreground">
                  WebP is excellent for modern websites due to its superior compression. However, you should always provide fallback formats (JPEG/PNG) for older browsers that don't support WebP.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I convert images without losing quality?</h3>
                <p className="text-muted-foreground">
                  Converting from lossy formats (like JPEG) to lossless formats (like PNG) won't restore lost quality, but it will prevent further quality loss. Converting between lossless formats maintains perfect quality.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best format for social media?</h3>
                <p className="text-muted-foreground">
                  JPEG is generally the best choice for social media photos due to its small file size and universal support. For graphics with transparency, use PNG. Always check each platform's specific requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right image format depends on your specific needs: use JPEG for photographs, PNG for graphics with transparency, WebP for modern web optimization, and TIFF for professional printing. The key is understanding each format's strengths and limitations.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online image converter, you can easily convert between any of these formats in seconds. Whether you're optimizing for web performance, preparing images for print, or converting for specific applications, we've got you covered.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Start Converting Images Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default CompleteGuideToImageFileFormats;
