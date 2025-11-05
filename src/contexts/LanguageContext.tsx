'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  // Carrega a linguagem do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('mupi-language') as Language;
      if (storedLang && ['pt', 'en', 'es'].includes(storedLang)) {
        setLanguageState(storedLang);
      }
    }
  }, []);

  // Função para atualizar a linguagem e salvar no localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mupi-language', lang);
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
