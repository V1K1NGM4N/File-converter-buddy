import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const HowToExtractImagesFromXMLProductFeeds = () => {
  const navigate = useNavigate();

  const xmlImageFieldsData = [
    {
      platform: 'Google Shopping',
      primaryField: 'image_link',
      secondaryField: 'additional_image_link',
      maxImages: '10',
      requirements: '800x800px minimum',
      example: '<image_link>https://example.com/image1.jpg</image_link>'
    },
    {
      platform: 'Amazon Product',
      primaryField: 'main_image_url',
      secondaryField: 'other_image_url',
      maxImages: '8',
      requirements: '1000x1000px minimum',
      example: '<main_image_url>https://example.com/main.jpg</main_image_url>'
    },
    {
      platform: 'eBay Listing',
      primaryField: 'PictureURL',
      secondaryField: 'PictureDetails',
      maxImages: '12',
      requirements: '500x500px minimum',
      example: '<PictureURL>https://example.com/pic.jpg</PictureURL>'
    },
    {
      platform: 'Facebook Catalog',
      primaryField: 'image_url',
      secondaryField: 'additional_image_url',
      maxImages: '20',
      requirements: '600x600px minimum',
      example: '<image_url>https://example.com/photo.jpg</image_url>'
    },
    {
      platform: 'Shopify Product',
      primaryField: 'Image Src',
      secondaryField: 'Image Alt Text',
      maxImages: '250',
      requirements: '1024x1024px recommended',
      example: '<Image Src>https://example.com/shop.jpg</Image Src>'
    },
    {
      platform: 'WooCommerce',
      primaryField: 'Images',
      secondaryField: 'Image Alt Text',
      maxImages: 'Unlimited',
      requirements: '800x800px recommended',
      example: '<Images>https://example.com/woo.jpg</Images>'
    }
  ];

  const columns = [
    { header: 'Platform', key: 'platform', width: '18%' },
    { header: 'Primary Field', key: 'primaryField', width: '18%' },
    { header: 'Secondary Field', key: 'secondaryField', width: '18%' },
    { header: 'Max Images', key: 'maxImages', width: '12%' },
    { header: 'Requirements', key: 'requirements', width: '18%' },
    { header: 'Example', key: 'example', width: '16%' }
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
              How to Extract Images from XML Product Feeds: A Complete Guide
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to extract and download images from XML product feeds across different e-commerce platforms, including Google Shopping, Amazon, eBay, and more.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>17 min read</span>
              <span>•</span>
              <span>XML Processing</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              XML product feeds are essential for e-commerce operations, containing product information including images, descriptions, and pricing. Extracting images from these feeds can be challenging due to different field names, formats, and requirements across platforms.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore how to extract images from XML product feeds across different e-commerce platforms. Whether you're working with Google Shopping, Amazon, eBay, or other platforms, this guide will help you efficiently extract and organize product images.
            </p>
          </section>

          {/* Main XML Image Fields Table */}
          <BlogTable
            title="XML Image Field Names by Platform"
            description="Compare image field names and requirements across different e-commerce platforms"
            columns={columns}
            data={xmlImageFieldsData}
          />

          {/* Platform-Specific Extraction Methods */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Platform-Specific Image Extraction Methods</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Google Shopping Feed Extraction</h3>
                <p className="mb-4">
                  Google Shopping feeds use specific field names for images. The primary image is stored in the 'image_link' field, while additional images are in 'additional_image_link' fields. Understanding these fields is crucial for successful extraction.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Key Fields:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• image_link - Primary product image</li>
                      <li>• additional_image_link - Secondary images</li>
                      <li>• image_alt_text - Alt text for images</li>
                      <li>• image_title - Image title/description</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Requirements:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Minimum 800x800 pixels</li>
                      <li>• JPEG, PNG, or GIF format</li>
                      <li>• HTTPS URLs required</li>
                      <li>• No watermarks or text overlays</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Amazon Product Feed Extraction</h3>
                <p className="mb-4">
                  Amazon product feeds have specific requirements for images. The main image is in 'main_image_url' while additional images are in 'other_image_url' fields. Amazon has strict quality requirements for product images.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Key Fields:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• main_image_url - Primary product image</li>
                      <li>• other_image_url - Additional images</li>
                      <li>• image_alt_text - Alt text for accessibility</li>
                      <li>• image_title - Image title/description</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Requirements:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Minimum 1000x1000 pixels</li>
                      <li>• JPEG, PNG, or GIF format</li>
                      <li>• White or transparent background</li>
                      <li>• Product must fill 85% of image</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">eBay Listing Feed Extraction</h3>
                <p className="mb-4">
                  eBay listing feeds use 'PictureURL' for the main image and 'PictureDetails' for additional images. eBay has specific requirements for image quality and format to ensure good user experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Key Fields:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• PictureURL - Primary listing image</li>
                      <li>• PictureDetails - Additional images</li>
                      <li>• PictureAltText - Alt text for images</li>
                      <li>• PictureTitle - Image title/description</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Requirements:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Minimum 500x500 pixels</li>
                      <li>• JPEG, PNG, or GIF format</li>
                      <li>• Maximum 7MB file size</li>
                      <li>• No watermarks or text overlays</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Our XML Image Extractor */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use Our XML Image Extractor</h2>
            <p className="mb-4">
              Our free online XML image extractor makes it easy to extract images from any XML product feed. Here's how to use it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step XML Image Extraction Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your XML product feed file</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Our system automatically detects image fields</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Select the products and images you want to extract</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Choose your preferred image format and quality</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download all extracted images as a ZIP file</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/product-feed-image-downloader')}
                className="mr-4"
              >
                Try Our XML Image Extractor
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for XML Image Extraction</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Extraction Process:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Validate XML feed before extraction</li>
                  <li>• Check image URL accessibility</li>
                  <li>• Handle missing or broken images</li>
                  <li>• Organize images by product ID</li>
                  <li>• Maintain original image quality</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Quality Control:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Verify image dimensions and format</li>
                  <li>• Check for watermarks or text overlays</li>
                  <li>• Ensure images meet platform requirements</li>
                  <li>• Test image loading and display</li>
                  <li>• Monitor extraction success rates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I handle different XML feed formats?</h3>
                <p className="text-muted-foreground">
                  Different platforms use different XML structures and field names. Our XML image extractor automatically detects common field patterns and can handle various feed formats. For custom formats, you can specify the field names manually.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What if some images fail to download?</h3>
                <p className="text-muted-foreground">
                  If some images fail to download, it's usually due to broken URLs, network issues, or access restrictions. Our extractor provides detailed error reports and allows you to retry failed downloads. Always check the extraction log for specific error messages.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I extract images from large XML feeds?</h3>
                <p className="text-muted-foreground">
                  Yes, our XML image extractor can handle large feeds with thousands of products. The extraction process is optimized for performance and includes progress tracking. For very large feeds, consider processing in batches for better performance.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I organize extracted images?</h3>
                <p className="text-muted-foreground">
                  Extracted images are automatically organized by product ID in the ZIP file. You can also choose to organize them by category, brand, or other criteria. The extractor maintains the original image names and adds product information for easy identification.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Extracting images from XML product feeds is essential for e-commerce operations, marketing, and content management. By understanding the different field names and requirements across platforms, you can efficiently extract and organize product images.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online XML image extractor, you can easily extract images from any XML product feed. Whether you're working with Google Shopping, Amazon, eBay, or other platforms, we've got you covered with a tool that simplifies the extraction process and helps you achieve the best results.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/product-feed-image-downloader')}
                className="mr-4"
              >
                Start Extracting XML Images
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default HowToExtractImagesFromXMLProductFeeds;