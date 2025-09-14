import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const CrossPlatformFileCompatibility = () => {
  const navigate = useNavigate();

  const compatibilityData = [
    {
      format: 'PDF',
      windows: 'Excellent',
      mac: 'Excellent',
      linux: 'Excellent',
      mobile: 'Excellent',
      web: 'Excellent',
      recommendation: 'Universal document format'
    },
    {
      format: 'MP4',
      windows: 'Excellent',
      mac: 'Excellent',
      linux: 'Good',
      mobile: 'Excellent',
      web: 'Excellent',
      recommendation: 'Best for video sharing'
    },
    {
      format: 'MP3',
      windows: 'Excellent',
      mac: 'Excellent',
      linux: 'Excellent',
      mobile: 'Excellent',
      web: 'Excellent',
      recommendation: 'Universal audio format'
    },
    {
      format: 'JPEG',
      windows: 'Excellent',
      mac: 'Excellent',
      linux: 'Excellent',
      mobile: 'Excellent',
      web: 'Excellent',
      recommendation: 'Best for photos'
    },
    {
      format: 'PNG',
      windows: 'Excellent',
      mac: 'Excellent',
      linux: 'Excellent',
      mobile: 'Excellent',
      web: 'Excellent',
      recommendation: 'Best for graphics'
    },
    {
      format: 'ZIP',
      windows: 'Excellent',
      mac: 'Excellent',
      linux: 'Excellent',
      mobile: 'Good',
      web: 'Good',
      recommendation: 'Universal compression'
    }
  ];

  const columns = [
    { header: 'Format', key: 'format', width: '12%' },
    { header: 'Windows', key: 'windows', width: '12%' },
    { header: 'Mac', key: 'mac', width: '12%' },
    { header: 'Linux', key: 'linux', width: '12%' },
    { header: 'Mobile', key: 'mobile', width: '12%' },
    { header: 'Web', key: 'web', width: '12%' },
    { header: 'Recommendation', key: 'recommendation', width: '28%' }
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
              Cross-Platform File Compatibility: Ensuring Your Files Work Everywhere
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              A comprehensive guide to file formats that work seamlessly across Windows, Mac, Linux, mobile devices, and web browsers.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>File Compatibility</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              In today's multi-device world, ensuring your files work across different platforms is crucial. Whether you're sharing documents with colleagues, uploading content to websites, or transferring files between devices, compatibility issues can cause major headaches.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              This guide covers the most compatible file formats across all major platforms and provides practical tips for ensuring your files work everywhere. Plus, we'll show you how to convert files to the most compatible formats using our free online file converter.
            </p>
          </section>

          {/* Main Compatibility Table */}
          <BlogTable
            title="Cross-Platform File Compatibility Matrix"
            description="Compare how different file formats perform across various platforms and devices"
            columns={columns}
            data={compatibilityData}
          />

          {/* Platform-Specific Considerations */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Platform-Specific Considerations</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Windows Compatibility</h3>
                <p className="mb-4">
                  Windows has excellent support for most file formats, but there are some considerations for optimal compatibility.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Formats:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• PDF for documents</li>
                      <li>• MP4 for videos</li>
                      <li>• MP3 for audio</li>
                      <li>• JPEG/PNG for images</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Avoid:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Proprietary formats</li>
                      <li>• Mac-specific formats</li>
                      <li>• Linux-only formats</li>
                      <li>• Outdated formats</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Mac Compatibility</h3>
                <p className="mb-4">
                  Mac systems generally have good compatibility, but some formats may require additional software or conversion.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Formats:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• PDF for documents</li>
                      <li>• MP4/MOV for videos</li>
                      <li>• MP3/AAC for audio</li>
                      <li>• JPEG/PNG for images</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Some Windows formats need conversion</li>
                      <li>• WebM may need additional codecs</li>
                      <li>• FLAC requires additional software</li>
                      <li>• Some proprietary formats</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Linux Compatibility</h3>
                <p className="mb-4">
                  Linux systems have varying levels of support depending on the distribution and installed software.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Formats:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• PDF for documents</li>
                      <li>• MP4 for videos</li>
                      <li>• MP3/OGG for audio</li>
                      <li>• JPEG/PNG for images</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Challenges:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Codec support varies by distro</li>
                      <li>• Some formats need additional packages</li>
                      <li>• Proprietary formats may not work</li>
                      <li>• DRM-protected content issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Compatibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Mobile Device Compatibility</h2>
            <p className="mb-4">
              Mobile devices have become increasingly important for file sharing and viewing. Here's what works best:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">iOS Devices:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• PDF, DOC, DOCX for documents</li>
                  <li>• MP4, MOV for videos</li>
                  <li>• MP3, AAC for audio</li>
                  <li>• JPEG, PNG, HEIC for images</li>
                  <li>• ZIP for compressed files</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Android Devices:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• PDF, DOC, DOCX for documents</li>
                  <li>• MP4, AVI for videos</li>
                  <li>• MP3, AAC, OGG for audio</li>
                  <li>• JPEG, PNG, WebP for images</li>
                  <li>• ZIP, RAR for compressed files</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Web Browser Compatibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Web Browser Compatibility</h2>
            <p className="mb-4">
              When sharing files online or embedding them in websites, browser compatibility is crucial:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Universal Web Formats:</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>PDF</strong> - Universal document format, works in all browsers</li>
                <li>• <strong>MP4</strong> - Best video format for web, supported by all modern browsers</li>
                <li>• <strong>MP3</strong> - Universal audio format for web streaming</li>
                <li>• <strong>JPEG/PNG</strong> - Universal image formats with excellent browser support</li>
                <li>• <strong>WebP</strong> - Modern image format with superior compression (95% browser support)</li>
              </ul>
            </div>
          </section>

          {/* How to Ensure Compatibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Ensure Maximum Compatibility</h2>
            <p className="mb-4">
              Here are practical steps to ensure your files work across all platforms:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Compatibility Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Choose universal formats (PDF, MP4, MP3, JPEG, PNG)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Test files on different platforms before sharing</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Convert files to compatible formats when needed</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Provide multiple format options when possible</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Include format information in file names</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                Convert Files for Maximum Compatibility
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Cross-Platform File Sharing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">File Naming:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use descriptive, clear file names</li>
                  <li>• Avoid special characters and spaces</li>
                  <li>• Include version numbers when applicable</li>
                  <li>• Use consistent naming conventions</li>
                  <li>• Keep file names under 255 characters</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">File Organization:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Group related files in folders</li>
                  <li>• Use consistent folder structures</li>
                  <li>• Include README files for complex projects</li>
                  <li>• Archive old versions appropriately</li>
                  <li>• Use cloud storage for easy access</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the most compatible document format?</h3>
                <p className="text-muted-foreground">
                  PDF is the most universally compatible document format. It works on all major platforms, maintains formatting, and doesn't require specific software to view. For editable documents, DOCX is widely supported but may have formatting differences across platforms.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Why do some files work on one platform but not another?</h3>
                <p className="text-muted-foreground">
                  Different platforms have different built-in codecs and software support. Some formats are proprietary to specific platforms, while others require additional software installation. Universal formats like PDF, MP4, and MP3 are designed to work across all platforms.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How can I convert files to more compatible formats?</h3>
                <p className="text-muted-foreground">
                  Use our free online file converter to convert files to universal formats. Simply upload your file, select the desired output format, and download the converted file. This ensures maximum compatibility across all platforms and devices.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Are there any formats I should avoid for cross-platform sharing?</h3>
                <p className="text-muted-foreground">
                  Avoid proprietary formats like Apple's Pages, Microsoft's Publisher files, or platform-specific formats. Also avoid very old or obscure formats that may not have modern support. Stick to well-established, open standards for maximum compatibility.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Cross-platform file compatibility is essential in our connected world. By choosing universal formats like PDF, MP4, MP3, JPEG, and PNG, you can ensure your files work seamlessly across all platforms and devices.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              When in doubt, convert your files to the most compatible formats using our free online file converter. This simple step can save you and your recipients from compatibility headaches and ensure your content is accessible everywhere.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                Start Converting Files for Maximum Compatibility
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default CrossPlatformFileCompatibility;