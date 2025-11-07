import { HeroSection, PartnersSection, ProductsSection, AboutSection, WhyMupiSection, ContactSection } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MUPI Systems - Soluções Digitais Inovadoras para Transformar seu Negócio',
  description: 'Transformamos ideias em soluções digitais inovadoras. Plataformas SaaS como eAgenda, Minha Sala Virtual, Meu Atendimento, eQualifica e mais. Mais de 5000 clientes satisfeitos e 8 anos de experiência em tecnologia.',
  keywords: 'SaaS, soluções digitais, plataformas, tecnologia, MUPI Systems, eAgenda, Minha Sala Virtual, Meu Atendimento, gestão de atendimento, gestão educacional, agendamento online, transformação digital',
  authors: [{ name: 'MUPI Systems' }],
  openGraph: {
    title: 'MUPI Systems - Soluções Digitais Inovadoras para Transformar seu Negócio',
    description: 'Transformamos ideias em soluções digitais inovadoras. Plataformas SaaS como eAgenda, Minha Sala Virtual, Meu Atendimento, eQualifica e mais. Mais de 5000 clientes satisfeitos e 8 anos de experiência em tecnologia.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mupisystems.com.br',
    siteName: 'MUPI Systems',
    images: [
      {
        url: '/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'MUPI Systems - Soluções Digitais Inovadoras',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MUPI Systems - Soluções Digitais Inovadoras',
    description: 'Transformamos ideias em soluções digitais inovadoras com plataformas SaaS de alta qualidade.',
    images: ['/banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mupisystems.com.br',
    languages: {
      'pt-BR': 'https://mupisystems.com.br',
      'en': 'https://mupisystems.com.br/en',
      'es': 'https://mupisystems.com.br/es',
    },
  },
};

const HomePage = () => {
  return (
    <>
      {/* Hidden H1 for SEO - visible to crawlers */}
      <h1 className="sr-only">
        MUPI Systems - Soluções Digitais Inovadoras e Plataformas SaaS para Transformação Digital
      </h1>
      
      <div className="bg-[#191927]">
        <HeroSection />
      </div>
      
      {/* PartnersSection com fundo azul */}
      <div className="bg-[#5667fe] rounded-b-[120px]">
        <PartnersSection />
      </div>
      
      {/* ProductsSection com fundo azul claro */}
      <div className="bg-[#d1dafb]">
        <ProductsSection />
      </div>
      
      {/* AboutSection com fundo amarelo */}
      <div className="bg-[#a99801]">
        <AboutSection />
      </div>
      
      {/* WhyMupiSection com fundo branco */}
      <WhyMupiSection />
      
      {/* ContactSection com fundo azul escuro */}
      <ContactSection />
    </>
  );
};

export default HomePage;
