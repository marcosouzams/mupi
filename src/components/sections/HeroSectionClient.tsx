'use client';

import { useEffect, useState } from 'react';
import { useClientLocale } from '@/hooks/useClientLocale';
import { HeroSectionServer } from './HeroSectionServer';

// Traduções padrão em português para SSR e fallback
const defaultTranslations = {
  badge: 'Soluções Digitais Inovadoras',
  title: {
    line1: {
      bold: 'beyond',
      light: 'technology,'
    },
    line2: {
      light: 'into',
      bold: 'impact.'
    }
  },
  subtitle: 'Transformamos ideias em soluções digitais inovadoras. Plataformas SaaS que impulsionam o crescimento dos negócios com tecnologia de ponta, atendendo mais de 5000 clientes em todo o Brasil.',
  cta: {
    platforms: 'Nossas Plataformas',
    cases: 'Ver Cases de Sucesso'
  },
  stats: {
    projects: {
      value: '200+',
      label: 'Projetos Entregues'
    },
    clients: {
      value: '5000+',
      label: 'Clientes Ativos'
    },
    experience: {
      value: '8 anos',
      label: 'de Experiência'
    }
  }
};

export const HeroSection = () => {
  const locale = useClientLocale();
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    // Carrega as traduções baseado no idioma
    fetch(`/locales/${locale}/hero.json`)
      .then(res => res.json())
      .then(data => {
        // Mapeia as traduções para o formato esperado
        setTranslations({
          badge: data.hero.badge,
          title: {
            line1: {
              bold: 'beyond',
              light: 'technology,'
            },
            line2: {
              light: 'into',
              bold: 'impact.'
            }
          },
          subtitle: data.hero.subtitle,
          cta: {
            platforms: data.hero.cta_platforms,
            cases: data.hero.cta_cases
          },
          stats: {
            projects: {
              value: '200+',
              label: data.hero.stats.projects
            },
            clients: {
              value: '5000+',
              label: data.hero.stats.clients
            },
            experience: {
              value: '8 anos',
              label: data.hero.stats.experience
            }
          }
        });
      })
      .catch(() => {
        // Mantém traduções padrão em caso de erro
        setTranslations(defaultTranslations);
      });
  }, [locale]);

  return <HeroSectionServer translations={translations} />;
};
