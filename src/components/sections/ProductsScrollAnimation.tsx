'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

interface Product {
  key: string;
  logo: string;
  url: string;
  gradient: string;
  color: string;
}

interface ProductTranslation {
  title: string;
  category: string;
  description: string;
  features: string[];
}

interface ProductsScrollAnimationProps {
  products: Product[];
  translations: {
    [key: string]: ProductTranslation;
  };
  ctaLearnMore: string;
}

export const ProductsScrollAnimation = ({ 
  products, 
  translations,
  ctaLearnMore 
}: ProductsScrollAnimationProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

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
    <div ref={sectionRef}>
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
            
            const productTranslation = translations[product.key];
            
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
                      <span>{ctaLearnMore}</span>
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
    </div>
  );
};
