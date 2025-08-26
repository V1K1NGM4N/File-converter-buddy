import { useState, useEffect } from 'react';

const fileTypes = ['images', 'videos', 'files'];

export const AnimatedFileType = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % fileTypes.length);
        setIsVisible(true);
      }, 150);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[4rem] text-center transition-opacity duration-150" style={{ opacity: isVisible ? 1 : 0 }}>
      {fileTypes[currentIndex]}
    </span>
  );
};