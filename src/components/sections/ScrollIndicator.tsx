'use client';

import { useState, useEffect } from 'react';

export const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="flex flex-col items-center space-y-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#d1dafb]/50"></div>
        <div className="w-6 h-10 border border-[#d1dafb]/30 rounded-full flex justify-center">
          <div className="w-px h-3 bg-[#d1dafb]/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};