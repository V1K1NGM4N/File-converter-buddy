// YouTube Download API endpoint
// Deploy this to Vercel, Netlify, or your preferred hosting platform

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, format } = req.body;

    if (!url || !format) {
      return res.status(400).json({ error: 'URL and format are required' });
    }

    // Extract video ID from YouTube URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    // For production, you would use a YouTube download library like ytdl-core
    // This is a placeholder implementation
    
    // Example with ytdl-core (you'd need to install this package):
    // const ytdl = require('ytdl-core');
    // const stream = ytdl(url, { format: format === 'mp4' ? 'mp4' : 'audioonly' });
    
    // For now, return a mock response
    return res.status(200).json({
      success: true,
      message: 'Download started',
      videoId,
      format,
      downloadUrl: `https://your-backend.com/download/${videoId}.${format}`
    });

  } catch (error) {
    console.error('YouTube download error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

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
