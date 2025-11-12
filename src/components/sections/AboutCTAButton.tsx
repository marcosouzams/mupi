'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AboutCTAButtonProps {
  ctaText: string;
}

export const AboutCTAButton = ({ ctaText }: AboutCTAButtonProps) => {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.push('/about')}
      className="group bg-white hover:bg-white/90 text-[#191927] px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
      aria-label="Saiba mais sobre a MUPI Systems"
    >
      <span className="font-medium font-inter">{ctaText}</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
    </button>
  );
};
