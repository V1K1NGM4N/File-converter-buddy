export type FileCategory = 'image' | 'video' | 'audio' | 'archive' | 'spreadsheet' | 'text' | 'document' | 'unknown';

export interface FileTypeInfo {
  category: FileCategory;
  mimeType: string;
  extensions: string[];
  compatibleFormats: string[];
  description: string;
}

// File type definitions with compatible conversion formats
export const FILE_TYPES: Record<string, FileTypeInfo> = {
  // Image formats - only reliable formats that work consistently
  'image/jpeg': {
    category: 'image',
    mimeType: 'image/jpeg',
    extensions: ['jpg', 'jpeg'],
    compatibleFormats: ['png', 'webp'],
    description: 'JPEG image file'
  },
  'image/png': {
    category: 'image',
    mimeType: 'image/png',
    extensions: ['png'],
    compatibleFormats: ['jpeg', 'webp'],
    description: 'PNG image file'
  },
  'image/webp': {
    category: 'image',
    mimeType: 'image/webp',
    extensions: ['webp'],
    compatibleFormats: ['jpeg', 'png'],
    description: 'WebP image file'
  },
  'image/gif': {
    category: 'image',
    mimeType: 'image/gif',
    extensions: ['gif'],
    compatibleFormats: ['jpeg', 'png', 'webp'],
    description: 'GIF image file'
  },
  'image/bmp': {
    category: 'image',
    mimeType: 'image/bmp',
    extensions: ['bmp'],
    compatibleFormats: ['jpeg', 'png', 'webp'],
    description: 'BMP image file'
  },
  'image/svg+xml': {
    category: 'image',
    mimeType: 'image/svg+xml',
    extensions: ['svg'],
    compatibleFormats: ['jpeg', 'png', 'webp'],
    description: 'SVG vector image file'
  },

  // Video formats - Can be converted to other video formats or audio formats (for audio extraction)
  'video/mp4': {
    category: 'video',
    mimeType: 'video/mp4',
    extensions: ['mp4'],
    compatibleFormats: ['webm', 'avi', 'mov', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'MP4 video file'
  },
  'video/avi': {
    category: 'video',
    mimeType: 'video/avi',
    extensions: ['avi'],
    compatibleFormats: ['mp4', 'webm', 'mov', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'AVI video file'
  },
  'video/quicktime': {
    category: 'video',
    mimeType: 'video/quicktime',
    extensions: ['mov'],
    compatibleFormats: ['mp4', 'webm', 'avi', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'QuickTime video file'
  },
  'video/x-ms-wmv': {
    category: 'video',
    mimeType: 'video/x-ms-wmv',
    extensions: ['wmv'],
    compatibleFormats: ['mp4', 'avi', 'mov', 'flv', 'webm', 'mkv', '3gp', 'ogv', 'm4v', 'ts', 'vob', 'asf', 'rm', 'rmvb', 'swf', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'Windows Media Video file'
  },
  'video/x-flv': {
    category: 'video',
    mimeType: 'video/x-flv',
    extensions: ['flv'],
    compatibleFormats: ['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv', '3gp', 'ogv', 'm4v', 'ts', 'vob', 'asf', 'rm', 'rmvb', 'swf', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'Flash Video file'
  },
  'video/webm': {
    category: 'video',
    mimeType: 'video/webm',
    extensions: ['webm'],
    compatibleFormats: ['mp4', 'avi', 'mov', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'WebM video file'
  },
  'video/x-matroska': {
    category: 'video',
    mimeType: 'video/x-matroska',
    extensions: ['mkv'],
    compatibleFormats: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', '3gp', 'ogv', 'm4v', 'ts', 'vob', 'asf', 'rm', 'rmvb', 'swf', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'Matroska video file'
  },

  // Audio formats
  'audio/mpeg': {
    category: 'audio',
    mimeType: 'audio/mpeg',
    extensions: ['mp3'],
    compatibleFormats: ['wav', 'aac', 'ogg', 'flac', 'wma', 'm4a', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'MP3 audio file'
  },
  'audio/wav': {
    category: 'audio',
    mimeType: 'audio/wav',
    extensions: ['wav'],
    compatibleFormats: ['mp3', 'aac', 'ogg', 'flac', 'wma', 'm4a', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'WAV audio file'
  },
  'audio/aac': {
    category: 'audio',
    mimeType: 'audio/aac',
    extensions: ['aac'],
    compatibleFormats: ['mp3', 'wav', 'ogg', 'flac', 'wma', 'm4a', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'AAC audio file'
  },
  'audio/ogg': {
    category: 'audio',
    mimeType: 'audio/ogg',
    extensions: ['ogg'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'flac', 'wma', 'm4a', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'OGG audio file'
  },
  'audio/flac': {
    category: 'audio',
    mimeType: 'audio/flac',
    extensions: ['flac'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'ogg', 'wma', 'm4a', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'FLAC audio file'
  },
  'audio/mp4': {
    category: 'audio',
    mimeType: 'audio/mp4',
    extensions: ['m4a', 'm4p'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'MP4 audio file (M4A)'
  },
  'audio/x-ms-wma': {
    category: 'audio',
    mimeType: 'audio/x-ms-wma',
    extensions: ['wma'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'opus', 'aiff', 'alac', 'ac3'],
    description: 'Windows Media Audio file'
  },
  'audio/opus': {
    category: 'audio',
    mimeType: 'audio/opus',
    extensions: ['opus'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a', 'aiff', 'alac', 'ac3'],
    description: 'Opus audio file'
  },
  'audio/aiff': {
    category: 'audio',
    mimeType: 'audio/aiff',
    extensions: ['aiff', 'aif'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a', 'opus', 'alac', 'ac3'],
    description: 'AIFF audio file'
  },
  'audio/alac': {
    category: 'audio',
    mimeType: 'audio/alac',
    extensions: ['alac'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a', 'opus', 'aiff', 'ac3'],
    description: 'Apple Lossless audio file'
  },
  'audio/ac3': {
    category: 'audio',
    mimeType: 'audio/ac3',
    extensions: ['ac3'],
    compatibleFormats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a', 'opus', 'aiff', 'alac'],
    description: 'Dolby Digital AC-3 audio file'
  },

  // Archive formats
  'application/zip': {
    category: 'archive',
    mimeType: 'application/zip',
    extensions: ['zip'],
    compatibleFormats: ['rar', '7z', 'tar', 'gz', 'bz2', 'xz'],
    description: 'ZIP archive file'
  },
  'application/x-rar-compressed': {
    category: 'archive',
    mimeType: 'application/x-rar-compressed',
    extensions: ['rar'],
    compatibleFormats: ['zip', '7z', 'tar', 'gz', 'bz2', 'xz'],
    description: 'RAR archive file'
  },
  'application/x-7z-compressed': {
    category: 'archive',
    mimeType: 'application/x-7z-compressed',
    extensions: ['7z'],
    compatibleFormats: ['zip', 'rar', 'tar', 'gz', 'bz2', 'xz'],
    description: '7-Zip archive file'
  },
  'application/x-tar': {
    category: 'archive',
    mimeType: 'application/x-tar',
    extensions: ['tar'],
    compatibleFormats: ['zip', 'rar', '7z', 'gz', 'bz2', 'xz'],
    description: 'TAR archive file'
  },
  'application/gzip': {
    category: 'archive',
    mimeType: 'application/gzip',
    extensions: ['gz'],
    compatibleFormats: ['zip', 'rar', '7z', 'tar', 'bz2', 'xz'],
    description: 'Gzip compressed file'
  },

  // Spreadsheet formats
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    category: 'spreadsheet',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    extensions: ['xlsx'],
    compatibleFormats: ['xls', 'csv', 'ods', 'tsv', 'json', 'xml'],
    description: 'Excel spreadsheet (XLSX)'
  },
  'application/vnd.ms-excel': {
    category: 'spreadsheet',
    mimeType: 'application/vnd.ms-excel',
    extensions: ['xls'],
    compatibleFormats: ['xlsx', 'csv', 'ods', 'tsv', 'json', 'xml'],
    description: 'Excel spreadsheet (XLS)'
  },
  'text/csv': {
    category: 'spreadsheet',
    mimeType: 'text/csv',
    extensions: ['csv'],
    compatibleFormats: ['xlsx', 'xls', 'ods', 'tsv', 'json', 'xml'],
    description: 'Comma-separated values file'
  },
  'application/vnd.oasis.opendocument.spreadsheet': {
    category: 'spreadsheet',
    mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
    extensions: ['ods'],
    compatibleFormats: ['xlsx', 'xls', 'csv', 'tsv', 'json', 'xml'],
    description: 'OpenDocument spreadsheet'
  },

  // Text formats
  'text/plain': {
    category: 'text',
    mimeType: 'text/plain',
    extensions: ['txt'],
    compatibleFormats: ['md', 'html', 'css', 'js', 'json', 'xml', 'csv', 'tsv', 'log'],
    description: 'Plain text file'
  },
  'text/markdown': {
    category: 'text',
    mimeType: 'text/markdown',
    extensions: ['md', 'markdown'],
    compatibleFormats: ['txt', 'html', 'css', 'js', 'json', 'xml', 'csv', 'tsv', 'log'],
    description: 'Markdown file'
  },
  'text/html': {
    category: 'text',
    mimeType: 'text/html',
    extensions: ['html', 'htm'],
    compatibleFormats: ['txt', 'md', 'css', 'js', 'json', 'xml', 'csv', 'tsv', 'log'],
    description: 'HTML file'
  },
  'text/css': {
    category: 'text',
    mimeType: 'text/css',
    extensions: ['css'],
    compatibleFormats: ['txt', 'md', 'html', 'js', 'json', 'xml', 'csv', 'tsv', 'log'],
    description: 'CSS stylesheet file'
  },
  'application/javascript': {
    category: 'text',
    mimeType: 'application/javascript',
    extensions: ['js'],
    compatibleFormats: ['txt', 'md', 'html', 'css', 'json', 'xml', 'csv', 'tsv', 'log'],
    description: 'JavaScript file'
  },
  'application/json': {
    category: 'text',
    mimeType: 'application/json',
    extensions: ['json'],
    compatibleFormats: ['txt', 'md', 'html', 'css', 'js', 'xml', 'csv', 'tsv', 'log'],
    description: 'JSON data file'
  },
  'application/xml': {
    category: 'text',
    mimeType: 'application/xml',
    extensions: ['xml'],
    compatibleFormats: ['txt', 'md', 'html', 'css', 'js', 'json', 'csv', 'tsv', 'log'],
    description: 'XML markup file'
  },

  // Document formats
  'application/pdf': {
    category: 'document',
    mimeType: 'application/pdf',
    extensions: ['pdf'],
    compatibleFormats: ['png', 'jpeg', 'webp', 'tiff', 'txt', 'md', 'html', 'docx'],
    description: 'Portable Document Format file'
  }
};

/**
 * Detect the file type and category from a File object
 */
export const detectFileType = (file: File): FileTypeInfo | null => {
  // First try to detect by MIME type
  if (file.type && file.type !== 'application/octet-stream') {
    const fileType = FILE_TYPES[file.type];
    if (fileType) {
      return fileType;
    }
  }

  // Fallback to extension detection
  const extension = getFileExtension(file.name).toLowerCase();
  for (const fileType of Object.values(FILE_TYPES)) {
    if (fileType.extensions.includes(extension)) {
      return fileType;
    }
  }

  // If still no match, try to infer from file name patterns
  const fileName = file.name.toLowerCase();
  if (fileName.includes('.') && !fileName.endsWith('.')) {
    // Try to extract extension from filename
    const parts = fileName.split('.');
    const lastPart = parts[parts.length - 1];
    
    for (const fileType of Object.values(FILE_TYPES)) {
      if (fileType.extensions.includes(lastPart)) {
        return fileType;
      }
    }
  }

  return null;
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return '';
  }
  return filename.substring(lastDotIndex + 1);
};

/**
 * Get compatible conversion formats for a file type
 */
export const getCompatibleFormats = (fileType: FileTypeInfo): string[] => {
  return fileType.compatibleFormats;
};

/**
 * Check if a file can be converted to a specific format
 */
export const canConvertTo = (fileType: FileTypeInfo, targetFormat: string): boolean => {
  return fileType.compatibleFormats.includes(targetFormat);
};

/**
 * Get file category from file type
 */
export const getFileCategory = (fileType: FileTypeInfo): FileCategory => {
  return fileType.category;
};

/**
 * Get human-readable description of file type
 */
export const getFileDescription = (fileType: FileTypeInfo): string => {
  return fileType.description;
};
