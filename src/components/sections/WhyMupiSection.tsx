import { CasesSwiper } from './CasesSwiper';
import { CasesCTAButton } from './CasesCTAButton';
import { getFeaturedCases } from '@/data/cases';

interface WhyMupiSectionProps {
  translations: {
    casesTitle: string;
    casesTitleHighlight: string;
    casesDescription: string;
    ctaAllCases: string;
  };
  casesTranslations: {
    [key: string]: {
      title: string;
      shortTitle: string;
      description: string;
      category: string;
    };
  };
}

export const WhyMupiSection = ({ translations: t, casesTranslations }: WhyMupiSectionProps) => {
  const featuredCases = getFeaturedCases();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="cases-heading">
      <div className="max-w-7xl mx-auto">
        {/* Cases Section */}
        <div>
          {/* Cases Header */}
          <div className="text-left mb-10">
            <h2 id="cases-heading" className="text-2xl lg:text-3xl font-urbancat-st font-bold text-[#191927] mb-4">
              {t.casesTitle} <span className="text-[#5667fe]">{t.casesTitleHighlight}</span>
            </h2>
            <p className="text-base text-[#191927]/70 max-w-2xl mb-6">
              {t.casesDescription}
            </p>
            <div className="w-20 h-1 bg-[#5667fe] rounded-full"></div>
          </div>

          {/* Cases Slider - Client Component */}
          <CasesSwiper cases={featuredCases} translatedCases={casesTranslations} />

          {/* CTA Button */}
          <div className="flex justify-center sm:justify-start mt-8">
            <CasesCTAButton ctaText={t.ctaAllCases} />
          </div>
        </div>
      </div>
    </section>
  );
};