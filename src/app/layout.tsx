import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ClientLayout } from "@/components";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MUPI Systems - Soluções Digitais Inovadoras",
  description: "Transformamos ideias em soluções digitais inovadoras, oferecendo plataformas SaaS que impulsionam o crescimento dos negócios.",
  keywords: "SaaS, soluções digitais, plataformas, tecnologia, MUPI Systems",
  authors: [{ name: "MUPI Systems" }],
  openGraph: {
    title: "MUPI Systems - Soluções Digitais Inovadoras",
    description: "Transformamos ideias em soluções digitais inovadoras, oferecendo plataformas SaaS que impulsionam o crescimento dos negócios.",
    type: "website",
    locale: "pt_BR",
  },
};

async function getLanguageFromCookies(): Promise<'pt' | 'en' | 'es'> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value;
  
  if (lang && ['pt', 'en', 'es'].includes(lang)) {
    return lang as 'pt' | 'en' | 'es';
  }
  
  return 'pt';
}

async function getNavigationTranslations(lang: string) {
  const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'navigation.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getFooterTranslations(lang: string) {
  const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'footer.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentLang = await getLanguageFromCookies();
  const navTranslations = await getNavigationTranslations(currentLang);
  const footerTranslations = await getFooterTranslations(currentLang);

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
