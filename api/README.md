# File Converter Buddy - Backend API

This directory contains the backend API for YouTube downloads functionality.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## 📋 API Endpoints

### GET `/api/youtube/info?videoId={id}`
Fetches video information (title, thumbnail, duration, etc.)

**Response:**
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

### POST `/api/youtube/download`
Downloads YouTube video/audio

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "format": "mp4" // or "mp3"
}
```

**Response:** File download stream

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`

### Option 2: Railway
1. Connect your GitHub repo
2. Railway will auto-deploy

### Option 3: Render
1. Create new Web Service
2. Connect your GitHub repo
3. Set build command: `npm install && npm start`

### Option 4: Heroku
1. Create new app
2. Connect GitHub repo
3. Deploy branch

## 🔧 Environment Variables

Create a `.env` file:
```env
PORT=3001
NODE_ENV=production
```

## 📦 Dependencies

- **ytdl-core**: YouTube video download library
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## ⚠️ Important Notes

1. **Legal Compliance**: Ensure you comply with YouTube's Terms of Service
2. **Rate Limiting**: Implement rate limiting for production use
3. **Error Handling**: Add comprehensive error handling
4. **Security**: Add authentication if needed

## 🐛 Troubleshooting

### Common Issues:
1. **Port already in use**: Change PORT in .env
2. **ytdl-core errors**: Update to latest version
3. **CORS issues**: Check CORS configuration

### Debug Mode:
```bash
DEBUG=* npm run dev
```

## 📚 Resources

- [ytdl-core Documentation](https://github.com/fent/node-ytdl-core)
- [Express.js Documentation](https://expressjs.com/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
