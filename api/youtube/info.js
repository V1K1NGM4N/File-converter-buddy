// YouTube Video Info API endpoint
// This fetches video metadata like title, thumbnail, duration

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { videoId } = req.query;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    // For production, you would use the YouTube Data API v3
    // This requires an API key from Google Cloud Console
    
    // Example with YouTube Data API:
    // const apiKey = process.env.YOUTUBE_API_KEY;
    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
    // );
    // const data = await response.json();
    
    // For now, return mock data structure
    const mockData = {
      title: `YouTube Video ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: '3:45',
      channel: 'YouTube Channel',
      viewCount: '1,234,567',
      publishedAt: new Date().toISOString()
    };

    return res.status(200).json(mockData);

  } catch (error) {
    console.error('YouTube info error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
