'use client';

import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  isMobile?: boolean;
}

export function LanguageSelector({ isMobile = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale: 'pt' | 'en' | 'es') => {
    setLanguage(locale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mupi-language', locale);
    }
    setIsOpen(false);
  };

  const getCurrentLanguage = () => {
    switch (language) {
      case 'pt': return 'PT';
      case 'en': return 'EN';
      case 'es': return 'ES';
      default: return 'PT';
    }
  };

  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4 pb-2">
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handleLanguageChange('pt')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
              language === 'pt' 
                ? 'bg-[#5667fe] text-white' 
                : 'text-gray-700 hover:text-[#5667fe] hover:bg-gray-100'
            }`}
          >
            PT
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
              language === 'en' 
                ? 'bg-[#5667fe] text-white' 
                : 'text-gray-700 hover:text-[#5667fe] hover:bg-gray-100'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange('es')}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
              language === 'es' 
                ? 'bg-[#5667fe] text-white' 
                : 'text-gray-700 hover:text-[#5667fe] hover:bg-gray-100'
            }`}
          >
            ES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-[#5667fe] transition-all duration-300 p-2 hover:bg-gray-100 rounded-full"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium font-inter">{getCurrentLanguage()}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg py-2 min-w-[100px] shadow-lg">
          <button
            onClick={() => handleLanguageChange('pt')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#5667fe] hover:bg-gray-50 transition-all duration-200 font-inter"
          >
            PT
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#5667fe] hover:bg-gray-50 transition-all duration-200 font-inter"
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange('es')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#5667fe] hover:bg-gray-50 transition-all duration-200 font-inter"
          >
            ES
          </button>
        </div>
      )}
    </div>
  );
}
