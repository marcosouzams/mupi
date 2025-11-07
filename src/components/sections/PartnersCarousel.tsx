'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

interface Partner {
  name: string;
  logo: string;
}

interface PartnersCarouselProps {
  partners: Partner[];
}

// Client Component - Apenas o Swiper carousel
export const PartnersCarousel = ({ partners }: PartnersCarouselProps) => {
  return (
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
                  alt={`${partner.name} - Cliente MUPI Systems`}
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
  );
};
