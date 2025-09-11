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
 * Universal Product Feed Parser - Handles ANY feed format
 * Supports: RSS, XML, JSON, CSV, HTML, and custom formats
 */
export class XMLFeedParser {
  private xmlContent: string;
  private feedType: 'xml' | 'json' | 'csv' | 'html' | 'unknown' = 'unknown';

  constructor(xmlContent: string) {
    this.xmlContent = xmlContent;
    this.detectFeedType();
  }

  /**
   * Detect the type of feed we're dealing with
   */
  private detectFeedType(): void {
    const content = this.xmlContent.trim();
    
    if (content.startsWith('{') || content.startsWith('[')) {
      this.feedType = 'json';
    } else if (content.includes('<') && content.includes('>')) {
      this.feedType = 'xml';
    } else if (content.includes(',') && content.includes('\n')) {
      this.feedType = 'csv';
    } else if (content.includes('<html') || content.includes('<!DOCTYPE')) {
      this.feedType = 'html';
    } else {
      this.feedType = 'unknown';
    }
    
    console.log(`Detected feed type: ${this.feedType}`);
  }

  /**
   * Universal scope detection - works with any feed format
   */
  public getInitialScope(): { products: number; images: number } {
    let products = 0;
    let images = 0;

    switch (this.feedType) {
      case 'xml':
        products = this.detectXMLProducts();
        images = this.detectXMLImages();
        break;
      case 'json':
        products = this.detectJSONProducts();
        images = this.detectJSONImages();
        break;
      case 'csv':
        products = this.detectCSVProducts();
        images = this.detectCSVImages();
        break;
      case 'html':
        products = this.detectHTMLProducts();
        images = this.detectHTMLImages();
        break;
      default:
        // Fallback: try all detection methods
        products = Math.max(
          this.detectXMLProducts(),
          this.detectJSONProducts(),
          this.detectCSVProducts(),
          this.detectHTMLProducts(),
          this.detectGenericProducts()
        );
        images = Math.max(
          this.detectXMLImages(),
          this.detectJSONImages(),
          this.detectCSVImages(),
          this.detectHTMLImages(),
          this.detectGenericImages()
        );
    }

    return { products, images };
  }

  /**
   * Universal product parsing - works with any feed format
   */
  public parseProducts(onProgress?: (current: number, total: number, imagesFound: number) => void): ParsedFeed {
    let products: Product[] = [];
    let totalImagesFound = 0;

    switch (this.feedType) {
      case 'xml':
        products = this.parseXMLProducts(onProgress);
        break;
      case 'json':
        products = this.parseJSONProducts(onProgress);
        break;
      case 'csv':
        products = this.parseCSVProducts(onProgress);
        break;
      case 'html':
        products = this.parseHTMLProducts(onProgress);
        break;
      default:
        // Try all parsing methods and combine results
        products = this.parseUniversalProducts(onProgress);
    }

    // Sort products alphabetically by title
    products = products.sort((a, b) => {
      const titleA = a.title.toLowerCase().trim();
      const titleB = b.title.toLowerCase().trim();
      return titleA.localeCompare(titleB);
    });

    // Count total images
    totalImagesFound = products.reduce((sum, product) => sum + product.images.length, 0);

    // Final progress update
    if (onProgress) {
      onProgress(products.length, products.length, totalImagesFound);
    }

    return {
      products,
      totalCount: products.length,
      feedTitle: 'Product Feed',
      feedDescription: `Parsed from ${this.feedType} content`
    };
  }

