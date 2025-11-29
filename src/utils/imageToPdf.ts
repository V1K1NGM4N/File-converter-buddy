import { jsPDF } from 'jspdf';

export interface ImageToPdfOptions {
    pageSize?: 'a4' | 'letter' | 'fit';
    orientation?: 'portrait' | 'landscape';
    margin?: number;
}

export const convertImagesToPdf = async (
    files: File[],
    options: ImageToPdfOptions = {}
): Promise<Blob> => {
    const { pageSize = 'a4', orientation = 'portrait', margin = 10 } = options;

    // Create new PDF document
    const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: pageSize === 'fit' ? undefined : pageSize
    });

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Add new page for subsequent images
        if (i > 0) {
            pdf.addPage();
        }

        try {
            // Create an image element to get dimensions
            const img = await loadImage(file);

            const imgWidth = img.width;
            const imgHeight = img.height;

            // Calculate dimensions to fit on page
            let pageWidth = pdf.internal.pageSize.getWidth();
            let pageHeight = pdf.internal.pageSize.getHeight();

            // If pageSize is 'fit', resize page to match image
            if (pageSize === 'fit') {
                // Convert pixels to mm (approximate)
                const widthMm = pxToMm(imgWidth);
                const heightMm = pxToMm(imgHeight);

                // Reset page size for this page
                pdf.deletePage(i + 1);
                pdf.addPage([widthMm, heightMm], widthMm > heightMm ? 'l' : 'p');

                pageWidth = widthMm;
                pageHeight = heightMm;

                pdf.addImage(img, 'JPEG', 0, 0, widthMm, heightMm);
            } else {
                // Standard page size (A4/Letter) - Fit image within margins
                const availableWidth = pageWidth - (margin * 2);
                const availableHeight = pageHeight - (margin * 2);

                const ratio = Math.min(
                    availableWidth / imgWidth,
                    availableHeight / imgHeight
                );

                // Calculate final dimensions
                const finalWidth = imgWidth * ratio; // These are now in "pdf units" (which we treat as equivalent to scaled pixels? No, need to be careful)
                // Wait, imgWidth is in pixels. availableWidth is in mm.
                // We need to convert imgWidth to mm first? 
                // Actually, jsPDF addImage takes width/height in the units defined in constructor (mm).

                // Let's convert image px to mm for calculation
                const imgWidthMm = pxToMm(imgWidth);
                const imgHeightMm = pxToMm(imgHeight);

                const scaleFactor = Math.min(
                    availableWidth / imgWidthMm,
                    availableHeight / imgHeightMm
                );

                const finalW = imgWidthMm * scaleFactor;
                const finalH = imgHeightMm * scaleFactor;

                // Center the image
                const x = (pageWidth - finalW) / 2;
                const y = (pageHeight - finalH) / 2;

                pdf.addImage(img, 'JPEG', x, y, finalW, finalH);
            }

        } catch (error) {
            console.error(`Error processing image ${file.name}:`, error);
            // Continue to next image or throw? 
            // For now, let's add a text placeholder
            pdf.text(`Error loading image: ${file.name}`, 10, 10);
        }
    }

    return pdf.output('blob');
};

const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            resolve(img);
        };
        img.onerror = reject;
    });
};

const pxToMm = (px: number): number => {
    return px * 0.264583;
};
