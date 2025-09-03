'use client';

import React from 'react';
import { ArrowRight, Calendar, GraduationCap, Users, Headphones, Shield, UserCheck, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const ProductsSection = () => {
  const { t } = useTranslation('products');
  const [selectedProduct, setSelectedProduct] = useState<number>(0); // Sempre começa com o primeiro produto

  const products = [
    {
      icon: <Calendar className="w-6 h-6" />,
      key: "eagenda",
      logo: "/plataformas/eAGENDA_LOGO.png",
      url: "https://eagenda.com.br/"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      key: "minhaSala",
      logo: "/plataformas/MSV_LOGO.png",
      url: "https://minhasalavirtual.com/"
    },
    {
      icon: <Users className="w-6 h-6" />,
      key: "meuAtendimento",
      logo: "/plataformas/MEU_ATENDIMENTO_LOGO.png",
      url: "https://meuatendimentovirtual.com.br/"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      key: "atendeAqui",
      logo: "/plataformas/ATENDE_AQUI_LOGO.png",
      url: "https://atendeaqui.com.br/"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      key: "eQualifica",
      logo: "/plataformas/eQUALIFICA_LOGO.png",
      url: "https://equalifica.com.br/"
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      key: "eTalentos",
      logo: "/plataformas/eTALENTOS_LOGO.png",
      url: "https://etalentos.com.br/"
    },
    {
      icon: <Database className="w-6 h-6" />,
      key: "sigVirtual",
      logo: "/plataformas/SIG_LOGO.png",
      url: "https://sigvirtual.com.br/"
    }
  ];

  const handleProductSelect = (index: number) => {
    setSelectedProduct(index); // Sempre seleciona um produto, não permite deselecionar
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#d1dafb]">
      <div className="max-w-7xl mx-auto">
        {/* Header with Icons */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
          {/* Left side - Text content */}
          <div className="text-left flex-1">
            <span className="text-sm font-urbancat-st font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-4 block">
              {t('products.badge')}
            </span>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-[#191927] leading-tight mb-4">
              {t('products.title')}{' '}
              <span className="text-[#5667fe]">{t('products.titleHighlight')}</span>
            </h2>
            <p className="text-sm lg:text-base text-[#191927]/70 leading-relaxed font-inter max-w-2xl">
              {t('products.description')}
            </p>
          </div>

          {/* Right side - Product Icons */}
          <div className="flex flex-row flex-wrap justify-center lg:justify-center items-center gap-2 sm:gap-3 lg:gap-4 lg:flex-1 lg:max-w-md">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => handleProductSelect(index)}
                className={`group relative transition-all duration-300 hover:scale-110 ${
                  selectedProduct === index ? 'scale-110' : ''
                }`}
              >
                {/* Logo - responsive smaller round icon */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center transition-all duration-300`}>
                  <div className={`transition-transform duration-300 ${
                    selectedProduct === index 
                      ? 'text-[#5667fe] scale-110' 
                      : 'text-[#191927]/60 group-hover:scale-110'
                  }`}>
                    {/* Clonando o ícone com tamanho responsivo */}
                    {React.cloneElement(product.icon, {
                      className: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    })}
                  </div>
                </div>

                {/* Selection indicator */}
                {selectedProduct === index && (
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#5667fe] rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Product Card */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Product Card - Full width */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              {/* Card Header - Simplified */}
              <div className="p-6 lg:p-8 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-urbancat-st font-bold text-[#191927]">
                      {t(`products.items.${products[selectedProduct].key}.title`)}
                    </h3>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-[#5667fe] border border-[#5667fe]/20">
                      {t(`products.items.${products[selectedProduct].key}.category`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 lg:p-8">
                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left side - Content */}
                  <div className="lg:col-span-8">
                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-sm lg:text-base text-[#191927]/70 leading-relaxed font-inter">
                        {t(`products.items.${products[selectedProduct].key}.description`)}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-urbancat-st font-bold text-[#191927] mb-3 uppercase tracking-wide">
                        {t('products.featuresTitle')}
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {(t(`products.items.${products[selectedProduct].key}.features`, { returnObjects: true }) as string[]).map((feature: string, featureIndex: number) => (
                          <div 
                            key={featureIndex} 
                            className="flex items-center text-sm text-[#191927]/70"
                          >
                            <div className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 bg-[#5667fe]"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button - Single */}
                    <div>
                      <a 
                        href={products[selectedProduct].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium inline-flex"
                      >
                        <span>{t('products.ctaLearnMore')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>

                  {/* Right side - Logo */}
                  <div className="lg:col-span-4 flex items-center justify-center">
                    {products[selectedProduct].logo !== "/api/placeholder/120/60" ? (
                      <img
                        src={products[selectedProduct].logo}
                        alt={t(`products.items.${products[selectedProduct].key}.title`)}
                        className="max-w-full max-h-40 w-auto object-contain"
                      />
                    ) : (
                      <div className="text-8xl text-[#5667fe] opacity-30">
                        {products[selectedProduct].icon}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};