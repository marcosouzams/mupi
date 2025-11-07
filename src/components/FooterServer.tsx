import Image from 'next/image';
import { FooterSocialLinks } from './footer/FooterSocialLinks';
import { FooterPartnersButton } from './footer/FooterPartnersButton';

interface FooterServerProps {
  translations: {
    description: string;
    socialMedia: string;
    products: string;
    company: string;
    support: string;
    copyright: string;
    links: {
      products: {
        eagenda: string;
        minhaSala: string;
        meuAtendimento: string;
        atendeAqui: string;
        eQualifica: string;
        eTalentos: string;
        sigVirtual: string;
      };
      company: {
        about: string;
        partners: string;
        careers: string;
        blog: string;
      };
      support: {
        contact: string;
      };
    };
  };
}

const platformLinks = {
  eagenda: 'https://eagenda.com.br/',
  minhasalavirtual: 'https://minhasalavirtual.com/',
  meuatendimentovirtual: 'https://meuatendimentovirtual.com.br/',
  atendeaqui: 'https://atendeaqui.com.br/',
  equalifica: 'https://equalifica.com.br/',
  etalentos: 'https://etalentos.com.br/',
  sigvirtual: 'https://sigvirtual.com.br/'
};

// Server Component (SSR) - Conteúdo crawleável
export const FooterServer = ({ translations: t }: FooterServerProps) => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: t.links.products.eagenda, href: platformLinks.eagenda },
    { name: t.links.products.minhaSala, href: platformLinks.minhasalavirtual },
    { name: t.links.products.meuAtendimento, href: platformLinks.meuatendimentovirtual },
    { name: t.links.products.atendeAqui, href: platformLinks.atendeaqui },
    { name: t.links.products.eQualifica, href: platformLinks.equalifica },
    { name: t.links.products.eTalentos, href: platformLinks.etalentos },
    { name: t.links.products.sigVirtual, href: platformLinks.sigvirtual }
  ];

  const companyLinks = [
    { name: t.links.company.about, href: '/about', external: false },
    { name: t.links.company.partners, type: 'partners-button' as const },
    { name: t.links.company.careers, href: 'https://mupisys.etalentos.com.br/', external: true },
    { name: t.links.company.blog, href: 'https://blog.mupisystems.com.br/', external: true }
  ];

  const supportLinks = [
    { name: t.links.support.contact, href: '/contact' }
  ];

  return (
    <footer className="bg-[#191927] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/parceiros/logo-mupi-white.png"
                alt="MUPI Logo"
                width={160}
                height={40}
                className="h-10 w-auto mb-4"
              />
              <p className="text-white/70 font-inter text-sm leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* Social Links - Component Client */}
            <div>
              <h4 className="text-sm font-urbancat-st font-bold text-white/90 uppercase tracking-wide mb-4">
                {t.socialMedia}
              </h4>
              <FooterSocialLinks />
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-urbancat-st font-bold text-white/90 uppercase tracking-wide mb-6">
              {t.products}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#5667fe] font-inter text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-urbancat-st font-bold text-white/90 uppercase tracking-wide mb-6">
              {t.company}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  {link.type === 'partners-button' ? (
                    <FooterPartnersButton>
                      {link.name}
                    </FooterPartnersButton>
                  ) : link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-[#5667fe] font-inter text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#5667fe] font-inter text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-urbancat-st font-bold text-white/90 uppercase tracking-wide mb-6">
              {t.support}
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#5667fe] font-inter text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 font-inter text-sm">
              © {currentYear} MUPI Systems. {t.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
