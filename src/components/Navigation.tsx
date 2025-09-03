'use client';

import { Menu, X, Search, Globe, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface NavigationProps {
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Navigation = ({ scrolled, isMenuOpen, setIsMenuOpen, currentPage = 'home', onNavigate }: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation('navigation');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isPlatformsMenuOpen, setIsPlatformsMenuOpen] = useState(false);

  // Sincronizar com mudanças de idioma do i18next
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('mupi-language', lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const handleNavClick = (page: string) => {
    setIsMenuOpen(false);
    
    if (page === 'home') {
      router.push('/');
    } else if (page === 'cases') {
      router.push('/cases');
    } else if (page === 'bienal-case') {
      router.push('/cases/bienal-livro-rio-2025');
    } else if (page === 'careers') {
      window.open('https://mupisys.etalentos.com.br/', '_blank');
      return;
    } else {
      router.push(`/${page}`);
    }
    
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank');
    setIsPlatformsMenuOpen(false);
    setIsMenuOpen(false);
  };

  const platformLinks = {
    eagenda: 'https://eagenda.com.br/',
    minhasalavirtual: 'https://minhasalavirtual.com/',
    meuatendimentovirtual: 'https://meuatendimentovirtual.com.br/',
    atendeaqui: 'https://atendeaqui.com.br/',
    equalifica: 'https://equalifica.com.br/',
    etalentos: 'https://etalentos.com.br/',
    sigvirtual: 'https://sigvirtual.com.br/'
  };

  const handleLanguageChange = (locale: string) => {
    i18n.changeLanguage(locale);
    // Salvar preferência no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('mupi-language', locale);
    }
    setIsLangMenuOpen(false);
  };

  const getCurrentLanguage = () => {
    switch (i18n.language) {
      case 'pt': return 'PT';
      case 'en': return 'EN';
      case 'es': return 'ES';
      default: return 'PT';
    }
  };

  // Determina a página atual baseada na rota
  const getCurrentPage = () => {
    if (!pathname || pathname === '/') return 'home';
    if (pathname.startsWith('/cases')) return 'cases';
    return pathname.slice(1);
  };

  const activePage = currentPage || getCurrentPage();

  // Páginas que devem ter nav sempre sólido
  const solidNavPages = ['cases', 'about'];
  const shouldHaveSolidNav = solidNavPages.includes(activePage) || scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      shouldHaveSolidNav ? 'bg-[#191927]/90 backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <Image
              src="/logo-mupi.png"
              alt="Mupe Logo"
              width={120}
              height={32}
              className="h-8 w-auto transition-all duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('home')}
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'home' ? 'text-white' : 'text-[#d1dafb]/70 hover:text-white'
              }`}
            >
              {t('nav.home')}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            
            <button 
              onClick={() => handleNavClick('about')}
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'about' ? 'text-white' : 'text-[#d1dafb]/70 hover:text-white'
              }`}
            >
              {t('nav.about')}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            
            {/* Plataformas Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsPlatformsMenuOpen(!isPlatformsMenuOpen)}
                className={`flex items-center space-x-1 transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                  activePage === 'platforms' ? 'text-white' : 'text-[#d1dafb]/70 hover:text-white'
                }`}
              >
                <span>{t('nav.platforms')}</span>
                <ChevronDown className="w-3 h-3" />
                <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                  activePage === 'platforms' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
              
              {/* Platforms Dropdown */}
              {isPlatformsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#191927]/95 backdrop-blur-xl border border-[#5667fe]/20 rounded-lg py-2 min-w-[240px] shadow-lg z-50">
                  {Object.entries(platformLinks).map(([key, url]) => (
                    <button
                      key={key}
                      onClick={() => handlePlatformClick(url)}
                      className="w-full text-left px-4 py-2 text-sm text-[#d1dafb]/70 hover:text-white hover:bg-[#5667fe]/10 transition-all duration-200 font-inter"
                    >
                      {t(`platforms.${key}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => handleNavClick('cases')}
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'cases' ? 'text-white' : 'text-[#d1dafb]/70 hover:text-white'
              }`}
            >
              {t('nav.cases')}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'cases' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            
            <button 
              onClick={() => handleNavClick('careers')}
              className={`transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter ${
                activePage === 'careers' ? 'text-white' : 'text-[#d1dafb]/70 hover:text-white'
              }`}
            >
              {t('nav.careers')}
              <span className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 ${
                activePage === 'careers' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 hover:bg-[#5667fe]/10 rounded-full transition-all duration-300">
              <Search className="w-5 h-5 text-[#d1dafb]/70" />
            </button>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 text-[#d1dafb]/70 hover:text-white transition-all duration-300 p-2 hover:bg-[#5667fe]/10 rounded-full"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium font-inter">{getCurrentLanguage()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {/* Language Dropdown */}
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#191927]/95 backdrop-blur-xl border border-[#5667fe]/20 rounded-lg py-2 min-w-[100px] shadow-lg">
                  <button
                    onClick={() => handleLanguageChange('pt')}
                    className="w-full text-left px-4 py-2 text-sm text-[#d1dafb]/70 hover:text-white hover:bg-[#5667fe]/10 transition-all duration-200 font-inter"
                  >
                    PT
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="w-full text-left px-4 py-2 text-sm text-[#d1dafb]/70 hover:text-white hover:bg-[#5667fe]/10 transition-all duration-200 font-inter"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange('es')}
                    className="w-full text-left px-4 py-2 text-sm text-[#d1dafb]/70 hover:text-white hover:bg-[#5667fe]/10 transition-all duration-200 font-inter"
                  >
                    ES
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => handleNavClick('contact')}
              className="bg-[#5667fe] hover:bg-[#5667fe]/90 px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 text-sm font-medium shadow-lg shadow-[#5667fe]/25 font-inter"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#5667fe]/10 transition-colors duration-200 relative"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute transition-all duration-300 ${
                isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`} />
              <X className={`w-6 h-6 absolute transition-all duration-300 ${
                isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-[#191927]/95 backdrop-blur-xl border-t border-[#5667fe]/10`}>
        <div className="px-6 pt-6 pb-12 space-y-4">
          <button 
            onClick={() => handleNavClick('home')}
            className="block text-[#d1dafb]/70 hover:text-white transition-colors duration-200 font-inter w-full text-left py-1"
          >
            {t('nav.home')}
          </button>
          
          <button 
            onClick={() => handleNavClick('about')}
            className="block text-[#d1dafb]/70 hover:text-white transition-colors duration-200 font-inter w-full text-left py-1"
          >
            {t('nav.about')}
          </button>
          
          {/* Mobile Plataformas Dropdown */}
          <div className="space-y-2">
            <button 
              onClick={() => setIsPlatformsMenuOpen(!isPlatformsMenuOpen)}
              className="flex items-center justify-between w-full text-left text-[#d1dafb]/70 hover:text-white transition-colors duration-200 font-inter py-1"
            >
              <span>{t('nav.platforms')}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isPlatformsMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isPlatformsMenuOpen && (
              <div className="pl-4 space-y-1 border-l border-[#5667fe]/20">
                {Object.entries(platformLinks).map(([key, url]) => (
                  <button
                    key={key}
                    onClick={() => handlePlatformClick(url)}
                    className="block w-full text-left text-sm text-[#d1dafb]/60 hover:text-white transition-colors duration-200 font-inter py-1"
                  >
                    {t(`platforms.${key}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => handleNavClick('cases')}
            className="block text-[#d1dafb]/70 hover:text-white transition-colors duration-200 font-inter w-full text-left py-1"
          >
            {t('nav.cases')}
          </button>
          
          <button 
            onClick={() => handleNavClick('careers')}
            className="block text-[#d1dafb]/70 hover:text-white transition-colors duration-200 font-inter w-full text-left py-1"
          >
            {t('nav.careers')}
          </button>
          
          {/* Mobile Language Selector */}
          <div className="border-t border-[#5667fe]/20 pt-4 pb-2">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleLanguageChange('pt')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
                  i18n.language === 'pt' 
                    ? 'bg-[#5667fe] text-white' 
                    : 'text-[#d1dafb]/70 hover:text-white hover:bg-[#5667fe]/20'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
                  i18n.language === 'en' 
                    ? 'bg-[#5667fe] text-white' 
                    : 'text-[#d1dafb]/70 hover:text-white hover:bg-[#5667fe]/20'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-inter ${
                  i18n.language === 'es' 
                    ? 'bg-[#5667fe] text-white' 
                    : 'text-[#d1dafb]/70 hover:text-white hover:bg-[#5667fe]/20'
                }`}
              >
                ES
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              onClick={() => handleNavClick('contact')}
              className="w-full bg-[#5667fe] hover:bg-[#5667fe]/90 px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium font-inter shadow-lg"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};