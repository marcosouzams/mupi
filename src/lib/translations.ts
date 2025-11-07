import fs from 'fs';
import path from 'path';

export type Locale = 'pt' | 'en' | 'es';

/**
 * Carrega as traduções de um arquivo JSON específico para um idioma
 * Funciona apenas no servidor (SSR/RSC)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslations(locale: Locale, namespace: string): Record<string, any> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading translations for ${locale}/${namespace}:`, error);
    // Fallback para português se houver erro
    if (locale !== 'pt') {
      return getTranslations('pt', namespace);
    }
    return {};
  }
}

/**
 * Helper para obter valor aninhado de um objeto usando notação de ponto
 * Ex: get(obj, 'nav.home') retorna obj.nav.home
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNestedValue(obj: Record<string, any>, path: string): string {
  const result = path.split('.').reduce((current, key) => current?.[key], obj);
  return typeof result === 'string' ? result : path;
}

/**
 * Cria uma função 't' (translate) para um namespace específico
 */
export function createTranslator(locale: Locale, namespace: string) {
  const translations = getTranslations(locale, namespace);
  
  return (key: string): string => {
    return getNestedValue(translations, key);
  };
}
