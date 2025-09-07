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
  
  // Starting baseline for new installations
  const baselineDownloads = 1285;
  
  return {
    totalFilesConverted: baselineDownloads,
    totalDownloads: baselineDownloads,
    lastConversionDate: new Date().toISOString(),
    conversionsByType: {
      images: Math.floor(baselineDownloads * 0.4), // 40% images
      videos: Math.floor(baselineDownloads * 0.3), // 30% videos
      audio: Math.floor(baselineDownloads * 0.2),  // 20% audio
      productFeeds: Math.floor(baselineDownloads * 0.1) // 10% product feeds
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
