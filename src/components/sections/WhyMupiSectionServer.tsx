import { WhyMupiCarousel } from './WhyMupiCarousel';
import { getFeaturedCases } from '@/data/cases';

interface WhyMupiSectionServerProps {
  translations: {
    casesTitle: string;
    casesTitleHighlight: string;
    casesDescription: string;
    ctaAllCases: string;
  };
  casesTranslations: any;
}

// Função helper para traduzir cases sem usar a função t do i18next
const translateCase = (caseItem: any, translations: any) => {
  try {
    const caseData = translations?.cases?.caseData?.[caseItem.id];
    
    if (!caseData) {
      return {
        ...caseItem,
        translatedData: {
          title: caseItem.title,
          shortTitle: caseItem.shortTitle,
          description: caseItem.description,
          category: caseItem.category
        }
      };
    }

    return {
      ...caseItem,
      translatedData: {
        title: caseData.title || caseItem.title,
        shortTitle: caseData.shortTitle || caseItem.shortTitle,
        description: caseData.description || caseItem.description,
        category: caseData.category || caseItem.category
      }
    };
  } catch (error) {
    console.error('Error translating case:', error);
    return {
      ...caseItem,
      translatedData: {
        title: caseItem.title,
        shortTitle: caseItem.shortTitle,
        description: caseItem.description,
        category: caseItem.category
      }
    };
  }
};

// Server Component (SSR) - Conteúdo crawleável
export const WhyMupiSectionServer = ({ translations: t, casesTranslations }: WhyMupiSectionServerProps) => {
  const featuredCases = getFeaturedCases();
  
  // Prepara os cases com traduções
  const translatedCases = featuredCases.map(caseItem => translateCase(caseItem, casesTranslations));

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="cases-heading">
      <div className="max-w-7xl mx-auto">
        <div>
          {/* Cases Header - SSR */}
          <div className="text-left mb-10">
            <h2 id="cases-heading" className="text-2xl lg:text-3xl font-urbancat-st font-bold text-[#191927] mb-4">
              {t.casesTitle} <span className="text-[#5667fe]">{t.casesTitleHighlight}</span>
            </h2>
            <p className="text-base text-[#191927]/70 max-w-2xl mb-6">
              {t.casesDescription}
            </p>
            <div className="w-20 h-1 bg-[#5667fe] rounded-full"></div>
          </div>

          {/* Cases Carousel - Client Component */}
          <WhyMupiCarousel cases={translatedCases} ctaText={t.ctaAllCases} />
        </div>
      </div>
    </section>
  );
};
