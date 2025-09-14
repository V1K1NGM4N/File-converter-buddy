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
              Cross-Platform File Compatibility: Ensure Your Files Work Everywhere
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Learn how to choose file formats that work seamlessly across different platforms, devices, and operating systems.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Published: September 2025</span>
              <span>•</span>
              <span>17 min read</span>
              <span>•</span>
              <span>File Compatibility</span>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-4">
              Cross-platform file compatibility is crucial in today's multi-device world. Whether you're sharing files with colleagues, publishing content online, or archiving important documents, choosing the right formats ensures your files can be accessed and used across different platforms and devices.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In this comprehensive guide, we'll explore the most compatible file formats, explain platform-specific considerations, and help you choose formats that work seamlessly across Windows, Mac, Linux, mobile devices, and web browsers. Plus, we'll show you how to easily convert files for maximum compatibility using our free online file converter.
            </p>
          </section>

          {/* Main Comparison Table */}
          <BlogTable
            title="Cross-Platform File Compatibility"
            description="Compare file format compatibility across different platforms and devices"
            columns={columns}
            data={compatibilityData}
          />

          {/* Detailed Compatibility Analysis */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding Cross-Platform Compatibility</h2>
            
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Universal Formats for Maximum Compatibility</h3>
                <p className="mb-4">
                  Some file formats are designed to work across all platforms and devices. Understanding which formats offer the best compatibility helps you choose the right format for your needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Universal Formats:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• PDF for documents and presentations</li>
                      <li>• MP4 for video content</li>
                      <li>• MP3 for audio files</li>
                      <li>• JPEG for photographs</li>
                      <li>• PNG for graphics and images</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Platform-Specific Formats:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• DOCX (requires compatible software)</li>
                      <li>• MOV (primarily Mac/Apple devices)</li>
                      <li>• WAV (large file sizes)</li>
                      <li>• TIFF (limited mobile support)</li>
                      <li>• AVI (Windows-focused)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Platform-Specific Considerations</h3>
                <p className="mb-4">
                  Different platforms have different strengths and limitations when it comes to file format support. Understanding these differences helps you make informed decisions about file formats.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Test files on target platforms</li>
                      <li>• Consider mobile device limitations</li>
                      <li>• Use web-compatible formats for online content</li>
                      <li>• Provide multiple format options when possible</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Issues:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Format not supported on specific platforms</li>
                      <li>• Different rendering across devices</li>
                      <li>• Performance issues on mobile devices</li>
                      <li>• Inconsistent user experience</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Mobile and Web Compatibility</h3>
                <p className="mb-4">
                  Mobile devices and web browsers have specific requirements for file formats. Understanding these requirements helps you create content that works well across all devices and platforms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Best Practices:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use formats optimized for mobile devices</li>
                      <li>• Consider bandwidth limitations</li>
                      <li>• Test on different screen sizes</li>
                      <li>• Use responsive design principles</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Common Issues:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Large file sizes on mobile networks</li>
                      <li>• Format not supported in web browsers</li>
                      <li>• Performance issues on older devices</li>
                      <li>• Inconsistent rendering across browsers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Ensure Compatibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Ensure Cross-Platform Compatibility</h2>
            <p className="mb-4">
              Ensuring cross-platform compatibility requires understanding your audience and choosing the right formats. Here's how to do it effectively:
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Compatibility Process:</h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <span>Identify your target platforms and devices</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <span>Choose formats with the best compatibility for your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <span>Convert files to compatible formats using trusted tools</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <span>Test files on different platforms and devices</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                  <span>Provide multiple format options when necessary</span>
                </li>
              </ol>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Try Our Universal Converter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Cross-Platform Compatibility</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Format Selection:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Choose universal formats for maximum compatibility</li>
                  <li>• Consider your target audience and devices</li>
                  <li>• Test formats on different platforms</li>
                  <li>• Provide fallback options when necessary</li>
                  <li>• Use standard, well-supported formats</li>
                </ul>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Testing and Validation:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Test files on all target platforms</li>
                  <li>• Verify functionality across different devices</li>
                  <li>• Check performance on mobile devices</li>
                  <li>• Validate web browser compatibility</li>
                  <li>• Monitor user feedback and issues</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What's the most compatible file format for documents?</h3>
                <p className="text-muted-foreground">
                  PDF is the most compatible format for documents, working seamlessly across all platforms and devices. It preserves formatting and can be viewed without special software on most devices. For editable documents, consider providing both PDF and DOCX versions.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do I ensure my files work on mobile devices?</h3>
                <p className="text-muted-foreground">
                  To ensure mobile compatibility, use formats optimized for mobile devices, consider file size limitations, test on different screen sizes, and use responsive design principles. Avoid formats that require special software or have large file sizes.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What should I do if a format isn't supported on a platform?</h3>
                <p className="text-muted-foreground">
                  If a format isn't supported on a platform, provide alternative formats, use conversion tools to create compatible versions, or provide instructions for users to convert files themselves. Always test alternative formats to ensure they work properly.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How can I test cross-platform compatibility?</h3>
                <p className="text-muted-foreground">
                  To test cross-platform compatibility, use different devices and operating systems, test on various web browsers, check mobile device compatibility, and gather feedback from users on different platforms. Use testing tools and services to automate the process when possible.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Cross-platform file compatibility is essential for ensuring your files work seamlessly across different platforms and devices. By choosing universal formats, testing on different platforms, and following best practices, you can create content that works everywhere.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With our free online file converter, you can easily convert files to formats that work across all platforms. Whether you need to ensure compatibility for documents, images, audio, or video files, we've got you covered with tools that help you achieve maximum compatibility.
            </p>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/images')}
                className="mr-4"
              >
                Start Converting for Compatibility Now
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
