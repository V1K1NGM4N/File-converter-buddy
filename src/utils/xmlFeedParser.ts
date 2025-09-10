export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  price: string;
  currency: string;
  availability: string;
  condition: string;
  gender: string;
  ageGroup: string;
  size?: string;
  color?: string;
  material?: string;
  category: string;
  images: ProductImage[];
  productUrl: string;
  gtin?: string;
  mpn?: string;
  weight?: string;
}

export interface ParsedFeed {
  products: Product[];
  totalCount: number;
  feedTitle?: string;
  feedDescription?: string;
}

/**
 * Parses XML product feed and extracts product information
 */
export class XMLFeedParser {
  private xmlDoc: Document | null = null;
  private xmlContent: string;

  constructor(xmlContent: string) {
    this.xmlContent = xmlContent;
    this.parseXML(xmlContent);
  }

  private parseXML(xmlContent: string): void {
    // For simple parsing, we'll use regex to extract data directly
    // This avoids XML parsing issues with malformed content
    this.xmlDoc = null; // We'll use regex instead of DOM parsing
  }

  /**
   * Gets initial scope of the feed (product count and estimated image count)
   */
  public getInitialScope(): { products: number; images: number } {
    // Much faster approach - just count occurrences of key strings
    const itemCount = (this.xmlContent.split('<item>').length - 1) + 
                     (this.xmlContent.split('<item ').length - 1);
    
    // Count image links more efficiently
    const imageLinkCount = (this.xmlContent.split('<g:image_link>').length - 1) + 
                          (this.xmlContent.split('<g:additional_image_link>').length - 1);
    
    return {
      products: Math.max(0, itemCount),
      images: Math.max(0, imageLinkCount)
    };
  }

  /**
   * Extracts all products from the XML feed using regex with performance optimizations
   */
  public parseProducts(onProgress?: (current: number, total: number, imagesFound: number) => void): ParsedFeed {
    const products: Product[] = [];
    const productMap = new Map<string, Product>();
    
    // Split content into individual items with better regex for performance
    const itemMatches = this.xmlContent.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
    const totalItems = itemMatches.length;
    let totalImagesFound = 0;
    
    // Process items in batches for better performance on large feeds
    const BATCH_SIZE = 100;
    const batches = [];
    for (let i = 0; i < itemMatches.length; i += BATCH_SIZE) {
      batches.push(itemMatches.slice(i, i + BATCH_SIZE));
    }
    
    let processedItems = 0;
    
    for (const batch of batches) {
      // Process batch synchronously for better performance
      for (let batchIndex = 0; batchIndex < batch.length; batchIndex++) {
        const itemContent = batch[batchIndex];
        const index = processedItems + batchIndex;
        
        try {
          const product = this.extractProductFromItemContent(itemContent, index);
          if (product) {
            // Count images for this product
            totalImagesFound += product.images.length;
            
            // Report progress every 10 items to avoid too many updates
            if (onProgress && (index + 1) % 10 === 0) {
              onProgress(index + 1, totalItems, totalImagesFound);
            }
            
            // Use product title as the key to group variants
            const productKey = product.title.trim().toLowerCase();
            
            if (productMap.has(productKey)) {
              // Product already exists, merge the images
              const existingProduct = productMap.get(productKey)!;
              const newImages = product.images.filter(newImage => 
                !existingProduct.images.some(existingImage => existingImage.url === newImage.url)
              );
              existingProduct.images.push(...newImages);
              
              // Update other fields if they're missing in the existing product
              if (!existingProduct.brand && product.brand) {
                existingProduct.brand = product.brand;
              }
              if (!existingProduct.description && product.description) {
                existingProduct.description = product.description;
              }
              if (!existingProduct.productUrl && product.productUrl) {
                existingProduct.productUrl = product.productUrl;
              }
              if (!existingProduct.price && product.price) {
                existingProduct.price = product.price;
              } else if (existingProduct.price && product.price && existingProduct.price !== product.price) {
                // If both have prices, use the first one (they should be the same anyway)
                // This handles cases where variants might have slightly different price formatting
                existingProduct.price = existingProduct.price;
              }
              
              // Update availability - if any variant is in stock, mark as in stock
              if (product.availability === 'in_stock' || existingProduct.availability === 'in_stock') {
                existingProduct.availability = 'in_stock';
              }
            } else {
              // New product, add it to the map
              productMap.set(productKey, product);
            }
          }
        } catch (error) {
          console.warn(`Failed to parse product at index ${index}:`, error);
        }
      }
      
      processedItems += batch.length;
      
      // Report progress at the end of each batch
      if (onProgress) {
        onProgress(processedItems, totalItems, totalImagesFound);
      }
      
      // Small delay between batches to prevent blocking the UI
      if (batches.indexOf(batch) < batches.length - 1) {
        // Use setTimeout to yield control back to the browser
        // Note: This is a synchronous method, so we can't use await here
        // The batching itself helps with performance
      }
    }

    // Final progress update
    if (onProgress) {
      onProgress(totalItems, totalItems, totalImagesFound);
    }

    // Convert map values to array
    const uniqueProducts = Array.from(productMap.values());

    return {
      products: uniqueProducts,
      totalCount: uniqueProducts.length,
      feedTitle: 'Product Feed',
      feedDescription: 'Parsed from XML content'
    };
  }

