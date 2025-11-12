import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { CasesPageClient } from '@/components/cases/CasesPageClient';
import { getFeaturedCases, getCasesBySector } from '@/data/cases';

interface CasesTranslations {
  cases: {
    hero: {
      viewFullCase: string;
    };
    header: {
      subtitle: string;
      title: string;
      description: string;
    };
    filters: {
      filterBySector: string;
    };
    caseCard: {
      viewFullCase: string;
    };
    emptyState: {
      title: string;
      description: string;
      viewAll: string;
    };
    cta: {
      title: string;
      description: string;
      contactSpecialists: string;
      knowSolutions: string;
    };
    sectors: Record<string, string>;
    caseData: Record<string, {
      title: string;
      shortTitle: string;
      description: string;
      category: string;
    }>;
  };
}

async function getLanguageFromCookies(): Promise<'pt' | 'en' | 'es'> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value;
  
  if (lang && ['pt', 'en', 'es'].includes(lang)) {
    return lang as 'pt' | 'en' | 'es';
  }
  
  return 'pt';
}

async function getCasesTranslations(lang: string): Promise<CasesTranslations> {
  const translationsPt = await import('@/locales/pt/cases.json');
  const translationsEn = await import('@/locales/en/cases.json');
  const translationsEs = await import('@/locales/es/cases.json');
  
  const translations = {
    pt: translationsPt.default,
    en: translationsEn.default,
    es: translationsEs.default,
  };
  
  return translations[lang as keyof typeof translations] || translations.pt;
}

export const metadata: Metadata = {
  title: 'Cases de Sucesso - MUPI Systems',
  description: 'Explore nossos cases de sucesso e descubra como transformamos desafios em resultados excepcionais.',
};

export default async function CasesPage() {
  const currentLang = await getLanguageFromCookies();
  const t = await getCasesTranslations(currentLang);
  
  const featuredCases = getFeaturedCases();
  const allCases = getCasesBySector('todos');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client Component with interactive features */}
      <CasesPageClient 
        translations={t}
        featuredCases={featuredCases}
        allCases={allCases}
      />
    </div>
  );
}
