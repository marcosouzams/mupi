'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Target, Users, Brain, Shield, TrendingUp, Headphones } from 'lucide-react';

interface AboutTranslations {
  values: {
    badge: string;
    title: string;
    subtitle: string;
    list: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    contactButton: string;
    platformsButton: string;
  };
}

interface AboutPageClientProps {
  translations: AboutTranslations;
}

export const AboutPageClient = ({ translations: t }: AboutPageClientProps) => {
  const router = useRouter();
  const [isValuesVisible, setIsValuesVisible] = useState(false);
  const [hasValuesAnimated, setHasValuesAnimated] = useState(false);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const valuesElement = valuesRef.current;
    
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

    if (valuesElement) observerValues.observe(valuesElement);

    return () => {
      if (valuesElement) observerValues.unobserve(valuesElement);
    };
  }, [hasValuesAnimated]);

  return (
    <>
      {/* Values Section */}
      <div 
        ref={valuesRef}
        className="bg-[#191927] py-24"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-[#5667fe] uppercase tracking-wider mb-4 block">
              {t.values.badge}
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-urbancat-st font-bold text-white leading-tight mb-8">
              {t.values.title}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              {t.values.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.values.list.map((value, index) => {
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-[#5667fe] to-[#4a56e2]">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-white leading-tight mb-6 transition-all duration-1000 ease-out ${
            isValuesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t.cta.title}
          </h2>
          <p className={`text-base lg:text-lg text-white/90 leading-relaxed font-inter mb-8 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 ${
            isValuesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {t.cta.description}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out delay-400 ${
            isValuesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => router.push('/contact')}
              className="inline-flex items-center space-x-3 bg-white text-[#5667fe] hover:bg-white/90 px-8 py-4 rounded-lg transition-all duration-300 font-medium group"
            >
              <span>{t.cta.contactButton}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              onClick={() => router.push('/#products')}
              className="inline-flex items-center space-x-3 bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-lg transition-all duration-300 font-medium"
            >
              <span>{t.cta.platformsButton}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
