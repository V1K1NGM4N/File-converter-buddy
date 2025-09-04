# 🚀 File Converter Buddy - YouTube Downloader Setup Guide

## 📋 Overview

This guide will help you set up the **real YouTube downloader** functionality that fetches actual video information (title, thumbnail, duration) and downloads real video/audio files.

## ⚠️ Current Status

- ✅ **Frontend**: Updated with real API integration
- ✅ **Backend API**: Created and ready for deployment
- 🔄 **Backend Server**: Needs to be started locally or deployed

## 🎯 What You'll Get

1. **Real Video Information**: Actual titles, thumbnails, and durations
2. **Real Downloads**: Actual MP4/MP3 files (not 1KB mock files)
3. **Progress Tracking**: Real download progress
4. **Error Handling**: Proper error messages for failed downloads

## 🚀 Quick Setup (Local Development)

### Step 1: Start the Backend Server

```bash
cd api
npm install
npm start
```

**Or use the deployment scripts:**
- **Windows**: Double-click `deploy.bat`
- **Mac/Linux**: Run `./deploy.sh`

### Step 2: Test the Frontend

1. Open your browser to the deployed frontend
2. Navigate to `/youtube`
3. Paste a YouTube URL
4. You should now see:
   - ✅ Real video title
   - ✅ Real thumbnail
   - ✅ Real duration
   - ✅ Real download functionality

## 🌐 Production Deployment

### Option 1: Deploy Backend to Vercel

1. **Create API Routes** in your Vercel project:
   ```bash
   # In your Vercel project root
   mkdir api
   cp -r api/* api/
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy Backend Separately

1. **Deploy backend to a hosting service**:
   - Railway (recommended)
   - Render
   - Heroku
   - DigitalOcean

2. **Update frontend API URLs**:
   ```typescript
   // In YouTubeDownloader.tsx, change:
   const API_BASE = 'https://your-backend-url.com';
   ```

## 🔧 Configuration

### Environment Variables

Create `.env` file in the `api` directory:
```env
PORT=3001
NODE_ENV=production
```

### API Endpoints

- **Video Info**: `GET /api/youtube/info?videoId={id}`
- **Download**: `POST /api/youtube/download`
- **Health Check**: `GET /health`

## 📱 Testing

### Test URLs

Try these YouTube URLs to test:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ`
- `https://www.youtube.com/embed/dQw4w9WgXcQ`

### Expected Results

1. **URL Input**: Paste any YouTube URL
2. **Video Info**: Should display real title, thumbnail, duration
3. **Download**: Should download actual video/audio file
4. **File Size**: Should be the actual video size (not 1KB)

## 🐛 Troubleshooting

### Common Issues

1. **"Backend API not available"**
   - Backend server not running
   - Check if server is on port 3001
   - Check console for errors

2. **"Download failed"**
   - Video might be restricted
   - Check YouTube Terms of Service
   - Verify video is public

3. **CORS Errors**
   - Backend CORS not configured
   - Check backend server logs

### Debug Mode

```bash
# Backend
DEBUG=* npm start

# Frontend
# Check browser console for API calls
```

## 📚 API Documentation

### Video Info Response
```json
{
  "title": "Video Title",
  "thumbnail": "https://...",
  "duration": "3:45",
  "channel": "Channel Name",
  "viewCount": "1234567",
  "publishedAt": "2023-01-01T00:00:00.000Z"
}
```

### Download Request
```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "format": "mp4"
}
```

## ⚖️ Legal Considerations

1. **YouTube Terms of Service**: Ensure compliance
2. **Copyright**: Respect content creators' rights
3. **Personal Use**: Download only for personal use
4. **Rate Limiting**: Implement reasonable download limits

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Video titles are real (not "YouTube Video")
- ✅ Thumbnails load properly
- ✅ Duration shows actual time
- ✅ Downloaded files are actual video/audio
- ✅ File sizes are realistic (not 1KB)

## 🆘 Need Help?

1. **Check backend logs** for errors
2. **Verify API endpoints** are accessible
3. **Test with simple YouTube URLs** first
4. **Check browser console** for frontend errors

---

**Happy Downloading! 🎬🎵**
