import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ImageOptimizationForWebPerformance = () => {
  const navigate = useNavigate();

  const optimizationData = [
    {
      technique: 'Format Selection',
      impact: 'High',
      effort: 'Low',
      description: 'Choose the right format (WebP, JPEG, PNG)',
      fileSize: '30-50% reduction',
      compatibility: 'Good'
    },
    {
      technique: 'Compression',
      impact: 'High',
      effort: 'Medium',
      description: 'Optimize compression settings',
      fileSize: '20-40% reduction',
      compatibility: 'Excellent'
    },
    {
      technique: 'Resizing',
      impact: 'Very High',
      effort: 'Medium',
      description: 'Resize images to actual display size',
      fileSize: '50-80% reduction',
      compatibility: 'Excellent'
    },
    {
      technique: 'Lazy Loading',
      impact: 'Medium',
      effort: 'Low',
      description: 'Load images only when needed',
      fileSize: 'No change',
      compatibility: 'Good'
    },
    {
      technique: 'Responsive Images',
      impact: 'High',
      effort: 'Medium',
      description: 'Serve different sizes for different devices',
      fileSize: '40-60% reduction',
      compatibility: 'Good'
    },
    {
      technique: 'CDN Delivery',
      impact: 'Medium',
      effort: 'High',
      description: 'Use content delivery networks',
      fileSize: 'No change',
      compatibility: 'Excellent'
    }
  ];

  const columns = [
    { header: 'Technique', key: 'technique', width: '18%' },
    { header: 'Impact', key: 'impact', width: '12%' },
    { header: 'Effort', key: 'effort', width: '12%' },
    { header: 'Description', key: 'description', width: '25%' },
    { header: 'File Size Reduction', key: 'fileSize', width: '18%' },
    { header: 'Compatibility', key: 'compatibility', width: '15%' }
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
              Image Optimization for Web Performance: Speed Up Your Website
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to optimize images for web performance, reduce loading times, and improve user experience with these proven techniques.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>17 min read</span>
              <span>•</span>
              <span>Web Performance</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Image optimization is crucial for web performance. Large, unoptimized images can slow down your website, hurt user experience, and negatively impact your SEO rankings. With the right techniques, you can significantly reduce image file sizes while maintaining quality.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll cover the most effective image optimization techniques, show you how to implement them, and help you achieve faster loading times. Plus, we'll show you how to easily optimize your images using our free online image converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Image Optimization Techniques"
            description="Compare different optimization techniques and their impact on web performance"
            columns={columns}
            data={optimizationData}
          />

          {/* Detailed Optimization Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Optimization Techniques</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Format Selection and Conversion</h3>
                <p className="mb-4">
                  Choosing the right image format is the first step in optimization. Modern formats like WebP offer superior compression while maintaining quality, but you need fallbacks for older browsers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use WebP for modern browsers</li>
                      <li>• Provide JPEG/PNG fallbacks</li>
                      <li>• Choose format based on content type</li>
                      <li>• Test quality vs file size trade-offs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using PNG for photographs</li>
                      <li>• Not providing format fallbacks</li>
                      <li>• Ignoring browser compatibility</li>
                      <li>• Using outdated formats</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Compression and Quality Settings</h3>
                <p className="mb-4">
                  Proper compression settings can dramatically reduce file sizes without noticeable quality loss. The key is finding the right balance between quality and file size for your specific use case.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use 80-90% quality for JPEG</li>
                      <li>• Test different compression levels</li>
                      <li>• Consider progressive JPEG for large images</li>
                      <li>• Use lossless compression for graphics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using 100% quality unnecessarily</li>
                      <li>• Over-compressing images</li>
                      <li>• Not testing on different devices</li>
                      <li>• Ignoring visual quality checks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Responsive Images and Sizing</h3>
                <p className="mb-4">
                  Serving appropriately sized images for different devices and screen sizes is crucial for performance. Large images on mobile devices waste bandwidth and slow down loading times.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Create multiple image sizes</li>
                      <li>• Use srcset for responsive images</li>
                      <li>• Consider device pixel ratios</li>
                      <li>• Optimize for actual display size</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Serving desktop images on mobile</li>
                      <li>• Not using responsive image techniques</li>
                      <li>• Ignoring high-DPI displays</li>
                      <li>• Using CSS to resize large images</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Optimize Images */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Optimize Images for Web Performance</h2>
            <p className="mb-4">
              Optimizing images for web performance involves several steps. Here's how to do it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Optimization Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your images (supports drag & drop or click to browse)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select the optimal format (WebP, JPEG, PNG) for your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Adjust compression settings and resize if needed</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Download optimized images and test performance</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Try Our Image Optimizer
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Web Image Optimization</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Technical Optimization:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use modern image formats (WebP, AVIF)</li>
                  <li>• Implement responsive images with srcset</li>
                  <li>• Enable lazy loading for below-the-fold images</li>
                  <li>• Use appropriate compression settings</li>
                  <li>• Consider using a CDN for image delivery</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Content Strategy:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Choose images that add value to content</li>
                  <li>• Optimize images for your target audience</li>
                  <li>• Consider the context and purpose of each image</li>
                  <li>• Test images on different devices and connections</li>
                  <li>• Monitor performance metrics regularly</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How much can I reduce image file sizes?</h3>
                <p className="text-muted-foreground">
                  With proper optimization, you can typically reduce image file sizes by 30-80% without noticeable quality loss. The exact reduction depends on the original format, content type, and optimization techniques used.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use WebP for all images?</h3>
                <p className="text-muted-foreground">
                  WebP is excellent for modern browsers and can reduce file sizes by 25-50% compared to JPEG. However, you should always provide fallback formats (JPEG/PNG) for older browsers that don't support WebP.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best image format for different content types?</h3>
                <p className="text-muted-foreground">
                  Use JPEG for photographs, PNG for graphics with transparency, WebP for modern web optimization, and SVG for simple graphics and icons. Choose based on content type, quality requirements, and browser support.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I implement responsive images?</h3>
                <p className="text-muted-foreground">
                  Use the srcset attribute to provide multiple image sizes and let the browser choose the most appropriate one. Consider device pixel ratios and actual display sizes when creating different versions of your images.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Image optimization is essential for web performance and user experience. By choosing the right formats, using proper compression, implementing responsive images, and following best practices, you can significantly improve your website's loading times and performance.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online image converter, you can easily optimize your images for web performance. Whether you need to convert formats, compress files, or resize images, we've got you covered with tools that help you achieve the best results.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Start Optimizing Images Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ImageOptimizationForWebPerformance;
