import { Metadata } from 'next';
import { cookies } from 'next/headers';
import BienalCasePageClient from '@/components/cases/BienalCasePageClient';

export const metadata: Metadata = {
  title: 'Bienal do Livro Rio 2025 - Case MUPI',
  description: 'Como a MUPI desenvolveu um sistema robusto de agendamento para a Bienal do Livro Rio 2025, suportando milhares de acessos simultâneos.',
};

async function getBienalTranslations(lang: string) {
  const translations = await import(`@/locales/${lang}/bienal-case.json`);
  return translations.default;
}

async function getLanguageFromCookies(): Promise<string> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('NEXT_LOCALE');
  return langCookie?.value || 'pt';
}

export default async function BienalCasePage() {
  const lang = await getLanguageFromCookies();
  const t = await getBienalTranslations(lang);

  return <BienalCasePageClient translations={t} />;
}
