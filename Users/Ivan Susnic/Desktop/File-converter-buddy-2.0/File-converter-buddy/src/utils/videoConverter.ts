import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export type VideoFormat = 'mp4' | 'avi' | 'mov' | 'wmv' | 'flv' | 'webm' | 'mkv' | '3gp';

export interface VideoConversionOptions {
  quality?: 'low' | 'medium' | 'high';
  resolution?: '480p' | '720p' | '1080p' | 'original';
  bitrate?: number;
}

// Initialize FFmpeg
export const initializeFFmpeg = async (): Promise<void> => {
  if (ffmpeg) return;
  
  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
};

// Convert video file
export const convertVideo = async (
  file: File,
  targetFormat: VideoFormat,
  options: VideoConversionOptions = {}
): Promise<Blob> => {
  if (!ffmpeg) {
    await initializeFFmpeg();
  }

  if (!ffmpeg) {
    throw new Error('Failed to initialize FFmpeg');
  }

  const inputFileName = 'input' + getFileExtension(file.name);
  const outputFileName = `output.${targetFormat}`;

  try {
    // Write input file to FFmpeg
    await ffmpeg.writeFile(inputFileName, await fetchFile(file));

    // Build FFmpeg command based on target format and options
    const command = buildFFmpegCommand(inputFileName, outputFileName, targetFormat, options);
    
    // Execute conversion
    await ffmpeg.exec(command);

    // Read output file
    const data = await ffmpeg.readFile(outputFileName);
    
    // Clean up files
    await ffmpeg.deleteFile(inputFileName);
    await ffmpeg.deleteFile(outputFileName);

    // Convert to blob
    const blob = new Blob([data], { type: `video/${targetFormat}` });
    return blob;

  } catch (error) {
    // Clean up on error
    try {
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
    } catch (cleanupError) {
      console.warn('Failed to clean up FFmpeg files:', cleanupError);
    }
    
    throw new Error(`Video conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Build FFmpeg command based on format and options
const buildFFmpegCommand = (
  inputFile: string,
  outputFile: string,
  format: VideoFormat,
  options: VideoConversionOptions
): string[] => {
  const command = ['-i', inputFile];

  // Add quality settings
  if (options.quality) {
    switch (options.quality) {
      case 'low':
        command.push('-crf', '28', '-preset', 'fast');
        break;
      case 'medium':
        command.push('-crf', '23', '-preset', 'medium');
        break;
      case 'high':
        command.push('-crf', '18', '-preset', 'slow');
        break;
    }
  }

  // Add resolution settings
  if (options.resolution && options.resolution !== 'original') {
    switch (options.resolution) {
      case '480p':
        command.push('-vf', 'scale=854:480');
        break;
      case '720p':
        command.push('-vf', 'scale=1280:720');
        break;
      case '1080p':
        command.push('-vf', 'scale=1920:1080');
        break;
    }
  }

  // Add bitrate if specified
  if (options.bitrate) {
    command.push('-b:v', `${options.bitrate}k`);
  }

  // Add format-specific settings
  switch (format) {
    case 'mp4':
      command.push('-c:v', 'libx264', '-c:a', 'aac', '-movflags', '+faststart');
      break;
    case 'webm':
      command.push('-c:v', 'libvpx-vp9', '-c:a', 'libopus');
      break;
    case 'avi':
      command.push('-c:v', 'libx264', '-c:a', 'mp3');
      break;
    case 'mov':
      command.push('-c:v', 'libx264', '-c:a', 'aac');
      break;
    case 'wmv':
      command.push('-c:v', 'wmv2', '-c:a', 'wmav2');
      break;
    case 'flv':
      command.push('-c:v', 'libx264', '-c:a', 'aac');
      break;
    case 'mkv':
      command.push('-c:v', 'libx264', '-c:a', 'aac');
      break;
    case '3gp':
      command.push('-c:v', 'libx264', '-c:a', 'aac', '-s', '320x240');
      break;
  }

  command.push(outputFile);
  return command;
};

// Get file extension from filename
const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Check if format conversion is needed
export const needsConversion = (file: File, targetFormat: VideoFormat): boolean => {
  const currentExtension = getFileExtension(file.name).toLowerCase();
  return currentExtension !== targetFormat;
};

// Get supported input formats
export const getSupportedInputFormats = (): string[] => {
  return ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', '3gp', 'm4v', 'mpg', 'mpeg'];
};

// Get supported output formats
export const getSupportedOutputFormats = (): VideoFormat[] => {
  return ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', '3gp'];
};
