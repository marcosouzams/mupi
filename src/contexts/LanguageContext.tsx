'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('pt');
  const router = useRouter();

  // Carrega a linguagem do cookie na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookieLang = Cookies.get('NEXT_LOCALE') as Language;
      if (cookieLang && ['pt', 'en', 'es'].includes(cookieLang)) {
        setLanguageState(cookieLang);
      }
    }
  }, []);

  // Função para atualizar a linguagem, salvar no cookie e recarregar a página
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      // Salva no cookie (expires in 365 days)
      Cookies.set('NEXT_LOCALE', lang, { expires: 365 });
      // Também mantém no localStorage para compatibilidade
      localStorage.setItem('mupi-language', lang);
      // Recarrega a página para buscar novas traduções do servidor
      router.refresh();
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
