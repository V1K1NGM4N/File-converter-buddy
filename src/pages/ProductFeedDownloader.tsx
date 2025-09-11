import React, { useState, useMemo, useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Search, 
  ExternalLink, 
  Image as ImageIcon, 
  Package, 
  Loader2,
  AlertCircle,
  CheckCircle,
  DownloadCloud,
  Filter,
  Zap,
  Upload,
  X,
  RefreshCw,
  Video,
  Music
} from 'lucide-react';
import { toast } from 'sonner';
import { trackConversion } from '@/utils/conversionTracker';
import { trackUserConversion } from '@/utils/userConversionTracker';
import { AnimatedFileType } from '@/components/AnimatedFileType';
import { FileTypeNavigation } from '@/components/FileTypeNavigation';
import { 
  fetchAndParseXMLFeed, 
  downloadImage, 
  downloadImagesAsZip,
  Product,
  ParsedFeed,
  XMLFeedParser
} from '@/utils/xmlFeedParser';
import { useProductFeedPersistence } from '@/hooks/useProductFeedPersistence';

const ProductFeedDownloader: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateState } = useProductFeedPersistence('productFeedDownloader');
  
  // Destructure state for easier access
  const {
    feedUrl,
    xmlContent,
    inputMode,
    parsedFeed,
    searchQuery,
    selectedCategory,
    selectedProducts: selectedProductsArray,
    imageFormat,
    currentPage,
    itemsPerPage
  } = state;
  
  // Convert selectedProducts array to Set for compatibility
  const selectedProducts = new Set(selectedProductsArray);
  
  // Local state that doesn't need persistence
  const [isLoading, setIsLoading] = useState(false);
  const [downloadingImages, setDownloadingImages] = useState<Set<string>>(new Set());
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [showCorsWarning, setShowCorsWarning] = useState(false);
  const [parsingProgress, setParsingProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentMessages, setCurrentMessages] = useState<string[]>([]);
  const [parsingStats, setParsingStats] = useState({ current: 0, total: 0, images: 0 });
  const [totalScope, setTotalScope] = useState({ products: 0, images: 0 });

  // Fun messages to show during parsing
  const getParsingMessages = (estimatedTime: number) => {
    const isLargeFeed = estimatedTime > 10000;
    const isMediumFeed = estimatedTime > 6000;
    
    const baseMessages = [
      "How big is your feed anyway? 🤔",
      "Do you really need this many items? 😅",
      "Hope all these items actually sell! 💰",
      "Parsing your product empire... 👑",
      "Counting products like sheep... 🐑",
      "Are you running Amazon? 🛒",
      "Parsing faster than a caffeinated developer! ☕",
      "Your products are looking good! ✨",
      "Almost there, don't give up! 💪",
      "Parsing with the power of 1000 hamsters! 🐹",
      "Parsing... and parsing... and parsing... 🔄",
      "Your products are getting jealous of each other! 😤",
      "Parsing at the speed of light! ⚡",
      "Parsing with the precision of a Swiss watch! ⌚",
      "Your products are having a party in there! 🎉"
    ];
    
    const largeFeedMessages = [
      "This feed is HUGE! 📈",
      "Your feed is so big it has its own gravity! 🌍",
      "This is like reading War and Peace! 📚",
      "This feed could feed a small country! 🏘️",
      "This is taking longer than expected... 😴",
      "Are you sure this isn't the entire internet? 🌐",
      "Your feed has more products than a shopping mall! 🏬",
      "This is bigger than my grocery list! 🛒",
      "Your products are staging a revolution! ⚔️",
      "This feed is legendary! 🏆"
    ];
    
    return isLargeFeed ? [...baseMessages, ...largeFeedMessages] : baseMessages;
  };

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    if (!parsedFeed) return [];

    let filtered = parsedFeed.products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    return filtered;
  }, [parsedFeed, searchQuery, selectedCategory]);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    if (itemsPerPage === -1) {
      return filteredProducts; // Show all items
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Pagination info
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredProducts.length / itemsPerPage);
  const totalFilteredProducts = filteredProducts.length;

  // Get unique categories for filter
  const categories = useMemo(() => {
    if (!parsedFeed) return [];
    const uniqueCategories = new Set(
      parsedFeed.products
        .map(product => product.category)
        .filter(category => category.trim())
    );
    return Array.from(uniqueCategories).sort();
  }, [parsedFeed]);

  const handleParseFeed = async () => {
    if (inputMode === 'url' && !feedUrl.trim()) {
      toast.error("Please enter a valid XML feed URL");
      return;
    }
    
    if (inputMode === 'xml' && !xmlContent.trim()) {
      toast.error("Please paste XML content");
      return;
    }

    setIsLoading(true);
    setShowCorsWarning(false); // Reset warning state
    setParsingProgress(0);
    setCurrentMessage(0); // Reset message index
    setParsingStats({ current: 0, total: 0, images: 0 }); // Reset parsing stats
    setTotalScope({ products: 0, images: 0 }); // Reset total scope
    
    try {
      let feed: ParsedFeed;
      
      if (inputMode === 'url') {
        // Estimate feed size and processing time
        const estimatedProcessingTime = Math.max(3000, Math.min(15000, feedUrl.length * 2)); // 3-15 seconds based on URL complexity
        const progressSteps = Math.floor(estimatedProcessingTime / 200); // Update every 200ms
        const progressIncrement = 85 / progressSteps; // Reach 85% over estimated time
        const messages = getParsingMessages(estimatedProcessingTime);
        setCurrentMessages(messages);
        
        let currentStep = 0;
        
        // Simulate realistic progress for URL parsing
        const progressInterval = setInterval(() => {
          currentStep++;
          setParsingProgress(prev => {
            if (prev >= 85) return prev; // Don't go to 100% until actually done
            const newProgress = Math.min(85, currentStep * progressIncrement);
            return newProgress;
          });
        }, 200); // Update every 200ms
        
        // Rotate messages every 4 seconds
        const messageInterval = setInterval(() => {
          setCurrentMessage(prev => (prev + 1) % messages.length);
        }, 4000);
        
        try {
          feed = await fetchAndParseXMLFeed(
            feedUrl, 
            (current, total, imagesFound) => {
              setParsingStats({ current, total, images: imagesFound });
              // Update progress based on actual parsing progress
              const actualProgress = Math.min(85, (current / total) * 85);
              setParsingProgress(actualProgress);
            },
            (products, images) => {
              setTotalScope({ products, images });
            }
          );
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setParsingProgress(100);
        } catch (error) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          throw error;
        }
      } else {
        // Parse XML content directly (faster, no progress needed)
        const parser = new XMLFeedParser(xmlContent);
        feed = parser.parseProducts();
        setParsingProgress(100);
      }
      
      // Small delay to show 100% completion
      setTimeout(() => {
        updateState({ parsedFeed: feed });
        toast.success(`Parsed ${feed.totalCount} products from feed`);
      }, 300);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to parse feed";
      
      // Show CORS warning if it's a fetch error and we're in URL mode
      if (inputMode === 'url' && (errorMessage.includes('Failed to fetch') || errorMessage.includes('CORS'))) {
        setShowCorsWarning(true);
      }
      
      toast.error(errorMessage);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setParsingProgress(0);
      }, 500);
    }
  };

  const handleDownloadProductImages = async (product: Product) => {

    if (product.images.length === 0) {
      toast.error("This product has no images to download");
      return;
    }

    setDownloadingImages(prev => new Set(prev).add(product.id));
    
    try {
      const imageDownloads = product.images.map((image, index) => ({
        url: image.url,
        filename: `${sanitizeFilename(product.title)}_${index + 1}.${imageFormat === 'original' ? 'jpg' : imageFormat}`,
        productTitle: product.title
      }));

      // Detect Mac and show appropriate message
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isMac && isSafari) {
        toast.info(`Starting download of ${product.images.length} images for "${product.title}"... (Safari on Mac detected - download may open in new tab)`);
      } else {
        toast.info(`Starting download of ${product.images.length} images for "${product.title}"...`);
      }
      
      await downloadImagesAsZip(imageDownloads, {
        createFolderStructure: true,
        groupByProduct: false
      });
      
      // Track successful downloads
      trackConversion('productFeeds', product.images.length);
      
      // Track user-specific conversions
      if (user?.id) {
        trackUserConversion(user.id, 'productFeeds', product.images.length);
      }
      
      toast.success(`Successfully downloaded ${product.images.length} images for "${product.title}" in organized structure`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to download images";
      
      // Provide Mac-specific error guidance
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      if (isMac && errorMessage.includes('Failed to create ZIP file')) {
        toast.error(`Download failed on Mac: ${errorMessage}. Try using Chrome or Firefox instead of Safari.`);
      } else {
        toast.error(`Download failed: ${errorMessage}`);
      }
      
      console.error('Download error:', error);
    } finally {
      setDownloadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleDownloadAllImages = async () => {

    if (!parsedFeed || parsedFeed.products.length === 0) {
      toast.error("No products available to download");
      return;
    }

    const productsWithImages = parsedFeed.products.filter(product => product.images.length > 0);
    
    if (productsWithImages.length === 0) {
      toast.error("No products have images to download");
      return;
    }

    setDownloadProgress(0);
    const totalImages = productsWithImages.reduce((sum, product) => sum + product.images.length, 0);
    let downloadedCount = 0;

    try {
      // Detect Mac and show appropriate message
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isMac && isSafari) {
        toast.info(`Starting bulk download of ${totalImages} images from ${productsWithImages.length} products... (Safari on Mac detected - download may open in new tab)`);
      } else {
        toast.info(`Starting bulk download of ${totalImages} images from ${productsWithImages.length} products...`);
      }
      
      // Collect all images from all products with product titles for folder organization
      const allImageDownloads: Array<{ url: string; filename: string; productTitle: string }> = [];
      
      for (const product of productsWithImages) {
        const productImages = product.images.map((image, index) => ({
          url: image.url,
          filename: `${sanitizeFilename(product.title)}_${index + 1}.${imageFormat === 'original' ? 'jpg' : imageFormat}`,
          productTitle: product.title
        }));
        allImageDownloads.push(...productImages);
      }

      // Download all images as a single ZIP file with organized folder structure
      await downloadImagesAsZip(allImageDownloads, {
        createFolderStructure: true,
        groupByProduct: false
      });
      setDownloadProgress(100);

      // Track successful downloads
      trackConversion('productFeeds', totalImages);
      
      // Track user-specific conversions
      if (user?.id) {
        trackUserConversion(user.id, 'productFeeds', totalImages);
      }
      
      toast.success(`Successfully downloaded ${totalImages} images from ${productsWithImages.length} products in organized structure`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to download images";
      
      // Provide Mac-specific error guidance
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      if (isMac && errorMessage.includes('Failed to create ZIP file')) {
        toast.error(`Bulk download failed on Mac: ${errorMessage}. Try using Chrome or Firefox instead of Safari.`);
      } else {
        toast.error(`Bulk download failed: ${errorMessage}`);
      }
      
      console.error('Bulk download error:', error);
    } finally {
      setDownloadProgress(0);
    }
  };

  const sanitizeFilename = (filename: string): string => {
    return filename
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .substring(0, 50);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImages(new Set()); // Reset selection
  };

  const handleImageToggle = (imageUrl: string) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageUrl)) {
        newSet.delete(imageUrl);
      } else {
        newSet.add(imageUrl);
      }
      return newSet;
    });
  };

  const handleSelectAllImages = () => {
    if (selectedProduct) {
      setSelectedImages(new Set(selectedProduct.images.map(img => img.url)));
    }
  };

  const handleSelectNoneImages = () => {
    setSelectedImages(new Set());
  };

  const handleDownloadSelectedImages = async () => {

    if (!selectedProduct) return;

    const imagesToDownload = selectedImages.size > 0 
      ? selectedProduct.images.filter(img => selectedImages.has(img.url))
      : selectedProduct.images; // Download all if none selected

    if (imagesToDownload.length === 0) {
      toast.error("No images selected to download");
      return;
    }

    setDownloadingImages(prev => new Set(prev).add(selectedProduct.id));
    
    try {
      const imageDownloads = imagesToDownload.map((image, index) => ({
        url: image.url,
        filename: `${sanitizeFilename(selectedProduct.title)}_${index + 1}.${imageFormat === 'original' ? 'jpg' : imageFormat}`,
        productTitle: selectedProduct.title
      }));

      toast.info(`Starting download of ${imagesToDownload.length} selected images for "${selectedProduct.title}"...`);
      await downloadImagesAsZip(imageDownloads, {
        createFolderStructure: true,
        groupByProduct: false
      });
      
      // Track successful downloads
      trackConversion('productFeeds', imagesToDownload.length);
      
      // Track user-specific conversions
      if (user?.id) {
        trackUserConversion(user.id, 'productFeeds', imagesToDownload.length);
      }
      
      toast.success(`Successfully downloaded ${imagesToDownload.length} images for "${selectedProduct.title}" in organized structure`);
      setSelectedProduct(null);
      setSelectedImages(new Set());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to download images";
      toast.error(`Download failed: ${errorMessage}`);
      console.error('Selected images download error:', error);
    } finally {
      setDownloadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedProduct.id);
        return newSet;
      });
    }
  };

  const handlePageChange = (page: number) => {
    updateState({ currentPage: page, selectedProducts: [] }); // Clear selection when changing pages
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    updateState({ 
      itemsPerPage: newItemsPerPage, 
      currentPage: 1, 
      selectedProducts: [] 
    }); // Reset to first page and clear selection when changing items per page
  };

  const handleSearchChange = (query: string) => {
    updateState({ 
      searchQuery: query, 
      currentPage: 1, 
      selectedProducts: [] 
    }); // Clear selection when searching
  };

  const handleCategoryChange = (category: string) => {
    updateState({ 
      selectedCategory: category, 
      currentPage: 1, 
      selectedProducts: [] 
    }); // Clear selection when filtering
  };

  const handleProductToggle = (productId: string) => {
    const newSet = new Set(selectedProducts);
    if (newSet.has(productId)) {
      newSet.delete(productId);
    } else {
      newSet.add(productId);
    }
    updateState({ selectedProducts: Array.from(newSet) });
  };

  const handleSelectAllProducts = () => {
    updateState({ selectedProducts: paginatedProducts.map(product => product.id) });
  };

  const handleSelectNoneProducts = () => {
    updateState({ selectedProducts: [] });
  };

  const handleDownloadSelectedProducts = async () => {

    if (selectedProducts.size === 0) {
      toast.error("No products selected to download");
      return;
    }

    const selectedProductsList = paginatedProducts.filter(product => selectedProducts.has(product.id));
    const productsWithImages = selectedProductsList.filter(product => product.images.length > 0);
    
    if (productsWithImages.length === 0) {
      toast.error("Selected products have no images to download");
      return;
    }

    setDownloadProgress(0);
    const totalImages = productsWithImages.reduce((sum, product) => sum + product.images.length, 0);

    try {
      // Detect Mac and show appropriate message
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isMac && isSafari) {
        toast.info(`Starting download of ${totalImages} images from ${productsWithImages.length} selected products... (Safari on Mac detected - download may open in new tab)`);
      } else {
        toast.info(`Starting download of ${totalImages} images from ${productsWithImages.length} selected products...`);
      }
      
      // Collect all images from selected products
      const allImageDownloads: Array<{ url: string; filename: string; productTitle: string }> = [];
      
      for (const product of productsWithImages) {
        const productImages = product.images.map((image, index) => ({
          url: image.url,
          filename: `${sanitizeFilename(product.title)}_${index + 1}.${imageFormat === 'original' ? 'jpg' : imageFormat}`,
          productTitle: product.title
        }));
        allImageDownloads.push(...productImages);
      }

      // Download all images as a single ZIP file with flat structure
      await downloadImagesAsZip(allImageDownloads, {
        createFolderStructure: true,
        groupByProduct: false
      });
      setDownloadProgress(100);

      // Track successful downloads
      trackConversion('productFeeds', totalImages);
      
      // Track user-specific conversions
      if (user?.id) {
        trackUserConversion(user.id, 'productFeeds', totalImages);
      }

      toast.success(`Successfully downloaded ${totalImages} images from ${productsWithImages.length} selected products`);
      updateState({ selectedProducts: [] }); // Clear selection after successful download
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to download images";
      
      // Provide Mac-specific error guidance
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      if (isMac && errorMessage.includes('Failed to create ZIP file')) {
        toast.error(`Selected products download failed on Mac: ${errorMessage}. Try using Chrome or Firefox instead of Safari.`);
      } else {
        toast.error(`Selected products download failed: ${errorMessage}`);
      }
      
      console.error('Selected products download error:', error);
    } finally {
      setDownloadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="animate-fade-in">
                <AnimatedFileType />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  File Converter <span className="text-primary">Buddy</span>
                </h1>
                <p className="text-muted-foreground text-xs">Convert files with ease</p>
              </div>
            </button>
            
            <div className="flex items-center space-x-6">
              {/* Blog Link */}
              <button 
                onClick={() => navigate('/blog')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center space-x-4">
            <div className="animate-fade-in">
              <AnimatedFileType />
            </div>
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold">
                Product Feed <span className="text-primary">Image Downloader</span>
              </h1>
              <p className="text-muted-foreground text-sm">Download images from XML feeds with ease</p>
            </div>
          </div>
          
          {/* Mac Compatibility Notice */}
          {/Mac|iPod|iPhone|iPad/.test(navigator.userAgent) && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Mac Users</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    For best results on Mac, we recommend using Chrome or Firefox. Safari may have limitations with ZIP file downloads.
                  </p>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Tool Navigation */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-xl font-semibold mb-6 animate-fade-in-up delay-300">Choose Your Tool</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/images')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-blue-500/20 bg-blue-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Image File Converter</span>
                    <span className="md:hidden">Images</span>
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    JPG, PNG, WebP and more
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/video')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-purple-500/20 bg-purple-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <Video className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Video File Converter</span>
                    <span className="md:hidden">Video</span>
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    MP4, AVI, MOV and more
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/audio')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-green-500/20 bg-green-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <Music className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Audio File Converter</span>
                    <span className="md:hidden">Audio</span>
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    MP3, WAV, FLAC and more
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/product-feed-image-downloader')}
              className="group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-orange-500/20 bg-orange-500/10 animate-fade-in-up"
              style={{ animationDelay: '0.7s' }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-6 w-6 text-orange-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden md:inline">Product Feed Image Downloader</span>
                    <span className="md:hidden">Product Feed</span>
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Easily download product feed images in the format you need
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Feed Input Section */}
          {!parsedFeed && (
            <div className="relative border-2 border-dashed border-border rounded-xl p-8 text-center transition-all duration-300 bg-gradient-upload shadow-upload hover:border-primary/50 hover:shadow-glow">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Add XML Product Feed</h3>
                  <p className="text-muted-foreground">
                    Enter your product feed URL or paste XML content directly
                  </p>
                </div>
                
                {/* Input Mode Toggle */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={inputMode === 'url' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      updateState({ inputMode: 'url' });
                      setShowCorsWarning(false);
                    }}
                  >
                    URL
                  </Button>
                  <Button
                    variant={inputMode === 'xml' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      updateState({ inputMode: 'xml' });
                      setShowCorsWarning(false);
                    }}
                  >
                    XML Content
                  </Button>
                </div>
                
                <div className="w-full max-w-2xl space-y-4">
                  {inputMode === 'url' ? (
                    <div className="flex gap-3">
                      <Input
                        value={feedUrl}
                        onChange={(e) => updateState({ feedUrl: e.target.value })}
                        placeholder="Add your XML product feed URL..."
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleParseFeed} 
                        disabled={isLoading}
                        size="lg"
                        className="min-w-32"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Parsing...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Parse Feed
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full space-y-3">
                      <textarea
                        value={xmlContent}
                        onChange={(e) => updateState({ xmlContent: e.target.value })}
                        placeholder="Paste your XML content here... (You can paste just the <item> elements or the complete XML feed)"
                        className="w-full h-24 p-3 border border-input bg-background rounded-md text-sm resize-vertical"
                      />
                      <p className="text-xs text-muted-foreground">
                        💡 Tip: You can paste just the &lt;item&gt; elements or the complete XML feed - both will work!
                      </p>
                      <div className="flex justify-center">
                        <Button 
                          onClick={handleParseFeed} 
                          disabled={isLoading}
                          size="lg"
                          className="min-w-32"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Parsing...
                            </>
                          ) : (
                            <>
                              <Search className="h-4 w-4 mr-2" />
                              Parse Feed
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Progress Bar - only show during URL parsing */}
                {isLoading && inputMode === 'url' && (
                  <div className="w-full max-w-2xl space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {totalScope.products > 0 
                          ? `Processing ${parsingStats.current} of ${parsingStats.total} items with ${parsingStats.images} images`
                          : "Parsing XML feed..."
                        }
                      </span>
                      <span>{Math.round(parsingProgress)}%</span>
                    </div>
                    {totalScope.products > 0 && (
                      <div className="text-center text-sm text-muted-foreground">
                        We need to process {totalScope.images.toLocaleString()} images from {totalScope.products.toLocaleString()} products. Good time to grab a coffee! ☕
                      </div>
                    )}
                    <Progress 
                      value={parsingProgress} 
                      className="w-full h-2" 
                      style={{
                        '--progress-background': 'hsl(var(--primary))',
                      } as React.CSSProperties}
                    />
                    <div className="text-center text-sm text-muted-foreground">
                      {currentMessages[currentMessage] || "Parsing your feed..."}
                    </div>
                  </div>
                )}
                
                {/* CORS Warning - only show when URL fetch fails */}
                {showCorsWarning && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800 max-w-lg">
                    <strong>Note:</strong> If you get a CORS error with URLs, try again or paste the feed content directly into the XML content field instead.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Feed Information */}
          {parsedFeed && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Feed Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold">{parsedFeed.totalCount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {totalFilteredProducts !== parsedFeed.totalCount 
                        ? `${totalFilteredProducts.toLocaleString()} filtered` 
                        : 'Duplicates removed'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Products with Images</p>
                    <p className="text-2xl font-bold">
                      {parsedFeed.products.filter(p => p.images.length > 0).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Images</p>
                    <p className="text-2xl font-bold">
                      {parsedFeed.products.reduce((sum, p) => sum + p.images.length, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">All variants combined</p>
                  </div>
                </div>
                {parsedFeed.feedTitle && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Feed Title</p>
                    <p className="text-lg">{parsedFeed.feedTitle}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Search and Filter */}
          {parsedFeed && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search products by name, brand, or description..."
                      className="w-full"
                    />
                  </div>
                  <div className="sm:w-64">
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    onClick={handleDownloadAllImages}
                    disabled={filteredProducts.length === 0}
                    className="whitespace-nowrap px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Download All ({filteredProducts.reduce((sum, p) => sum + p.images.length, 0)} images)
                  </Button>
                </div>
                {downloadProgress > 0 && (
                  <div className="mt-4">
                    <Progress value={downloadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Downloading images... {Math.round(downloadProgress)}%
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Conversion Controls */}
          {parsedFeed && (
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Unique Products: {filteredProducts.length}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Total Images: {filteredProducts.reduce((sum, p) => sum + p.images.length, 0)}
                </span>
                {selectedProducts.size > 0 && (
                  <span className="text-sm font-medium text-primary">
                    Selected: {selectedProducts.size}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={imageFormat}
                  onChange={(e) => updateState({ imageFormat: e.target.value as 'jpg' | 'png' | 'webp' | 'original' })}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="original">Original Format</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateState({
                      parsedFeed: null,
                      searchQuery: '',
                      selectedCategory: '',
                      feedUrl: '',
                      xmlContent: '',
                      inputMode: 'url',
                      selectedProducts: []
                    });
                    setDownloadProgress(0);
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                
                {selectedProducts.size > 0 && (
                  <>
                    <Button
                      onClick={handleDownloadSelectedProducts}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <DownloadCloud className="h-4 w-4 mr-2" />
                      Download Selected ({selectedProducts.size})
                    </Button>
                  </>
                )}
                
                  <Button
                    onClick={handleDownloadAllImages}
                    disabled={filteredProducts.length === 0}
                    size="sm"
                    className="px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                  <Button
                    disabled={filteredProducts.length === 0}
                    size="sm"
                    className="px-6 py-2.5 text-sm font-medium border border-input bg-background rounded-lg hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {parsedFeed && (
            <div className="space-y-4">
              {filteredProducts.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No products found matching your search criteria.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {/* Selection Controls */}
                  <div className="flex items-center justify-between p-4 bg-card/20 rounded-lg border border-border/30">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.size === paginatedProducts.length && paginatedProducts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSelectAllProducts();
                            } else {
                              handleSelectNoneProducts();
                            }
                          }}
                          className="w-4 h-4 text-primary bg-background border-2 border-primary rounded focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-muted-foreground">
                          Select All ({paginatedProducts.length})
                        </span>
                      </div>
                      {selectedProducts.size > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-primary">
                            {selectedProducts.size} selected
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSelectNoneProducts}
                            className="text-xs"
                          >
                            Clear
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {selectedProducts.size > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {selectedProducts.size} products selected
                        </span>
                          <Button
                            onClick={handleDownloadSelectedProducts}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <DownloadCloud className="h-4 w-4 mr-2" />
                            Download Selected
                          </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <DownloadCloud className="h-4 w-4 mr-2" />
                              Download Selected
                            </Button>
                      </div>
                    )}
                  </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 h-full flex flex-col relative"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-6 left-6 z-10">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleProductToggle(product.id);
                          }}
                          className="w-4 h-4 text-primary bg-background border-2 border-primary rounded focus:ring-primary"
                        />
                      </div>
                      
                      {/* Header */}
                      <div className="pt-5 px-6 pb-3 cursor-pointer" onClick={() => handleProductClick(product)}>
                        <div className="flex items-start gap-3 mb-2 ml-8">
                          <h3 className="text-lg font-semibold line-clamp-2 flex-1">
                            {product.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {product.images.length} images
                          </Badge>
                          {product.brand && (
                            <Badge variant="secondary" className="text-xs">
                              {product.brand}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="px-6 flex-1 flex flex-col min-h-0">
                        {/* Main Content Area - grows to fill space */}
                        <div className="flex-1 space-y-6 min-h-0">
                          {/* Product Images Preview */}
                          {product.images.length > 0 && (
                            <div className={`grid gap-2 ${product.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                              {product.images.slice(0, product.images.length > 4 ? 3 : product.images.length).map((image, index) => (
                                <div key={index} className="aspect-square bg-muted rounded-md overflow-hidden">
                                  <img
                                    src={image.url}
                                    alt={image.alt || product.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                </div>
                              ))}
                              {product.images.length > 4 && (
                                <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                                  <span className="text-sm text-muted-foreground">
                                    +{product.images.length - 3} more
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Product Details */}
                          {product.category && (
                            <div className="text-sm">
                              <span className="font-medium">Category:</span> {product.category}
                            </div>
                          )}
                        </div>

                        <Separator className="my-4" />

                        {/* Action Buttons - always at bottom */}
                        <div className="space-y-2 pb-4">
                          <div className="flex gap-2">
                            <select
                              value={imageFormat}
                              onChange={(e) => updateState({ imageFormat: e.target.value as 'jpg' | 'png' | 'webp' | 'original' })}
                              className="px-2 py-1 border border-input bg-background rounded text-xs"
                            >
                              <option value="original">Original</option>
                              <option value="jpg">JPG</option>
                              <option value="png">PNG</option>
                              <option value="webp">WebP</option>
                            </select>
                            
                              <Button
                                onClick={() => handleDownloadProductImages(product)}
                                disabled={product.images.length === 0 || downloadingImages.has(product.id)}
                                className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                size="sm"
                              >
                                {downloadingImages.has(product.id) ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Downloading...
                                  </>
                                ) : (
                                  <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Images
                                  </>
                                )}
                              </Button>
                                <Button
                                  disabled={product.images.length === 0 || downloadingImages.has(product.id)}
                                  className="flex-1 px-4 py-2 text-sm font-medium border border-input bg-background rounded-lg hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                  size="sm"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Images
                                </Button>
                            
                            {product.productUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(product.productUrl, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </>
              )}

              {/* Pagination Controls */}
              {totalFilteredProducts > 0 && (
                <div className="mt-8 space-y-4">
                  {/* Items per page selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Items per page:</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="px-2 py-1 border border-input bg-background rounded text-sm"
                      >
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={-1}>All items</option>
                      </select>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {itemsPerPage === -1 
                        ? `Showing all ${totalFilteredProducts.toLocaleString()} products`
                        : `Showing ${((currentPage - 1) * itemsPerPage) + 1} to ${Math.min(currentPage * itemsPerPage, totalFilteredProducts)} of ${totalFilteredProducts.toLocaleString()} products`
                      }
                    </div>
                  </div>

                  {/* Page navigation */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      {/* Page numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(pageNum)}
                              className="w-8 h-8 p-0"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Image Showcase Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            // Close modal if clicking on the backdrop (not the modal content)
            if (e.target === e.currentTarget) {
              setSelectedProduct(null);
              setSelectedImages(new Set());
            }
          }}
        >
          <div 
            className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold">{selectedProduct.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedProduct.images.length} images available
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedImages(new Set());
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedProduct.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-pointer"
                    onClick={() => handleImageToggle(image.url)}
                  >
                    <div className="aspect-square bg-muted rounded-md overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-primary/50">
                      <img
                        src={image.url}
                        alt={image.alt || selectedProduct.title}
                        className="w-full h-full object-cover transition-all duration-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      
                      {/* Selection overlay */}
                      {selectedImages.has(image.url) && (
                        <div className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-md" />
                      )}
                    </div>
                    
                    {/* Checkbox overlay */}
                    <div className="absolute top-2 left-2 pointer-events-none">
                      <input
                        type="checkbox"
                        checked={selectedImages.has(image.url)}
                        readOnly
                        className="w-4 h-4 text-primary bg-background border-2 border-primary rounded focus:ring-primary"
                      />
                    </div>
                    
                    {/* Image number */}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-muted/30">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAllImages}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectNoneImages}
                >
                  Select None
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedImages.size} of {selectedProduct.images.length} selected
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={imageFormat}
                  onChange={(e) => updateState({ imageFormat: e.target.value as 'jpg' | 'png' | 'webp' | 'original' })}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="original">Original Format</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
                
                  <Button
                    onClick={handleDownloadSelectedImages}
                    disabled={downloadingImages.has(selectedProduct.id)}
                    size="sm"
                  >
                    {downloadingImages.has(selectedProduct.id) ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download {selectedImages.size > 0 ? `${selectedImages.size} Selected` : 'All'}
                      </>
                    )}
                  </Button>
                  <Button
                    disabled={downloadingImages.has(selectedProduct.id)}
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download {selectedImages.size > 0 ? `${selectedImages.size} Selected` : 'All'}
                  </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFeedDownloader