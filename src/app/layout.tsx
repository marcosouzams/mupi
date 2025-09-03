import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
