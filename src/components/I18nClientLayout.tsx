'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Navigation, Footer } from '@/components';

// Configuração básica do i18next para client-side
i18n.init({
  lng: 'pt',
  fallbackLng: 'pt',
  resources: {},
  interpolation: {
    escapeValue: false,
  },
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isI18nReady, setIsI18nReady] = useState(false);
  const pathname = usePathname();

  // Carregar recursos de tradução
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [
          navPt, navEn, navEs, 
          heroPt, heroEn, heroEs,
          contactPagePt, contactPageEn, contactPageEs,
          aboutPt, aboutEn, aboutEs,
          productsPt, productsEn, productsEs,
          partnersPt, partnersEn, partnersEs,
          whymupiPt, whymupiEn, whymupiEs,
          casesPt, casesEn, casesEs,
          blogPt, blogEn, blogEs,
          footerPt, footerEn, footerEs,
          contactPt, contactEn, contactEs
        ] = await Promise.all([
          fetch('/locales/pt/navigation.json').then(r => r.json()),
          fetch('/locales/en/navigation.json').then(r => r.json()),
          fetch('/locales/es/navigation.json').then(r => r.json()),
          fetch('/locales/pt/hero.json').then(r => r.json()),
          fetch('/locales/en/hero.json').then(r => r.json()),
          fetch('/locales/es/hero.json').then(r => r.json()),
          fetch('/locales/pt/contact-page.json').then(r => r.json()),
          fetch('/locales/en/contact-page.json').then(r => r.json()),
          fetch('/locales/es/contact-page.json').then(r => r.json()),
          fetch('/locales/pt/about.json').then(r => r.json()),
          fetch('/locales/en/about.json').then(r => r.json()),
          fetch('/locales/es/about.json').then(r => r.json()),
          fetch('/locales/pt/products.json').then(r => r.json()),
          fetch('/locales/en/products.json').then(r => r.json()),
          fetch('/locales/es/products.json').then(r => r.json()),
          fetch('/locales/pt/partners.json').then(r => r.json()),
          fetch('/locales/en/partners.json').then(r => r.json()),
          fetch('/locales/es/partners.json').then(r => r.json()),
          fetch('/locales/pt/whymupi.json').then(r => r.json()),
          fetch('/locales/en/whymupi.json').then(r => r.json()),
          fetch('/locales/es/whymupi.json').then(r => r.json()),
          fetch('/locales/pt/cases.json').then(r => r.json()),
          fetch('/locales/en/cases.json').then(r => r.json()),
          fetch('/locales/es/cases.json').then(r => r.json()),
          fetch('/locales/pt/blog.json').then(r => r.json()),
          fetch('/locales/en/blog.json').then(r => r.json()),
          fetch('/locales/es/blog.json').then(r => r.json()),
          fetch('/locales/pt/footer.json').then(r => r.json()),
          fetch('/locales/en/footer.json').then(r => r.json()),
          fetch('/locales/es/footer.json').then(r => r.json()),
          fetch('/locales/pt/contact.json').then(r => r.json()),
          fetch('/locales/en/contact.json').then(r => r.json()),
          fetch('/locales/es/contact.json').then(r => r.json()),
        ]);

        // Carregar traduções básicas
        i18n.addResourceBundle('pt', 'navigation', navPt);
        i18n.addResourceBundle('en', 'navigation', navEn);
        i18n.addResourceBundle('es', 'navigation', navEs);
        i18n.addResourceBundle('pt', 'hero', heroPt);
        i18n.addResourceBundle('en', 'hero', heroEn);
        i18n.addResourceBundle('es', 'hero', heroEs);
        
        // Carregar traduções da página de contato
        i18n.addResourceBundle('pt', 'contact-page', contactPagePt);
        i18n.addResourceBundle('en', 'contact-page', contactPageEn);
        i18n.addResourceBundle('es', 'contact-page', contactPageEs);
        
        // Carregar outras traduções
        i18n.addResourceBundle('pt', 'about', aboutPt);
        i18n.addResourceBundle('en', 'about', aboutEn);
        i18n.addResourceBundle('es', 'about', aboutEs);
        
        i18n.addResourceBundle('pt', 'products', productsPt);
        i18n.addResourceBundle('en', 'products', productsEn);
        i18n.addResourceBundle('es', 'products', productsEs);
        
        i18n.addResourceBundle('pt', 'partners', partnersPt);
        i18n.addResourceBundle('en', 'partners', partnersEn);
        i18n.addResourceBundle('es', 'partners', partnersEs);
        
        i18n.addResourceBundle('pt', 'whymupi', whymupiPt);
        i18n.addResourceBundle('en', 'whymupi', whymupiEn);
        i18n.addResourceBundle('es', 'whymupi', whymupiEs);
        
        i18n.addResourceBundle('pt', 'cases', casesPt);
        i18n.addResourceBundle('en', 'cases', casesEn);
        i18n.addResourceBundle('es', 'cases', casesEs);
        
        i18n.addResourceBundle('pt', 'blog', blogPt);
        i18n.addResourceBundle('en', 'blog', blogEn);
        i18n.addResourceBundle('es', 'blog', blogEs);
        
        i18n.addResourceBundle('pt', 'footer', footerPt);
        i18n.addResourceBundle('en', 'footer', footerEn);
        i18n.addResourceBundle('es', 'footer', footerEs);
        
        i18n.addResourceBundle('pt', 'contact', contactPt);
        i18n.addResourceBundle('en', 'contact', contactEn);
        i18n.addResourceBundle('es', 'contact', contactEs);

        setIsI18nReady(true);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setIsI18nReady(true); // Continue mesmo com erro
      }
    };

    loadTranslations();
  }, []);

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
    if (pathname.startsWith('/cases')) return 'cases';
    if (pathname.startsWith('/blog')) return 'blog';
    return pathname.slice(1); // Remove a barra inicial
  };

  if (!isI18nReady) {
    return (
      <div className="min-h-screen bg-[#191927] flex items-center justify-center">
        <div className="flex space-x-2">
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
        <style jsx>{`
          .dot {
            display: inline-block;
          }
          @keyframes bounce {
            0%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-16px);
            }
          }
          .animate-bounce {
            animation: bounce 1.2s infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen text-white">
        <Navigation 
          scrolled={scrolled} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen}
          currentPage={getCurrentPage()}
        />
        
        <main>
          {children}
        </main>
        
        <Footer />
      </div>
    </I18nextProvider>
  );
};

export default ClientLayout;