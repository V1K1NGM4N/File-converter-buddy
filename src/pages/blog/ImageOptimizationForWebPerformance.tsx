import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
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
              Learn how to optimize images for web performance, reduce loading times, and improve user experience with these proven techniques and best practices.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>Web Performance</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Image optimization is crucial for web performance, as images often account for the largest portion of a webpage's size. Poorly optimized images can significantly slow down your website, leading to higher bounce rates and poor user experience.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore the most effective image optimization techniques, from format selection to compression strategies. Whether you're a web developer, content creator, or business owner, this guide will help you optimize your images for better web performance.
            </p>
          </section>

          {/* Main Optimization Techniques Table */}
          <BlogTable
            title="Image Optimization Techniques"
            description="Compare different optimization techniques and their impact on web performance"
            columns={columns}
            data={optimizationData}
          />

          {/* Format Selection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Choosing the Right Image Format</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">WebP - The Modern Standard</h3>
                <p className="mb-4">
                  WebP is a modern image format developed by Google that offers superior compression compared to JPEG and PNG. It supports both lossy and lossless compression, making it ideal for most web images.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• 25-35% smaller than JPEG</li>
                      <li>• 25-50% smaller than PNG</li>
                      <li>• Supports transparency</li>
                      <li>• Growing browser support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited browser support</li>
                      <li>• Need for fallback formats</li>
                      <li>• Slower encoding</li>
                      <li>• Not suitable for all images</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">JPEG - The Universal Choice</h3>
                <p className="mb-4">
                  JPEG remains the most widely supported image format for photographs and complex images. It offers good compression and is supported by all browsers and devices.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal browser support</li>
                      <li>• Good compression for photos</li>
                      <li>• Fast encoding and decoding</li>
                      <li>• Widely supported by tools</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Lossy compression only</li>
                      <li>• No transparency support</li>
                      <li>• Artifacts at high compression</li>
                      <li>• Not ideal for simple graphics</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">PNG - For Quality and Transparency</h3>
                <p className="mb-4">
                  PNG is ideal for images that require transparency or lossless compression. It's perfect for logos, icons, and simple graphics where quality is more important than file size.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Lossless compression</li>
                      <li>• Transparency support</li>
                      <li>• Good for simple graphics</li>
                      <li>• Universal browser support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Larger file sizes</li>
                      <li>• Not ideal for photos</li>
                      <li>• Limited compression options</li>
                      <li>• Slower loading times</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Our Image Optimizer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use Our Image Optimizer</h2>
            <p className="mb-4">
              Our free online image optimizer makes it easy to optimize your images for web performance. Here's how to use it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Image Optimization Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your image file (JPEG, PNG, WebP, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Choose your target format and quality settings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Resize the image to your desired dimensions</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Preview the optimized image and file size</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download your optimized image</span>
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
            <h2 className="text-2xl font-semibold mb-4">Image Optimization Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Technical Optimization:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use appropriate image dimensions</li>
                  <li>• Choose the right format for content</li>
                  <li>• Optimize compression settings</li>
                  <li>• Implement lazy loading</li>
                  <li>• Use responsive images</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Performance Monitoring:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Monitor Core Web Vitals</li>
                  <li>• Test on different devices</li>
                  <li>• Use CDN for image delivery</li>
                  <li>• Implement caching strategies</li>
                  <li>• Regular performance audits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best image format for web performance?</h3>
                <p className="text-muted-foreground">
                  The best format depends on your content and audience. WebP offers the best compression but has limited browser support. JPEG is the safest choice for photos, while PNG is best for images with transparency. Consider using multiple formats with fallbacks for optimal performance.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How much can I reduce image file sizes?</h3>
                <p className="text-muted-foreground">
                  File size reduction depends on the original image and optimization settings. Typically, you can achieve 30-80% reduction without noticeable quality loss. WebP can provide 25-35% better compression than JPEG, while proper resizing can reduce file sizes by 50-80%.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use WebP for all images?</h3>
                <p className="text-muted-foreground">
                  WebP is great for modern browsers but requires fallbacks for older browsers. Use WebP as the primary format with JPEG or PNG fallbacks. This ensures optimal performance for modern users while maintaining compatibility for older browsers.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I implement responsive images?</h3>
                <p className="text-muted-foreground">
                  Use the HTML picture element with multiple source images for different screen sizes. Provide different image sizes for mobile, tablet, and desktop. This ensures users download appropriately sized images for their devices, improving performance and user experience.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Image optimization is essential for web performance and user experience. By choosing the right formats, optimizing compression, and implementing best practices, you can significantly improve your website's loading times and performance.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online image optimizer, you can easily optimize your images for web performance. Whether you're working on a personal blog or a large e-commerce site, we've got you covered with tools that simplify the optimization process and help you achieve the best results.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Start Optimizing Your Images
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