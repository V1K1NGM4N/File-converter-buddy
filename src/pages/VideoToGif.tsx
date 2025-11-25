import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SEOHead } from '@/components/SEOHead';
{/* Processing Area */ }
{
    file && (
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
    )
}

                    </div >
                </div >
            </div >
        </>
    );
};

export default VideoToGif;