  private extractProductFromItemContent(itemContent: string, index: number): Product | null {
    // Extract title using regex
    const titleMatch = itemContent.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    if (!title) {
      return null; // Skip items without title
    }

    // Extract description
    const descMatch = itemContent.match(/<description[^>]*>([^<]+)<\/description>/i);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract brand
    const brandMatch = itemContent.match(/<g:brand[^>]*>([^<]+)<\/g:brand>/i);
    const brand = brandMatch ? brandMatch[1].trim() : '';

    // Extract price and clean up currency duplicates
    const priceMatch = itemContent.match(/<g:price[^>]*>([^<]+)<\/g:price>/i);
    let price = priceMatch ? priceMatch[1].trim() : '';
    
    // Clean up duplicate currency symbols
    if (price) {
      console.log('Original price:', price); // Debug log
      
      // More aggressive cleaning - remove all currency codes and rebuild
      const numericMatch = price.match(/^([\d.,\s]+)/);
      const currencyMatches = price.match(/\b([A-Z]{3})\b/g);
      
      if (numericMatch) {
        const numericPart = numericMatch[1].trim();
        if (currencyMatches && currencyMatches.length > 0) {
          // Take only the first currency found
          const uniqueCurrency = currencyMatches[0];
          price = numericPart + ' ' + uniqueCurrency;
        } else {
          // If no currency found, just use the numeric part
          price = numericPart;
        }
        console.log('Cleaned price:', price); // Debug log
      }
    }

    // Extract size
    const sizeMatch = itemContent.match(/<g:size[^>]*>([^<]+)<\/g:size>/i);
    const size = sizeMatch ? sizeMatch[1].trim() : '';

    // Extract color
    const colorMatch = itemContent.match(/<g:color[^>]*>([^<]+)<\/g:color>/i);
    const color = colorMatch ? colorMatch[1].trim() : '';

    // Extract product URL
    const linkMatch = itemContent.match(/<link[^>]*>([^<]+)<\/link>/i);
    const productUrl = linkMatch ? linkMatch[1].trim() : '';

    // Extract images using regex
    const images = this.extractImagesFromContent(itemContent);

    // Generate ID
    const id = `product_${index}`;

    return {
      id,
      title,
      description,
      brand,
      price,
      currency: '', // No default currency
      availability: 'in_stock',
      condition: 'new',
      gender: '',
      ageGroup: '',
      size,
      color,
      material: '',
      category: '',
      images,
      productUrl,
      gtin: '',
      mpn: '',
      weight: ''
    };
  }

