import { HeroSection, PartnersSection, ProductsSection, AboutSection, WhyMupiSection, ContactSection } from '@/components';

const HomePage = () => {
  return (
    <>
      <div className="bg-[#191927]">
        <HeroSection />
      </div>
      
      {/* PartnersSection com fundo azul */}
      <div className="bg-[#5667fe] rounded-b-[120px]">
        <PartnersSection />
      </div>
      
      {/* ProductsSection com fundo azul claro */}
      <div className="bg-[#d1dafb]">
        <ProductsSection />
      </div>
      
      {/* AboutSection com fundo amarelo */}
      <div className="bg-[#a99801]">
        <AboutSection />
      </div>
      
      {/* WhyMupiSection com fundo branco */}
      <WhyMupiSection />
      
      {/* ContactSection com fundo azul escuro */}
      <ContactSection />
    </>
  );
};

export default HomePage;
