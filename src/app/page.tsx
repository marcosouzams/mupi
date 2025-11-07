import { 
  HeroSection, 
  PartnersSection, 
  ProductsSection, 
  AboutSection, 
  WhyMupiSection, 
  ContactSection 
} from '@/components';
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
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MUPI Systems',
    url: 'https://mupisystems.com.br',
    logo: 'https://mupisystems.com.br/logo_mupi.png',
    description: 'Empresa brasileira especializada em soluções digitais inovadoras e plataformas SaaS que transformam a gestão empresarial',
    foundingDate: '2017',
    slogan: 'Beyond technology, into impact',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'MG',
      addressLocality: 'Montes Claros'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'comercial@mupisystems.com.br',
      availableLanguage: ['Portuguese', 'English', 'Spanish']
    },
    sameAs: [
      'https://www.linkedin.com/company/mupi-systems',
      'https://www.instagram.com/mupisystems'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Plataformas SaaS',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'SoftwareApplication',
            name: 'eAgenda',
            applicationCategory: 'BusinessApplication',
            description: 'Plataforma de gestão de agendamentos online',
            url: 'https://eagenda.com.br',
            operatingSystem: 'Web'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'SoftwareApplication',
            name: 'Minha Sala Virtual',
            applicationCategory: 'EducationalApplication',
            description: 'Plataforma de educação a distância',
            url: 'https://minhasalavirtual.com',
            operatingSystem: 'Web'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'SoftwareApplication',
            name: 'Meu Atendimento',
            applicationCategory: 'BusinessApplication',
            description: 'Gestão de atendimento ao cliente',
            url: 'https://meuatendimentovirtual.com.br',
            operatingSystem: 'Web'
          }
        }
      ]
    }
  };

  return (
    <>
      {/* Structured Data for Rich SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO - Small and legitimate */}
      <h1 className="sr-only">
        MUPI Systems - Soluções Digitais Inovadoras e Plataformas SaaS
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
