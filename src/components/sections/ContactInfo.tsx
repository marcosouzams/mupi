'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfoProps {
  translations: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    info: {
      information: {
        title: string;
        value: string;
      };
      support: {
        title: string;
        value: string;
      };
      whatsapp: {
        title: string;
        value: string;
      };
      location: {
        title: string;
        value: string;
      };
    };
  };
}

export const ContactInfo = ({ translations: t }: ContactInfoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const infoElement = infoRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (infoElement) {
      observer.observe(infoElement);
    }

    return () => {
      if (infoElement) {
        observer.unobserve(infoElement);
      }
    };
  }, [hasAnimated]);

  return (
    <div 
      ref={infoRef}
      className={`space-y-8 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Header */}
      <div>
        <span className="text-sm font-urbancat-st font-bold text-white/80 uppercase tracking-[0.15em] mb-4 block">
          {t.badge}
        </span>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-urbancat-st font-bold text-white leading-tight mb-4">
          {t.title}{' '}
          <span className="text-[#d1dafb]">{t.titleHighlight}</span>
        </h2>
        <p className="text-base lg:text-lg text-white/80 leading-relaxed font-inter">
          {t.description}
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-6">
        <div className={`flex items-center space-x-4 transition-all duration-1000 ease-out delay-200 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-4'
        }`}>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-urbancat-st font-bold">{t.info.information.title}</h4>
            <p className="text-white/80 font-inter">{t.info.information.value}</p>
          </div>
        </div>

        <div className={`flex items-center space-x-4 transition-all duration-1000 ease-out delay-300 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-4'
        }`}>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-urbancat-st font-bold">{t.info.support.title}</h4>
            <p className="text-white/80 font-inter">{t.info.support.value}</p>
          </div>
        </div>

        <div className={`flex items-center space-x-4 transition-all duration-1000 ease-out delay-500 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-4'
        }`}>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-urbancat-st font-bold">{t.info.whatsapp.title}</h4>
            <p className="text-white/80 font-inter">{t.info.whatsapp.value}</p>
          </div>
        </div>

        <div className={`flex items-center space-x-4 transition-all duration-1000 ease-out delay-700 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-4'
        }`}>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-urbancat-st font-bold">{t.info.location.title}</h4>
            <p className="text-white/80 font-inter">{t.info.location.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
