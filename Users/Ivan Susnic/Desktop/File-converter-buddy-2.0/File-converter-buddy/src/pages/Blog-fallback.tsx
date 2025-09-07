import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
              
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Blog Link */}
              <button 
                onClick={() => navigate('/blog')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Join for free use
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Blog <span className="text-primary">Coming Soon</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              We're working on bringing you helpful content about file conversion, tips, and more!
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Stay Tuned!</h2>
            <p className="text-muted-foreground mb-6">
              Our blog will feature articles about file formats, conversion tips, and updates about File Converter Buddy.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
