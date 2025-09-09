export type ImageFormat = 'png' | 'jpeg' | 'webp';

// Reliable image converter - only supports formats that work consistently





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

// Reliable image conversion - only supports formats that work consistently

// Get proper MIME type for format (only reliable formats)
const getMimeType = (format: ImageFormat): string => {
  switch (format) {
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
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