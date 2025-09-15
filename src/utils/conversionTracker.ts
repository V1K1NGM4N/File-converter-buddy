import { getGlobalStats, updateGlobalStats } from './databaseService'
import { trackConversionEvent, trackDownloadEvent } from './gtmEvents'

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

// Fallback to localStorage if Supabase is not available
const STORAGE_KEY = "fileconverterbuddy_stats";

const getLocalStorageStats = (): ConversionStats => {
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

export const getConversionStats = async (): Promise<ConversionStats> => {
  try {
    const dbStats = await getGlobalStats();
    if (dbStats) {
      return {
        totalFilesConverted: dbStats.total_files_converted,
        totalDownloads: dbStats.total_downloads,
        lastConversionDate: dbStats.last_conversion_date,
        conversionsByType: dbStats.conversions_by_type
      };
    }
  } catch (error) {
    console.warn('Failed to fetch from database, using localStorage:', error);
  }
  
  return getLocalStorageStats();
};

export const trackConversion = async (type: "images" | "videos" | "audio" | "productFeeds", fileCount: number = 1) => {
  try {
    // Try to update database first
    const success = await updateGlobalStats(type, fileCount);
    if (success) {
      // Send GTM event
      trackConversionEvent(type, fileCount);
      return await getConversionStats();
    }
  } catch (error) {
    console.warn('Failed to update database, using localStorage:', error);
  }
  
  // Fallback to localStorage
  const stats = getLocalStorageStats();
  stats.totalFilesConverted += fileCount;
  stats.totalDownloads += fileCount;
  stats.lastConversionDate = new Date().toISOString();
  stats.conversionsByType[type] += fileCount;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  
  // Send GTM event
  trackConversionEvent(type, fileCount);
  
  return stats;
};

// Track downloads specifically
export const trackDownload = (type: "images" | "videos" | "audio" | "productFeeds", fileCount: number, downloadMethod: 'single' | 'bulk' | 'zip' = 'single') => {
  trackDownloadEvent(type, fileCount, downloadMethod);
};

export const getFormattedStats = async () => {
  const stats = await getConversionStats();
  
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
