import { HeroSection, PartnersSection, ProductsSection, AboutSection, WhyMupiSection, ContactSection } from '@/components';
import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

interface HeroTranslations {
  hero: {
    badge: string;
    subtitle: string;
    cta_platforms: string;
    cta_cases: string;
    stats: {
      projects: string;
      clients: string;
      experience: string;
    };
  };
}

interface PartnersTranslations {
  partners: {
    title: string;
    subtitle: string;
    description: string;
  };
}

interface ProductsTranslations {
  products: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    leftSection: {
      title: string;
      titleHighlight: string;
      paragraph1: string;
      paragraph2: string;
      tags: {
        customerService: string;
        hrManagement: string;
        textAnalysis: string;
        smartContracts: string;
      };
    };
    ctaLearnMore: string;
    items: {
      [key: string]: {
        title: string;
        category: string;
        description: string;
        features: string[];
      };
    };
  };
}

interface AboutTranslations {
  about: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    cta: string;
  };
}

interface WhyMupiTranslations {
  whymupi: {
    casesTitle: string;
    casesTitleHighlight: string;
    casesDescription: string;
    ctaAllCases: string;
  };
}

interface CasesTranslations {
  cases: {
    caseData: {
      [key: string]: {
        title: string;
        shortTitle: string;
        description: string;
        category: string;
      };
    };
  };
}

interface ContactTranslations {
  contact: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    info: {
      information: {
        title: string;
        value: string;
      };
      support: {
        title: string;
        value: string;
      };
      whatsapp: {
        title: string;
        value: string;
      };
      location: {
        title: string;
        value: string;
      };
    };
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      required: string;
    };
  };
}

async function getHeroTranslations(lang: string = 'pt'): Promise<HeroTranslations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'hero.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getPartnersTranslations(lang: string = 'pt'): Promise<PartnersTranslations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'partners.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getProductsTranslations(lang: string = 'pt'): Promise<ProductsTranslations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'products.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getAboutTranslations(lang: string = 'pt'): Promise<AboutTranslations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'about.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getWhyMupiTranslations(lang: string = 'pt'): Promise<WhyMupiTranslations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'whymupi.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getCasesTranslations(lang: string = 'pt'): Promise<CasesTranslations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'cases.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getContactTranslations(lang: string = 'pt'): Promise<ContactTranslations> {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'contact.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Gera metadata dinamicamente
export async function generateMetadata(): Promise<Metadata> {
  return {
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
}

const HomePage = async () => {
  // SEMPRE gera com PT para SSG perfeito (SEO, crawlers)
  // O client-side fará a mudança se necessário via router.refresh()
  const lang = 'pt';
  
  // Load translations server-side for better SEO and performance
  const heroTranslations = await getHeroTranslations(lang);
  const partnersTranslations = await getPartnersTranslations(lang);
  const productsTranslations = await getProductsTranslations(lang);
  const aboutTranslations = await getAboutTranslations(lang);
  const whyMupiTranslations = await getWhyMupiTranslations(lang);
  const casesTranslations = await getCasesTranslations(lang);
  const contactTranslations = await getContactTranslations(lang);
  
  return (
    <>
      <div className="bg-[#191927]">
        <HeroSection translations={heroTranslations.hero} />
      </div>
      
      {/* PartnersSection com fundo azul */}
      <div className="bg-[#5667fe] rounded-b-[120px]">
        <PartnersSection translations={partnersTranslations.partners} />
      </div>
      
      {/* ProductsSection com fundo azul claro */}
      <div className="bg-[#d1dafb]">
        <ProductsSection translations={productsTranslations.products} />
      </div>
      
      {/* AboutSection com fundo amarelo */}
      <div className="bg-[#a99801]">
        <AboutSection translations={aboutTranslations.about} />
      </div>
      
      {/* WhyMupiSection com fundo branco */}
      <WhyMupiSection 
        translations={whyMupiTranslations.whymupi}
        casesTranslations={casesTranslations.cases.caseData}
      />
      
      {/* ContactSection com fundo azul escuro */}
      <ContactSection translations={contactTranslations.contact} />
    </>
  );
};

export default HomePage;
