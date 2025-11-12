'use client';

import { Twitter, Github, Facebook, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

interface FooterTranslations {
  footer: {
    description: string;
    socialMedia: string;
    products: string;
    company: string;
    support: string;
    copyright: string;
    links: {
      products: Record<string, string>;
      company: Record<string, string>;
      support: Record<string, string>;
    };
  };
}

interface FooterProps {
  translations: FooterTranslations;
}

const Footer = ({ translations: t }: FooterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const platformLinks = {
    eagenda: 'https://eagenda.com.br/',
    minhasalavirtual: 'https://minhasalavirtual.com/',
    meuatendimentovirtual: 'https://meuatendimentovirtual.com.br/',
    atendeaqui: 'https://atendeaqui.com.br/',
    equalifica: 'https://equalifica.com.br/',
    etalentos: 'https://etalentos.com.br/',
    sigvirtual: 'https://sigvirtual.com.br/'
  };

  const handlePartnersClick = () => {
    if (pathname === '/') {
      const partnersSection = document.querySelector('[data-section="partners"]');
      if (partnersSection) {
        partnersSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#partners');
    }
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: 'https://twitter.com/MupiSystems'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/mupisystems'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: 'https://www.facebook.com/mupisys'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://www.linkedin.com/company/mupi-systems'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      url: 'https://www.youtube.com/c/mupisystems'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      url: 'https://api.whatsapp.com/send?phone=5511942529100'
    }
  ];

  const footerLinks = {
    produtos: [
      { name: t.footer.links.products.eagenda, href: platformLinks.eagenda, external: true },
      { name: t.footer.links.products.minhaSala, href: platformLinks.minhasalavirtual, external: true },
      { name: t.footer.links.products.meuAtendimento, href: platformLinks.meuatendimentovirtual, external: true },
      { name: t.footer.links.products.atendeAqui, href: platformLinks.atendeaqui, external: true },
      { name: t.footer.links.products.eQualifica, href: platformLinks.equalifica, external: true },
      { name: t.footer.links.products.eTalentos, href: platformLinks.etalentos, external: true },
      { name: t.footer.links.products.sigVirtual, href: platformLinks.sigvirtual, external: true }
    ],
    empresa: [
      { name: t.footer.links.company.about, href: '/about' },
      { name: t.footer.links.company.partners, onClick: handlePartnersClick },
      { name: t.footer.links.company.careers, href: 'https://mupisys.etalentos.com.br/', external: true },
      { name: t.footer.links.company.blog, href: 'https://blog.mupisystems.com.br/', external: true }
    ],
    suporte: [
      { name: t.footer.links.support.contact, href: '/contact' }
    ]
  };

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
                {t.footer.description}
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-urbancat-st font-bold text-white/90 uppercase tracking-wide mb-4">
                {t.footer.socialMedia}
              </h4>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/70 hover:text-[#5667fe] transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-urbancat-st font-bold text-white/90 uppercase tracking-wide mb-6">
              {t.footer.products}
            </h4>
            <ul className="space-y-3">
              {footerLinks.produtos.map((link, index) => (
                <li key={index}>
                  {link.external ? (
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

          {/* Company */}
          <div>
            <h4 className="text-sm font-urbancat-st font-bold text-white/90 uppercase tracking-wide mb-6">
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-white/70 hover:text-[#5667fe] font-inter text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </button>
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
              {t.footer.support}
            </h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link, index) => (
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
              © {currentYear} MUPI Systems. {t.footer.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