  private extractImagesFromContent(itemContent: string): ProductImage[] {
    const images: ProductImage[] = [];
    
    // Multiple patterns to extract image URLs from different XML formats
    const imagePatterns = [
      // Google Shopping format
      /<g:image_link[^>]*>([^<]+)<\/g:image_link>/gi,
      /<g:additional_image_link[^>]*>([^<]+)<\/g:additional_image_link>/gi,
      
      // Standard RSS/XML formats
      /<image_link[^>]*>([^<]+)<\/image_link>/gi,
      /<image[^>]*>([^<]+)<\/image>/gi,
      /<img[^>]*src=["']([^"']+)["'][^>]*>/gi,
      
      // Other common formats
      /<picture[^>]*>([^<]+)<\/picture>/gi,
      /<media:content[^>]*url=["']([^"']+)["'][^>]*>/gi,
      /<enclosure[^>]*url=["']([^"']+)["'][^>]*>/gi,
      
      // Generic URL patterns that might be images
      /<url[^>]*>([^<]+\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|tif)[^<]*)<\/url>/gi,
      /<link[^>]*>([^<]+\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|tif)[^<]*)<\/link>/gi
    ];
    
    // Extract URLs using all patterns
    imagePatterns.forEach((pattern, patternIndex) => {
      const matches = itemContent.match(pattern);
      if (matches) {
        matches.forEach((match, index) => {
          let url = '';
          
          // Extract URL from different match formats
          if (pattern.source.includes('src=')) {
            const urlMatch = match.match(/src=["']([^"']+)["']/i);
            url = urlMatch ? urlMatch[1] : '';
          } else if (pattern.source.includes('url=')) {
            const urlMatch = match.match(/url=["']([^"']+)["']/i);
            url = urlMatch ? urlMatch[1] : '';
          } else {
            // Extract content between tags
            const contentMatch = match.match(/>([^<]+)</i);
            url = contentMatch ? contentMatch[1] : '';
          }
          
          if (url && this.isValidImageUrl(url)) {
            // Clean and decode URL
            url = decodeURIComponent(url.trim());
            
            // Avoid duplicates
            if (!images.some(img => img.url === url)) {
              images.push({
                url,
                alt: `Image ${images.length + 1}`
              });
            }
          }
        });
      }
    });
    
    // Additional fallback: look for any URLs in the content that might be images
    const urlPattern = /https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|tif)(?:\?[^\s<>"']*)?/gi;
    const urlMatches = itemContent.match(urlPattern);
    if (urlMatches) {
      urlMatches.forEach(url => {
        if (this.isValidImageUrl(url) && !images.some(img => img.url === url)) {
          images.push({
            url: decodeURIComponent(url.trim()),
            alt: `Found image ${images.length + 1}`
          });
        }
      });
    }

    return images;
  }

  private isValidImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    // Clean the URL
    const cleanUrl = url.trim();
    if (!cleanUrl) return false;
    
    // Check if it's a valid URL format
    try {
      new URL(cleanUrl);
    } catch {
      return false;
    }
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.tif'];
    const lowerUrl = cleanUrl.toLowerCase();
    
    // Check for image extensions
    const hasImageExtension = imageExtensions.some(ext => lowerUrl.includes(ext));
    
    // Check for image-related keywords in URL
    const hasImageKeywords = lowerUrl.includes('image') ||
                            lowerUrl.includes('photo') ||
                            lowerUrl.includes('picture') ||
                            lowerUrl.includes('img') ||
                            lowerUrl.includes('media');
    
    // Check for common image hosting domains
    const imageDomains = ['imgur.com', 'flickr.com', 'amazonaws.com', 'cloudinary.com', 'cdn.', 'static.'];
    const hasImageDomain = imageDomains.some(domain => lowerUrl.includes(domain));
    
    return hasImageExtension || hasImageKeywords || hasImageDomain;
  }

}

