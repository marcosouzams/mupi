import Image from 'next/image';

interface Partner {
  name: string;
  logo: string;
  website?: string;
}

interface PartnersSectionServerProps {
  translations: {
    title: string;
    subtitle: string;
    description: string;
  };
}

const partners: Partner[] = [
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

export const PartnersSectionServer = ({ translations: t }: PartnersSectionServerProps) => {
  return (
    <div className='bg-white'>
      <section id="partners" className="py-20 rounded-b-[50px] bg-white border-radius px-4 sm:px-6 lg:px-8" data-section="partners">
        <div className="max-w-7xl mx-auto">
          {/* Header with H2 */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-urbancat-st font-bold text-[#191927]">
              {t.title}{' '}
              <span className="text-[#5667fe]">{t.subtitle}</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-4 mt-4">
              {t.description}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#5667fe] to-white mx-auto rounded-full"></div>
          </div>

          {/* Partners Grid - SEO friendly */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-32 flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name} - Cliente MUPI Systems`}
                  width={120}
                  height={80}
                  className="max-h-20 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* SEO Content - Descrição dos parceiros */}
          <div className="max-w-4xl mx-auto text-center mt-12">
            <p className="text-sm text-gray-600 leading-relaxed">
              A MUPI Systems tem orgulho de colaborar com empresas líderes em diversos setores, incluindo 
              saúde (Unimed, Fiocruz), agronegócio (Bayer, Corteva), educação (Uniasselvi), mídia (Globo), 
              aviação (Fraport), jurídico (OAB, 1º RIMC), produtos infantis (Joie), alimentos (Bimbo), 
              eventos culturais (Bienal do Livro) e associações profissionais (Ampro). Nossa experiência 
              diversificada permite entregar soluções tecnológicas customizadas que atendem às necessidades 
              específicas de cada segmento de mercado, sempre com foco em inovação, qualidade e resultados 
              mensuráveis.
            </p>
          </div>

          {/* Bottom decorative element */}
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-[#5667fe] rounded-full animate-pulse" aria-hidden="true"></div>
              <div className="w-2 h-2 bg-[#191927] rounded-full animate-pulse delay-100" aria-hidden="true"></div>
              <div className="w-2 h-2 bg-[#5667fe] rounded-full animate-pulse delay-200" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
