import { PartnersSwiper } from './PartnersSwiper';

interface PartnersSectionProps {
  translations: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export const PartnersSection = ({ translations: t }: PartnersSectionProps) => {
  
  const partners = [
    { name: 'Ampro', logo: '/parceiros/ampro.png' },
    { name: 'Bayer', logo: '/parceiros/bayer.png' },
    { name: 'Corteva', logo: '/parceiros/corteva.png' },
    { name: 'Globo', logo: '/parceiros/globo.png' },
    { name: 'Uniasselvi', logo: '/parceiros/uniasselvi.png' },
    { name: 'Unimed', logo: '/parceiros/unimed.png' },
    { name: 'Bimbo', logo: '/parceiros/bimbo.png' },
    { name: 'Fiocruz', logo: '/parceiros/fiocruz.png' },
    { name: 'Fraport', logo: '/parceiros/fraport.png' },
    { name: 'Joie', logo: '/parceiros/joie.png' },
    { name: 'OAB', logo: '/parceiros/oab.png' },
    { name: '1º Registro de Imóveis de Montes Claros', logo: '/parceiros/1rimc.png' },
    { name: 'Bienal do Livro', logo: '/parceiros/bienal.png' }
  ];

  return (
    <div className='bg-white'>
      <section id="partners" className="py-20 rounded-b-[50px] bg-white border-radius px-4 sm:px-6 lg:px-8" data-section="partners">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-urbancat-st font-bold text-[#191927]">
              {t.title}{' '}
              <span className="text-[#5667fe]">{t.subtitle}</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-4">
              {t.description}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#5667fe] to-white mx-auto rounded-full"></div>
          </div>

          {/* Partners Slider - Client Component */}
          <PartnersSwiper partners={partners} />

          {/* Bottom decorative element */}
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-[#5667fe] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#191927] rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-[#5667fe] rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};