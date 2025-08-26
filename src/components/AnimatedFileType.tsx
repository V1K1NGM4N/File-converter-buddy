import { useState, useEffect } from 'react';

const fileTypes = ['images', 'videos', 'files'];

export const AnimatedFileType = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fileTypes.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative w-16 text-center">
      <span 
        key={currentIndex}
        className="animate-fade-in absolute inset-0"
      >
        {fileTypes[currentIndex]}
      </span>
    </span>
  );
};