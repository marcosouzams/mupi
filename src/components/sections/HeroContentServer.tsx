import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

interface HeroContentServerProps {
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

export const HeroContentServer = ({ translations: t }: HeroContentServerProps) => {
  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Badge */}
      <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#5667fe]/10 to-[#d1dafb]/10 border border-[#5667fe]/20 rounded-full px-6 py-3 backdrop-blur-sm">
        <span className="text-[#d1dafb] text-sm font-medium tracking-wide font-inter uppercase">{t.badge}</span>
      </div>

      {/* Título Principal com H1 semântico */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-5xl xl:text-6xl leading-tight tracking-wide font-urbancat-st">
          <span className="font-bold text-white">beyond</span>{' '}
          <span className="font-thin text-white">technology,</span>
          <br />
          <span className="font-thin text-white">into</span>{' '}
          <span className="font-bold text-white">impact.</span>
        </h1>
      </div>

      {/* Subtítulo */}
      <p className="text-lg lg:text-xl text-[#d1dafb]/70 max-w-2xl leading-relaxed font-light font-inter">
        {t.subtitle}
      </p>

      {/* CTAs com Links Internos */}
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <Link 
          href="/#products" 
          className="group bg-[#5667fe] hover:bg-[#5667fe]/90 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
          aria-label="Ver nossas plataformas SaaS"
        >
          <span className="font-medium font-inter">{t.cta_platforms}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
        </Link>
        
        <Link 
          href="/cases" 
          className="group flex items-center space-x-3 text-[#d1dafb] hover:text-white transition-all duration-300"
          aria-label="Ver nossos casos de sucesso"
        >
          <div className="w-12 h-12 border border-[#d1dafb]/30 hover:border-[#d1dafb] rounded-full flex items-center justify-center group-hover:bg-[#d1dafb]/10 transition-all duration-300">
            <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />
          </div>
          <span className="font-medium font-inter">{t.cta_cases}</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#5667fe]/20">
        <div>
          <div className="text-2xl lg:text-3xl font-light text-white mb-1 font-inter" aria-label="Mais de 200 projetos entregues">200+</div>
          <div className="text-sm text-[#d1dafb]/60 font-light font-inter">{t.stats.projects}</div>
        </div>
        <div>
          <div className="text-2xl lg:text-3xl font-light text-white mb-1 font-inter" aria-label="Mais de 5000 clientes ativos">5000+</div>
          <div className="text-sm text-[#d1dafb]/60 font-light font-inter">{t.stats.clients}</div>
        </div>
        <div>
          <div className="text-2xl lg:text-3xl font-light text-white mb-1 font-inter" aria-label="8 anos de experiência no mercado">8 anos</div>
          <div className="text-sm text-[#d1dafb]/60 font-light font-inter">{t.stats.experience}</div>
        </div>
      </div>
    </div>
  );
};
