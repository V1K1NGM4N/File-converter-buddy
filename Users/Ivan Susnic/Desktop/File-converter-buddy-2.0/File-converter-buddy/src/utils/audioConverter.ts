export type AudioFormat = 'mp3' | 'wav' | 'aac' | 'ogg' | 'flac' | 'm4a' | 'wma';

export interface AudioConversionOptions {
  quality?: 'low' | 'medium' | 'high';
  bitrate?: number;
  sampleRate?: number;
}

// Convert audio file using Web Audio API
export const convertAudio = async (
  file: File,
  targetFormat: AudioFormat,
  options: AudioConversionOptions = {}
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Convert to target format
        const convertedBlob = await convertAudioBufferToFormat(
          audioBuffer,
          targetFormat,
          options
        );
        
        resolve(convertedBlob);
      } catch (error) {
        reject(new Error(`Audio conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    fileReader.onerror = () => {
      reject(new Error('Failed to read audio file'));
    };

    fileReader.readAsArrayBuffer(file);
  });
};

// Convert AudioBuffer to specific format
const convertAudioBufferToFormat = async (
  audioBuffer: AudioBuffer,
  format: AudioFormat,
  options: AudioConversionOptions
): Promise<Blob> => {
  const { quality = 'medium', bitrate, sampleRate } = options;
  
  // Get audio data
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  const sampleRateToUse = sampleRate || audioBuffer.sampleRate;
  
  // Create new audio buffer with target sample rate if needed
  let processedBuffer = audioBuffer;
  if (sampleRate && sampleRate !== audioBuffer.sampleRate) {
    processedBuffer = await resampleAudioBuffer(audioBuffer, sampleRate);
  }
  
  // Convert to WAV first (as base format)
  const wavBlob = await audioBufferToWav(processedBuffer);
  
  // If target is WAV, return directly
  if (format === 'wav') {
    return wavBlob;
  }
  
  // For other formats, we'll use a simplified approach
  // In a real implementation, you'd use libraries like lamejs for MP3
  return convertWavToFormat(wavBlob, format, quality, bitrate);
};

// Resample audio buffer
const resampleAudioBuffer = async (
  audioBuffer: AudioBuffer,
  targetSampleRate: number
): Promise<AudioBuffer> => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    Math.round(audioBuffer.length * targetSampleRate / audioBuffer.sampleRate),
    targetSampleRate
  );
  
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start();
  
  return await offlineContext.startRendering();
};

// Convert AudioBuffer to WAV
const audioBufferToWav = async (audioBuffer: AudioBuffer): Promise<Blob> => {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  const sampleRate = audioBuffer.sampleRate;
  const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
  const view = new DataView(arrayBuffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * numberOfChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * numberOfChannels * 2, true);
  
  // Convert audio data
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }
  
  return new Blob([arrayBuffer], { type: 'audio/wav' });
};

// Convert WAV to other formats (simplified implementation)
const convertWavToFormat = async (
  wavBlob: Blob,
  format: AudioFormat,
  quality: string,
  bitrate?: number
): Promise<Blob> => {
  // For now, we'll return the WAV blob with the correct MIME type
  // In a real implementation, you'd use format-specific libraries
  
  const mimeTypes: Record<AudioFormat, string> = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    aac: 'audio/aac',
    ogg: 'audio/ogg',
    flac: 'audio/flac',
    m4a: 'audio/mp4',
    wma: 'audio/x-ms-wma'
  };
  
  // Create a new blob with the target MIME type
  // Note: This is a simplified approach. Real conversion would require
  // format-specific encoding libraries
  return new Blob([wavBlob], { type: mimeTypes[format] });
};

// Check if format conversion is needed
export const needsConversion = (file: File, targetFormat: AudioFormat): boolean => {
  const currentExtension = getFileExtension(file.name).toLowerCase();
  return currentExtension !== targetFormat;
};

// Get file extension from filename
const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Get supported input formats
export const getSupportedInputFormats = (): string[] => {
  return ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'm4p', 'wav', 'aiff'];
};

// Get supported output formats
export const getSupportedOutputFormats = (): AudioFormat[] => {
  return ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma'];
};

// Get quality settings for different formats
export const getQualitySettings = (format: AudioFormat): { bitrate: number; sampleRate: number } => {
  const settings: Record<AudioFormat, { bitrate: number; sampleRate: number }> = {
    mp3: { bitrate: 128, sampleRate: 44100 },
    wav: { bitrate: 1411, sampleRate: 44100 },
    aac: { bitrate: 128, sampleRate: 44100 },
    ogg: { bitrate: 128, sampleRate: 44100 },
    flac: { bitrate: 1411, sampleRate: 44100 },
    m4a: { bitrate: 128, sampleRate: 44100 },
    wma: { bitrate: 128, sampleRate: 44100 }
  };
  
  return settings[format];
};
