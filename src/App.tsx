import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VideoConverter from "./pages/VideoConverter";
import TextConverter from "./pages/TextConverter";
import AudioConverter from "./pages/AudioConverter";
import ArchiveConverter from "./pages/ArchiveConverter";
import SpreadsheetConverter from "./pages/SpreadsheetConverter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video" element={<VideoConverter />} />
          <Route path="/text" element={<TextConverter />} />
          <Route path="/audio" element={<AudioConverter />} />
          <Route path="/archive" element={<ArchiveConverter />} />
          <Route path="/spreadsheet" element={<SpreadsheetConverter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
