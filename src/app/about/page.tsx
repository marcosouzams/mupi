import Image from 'next/image';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/about/AboutPageClient';

interface AboutTranslations {
  title: string;
  subtitle: string;
  description: string;
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
  };
  story: {
    badge: string;
    description: string;
    extraText: string;
  };
  nameOrigin: {
    description: string;
    extraText: string;
    extraText2: string;
  };
  values: {
    badge: string;
    title: string;
    subtitle: string;
    list: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    contactButton: string;
    platformsButton: string;
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

async function getAboutTranslations(lang: string): Promise<AboutTranslations> {
  const translationsPt = await import('@/locales/pt/about-page.json');
  const translationsEn = await import('@/locales/en/about-page.json');
  const translationsEs = await import('@/locales/es/about-page.json');
  
  const translations = {
    pt: translationsPt.default,
    en: translationsEn.default,
    es: translationsEs.default,
  };
  
  return translations[lang as keyof typeof translations] || translations.pt;
}

export const metadata: Metadata = {
  title: 'Sobre a MUPI Systems - Nossa História e Valores',
  description: 'Fundada em 2017, a MUPI Systems é especializada em tecnologia e inovação, desenvolvendo soluções escaláveis que promovem a transformação digital.',
};

export default async function AboutPage() {
  const currentLang = await getLanguageFromCookies();
  const t = await getAboutTranslations(currentLang);

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/SOBRE_HERO.png"
            alt="About Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 w-full">
          <div className="max-w-3xl">
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-bold text-white">{t.hero.titleLine1}</span>
              </h1>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-thin text-white">{t.hero.titleLine2}</span>
              </h2>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-bold text-white">{t.hero.titleLine3}</span>
              </h3>
            </div>
            <p className="text-sm lg:text-base text-white/90 font-light leading-relaxed max-w-2xl font-urbancat-st uppercase">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-4">
              {t.story.badge}
            </h2>
            <div className="w-16 h-1 bg-[#d1dafb]"></div>
          </div>

          <div>
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed">
                  <strong>{t.description}</strong>
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t.story.description}
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t.story.extraText}
                </p>
              </div>

              <div>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed">
                  <strong>{t.nameOrigin.description}</strong>
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t.nameOrigin.extraText}
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t.nameOrigin.extraText2}
                </p>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/team.jpg"
                alt="Equipe MUPI"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <AboutPageClient translations={t} />
    </div>
  );
}
