'use client';

import { Menu, X, Search, Globe, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavTranslations {
  nav: {
    home: string;
    about: string;
    platforms: string;
    cases: string;
    blog: string;
    careers: string;
    contact: string;
  };
  platforms: Record<string, string>;
}

interface NavigationProps {
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  currentPage?: string;
  translations: NavTranslations;
  initialLanguage: 'pt' | 'en' | 'es';
}

export const Navigation = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  currentPage = 'home',
  translations: t,
  initialLanguage
}: NavigationProps) => {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isPlatformsMenuOpen, setIsPlatformsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'pt' | 'en' | 'es'>(initialLanguage);

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank');
    setIsPlatformsMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const platformLinks = {
    eagenda: 'https://eagenda.com.br/',
    minhasalavirtual: 'https://minhasalavirtual.com/',
    meuatendimentovirtual: 'https://meuatendimentovirtual.com.br/',
    atendeaqui: 'https://atendeaqui.com.br/',
    equalifica: 'https://equalifica.com.br/',
    etalentos: 'https://etalentos.com.br/',
    sigvirtual: 'https://sigvirtual.com.br/',
    textualiza: 'https://textualiza.com.br/'
  };

  const handleLanguageChange = (locale: 'pt' | 'en' | 'es') => {
    setCurrentLang(locale);
    setLanguage(locale);
    setIsLangMenuOpen(false);
    // router.refresh() é chamado no setLanguage do context
  };

  const getCurrentLanguage = () => {
    switch (currentLang) {
      case 'pt': return 'PT';
      case 'en': return 'EN';
      case 'es': return 'ES';
      default: return 'PT';
    }
  };

  useEffect(() => {
    setCurrentLang(language);
  }, [language]);

  const getCurrentPage = () => {
    if (!pathname || pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/cases')) return 'cases';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/contact')) return 'contact';
    return pathname.slice(1);
  };

  const activePage = currentPage || getCurrentPage();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-white shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer" aria-label="MUPI Systems - Home">
            <Image
              src="/logo_mupi.png"
              alt="MUPI Systems Logo - Soluções Digitais Inovadoras"
              width={120}
              height={32}
              className="h-8 w-auto transition-all duration-300 hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/"
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'home' ? 'text-[#5667fe]' : 'text-gray-700 hover:text-[#5667fe]'
              }`}
              aria-label="Página inicial da MUPI Systems"
            >
              {t.nav.home}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <Link 
              href="/about"
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'about' ? 'text-[#5667fe]' : 'text-gray-700 hover:text-[#5667fe]'
              }`}
              aria-label="Sobre a MUPI Systems"
            >
              {t.nav.about}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            {/* Plataformas Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsPlatformsMenuOpen(!isPlatformsMenuOpen)}
                className={`flex items-center space-x-1 transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                  activePage === 'platforms' ? 'text-[#5667fe]' : 'text-gray-700 hover:text-[#5667fe]'
                }`}
              >
                <span>{t.nav.platforms}</span>
                <ChevronDown className="w-3 h-3" />
                <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                  activePage === 'platforms' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
              
              {/* Platforms Dropdown */}
              {isPlatformsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg py-2 min-w-[240px] shadow-lg z-50">
                  {Object.entries(platformLinks).map(([key, url]) => (
                    <button
                      key={key}
                      onClick={() => handlePlatformClick(url)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#5667fe] hover:bg-gray-50 transition-all duration-200 font-inter"
                    >
                      {t.platforms[key] || key}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/cases"
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'cases' ? 'text-[#5667fe]' : 'text-gray-700 hover:text-[#5667fe]'
              }`}
              aria-label="Cases de sucesso da MUPI Systems"
            >
              {t.nav.cases}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'cases' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <Link 
              href="/blog"
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'blog' ? 'text-[#5667fe]' : 'text-gray-700 hover:text-[#5667fe]'
              }`}
              aria-label="Blog da MUPI Systems"
            >
              {t.nav.blog}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'blog' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <a 
              href="https://mupisys.etalentos.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'careers' ? 'text-[#5667fe]' : 'text-gray-700 hover:text-[#5667fe]'
              }`}
              aria-label="Trabalhe conosco - Vagas na MUPI Systems"
            >
              {t.nav.careers}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'careers' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#5667fe] transition-all duration-300 p-2 hover:bg-gray-100 rounded-full"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium font-inter">{getCurrentLanguage()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {/* Language Dropdown */}
              {isLangMenuOpen && (
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
            
            <Link 
              href="/contact"
              className="bg-[#5667fe] hover:bg-[#5667fe]/90 px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 text-sm font-medium font-inter"
              aria-label="Entre em contato com a MUPI Systems"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute transition-all duration-300 text-gray-700 ${
                isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`} />
              <X className={`w-6 h-6 absolute transition-all duration-300 text-gray-700 ${
                isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-200`}>
        <div className="px-6 pt-6 pb-12 space-y-4">
          <Link 
            href="/"
            onClick={handleMenuClose}
            className="block text-gray-700 hover:text-[#5667fe] transition-colors duration-200 font-inter w-full text-left py-1"
            aria-label="Página inicial"
          >
            {t.nav.home}
          </Link>
          
          <Link 
            href="/about"
            onClick={handleMenuClose}
            className="block text-gray-700 hover:text-[#5667fe] transition-colors duration-200 font-inter w-full text-left py-1"
            aria-label="Sobre nós"
          >
            {t.nav.about}
          </Link>
          
          {/* Mobile Plataformas Dropdown */}
          <div className="space-y-2">
            <button 
              onClick={() => setIsPlatformsMenuOpen(!isPlatformsMenuOpen)}
              className="flex items-center justify-between w-full text-left text-gray-700 hover:text-[#5667fe] transition-colors duration-200 font-inter py-1"
            >
              <span>{t.nav.platforms}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isPlatformsMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isPlatformsMenuOpen && (
              <div className="pl-4 space-y-1 border-l border-gray-300">
                {Object.entries(platformLinks).map(([key, url]) => (
                  <button
                    key={key}
                    onClick={() => handlePlatformClick(url)}
                    className="block w-full text-left text-sm text-gray-600 hover:text-[#5667fe] transition-colors duration-200 font-inter py-1"
                  >
                    {t.platforms[key] || key}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Link 
            href="/cases"
            onClick={handleMenuClose}
            className="block text-gray-700 hover:text-[#5667fe] transition-colors duration-200 font-inter w-full text-left py-1"
            aria-label="Cases de sucesso"
          >
            {t.nav.cases}
          </Link>
          
          <Link 
            href="/blog"
            onClick={handleMenuClose}
            className="block text-gray-700 hover:text-[#5667fe] transition-colors duration-200 font-inter w-full text-left py-1"
            aria-label="Blog"
          >
            {t.nav.blog}
          </Link>
          
          <a 
            href="https://mupisys.etalentos.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMenuClose}
            className="block text-gray-700 hover:text-[#5667fe] transition-colors duration-200 font-inter w-full text-left py-1"
            aria-label="Trabalhe conosco"
          >
            {t.nav.careers}
          </a>
          
          {/* Mobile Language Selector */}
          <div className="border-t border-gray-200 pt-4 pb-2">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleLanguageChange('pt')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
                  currentLang === 'pt' 
                    ? 'bg-[#5667fe] text-white' 
                    : 'text-gray-700 hover:text-[#5667fe] hover:bg-gray-100'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
                  currentLang === 'en' 
                    ? 'bg-[#5667fe] text-white' 
                    : 'text-gray-700 hover:text-[#5667fe] hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
                  currentLang === 'es' 
                    ? 'bg-[#5667fe] text-white' 
                    : 'text-gray-700 hover:text-[#5667fe] hover:bg-gray-100'
                }`}
              >
                ES
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <Link 
              href="/contact"
              onClick={handleMenuClose}
              className="block w-full text-center bg-[#5667fe] hover:bg-[#5667fe]/90 px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium font-inter"
              aria-label="Fale conosco"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
