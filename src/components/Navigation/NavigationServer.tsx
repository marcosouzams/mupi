import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { PlatformsMenu } from './PlatformsMenu';
import { MobileMenuButton } from './MobileMenuButton';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  translations: {
    nav: {
      home: string;
      platforms: string;
      careers: string;
      cases: string;
      blog: string;
      about: string;
      contact: string;
    };
    platforms: Record<string, string>;
  };
}

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

export function Navigation({ isMenuOpen, setIsMenuOpen, translations }: NavigationProps) {
  const t = translations;
  
  const platformNames = {
    menuTitle: t.nav.platforms,
    ...t.platforms
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-white shadow-md">
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
              className="transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter text-gray-700 hover:text-[#5667fe]"
              aria-label="Página inicial da MUPI Systems"
            >
              {t.nav.home}
              <span className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/about"
              className="transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter text-gray-700 hover:text-[#5667fe]"
              aria-label="Sobre a MUPI Systems"
            >
              {t.nav.about}
              <span className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
            
            {/* Plataformas Dropdown */}
            <PlatformsMenu platformLinks={platformLinks} platformNames={platformNames} />
            
            <Link 
              href="/cases"
              className="transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter text-gray-700 hover:text-[#5667fe]"
              aria-label="Cases de sucesso da MUPI Systems"
            >
              {t.nav.cases}
              <span className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/blog"
              className="transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter text-gray-700 hover:text-[#5667fe]"
              aria-label="Blog da MUPI Systems"
            >
              {t.nav.blog}
              <span className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
            
            <a 
              href="https://mupisys.etalentos.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 relative group text-sm font-medium tracking-wide font-inter text-gray-700 hover:text-[#5667fe]"
              aria-label="Trabalhe conosco - Vagas na MUPI Systems"
            >
              {t.nav.careers}
              <span className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#5667fe] to-[#d1dafb] transition-all duration-300 w-0 group-hover:w-full"></span>
            </a>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Language Selector - Client Component */}
            <LanguageSelector />
            
            <Link 
              href="/contact"
              className="bg-[#5667fe] hover:bg-[#5667fe]/90 px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 text-sm font-medium font-inter text-white"
              aria-label="Entre em contato com a MUPI Systems"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Mobile Menu Button - Client Component */}
          <MobileMenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
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
          <PlatformsMenu 
            platformLinks={platformLinks} 
            platformNames={platformNames} 
            isMobile 
            onLinkClick={handleMenuClose}
          />
          
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
          <LanguageSelector isMobile />
          
          <div className="pt-2">
            <Link 
              href="/contact"
              onClick={handleMenuClose}
              className="block w-full text-center bg-[#5667fe] hover:bg-[#5667fe]/90 px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium font-inter text-white"
              aria-label="Fale conosco"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
