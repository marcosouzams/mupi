'use client';

import { useEffect, useState } from 'react';
import { useClientLocale } from '@/hooks/useClientLocale';
import { AboutSectionServer } from './AboutSectionServer';

export const AboutSection = () => {
  const locale = useClientLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [translations, setTranslations] = useState<any>(null);

  // Traduções padrão em português
  const defaultTranslations = {
    badge: 'SOBRE NÓS',
    title: 'Transformamos',
    titleHighlight: 'ideias em soluções digitais',
    titleEnd: 'inovadoras',
    description: 'Somos uma empresa de tecnologia que vai além do código. Desenvolvemos plataformas SaaS robustas e escaláveis que transformam a gestão empresarial. Com mais de 8 anos de experiência e 5000 clientes satisfeitos, nossa missão é criar soluções que geram impacto real no seu negócio.',
    cta: 'Conheça Nossa História'
  };

  useEffect(() => {
    fetch(`/locales/${locale}/about.json`)
      .then(res => res.json())
      .then(data => setTranslations(data.about))
      .catch(() => setTranslations(defaultTranslations));
  }, [locale]);

  return <AboutSectionServer translations={translations || defaultTranslations} />;
};
