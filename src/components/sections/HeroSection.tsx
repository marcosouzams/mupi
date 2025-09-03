'use client';

import { HeroContent } from '@/components/sections/HeroContent';
import { ScrollIndicator } from '@/components/sections/ScrollIndicator';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/banner.jpg)',
        }}
      >
        {/* Overlay escuro para melhorar legibilidade */}
        <div className="absolute inset-0 bg-[#191927]/70"></div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-20 max-w-8xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex items-center min-h-[80vh] py-20">
          {/* Lado Esquerdo - Conteúdo */}
          <div className="max-w-3xl">
            <HeroContent />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};