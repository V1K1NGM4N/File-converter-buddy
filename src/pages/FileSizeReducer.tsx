import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalFileUpload } from '@/components/UniversalFileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { SEOHead } from '@/components/SEOHead';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { toast } from 'sonner';
import {
    Upload,
    Download,
    X,
    RefreshCw,
    Play,
    Minimize2,
    FileText,
    Image as ImageIcon,
    Video,
    Music,
    Trash2,
    CheckCircle,
    AlertCircle,
    Package
} from 'lucide-react';
import { reduceFileSize, ReductionResult } from '@/utils/fileReducer';
import { downloadBlob } from '@/utils/imageConverter'; // Reuse download logic
import { downloadMultipleFilesAsZip } from '@/utils/zipDownload';

interface ReducerFile {
    id: string;
    file: File;
    status: 'pending' | 'processing' | 'completed' | 'error';
    progress: number;
    result?: ReductionResult;
    error?: string;
}

const FileSizeReducer = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState<ReducerFile[]>([]);
    const [reductionPercentage, setReductionPercentage] = useState([20]); // Default 20% reduction
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFilesSelected = useCallback((newFiles: File[]) => {
        const validFiles: File[] = [];
        let hasLargeFile = false;

        newFiles.forEach(file => {
            if (file.size > 1024 * 1024 * 1024) { // 1GB
                hasLargeFile = true;
            } else {
                validFiles.push(file);
            }
        });

        if (hasLargeFile) {
            toast.error('Some files were skipped because they are larger than 1GB. Please use smaller files for browser-based processing.');
        }

        const reducerFiles: ReducerFile[] = validFiles.map(file => ({
            id: crypto.randomUUID(),
            file,
            status: 'pending',
            progress: 0
        }));
        setFiles(prev => [...prev, ...reducerFiles]);
        if (validFiles.length > 0) {
            toast.success(`Added ${validFiles.length} file(s)`);
        }
    }, []);

    const handleRemoveFile = useCallback((id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    }, []);

    const handleClearAll = useCallback(() => {
        setFiles([]);
        toast.success('Cleared all files');
    }, []);

    const triggerConfetti = () => {
        // @ts-ignore
        if (window.confetti) {
            // @ts-ignore
            window.confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    const handleStartReduction = useCallback(async () => {
        if (files.length === 0) return;

        setIsProcessing(true);

        const targetReduction = reductionPercentage[0];
        const newFiles = [...files];

        // Mark pending as processing
        const pendingIndices = newFiles.map((f, i) => f.status === 'pending' || f.status === 'error' ? i : -1).filter(i => i !== -1);

        if (pendingIndices.length === 0) {
            setIsProcessing(false);
            return;
        }

        for (const index of pendingIndices) {
            newFiles[index] = { ...newFiles[index], status: 'processing', progress: 0 };
        }
        setFiles([...newFiles]);

        // Process
        await Promise.all(pendingIndices.map(async (index) => {
            const fileItem = newFiles[index];
            try {
                // Simulate progress
                const progressInterval = setInterval(() => {
                    setFiles(current => {
                        const updated = [...current];
                        if (updated[index].status === 'processing') {
                            updated[index].progress = Math.min(90, updated[index].progress + 10);
                        }
                        return updated;
                    });
                }, 500);

                const result = await reduceFileSize(fileItem.file, targetReduction);

                clearInterval(progressInterval);

                setFiles(current => {
                    const updated = [...current];
                    updated[index] = {
                        ...updated[index],
                        status: 'completed',
                        progress: 100,
                        result
                    };
                    return updated;
                });
            } catch (error) {
                console.error('Error reducing file:', error);
                setFiles(current => {
                    const updated = [...current];
                    updated[index] = {
                        ...updated[index],
                        status: 'error',
                        progress: 0,
                        error: 'Failed to reduce file size'
                    };
                    return updated;
                });
            }
        }));

        setIsProcessing(false);
        triggerConfetti();
        toast.success('Processing complete');

    }, [files, reductionPercentage]);

    const handleDownload = useCallback((fileItem: ReducerFile) => {
        if (!fileItem.result) return;
        const originalName = fileItem.file.name;
        const nameParts = originalName.split('.');
        const ext = nameParts.pop();
        const baseName = nameParts.join('.');

        // If zip, ensure .zip extension
        let filename = `${baseName}_reduced.${ext}`;
        if (fileItem.result.type === 'application/zip' && !filename.endsWith('.zip')) {
            filename = `${baseName}_reduced.zip`;
        }

        downloadBlob(fileItem.result.blob, filename);
    }, []);

    const handleDownloadAll = useCallback(async () => {
        const completed = files.filter(f => f.status === 'completed' && f.result);
        if (completed.length === 0) return;

        if (completed.length === 1) {
            handleDownload(completed[0]);
            return;
        }

        const filesForZip = completed.map(f => ({
            name: f.file.name, // Zip downloader handles duplicates?
            blob: f.result!.blob,
            folder: 'Reduced Files'
        }));

        await downloadMultipleFilesAsZip(filesForZip, 'ReducedFiles.zip');
    }, [files, handleDownload]);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getIconForType = (type: string) => {
        if (type.startsWith('image/')) return <ImageIcon className="h-5 w-5 text-blue-500" />;
        if (type.startsWith('video/')) return <Video className="h-5 w-5 text-purple-500" />;
        if (type.startsWith('audio/')) return <Music className="h-5 w-5 text-green-500" />;
        return <FileText className="h-5 w-5 text-gray-500" />;
    };

    return (
        <>
            <SEOHead
                title="File Size Reducer"
                description="Reduce the file size of images, videos, and documents online. Free bulk file compressor."
                keywords="file reducer, compress file, reduce image size, reduce video size, online compressor"
                canonicalUrl="https://fileconverterbuddy.com/reducer"
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
                                    className="text-sm text-primary font-medium"
                                >
                                    Blog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero */}
                <div className="bg-background border-b border-border">
                    <div className="container mx-auto px-6 py-12">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-red-500/10 rounded-xl">
                                <Minimize2 className="h-8 w-8 text-red-500" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    File Size <span className="text-red-500">Reducer</span>
                                </h1>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Compress images, videos, and documents efficiently
                                </p>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
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
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                                                Image Converter
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                JPG, PNG, WebP
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/video')}
                                    className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-purple-500/20 bg-purple-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.5s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <Video className="h-6 w-6 text-purple-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                                                Video Converter
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                MP4, AVI, MOV
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/audio')}
                                    className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-green-500/20 bg-green-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.6s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <Music className="h-6 w-6 text-green-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                                                Audio Converter
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                MP3, WAV, FLAC
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/product-feed-image-downloader')}
                                    className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-orange-500/20 bg-orange-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.7s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <Package className="h-6 w-6 text-orange-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                                                Feed Downloader
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Product Images
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/reducer')}
                                    className="group p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-red-500/20 bg-red-500/10 animate-fade-in-up"
                                    style={{ animationDelay: '0.8s' }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                                            <Minimize2 className="h-6 w-6 text-red-500" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                                                Size Reducer
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Compress Files
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Upload Area */}
                        {files.length === 0 && (
                            <div className="relative border-2 border-dashed border-border rounded-xl p-12 text-center transition-all duration-300 bg-gradient-upload shadow-upload hover:border-red-500/50 hover:shadow-glow group">
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        handleFilesSelected(files);
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />

                                <div className="flex flex-col items-center gap-4 pointer-events-none">
                                    <div className="p-4 bg-background rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-8 w-8 text-red-500" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            Upload Files to Reduce
                                        </h3>
                                        <p className="text-muted-foreground mb-4">
                                            Drag and drop files here, or click to select
                                        </p>
                                        <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                                            Supports Images, Videos, Audio, and Documents
                                        </p>
                                    </div>

                                    <Button variant="secondary" className="pointer-events-auto">
                                        Choose Files
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Controls & List */}
                        {files.length > 0 && (
                            <div className="space-y-6">
                                {/* Controls Card */}
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">Compression Level</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Target reduction: <span className="font-bold text-red-500">{reductionPercentage[0]}%</span>
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={handleStartReduction}
                                                        disabled={isProcessing}
                                                        className="bg-red-500 hover:bg-red-600 text-white"
                                                    >
                                                        {isProcessing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
                                                        {isProcessing ? 'Processing...' : 'Reduce File Size'}
                                                    </Button>
                                                    {files.some(f => f.status === 'completed') && (
                                                        <Button onClick={handleDownloadAll} variant="outline">
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download All
                                                        </Button>
                                                    )}
                                                    <Button onClick={handleClearAll} variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="pt-2 px-2 space-y-4">
                                                <div className="flex gap-2 justify-center">
                                                    <Button
                                                        variant={reductionPercentage[0] === 10 ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setReductionPercentage([10])}
                                                        className="flex-1"
                                                    >
                                                        Light (10%)
                                                    </Button>
                                                    <Button
                                                        variant={reductionPercentage[0] === 50 ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setReductionPercentage([50])}
                                                        className="flex-1"
                                                    >
                                                        Balanced (50%)
                                                    </Button>
                                                    <Button
                                                        variant={reductionPercentage[0] === 80 ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setReductionPercentage([80])}
                                                        className="flex-1"
                                                    >
                                                        Max (80%)
                                                    </Button>
                                                </div>
                                                <Slider
                                                    value={reductionPercentage}
                                                    onValueChange={setReductionPercentage}
                                                    max={90}
                                                    min={10}
                                                    step={10}
                                                    className="cursor-pointer"
                                                />
                                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                                    <span>Light (10%)</span>
                                                    <span>Balanced (50%)</span>
                                                    <span>Heavy (90%)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* File List */}
                                <div className="grid gap-4">
                                    {files.map(file => (
                                        <Card key={file.id} className="overflow-hidden">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-muted rounded-lg">
                                                        {getIconForType(file.file.type)}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="font-medium truncate" title={file.file.name}>{file.file.name}</p>
                                                            {file.status === 'completed' && file.result && (
                                                                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                                                    -{file.result.reductionPercentage}%
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                                                            <span>{formatSize(file.file.size)}</span>
                                                            {file.status === 'completed' && file.result && (
                                                                <>
                                                                    <span>→</span>
                                                                    <span className="font-medium text-foreground">{formatSize(file.result.newSize)}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {file.status === 'processing' && (
                                                            <div className="w-24">
                                                                <Progress value={file.progress} className="h-2" />
                                                            </div>
                                                        )}
                                                        {file.status === 'completed' && (
                                                            <Button size="sm" variant="outline" onClick={() => handleDownload(file)}>
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {file.status === 'error' && (
                                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                                        )}
                                                        <Button size="sm" variant="ghost" onClick={() => handleRemoveFile(file.id)}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <Button variant="outline" onClick={() => (document.querySelector('input[type="file"]') as HTMLElement)?.click()}>
                                        Add More Files
                                    </Button>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default FileSizeReducer;
