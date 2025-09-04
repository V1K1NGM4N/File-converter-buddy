const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// YouTube video info endpoint
app.get('/api/youtube/info', async (req, res) => {
  try {
    const { videoId } = req.query;
    
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(url);
    
    const videoDetails = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0]?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: formatDuration(info.videoDetails.lengthSeconds),
      channel: info.videoDetails.author.name,
      viewCount: info.videoDetails.viewCount,
      publishedAt: info.videoDetails.uploadDate
    };

    res.json(videoDetails);
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Failed to fetch video information' });
  }
});

// YouTube download endpoint
app.post('/api/youtube/download', async (req, res) => {
  try {
    const { url, format } = req.body;
    
    if (!url || !format) {
      return res.status(400).json({ error: 'URL and format are required' });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    let stream;
    if (format === 'mp3') {
      stream = ytdl(url, { 
        quality: 'highestaudio',
        filter: 'audioonly'
      });
    } else {
      stream = ytdl(url, { 
        quality: 'highest',
        filter: 'audioandvideo'
      });
    }

    const fileName = `${title}.${format}`;
    
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', format === 'mp3' ? 'audio/mpeg' : 'video/mp4');
    
    stream.pipe(res);

  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
});

// Helper function to extract video ID
function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*&v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Helper function to format duration
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`YouTube API available at http://localhost:${PORT}/api/youtube`);
});
