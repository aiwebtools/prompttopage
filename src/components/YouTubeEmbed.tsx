
import React, { useState, useEffect } from 'react';

interface YouTubeEmbedProps {
  url: string;
}

export const YouTubeEmbed = ({ url }: YouTubeEmbedProps) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  
  useEffect(() => {
    if (!url) return;
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      setVideoId(match[2]);
    } else {
      setVideoId(null);
    }
  }, [url]);
  
  if (!videoId) return null;
  
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-neon-blue animate-fade-in cyber-border">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&hd=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
