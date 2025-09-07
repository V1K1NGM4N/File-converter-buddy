import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
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
              Document Format Guide: DOCX vs DOC vs TXT vs RTF - Which to Choose?
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn about different document formats, their features, and when to use each one for optimal compatibility and functionality.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>14 min read</span>
              <span>•</span>
              <span>Document Conversion</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Document formats can be confusing, but choosing the right one is crucial for compatibility, functionality, and long-term accessibility. Whether you're creating documents, sharing files, or archiving content, the format you choose affects how others can view and edit your work.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll break down the most popular document formats, compare their features, and help you choose the best one for your needs. Plus, we'll show you how to easily convert between formats using our free online document converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Document Format Comparison"
            description="Compare different document formats to choose the best one for your needs"
            columns={columns}
            data={documentFormatData}
          />

          {/* Detailed Format Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Format Analysis</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">DOCX (Microsoft Word Document)</h3>
                <p className="mb-4">
                  DOCX is the modern standard for Word documents, offering rich formatting, advanced features, and excellent compatibility across different platforms and software.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Rich formatting and styling options</li>
                      <li>• Excellent compatibility</li>
                      <li>• Supports images, tables, and charts</li>
                      <li>• Modern, efficient format</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Requires compatible software</li>
                      <li>• Can be complex for simple text</li>
                      <li>• File size can be large</li>
                      <li>• Proprietary format</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">TXT (Plain Text)</h3>
                <p className="mb-4">
                  TXT is the simplest document format, containing only plain text without any formatting. It's perfect for code, simple notes, and maximum compatibility.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Universal compatibility</li>
                      <li>• Very small file size</li>
                      <li>• Perfect for code and data</li>
                      <li>• No formatting issues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• No formatting or styling</li>
                      <li>• No images or tables</li>
                      <li>• Limited functionality</li>
                      <li>• Not suitable for complex documents</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">RTF (Rich Text Format)</h3>
                <p className="mb-4">
                  RTF provides basic formatting while maintaining good compatibility across different platforms and software. It's a good middle ground between plain text and complex formats.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Good cross-platform compatibility</li>
                      <li>• Basic formatting support</li>
                      <li>• Smaller than DOCX files</li>
                      <li>• Widely supported</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Limited advanced features</li>
                      <li>• No complex formatting</li>
                      <li>• Limited image support</li>
                      <li>• Outdated format</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Convert Documents */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Convert Documents Between Formats</h2>
            <p className="mb-4">
              Converting documents between different formats is easy with our free online document converter. Here's how to do it:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Conversion Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Upload your document file (supports drag & drop or click to browse)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Select your desired output format (DOCX, TXT, RTF, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Click "Start Conversion" to process your file</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Download your converted document and review the results</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/universal-converter')}
                className="mr-4"
              >
                Try Our Document Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Document Formats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Professional Use:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use DOCX for business documents and reports</li>
                  <li>• Consider PDF for final, non-editable versions</li>
                  <li>• Use consistent formatting and styles</li>
                  <li>• Include proper metadata and properties</li>
                  <li>• Test compatibility with recipient's software</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Maximum Compatibility:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use TXT for simple text and code</li>
                  <li>• Use RTF for basic formatting needs</li>
                  <li>• Avoid complex formatting for wide distribution</li>
                  <li>• Test on different platforms and software</li>
                  <li>• Consider the recipient's technical capabilities</li>
                </ul>
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
                  DOC is the older Word format with limited features and larger file sizes. DOCX is the modern format with better compression, more features, and improved compatibility. DOCX is generally recommended for new documents.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">When should I use plain text (TXT)?</h3>
                <p className="text-muted-foreground">
                  Use TXT for code, simple notes, data files, or when you need maximum compatibility. It's perfect for content that doesn't require formatting and needs to be readable on any device or software.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I convert documents without losing formatting?</h3>
                <p className="text-muted-foreground">
                  Converting between similar formats (like DOCX to RTF) usually preserves most formatting. However, converting to simpler formats (like TXT) will remove all formatting. Always review the converted document and make adjustments as needed.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the best format for sharing documents?</h3>
                <p className="text-muted-foreground">
                  DOCX is best for editable documents, PDF for final versions, and TXT for maximum compatibility. Consider your audience's needs and technical capabilities when choosing the format for sharing.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Choosing the right document format depends on your specific needs: use DOCX for professional documents, TXT for simple text and code, RTF for basic formatting with good compatibility, and HTML for web-based content. The key is understanding each format's strengths and limitations.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online document converter, you can easily convert between any of these formats in seconds. Whether you need to share documents with different software, optimize for compatibility, or convert for specific applications, we've got you covered.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/universal-converter')}
                className="mr-4"
              >
                Start Converting Documents Now
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
