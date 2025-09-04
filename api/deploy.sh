#!/bin/bash

# File Converter Buddy - Backend Deployment Script

echo "🚀 Deploying File Converter Buddy Backend..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the api directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if ytdl-core is installed
if ! npm list ytdl-core > /dev/null 2>&1; then
    echo "❌ Error: ytdl-core not installed. Please check your dependencies."
    exit 1
fi

# Start the server
echo "🌐 Starting server on port 3001..."
echo "📡 API endpoints available at:"
echo "   - GET  http://localhost:3001/api/youtube/info?videoId={id}"
echo "   - POST http://localhost:3001/api/youtube/download"
echo "   - GET  http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
