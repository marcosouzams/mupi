import { Metadata } from 'next';
import { cookies } from 'next/headers';
import RimcCasePageClient from '@/components/cases/RimcCasePageClient';

export const metadata: Metadata = {
  title: '1º RIMC - Case MUPI',
  description: 'Como a MUPI modernizou o atendimento do 1º Registro de Imóveis de Montes Claros com sistema híbrido de agendamento.',
};

async function getRimcTranslations(lang: string) {
  const translations = await import(`@/locales/${lang}/rimc-case.json`);
  return translations.default;
}

async function getLanguageFromCookies(): Promise<string> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('NEXT_LOCALE');
  return langCookie?.value || 'pt';
}

export default async function RimcCasePage() {
  const lang = await getLanguageFromCookies();
  const t = await getRimcTranslations(lang);

  return <RimcCasePageClient translations={t} />;
}
