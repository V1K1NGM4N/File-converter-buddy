import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import ImageConverter from "./pages/ImageConverter";
import VideoConverter from "./pages/VideoConverter";
import AudioConverter from "./pages/AudioConverter";
import ProductFeedDownloader from "./pages/ProductFeedDownloader";
import Blog from "./pages/Blog";
import CompleteGuideToImageFileFormats from "./pages/blog/CompleteGuideToImageFileFormats";
import CompleteGuideToVideoFileFormats from "./pages/blog/CompleteGuideToVideoFileFormats";
import CompleteGuideToAudioFileFormats from "./pages/blog/CompleteGuideToAudioFileFormats";
import PDFConversionBestPractices from "./pages/blog/PDFConversionBestPractices";
import FileCompressionGuide from "./pages/blog/FileCompressionGuide";
import DocumentFormatGuide from "./pages/blog/DocumentFormatGuide";
import ImageOptimizationForWebPerformance from "./pages/blog/ImageOptimizationForWebPerformance";
import VideoCompressionTechniques from "./pages/blog/VideoCompressionTechniques";
import AudioQualityVsFileSizeGuide from "./pages/blog/AudioQualityVsFileSizeGuide";
import BatchFileConversionTips from "./pages/blog/BatchFileConversionTips";
import FileFormatSecurityBestPractices from "./pages/blog/FileFormatSecurityBestPractices";
import CrossPlatformFileCompatibility from "./pages/blog/CrossPlatformFileCompatibility";
import FileConversionForContentCreators from "./pages/blog/FileConversionForContentCreators";
import MobileFileManagementGuide from "./pages/blog/MobileFileManagementGuide";
import FileFormatFutureTrends from "./pages/blog/FileFormatFutureTrends";
import CompleteGuideToProductFeedImageDownloading from "./pages/blog/CompleteGuideToProductFeedImageDownloading";
import HowToExtractImagesFromXMLProductFeeds from "./pages/blog/HowToExtractImagesFromXMLProductFeeds";
import BulkProductImageDownloaderForEcommerce from "./pages/blog/BulkProductImageDownloaderForEcommerce";
import ProductFeedImageOptimizationBestPractices from "./pages/blog/ProductFeedImageOptimizationBestPractices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/complete-guide-to-image-file-formats" element={<CompleteGuideToImageFileFormats />} />
          <Route path="/blog/complete-guide-to-video-file-formats" element={<CompleteGuideToVideoFileFormats />} />
          <Route path="/blog/complete-guide-to-audio-file-formats" element={<CompleteGuideToAudioFileFormats />} />
          <Route path="/blog/pdf-conversion-best-practices" element={<PDFConversionBestPractices />} />
          <Route path="/blog/file-compression-guide" element={<FileCompressionGuide />} />
          <Route path="/blog/document-format-guide" element={<DocumentFormatGuide />} />
          <Route path="/blog/image-optimization-for-web-performance" element={<ImageOptimizationForWebPerformance />} />
          <Route path="/blog/video-compression-techniques" element={<VideoCompressionTechniques />} />
          <Route path="/blog/audio-quality-vs-file-size-guide" element={<AudioQualityVsFileSizeGuide />} />
          <Route path="/blog/batch-file-conversion-tips" element={<BatchFileConversionTips />} />
          <Route path="/blog/file-format-security-best-practices" element={<FileFormatSecurityBestPractices />} />
          <Route path="/blog/cross-platform-file-compatibility" element={<CrossPlatformFileCompatibility />} />
          <Route path="/blog/file-conversion-for-content-creators" element={<FileConversionForContentCreators />} />
          <Route path="/blog/mobile-file-management-guide" element={<MobileFileManagementGuide />} />
          <Route path="/blog/file-format-future-trends" element={<FileFormatFutureTrends />} />
          <Route path="/blog/complete-guide-to-product-feed-image-downloading" element={<CompleteGuideToProductFeedImageDownloading />} />
          <Route path="/blog/how-to-extract-images-from-xml-product-feeds" element={<HowToExtractImagesFromXMLProductFeeds />} />
          <Route path="/blog/bulk-product-image-downloader-for-ecommerce" element={<BulkProductImageDownloaderForEcommerce />} />
          <Route path="/blog/product-feed-image-optimization-best-practices" element={<ProductFeedImageOptimizationBestPractices />} />
          <Route path="/video" element={<VideoConverter />} />
          <Route path="/audio" element={<AudioConverter />} />
          <Route path="/images" element={<ImageConverter />} />
          <Route path="/product-feed-image-downloader" element={<ProductFeedDownloader />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;