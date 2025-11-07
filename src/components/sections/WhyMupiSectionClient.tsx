'use client';

import { useEffect, useState } from 'react';
import { useClientLocale } from '@/hooks/useClientLocale';
import { WhyMupiSectionServer } from './WhyMupiSectionServer';

// Traduções padrão em português (fora do componente para SSR)
const defaultTranslations = {
  casesTitle: 'Nossos Cases de',
  casesTitleHighlight: 'Sucesso',
  casesDescription: 'Conheça alguns projetos que transformamos em histórias de sucesso, demonstrando nossa capacidade de entregar soluções excepcionais.',
  ctaAllCases: 'Ver todos os cases'
};

export const WhyMupiSection = () => {
  const locale = useClientLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [translations, setTranslations] = useState<any>(defaultTranslations);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [casesTranslations, setCasesTranslations] = useState<any>({});

  useEffect(() => {
    // Carrega as traduções de whymupi
    fetch(`/locales/${locale}/whymupi.json`)
      .then(res => res.json())
      .then(data => setTranslations(data.whymupi))
      .catch(() => setTranslations(defaultTranslations));

    // Carrega as traduções de cases
    fetch(`/locales/${locale}/cases.json`)
      .then(res => res.json())
      .then(data => setCasesTranslations(data))
      .catch(() => setCasesTranslations({}));
  }, [locale]);

  return (
    <WhyMupiSectionServer 
      translations={translations}
      casesTranslations={casesTranslations}
    />
  );
};
