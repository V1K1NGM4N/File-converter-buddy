export interface ConversionStats {
  totalFilesConverted: number;
  totalDownloads: number;
  lastConversionDate: string;
  conversionsByType: {
    images: number;
    videos: number;
    audio: number;
    productFeeds: number;
  };
}

const STORAGE_KEY = "fileconverterbuddy_stats";

export const getConversionStats = (): ConversionStats => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
    totalFilesConverted: 0,
    totalDownloads: 0,
    lastConversionDate: new Date().toISOString(),
    conversionsByType: {
      images: 0,
      videos: 0,
      audio: 0,
      productFeeds: 0
    }
  };
};

export const trackConversion = (type: "images" | "videos" | "audio" | "productFeeds", fileCount: number = 1) => {
  const stats = getConversionStats();
  
  stats.totalFilesConverted += fileCount;
  stats.totalDownloads += fileCount;
  stats.lastConversionDate = new Date().toISOString();
  stats.conversionsByType[type] += fileCount;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  return stats;
};

export const getFormattedStats = () => {
  const stats = getConversionStats();
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };
  
  return {
    totalFiles: formatNumber(stats.totalFilesConverted),
    totalDownloads: formatNumber(stats.totalDownloads),
    lastConversion: new Date(stats.lastConversionDate).toLocaleDateString(),
    conversionsByType: stats.conversionsByType
  };
};
