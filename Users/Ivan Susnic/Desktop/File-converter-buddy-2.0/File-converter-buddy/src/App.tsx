import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import Home from "./pages/Home";
import ImageConverter from "./pages/ImageConverter";
import VideoConverter from "./pages/VideoConverter";
import AudioConverter from "./pages/AudioConverter";
import UniversalConverter from "./pages/UniversalConverter";
import ProductFeedDownloader from "./pages/ProductFeedDownloader";
import Blog from "./pages/Blog";
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