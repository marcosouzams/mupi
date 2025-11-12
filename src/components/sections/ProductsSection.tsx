'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

interface ProductsSectionProps {
  translations: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    leftSection: {
      title: string;
      titleHighlight: string;
      paragraph1: string;
      paragraph2: string;
      tags: {
        customerService: string;
        hrManagement: string;
        textAnalysis: string;
        smartContracts: string;
      };
    };
    ctaLearnMore: string;
    items: {
      [key: string]: {
        title: string;
        category: string;
        description: string;
        features: string[];
      };
    };
  };
}

export const ProductsSection = ({ translations: t }: ProductsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const products = [
    {
      key: "eagenda",
      logo: "/plataformas/eAGENDA_LOGO.png",
      url: "https://eagenda.com.br/",
      gradient: "from-blue-500 to-cyan-500",
      color: "#3b82f6"
    },
    {
      key: "minhaSala",
      logo: "/plataformas/MSV_LOGO.png",
      url: "https://minhasalavirtual.com/",
      gradient: "from-purple-500 to-pink-500",
      color: "#a855f7"
    },
    {
      key: "meuAtendimento",
      logo: "/plataformas/MEU_ATENDIMENTO_LOGO.png",
      url: "https://meuatendimentovirtual.com.br/",
      gradient: "from-green-500 to-emerald-500",
      color: "#22c55e"
    },
    {
      key: "atendeAqui",
      logo: "/plataformas/ATENDE_AQUI_LOGO.png",
      url: "https://atendeaqui.com.br/",
      gradient: "from-orange-500 to-red-500",
      color: "#f97316"
    },
    {
      key: "eQualifica",
      logo: "/plataformas/eQUALIFICA_LOGO.png",
      url: "https://equalifica.com.br/",
      gradient: "from-indigo-500 to-blue-500",
      color: "#6366f1"
    },
    {
      key: "eTalentos",
      logo: "/plataformas/eTALENTOS_LOGO.png",
      url: "https://etalentos.com.br/",
      gradient: "from-pink-500 to-rose-500",
      color: "#ec4899"
    },
    {
      key: "sigVirtual",
      logo: "/plataformas/SIG_LOGO.png",
      url: "https://sigvirtual.com.br/",
      gradient: "from-teal-500 to-cyan-500",
      color: "#14b8a6"
    },
    {
      key: "textualiza",
      logo: "/plataformas/TEXTUALIZA.png",
      url: "https://textualiza.com.br/",
      gradient: "from-violet-500 to-purple-500",
      color: "#8b5cf6"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight - windowHeight;
      
      const progress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));

      const segmentSize = 1 / products.length;
      const newIndex = Math.min(
        products.length - 1,
        Math.floor(progress / segmentSize)
      );
      
      setCurrentProductIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [products.length]);

  return (
    <section 
      ref={sectionRef}
      id="products"
      className="relative bg-gradient-to-br from-gray-50 to-white pb-20 lg:pb-32"
      style={{ height: `${products.length * 65}vh` }}
      aria-labelledby="products-heading"
    >
      {/* Conteúdo fixo */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Grid 2 colunas */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Lado Esquerdo - Texto sobre a empresa */}
            <div className="hidden lg:block pr-8">
              <div className="space-y-6">
                <div>
                  <h2 id="products-heading" className="text-3xl lg:text-4xl font-urbancat-st font-bold text-[#191927] leading-tight mb-6">
                    {t.leftSection.title} <span className="text-[#5667fe]">{t.leftSection.titleHighlight}</span>
                  </h2>
                </div>
                
                <div className="space-y-4 text-[#191927]/80 font-inter leading-relaxed">
                  <p className="text-base lg:text-lg">
                    {t.leftSection.paragraph1}
                  </p>
                  
                  <p className="text-base lg:text-lg">
                    {t.leftSection.paragraph2}
                  </p>
                </div>

                <div className="pt-4">
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                      <span className="text-sm font-medium text-[#5667fe]">{t.leftSection.tags.customerService}</span>
                    </div>
                    <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                      <span className="text-sm font-medium text-[#5667fe]">{t.leftSection.tags.hrManagement}</span>
                    </div>
                    <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                      <span className="text-sm font-medium text-[#5667fe]">{t.leftSection.tags.textAnalysis}</span>
                    </div>
                    <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                      <span className="text-sm font-medium text-[#5667fe]">{t.leftSection.tags.smartContracts}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito - Container com fundo escuro */}
            <div className="bg-[#191927] rounded-3xl px-6 py-8 lg:px-8 lg:py-10 shadow-2xl">
              {/* Header fixo */}
              <div className="text-center mb-8 lg:mb-10">
                <span className="text-xs font-urbancat-st font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-3 block">
                  {t.badge}
                </span>
                <h3 className="text-2xl lg:text-3xl font-urbancat-st font-bold text-white leading-tight mb-3">
                  {t.title}{' '}
                  <span className="text-white">{t.titleHighlight}</span>
                </h3>
                <p className="text-sm lg:text-base text-white/70 leading-relaxed font-inter">
                  {t.description}
                </p>
              </div>

              {/* Área de Cards Empilhados */}
              <div className="relative" style={{ minHeight: '500px' }}>
                {/* Cards empilhados */}
                <div className="relative w-full" style={{ minHeight: '500px' }}>
                  {products.map((product, index) => {
                    const isActive = currentProductIndex === index;
                    const isPast = index < currentProductIndex;
                    const isFuture = index > currentProductIndex;
                    
                    const stackOffset = (index - currentProductIndex) * 20;
                    const scaleOffset = isActive ? 1 : isFuture ? 0.95 - (index - currentProductIndex) * 0.03 : 0.9;
                    const opacityValue = isActive ? 1 : isFuture ? 0.4 : 0;
                    
                    const productTranslation = t.items[product.key];
                    
                    return (
                      <div
                        key={product.key}
                        className={`absolute top-0 left-0 right-0 transition-all duration-700 ease-out ${
                          isPast ? 'pointer-events-none' : ''
                        }`}
                        style={{
                          transform: `
                            translateY(${isPast ? -100 : stackOffset}px) 
                            scale(${scaleOffset})
                            rotateX(${isFuture ? (index - currentProductIndex) * 2 : 0}deg)
                          `,
                          opacity: opacityValue,
                          zIndex: products.length - Math.abs(index - currentProductIndex),
                          transformOrigin: 'center top',
                        }}
                      >
                        {/* Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-5 lg:p-6 border border-gray-100">
                          {/* Header do Card */}
                          <div className="flex items-start justify-between mb-4">
                            {/* Logo e Nome */}
                            <div className="flex-1">
                              <Image
                                src={product.logo}
                                alt={productTranslation.title}
                                width={140}
                                height={50}
                                className="max-h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 mb-2"
                              />
                              <h3 className="text-lg lg:text-xl font-urbancat-st font-bold text-[#191927]">
                                {productTranslation.title}
                              </h3>
                            </div>
                            
                            {/* Número do Card */}
                            <div className="text-right flex-shrink-0 ml-4">
                              <div className="text-3xl lg:text-4xl font-urbancat-st font-bold text-[#5667fe]/20">
                                {String(index + 1).padStart(2, '0')}
                              </div>
                            </div>
                          </div>

                          {/* Badge de categoria */}
                          <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-[#191927]/70 font-inter border border-gray-200">
                              {productTranslation.category}
                            </span>
                          </div>

                          {/* Descrição */}
                          <p className="text-sm lg:text-base text-[#191927] leading-relaxed font-inter mb-5">
                            {productTranslation.description}
                          </p>

                          {/* Features em Grid */}
                          <div className="grid md:grid-cols-2 gap-2 mb-5">
                            {productTranslation.features
                              .slice(0, 4)
                              .map((feature: string, featureIndex: number) => (
                                <div 
                                  key={featureIndex} 
                                  className="flex items-start text-xs text-[#191927]/70 font-inter"
                                  style={{
                                    animation: isActive ? `slideIn 0.5s ease-out ${featureIndex * 0.1}s both` : 'none',
                                  }}
                                >
                                  <Check className="w-3.5 h-3.5 text-[#5667fe] mt-0.5 mr-2 flex-shrink-0" strokeWidth={1.5} />
                                  <span>{feature}</span>
                                </div>
                              ))}
                          </div>

                          {/* CTA Button */}
                          <div className="flex items-center justify-start">
                            <a 
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn inline-flex items-center space-x-2 px-5 py-2.5 bg-[#5667fe] text-white rounded-lg hover:bg-[#5667fe]/90 transition-all duration-200 text-sm font-medium font-inter shadow-lg hover:shadow-xl hover:scale-105"
                            >
                              <span>{t.ctaLearnMore}</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Indicador de progresso */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {products.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentProductIndex 
                        ? 'w-6 bg-[#5667fe]' 
                        : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Contador de produtos */}
              <div className="text-center mt-4 text-xs font-urbancat-st font-medium text-white/50">
                <span className="text-[#5667fe] text-lg">{currentProductIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>{products.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};