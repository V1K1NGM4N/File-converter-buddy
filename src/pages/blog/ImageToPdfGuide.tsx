import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { BlogTable } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ImageToPdfGuide = () => {
    const navigate = useNavigate();

    const comparisonData = [
        {
            feature: 'File Structure',
            image: 'Single raster layer',
            pdf: 'Multi-page document container',
            advantage: 'PDF supports multiple pages'
        },
        {
            feature: 'Sharing',
            image: 'Multiple separate files',
            pdf: 'Single file',
            advantage: 'PDF is easier to share'
        },
        {
            feature: 'Printing',
            image: 'Variable scaling',
            pdf: 'Standardized page sizes (A4)',
            advantage: 'PDF ensures consistent printing'
        },
        {
            feature: 'Quality',
            image: 'Format dependent',
            pdf: 'Preserves original quality',
            advantage: 'PDF maintains visual fidelity'
        },
        {
            feature: 'Security',
            image: 'None',
            pdf: 'Password protection support',
            advantage: 'PDF offers better security'
        }
    ];

    const columns = [
        { header: 'Feature', key: 'feature', width: '20%' },
        { header: 'Image Format (JPG/PNG)', key: 'image', width: '30%' },
        { header: 'PDF Format', key: 'pdf', width: '30%' },
        { header: 'PDF Advantage', key: 'advantage', width: '20%' }
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
                            Image to PDF Guide: How to Combine Photos into a Single Document
                        </h1>
                        <p className="text-xl text-muted-foreground mb-4">
                            Learn how to easily convert multiple images into a professional PDF document. Perfect for portfolios, receipts, and sharing photo collections.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Published: November 2025</span>
                            <span>•</span>
                            <span>5 min read</span>
                            <span>•</span>
                            <span>Image to PDF</span>
                        </div>
                    </header>

                    {/* Introduction */}
                    <section className="mb-8">
                        <p className="text-lg leading-relaxed mb-4">
                            In the digital age, we often find ourselves juggling multiple image files—whether they are scanned documents, receipts, or photos for a portfolio. Sharing these as separate attachments can be messy and unprofessional.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">
                            This is where converting images to PDF becomes a lifesaver. By combining multiple images into a single, standardized PDF document, you ensure your files are easy to share, print, and view on any device.
                        </p>
                    </section>

                    {/* Comparison Table */}
                    <BlogTable
                        title="Images vs. PDF: Why Convert?"
                        description="Understanding the benefits of using PDF over raw image formats for documents"
                        columns={columns}
                        data={comparisonData}
                    />

                    {/* Step-by-Step Guide */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">How to Convert Images to PDF Online</h2>
                        <p className="mb-4">
                            Using our free Image to PDF tool is simple and fast. Follow these steps to create your PDF document in seconds:
                        </p>

                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3">Step-by-Step Process:</h3>
                            <ol className="space-y-4">
                                <li className="flex items-start">
                                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                                    <div>
                                        <span className="font-medium">Upload Your Images</span>
                                        <p className="text-sm text-muted-foreground mt-1">Click the upload button or drag and drop your JPG, PNG, or WebP files. You can select multiple files at once.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                                    <div>
                                        <span className="font-medium">Review and Arrange</span>
                                        <p className="text-sm text-muted-foreground mt-1">Check the preview of your images. Ensure all the files you need are listed.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                                    <div>
                                        <span className="font-medium">Convert to PDF</span>
                                        <p className="text-sm text-muted-foreground mt-1">Click the "Convert to PDF" button. Our tool will instantly process your images and combine them into a single document.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                                    <div>
                                        <span className="font-medium">Download</span>
                                        <p className="text-sm text-muted-foreground mt-1">Save your new PDF file to your device. It's ready to be shared or printed!</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="text-center">
                            <Button
                                size="lg"
                                onClick={() => navigate('/image-to-pdf')}
                                className="mr-4"
                            >
                                Try Image to PDF Tool
                                <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </section>

                    {/* Best Practices */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Best Practices for Professional Results</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-3">For Documents & Receipts:</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>• Ensure good lighting when taking photos</li>
                                    <li>• Crop out unnecessary background</li>
                                    <li>• Use high contrast for readability</li>
                                    <li>• Keep pages in chronological order</li>
                                </ul>
                            </div>

                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-3">For Portfolios & Photos:</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>• Use high-resolution original images</li>
                                    <li>• Maintain consistent aspect ratios</li>
                                    <li>• Consider file size if emailing</li>
                                    <li>• Check color accuracy before converting</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

                        <div className="space-y-4">
                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-2">Can I convert different image formats together?</h3>
                                <p className="text-muted-foreground">
                                    Yes! You can mix and match JPG, PNG, and WebP images in a single upload batch. Our tool will combine them all into one seamless PDF document.
                                </p>
                            </div>

                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-2">Is my data secure?</h3>
                                <p className="text-muted-foreground">
                                    Absolutely. All conversions happen locally in your browser. Your files are never uploaded to a server, ensuring complete privacy and security for your documents.
                                </p>
                            </div>

                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-2">Is there a limit to how many images I can add?</h3>
                                <p className="text-muted-foreground">
                                    While there is no hard limit, we recommend keeping it reasonable (e.g., under 50 images) for the best browser performance. For very large batches, processing might take a bit longer.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                        <p className="text-lg leading-relaxed mb-4">
                            Converting images to PDF is a simple yet powerful way to organize and share your digital files. Whether you are a student submitting assignments, a professional sending receipts, or a creative building a portfolio, this tool streamlines your workflow.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            Start organizing your images today with our free, secure, and easy-to-use Image to PDF converter.
                        </p>

                        <div className="text-center">
                            <Button
                                size="lg"
                                onClick={() => navigate('/image-to-pdf')}
                                className="mr-4"
                            >
                                Convert Images to PDF Now
                                <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </section>
                </div>
            </article>
        </div>
    );
};

export default ImageToPdfGuide;