/**
 * Sleep utility for delays
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Multiple CORS proxy options - Updated with working proxies
 */
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://cors-anywhere.herokuapp.com/',
  'https://thingproxy.freeboard.io/fetch/',
  'https://cors.bridged.cc/',
  'https://api.codetabs.com/v1/proxy?quest='
];

/**
 * Enhanced fetch with retry logic and multiple proxy fallbacks
 */
async function fetchWithRetry(url: string, maxRetries: number = 3): Promise<Response> {
  const headers = {
    'Accept': 'application/xml, text/xml, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  // Try direct fetch first
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`Direct fetch attempt ${attempt + 1}/${maxRetries} for: ${url}`);
      const response = await fetch(url, {
        method: 'GET',
        headers,
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
      
      if (response.ok) {
        console.log('Direct fetch successful!');
        return response;
      }
      
      console.warn(`Direct fetch failed with status: ${response.status}`);
    } catch (error) {
      console.warn(`Direct fetch attempt ${attempt + 1} failed:`, error);
    }
    
    // Wait before retry (exponential backoff)
    if (attempt < maxRetries - 1) {
      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
      console.log(`Waiting ${delay}ms before retry...`);
      await sleep(delay);
    }
  }

  // If direct fetch fails, try CORS proxies
  console.log('Direct fetch failed, trying CORS proxies...');
  
  for (const proxy of CORS_PROXIES) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const proxyUrl = proxy + encodeURIComponent(url);
        console.log(`CORS proxy attempt ${attempt + 1}/${maxRetries} with: ${proxy}`);
        
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers,
          signal: AbortSignal.timeout(20000) // 20 second timeout for proxies
        });
        
        if (response.ok) {
          console.log(`CORS proxy successful with: ${proxy}`);
          return response;
        }
        
        console.warn(`CORS proxy failed with status: ${response.status}`);
      } catch (error) {
        console.warn(`CORS proxy attempt ${attempt + 1} failed with ${proxy}:`, error);
      }
      
      // Wait before retry
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        await sleep(delay);
      }
    }
  }

  throw new Error('All fetch attempts failed. Please try again or paste the XML content directly.');
}

/**
 * Fetches XML content from URL and parses it
 */
