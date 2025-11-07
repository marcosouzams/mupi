'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PlatformsMenuProps {
  platformLinks: Record<string, string>;
  platformNames: Record<string, string>;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function PlatformsMenu({ platformLinks, platformNames, isMobile = false, onLinkClick }: PlatformsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank');
    setIsOpen(false);
    onLinkClick?.();
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-[#5667fe] transition-colors duration-200 font-inter py-1"
        >
          <span>{platformNames.menuTitle}</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="pl-4 space-y-1 border-l border-gray-300">
            {Object.entries(platformLinks).map(([key, url]) => (
              <button
                key={key}
                onClick={() => handlePlatformClick(url)}
                className="block w-full text-left text-sm text-gray-600 hover:text-[#5667fe] transition-colors duration-200 font-inter py-1"
              >
                {platformNames[key] || key}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter text-gray-700 hover:text-[#5667fe]"
      >
        <span>{platformNames.menuTitle}</span>
        <ChevronDown className="w-3 h-3" />
        <span className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 w-0 group-hover:w-full"></span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg py-2 min-w-[240px] shadow-lg z-50">
          {Object.entries(platformLinks).map(([key, url]) => (
            <button
              key={key}
              onClick={() => handlePlatformClick(url)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#5667fe] hover:bg-gray-50 transition-all duration-200 font-inter"
            >
              {platformNames[key] || key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
