import { ScrollIndicator } from './ScrollIndicator';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export interface HeroSectionProps {
  translations?: {
    badge: string;
    title: {
      line1: {
        bold: string;
        light: string;
      };
      line2: {
        light: string;
        bold: string;
      };
    };
    subtitle: string;
    cta: {
      platforms: string;
      cases: string;
    };
    stats: {
      projects: {
        value: string;
        label: string;
      };
      clients: {
        value: string;
        label: string;
      };
      experience: {
        value: string;
        label: string;
      };
    };
  };
}

// Traduções padrão em português (para SEO e SSR)
const defaultTranslations = {
  badge: 'Soluções Digitais Inovadoras',
  title: {
    line1: {
      bold: 'beyond',
      light: 'technology,'
    },
    line2: {
      light: 'into',
      bold: 'impact.'
    }
  },
  subtitle: 'Transformamos ideias em soluções digitais inovadoras. Plataformas SaaS que impulsionam o crescimento dos negócios com tecnologia de ponta, atendendo mais de 5000 clientes em todo o Brasil.',
  cta: {
    platforms: 'Nossas Plataformas',
    cases: 'Ver Cases de Sucesso'
  },
  stats: {
    projects: {
      value: '200+',
      label: 'Projetos Entregues'
    },
    clients: {
      value: '5000+',
      label: 'Clientes Ativos'
    },
    experience: {
      value: '8 anos',
      label: 'de Experiência'
    }
  }
};

// Server Component (SSR) - Conteúdo crawleável
export const HeroSectionServer = ({ translations = defaultTranslations }: HeroSectionProps) => {
  const t = translations;

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden rounded-b-[3rem]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-[3rem]"
        style={{
          backgroundImage: 'url(/banner.jpg)',
        }}
      >
        {/* Overlay escuro para melhorar legibilidade */}
        <div className="absolute inset-0 bg-[#191927]/70 rounded-b-[3rem]"></div>
      </div>

      {/* Conteúdo Principal - Server Side Rendered */}
      <div className="relative z-20 max-w-8xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex items-center min-h-[80vh] py-20">
          <div className="max-w-3xl space-y-8 lg:space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#5667fe]/10 to-[#d1dafb]/10 border border-[#5667fe]/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <span className="text-[#d1dafb] text-sm font-medium tracking-wide font-inter uppercase">
                {t.badge}
              </span>
            </div>

            {/* Título Principal - H1 visível */}
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-5xl xl:text-6xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-bold text-white">{t.title.line1.bold}</span>{' '}
                <span className="font-thin text-white">{t.title.line1.light}</span>
              </h1>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-thin text-white">{t.title.line2.light}</span>{' '}
                <span className="font-bold text-white">{t.title.line2.bold}</span>
              </h2>
            </div>

            {/* Subtítulo - Conteúdo SEO */}
            <p className="text-lg lg:text-xl text-[#d1dafb]/70 max-w-2xl leading-relaxed font-light font-inter">
              {t.subtitle}
            </p>

            {/* CTAs - Links crawleáveis */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/#products"
                className="group bg-[#5667fe] hover:bg-[#5667fe]/90 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                aria-label="Conheça nossas plataformas SaaS"
              >
                <span className="font-medium font-inter">{t.cta.platforms}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link 
                href="/cases"
                className="group flex items-center space-x-3 text-[#d1dafb] hover:text-white transition-all duration-300"
                aria-label="Veja nossos casos de sucesso"
              >
                <div className="w-12 h-12 border border-[#d1dafb]/30 hover:border-[#d1dafb] rounded-full flex items-center justify-center group-hover:bg-[#d1dafb]/10 transition-all duration-300">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
                <span className="font-medium font-inter">{t.cta.cases}</span>
              </Link>
            </div>

            {/* Stats - Conteúdo SEO */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#5667fe]/20">
              <div>
                <div className="text-2xl lg:text-3xl font-light text-white mb-1 font-inter">{t.stats.projects.value}</div>
                <div className="text-sm text-[#d1dafb]/60 font-light font-inter">{t.stats.projects.label}</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-light text-white mb-1 font-inter">{t.stats.clients.value}</div>
                <div className="text-sm text-[#d1dafb]/60 font-light font-inter">{t.stats.clients.label}</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-light text-white mb-1 font-inter">{t.stats.experience.value}</div>
                <div className="text-sm text-[#d1dafb]/60 font-light font-inter">{t.stats.experience.label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Component - Apenas animação de scroll */}
      <ScrollIndicator />
    </section>
  );
};
