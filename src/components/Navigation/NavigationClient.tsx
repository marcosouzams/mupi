'use client';

import { useState, useEffect } from 'react';
import { useClientLocale } from '@/hooks/useClientLocale';
import { Navigation } from './NavigationServer';

export function NavigationClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useClientLocale();
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    // Carrega as traduções do cliente
    fetch(`/locales/${locale}/navigation.json`)
      .then(res => res.json())
      .then(data => setTranslations(data))
      .catch(() => {
        // Fallback para português
        fetch('/locales/pt/navigation.json')
          .then(res => res.json())
          .then(data => setTranslations(data));
      });
  }, [locale]);

  // Renderiza com traduções padrão em português durante o loading
  const defaultTranslations = {
    nav: {
      home: 'Início',
      platforms: 'Plataformas',
      careers: 'Carreiras',
      cases: 'Cases',
      blog: 'Blog',
      about: 'Sobre',
      contact: 'Fale conosco'
    },
    platforms: {
      atendeaqui: 'Atende Aqui',
      eagenda: 'eAgenda',
      etalentos: 'e-Talentos',
      equalifica: 'eQualifica',
      meuatendimentovirtual: 'Meu Atendimento Virtual',
      minhasalavirtual: 'Minha Sala Virtual',
      sigvirtual: 'SIG Virtual',
      textualiza: 'Textualiza'
    }
  };

  return (
    <Navigation 
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      locale={locale}
      translations={translations || defaultTranslations}
    />
  );
}
