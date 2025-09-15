import { useState, useEffect, useCallback } from 'react';

interface ConversionFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  converted?: Blob;
}

interface PersistedFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileData: string; // base64 encoded
  previewData: string; // base64 encoded preview
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  convertedData?: string; // base64 encoded blob
}

export const useFilePersistence = (storageKey: string) => {
  const [files, setFiles] = useState<ConversionFile[]>([]);

  // Load files from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const persistedFiles: PersistedFile[] = JSON.parse(saved);
        const restoredFiles: ConversionFile[] = persistedFiles.map(persisted => {
          // Convert base64 back to File
          const byteCharacters = atob(persisted.fileData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const file = new File([byteArray], persisted.fileName, { type: persisted.fileType });

          // Convert base64 back to Blob if exists
          let converted: Blob | undefined;
          if (persisted.convertedData) {
            const convertedByteCharacters = atob(persisted.convertedData);
            const convertedByteNumbers = new Array(convertedByteCharacters.length);
            for (let i = 0; i < convertedByteCharacters.length; i++) {
              convertedByteNumbers[i] = convertedByteCharacters.charCodeAt(i);
            }
            const convertedByteArray = new Uint8Array(convertedByteNumbers);
            converted = new Blob([convertedByteArray], { type: 'application/octet-stream' });
          }

          return {
            id: persisted.id,
            file,
            preview: `data:${persisted.fileType};base64,${persisted.previewData}`,
            progress: persisted.progress,
            status: persisted.status,
            converted
          };
        });
        setFiles(restoredFiles);
      }
    } catch (error) {
      console.error('Error loading persisted files:', error);
    }
  }, [storageKey]);

  // Save files to localStorage whenever files change
  const saveFiles = useCallback((newFiles: ConversionFile[]) => {
    try {
      const persistedFiles: Promise<PersistedFile>[] = newFiles.map(file => {
        return new Promise<PersistedFile>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const fileData = (reader.result as string).split(',')[1]; // Remove data:type;base64, prefix
            
            // Extract preview data from the preview URL
            let previewData = '';
            if (file.preview.startsWith('data:')) {
              previewData = file.preview.split(',')[1];
            } else if (file.preview.startsWith('blob:')) {
              // For blob URLs, we'll use the file data as preview
              previewData = fileData;
            } else {
              // Fallback to file data
              previewData = fileData;
            }
            
            if (file.converted) {
              const convertedReader = new FileReader();
              convertedReader.onload = () => {
                const convertedData = (convertedReader.result as string).split(',')[1];
                resolve({
                  id: file.id,
                  fileName: file.file.name,
                  fileSize: file.file.size,
                  fileType: file.file.type,
                  fileData,
                  previewData,
                  progress: file.progress,
                  status: file.status,
                  convertedData
                });
              };
              convertedReader.readAsDataURL(file.converted);
            } else {
              resolve({
                id: file.id,
                fileName: file.file.name,
                fileSize: file.file.size,
                fileType: file.file.type,
                fileData,
                previewData,
                progress: file.progress,
                status: file.status
              });
            }
          };
          reader.readAsDataURL(file.file);
        });
      });

      Promise.all(persistedFiles).then(completed => {
        localStorage.setItem(storageKey, JSON.stringify(completed));
      }).catch(error => {
        console.error('Error saving files:', error);
      });
    } catch (error) {
      console.error('Error saving files:', error);
    }
  }, [storageKey]);

  // Enhanced HEIC preview generation with better error handling
  const createHEICPreview = async (file: File): Promise<string> => {
    console.log('🔍 Creating HEIC preview for:', file.name, 'Type:', file.type);
    try {
      // Check file size limit for preview (20MB max)
      const maxPreviewSize = 20 * 1024 * 1024; // 20MB
      if (file.size > maxPreviewSize) {
        console.log('⚠️ HEIC file too large for preview, using placeholder');
        return URL.createObjectURL(file); // Fallback to original
      }
      
      // Import heic-to dynamically to avoid issues
      const { heicTo } = await import('heic-to');
      console.log('✅ heic-to imported successfully');
      
      // Enhanced HEIC detection
      const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || 
                     file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      console.log('🔍 isHeic check result:', isHeic);
      
      if (!isHeic) {
        console.log('❌ File is not HEIC, using original file');
        return URL.createObjectURL(file);
      }
      
      // Check browser compatibility
      if (!window.Worker) {
        console.log('⚠️ Browser does not support HEIC conversion, using original file');
        return URL.createObjectURL(file);
      }
      
      console.log('🔄 Converting HEIC to JPEG for preview...');
      
      // Add timeout for preview conversion (15 seconds)
      const previewPromise = heicTo({
        blob: file,
        type: 'image/jpeg',
        quality: 0.7 // Lower quality for faster preview
      });
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('HEIC preview conversion timed out')), 15000);
      });
      
      const previewBlob = await Promise.race([previewPromise, timeoutPromise]);
      
      // Validate preview result
      if (!previewBlob || previewBlob.size === 0) {
        throw new Error('HEIC preview conversion failed: Empty result');
      }
      
      console.log('✅ HEIC preview conversion successful, blob size:', (previewBlob.size / 1024).toFixed(1) + 'KB');
      return URL.createObjectURL(previewBlob);
    } catch (error) {
      console.error('❌ Failed to create HEIC preview:', error);
      
      // Provide specific error handling
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          console.log('⚠️ HEIC preview timed out, using original file');
        } else if (error.message.includes('too large')) {
          console.log('⚠️ HEIC file too large for preview, using original file');
        } else {
          console.log('⚠️ HEIC preview failed:', error.message, 'using original file');
        }
      }
      
      // Fallback to original file
      return URL.createObjectURL(file);
    }
  };

  // Update files and persist
  const updateFiles = useCallback((newFiles: ConversionFile[]) => {
    console.log('🔄 updateFiles called with', newFiles.length, 'files');
    // Ensure all files have proper previews
    const filesWithPreviews = newFiles.map(file => {
      console.log('📁 Processing file:', file.file.name, 'Type:', file.file.type, 'Has preview:', !!file.preview);
      
      if (!file.preview) {
        // Check if it's a HEIC file
        const isHeicFile = file.file.type === 'image/heic' || file.file.type === 'image/heif' || 
            file.file.name.toLowerCase().endsWith('.heic') || file.file.name.toLowerCase().endsWith('.heif');
        
        console.log('🔍 HEIC detection for', file.file.name, ':', isHeicFile);
        
        if (isHeicFile) {
          console.log('🖼️ HEIC file detected, creating async preview...');
          // For HEIC files, we'll create the preview asynchronously
          // Set a temporary preview first, then update it
          const tempPreview = URL.createObjectURL(file.file);
          createHEICPreview(file.file).then(heicPreview => {
            console.log('✅ HEIC preview ready, updating file:', file.file.name);
            // Update the file with the proper HEIC preview
            setFiles(currentFiles => 
              currentFiles.map(f => 
                f.id === file.id ? { ...f, preview: heicPreview } : f
              )
            );
            // Clean up temp preview
            URL.revokeObjectURL(tempPreview);
          }).catch(error => {
            console.error('❌ Failed to create HEIC preview:', error);
            // Keep the temp preview if HEIC conversion fails
          });
          
          return {
            ...file,
            preview: tempPreview
          };
        } else {
          // Create normal preview
          console.log('📷 Creating normal preview for:', file.file.name);
          return {
            ...file,
            preview: URL.createObjectURL(file.file)
          };
        }
      }
      return file;
    });
    
    setFiles(filesWithPreviews);
    saveFiles(filesWithPreviews);
  }, [saveFiles]);

  // Clear all files
  const clearFiles = useCallback(() => {
    setFiles([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    files,
    updateFiles,
    clearFiles
  };
};
