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

  // Update files and persist
  const updateFiles = useCallback((newFiles: ConversionFile[]) => {
    // Ensure all files have proper previews
    const filesWithPreviews = newFiles.map(file => {
      if (!file.preview) {
        // Create preview from file if not set
        return {
          ...file,
          preview: URL.createObjectURL(file.file)
        };
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
