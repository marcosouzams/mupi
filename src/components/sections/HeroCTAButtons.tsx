'use client';

import { ArrowRight, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeroCTAButtonsProps {
  ctaPlatforms: string;
  ctaCases: string;
}

export const HeroCTAButtons = ({ ctaPlatforms, ctaCases }: HeroCTAButtonsProps) => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
      <button className="group bg-[#5667fe] hover:bg-[#5667fe]/90 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
        <span className="font-medium font-inter">{ctaPlatforms}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
      
      <button 
        className="group flex items-center space-x-3 text-[#d1dafb] hover:text-white transition-all duration-300" 
        onClick={() => router.push('/cases')}
      >
        <div className="w-12 h-12 border border-[#d1dafb]/30 hover:border-[#d1dafb] rounded-full flex items-center justify-center group-hover:bg-[#d1dafb]/10 transition-all duration-300">
          <Play className="w-5 h-5 ml-0.5" />
        </div>
        <span className="font-medium font-inter">{ctaCases}</span>
      </button>
    </div>
  );
};
