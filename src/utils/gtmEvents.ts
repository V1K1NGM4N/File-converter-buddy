// Simple GTM event tracking - pushes to dataLayer for automatic GTM detection
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
const initDataLayer = () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = [];
  }
};

// Push event to dataLayer (GTM automatically picks this up)
const pushToDataLayer = (eventData: any) => {
  if (typeof window === 'undefined') return;
  
  initDataLayer();
  window.dataLayer.push(eventData);
};

// Track file conversions
export const trackConversionEvent = (
  type: "images" | "videos" | "audio" | "productFeeds", 
  fileCount: number
) => {
  pushToDataLayer({
    event: 'file_conversion',
    conversion_type: type,
    file_count: fileCount,
    timestamp: new Date().toISOString()
  });
};

// Track file downloads
export const trackDownloadEvent = (
  type: "images" | "videos" | "audio" | "productFeeds",
  fileCount: number,
  downloadMethod: 'single' | 'bulk' | 'zip' = 'single'
) => {
  pushToDataLayer({
    event: 'file_download',
    download_type: type,
    file_count: fileCount,
    download_method: downloadMethod,
    timestamp: new Date().toISOString()
  });
};
