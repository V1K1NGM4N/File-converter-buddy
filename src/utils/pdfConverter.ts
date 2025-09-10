/**
 * PDF conversion utilities using pdfjs-dist for real PDF processing
 */

import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';

// Set up the worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFConversionOptions {
  pageNumber?: number;
  quality?: number;
}

/**
 * Convert PDF to text using pdfjs-dist
 */
export const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine text items from the page
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += `Page ${pageNum}:\n${pageText}\n\n`;
    }
    
    return fullText.trim() || 'No text content found in PDF';
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return `Error extracting text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};

/**
 * Convert PDF to text file
 */
export const convertPDFToText = async (pdfFile: File): Promise<Blob> => {
  const text = await extractTextFromPDF(pdfFile);
  return new Blob([text], { type: 'text/plain' });
};

/**
 * Convert PDF to HTML
 */
export const convertPDFToHTML = async (pdfFile: File): Promise<Blob> => {
  const text = await extractTextFromPDF(pdfFile);
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Converted PDF: ${pdfFile.name}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            margin: 40px; 
            background-color: #f5f5f5;
        }
        .content { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        pre { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 5px; 
            border-left: 4px solid #007bff;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="content">
        <h1>PDF Content: ${pdfFile.name}</h1>
        <pre>${text}</pre>
    </div>
</body>
</html>`;
  
  return new Blob([html], { type: 'text/html' });
};

/**
 * Convert PDF to Markdown
 */
export const convertPDFToMarkdown = async (pdfFile: File): Promise<Blob> => {
  const text = await extractTextFromPDF(pdfFile);
  const markdown = `# PDF Content: ${pdfFile.name}

${text}

---
*Converted using File Converter Buddy*
`;
  
  return new Blob([markdown], { type: 'text/markdown' });
};

/**
 * Convert PDF to Word document (DOCX format) with proper formatting
 */
export const convertPDFToWord = async (pdfFile: File): Promise<Blob> => {
  try {
    const text = await extractTextFromPDF(pdfFile);
    
    // Create document structure
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
    
    // Split text into paragraphs and create Word document structure
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        // Check if it's a page header
        if (paragraph.startsWith('Page ')) {
          children.push(
            new Paragraph({
              text: paragraph,
              heading: HeadingLevel.HEADING_2,
              spacing: {
                after: 300,
                before: 400
              }
            })
          );
        } else {
          // Check if this might be a table row (contains multiple tab-separated or space-aligned items)
          const words = paragraph.split(/\s{2,}/); // Split on 2+ spaces
          if (words.length > 2 && words.every(word => word.length < 50)) {
            // This looks like a table row, create a table
            const tableRow = new TableRow({
              children: words.map(word => 
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: word.trim(),
                          size: 22, // 11pt
                          font: 'Calibri'
                        })
                      ]
                    })
                  ],
                  width: {
                    size: 2000,
                    type: WidthType.DXA
                  }
                })
              )
            });
            
                         // If this is the first table row, create a table
             if (!children.some(child => child instanceof Table)) {
               children.push(
                 new Table({
                   rows: [tableRow],
                   width: {
                     size: 100,
                     type: WidthType.PERCENTAGE
                   }
                 })
               );
             } else {
               // Add to existing table
               const existingTable = children.find(child => child instanceof Table);
               if (existingTable) {
                 (existingTable as any).rows.push(tableRow);
               }
             }
          } else {
            // Regular paragraph
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: paragraph,
                    size: 24, // 12pt
                    font: 'Calibri'
                  })
                ],
                spacing: {
                  after: 120, // 6pt
                  before: 0
                }
              })
            );
          }
        }
      }
    });
    
    // Add footer
    children.push(
      new Paragraph({
        text: 'Converted using File Converter Buddy',
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
    console.error('Error converting PDF to Word:', error);
    
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
            text: 'The PDF could not be converted with full formatting. Here is the extracted text:'
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
 * Convert PDF to image using canvas (placeholder for now)
 * For production, you might want to use pdf2pic or similar libraries
 */
export const convertPDFToImage = async (
  pdfFile: File, 
  targetFormat: 'png' | 'jpeg' | 'webp' | 'tiff'
): Promise<Blob> => {
  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    // Get the first page for now (you can extend this to handle multiple pages)
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }
    
    // Set canvas dimensions
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // Render PDF page to canvas
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
      canvas: canvas
    };
    
    await page.render(renderContext).promise;
    
    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error('Failed to create image blob');
        }
      }, `image/${targetFormat}`, 0.9);
    });
    
  } catch (error) {
    console.error('Error converting PDF to image:', error);
    
    // Fallback to placeholder if rendering fails
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;
    
    // Fill with background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add border
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Add title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PDF to Image Conversion', canvas.width / 2, 80);
    
    // Add file info
    ctx.font = '18px Arial';
    ctx.fillText(`File: ${pdfFile.name}`, canvas.width / 2, 130);
    ctx.fillText(`Target Format: ${targetFormat.toUpperCase()}`, canvas.width / 2, 160);
    
    // Add error message
    ctx.font = '16px Arial';
    ctx.fillStyle = '#dc3545';
    ctx.fillText('PDF rendering failed, showing placeholder', canvas.width / 2, 220);
    ctx.fillText('Error:', canvas.width / 2, 250);
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText(error instanceof Error ? error.message : 'Unknown error', canvas.width / 2, 280);
    
    // Add note
    ctx.fillStyle = '#007bff';
    ctx.font = 'italic 16px Arial';
    ctx.fillText('File Converter Buddy - PDF Support Active!', canvas.width / 2, 500);
    
    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error('Failed to create image blob');
        }
      }, `image/${targetFormat}`, 0.9);
    });
  }
};
