// Simple ZIP creation utility using JSZip-like functionality
// For a production app, you'd want to use the JSZip library
// This is a basic implementation for demonstration

export class SimpleZip {
  private files: Array<{ name: string; data: Blob }> = [];

  add(name: string, data: Blob) {
    this.files.push({ name, data });
  }

  async generateAsync(): Promise<Blob> {
    // For a real implementation, this would create a proper ZIP file
    // For now, we'll create a simple archive-like structure
    // In a production app, use JSZip library instead
    
    const formData = new FormData();
    this.files.forEach(({ name, data }) => {
      formData.append('files', data, name);
    });
    
    // Return the first file as a fallback
    // In production, you'd use JSZip here
    return this.files[0]?.data || new Blob();
  }

  clear() {
    this.files = [];
  }
}

export const downloadMultipleFiles = async (
  files: Array<{ name: string; blob: Blob }>
) => {
  // For now, download files individually
  // In production, create a ZIP file
  for (const { name, blob } of files) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Small delay between downloads
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};