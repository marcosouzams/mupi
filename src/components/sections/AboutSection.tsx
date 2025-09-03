'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const AboutSection = () => {
  const { t } = useTranslation('about');
  const router = useRouter();
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#191927]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Lado Esquerdo - Imagem */}
          <div className="relative w-full h-full mx-auto lg:mx-0">
            <div className="relative h-full">
              {/* Container da imagem sem fundo */}
              <div className="relative h-full">
                <Image
                  src="/parceiros/lucas_praxedes.png"
                  alt="Lucas Praxedes - Fundador da MUPI"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover shadow-xl"
                />
              </div>

              {/* Elementos decorativos menores */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/6 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Lado Direito - Conteúdo */}
          <div className="space-y-6">
            {/* Subtítulo */}
            <div>
              <span className="text-sm font-urbancat-st font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-3 block">
                {t('about.badge')}
              </span>
            </div>

            {/* Heading Principal */}
            <div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-urbancat-st font-bold text-white leading-tight">
                {t('about.title')}{' '}
                <span className="text-[#5667fe]">{t('about.titleHighlight')}</span>{' '}
                {t('about.titleEnd')}
              </h2>
            </div>

            {/* Texto descritivo */}
            <p className="text-base lg:text-lg text-white/80 leading-relaxed font-inter max-w-xl">
              {t('about.description')}
            </p>

            {/* Botão CTA */}
            <div className="pt-4">
              <button 
                onClick={() => router.push('/about')}
                className="group bg-white hover:bg-white/90 text-[#191927] px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <span className="font-medium font-inter">{t('about.cta')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};