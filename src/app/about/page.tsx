'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Target, Users, Brain, Shield, TrendingUp, Headphones } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useTranslation('about-page');
  const router = useRouter();
  
  // Animation states
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [isValuesVisible, setIsValuesVisible] = useState(false);
  const [hasStoryAnimated, setHasStoryAnimated] = useState(false);
  const [hasValuesAnimated, setHasValuesAnimated] = useState(false);
  
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  // Intersection Observer para animações
  useEffect(() => {
    const storyElement = storyRef.current;
    const valuesElement = valuesRef.current;
    
    const observerStory = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStoryAnimated) {
            setIsStoryVisible(true);
            setHasStoryAnimated(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const observerValues = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasValuesAnimated) {
            setIsValuesVisible(true);
            setHasValuesAnimated(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (storyElement) observerStory.observe(storyElement);
    if (valuesElement) observerValues.observe(valuesElement);

    return () => {
      if (storyElement) observerStory.unobserve(storyElement);
      if (valuesElement) observerValues.unobserve(valuesElement);
    };
  }, [hasStoryAnimated, hasValuesAnimated]);

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/SOBRE_HERO.png"
            alt="About Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 w-full">
          <div className="max-w-3xl">
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-bold text-white">
                  {t('hero.titleLine1')}
                </span>
              </h1>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-thin text-white">
                  {t('hero.titleLine2')}
                </span>
              </h2>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide font-urbancat-st">
                <span className="font-bold text-white">
                  {t('hero.titleLine3')}
                </span>
              </h3>
            </div>
            <p className="text-sm lg:text-base text-white/90 font-light leading-relaxed max-w-2xl font-urbancat-st uppercase">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div 
        ref={storyRef}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Título */}
          <div className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-4">
              {t('story.badge')}
            </h2>
            <div className="w-16 h-1 bg-[#d1dafb]"></div>
          </div>

          <div className={`transition-all duration-1000 ease-out ${
            isStoryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Texto em duas colunas */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Primeiro parágrafo */}
              <div>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed">
                  <strong>{t('description')}</strong>
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t('story.description')}
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t('story.extraText')}
                </p>
              </div>

              {/* Segundo parágrafo */}
              <div>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed">
                  <strong>{t('nameOrigin.description')}</strong>
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t('nameOrigin.extraText')}
                </p>
                <p className="text-base lg:text-lg text-[#191927] leading-relaxed mt-6">
                  {t('nameOrigin.extraText2')}
                </p>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/team.jpg"
                alt="Equipe MUPI"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div 
        ref={valuesRef}
        className="bg-[#191927] py-24"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-[#5667fe] uppercase tracking-wider mb-4 block">
              {t('values.badge')}
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-urbancat-st font-bold text-white leading-tight mb-8">
              {t('values.title')}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('values.list', { returnObjects: true }) as Array<{number: string, title: string, description: string}>).map((value: {number: string, title: string, description: string}, index: number) => {
              const icons = [Target, Users, Brain, Shield, TrendingUp, Headphones];
              const IconComponent = icons[index % icons.length];
              
              return (
                <div 
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#5667fe]/30 rounded-2xl p-8 transition-all duration-1000 ease-out hover:bg-white/10 group ${
                    isValuesVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <IconComponent className="w-8 h-8 text-[#5667fe] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-bold text-[#5667fe] flex-shrink-0">{value.number}</span>
                  </div>
                  <h3 className="text-xl font-urbancat-st font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-base text-white/70 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

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
            isValuesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t('cta.title')}
          </h2>
          <p className={`text-base lg:text-lg text-white/80 leading-relaxed font-inter mb-8 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 ${
            isValuesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t('cta.description')}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out delay-400 ${
            isValuesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => router.push('/contact')}
              className="inline-flex items-center space-x-3 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium group"
            >
              <span>{t('cta.contactButton')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              onClick={() => router.push('/#products')}
              className="inline-flex items-center space-x-3 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-lg transition-all duration-300 font-medium"
            >
              <span>{t('cta.platformsButton')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}