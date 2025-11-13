'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from './NavigationServer';
import Footer from './FooterServer';

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

interface FooterTranslations {
  footer: {
    description: string;
    socialMedia: string;
    products: string;
    company: string;
    support: string;
    copyright: string;
    links: {
      products: Record<string, string>;
      company: Record<string, string>;
      support: Record<string, string>;
    };
  };
}

interface ClientLayoutProps {
  children: React.ReactNode;
  navTranslations: NavTranslations;
  footerTranslations: FooterTranslations;
  initialLanguage: 'pt' | 'en' | 'es';
}

const ClientLayout = ({ children, navTranslations, footerTranslations, initialLanguage }: ClientLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fecha o menu móvel quando a rota muda e rola para o topo
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Determina a página atual baseada na rota
  const getCurrentPage = () => {
    if (!pathname || pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/cases')) return 'cases';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/contact')) return 'contact';
    return pathname.slice(1); // Remove a barra inicial
  };

  return (
    <div className="min-h-screen text-white">
      <Navigation 
        scrolled={scrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        currentPage={getCurrentPage()}
        translations={navTranslations}
        initialLanguage={initialLanguage}
      />
      
      <main>
        {children}
      </main>
      
      <Footer 
        translations={footerTranslations}
      />
    </div>
  );
};

export default ClientLayout;