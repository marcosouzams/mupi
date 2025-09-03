'use client';

import { TrendingUp, RefreshCw, Target, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getFeaturedCases, getTranslatedCaseData } from '@/data/cases';

export const WhyMupiSection = () => {
  const { t } = useTranslation('whymupi');
  const { t: tCases } = useTranslation('cases');
  const router = useRouter();
  const featuredCases = getFeaturedCases();

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      key: "growth"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      key: "development"
    },
    {
      icon: <Target className="w-8 h-8" />,
      key: "perfection"
    }
  ];

  const handleCaseClick = (slug: string) => {
    router.push(`/cases/${slug}`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Cases Section */}
        <div>
          {/* Cases Header */}
          <div className="text-left mb-10">
            <h3 className="text-2xl lg:text-3xl font-urbancat-st font-bold text-[#191927] mb-4">
              {t('whymupi.casesTitle')} <span className="text-[#5667fe]">{t('whymupi.casesTitleHighlight')}</span>
            </h3>
            <p className="text-base text-[#191927]/70 max-w-2xl mb-6">
              {t('whymupi.casesDescription')}
            </p>
            <div className="w-20 h-1 bg-[#5667fe] rounded-full"></div>
          </div>

          {/* Cases Slider */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next-cases',
                prevEl: '.swiper-button-prev-cases',
              }}
              loop={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
              }}
              className="cases-swiper pb-16"
            >
              {featuredCases.map((caseItem) => {
                const translatedCase = getTranslatedCaseData(caseItem, tCases);
                return (
                <SwiperSlide key={caseItem.id}>
                  <div 
                    className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-500"
                    onClick={() => handleCaseClick(caseItem.slug)}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image 
                        src={caseItem.image}
                        alt={translatedCase.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6">
                      {/* Category Badge */}
                      <div className="flex justify-start">
                        <span className="bg-[#5667fe] text-white px-3 py-1.5 rounded-full text-xs font-medium">
                          {translatedCase.category}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div className="space-y-3">
                        {/* Title */}
                        <h4 className="text-lg lg:text-xl font-urbancat-st font-bold text-white leading-tight">
                          {translatedCase.shortTitle}
                        </h4>
                        
                        {/* Description */}
                        <p className="text-white/85 text-sm leading-relaxed font-inter line-clamp-2">
                          {translatedCase.description}
                        </p>

                        {/* Tags */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                              {caseItem.solution}
                            </span>
                          </div>

                          {/* Company Logo */}
                          <div className="w-10 h-6 flex items-center justify-center">
                            <Image
                              src={caseItem.logo}
                              alt={`${caseItem.client} logo`}
                              width={40}
                              height={24}
                              className="object-contain max-w-full max-h-full opacity-80"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5667fe]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Bottom section with CTA and Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
            {/* CTA Button - Left side */}
            <div className="flex justify-center sm:justify-start">
              <button
                onClick={() => router.push('/cases')}
                className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 font-medium group text-sm sm:text-base"
              >
                <span>{t('whymupi.ctaAllCases')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Navigation Buttons - Right side - Hidden on mobile */}
            <div className="hidden sm:flex items-center justify-center space-x-4">
              <button className="swiper-button-prev-cases w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-[#5667fe] transition-all duration-300">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="swiper-button-next-cases w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-[#5667fe] transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};