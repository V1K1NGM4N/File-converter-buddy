import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Blog = () => {
  const navigate = useNavigate();

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
              {/* Blog Link */}
              <button 
                onClick={() => navigate('/blog')}
                className="text-sm text-primary font-medium"
              >
                Blog
              </button>
              
              {/* Authentication */}
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
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          
          <div className="space-y-8">
            {/* Latest Blog Post */}
            <div 
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 transition-all duration-200 cursor-pointer"
              onClick={() => navigate('/blog/complete-guide-to-image-file-formats')}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Complete Guide to Image File Formats: JPEG vs PNG vs WebP vs GIF
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Everything you need to know about image formats, their differences, and when to use each one for optimal results.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>September 2025</span>
                    <span>•</span>
                    <span>15 min read</span>
                    <span>•</span>
                    <span>File Conversion</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary text-primary-foreground px-6 py-2 rounded-md inline-block">
                Read More
              </div>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• File format guides and best practices</li>
                <li>• Productivity tips for content creators</li>
                <li>• Technical insights about file conversion</li>
                <li>• Updates and new features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
