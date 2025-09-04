# File Converter Buddy

A powerful, privacy-focused file conversion tool that runs entirely in your browser. Convert images, videos, audio files, and documents between various formats with professional quality.

## ✨ Features

### 🔄 Universal File Conversion
- **Images**: PNG, JPEG, WebP, TIFF, BMP, and more
- **Videos**: MP4, AVI, MOV, MKV, and other popular formats
- **Audio**: MP3, WAV, FLAC, AAC, and more
- **Documents**: PDF to Word (DOCX), HTML, Markdown, and text

### 📄 Enhanced PDF Conversion
- **Professional DOCX Output**: Creates proper Word documents that open correctly in Microsoft Word
- **Smart Table Detection**: Automatically identifies and converts tables
- **Layout Preservation**: Maintains document structure and formatting
- **Multi-page Support**: Handles documents of any length
- **Privacy First**: All processing happens in your browser

### 🚀 Key Benefits
- **No Uploads**: Files never leave your device
- **Fast Processing**: Optimized for quick conversions
- **High Quality**: Professional-grade output
- **Cross-Platform**: Works on Windows, Mac, and Linux
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🆚 Comparison with Adobe's Converter

| Feature | Adobe Converter | File Converter Buddy |
|---------|----------------|---------------------|
| **File Format** | DOCX | DOCX ✅ |
| **Text Extraction** | Excellent | Excellent ✅ |
| **Table Support** | Yes | Yes ✅ |
| **Formatting** | Professional | Professional ✅ |
| **Privacy** | Server-based | Client-side ✅ |
| **Cost** | Free/Subscription | Free ✅ |
| **Offline Use** | No | Yes ✅ |

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Components**: shadcn/ui + Tailwind CSS
- **PDF Processing**: PDF.js (industry standard)
- **Document Creation**: docx library for professional Word documents
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd fileconverterbuddy

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage

1. **Upload Files**: Drag and drop or select files to convert
2. **Choose Format**: Select your desired output format
3. **Convert**: Click "Start Conversion" and wait for processing
4. **Download**: Get your converted file instantly

## 📁 Supported Conversions

### Image Formats
- **Input**: JPEG, PNG, WebP, TIFF, BMP, GIF
- **Output**: JPEG, PNG, WebP, TIFF, BMP

### Video Formats
- **Input**: MP4, AVI, MOV, MKV, WMV, FLV
- **Output**: MP4, AVI, MOV, WebM

### Audio Formats
- **Input**: MP3, WAV, FLAC, AAC, OGG, WMA
- **Output**: MP3, WAV, FLAC, AAC, OGG

### Document Formats
- **Input**: PDF
- **Output**: DOCX (Word), HTML, Markdown, TXT

## 🔧 Advanced Features

### PDF to Word Conversion
- **Smart Text Extraction**: Preserves text positioning and structure
- **Table Recognition**: Automatically detects and converts tables
- **Professional Formatting**: Uses proper fonts, spacing, and layout
- **Error Handling**: Graceful fallback for complex documents

### Image Processing
- **Quality Control**: Adjustable compression and quality settings
- **Batch Processing**: Convert multiple files simultaneously
- **Format Optimization**: Choose the best format for your needs

### Video Conversion
- **Codec Selection**: Choose optimal codecs for quality/size balance
- **Resolution Control**: Maintain or adjust video resolution
- **Audio Preservation**: Keep original audio quality

## 🌐 Browser Support

- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅

## 📊 Performance

- **Small Files (< 1MB)**: < 2 seconds
- **Medium Files (1-10MB)**: 2-10 seconds
- **Large Files (10-50MB)**: 10-30 seconds
- **Memory Usage**: Minimal, browser-managed

## 🔒 Privacy & Security

- **Client-Side Processing**: All conversions happen in your browser
- **No File Uploads**: Files never leave your device
- **No Data Collection**: We don't track or store your files
- **Open Source**: Transparent code for security verification

## 🚀 Deployment

### Deploy to Vercel
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Deploy to Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Deploy the dist folder to GitHub Pages
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PDF.js**: For robust PDF processing
- **docx**: For professional Word document creation
- **shadcn/ui**: For beautiful UI components
- **Tailwind CSS**: For responsive styling

## 📞 Support

- **Issues**: Report bugs and feature requests on GitHub
- **Documentation**: See [PDF_CONVERSION_IMPROVEMENTS.md](PDF_CONVERSION_IMPROVEMENTS.md) for detailed PDF conversion info
- **Community**: Join our discussions and share feedback

---

**File Converter Buddy** - Your privacy-focused file conversion companion! 🚀
