export type ImageFormat = 'png' | 'jpeg' | 'webp' | 'tiff' | 'gif' | 'bmp' | 'svg' | 'ico' | 'heic' | 'avif';

// Import heic2any for HEIC support
import heic2any from 'heic2any';





export interface ConversionFile {
  id: string;
  file: File;
  preview: string;
  converted?: Blob;
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
}

export const convertImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  // Handle HEIC files specially
  if (file.type === 'image/heic' || file.type === 'image/heif' || 
      file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
    return convertHEICImage(file, format, quality);
  }
  
  // Handle AVIF files (limited browser support)
  if (file.type === 'image/avif' || file.name.toLowerCase().endsWith('.avif')) {
    return convertAVIFImage(file, format, quality);
  }
  
  // Handle SVG files specially
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    return convertSVGImage(file, format, quality);
  }
  
  // Standard image conversion for other formats
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      const mimeType = getMimeType(format);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        mimeType,
        format === 'jpeg' ? quality : undefined
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

// Convert HEIC files using heic2any library
const convertHEICImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  try {
    const result = await heic2any({
      blob: file,
      toType: getMimeType(format) as 'image/png' | 'image/jpeg' | 'image/gif',
      quality: format === 'jpeg' ? quality : 0.92,
      multiple: false
    });
    
    // heic2any returns a single blob or array of blobs
    const blob = Array.isArray(result) ? result[0] : result;
    return blob;
  } catch (error) {
    throw new Error(`Failed to convert HEIC image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Convert AVIF files (fallback for browsers with limited AVIF support)
const convertAVIFImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      const mimeType = getMimeType(format);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert AVIF image'));
          }
        },
        mimeType,
        format === 'jpeg' ? quality : undefined
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load AVIF image - browser may not support AVIF format'));
    img.src = URL.createObjectURL(file);
  });
};

// Convert SVG files
const convertSVGImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      const mimeType = getMimeType(format);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert SVG image'));
          }
        },
        mimeType,
        format === 'jpeg' ? quality : undefined
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load SVG image'));
    img.src = URL.createObjectURL(file);
  });
};

// Get proper MIME type for format
const getMimeType = (format: ImageFormat): string => {
  switch (format) {
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'tiff':
      return 'image/tiff';
    case 'gif':
      return 'image/gif';
    case 'bmp':
      return 'image/bmp';
    case 'svg':
      return 'image/svg+xml';
    case 'ico':
      return 'image/x-icon';
    case 'heic':
      return 'image/heic';
    case 'avif':
      return 'image/avif';
    default:
      return 'image/png';
  }
};

export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

export const downloadBlob = (blob: Blob, filename: string) => {
  // Detect if we're on Mac/Safari for compatibility
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  if (isMac && isSafari) {
    // Safari on Mac requires a different approach
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      // Add to DOM temporarily
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      // Fallback: try opening in new window
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  } else {
    // Standard approach for other browsers
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

export const getFileExtension = (format: ImageFormat): string => {
  switch (format) {
    case 'jpeg':
      return 'jpg';
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    case 'tiff':
      return 'tiff';
    case 'gif':
      return 'gif';
    case 'bmp':
      return 'bmp';
    case 'svg':
      return 'svg';
    case 'ico':
      return 'ico';
    case 'heic':
      return 'heic';
    case 'avif':
      return 'avif';
    default:
      return format;
  }
};

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

export const getFilenameWithoutExtension = (filename: string): string => {
  // Handle files without extension
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return filename;
  }
  
  // Handle files with multiple dots (e.g., "my.file.name.jpg")
  // Only remove the last extension
  return filename.substring(0, lastDotIndex);
};

export const generateConvertedFilename = (originalFilename: string, newExtension: string): string => {
  const nameWithoutExt = getFilenameWithoutExtension(originalFilename);
  return `${nameWithoutExt}.${newExtension}`;
};