export async function fetchAndParseXMLFeed(url: string, onProgress?: (current: number, total: number, imagesFound: number) => void, onInitialScope?: (products: number, images: number) => void): Promise<ParsedFeed> {
  try {
    const response = await fetchWithRetry(url);

    const xmlContent = await response.text();
    
    // Check if we got an error page instead of XML
    if (xmlContent.includes('<!DOCTYPE html>') || xmlContent.includes('<html')) {
      throw new Error('Received HTML instead of XML. The URL might not be a valid XML feed.');
    }
    
    const parser = new XMLFeedParser(xmlContent);
    
    // Get initial scope and report it
    if (onInitialScope) {
      const scope = parser.getInitialScope();
      onInitialScope(scope.products, scope.images);
    }
    
    return parser.parseProducts(onProgress);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error('CORS Error: Cannot fetch XML feed directly. Please try again or paste the feed content directly into the XML content field instead.');
    }
    throw new Error(`Failed to fetch and parse XML feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Downloads an image from URL with improved error handling and Mac compatibility
 */
export async function downloadImage(url: string, filename: string): Promise<void> {
  try {
    // Clean and validate URL
    const cleanUrl = url.trim();
    if (!cleanUrl) {
      throw new Error('Empty URL provided');
    }

    // Try to create a valid URL object
    let validUrl: URL;
    try {
      validUrl = new URL(cleanUrl);
    } catch {
      throw new Error(`Invalid URL format: ${cleanUrl}`);
    }

    // Enhanced headers for better compatibility (including Mac Safari)
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'image',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'cross-site'
    };

    const response = await fetch(validUrl.toString(), {
      method: 'GET',
      headers,
      mode: 'cors',
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Check if the response is actually an image
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.startsWith('image/')) {
      throw new Error(`Expected image, got ${contentType}`);
    }

    const blob = await response.blob();
    
    // Validate blob size (max 50MB)
    if (blob.size > 50 * 1024 * 1024) {
      throw new Error('Image too large (max 50MB)');
    }

    // Mac-compatible download approach
    await downloadBlobAsFile(blob, filename, contentType || 'image/jpeg');
  } catch (error) {
    throw new Error(`Failed to download image "${filename}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Downloads a blob as a file with Mac compatibility (shared utility)
 */
const downloadBlobAsFile = async (blob: Blob, filename: string, mimeType: string): Promise<void> => {
  // Detect if we're on Mac/Safari
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  // Sanitize filename for Mac compatibility
  const sanitizedFilename = filename
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 255);
  
  if (isMac && isSafari) {
    // Safari on Mac requires a different approach
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = sanitizedFilename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      // Fallback: try opening in new window
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  } else {
    // Standard approach for other browsers
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizedFilename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Downloads multiple images as a ZIP file with organized folder structure
 */
export async function downloadImagesAsZip(
  images: { url: string; filename: string; productTitle?: string }[],
  options: { 
    createFolderStructure?: boolean;
    groupByProduct?: boolean;
    customFolderName?: string;
  } = {}
): Promise<void> {
  if (!images || images.length === 0) {
    throw new Error('No images to download');
  }

  const {
    createFolderStructure = true,
    groupByProduct = true,
    customFolderName
  } = options;

  const results = {
    successful: 0,
    failed: 0,
    errors: [] as string[],
    files: [] as Array<{ name: string; blob: Blob; folder?: string }>
  };

  console.log(`Starting download of ${images.length} images...`);

  // Download all images first
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    try {
      console.log(`Downloading ${i + 1}/${images.length}: ${image.filename}`);
      
      // Fetch the image as blob
      const response = await fetch(image.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.startsWith('image/')) {
        throw new Error(`Expected image, got ${contentType}`);
      }

      const blob = await response.blob();
      
      // Validate blob size (max 50MB)
      if (blob.size > 50 * 1024 * 1024) {
        throw new Error('Image too large (max 50MB)');
      }

      // Determine folder structure
      let folder: string | undefined;
      if (createFolderStructure && groupByProduct && image.productTitle) {
        folder = sanitizeProductTitleForFolder(image.productTitle);
      } else if (createFolderStructure && customFolderName) {
        folder = customFolderName;
      }

      results.files.push({
        name: image.filename,
        blob: blob,
        folder: folder
      });
      results.successful++;
      
      // Add a small delay to prevent overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      results.failed++;
      const errorMessage = `Failed to download ${image.filename}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      results.errors.push(errorMessage);
      console.warn(errorMessage);
    }
  }

  // Report results
  console.log(`Download completed: ${results.successful} successful, ${results.failed} failed`);
  
  if (results.files.length === 0) {
    throw new Error('No images were successfully downloaded');
  }

  // Create ZIP file with organized structure
  try {
    const { downloadMultipleFilesAsZip } = await import('./zipDownload');
    const now = new Date();
    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const time = now.toTimeString().slice(0, 5); // HH:MM
    const zipFilename = `FileConverterBuddyDownload - ${date} ${time}.zip`;
    await downloadMultipleFilesAsZip(results.files, zipFilename, createFolderStructure);
    
    if (results.failed > 0) {
      const errorSummary = results.errors.slice(0, 3).join('; ');
      const moreErrors = results.errors.length > 3 ? ` and ${results.errors.length - 3} more errors` : '';
      console.warn(`ZIP created with ${results.successful} images. Some images failed: ${errorSummary}${moreErrors}`);
    }
  } catch (error) {
    throw new Error(`Failed to create ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Sanitizes product title for use as folder name
 */
const sanitizeProductTitleForFolder = (title: string): string => {
  return title
    .replace(/[<>:"/\\|?*]/g, '_') // Replace invalid characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 50); // Limit folder name length
};
