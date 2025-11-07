'use client';

import { useEffect, useState } from 'react';
import { useClientLocale } from '@/hooks/useClientLocale';
import { ContactSectionServer } from './ContactSectionServer';

export const ContactSection = () => {
  const locale = useClientLocale();
  const [translations, setTranslations] = useState<any>(null);

  // Traduções padrão em português
  const defaultTranslations = {
    badge: 'ENTRE EM CONTATO',
    title: 'Vamos conversar sobre seu',
    titleHighlight: 'próximo projeto',
    description: 'Estamos prontos para transformar suas ideias em soluções digitais inovadoras. Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer.',
    info: {
      information: {
        title: 'Informações',
        value: 'contato@mupisystems.com.br'
      },
      support: {
        title: 'Suporte',
        value: 'suporte@mupisystems.com.br'
      },
      whatsapp: {
        title: 'Whatsapp',
        value: '+55 11 94252 9100'
      },
      location: {
        title: 'Onde nos encontrar',
        value: 'Rua Dom João Pimenta 701, loja 2, Montes Claros-MG'
      }
    },
    form: {
      name: 'Nome',
      namePlaceholder: 'Seu nome completo',
      email: 'Email',
      emailPlaceholder: 'seu@email.com',
      company: 'Empresa',
      companyPlaceholder: 'Nome da sua empresa',
      message: 'Mensagem',
      messagePlaceholder: 'Conte-nos sobre seu projeto ou necessidade...',
      submit: 'Enviar mensagem',
      required: ' *'
    }
  };

  useEffect(() => {
    fetch(`/locales/${locale}/contact.json`)
      .then(res => res.json())
      .then(data => setTranslations(data.contact))
      .catch(() => setTranslations(defaultTranslations));
  }, [locale]);

  return <ContactSectionServer translations={translations || defaultTranslations} />;
};
