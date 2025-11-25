import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SEOHead } from '@/components/SEOHead';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { toast } from 'sonner';
import {
    Upload,
    Download,
    X,
    RefreshCw,
    Play,
    Video,
    Image as ImageIcon,
    Music,
    Package,
    Minimize2,
    Film
} from 'lucide-react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';

const VideoToGif = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);

    const handleFileSelected = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith('video/')) {
                toast.error('Please upload a video file');
                return;
            }
            setFile(selectedFile);
            setResultBlob(null);
            setProgress(0);
            toast.success('Video added');
        }
    }, []);

    const convertToGif = async () => {
        if (!file) return;

        setIsProcessing(true);
        setProgress(0);

        try {
            const ffmpeg = new FFmpeg();
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });

            const inputName = 'input.mp4';
            const outputName = 'output.gif';

            await ffmpeg.writeFile(inputName, await fetchFile(file));

            ffmpeg.on('progress', ({ progress }) => {
                setProgress(Math.round(progress * 100));
            });

            // Convert to GIF with reasonable quality
            // fps=15, scale=480:-1 (resize width to 480px, keep aspect ratio)
            await ffmpeg.exec([
                '-i', inputName,
                '-vf', 'fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
                outputName
            ]);

            const data = await ffmpeg.readFile(outputName);
            const blob = new Blob([data], { type: 'image/gif' });
            setResultBlob(blob);
            toast.success('Conversion complete!');

            // @ts-ignore
            if (window.confetti) {
                // @ts-ignore
                window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }

        } catch (error) {
            console.error('GIF conversion error:', error);
            toast.error('Failed to convert video to GIF');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!resultBlob) return;
        const url = URL.createObjectURL(resultBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file ? `${file.name.split('.')[0]}.gif` : 'converted.gif';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <SEOHead
                title="Video to GIF Converter"
                description="Convert videos to high-quality GIFs online for free. Fast, secure, and easy to use."
                keywords="video to gif, mp4 to gif, gif converter, online gif maker"
                canonicalUrl="https://fileconverterbuddy.com/video-to-gif"
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
                            <div className="p-3 bg-pink-500/10 rounded-xl">
                                <Film className="h-8 w-8 text-pink-500" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    Video to <span className="text-pink-500">GIF</span>
                                </h1>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Turn your videos into animated GIFs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tool Navigation (Simplified) */}
                <div className="bg-background border-b border-border">
                    <div className="container mx-auto px-6 py-4">
                        <Button variant="ghost" onClick={() => navigate('/')} className="text-muted-foreground">
                            ← Back to Home
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-xl mx-auto space-y-8">

                        {/* Upload Area */}
                        {!file && (
                            <div className="relative border-2 border-dashed border-border rounded-xl p-12 text-center transition-all duration-300 bg-gradient-upload shadow-upload hover:border-pink-500/50 hover:shadow-glow group">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelected}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center gap-4 pointer-events-none">
                                    <div className="p-4 bg-background rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="h-8 w-8 text-pink-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Upload Video</h3>
                                        <p className="text-muted-foreground">Drag and drop or click to select</p>
                                    </div>
                                    <Button variant="secondary" className="pointer-events-auto">Choose Video</Button>
                                </div>
                            </div>
                        )}

                        {/* Processing Area */}
                        {file && (
                            <Card>
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-pink-100 rounded-lg">
                                                <Video className="h-6 w-6 text-pink-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{file.name}</p>
                                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => { setFile(null); setResultBlob(null); }}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {isProcessing && (
                                        <div className="space-y-2">
                                            <Progress value={progress} className="h-2" />
                                            <p className="text-xs text-center text-muted-foreground">Converting... {progress}%</p>
                                        </div>
                                    )}

                                    {!isProcessing && !resultBlob && (
                                        <Button onClick={convertToGif} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                                            <Play className="h-4 w-4 mr-2" /> Convert to GIF
                                        </Button>
                                    )}

                                    {resultBlob && (
                                        <div className="space-y-4">
                                            <div className="rounded-lg overflow-hidden border border-border">
                                                <img src={URL.createObjectURL(resultBlob)} alt="Generated GIF" className="w-full" />
                                            </div>
                                            <Button onClick={handleDownload} className="w-full" variant="outline">
                                                <Download className="h-4 w-4 mr-2" /> Download GIF
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoToGif;
