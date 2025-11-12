'use client';

import { ArrowRight, ArrowLeft, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeaturedCases, getCasesBySector, getTranslatedSectors, getTranslatedCaseData } from '@/data/cases';

const CasesPage = () => {
  const router = useRouter();
  const { t, ready } = useTranslation('cases');
  const [swiperInstance, setSwiperInstance] = useState<{slidePrev: () => void, slideNext: () => void} | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>('todos');

  // Animation states for CTA section
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [hasCtaAnimated, setHasCtaAnimated] = useState(false);
  const ctaSectionRef = useRef<HTMLElement>(null);

  // Se as traduções não estiverem prontas, mostrar loading
  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="flex space-x-2">
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="dot bg-white rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    );
  }

  const featuredCases = getFeaturedCases();
  const translatedSectors = getTranslatedSectors(t);
  
  // Filtrar cases baseado no setor selecionado
  const filteredCases = getCasesBySector(selectedSector);

  // Intersection Observer for CTA section
  useEffect(() => {
    const ctaElement = ctaSectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCtaAnimated) {
            setIsCtaVisible(true);
            setHasCtaAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (ctaElement) {
      observer.observe(ctaElement);
    }

    return () => {
      if (ctaElement) {
        observer.unobserve(ctaElement);
      }
    };
  }, [hasCtaAnimated]);

  const handleCaseClick = (slug: string) => {
    router.push(`/cases/${slug}`);
  };

  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <>
      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active-custom {
          background: #5667fe !important;
          transform: scale(1.2);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      {featuredCases.length > 0 && (
        <section className="relative overflow-hidden">
          <div className="h-[500px] lg:h-[600px]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={setSwiperInstance}
              pagination={{ 
                clickable: true,
                el: '.swiper-pagination-custom',
                bulletClass: 'swiper-pagination-bullet-custom',
                bulletActiveClass: 'swiper-pagination-bullet-active-custom'
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="h-full"
            >
              {featuredCases.map((caseItem) => {
                const translatedCase = getTranslatedCaseData(caseItem, t);
                return (
                <SwiperSlide key={caseItem.id}>
                  <div className="relative h-full">
                    {/* Background Image - mais escura */}
                    <div className="absolute inset-0">
                      <Image 
                        src={caseItem.image}
                        alt={translatedCase.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                    </div>

                    {/* Content - alinhado à esquerda */}
                    <div className="relative z-10 flex items-center h-full">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-lg">
                          <span className="inline-block bg-[#5667fe]/90 text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                            {translatedCase.category}
                          </span>
                          
                          <h1 className="text-2xl lg:text-3xl font-urbancat-st font-bold text-white leading-tight mb-4">
                            {translatedCase.shortTitle}
                          </h1>
                          
                          <p className="text-base text-white/90 leading-relaxed font-inter mb-6">
                            {translatedCase.description}
                          </p>

                          <button
                            onClick={() => handleCaseClick(caseItem.slug)}
                            className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-5 py-2.5 rounded-lg transition-all duration-300 font-medium group text-sm mb-6"
                          >
                            <span>{t('cases.hero.viewFullCase')}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Navigation Controls - Fixed Position */}
            {featuredCases.length > 1 && (
              <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 z-20 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handlePrevSlide}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNextSlide}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Custom Pagination */}
                <div className="swiper-pagination-custom flex space-x-2"></div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Header - Cases List */}
      <section className="bg-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm font-urbancat-st font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-4 block">
            {t('cases.header.subtitle')}
          </span>
          <h2 
            className="text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-[#191927] leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t('cases.header.title') }}
          />
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-inter max-w-2xl mx-auto">
            {t('cases.header.description')}
          </p>
        </div>
      </section>

      {/* Cases com Filtros: horizontal em mobile/tablet, barra lateral sticky em desktop */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-[1000px]">
        <div className="max-w-7xl mx-auto">
          {/* Layout responsivo: grid em telas grandes */}
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
            {/* Filtros - horizontal em mobile/tablet, sidebar sticky em desktop */}
            <aside className="mb-8 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
              <h3 className="text-lg font-urbancat-st font-bold text-[#191927] mb-4 text-center lg:text-left">
                {t('cases.filters.filterBySector')}
              </h3>
              {/* Mobile/Tablet: horizontal, Desktop: vertical */}
              <div className="flex overflow-x-auto scrollbar-hide gap-3 pb-2 lg:flex-col lg:overflow-x-visible lg:gap-2 lg:pb-0">
                {translatedSectors.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector.id)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedSector === sector.id
                        ? 'bg-[#5667fe] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    } lg:w-full lg:justify-between`}
                  >
                    <span>{sector.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedSector === sector.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {sector.count}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Lista de Cases */}
            <div>
              <div className="space-y-6 lg:space-y-8">
                {filteredCases.map((caseItem) => {
                  const translatedCase = getTranslatedCaseData(caseItem, t);
                  return (
                  <article 
                    key={caseItem.id}
                    className="relative h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-500"
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
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>
                      {/* Additional bottom gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8">
                      {/* Top Section */}
                      <div className="flex items-start justify-between">
                        {/* Category Badge */}
                        <div className="flex items-center space-x-3">
                          <span className="bg-[#5667fe] text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium">
                            {translatedCase.category}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="space-y-2 sm:space-y-3">
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-urbancat-st font-bold text-white leading-tight transition-colors duration-300">
                          {translatedCase.shortTitle}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-white/85 text-sm sm:text-base leading-relaxed font-inter max-w-xl lg:max-w-2xl line-clamp-2 sm:line-clamp-none">
                          {translatedCase.description}
                        </p>

                        {/* Tags and Logo Row */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-0 mt-3 sm:mt-4">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium">
                              {caseItem.solution}
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium">
                              {caseItem.client}
                            </span>
                          </div>

                          {/* Company Logo */}
                          <div className="flex-shrink-0 sm:ml-4">
                            <div className="w-10 h-6 sm:w-12 sm:h-8 flex items-center justify-center">
                              <Image
                                src={caseItem.logo}
                                alt={`${caseItem.client} logo`}
                                width={48}
                                height={32}
                                className="object-contain max-w-full max-h-full opacity-80"
                              />
                            </div>
                          </div>
                        </div>

                        {/* CTA Button - Hidden on mobile, shown on hover on desktop */}
                        <div className="hidden sm:block pt-3">
                          <button
                            onClick={() => handleCaseClick(caseItem.slug)}
                            className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium group/btn text-xs backdrop-blur-sm"
                          >
                            <span>{t('cases.caseCard.viewFullCase')}</span>
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5667fe]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </article>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredCases.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-urbancat-st font-bold text-gray-700 mb-2">
                    {t('cases.emptyState.title')}
                  </h3>
                  <p className="text-gray-500 font-inter mb-4">
                    {t('cases.emptyState.description')}
                  </p>
                  <button
                    onClick={() => setSelectedSector('todos')}
                    className="inline-flex items-center space-x-2 text-[#5667fe] hover:text-[#5667fe]/80 font-medium text-sm transition-colors duration-300"
                  >
                    <span>{t('cases.emptyState.viewAll')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-8"></div>

      {/* CTA Section */}
      <section 
        ref={ctaSectionRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/fundo_cases.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-white leading-tight mb-6 transition-all duration-1000 ease-out ${
            isCtaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t('cases.cta.title')}
          </h2>
          <p className={`text-base lg:text-lg text-white/80 leading-relaxed font-inter mb-8 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 ${
            isCtaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t('cases.cta.description')}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-1000 ease-out delay-400 ${
            isCtaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => router.push('/#contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 font-medium group text-sm sm:text-base"
            >
              <span>{t('cases.cta.contactSpecialists')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              onClick={() => router.push('/#products')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base"
            >
              <span>{t('cases.cta.knowSolutions')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default CasesPage;