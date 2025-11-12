import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

interface ContactSectionProps {
  translations: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    info: {
      information: {
        title: string;
        value: string;
      };
      support: {
        title: string;
        value: string;
      };
      whatsapp: {
        title: string;
        value: string;
      };
      location: {
        title: string;
        value: string;
      };
    };
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      required: string;
    };
  };
}

export const ContactSection = ({ translations: t }: ContactSectionProps) => {
  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/fundo_contato.png)'
      }}
    >
      <div className="absolute inset-0 bg-[#414baa]/80"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Info with animations */}
          <ContactInfo translations={t} />

          {/* Right Side - Contact Form */}
          <ContactForm translations={t.form} />
        </div>
      </div>
    </section>
  );
};