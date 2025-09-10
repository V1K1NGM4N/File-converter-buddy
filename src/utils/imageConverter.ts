export type ImageFormat = 'png' | 'jpeg' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'svg' | 'ico' | 'heic' | 'avif';

// Import heic-to for better HEIC support
import { heicTo } from 'heic-to';





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
  console.log(`Starting reliable image conversion: ${file.name} (${file.type}) to ${format}`);
  
  // Check if file is already in target format
  if (file.type === getMimeType(format)) {
    console.log('File already in target format, returning original');
    return file;
  }
  
  // Handle HEIC files with heic-to library
  if (file.type === 'image/heic' || file.type === 'image/heif' || 
      file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
    console.log('Detected HEIC/HEIF file, using heic-to converter');
    try {
      return await convertHEICImage(file, format, quality);
    } catch (error) {
      console.error('HEIC conversion failed:', error);
      throw new Error(`Failed to convert HEIC image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // Standard image conversion using canvas (reliable approach)
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
            console.log(`Conversion successful: ${blob.size} bytes, type: ${blob.type}`);
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        mimeType,
        format === 'jpeg' ? quality : undefined
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image - browser may not support this format'));
    img.src = URL.createObjectURL(file);
  });
};

// Convert HEIC files using heic-to library (more reliable than heic2any)
const convertHEICImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  try {
    console.log(`Converting HEIC file: ${file.name} to ${format}`);
    console.log(`File size: ${file.size} bytes, File type: ${file.type}`);
    
    // Validate file
    if (!file || file.size === 0) {
      throw new Error('Invalid HEIC file');
    }
    
    // Check if file is actually HEIC by extension and type
    const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || 
                   file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
    if (!isHeic) {
      throw new Error('File is not a valid HEIC/HEIF file');
    }
    
    // Convert HEIC to target format
    let targetType: 'image/jpeg' | 'image/png';
    if (format === 'jpeg') {
      targetType = 'image/jpeg';
    } else {
      targetType = 'image/png'; // Convert to PNG for other formats, then use canvas
    }
    
    console.log(`Converting HEIC to ${targetType} with quality ${quality}`);
    
    const convertedBlob = await heicTo({
      blob: file,
      type: targetType,
      quality: quality
    });
    
    console.log(`HEIC conversion successful: ${convertedBlob.size} bytes, type: ${convertedBlob.type}`);
    
    // If target format is not JPEG or PNG, convert using canvas
    if (format !== 'jpeg' && format !== 'png') {
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
                console.log(`Final conversion successful: ${blob.size} bytes, type: ${blob.type}`);
                resolve(blob);
              } else {
                reject(new Error('Failed to convert HEIC to final format'));
              }
            },
            mimeType,
            (format as string) === 'jpeg' ? quality : undefined
          );
        };
        
        img.onerror = () => reject(new Error('Failed to load converted HEIC image'));
        img.src = URL.createObjectURL(convertedBlob);
      });
    }
    
    return convertedBlob;
    
  } catch (error) {
    console.error('HEIC conversion error:', error);
    throw new Error(`Failed to convert HEIC image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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
    case 'gif':
      return 'image/gif';
    case 'bmp':
      return 'image/bmp';
    case 'tiff':
      return 'image/tiff';
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
    case 'gif':
      return 'gif';
    case 'bmp':
      return 'bmp';
    case 'tiff':
      return 'tiff';
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