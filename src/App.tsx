import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const ImageConverter = lazy(() => import("./pages/ImageConverter"));
const VideoConverter = lazy(() => import("./pages/VideoConverter"));
const AudioConverter = lazy(() => import("./pages/AudioConverter"));
const ProductFeedDownloader = lazy(() => import("./pages/ProductFeedDownloader"));
const Blog = lazy(() => import("./pages/Blog"));
const FileSizeReducer = lazy(() => import("./pages/FileSizeReducer"));
const VideoToGif = lazy(() => import("./pages/VideoToGif"));
const ImageToPdf = lazy(() => import("./pages/ImageToPdf"));

// Blog pages
const CompleteGuideToImageFileFormats = lazy(() => import("./pages/blog/CompleteGuideToImageFileFormats"));
const CompleteGuideToVideoFileFormats = lazy(() => import("./pages/blog/CompleteGuideToVideoFileFormats"));
const CompleteGuideToAudioFileFormats = lazy(() => import("./pages/blog/CompleteGuideToAudioFileFormats"));
const PDFConversionBestPractices = lazy(() => import("./pages/blog/PDFConversionBestPractices"));
const FileCompressionGuide = lazy(() => import("./pages/blog/FileCompressionGuide"));
const DocumentFormatGuide = lazy(() => import("./pages/blog/DocumentFormatGuide"));
const ImageOptimizationForWebPerformance = lazy(() => import("./pages/blog/ImageOptimizationForWebPerformance"));
const VideoCompressionTechniques = lazy(() => import("./pages/blog/VideoCompressionTechniques"));
const AudioQualityVsFileSizeGuide = lazy(() => import("./pages/blog/AudioQualityVsFileSizeGuide"));
const BatchFileConversionTips = lazy(() => import("./pages/blog/BatchFileConversionTips"));
const FileFormatSecurityBestPractices = lazy(() => import("./pages/blog/FileFormatSecurityBestPractices"));
const CrossPlatformFileCompatibility = lazy(() => import("./pages/blog/CrossPlatformFileCompatibility"));
const FileConversionForContentCreators = lazy(() => import("./pages/blog/FileConversionForContentCreators"));
const MobileFileManagementGuide = lazy(() => import("./pages/blog/MobileFileManagementGuide"));
const FileFormatFutureTrends = lazy(() => import("./pages/blog/FileFormatFutureTrends"));
const CompleteGuideToProductFeedImageDownloading = lazy(() => import("./pages/blog/CompleteGuideToProductFeedImageDownloading"));
const HowToExtractImagesFromXMLProductFeeds = lazy(() => import("./pages/blog/HowToExtractImagesFromXMLProductFeeds"));
const BulkProductImageDownloaderForEcommerce = lazy(() => import("./pages/blog/BulkProductImageDownloaderForEcommerce"));
const ProductFeedImageOptimizationBestPractices = lazy(() => import("./pages/blog/ProductFeedImageOptimizationBestPractices"));
const ImageToPdfGuide = lazy(() => import("./pages/blog/ImageToPdfGuide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />

              {/* Blog Routes */}
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
              <Route path="/blog/image-to-pdf-guide" element={<ImageToPdfGuide />} />

              {/* Tool Routes */}
              <Route path="/video" element={<VideoConverter />} />
              <Route path="/audio" element={<AudioConverter />} />
              <Route path="/images" element={<ImageConverter />} />
              <Route path="/product-feed-image-downloader" element={<ProductFeedDownloader />} />
              <Route path="/reducer" element={<FileSizeReducer />} />
              <Route path="/video-to-gif" element={<VideoToGif />} />
              <Route path="/image-to-pdf" element={<ImageToPdf />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;