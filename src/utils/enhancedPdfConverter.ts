/**
 * Enhanced PDF conversion utilities with better image and text handling
 * Similar to Adobe's seamless PDF to Word conversion
 */

import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';

// Set up the worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface EnhancedPDFConversionOptions {
  pageNumber?: number;
  quality?: number;
  includeImages?: boolean;
  preserveLayout?: boolean;
  extractTables?: boolean;
}

/**
 * Enhanced PDF to Word conversion with better image and text handling
 */
export const convertPDFToWordEnhanced = async (
  pdfFile: File, 
  options: EnhancedPDFConversionOptions = {}
): Promise<Blob> => {
  const {
    includeImages = true,
    preserveLayout = true,
    extractTables = true,
    quality = 0.8
  } = options;

  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    const children: any[] = [];
    
    // Add title
    children.push(
      new Paragraph({
        text: `Converted PDF: ${pdfFile.name}`,
        heading: HeadingLevel.HEADING_1,
        spacing: {
          after: 400,
          before: 200
        }
      })
    );
    
    // Process each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
      
      // Extract text content
      const textContent = await page.getTextContent();
      const textItems = textContent.items;
      
      // Process text content with better layout preservation
      const processedContent = await processPageContent(textItems, preserveLayout, extractTables);
      children.push(...processedContent);
      
      // Add page break (except for last page)
      if (pageNum < pdf.numPages) {
        children.push(
          new Paragraph({
            text: '',
            pageBreakBefore: true
          })
        );
      }
    }
    
    // Add footer
    children.push(
      new Paragraph({
        text: 'Converted using File Converter Buddy - Enhanced PDF to Word',
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 200,
          before: 400
        }
      })
    );
    
    // Create the document
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            size: {
              width: 11906, // A4 width in twips
              height: 16838  // A4 height in twips
            },
            margin: {
              top: 1440,    // 1 inch
              right: 1440,  // 1 inch
              bottom: 1440, // 1 inch
              left: 1440    // 1 inch
            }
          }
        },
        children: children
      }]
    });
    
    // Pack the document
    const buffer = await Packer.toBuffer(doc);
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
  } catch (error) {
    console.error('Error in enhanced PDF to Word conversion:', error);
    
    // Fallback to simple text conversion
    const text = await extractTextFromPDF(pdfFile);
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: `PDF Conversion Error: ${pdfFile.name}`,
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: 'The PDF could not be converted with enhanced formatting. Here is the extracted text:'
          }),
          new Paragraph({
            text: text
          })
        ]
      }]
    });
    
    const buffer = await Packer.toBuffer(doc);
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }
};

/**
 * Process page content combining text with better layout preservation
 */
const processPageContent = async (
  textItems: any[], 
  preserveLayout: boolean,
  extractTables: boolean
): Promise<any[]> => {
  const children: any[] = [];
  
  // Group text items by position to detect tables and layout
  const textGroups = groupTextByPosition(textItems);
  
  // Process each text group
  for (const group of textGroups) {
    if (extractTables && isTableGroup(group)) {
      // Create table
      const table = createTableFromGroup(group);
      if (table) children.push(table);
    } else {
      // Create paragraph with better formatting
      const paragraph = createEnhancedParagraphFromGroup(group, preserveLayout);
      if (paragraph) children.push(paragraph);
    }
  }
  
  return children;
};

/**
 * Group text items by their position for better layout detection
 */
const groupTextByPosition = (textItems: any[]): any[][] => {
  const groups: any[][] = [];
  let currentGroup: any[] = [];
  let lastY = -1;
  
  for (const item of textItems) {
    const y = item.transform[5]; // Y position
    
    if (Math.abs(y - lastY) > 5) { // New line
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    }
    
    currentGroup.push(item);
    lastY = y;
  }
  
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  
  return groups;
};

/**
 * Check if a text group represents a table
 */
const isTableGroup = (group: any[]): boolean => {
  if (group.length < 2) return false;
  
  // Check for tab-separated or space-aligned items
  const text = group.map(item => item.str).join(' ');
  const tabCount = (text.match(/\t/g) || []).length;
  const spaceCount = (text.match(/\s{3,}/g) || []).length;
  
  return tabCount > 0 || spaceCount > 0;
};

/**
 * Create table from text group
 */
const createTableFromGroup = (group: any[]): Table | null => {
  try {
    const text = group.map(item => item.str).join(' ');
    const cells = text.split(/\t|\s{3,}/).filter(cell => cell.trim());
    
    if (cells.length < 2) return null;
    
    const tableRow = new TableRow({
      children: cells.map(cell => 
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: cell.trim(),
                  size: 20
                })
              ]
            })
          ],
          width: {
            size: 100 / cells.length,
            type: WidthType.PERCENTAGE
          }
        })
      )
    });
    
    return new Table({
      rows: [tableRow],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE
      }
    });
  } catch (error) {
    console.warn('Failed to create table:', error);
    return null;
  }
};

/**
 * Create enhanced paragraph from text group with better formatting
 */
const createEnhancedParagraphFromGroup = (group: any[], preserveLayout: boolean): Paragraph | null => {
  try {
    const text = group.map(item => item.str).join(' ');
    
    if (!text.trim()) return null;
    
    // Detect if this might be a heading (larger font, bold, or specific patterns)
    const isHeading = detectHeading(group, text);
    
    if (isHeading) {
      return new Paragraph({
        children: [
          new TextRun({
            text: text,
            size: 28, // 14pt
            font: 'Calibri',
            bold: true
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: {
          after: 200,
          before: 300
        }
      });
    }
    
    // Regular paragraph with better spacing
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          size: 24, // 12pt
          font: 'Calibri'
        })
      ],
      spacing: {
        after: preserveLayout ? 120 : 200, // 6pt or 10pt
        before: 0
      }
    });
  } catch (error) {
    console.warn('Failed to create paragraph:', error);
    return null;
  }
};

/**
 * Detect if a text group is likely a heading
 */
const detectHeading = (group: any[], text: string): boolean => {
  // Check for common heading patterns
  const headingPatterns = [
    /^chapter\s+\d+/i,
    /^section\s+\d+/i,
    /^\d+\.\s+[A-Z]/,
    /^[A-Z][A-Z\s]{10,}$/,
    /^[IVX]+\.\s+[A-Z]/
  ];
  
  if (headingPatterns.some(pattern => pattern.test(text))) {
    return true;
  }
  
  // Check if text is short and all caps (likely heading)
  if (text.length < 50 && text === text.toUpperCase() && text.length > 3) {
    return true;
  }
  
  // Check font size if available
  if (group.length > 0 && group[0].height) {
    const avgHeight = group.reduce((sum, item) => sum + (item.height || 0), 0) / group.length;
    return avgHeight > 14; // Larger than normal text
  }
  
  return false;
};

/**
 * Extract text from PDF (fallback method)
 */
const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return 'Failed to extract text from PDF.';
  }
};
