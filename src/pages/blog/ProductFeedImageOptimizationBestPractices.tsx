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
              Product Feed Image Optimization Best Practices: Maximize Your E-commerce Performance
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to optimize product images for different e-commerce platforms, including size requirements, format selection, and compression strategies for maximum performance.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>16 min read</span>
              <span>•</span>
              <span>E-commerce Optimization</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Product feed image optimization is crucial for e-commerce success, as images directly impact conversion rates, search rankings, and user experience. Each platform has specific requirements and best practices that can significantly affect your product performance.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore the best practices for optimizing product images across different e-commerce platforms, from Google Shopping and Amazon to Facebook Catalog and Shopify. Whether you're managing a small store or a large catalog, this guide will help you optimize your product images for maximum performance.
            </p>
          </section>

          {/* Main Platform Optimization Table */}
          <BlogTable
            title="Platform-Specific Image Optimization Requirements"
            description="Compare image optimization requirements across different e-commerce platforms"
            columns={columns}
            data={optimizationData}
          />

          {/* Platform-Specific Optimization */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Platform-Specific Optimization Strategies</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Google Shopping Optimization</h3>
                <p className="mb-4">
                  Google Shopping requires high-quality images that meet specific size and format requirements. Optimizing for Google Shopping can significantly improve your product visibility and click-through rates in search results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use 800x800px minimum resolution</li>
                      <li>• JPEG format with 85-95% quality</li>
                      <li>• White or transparent background</li>
                      <li>• Product fills 75-90% of image</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Images smaller than 800x800px</li>
                      <li>• Watermarks or text overlays</li>
                      <li>• Multiple products in one image</li>
                      <li>• Poor lighting or blurry images</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Amazon Product Optimization</h3>
                <p className="mb-4">
                  Amazon has strict image requirements that can affect your product's visibility and sales. Following Amazon's guidelines ensures your products appear in search results and maintain high quality standards.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use 1000x1000px minimum resolution</li>
                      <li>• JPEG format with 90-95% quality</li>
                      <li>• White background for main image</li>
                      <li>• Product fills 85% of image</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Images smaller than 1000x1000px</li>
                      <li>• Non-white backgrounds</li>
                      <li>• Text, logos, or watermarks</li>
                      <li>• Multiple angles in one image</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Facebook Catalog Optimization</h3>
                <p className="mb-4">
                  Facebook Catalog images need to be optimized for social media display and mobile viewing. High-quality images can improve engagement and conversion rates on Facebook and Instagram.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use 600x600px minimum resolution</li>
                      <li>• JPEG format with 80-90% quality</li>
                      <li>• Clear, well-lit product images</li>
                      <li>• Consistent styling across catalog</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Images smaller than 600x600px</li>
                      <li>• Poor lighting or blurry images</li>
                      <li>• Inconsistent image styles</li>
                      <li>• Text overlays or watermarks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Our Image Optimizer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use Our Image Optimizer for Product Feeds</h2>
            <p className="mb-4">
              Our free online image optimizer is perfect for optimizing product images for different e-commerce platforms. Here's how to use it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Product Image Optimization Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your product images (JPEG, PNG, WebP, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select your target e-commerce platform</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Choose the appropriate size and quality settings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Preview the optimized images and adjust if needed</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download your optimized product images</span>
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
            <h2 className="text-2xl font-semibold mb-4">Product Image Optimization Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Quality Standards:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use high-resolution source images</li>
                  <li>• Maintain consistent lighting and styling</li>
                  <li>• Ensure products are clearly visible</li>
                  <li>• Use appropriate backgrounds</li>
                  <li>• Test images on different devices</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Performance Optimization:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Optimize file sizes for fast loading</li>
                  <li>• Use appropriate compression settings</li>
                  <li>• Choose the right image formats</li>
                  <li>• Implement lazy loading</li>
                  <li>• Monitor image performance metrics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best image size for e-commerce platforms?</h3>
                <p className="text-muted-foreground">
                  The best image size depends on the platform. Google Shopping requires 800x800px minimum, Amazon requires 1000x1000px, and Facebook Catalog requires 600x600px. Always check the specific requirements for each platform you're using.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I optimize images for multiple platforms?</h3>
                <p className="text-muted-foreground">
                  Create different versions of your images for each platform, using the appropriate size and quality settings. Use our image optimizer to create platform-specific versions, or maintain high-resolution originals and resize as needed for each platform.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What image format should I use for product feeds?</h3>
                <p className="text-muted-foreground">
                  JPEG is the most widely supported format for product images, offering good compression and compatibility. PNG is better for images with transparency, while WebP offers better compression but has limited support. Choose based on your platform requirements and quality needs.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I maintain image quality while reducing file size?</h3>
                <p className="text-muted-foreground">
                  Use appropriate compression settings (80-95% for JPEG), choose the right image format, and optimize dimensions for your target platform. Test different quality settings to find the best balance between file size and image quality for your specific needs.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Product feed image optimization is essential for e-commerce success. By following platform-specific requirements and implementing best practices, you can improve your product visibility, conversion rates, and overall performance across different e-commerce platforms.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online image optimizer, you can easily optimize your product images for any e-commerce platform. Whether you're managing a small store or a large catalog, we've got you covered with tools that simplify the optimization process and help you achieve the best results.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Start Optimizing Your Product Images
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