'use client';

import { useEffect, useState } from 'react';
import { FooterServer } from './FooterServer';
import { useClientLocale } from '@/hooks/useClientLocale';

// Traduções padrão em português para o primeiro render
const defaultTranslations = {
  description: "Transformamos ideias em soluções digitais inovadoras, oferecendo plataformas SaaS que impulsionam o crescimento dos negócios.",
  socialMedia: "Redes Sociais",
  products: "Produtos",
  company: "Empresa",
  support: "Suporte",
  copyright: "Todos os direitos reservados.",
  links: {
    products: {
      eagenda: "eAgenda",
      minhaSala: "Minha Sala Virtual",
      meuAtendimento: "Meu Atendimento Virtual",
      atendeAqui: "Atende Aqui",
      eQualifica: "eQualifica",
      eTalentos: "eTalentos",
      sigVirtual: "SIG-Virtual"
    },
    company: {
      about: "Sobre nós",
      partners: "Parceiros",
      careers: "Carreiras",
      blog: "Blog"
    },
    support: {
      contact: "Contato"
    }
  }
};

// Client Component - Wrapper que carrega traduções
export const FooterClient = () => {
  const locale = useClientLocale();
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/footer.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data.footer);
        }
      } catch (error) {
        console.error('Error loading footer translations:', error);
      }
    };

    if (locale) {
      loadTranslations();
    }
  }, [locale]);

  return <FooterServer translations={translations} />;
};
