import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ProductFeedImageOptimizationBestPractices = () => {
  const navigate = useNavigate();

  const optimizationData = [
    {
      platform: 'Google Shopping',
      recommendedSize: '800x800px',
      maxFileSize: '64MB',
      formats: 'JPEG, PNG, WebP',
      compression: '85-95%',
      altText: 'Required'
    },
    {
      platform: 'Facebook Catalog',
      recommendedSize: '600x600px',
      maxFileSize: '30MB',
      formats: 'JPEG, PNG',
      compression: '80-90%',
      altText: 'Recommended'
    },
    {
      platform: 'Amazon Product',
      recommendedSize: '1000x1000px',
      maxFileSize: '10MB',
      formats: 'JPEG, PNG, TIFF',
      compression: '90-95%',
      altText: 'Required'
    },
    {
      platform: 'eBay Listing',
      recommendedSize: '500x500px',
      maxFileSize: '7MB',
      formats: 'JPEG, PNG, GIF',
      compression: '85-90%',
      altText: 'Optional'
    },
    {
      platform: 'Shopify Product',
      recommendedSize: '1024x1024px',
      maxFileSize: '20MB',
      formats: 'JPEG, PNG, WebP',
      compression: '80-90%',
      altText: 'Recommended'
    },
    {
      platform: 'WooCommerce',
      recommendedSize: '800x800px',
      maxFileSize: '32MB',
      formats: 'JPEG, PNG, WebP',
      compression: '85-90%',
      altText: 'Recommended'
    }
  ];

  const columns = [
    { header: 'Platform', key: 'platform', width: '18%' },
    { header: 'Recommended Size', key: 'recommendedSize', width: '18%' },
    { header: 'Max File Size', key: 'maxFileSize', width: '15%' },
    { header: 'Formats', key: 'formats', width: '18%' },
    { header: 'Compression', key: 'compression', width: '15%' },
    { header: 'Alt Text', key: 'altText', width: '16%' }
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
              Product Feed Image Optimization Best Practices: Maximize Performance and Quality
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to optimize product images for different e-commerce platforms and feed formats to improve performance, reduce file sizes, and enhance user experience.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>21 min read</span>
              <span>•</span>
              <span>Image Optimization</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Product feed image optimization is crucial for e-commerce success. Well-optimized images improve page load times, enhance user experience, and can significantly impact conversion rates. Different platforms have specific requirements for image size, format, and quality, making optimization a complex but essential task.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll cover the best practices for optimizing product images across different e-commerce platforms, share compression techniques, and help you achieve the perfect balance between image quality and file size. Plus, we'll show you how to optimize your product images using our free online image optimizer.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Platform-Specific Image Optimization Requirements"
            description="Compare image optimization requirements across different e-commerce platforms"
            columns={columns}
            data={optimizationData}
          />

          {/* Optimization Strategies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Product Image Optimization Strategies</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Size and Resolution Optimization</h3>
                <p className="mb-4">
                  Proper sizing and resolution are fundamental to image optimization. Each platform has specific requirements that must be met for optimal performance and user experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use platform-specific recommended dimensions</li>
                      <li>• Maintain aspect ratios for consistency</li>
                      <li>• Create multiple sizes for different use cases</li>
                      <li>• Use responsive images for web display</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Mistakes:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Using unnecessarily large images</li>
                      <li>• Ignoring platform-specific requirements</li>
                      <li>• Not maintaining consistent aspect ratios</li>
                      <li>• Using low-resolution images for high-DPI displays</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Format and Compression Optimization</h3>
                <p className="mb-4">
                  Choosing the right image format and compression settings can significantly reduce file sizes while maintaining quality. Different formats are optimized for different types of content and use cases.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Format Selection:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use JPEG for photographs and complex images</li>
                      <li>• Use PNG for graphics and images with transparency</li>
                      <li>• Consider WebP for modern browsers</li>
                      <li>• Use appropriate compression levels</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Compression Issues:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Over-compression leading to quality loss</li>
                      <li>• Under-compression resulting in large files</li>
                      <li>• Using wrong format for content type</li>
                      <li>• Not testing compression on different devices</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Quality and Performance Balance</h3>
                <p className="mb-4">
                  Finding the right balance between image quality and performance is crucial for e-commerce success. This balance varies depending on the platform, use case, and target audience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Quality Factors:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Image sharpness and clarity</li>
                      <li>• Color accuracy and vibrancy</li>
                      <li>• Detail preservation</li>
                      <li>• Consistency across product images</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Performance Factors:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• File size and download speed</li>
                      <li>• Page load times</li>
                      <li>• Bandwidth usage</li>
                      <li>• Mobile performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Optimize Images */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Optimize Product Feed Images</h2>
            <p className="mb-4">
              Optimizing product feed images requires understanding platform requirements and using the right tools. Here's how to do it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Image Optimization Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your product images or connect to your product feed</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select your target platform and optimization settings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Configure image size, format, and compression settings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Start optimization and monitor progress</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download optimized images and verify quality</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/product-feed-image-downloader')}
                className="mr-4"
              >
                Try Our Image Optimizer
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Product Image Optimization</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Technical Optimization:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use platform-specific recommended dimensions</li>
                  <li>• Choose appropriate image formats for content type</li>
                  <li>• Implement proper compression techniques</li>
                  <li>• Create multiple image sizes for different use cases</li>
                  <li>• Use progressive JPEG for better loading experience</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Quality and Consistency:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Maintain consistent image quality across products</li>
                  <li>• Use proper lighting and composition</li>
                  <li>• Implement consistent background and styling</li>
                  <li>• Add descriptive alt text for accessibility</li>
                  <li>• Test images on different devices and browsers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best image format for product feeds?</h3>
                <p className="text-muted-foreground">
                  The best image format depends on your platform and content type. JPEG is generally best for photographs, PNG for graphics with transparency, and WebP for modern browsers. Consider your platform's requirements and your audience's browser support when choosing formats.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I balance image quality with file size?</h3>
                <p className="text-muted-foreground">
                  Balance quality and file size by using appropriate compression levels (typically 80-90% for JPEG), choosing the right format for your content, and testing on different devices. Start with higher quality settings and reduce compression until you find the optimal balance for your use case.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Should I use the same image optimization for all platforms?</h3>
                <p className="text-muted-foreground">
                  No, different platforms have different requirements for image size, format, and quality. Optimize images specifically for each platform to ensure the best performance and user experience. Use our tool to create platform-specific optimized versions of your product images.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How often should I optimize my product images?</h3>
                <p className="text-muted-foreground">
                  Optimize images whenever you add new products, update existing products, or change platforms. Regular optimization ensures consistent quality and performance. Consider implementing automated optimization workflows for large product catalogs to maintain consistency over time.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Product feed image optimization is essential for e-commerce success. By following platform-specific requirements, using appropriate compression techniques, and maintaining consistent quality, you can significantly improve your product feed performance and user experience.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online image optimizer, you can easily optimize your product images for any platform. Whether you're working with Google Shopping, Amazon, Facebook, or other e-commerce platforms, we've got you covered with tools that help you achieve the perfect balance of quality and performance.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/product-feed-image-downloader')}
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

export default ProductFeedImageOptimizationBestPractices;
