export type ImageFormat = 'png' | 'jpeg' | 'webp' | 'tiff' | 'gif' | 'bmp' | 'svg' | 'ico' | 'heic' | 'avif';





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
      
      const mimeType = format === 'jpeg' ? 'image/jpeg' : `image/${format}`;
      
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

export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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