export interface UserConversionStats {
  userId: string;
  totalConversions: number;
  monthlyConversions: number;
  lastResetDate: string;
  conversionsByType: {
    images: number;
    videos: number;
    audio: number;
    productFeeds: number;
  };
  monthlyLimit: number;
  isPremium: boolean;
}

const MONTHLY_LIMIT_FREE = 100;
const MONTHLY_LIMIT_PREMIUM = 10000;

export const getUserStorageKey = (userId: string) => `fileconverterbuddy_user_${userId}`;

export const getUserConversionStats = (userId: string): UserConversionStats => {
  const storageKey = getUserStorageKey(userId);
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    const stats = JSON.parse(stored);
    const currentMonth = new Date().toISOString().slice(0, 7);
    const lastResetMonth = stats.lastResetDate.slice(0, 7);
    
    if (currentMonth !== lastResetMonth) {
      stats.monthlyConversions = 0;
      stats.lastResetDate = new Date().toISOString();
      localStorage.setItem(storageKey, JSON.stringify(stats));
    }
    
    return stats;
  }
  
  const newStats: UserConversionStats = {
    userId,
    totalConversions: 0,
    monthlyConversions: 0,
    lastResetDate: new Date().toISOString(),
    conversionsByType: {
      images: 0,
      videos: 0,
      audio: 0,
      productFeeds: 0
    },
    monthlyLimit: MONTHLY_LIMIT_FREE,
    isPremium: false
  };
  
  localStorage.setItem(storageKey, JSON.stringify(newStats));
  return newStats;
};

export const trackUserConversion = (
  userId: string, 
  type: "images" | "videos" | "audio" | "productFeeds", 
  fileCount: number = 1
): { success: boolean; stats: UserConversionStats; message?: string } => {
  const stats = getUserConversionStats(userId);
  
  // No limits - just track usage
  stats.totalConversions += fileCount;
  stats.monthlyConversions += fileCount;
  stats.conversionsByType[type] += fileCount;
  
  const storageKey = getUserStorageKey(userId);
  localStorage.setItem(storageKey, JSON.stringify(stats));
  
  return {
    success: true,
    stats
  };
};

export const getUserUsageDisplay = (userId: string) => {
  const stats = getUserConversionStats(userId);
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };
  
  return {
    totalFiles: formatNumber(stats.totalConversions),
    monthlyUsage: `${stats.monthlyConversions} this month`,
    monthlyPercentage: 0, // No progress bar needed
    remainingThisMonth: "Unlimited",
    isNearLimit: false,
    isAtLimit: false,
    userType: "Unlimited"
  };
};

export const upgradeToPremium = (userId: string) => {
  const stats = getUserConversionStats(userId);
  stats.isPremium = true;
  stats.monthlyLimit = MONTHLY_LIMIT_PREMIUM;
  
  const storageKey = getUserStorageKey(userId);
  localStorage.setItem(storageKey, JSON.stringify(stats));
  
  return stats;
};
