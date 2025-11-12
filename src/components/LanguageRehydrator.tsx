'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Cookies from 'js-cookie';

/**
 * Componente que detecta mudanças de idioma e recarrega a página para rehidratar o conteúdo
 * Mantém o conteúdo inicial (PT) para SEO perfeito
 */
export const LanguageRehydrator = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Na primeira carga, sincroniza com o cookie se existir
    if (initialLoad) {
      const cookieLang = Cookies.get('NEXT_LOCALE');
      if (cookieLang && cookieLang !== 'pt' && cookieLang !== language) {
        // Se o cookie indica outro idioma, força refresh
        router.refresh();
      }
      setInitialLoad(false);
      return;
    }

    // Em mudanças subsequentes, recarrega a página
    if (language !== 'pt') {
      router.refresh();
    }
  }, [language, router, initialLoad]);

  return null; // Componente invisível
};
