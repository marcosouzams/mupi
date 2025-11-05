'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface BlogCTASectionProps {
  translations: {
    title: string;
    description: string;
    contactSpecialists: string;
    knowSolutions: string;
  };
}

export default function BlogCTASection({ translations }: BlogCTASectionProps) {
  const router = useRouter();
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [hasCtaAnimated, setHasCtaAnimated] = useState(false);
  const ctaSectionRef = useRef<HTMLElement>(null);

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

  return (
    <>
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
            {translations.title}
          </h2>
          <p className={`text-base lg:text-lg text-white/80 leading-relaxed font-inter mb-8 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 ${
            isCtaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {translations.description}
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
              <span>{translations.contactSpecialists}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              onClick={() => router.push('/#products')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base"
            >
              <span>{translations.knowSolutions}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
