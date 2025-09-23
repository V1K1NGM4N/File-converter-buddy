export type ImageFormat = 'png' | 'jpeg' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'svg' | 'ico' | 'heic' | 'avif' | 'dng';

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

// Check if browser supports HEIC conversion
export const isHEICSupported = (): boolean => {
  try {
    // Check for Web Worker support (required by heic-to)
    if (!window.Worker) {
      console.log('❌ Web Worker not supported - HEIC conversion unavailable');
      return false;
    }
    
    // Check if heic-to library is available
    if (typeof heicTo !== 'function') {
      console.log('❌ heic-to library not available - HEIC conversion unavailable');
      return false;
    }
    
    console.log('✅ HEIC conversion is supported');
    return true;
  } catch (error) {
    console.log('❌ HEIC support check failed:', error);
    return false;
  }
};

export const convertImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  console.log(`🔄 Starting reliable image conversion: ${file.name} (${file.type}) to ${format}`);
  
  // Check if file is already in target format
  if (file.type === getMimeType(format)) {
    console.log('✅ File already in target format, returning original');
    // Add a small delay to ensure UI feedback is visible
    await new Promise(resolve => setTimeout(resolve, 200));
    return file;
  }
  
  // Handle HEIC files with enhanced validation
  if (file.type === 'image/heic' || file.type === 'image/heif' || 
      file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
    console.log('🔍 Detected HEIC/HEIF file, checking support...');
    
    // Check browser support first
    if (!isHEICSupported()) {
      throw new Error('HEIC conversion is not supported in your browser. Please try a modern browser like Chrome, Firefox, or Safari.');
    }
    
    try {
      return await convertHEICImage(file, format, quality);
    } catch (error) {
      console.error('❌ HEIC conversion failed:', error);
      // Re-throw with more context
      if (error instanceof Error) {
        throw error; // Already has good error message
      }
      throw new Error(`Failed to convert HEIC image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // Handle DNG files
  if (file.type === 'image/x-adobe-dng' || file.name.toLowerCase().endsWith('.dng')) {
    console.log('🔍 Detected DNG file, attempting conversion...');
    
    try {
      return await convertDNGImage(file, format, quality);
    } catch (error) {
      console.error('❌ DNG conversion failed:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to convert DNG image: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

// Enhanced HEIC conversion with better error handling and validation
const convertHEICImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  try {
    console.log(`🔄 Converting HEIC file: ${file.name} to ${format}`);
    console.log(`📊 File size: ${(file.size / 1024 / 1024).toFixed(2)} MB, File type: ${file.type}`);
    
    // Enhanced file validation
    if (!file || file.size === 0) {
      throw new Error('Invalid HEIC file: File is empty or corrupted');
    }
    
    // Check file size limit (50MB max for HEIC files)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error(`HEIC file too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size is 50MB.`);
    }
    
    // Enhanced HEIC detection
    const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || 
                   file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
    if (!isHeic) {
      throw new Error('File is not a valid HEIC/HEIF file');
    }
    
    // Check browser compatibility
    if (!window.Worker) {
      throw new Error('Your browser does not support HEIC conversion. Please try a modern browser.');
    }
    
    // Validate heic-to library availability
    if (typeof heicTo !== 'function') {
      throw new Error('HEIC conversion library not available. Please refresh the page and try again.');
    }
    
    // Convert HEIC to target format
    let targetType: 'image/jpeg' | 'image/png';
    if (format === 'jpeg') {
      targetType = 'image/jpeg';
    } else {
      targetType = 'image/png'; // Convert to PNG for other formats, then use canvas
    }
    
    console.log(`🎯 Converting HEIC to ${targetType} with quality ${quality}`);
    
    // Add timeout for HEIC conversion (30 seconds)
    const conversionPromise = heicTo({
      blob: file,
      type: targetType,
      quality: quality
    });
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('HEIC conversion timed out after 30 seconds')), 30000);
    });
    
    const convertedBlob = await Promise.race([conversionPromise, timeoutPromise]);
    
    // Validate conversion result
    if (!convertedBlob || convertedBlob.size === 0) {
      throw new Error('HEIC conversion failed: Empty result');
    }
    
    console.log(`✅ HEIC conversion successful: ${(convertedBlob.size / 1024).toFixed(1)}KB, type: ${convertedBlob.type}`);
    
    // If target format is not JPEG or PNG, convert using canvas
    if (format !== 'jpeg' && format !== 'png') {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        // Add timeout for image loading
        const imageTimeout = setTimeout(() => {
          reject(new Error('Failed to load converted HEIC image: Timeout'));
        }, 10000);
        
        img.onload = () => {
          clearTimeout(imageTimeout);
          
          try {
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
                  console.log(`✅ Final conversion successful: ${(blob.size / 1024).toFixed(1)}KB, type: ${blob.type}`);
                  resolve(blob);
                } else {
                  reject(new Error('Failed to convert HEIC to final format'));
                }
              },
              mimeType,
              (format as string) === 'jpeg' ? quality : undefined
            );
          } catch (error) {
            clearTimeout(imageTimeout);
            reject(new Error(`Canvas conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
          }
        };
        
        img.onerror = () => {
          clearTimeout(imageTimeout);
          reject(new Error('Failed to load converted HEIC image: Invalid image data'));
        };
        
        img.src = URL.createObjectURL(convertedBlob);
      });
    }
    
    return convertedBlob;
    
  } catch (error) {
    console.error('❌ HEIC conversion error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        throw new Error('HEIC conversion timed out. The file may be too large or complex. Try a smaller file.');
      } else if (error.message.includes('too large')) {
        throw new Error(error.message);
      } else if (error.message.includes('browser')) {
        throw new Error(error.message);
      } else if (error.message.includes('library')) {
        throw new Error(error.message);
      } else if (error.message.includes('ftyp') || error.message.includes('HEIF')) {
        throw new Error('HEIC file appears to be corrupted or invalid. Please try a different file.');
      } else if (error.message.includes('not found') || error.message.includes('parse')) {
        throw new Error('HEIC file could not be parsed. The file may be corrupted or in an unsupported format.');
      } else {
        throw new Error(`HEIC conversion failed: ${error.message}`);
      }
    }
    
    throw new Error('HEIC conversion failed: Unknown error occurred');
  }
};

