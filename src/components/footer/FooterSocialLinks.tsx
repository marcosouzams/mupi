'use client';

import { Twitter, Github, Facebook, Linkedin, Youtube, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/MupiSystems'
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/mupisystems'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/mupisys'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/company/mupi-systems'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/c/mupisystems'
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://api.whatsapp.com/send?phone=5511942529100'
  }
];

export const FooterSocialLinks = () => {
  return (
    <div className="flex space-x-2">
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-[#5667fe] transition-all duration-300 hover:scale-110"
            aria-label={social.name}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};
