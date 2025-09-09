import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export type VideoFormat = 'mp4' | 'avi' | 'mov' | 'webm';

export interface VideoConversionOptions {
  quality?: 'low' | 'medium' | 'high';
  resolution?: '480p' | '720p' | '1080p' | 'original';
  bitrate?: number;
}

// Initialize FFmpeg
export const initializeFFmpeg = async (): Promise<void> => {
  if (ffmpeg) return;
  
  console.log('Creating new FFmpeg instance...');
  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd';
  
  try {
    console.log('Loading FFmpeg core...');
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    console.log('FFmpeg loaded successfully');
  } catch (error) {
    console.error('Failed to load FFmpeg:', error);
    ffmpeg = null;
    throw new Error(`Failed to initialize FFmpeg: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Convert video file
export const convertVideo = async (
  file: File,
  targetFormat: VideoFormat,
  options: VideoConversionOptions = {}
): Promise<Blob> => {
  console.log(`convertVideo called: ${file.name} -> ${targetFormat}`);
  
  try {
    if (!ffmpeg) {
      console.log('Initializing FFmpeg...');
      await initializeFFmpeg();
    }

    if (!ffmpeg) {
      throw new Error('Failed to initialize FFmpeg');
    }

    const inputFileName = 'input' + getFileExtension(file.name);
    const outputFileName = `output.${targetFormat}`;

    console.log(`Writing input file: ${inputFileName}`);
    // Write input file to FFmpeg
    await ffmpeg.writeFile(inputFileName, await fetchFile(file));

    // Build FFmpeg command based on target format and options
    const command = buildFFmpegCommand(inputFileName, outputFileName, targetFormat, options);
    console.log('FFmpeg command:', command);
    
    // Execute conversion with timeout
    console.log('Executing FFmpeg conversion...');
    try {
      await ffmpeg.exec(command);
    } catch (execError) {
      console.error('FFmpeg execution failed, trying fallback command:', execError);
      
      // Try a simpler fallback command
      const fallbackCommand = ['-i', inputFileName, '-c:v', 'libx264', '-c:a', 'aac', outputFileName];
      console.log('Trying fallback command:', fallbackCommand);
      
      try {
        await ffmpeg.exec(fallbackCommand);
        console.log('Fallback command succeeded');
      } catch (fallbackError) {
        console.error('Fallback command also failed:', fallbackError);
        throw new Error(`Video conversion failed: ${execError instanceof Error ? execError.message : 'Unknown error'}`);
      }
    }

    // Read output file
    console.log('Reading output file...');
    const data = await ffmpeg.readFile(outputFileName);
    
    // Clean up files
    console.log('Cleaning up files...');
    await ffmpeg.deleteFile(inputFileName);
    await ffmpeg.deleteFile(outputFileName);

    // Convert to blob
    const blob = new Blob([data], { type: `video/${targetFormat}` });
    console.log('Conversion successful, blob size:', blob.size);
    return blob;

  } catch (error) {
    console.error('Video conversion error:', error);
    
    // Clean up on error
    if (ffmpeg) {
      try {
        await ffmpeg.deleteFile('input' + getFileExtension(file.name));
        await ffmpeg.deleteFile(`output.${targetFormat}`);
      } catch (cleanupError) {
        console.warn('Failed to clean up FFmpeg files:', cleanupError);
      }
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

  // Add format-specific settings - Only for supported formats
  switch (format) {
    case 'mp4':
      command.push('-c:v', 'libx264', '-c:a', 'aac', '-movflags', '+faststart');
      break;
    case 'webm':
      command.push('-c:v', 'libvpx-vp9', '-c:a', 'libopus');
      break;
    case 'avi':
      command.push('-c:v', 'libx264', '-c:a', 'aac');
      break;
    case 'mov':
      command.push('-c:v', 'libx264', '-c:a', 'aac', '-f', 'mov');
      break;
    default:
      // Fallback for any unexpected format
      command.push('-c:v', 'libx264', '-c:a', 'aac');
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
  const needsConv = currentExtension !== targetFormat;
  console.log(`needsConversion: ${file.name} (${currentExtension}) -> ${targetFormat} = ${needsConv}`);
  return needsConv;
};

// Get supported input formats - Limited to reliable formats
export const getSupportedInputFormats = (): string[] => {
  return ['mp4', 'avi', 'mov', 'webm'];
};

// Get supported output formats - Limited to reliable formats
export const getSupportedOutputFormats = (): VideoFormat[] => {
  return ['mp4', 'avi', 'mov', 'webm'];
};