  // XML Detection Methods
  private detectXMLProducts(): number {
    const patterns = [
      /<item[^>]*>/gi,
      /<product[^>]*>/gi,
      /<entry[^>]*>/gi,
      /<rss:item[^>]*>/gi,
      /<atom:entry[^>]*>/gi
    ];
    
    let count = 0;
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) count += matches.length;
    });
    
    return count;
  }

  private detectXMLImages(): number {
    const patterns = [
      /<g:image_link[^>]*>/gi,
      /<g:additional_image_link[^>]*>/gi,
      /<image_link[^>]*>/gi,
      /<image[^>]*>/gi,
      /\.jpeg/gi,
      /\.jpg/gi,
      /\.png/gi,
      /\.gif/gi,
      /\.webp/gi,
      /\/assets\/img\//gi,
      /\/images\//gi,
      /\/media\//gi
    ];
    
    let count = 0;
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) count += matches.length;
    });
    
    return count;
  }

  // JSON Detection Methods
  private detectJSONProducts(): number {
    try {
      const data = JSON.parse(this.xmlContent);
      
      // Try different JSON structures
      if (Array.isArray(data)) {
        return data.length;
      } else if (data.products && Array.isArray(data.products)) {
        return data.products.length;
      } else if (data.items && Array.isArray(data.items)) {
        return data.items.length;
      } else if (data.entries && Array.isArray(data.entries)) {
        return data.entries.length;
      }
      
      return 0;
    } catch {
      return 0;
    }
  }

  private detectJSONImages(): number {
    try {
      const data = JSON.parse(this.xmlContent);
      const jsonString = JSON.stringify(data);
      
      const patterns = [
        /\.jpeg/gi,
        /\.jpg/gi,
        /\.png/gi,
        /\.gif/gi,
        /\.webp/gi,
        /"image"/gi,
        /"photo"/gi,
        /"picture"/gi
      ];
      
      let count = 0;
      patterns.forEach(pattern => {
        const matches = jsonString.match(pattern);
        if (matches) count += matches.length;
      });
      
      return count;
    } catch {
      return 0;
    }
  }

  // CSV Detection Methods
  private detectCSVProducts(): number {
    const lines = this.xmlContent.split('\n').filter(line => line.trim());
    return Math.max(0, lines.length - 1); // Subtract header row
  }

  private detectCSVImages(): number {
    const patterns = [
      /\.jpeg/gi,
      /\.jpg/gi,
      /\.png/gi,
      /\.gif/gi,
      /\.webp/gi
    ];
    
    let count = 0;
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) count += matches.length;
    });
    
    return count;
  }

  // HTML Detection Methods
  private detectHTMLProducts(): number {
    const patterns = [
      /<div[^>]*class[^>]*product[^>]*>/gi,
      /<article[^>]*class[^>]*product[^>]*>/gi,
      /<section[^>]*class[^>]*product[^>]*>/gi,
      /<li[^>]*class[^>]*product[^>]*>/gi,
      /product[^:]*:\s*[^\n\r<]+/gi
    ];
    
    let count = 0;
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) count += matches.length;
    });
    
    return count;
  }

  private detectHTMLImages(): number {
    const patterns = [
      /<img[^>]*src[^>]*>/gi,
      /<picture[^>]*>/gi,
      /\.jpeg/gi,
      /\.jpg/gi,
      /\.png/gi,
      /\.gif/gi,
      /\.webp/gi
    ];
    
    let count = 0;
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) count += matches.length;
    });
    
    return count;
  }

  // Generic Detection Methods (fallback)
  private detectGenericProducts(): number {
    const patterns = [
      /https?:\/\/[^\s<>"']+\/produkt\/[^\s<>"']*/gi,
      /https?:\/\/[^\s<>"']+\/product\/[^\s<>"']*/gi,
      /https?:\/\/[^\s<>"']+\/item\/[^\s<>"']*/gi,
      /product[^:]*:\s*[^\n\r<]+/gi,
      /item[^:]*:\s*[^\n\r<]+/gi
    ];
    
    let count = 0;
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) count += matches.length;
    });
    
    return count;
  }

  private detectGenericImages(): number {
    const patterns = [
      /https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|tif)(?:\?[^\s<>"']*)?/gi,
      /\/assets\/img\//gi,
      /\/images\//gi,
      /\/media\//gi,
      /\/photos\//gi,
      /\/pictures\//gi
    ];
    
    let count = 0;
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) count += matches.length;
    });
    
    return count;
  }

  // Parsing Methods
  private parseXMLProducts(onProgress?: (current: number, total: number, imagesFound: number) => void): Product[] {
    const products: Product[] = [];
    const productMap = new Map<string, Product>();
    
    // Try multiple XML parsing strategies
    const strategies = [
      () => this.xmlContent.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [],
      () => this.xmlContent.match(/<product[^>]*>[\s\S]*?<\/product>/gi) || [],
      () => this.xmlContent.match(/<entry[^>]*>[\s\S]*?<\/entry>/gi) || [],
      () => this.extractFromContent() // Fallback
    ];
    
    let itemMatches: string[] = [];
    for (const strategy of strategies) {
      itemMatches = strategy();
      if (itemMatches.length > 0) {
        console.log(`Found ${itemMatches.length} items using XML strategy`);
        break;
      }
    }
    
    let totalImagesFound = 0;
    
    for (let index = 0; index < itemMatches.length; index++) {
      const itemContent = itemMatches[index];
      
      try {
        const product = this.extractProductFromContent(itemContent, index);
        if (product && product.title) {
          totalImagesFound += product.images.length;
          
          if (onProgress && (index + 1) % 10 === 0) {
            onProgress(index + 1, itemMatches.length, totalImagesFound);
          }
          
          const productKey = product.title.trim().toLowerCase();
          if (productMap.has(productKey)) {
            const existingProduct = productMap.get(productKey)!;
            const newImages = product.images.filter(newImage => 
              !existingProduct.images.some(existingImage => existingImage.url === newImage.url)
            );
            existingProduct.images.push(...newImages);
          } else {
            productMap.set(productKey, product);
          }
        }
      } catch (error) {
        console.warn(`Failed to parse XML product at index ${index}:`, error);
      }
    }
    
    return Array.from(productMap.values());
  }

  private parseJSONProducts(onProgress?: (current: number, total: number, imagesFound: number) => void): Product[] {
    try {
      const data = JSON.parse(this.xmlContent);
      const products: Product[] = [];
      
      let items: any[] = [];
      
      // Try different JSON structures
      if (Array.isArray(data)) {
        items = data;
      } else if (data.products && Array.isArray(data.products)) {
        items = data.products;
      } else if (data.items && Array.isArray(data.items)) {
        items = data.items;
      } else if (data.entries && Array.isArray(data.entries)) {
        items = data.entries;
      }
      
      let totalImagesFound = 0;
      
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        
        try {
          const product = this.extractProductFromJSON(item, index);
          if (product && product.title) {
            totalImagesFound += product.images.length;
            
            if (onProgress && (index + 1) % 10 === 0) {
              onProgress(index + 1, items.length, totalImagesFound);
            }
            
            products.push(product);
          }
        } catch (error) {
          console.warn(`Failed to parse JSON product at index ${index}:`, error);
        }
      }
      
      return products;
    } catch (error) {
      console.warn('Failed to parse JSON:', error);
      return [];
    }
  }

  private parseCSVProducts(onProgress?: (current: number, total: number, imagesFound: number) => void): Product[] {
    const lines = this.xmlContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const products: Product[] = [];
    
    let totalImagesFound = 0;
    
    for (let index = 1; index < lines.length; index++) {
      const line = lines[index];
      const values = line.split(',').map(v => v.trim());
      
      try {
        const product = this.extractProductFromCSV(headers, values, index);
        if (product && product.title) {
          totalImagesFound += product.images.length;
          
          if (onProgress && (index + 1) % 10 === 0) {
            onProgress(index + 1, lines.length, totalImagesFound);
          }
          
          products.push(product);
        }
      } catch (error) {
        console.warn(`Failed to parse CSV product at index ${index}:`, error);
      }
    }
    
    return products;
  }

  private parseHTMLProducts(onProgress?: (current: number, total: number, imagesFound: number) => void): Product[] {
    const products: Product[] = [];
    
    // Extract product sections from HTML
    const productSections = this.extractHTMLProductSections();
    
    let totalImagesFound = 0;
    
    for (let index = 0; index < productSections.length; index++) {
      const section = productSections[index];
      
      try {
        const product = this.extractProductFromContent(section, index);
        if (product && product.title) {
          totalImagesFound += product.images.length;
          
          if (onProgress && (index + 1) % 10 === 0) {
            onProgress(index + 1, productSections.length, totalImagesFound);
          }
          
          products.push(product);
        }
      } catch (error) {
        console.warn(`Failed to parse HTML product at index ${index}:`, error);
      }
    }
    
    return products;
  }

  private parseUniversalProducts(onProgress?: (current: number, total: number, imagesFound: number) => void): Product[] {
    // Try all parsing methods and combine results
    const xmlProducts = this.parseXMLProducts();
    const jsonProducts = this.parseJSONProducts();
    const csvProducts = this.parseCSVProducts();
    const htmlProducts = this.parseHTMLProducts();
    
    // Combine and deduplicate
    const allProducts = [...xmlProducts, ...jsonProducts, ...csvProducts, ...htmlProducts];
    const productMap = new Map<string, Product>();
    
    allProducts.forEach(product => {
      const key = product.title.trim().toLowerCase();
      if (productMap.has(key)) {
        const existing = productMap.get(key)!;
        const newImages = product.images.filter(newImage => 
          !existing.images.some(existingImage => existingImage.url === newImage.url)
        );
        existing.images.push(...newImages);
      } else {
        productMap.set(key, product);
      }
    });
    
    return Array.from(productMap.values());
  }

  // Helper Methods
  private extractFromContent(): string[] {
    const items: string[] = [];
    
    // Look for product URLs and extract surrounding content
    const productUrlPattern = /https?:\/\/[^\s<>"']+\/(produkt|product|item)\/[^\s<>"']*/gi;
    const productUrls = this.xmlContent.match(productUrlPattern) || [];
    
    if (productUrls.length > 0) {
      productUrls.forEach((url) => {
        const urlIndex = this.xmlContent.indexOf(url);
        if (urlIndex !== -1) {
          const start = Math.max(0, urlIndex - 500);
          const end = Math.min(this.xmlContent.length, urlIndex + 500);
          const chunk = this.xmlContent.substring(start, end);
          items.push(chunk);
        }
      });
    } else {
      // Fallback: split by image URLs
      const imagePattern = /https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp)/gi;
      const imageUrls = this.xmlContent.match(imagePattern) || [];
      
      imageUrls.forEach((url) => {
        const urlIndex = this.xmlContent.indexOf(url);
        if (urlIndex !== -1) {
          const start = Math.max(0, urlIndex - 300);
          const end = Math.min(this.xmlContent.length, urlIndex + 300);
          const chunk = this.xmlContent.substring(start, end);
          items.push(chunk);
        }
      });
    }
    
    return items;
  }

  private extractHTMLProductSections(): string[] {
    const sections: string[] = [];
    
    const patterns = [
      /<div[^>]*class[^>]*product[^>]*>[\s\S]*?<\/div>/gi,
      /<article[^>]*class[^>]*product[^>]*>[\s\S]*?<\/article>/gi,
      /<section[^>]*class[^>]*product[^>]*>[\s\S]*?<\/section>/gi,
      /<li[^>]*class[^>]*product[^>]*>[\s\S]*?<\/li>/gi
    ];
    
    patterns.forEach(pattern => {
      const matches = this.xmlContent.match(pattern);
      if (matches) {
        sections.push(...matches);
      }
    });
    
    return sections;
  }

  private extractProductFromContent(content: string, index: number): Product | null {
    // Universal product extraction that works with any format
    const title = this.extractTitle(content);
    if (!title) return null;

    const description = this.extractDescription(content);
    const brand = this.extractBrand(content);
    const price = this.extractPrice(content);
    const productUrl = this.extractProductUrl(content);
    const images = this.extractImages(content);

    return {
      id: `product_${index}`,
      title,
      description,
      brand,
      price,
      currency: '',
      availability: 'in_stock',
      condition: 'new',
      gender: '',
      ageGroup: '',
      size: '',
      color: '',
      material: '',
      category: '',
      images,
      productUrl,
      gtin: '',
      mpn: '',
      weight: ''
    };
  }

  private extractProductFromJSON(item: any, index: number): Product | null {
    const title = this.extractTitleFromJSON(item);
    if (!title) return null;

    const description = this.extractDescriptionFromJSON(item);
    const brand = this.extractBrandFromJSON(item);
    const price = this.extractPriceFromJSON(item);
    const productUrl = this.extractProductUrlFromJSON(item);
    const images = this.extractImagesFromJSON(item);

    return {
      id: `product_${index}`,
      title,
      description,
      brand,
      price,
      currency: '',
      availability: 'in_stock',
      condition: 'new',
      gender: '',
      ageGroup: '',
      size: '',
      color: '',
      material: '',
      category: '',
      images,
      productUrl,
      gtin: '',
      mpn: '',
      weight: ''
    };
  }

  private extractProductFromCSV(headers: string[], values: string[], index: number): Product | null {
    const titleIndex = headers.findIndex(h => h.includes('title') || h.includes('name'));
    if (titleIndex === -1 || !values[titleIndex]) return null;

    const title = values[titleIndex];
    const description = this.getCSVValue(headers, values, ['description', 'desc', 'summary']);
    const brand = this.getCSVValue(headers, values, ['brand', 'manufacturer', 'maker']);
    const price = this.getCSVValue(headers, values, ['price', 'cost', 'amount']);
    const productUrl = this.getCSVValue(headers, values, ['url', 'link', 'href']);
    const images = this.extractImagesFromCSV(headers, values);

    return {
      id: `product_${index}`,
      title,
      description,
      brand,
      price,
      currency: '',
      availability: 'in_stock',
      condition: 'new',
      gender: '',
      ageGroup: '',
      size: '',
      color: '',
      material: '',
      category: '',
      images,
      productUrl,
      gtin: '',
      mpn: '',
      weight: ''
    };
  }

  // Universal extraction methods
  private extractTitle(content: string): string {
    const patterns = [
      // XML tag patterns
      /<title[^>]*>([^<]+)<\/title>/i,
      /<g:title[^>]*>([^<]+)<\/g:title>/i,
      /<name[^>]*>([^<]+)<\/name>/i,
      /<product_name[^>]*>([^<]+)<\/product_name>/i,
      /<item_title[^>]*>([^<]+)<\/item_title>/i,
      /<product_title[^>]*>([^<]+)<\/product_title>/i,
      
      // Key-value patterns
      /product[^:]*:\s*([^\n\r<]+)/i,
      /title[^:]*:\s*([^\n\r<]+)/i,
      /name[^:]*:\s*([^\n\r<]+)/i,
      /item[^:]*:\s*([^\n\r<]+)/i,
      
      // URL-based extraction (for Vivibene and similar)
      /https?:\/\/[^\s<>"']+\/(produkt|product|item)\/([^\/\s<>"']+)/i,
      
      // Generic product name patterns
      /"name"\s*:\s*"([^"]+)"/i,
      /"title"\s*:\s*"([^"]+)"/i,
      /"product_name"\s*:\s*"([^"]+)"/i
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        let title = match[1] || match[2] || match[0];
        
        // Clean up the title
        title = title
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim();
        
        // Skip generic or malformed titles
        if (title && 
            title.length > 2 && 
            !title.includes('google_product_category') &&
            !title.includes('//') &&
            !title.startsWith('<') &&
            !title.endsWith('>')) {
          return title;
        }
      }
    }

    // Try to extract from URL as last resort
    const urlMatch = content.match(/https?:\/\/[^\s<>"']+\/(produkt|product|item)\/([^\/\s<>"']+)/i);
    if (urlMatch) {
      return urlMatch[2]
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim();
    }

    return '';
  }

  private extractDescription(content: string): string {
    const patterns = [
      /<description[^>]*>([^<]+)<\/description>/i,
      /<g:description[^>]*>([^<]+)<\/g:description>/i,
      /<summary[^>]*>([^<]+)<\/summary>/i,
      /<content[^>]*>([^<]+)<\/content>/i,
      /description[^:]*:\s*([^\n\r<]+)/i,
      /summary[^:]*:\s*([^\n\r<]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return '';
  }

  private extractBrand(content: string): string {
    const patterns = [
      // XML tag patterns - these should work correctly
      /<g:brand[^>]*>([^<]+)<\/g:brand>/i,
      /<brand[^>]*>([^<]+)<\/brand>/i,
      /<manufacturer[^>]*>([^<]+)<\/manufacturer>/i,
      /<maker[^>]*>([^<]+)<\/maker>/i,
      /<vendor[^>]*>([^<]+)<\/vendor>/i,
      
      // Key-value patterns - improved to avoid capturing the word "brand"
      /brand[^:]*:\s*([^\n\r<,;]+)/i,
      /manufacturer[^:]*:\s*([^\n\r<,;]+)/i,
      /maker[^:]*:\s*([^\n\r<,;]+)/i,
      /vendor[^:]*:\s*([^\n\r<,;]+)/i,
      
      // JSON patterns
      /"brand"\s*:\s*"([^"]+)"/i,
      /"manufacturer"\s*:\s*"([^"]+)"/i,
      /"maker"\s*:\s*"([^"]+)"/i,
      /"vendor"\s*:\s*"([^"]+)"/i
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        let brand = match[1].trim();
        
        // Clean up the brand name
        brand = brand
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim();
        
        // Skip if it's just the word "brand" or other generic terms
        if (brand && 
            brand.length > 2 && 
            !brand.toLowerCase().includes('brand') &&
            !brand.toLowerCase().includes('manufacturer') &&
            !brand.toLowerCase().includes('maker') &&
            !brand.toLowerCase().includes('vendor') &&
            !brand.includes('<') &&
            !brand.includes('>') &&
            !brand.includes('//')) {
          return brand;
        }
      }
    }
    
    return '';
  }

  private extractPrice(content: string): string {
    const patterns = [
      /<g:price[^>]*>([^<]+)<\/g:price>/i,
      /<price[^>]*>([^<]+)<\/price>/i,
      /<cost[^>]*>([^<]+)<\/cost>/i,
      /(\d+[\.,]\d+)\s*(NOK|USD|EUR|GBP|\$|€|£|kr)/i,
      /price[^:]*:\s*([^\n\r<]+)/i,
      /cost[^:]*:\s*([^\n\r<]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return '';
  }

  private extractProductUrl(content: string): string {
    const patterns = [
      /<link[^>]*>([^<]+)<\/link>/i,
      /<g:link[^>]*>([^<]+)<\/g:link>/i,
      /<url[^>]*>([^<]+)<\/url>/i,
      /https?:\/\/[^\s<>"']+\/(produkt|product|item)\/[^\s<>"']*/i
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return (match[1] || match[0]).trim();
      }
    }
    
    return '';
  }

  private extractImages(content: string): ProductImage[] {
    const images: ProductImage[] = [];
    
    // Universal image extraction patterns
    const patterns = [
      // XML formats
      /<g:image_link[^>]*>([^<]+)<\/g:image_link>/gi,
      /<g:additional_image_link[^>]*>([^<]+)<\/g:additional_image_link>/gi,
      /<image_link[^>]*>([^<]+)<\/image_link>/gi,
      /<image[^>]*>([^<]+)<\/image>/gi,
      /<img[^>]*src=["']([^"']+)["'][^>]*>/gi,
      
      // Direct URL patterns
      /https?:\/\/[^\s<>"']+\/assets\/img\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp)/gi,
      /https?:\/\/[^\s<>"']+\/images\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp)/gi,
      /https?:\/\/[^\s<>"']+\/media\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp)/gi,
      /https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp)(?:\?[^\s<>"']*)?/gi
    ];
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          let url = '';
          
          if (pattern.source.includes('src=')) {
            const urlMatch = match.match(/src=["']([^"']+)["']/i);
            url = urlMatch ? urlMatch[1] : '';
          } else if (pattern.source.includes('https?:')) {
            url = match;
          } else {
            const contentMatch = match.match(/>([^<]+)</i);
            url = contentMatch ? contentMatch[1] : '';
          }
          
          if (url && this.isValidImageUrl(url)) {
            url = decodeURIComponent(url.trim());
            if (!images.some(img => img.url === url)) {
              images.push({
                url,
                alt: `Product Image ${images.length + 1}`
              });
            }
          }
        });
      }
    });

    return images;
  }

  // JSON-specific extraction methods
  private extractTitleFromJSON(item: any): string {
    return item.title || item.name || item.product_name || item.label || '';
  }

  private extractDescriptionFromJSON(item: any): string {
    return item.description || item.desc || item.summary || item.content || '';
  }

  private extractBrandFromJSON(item: any): string {
    return item.brand || item.manufacturer || item.maker || item.vendor || '';
  }

  private extractPriceFromJSON(item: any): string {
    return item.price || item.cost || item.amount || item.value || '';
  }

  private extractProductUrlFromJSON(item: any): string {
    return item.url || item.link || item.href || item.product_url || '';
  }

  private extractImagesFromJSON(item: any): ProductImage[] {
    const images: ProductImage[] = [];
    
    // Try different image field names
    const imageFields = [
      'image', 'images', 'image_url', 'image_urls', 'photo', 'photos',
      'picture', 'pictures', 'media', 'media_urls', 'gallery'
    ];
    
    imageFields.forEach(field => {
      if (item[field]) {
        if (Array.isArray(item[field])) {
          item[field].forEach((url: string) => {
            if (this.isValidImageUrl(url)) {
              images.push({ url, alt: `Product Image ${images.length + 1}` });
            }
          });
        } else if (typeof item[field] === 'string' && this.isValidImageUrl(item[field])) {
          images.push({ url: item[field], alt: `Product Image ${images.length + 1}` });
        }
      }
    });
    
    return images;
  }

  // CSV-specific extraction methods
  private getCSVValue(headers: string[], values: string[], possibleHeaders: string[]): string {
    for (const possibleHeader of possibleHeaders) {
      const index = headers.findIndex(h => h.includes(possibleHeader));
      if (index !== -1 && values[index]) {
        return values[index];
      }
    }
    return '';
  }

  private extractImagesFromCSV(headers: string[], values: string[]): ProductImage[] {
    const images: ProductImage[] = [];
    
    const imageHeaders = ['image', 'images', 'photo', 'photos', 'picture', 'pictures', 'media'];
    
    imageHeaders.forEach(header => {
      const index = headers.findIndex(h => h.includes(header));
      if (index !== -1 && values[index]) {
        const urls = values[index].split(';').map(url => url.trim());
        urls.forEach(url => {
          if (this.isValidImageUrl(url)) {
            images.push({ url, alt: `Product Image ${images.length + 1}` });
          }
        });
      }
    });
    
    return images;
  }

  private isValidImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    const cleanUrl = url.trim();
    if (!cleanUrl) return false;
    
    try {
      new URL(cleanUrl);
    } catch {
      return false;
    }
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.tif'];
    const lowerUrl = cleanUrl.toLowerCase();
    
    const hasImageExtension = imageExtensions.some(ext => lowerUrl.includes(ext));
    const hasImageKeywords = lowerUrl.includes('image') || lowerUrl.includes('photo') || 
                            lowerUrl.includes('picture') || lowerUrl.includes('img') || 
                            lowerUrl.includes('media') || lowerUrl.includes('assets');
    const hasImagePattern = lowerUrl.includes('/assets/img/') || lowerUrl.includes('/images/') || 
                           lowerUrl.includes('/media/') || lowerUrl.includes('cdn.') || 
                           lowerUrl.includes('static.') || lowerUrl.includes('amazonaws.com');
    
    return hasImageExtension || hasImageKeywords || hasImagePattern;
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
