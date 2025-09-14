import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const DocumentFormatGuide = () => {
  const navigate = useNavigate();

  const documentFormatData = [
    {
      format: 'DOCX',
      bestFor: 'Modern Word documents',
      compatibility: 'Excellent',
      features: 'Rich formatting, images, tables',
      fileSize: 'Medium',
      editing: 'Full editing support',
      platform: 'Cross-platform'
    },
    {
      format: 'DOC',
      bestFor: 'Legacy Word documents',
      compatibility: 'Good',
      features: 'Basic formatting, limited features',
      fileSize: 'Large',
      editing: 'Limited editing support',
      platform: 'Windows/Mac'
    },
    {
      format: 'TXT',
      bestFor: 'Plain text, code',
      compatibility: 'Universal',
      features: 'Text only, no formatting',
      fileSize: 'Very small',
      editing: 'Basic text editing',
      platform: 'All platforms'
    },
    {
      format: 'RTF',
      bestFor: 'Rich text, compatibility',
      compatibility: 'Good',
      features: 'Basic formatting, cross-platform',
      fileSize: 'Medium',
      editing: 'Good editing support',
      platform: 'Cross-platform'
    },
    {
      format: 'ODT',
      bestFor: 'Open source documents',
      compatibility: 'Good',
      features: 'Full formatting, open standard',
      fileSize: 'Medium',
      editing: 'Full editing support',
      platform: 'Cross-platform'
    },
    {
      format: 'HTML',
      bestFor: 'Web documents',
      compatibility: 'Web browsers',
      features: 'Web formatting, links, images',
      fileSize: 'Small',
      editing: 'Web editing tools',
      platform: 'Web-based'
    }
  ];

  const columns = [
    { header: 'Format', key: 'format', width: '12%' },
    { header: 'Best For', key: 'bestFor', width: '18%' },
    { header: 'Compatibility', key: 'compatibility', width: '15%' },
    { header: 'Features', key: 'features', width: '20%' },
    { header: 'File Size', key: 'fileSize', width: '12%' },
    { header: 'Editing', key: 'editing', width: '15%' },
    { header: 'Platform', key: 'platform', width: '8%' }
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
              Document Format Guide: Choosing the Right Format for Your Documents
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn about different document formats, their features, compatibility, and when to use each one for optimal results.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>14 min read</span>
              <span>•</span>
              <span>Document Formats</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right document format is crucial for ensuring compatibility, maintaining formatting, and achieving your intended purpose. With so many document formats available, it can be challenging to know which one to use for different situations.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore the most common document formats, their features, compatibility, and best use cases. Whether you're creating documents for work, school, or personal use, this guide will help you make informed decisions about document formats.
            </p>
          </section>

          {/* Main Format Comparison Table */}
          <BlogTable
            title="Document Format Comparison"
            description="Compare different document formats and their characteristics"
            columns={columns}
            data={documentFormatData}
          />

          {/* Format-Specific Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Format-Specific Details and Use Cases</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">DOCX - Modern Word Documents</h3>
                <p className="mb-4">
                  DOCX is the modern standard for Word documents, offering excellent compatibility and rich formatting features. It's the preferred format for most professional and academic documents.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Excellent compatibility across platforms</li>
                      <li>• Rich formatting and styling options</li>
                      <li>• Support for images, tables, and charts</li>
                      <li>• Smaller file sizes than DOC</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Requires modern word processors</li>
                      <li>• Not compatible with very old software</li>
                      <li>• Complex formatting can cause issues</li>
                      <li>• May not preserve all formatting in conversions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">TXT - Plain Text Documents</h3>
                <p className="mb-4">
                  TXT files are the simplest document format, containing only plain text without any formatting. They're perfect for code, notes, and simple text documents that need universal compatibility.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal compatibility</li>
                      <li>• Very small file sizes</li>
                      <li>• Easy to edit with any text editor</li>
                      <li>• Perfect for code and scripts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• No formatting or styling</li>
                      <li>• No support for images or tables</li>
                      <li>• Limited visual appeal</li>
                      <li>• Not suitable for complex documents</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">RTF - Rich Text Format</h3>
                <p className="mb-4">
                  RTF provides a good balance between formatting capabilities and compatibility. It's ideal for documents that need basic formatting but must work across different platforms and applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Good cross-platform compatibility</li>
                      <li>• Basic formatting support</li>
                      <li>• Smaller than DOC files</li>
                      <li>• Widely supported by word processors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited advanced formatting</li>
                      <li>• No support for complex layouts</li>
                      <li>• May not preserve all formatting</li>
                      <li>• Less feature-rich than DOCX</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Choose the Right Format */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Choose the Right Document Format</h2>
            <p className="mb-4">
              Selecting the appropriate document format depends on your specific needs, target audience, and intended use. Here's a guide to help you make the right choice:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Professional Documents:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>DOCX</strong> - Best for most professional documents</li>
                  <li>• <strong>PDF</strong> - For final, non-editable documents</li>
                  <li>• <strong>RTF</strong> - For cross-platform compatibility</li>
                  <li>• <strong>HTML</strong> - For web-based documents</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Simple Documents:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>TXT</strong> - For plain text and code</li>
                  <li>• <strong>RTF</strong> - For basic formatting needs</li>
                  <li>• <strong>DOCX</strong> - For simple formatted documents</li>
                  <li>• <strong>HTML</strong> - For web content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conversion Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Document Format Conversion Best Practices</h2>
            <p className="mb-4">
              When converting between document formats, following best practices ensures optimal results and preserves your content integrity:
            </p>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Conversion Guidelines:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Always backup original files</li>
                      <li>• Test conversions with sample documents</li>
                      <li>• Verify formatting after conversion</li>
                      <li>• Use appropriate quality settings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Issues:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Formatting inconsistencies</li>
                      <li>• Missing fonts or styles</li>
                      <li>• Image quality degradation</li>
                      <li>• Layout changes</li>
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
                <h3 className="text-lg font-semibold mb-2">What's the difference between DOC and DOCX?</h3>
                <p className="text-muted-foreground">
                  DOC is the older Word format with limited features and larger file sizes. DOCX is the modern format with better compression, more features, and improved compatibility. DOCX is generally preferred for new documents, while DOC is mainly used for legacy compatibility.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">When should I use RTF instead of DOCX?</h3>
                <p className="text-muted-foreground">
                  Use RTF when you need basic formatting but require maximum compatibility across different word processors and platforms. RTF is particularly useful when sharing documents with users who might not have Microsoft Word or when you need to ensure the document works in older software versions.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I convert between all document formats?</h3>
                <p className="text-muted-foreground">
                  Most document formats can be converted to others, but the quality and accuracy of the conversion depends on the complexity of the original document and the target format. Simple text documents convert well, while complex documents with advanced formatting may lose some features during conversion.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Which format is best for archiving documents?</h3>
                <p className="text-muted-foreground">
                  For long-term archiving, PDF is often the best choice as it preserves formatting and is widely supported. However, if you need to maintain editability, DOCX or RTF are good options. TXT is best for simple text archives where formatting isn't important.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right document format is essential for ensuring your documents work as intended across different platforms and applications. By understanding the strengths and limitations of each format, you can make informed decisions that meet your specific needs.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Whether you're creating professional documents, sharing content across platforms, or archiving important files, the right format choice will ensure compatibility, preserve formatting, and meet your intended purpose. With our free online document converter, you can easily convert between different formats as needed.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                Try Our Document Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default DocumentFormatGuide;