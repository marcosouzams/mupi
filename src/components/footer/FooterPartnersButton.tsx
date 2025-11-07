'use client';

import { useRouter, usePathname } from 'next/navigation';

interface FooterPartnersButtonProps {
  children: React.ReactNode;
}

export const FooterPartnersButton = ({ children }: FooterPartnersButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePartnersClick = () => {
    if (pathname === '/') {
      // Se estamos na home, apenas scrollamos para a seção
      const partnersSection = document.querySelector('[data-section="partners"]');
      if (partnersSection) {
        partnersSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se não estamos na home, redirecionamos para home com anchor
      router.push('/#partners');
    }
  };

  return (
    <button
      onClick={handlePartnersClick}
      className="text-white/70 hover:text-[#5667fe] font-inter text-sm transition-colors duration-300"
    >
      {children}
    </button>
  );
};
