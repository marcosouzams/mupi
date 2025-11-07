'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export type Locale = 'pt' | 'en' | 'es';

/**
 * Hook para obter o idioma atual no cliente
 * Retorna o idioma do contexto após hidratação
 */
export function useClientLocale(): Locale {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Durante SSR e antes da hidratação, retorna 'pt' como padrão
  if (!mounted) {
    return 'pt';
  }

  return language;
}