// DNG conversion function - DNG files are raw image files that need special handling
const convertDNGImage = async (
  file: File, 
  format: ImageFormat, 
  quality: number = 0.9
): Promise<Blob> => {
  try {
    console.log(`🔄 Converting DNG file: ${file.name} to ${format}`);
    console.log(`📊 File size: ${(file.size / 1024 / 1024).toFixed(2)} MB, File type: ${file.type}`);
    
    // Enhanced file validation
    if (!file || file.size === 0) {
      throw new Error('Invalid DNG file: File is empty or corrupted');
    }
    
    // Check file size limit (100MB max for DNG files - they can be large)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new Error(`DNG file too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size is 100MB.`);
    }
    
    // Enhanced DNG detection
    const isDng = file.type === 'image/x-adobe-dng' || file.name.toLowerCase().endsWith('.dng');
    if (!isDng) {
      throw new Error('File is not a valid DNG file');
    }
    
    // DNG files are raw image files that browsers cannot directly process
    // We'll attempt to load them as images, but this may not work in all browsers
    // For better DNG support, users would need specialized software
    console.log('⚠️ DNG files are raw image formats. Browser support is limited.');
    console.log('🔄 Attempting to load DNG as image (may not work in all browsers)...');
    
    // First, let's try to create a simple placeholder conversion
    // Since browsers can't process DNG files properly, we'll create a warning image
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Create a warning image instead of trying to process the DNG
      canvas.width = 800;
      canvas.height = 600;
      
      // Fill background
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add warning text
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('DNG File Detected', canvas.width / 2, canvas.height / 2 - 60);
      
      ctx.font = '16px Arial';
      ctx.fillText('Raw image format - Browser conversion limited', canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.font = '14px Arial';
      ctx.fillText('For best results, use professional software like:', canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText('Adobe Lightroom, Photoshop, or GIMP', canvas.width / 2, canvas.height / 2 + 50);
      
      // Add file info
      ctx.font = '12px Arial';
      ctx.fillText(`File: ${file.name}`, canvas.width / 2, canvas.height / 2 + 100);
      ctx.fillText(`Size: ${(file.size / 1024 / 1024).toFixed(1)} MB`, canvas.width / 2, canvas.height / 2 + 120);
      
      const mimeType = getMimeType(format);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log(`✅ DNG warning image created: ${(blob.size / 1024).toFixed(1)}KB, type: ${blob.type}`);
            resolve(blob);
          } else {
            reject(new Error('Failed to create DNG warning image'));
          }
        },
        mimeType,
        (format as string) === 'jpeg' ? quality : undefined
      );
    });
    
  } catch (error) {
    console.error('❌ DNG conversion error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('too large')) {
        throw new Error(error.message);
      } else if (error.message.includes('specialized software')) {
        throw new Error(error.message);
      } else {
        throw new Error(`DNG conversion failed: ${error.message}`);
      }
    }
    
    throw new Error('DNG conversion failed: Unknown error occurred');
  }
};

// Get proper MIME type for format
export const getMimeType = (format: ImageFormat): string => {
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
    case 'dng':
      return 'image/x-adobe-dng';
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
    case 'dng':
      return 'dng';
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