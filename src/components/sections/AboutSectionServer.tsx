import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AboutSectionServerProps {
  translations: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    cta: string;
  };
}

// Server Component (SSR) - Conteúdo crawleável
export const AboutSectionServer = ({ translations: t }: AboutSectionServerProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#191927]" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Lado Esquerdo - Imagem (SSR) */}
          <div className="relative w-full h-full mx-auto lg:mx-0">
            <div className="relative h-full">
              <div className="relative h-full">
                <Image
                  src="/parceiros/lucas_praxedes.png"
                  alt="Lucas Praxedes - Fundador da MUPI Systems, líder em soluções digitais inovadoras"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover shadow-xl"
                  priority
                />
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/6 rounded-full blur-xl" aria-hidden="true"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" aria-hidden="true"></div>
            </div>
          </div>

          {/* Lado Direito - Conteúdo (SSR) */}
          <div className="space-y-6">
            {/* Badge */}
            <div>
              <span className="text-sm font-urbancat-st font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-3 block">
                {t.badge}
              </span>
            </div>

            {/* Heading Principal com H2 semântico */}
            <div>
              <h2 id="about-heading" className="text-3xl lg:text-4xl xl:text-5xl font-urbancat-st font-bold text-white leading-tight">
                {t.title}{' '}
                <span className="text-[#5667fe]">{t.titleHighlight}</span>{' '}
                {t.titleEnd}
              </h2>
            </div>

            {/* Texto descritivo */}
            <p className="text-base lg:text-lg text-white/80 leading-relaxed font-inter max-w-xl">
              {t.description}
            </p>

            {/* Botão CTA */}
            <div className="pt-4">
              <Link 
                href="/about"
                className="group inline-flex bg-white hover:bg-white/90 text-[#191927] px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 items-center space-x-3"
                aria-label="Saiba mais sobre a MUPI Systems"
              >
                <span className="font-medium font-inter">{t.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
