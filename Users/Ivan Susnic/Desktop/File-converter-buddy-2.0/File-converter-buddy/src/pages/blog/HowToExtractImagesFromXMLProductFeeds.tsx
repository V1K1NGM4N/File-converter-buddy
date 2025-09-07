import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
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
              How to Extract Images from XML Product Feeds: A Complete Tutorial
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to parse XML product feeds and extract image URLs efficiently for bulk downloading and organization.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>18 min read</span>
              <span>•</span>
              <span>XML Feed Processing</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              XML product feeds are the backbone of e-commerce data exchange, containing structured product information including images, prices, descriptions, and more. Extracting images from these feeds is essential for product catalog management, marketing campaigns, and data analysis.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive tutorial, we'll show you how to parse XML feeds, identify image fields, and extract image URLs efficiently. Whether you're working with Google Shopping feeds, Amazon product data, or custom XML files, this guide will help you master XML image extraction.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="XML Image Field Standards by Platform"
            description="Compare XML image field names and requirements across different e-commerce platforms"
            columns={columns}
            data={xmlImageFieldsData}
          />

          {/* XML Structure Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding XML Feed Structure</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Common XML Feed Patterns</h3>
                <p className="mb-4">
                  XML feeds follow different patterns depending on the platform, but most share common structures for organizing product data and images.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Typical Structure:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Root element (feed, products, catalog)</li>
                      <li>• Product/item containers</li>
                      <li>• Image URL fields</li>
                      <li>• Additional product data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Challenges:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Nested element structures</li>
                      <li>• Multiple image field variations</li>
                      <li>• Namespace declarations</li>
                      <li>• Large file sizes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Image Field Identification</h3>
                <p className="mb-4">
                  Different platforms use various field names for images. Understanding these variations is crucial for successful image extraction.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Primary Image Fields:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• image_link (Google Shopping)</li>
                      <li>• main_image_url (Amazon)</li>
                      <li>• PictureURL (eBay)</li>
                      <li>• image_url (Facebook)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Secondary Image Fields:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• additional_image_link</li>
                      <li>• other_image_url</li>
                      <li>• PictureDetails</li>
                      <li>• additional_image_url</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">XML Parsing Techniques</h3>
                <p className="mb-4">
                  Effective XML parsing requires understanding different parsing methods and choosing the right approach for your specific needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Parsing Methods:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• DOM parsing for small files</li>
                      <li>• SAX parsing for large files</li>
                      <li>• XPath for complex queries</li>
                      <li>• Streaming parsers for memory efficiency</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Memory usage with large files</li>
                      <li>• Error handling and validation</li>
                      <li>• Performance optimization</li>
                      <li>• Cross-platform compatibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Extract Images */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Extract Images from XML Feeds</h2>
            <p className="mb-4">
              Extracting images from XML feeds can be done manually or with automated tools. Here's how to do it efficiently:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step XML Image Extraction Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your XML feed file or paste the feed URL</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select the products you want to extract images from</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Choose your preferred image format and quality settings</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Start the extraction process and monitor progress</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Download your extracted images as a ZIP file</span>
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
                <h3 className="text-lg font-semibold mb-3">Feed Preparation:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Validate XML feed structure before processing</li>
                  <li>• Check for namespace declarations and prefixes</li>
                  <li>• Verify image URL accessibility and validity</li>
                  <li>• Handle CDATA sections and special characters</li>
                  <li>• Test with a small sample first</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Extraction and Processing:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use appropriate parsing methods for file size</li>
                  <li>• Handle multiple image field variations</li>
                  <li>• Implement error handling for malformed XML</li>
                  <li>• Optimize memory usage for large feeds</li>
                  <li>• Maintain image quality and format consistency</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What XML feed formats are supported?</h3>
                <p className="text-muted-foreground">
                  Our XML image extractor supports all standard XML feed formats including Google Shopping, Amazon Product, eBay Listing, Facebook Catalog, Shopify Product, WooCommerce, and custom XML feeds. The tool automatically detects the feed format and extracts image URLs accordingly.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I handle large XML feeds?</h3>
                <p className="text-muted-foreground">
                  For large XML feeds, the tool uses streaming parsing to handle files efficiently without loading the entire feed into memory. You can also process feeds in smaller batches or use filtering options to extract images from specific product categories or ranges.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I extract images from multiple XML feeds at once?</h3>
                <p className="text-muted-foreground">
                  Yes, you can process multiple XML feeds by uploading them one at a time or using batch processing features. The tool maintains separate processing queues for each feed and allows you to organize extracted images by feed source or product category.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What if my XML feed has custom image field names?</h3>
                <p className="text-muted-foreground">
                  The tool can handle custom XML field names by using flexible parsing rules and pattern matching. If your feed uses non-standard field names, you can specify custom field mappings or use the tool's auto-detection features to identify image URLs in your feed structure.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Extracting images from XML product feeds is a crucial skill for e-commerce professionals and developers. By understanding XML structure, identifying image fields, and using the right tools, you can efficiently extract and organize product images for your business needs.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online XML image extractor, you can easily extract images from any XML product feed. Whether you're working with Google Shopping feeds, Amazon product data, or custom XML files, we've got you covered with a tool that simplifies the entire extraction process.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/product-feed-image-downloader')}
                className="mr-4"
              >
                Start Extracting XML Images Now
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
