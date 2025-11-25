import { convertImage, ImageFormat } from './imageConverter';
import JSZip from 'jszip';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';

// Initialize FFmpeg instance
let ffmpeg: FFmpeg | null = null;

const initializeFFmpeg = async (): Promise<FFmpeg> => {
  if (ffmpeg) return ffmpeg;

  console.log('Creating new FFmpeg instance for reducer...');
  const instance = new FFmpeg();

  // Use a reliable CDN for ffmpeg binaries
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

  try {
    await instance.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    ffmpeg = instance;
    console.log('FFmpeg loaded successfully');
    return instance;
  } catch (error) {
    console.error('Failed to load FFmpeg:', error);
    throw new Error('Failed to initialize video compression engine');
  }
};

export interface ReductionResult {
  blob: Blob;
  originalSize: number;
  newSize: number;
  reductionPercentage: number;
  type: string;
}

export const reduceFileSize = async (
  file: File,
  reductionPercentage: number // 0 to 100 (amount to reduce)
): Promise<ReductionResult> => {
  const fileType = file.type;
  const originalSize = file.size;

  // Calculate target quality (1.0 - reduction/100)
  // e.g. 10% reduction -> 0.9 quality
  // e.g. 80% reduction -> 0.2 quality
  // Clamp between 0.1 and 1.0
  const quality = Math.max(0.1, Math.min(1.0, 1 - (reductionPercentage / 100)));

  console.log(`Reducing ${file.name} (${fileType}) by ${reductionPercentage}% (Quality: ${quality})`);

  let resultBlob: Blob;

  try {
    if (fileType.startsWith('image/')) {
      resultBlob = await reduceImage(file, quality);
    } else if (fileType.startsWith('video/')) {
      resultBlob = await reduceVideo(file, quality);
    } else {
      // For other files, we zip them
      resultBlob = await compressToZip(file);
    }
  } catch (error) {
    console.error('Reduction failed, returning original file:', error);
    resultBlob = file;
  }

  // If result is larger than original (can happen with zip on already compressed files), return original
  if (resultBlob.size >= originalSize && !fileType.startsWith('image/') && !fileType.startsWith('video/')) {
    console.log('Result larger than original, returning original');
    resultBlob = file;
  }

  return {
    blob: resultBlob,
    originalSize,
    newSize: resultBlob.size,
    reductionPercentage: Math.round(((originalSize - resultBlob.size) / originalSize) * 100),
    type: resultBlob.type
  };
};

const reduceImage = async (file: File, quality: number): Promise<Blob> => {
  // Use existing image converter but force JPEG or WebP for better compression if original is PNG/Lossless
  // Or just keep original format if supported.
  // convertImage takes (file, format, quality).

  let targetFormat: ImageFormat = 'jpeg';
  if (file.type === 'image/png') targetFormat = 'png';
  if (file.type === 'image/webp') targetFormat = 'webp';

  // If user wants high reduction on PNG, we might need to convert to JPEG or WebP
  if (file.type === 'image/png' && quality < 0.8) {
    targetFormat = 'jpeg'; // Force JPEG for better compression
  }

  return await convertImage(file, targetFormat, quality);
};

const reduceVideo = async (file: File, quality: number): Promise<Blob> => {
  try {
    const ffmpegInstance = await initializeFFmpeg();

    const inputName = 'input' + getFileExtension(file.name);
    const outputName = 'output.mp4'; // Always output MP4 for now for compatibility

    await ffmpegInstance.writeFile(inputName, await fetchFile(file));

    // Calculate bitrate based on quality
    // Base bitrate assumption: 1080p ~ 5000k, 720p ~ 2500k
    // We'll just use CRF (Constant Rate Factor) for x264
    // CRF 18-28 is sane range. 51 is worst.
    // Map quality (1.0 - 0.1) to CRF (24 - 51)
    // 1.0 -> 24 (Standard web quality, good compression)
    // 0.1 -> 51 (Lowest quality)
    // Formula: 24 + (1-quality) * 27
    const crf = Math.round(24 + (1 - quality) * 27);

    console.log(`Running FFmpeg with CRF: ${crf}`);

    await ffmpegInstance.exec([
      '-i', inputName,
      '-vcodec', 'libx264',
      '-crf', crf.toString(),
      '-preset', 'fast', // fast encoding
      '-acodec', 'aac',
      '-b:a', '128k', // reasonable audio
      outputName
    ]);

    const data = await ffmpegInstance.readFile(outputName);
    return new Blob([data], { type: 'video/mp4' });

  } catch (error) {
    console.error('Video reduction error:', error);
    // Fallback: return original if ffmpeg fails
    return file;
  }
};

const compressToZip = async (file: File): Promise<Blob> => {
  const zip = new JSZip();
  zip.file(file.name, file);
  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });
};

const getFileExtension = (filename: string): string => {
  const ext = filename.split('.').pop();
  return ext ? `.${ext}` : '';
};
