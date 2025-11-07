import { Calendar, GraduationCap, Users, Headphones, Shield, UserCheck, Database } from 'lucide-react';
import { ProductsCarouselScroll } from './ProductsCarouselScroll';

interface ProductsSectionServerProps {
  translations: {
    products: {
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
      [key: string]: unknown;
    };
  };
}

const products = [
  {
    icon: Calendar,
    key: "eagenda",
    logo: "/plataformas/eAGENDA_LOGO.png",
    url: "https://eagenda.com.br/",
    gradient: "from-blue-500 to-cyan-500",
    color: "#3b82f6"
  },
  {
    icon: GraduationCap,
    key: "minhaSala",
    logo: "/plataformas/MSV_LOGO.png",
    url: "https://minhasalavirtual.com/",
    gradient: "from-purple-500 to-pink-500",
    color: "#a855f7"
  },
  {
    icon: Users,
    key: "meuAtendimento",
    logo: "/plataformas/MEU_ATENDIMENTO_LOGO.png",
    url: "https://meuatendimentovirtual.com.br/",
    gradient: "from-green-500 to-emerald-500",
    color: "#22c55e"
  },
  {
    icon: Headphones,
    key: "atendeAqui",
    logo: "/plataformas/ATENDE_AQUI_LOGO.png",
    url: "https://atendeaqui.com.br/",
    gradient: "from-orange-500 to-red-500",
    color: "#f97316"
  },
  {
    icon: Shield,
    key: "eQualifica",
    logo: "/plataformas/eQUALIFICA_LOGO.png",
    url: "https://equalifica.com.br/",
    gradient: "from-indigo-500 to-blue-500",
    color: "#6366f1"
  },
  {
    icon: UserCheck,
    key: "eTalentos",
    logo: "/plataformas/eTALENTOS_LOGO.png",
    url: "https://etalentos.com.br/",
    gradient: "from-pink-500 to-rose-500",
    color: "#ec4899"
  },
  {
    icon: Database,
    key: "sigVirtual",
    logo: "/plataformas/SIG_LOGO.png",
    url: "https://sigvirtual.com.br/",
    gradient: "from-teal-500 to-cyan-500",
    color: "#14b8a6"
  },
  {
    icon: Database,
    key: "textualiza",
    logo: "/plataformas/TEXTUALIZA.png",
    url: "https://textualiza.com.br/",
    gradient: "from-violet-500 to-purple-500",
    color: "#8b5cf6"
  }
];

// Server Component (SSR) - Conteúdo crawleável
export const ProductsSectionServer = ({ translations: t }: ProductsSectionServerProps) => {
  return (
    <section 
      id="products"
      className="relative bg-gradient-to-br from-gray-50 to-white pb-20 lg:pb-32"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Lado Esquerdo - Texto sobre a empresa (SSR) */}
          <div className="hidden lg:block pr-8">
            <div className="space-y-6">
              <div>
                <h2 id="products-heading" className="text-3xl lg:text-4xl font-urbancat-st font-bold text-[#191927] leading-tight mb-6">
                  {t.products.leftSection.title} <span className="text-[#5667fe]">{t.products.leftSection.titleHighlight}</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-[#191927]/80 font-inter leading-relaxed">
                <p className="text-base lg:text-lg">
                  {t.products.leftSection.paragraph1}
                </p>
                
                <p className="text-base lg:text-lg">
                  {t.products.leftSection.paragraph2}
                </p>
              </div>

              <div className="pt-4">
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                    <span className="text-sm font-medium text-[#5667fe]">{t.products.leftSection.tags.customerService}</span>
                  </div>
                  <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                    <span className="text-sm font-medium text-[#5667fe]">{t.products.leftSection.tags.hrManagement}</span>
                  </div>
                  <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                    <span className="text-sm font-medium text-[#5667fe]">{t.products.leftSection.tags.textAnalysis}</span>
                  </div>
                  <div className="px-4 py-2 bg-[#5667fe]/10 rounded-lg border border-[#5667fe]/20">
                    <span className="text-sm font-medium text-[#5667fe]">{t.products.leftSection.tags.smartContracts}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito - Carousel Scroll (Client Component) */}
          <div>
            <ProductsCarouselScroll products={products} translations={t.products} />
          </div>
        </div>
      </div>
    </section>
  );
};
