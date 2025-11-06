import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ClientLayout } from "@/components";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
        
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
