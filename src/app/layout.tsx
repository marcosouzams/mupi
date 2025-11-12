import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ClientLayout } from "@/components";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from 'next/headers';

// Import translations directly (better for serverless environments)
import navPt from '@/locales/pt/navigation.json';
import navEn from '@/locales/en/navigation.json';
import navEs from '@/locales/es/navigation.json';
import footerPt from '@/locales/pt/footer.json';
import footerEn from '@/locales/en/footer.json';
import footerEs from '@/locales/es/footer.json';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mupisystems.com.br'),
  title: {
    default: "MUPI Systems - Soluções Digitais Inovadoras",
    template: "%s | MUPI Systems"
  },
  description: "Transformamos ideias em soluções digitais inovadoras, oferecendo plataformas SaaS que impulsionam o crescimento dos negócios.",
  keywords: "SaaS, soluções digitais, plataformas, tecnologia, MUPI Systems",
  authors: [{ name: "MUPI Systems" }],
  openGraph: {
    title: "MUPI Systems - Soluções Digitais Inovadoras",
    description: "Transformamos ideias em soluções digitais inovadoras, oferecendo plataformas SaaS que impulsionam o crescimento dos negócios.",
    type: "website",
    locale: "pt_BR",
    siteName: "MUPI Systems",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: undefined, // Add your Google Search Console verification code here
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

async function getLanguageFromCookies(): Promise<'pt' | 'en' | 'es'> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value;
  
  if (lang && ['pt', 'en', 'es'].includes(lang)) {
    return lang as 'pt' | 'en' | 'es';
  }
  
  return 'pt';
}

function getNavigationTranslations(lang: string) {
  const translations = {
    pt: navPt,
    en: navEn,
    es: navEs,
  };
  return translations[lang as keyof typeof translations] || navPt;
}

function getFooterTranslations(lang: string) {
  const translations = {
    pt: footerPt,
    en: footerEn,
    es: footerEs,
  };
  return translations[lang as keyof typeof translations] || footerPt;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentLang = await getLanguageFromCookies();
  const navTranslations = getNavigationTranslations(currentLang);
  const footerTranslations = getFooterTranslations(currentLang);

  return (
    <html lang={currentLang === 'pt' ? 'pt-BR' : currentLang === 'en' ? 'en-US' : 'es-ES'}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} antialiased font-inter`}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-NTZVTPKD7N"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NTZVTPKD7N');
            `,
          }}
        />
        
        <LanguageProvider>
          <ClientLayout 
            navTranslations={navTranslations}
            footerTranslations={footerTranslations}
            initialLanguage={currentLang}
          >
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
