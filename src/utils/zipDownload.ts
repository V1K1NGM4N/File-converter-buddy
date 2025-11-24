import JSZip from 'jszip';

/**
 * Downloads multiple files as a ZIP archive with organized folder structure
 */
export const downloadMultipleFilesAsZip = async (
  files: Array<{ name: string; blob: Blob; folder?: string }>,
  zipFilename: string = 'download.zip',
  createFolderStructure: boolean = true
): Promise<void> => {
  if (!files || files.length === 0) {
    throw new Error('No files to download');
  }

  try {
    const zip = new JSZip();

    // Create timestamped folder name (simplified format)
    const now = new Date();
    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const time = now.toTimeString().slice(0, 5); // HH:MM
    const baseFolderName = `FileConverterBuddyDownload - ${date} ${time}`;
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6 // Balanced compression
      },
      mimeType: 'application/zip' // Explicit MIME type for Mac compatibility
    });

    // Mac-compatible download approach
    await downloadBlobAsFile(zipBlob, zipFilename, 'application/zip');
  } catch (error) {
    throw new Error(`Failed to create ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Sanitizes filename for Mac compatibility
 */
const sanitizeFilenameForMac = (filename: string): string => {
  return filename
    .replace(/[<>:"/\\|?*]/g, '_') // Replace invalid characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 255); // Mac filename length limit
};

/**
 * Downloads a blob as a file with Mac compatibility
 */
const downloadBlobAsFile = async (blob: Blob, filename: string, mimeType: string): Promise<void> => {
  // Detect if we're on Mac/Safari
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isMac && isSafari) {
    // Safari on Mac requires a different approach
    try {
      // Try the modern approach first
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
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Downloads multiple files individually (fallback method) with Mac compatibility
 */
export const downloadMultipleFiles = async (
  files: Array<{ name: string; blob: Blob }>
): Promise<void> => {
  if (!files || files.length === 0) {
    throw new Error('No files to download');
  }

  for (const { name, blob } of files) {
    try {
      const sanitizedName = sanitizeFilenameForMac(name);
      await downloadBlobAsFile(blob, sanitizedName, blob.type);

      // Small delay between downloads to prevent browser blocking
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.warn(`Failed to download ${name}:`, error);
    }
  }
};