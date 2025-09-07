import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home-fallback";
import ImageConverter from "./pages/ImageConverter-fallback";
import VideoConverter from "./pages/VideoConverter";
import AudioConverter from "./pages/AudioConverter";
import UniversalConverter from "./pages/UniversalConverter";
import ProductFeedDownloader from "./pages/ProductFeedDownloader";
import Blog from "./pages/Blog-fallback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/universal-converter" element={<UniversalConverter />} />
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
);

export default App;
