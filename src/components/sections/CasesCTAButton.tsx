'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CasesCTAButtonProps {
  ctaText: string;
}

export const CasesCTAButton = ({ ctaText }: CasesCTAButtonProps) => {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.push('/cases')}
      className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 font-medium group text-sm sm:text-base"
    >
      <span>{ctaText}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
    </button>
  );
};
