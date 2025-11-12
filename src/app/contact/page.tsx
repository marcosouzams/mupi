import { Metadata } from 'next';
import { cookies } from 'next/headers';
import ContactPageClient from '@/components/contact/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contato - MUPI',
  description: 'Entre em contato com a MUPI. Estamos prontos para transformar a gestão da sua organização.',
};

async function getContactTranslations(lang: string) {
  const translations = await import(`@/locales/${lang}/contact-page.json`);
  return translations.default;
}

async function getLanguageFromCookies(): Promise<string> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('NEXT_LOCALE');
  return langCookie?.value || 'pt';
}

export default async function ContactPage() {
  const lang = await getLanguageFromCookies();
  const t = await getContactTranslations(lang);

  return <ContactPageClient translations={t} />;
}