'use client';

import { useEffect, useState } from 'react';
import { useClientLocale } from '@/hooks/useClientLocale';
import { PartnersSectionServer } from './PartnersSectionServer';

// Traduções padrão em português para SSR e fallback
const defaultTranslations = {
  title: 'Conheça alguns de nossos',
  subtitle: 'parceiros',
  description: 'Empresas líderes de mercado que utilizam nossas plataformas para potencializar seus negócios.'
};

export const PartnersSection = () => {
  const locale = useClientLocale();
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    // Carrega as traduções baseado no idioma
    fetch(`/locales/${locale}/partners.json`)
      .then(res => res.json())
      .then(data => {
        setTranslations({
          title: data.partners.title,
          subtitle: data.partners.subtitle,
          description: data.partners.description
        });
      })
      .catch(() => {
        // Fallback para português em caso de erro
        setTranslations(defaultTranslations);
      });
  }, [locale]);

  return <PartnersSectionServer translations={translations} />;
};
