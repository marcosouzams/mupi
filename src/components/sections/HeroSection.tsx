import { HeroContentServer } from '@/components/sections/HeroContentServer';
import { ScrollIndicator } from '@/components/sections/ScrollIndicator';

interface HeroSectionProps {
  translations: {
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

export const HeroSection = ({ translations }: HeroSectionProps) => {
  
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

      {/* Conteúdo Principal */}
      <div className="relative z-20 max-w-8xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex items-center min-h-[80vh] py-20">
          {/* Lado Esquerdo - Conteúdo */}
          <div className="max-w-3xl">
            <HeroContentServer translations={translations} />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};