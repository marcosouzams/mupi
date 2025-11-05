'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

export const PartnersSection = () => {
  const { t } = useTranslation('partners');
  
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
              {t('partners.title')}{' '}
              <span className="text-[#5667fe]">{t('partners.subtitle')}</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-4">
              {t('partners.description')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#5667fe] to-white mx-auto rounded-full"></div>
          </div>

          {/* Partners Slider */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 60,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 70,
                },
              }}
              className="partners-swiper"
            >
              {partners.map((partner, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 h-32 flex items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={120}
                        height={80}
                        className="max-h-20 max-w-full object-contain opacity-80"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

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