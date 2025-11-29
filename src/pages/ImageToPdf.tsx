import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePreview } from '@/components/ImagePreview';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { ConversionSuccessModal } from '@/components/ConversionSuccessModal';
import { convertImagesToPdf } from '@/utils/imageToPdf';
import { downloadBlob } from '@/utils/imageConverter';
import { trackConversion, trackDownload } from '@/utils/conversionTracker';
import { toast } from 'sonner';
import { FileText, Upload, Play, RefreshCw, X, Download, ChevronDown, Image as ImageIcon, Video, Music, Package } from 'lucide-react';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { Card, CardContent } from '@/components/ui/card';
import { useFilePersistence } from '@/hooks/useFilePersistence';
import { ConversionFile } from '@/utils/imageConverter';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ImageToPdf = () => {
    const navigate = useNavigate();
    const { files, updateFiles, clearFiles } = useFilePersistence('imageToPdfFiles');
    const [isConverting, setIsConverting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [conversionResults, setConversionResults] = useState({
        totalFiles: 0,
        successfulFiles: 0,
        failedFiles: 0,
        fileType: 'images' as const,
        originalFormat: 'mixed',
        targetFormat: 'pdf',
        totalSizeReduction: 0
    });

    const handleFilesSelected = useCallback((newFiles: File[]) => {
        const validFiles = newFiles.filter(file => file.type.startsWith('image/'));

        if (validFiles.length < newFiles.length) {
            toast.error('Some files were skipped. Only image files are supported.');
        }

        if (validFiles.length === 0) return;

        const conversionFiles: ConversionFile[] = validFiles.map(file => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
            progress: 0,
            status: 'pending'
        }));

        updateFiles([...files, ...conversionFiles]);
        toast.success(`Added ${validFiles.length} images`);
    }, [files, updateFiles]);

    const handleFileUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*';
        input.onchange = (e) => {
            const files = Array.from((e.target as HTMLInputElement).files || []);
            handleFilesSelected(files);
        };
        input.click();
    };

    const handleRemoveFile = useCallback((id: string) => {
        const file = files.find(f => f.id === id);
        if (file) {
            URL.revokeObjectURL(file.preview);
        }
        updateFiles(files.filter(f => f.id !== id));
    }, [files, updateFiles]);

    const handleStartConversion = useCallback(async () => {
        if (files.length === 0) return;

        setIsConverting(true);

        try {
            const imageFiles = files.map(f => f.file);
            const pdf = await convertImagesToPdf(imageFiles);
            setPdfBlob(pdf);

            // Track conversion
            trackConversion('images', files.length);

            setConversionResults({
                totalFiles: files.length,
                successfulFiles: files.length,
                failedFiles: 0,
                fileType: 'images',
                originalFormat: 'mixed',
                targetFormat: 'pdf',
                totalSizeReduction: 0
            });

            setShowSuccessModal(true);
            toast.success('PDF generated successfully!');

        } catch (error) {
            console.error('PDF generation failed:', error);
            toast.error('Failed to generate PDF. Please try again.');
        } finally {
            setIsConverting(false);
        }
    }, [files]);

    const handleDownloadPdf = useCallback(() => {
        if (!pdfBlob) return;
        const filename = `converted_images_${new Date().toISOString().slice(0, 10)}.pdf`;
        downloadBlob(pdfBlob, filename);
        trackDownload('images', 1, 'single');
    }, [pdfBlob]);

    const handleCloseSuccessModal = useCallback(() => {
        setShowSuccessModal(false);
    }, []);

    const handleConvertAnother = useCallback(() => {
        setShowSuccessModal(false);
        setPdfBlob(null);
        clearFiles();
    }, [clearFiles]);

    const handleReset = useCallback(() => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
        clearFiles();
        setPdfBlob(null);
        setIsConverting(false);
        toast.success('Cleared all files');
    }, [files, clearFiles]);

    // Dummy component for protected download button since we download the whole PDF
    const ProtectedDownloadButton = ({ file, children }: { file: ConversionFile, children: React.ReactNode }) => {
        return null;
    };

    return (
        <>
            <SEOHead
                title="Image to PDF Converter"
                description="Convert multiple images into a single PDF document. Free, secure, and easy to use."
                keywords="image to pdf, jpg to pdf, png to pdf, combine images to pdf"
                canonicalUrl="https://fileconverterbuddy.com/image-to-pdf"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Image to PDF Converter",
                    "description": "Convert multiple images to PDF",
                    "url": "https://fileconverterbuddy.com/image-to-pdf",
                    "applicationCategory": "UtilityApplication"
                }}
            />
            <div className="min-h-screen bg-background">
                {/* Header */}
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
                                    className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                                >
                                    Blog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-background">
                    <div className="container mx-auto px-6 py-6 sm:py-12">
                        <div className="flex items-center space-x-4">
                            <div className="animate-fade-in">
                                <FileText className="h-12 w-12 text-primary" />
                            </div>
                            <div className="animate-fade-in-up">
                                <h1 className="text-4xl font-bold">
                                    Image to <span className="text-primary">PDF</span>
                                </h1>
                                <p className="text-muted-foreground text-sm">Combine multiple images into one PDF document</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tool Navigation */}
                <div className="bg-background border-b border-border">
                    <div className="container mx-auto px-6 py-4 sm:py-8">
                        {/* Desktop Tool Navigation */}
                        <div className="hidden sm:block">
                            <h2 className="text-xl font-semibold mb-6 animate-fade-in-up delay-300">Choose Your Tool</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <button
                                    onClick={() => navigate('/images')}
                                    className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-blue-500/20 bg-blue-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.4s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <ImageIcon className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                <span className="hidden md:inline">Image File Converter</span>
                                                <span className="md:hidden">Images</span>
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                JPG, PNG, WebP and more
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/video')}
                                    className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-purple-500/20 bg-purple-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.5s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <Video className="h-6 w-6 text-purple-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                <span className="hidden md:inline">Video File Converter</span>
                                                <span className="md:hidden">Video</span>
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                MP4, AVI, MOV and more
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/audio')}
                                    className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-green-500/20 bg-green-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.6s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <Music className="h-6 w-6 text-green-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                <span className="hidden md:inline">Audio File Converter</span>
                                                <span className="md:hidden">Audio</span>
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                MP3, WAV, FLAC and more
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/product-feed-image-downloader')}
                                    className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-orange-500/20 bg-orange-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.7s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <Package className="h-6 w-6 text-orange-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                <span className="hidden md:inline">Product Feed Image Downloader</span>
                                                <span className="md:hidden">Product Feed</span>
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Easily download product feed images in the format you need
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Collapsible Tool Navigation */}
                        <Collapsible className="block sm:hidden">
                            <CollapsibleTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    <span>Choose Your Tool</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={() => navigate('/images')}
                                        className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-blue-500/20 bg-blue-500/10"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                                <ImageIcon className="h-6 w-6 text-blue-500" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Images</h3>
                                                <p className="text-sm text-muted-foreground">JPG, PNG, WebP and more</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => navigate('/video')}
                                        className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-purple-500/20 bg-purple-500/10"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                                <Video className="h-6 w-6 text-purple-500" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Video</h3>
                                                <p className="text-sm text-muted-foreground">MP4, AVI, MOV and more</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => navigate('/audio')}
                                        className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-green-500/20 bg-green-500/10"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                                <Music className="h-6 w-6 text-green-500" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Audio</h3>
                                                <p className="text-sm text-muted-foreground">MP3, WAV, FLAC and more</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => navigate('/product-feed-image-downloader')}
                                        className="group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-orange-500/20 bg-orange-500/10"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                                <Package className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Product Feed</h3>
                                                <p className="text-sm text-muted-foreground">Easily download product feed images in the format you need</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Upload Section */}
                        {files.length === 0 && (
                            <div className="relative border-2 border-dashed border-border rounded-xl p-8 text-center transition-all duration-300 bg-gradient-upload shadow-upload hover:border-primary/50 hover:shadow-glow">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        handleFilesSelected(files);
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Upload className="h-8 w-8" />
                                        <FileText className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Upload Images</h3>
                                        <p className="text-muted-foreground mb-4">Drag and drop images here, or click to select</p>
                                        <p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP, etc.</p>
                                    </div>
                                    <Button variant="secondary">Choose Files</Button>
                                </div>
                            </div>
                        )}

                        {/* Controls */}
                        {files.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold">{files.length} image{files.length !== 1 ? 's' : ''} selected</h3>
                                            <p className="text-muted-foreground">Ready to combine into PDF</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Button
                                                onClick={handleStartConversion}
                                                disabled={isConverting}
                                                className="hover:shadow-glow"
                                            >
                                                {isConverting ? (
                                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                                ) : (
                                                    <Play className="h-4 w-4 mr-2" />
                                                )}
                                                {isConverting ? 'Generating PDF...' : 'Convert to PDF'}
                                            </Button>

                                            {pdfBlob && (
                                                <Button
                                                    onClick={handleDownloadPdf}
                                                    className="hover:shadow-glow bg-green-600 hover:bg-green-700 text-white border-green-600"
                                                    variant="default"
                                                >
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download PDF
                                                </Button>
                                            )}

                                            <Button variant="outline" onClick={handleReset}>
                                                <X className="h-4 w-4 mr-2" />
                                                Clear All
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Image List */}
                        <ImagePreview
                            files={files}
                            targetFormat="pdf"
                            onRemoveFile={handleRemoveFile}
                            onDownloadFile={() => { }} // No individual download
                            fileGroup="images"
                            ProtectedDownloadButton={ProtectedDownloadButton}
                        />

                        {/* Add More Button */}
                        {files.length > 0 && (
                            <div className="text-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handleFileUpload}
                                    className="hover:shadow-glow"
                                >
                                    Add More Images
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Success Modal */}
                <ConversionSuccessModal
                    isOpen={showSuccessModal}
                    onClose={handleCloseSuccessModal}
                    onConvertAnother={handleConvertAnother}
                    conversionResults={conversionResults}
                />
            </div>
        </>
    );
};

export default ImageToPdf;
