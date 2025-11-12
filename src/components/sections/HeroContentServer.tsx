import { HeroCTAButtons } from './HeroCTAButtons';

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

      {/* CTAs - Client Component */}
      <HeroCTAButtons 
        ctaPlatforms={t.cta_platforms}
        ctaCases={t.cta_cases}
      />

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
