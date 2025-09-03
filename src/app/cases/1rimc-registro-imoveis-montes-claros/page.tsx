'use client';

import { ArrowLeft, Calendar, Clock, Target, Lightbulb, Wrench, TrendingUp, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const RimcCasePage = () => {
  const router = useRouter();
  const { t, ready } = useTranslation('rimc-case');
  
  const handleBackClick = () => {
    router.push('/cases');
  };

  // Debug - verificar se as traduções estão carregando
  console.log('RimcCasePage - ready:', ready);
  console.log('RimcCasePage - test translation:', t('rimcCase.meta.backButton'));

  // Aguardar as traduções carregarem
  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando traduções...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#191927] pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white mb-6 sm:mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-inter text-sm">{t('rimcCase.meta.backButton')}</span>
          </button>

          {/* Article Header */}
          <div className="text-center">
            <span className="inline-block bg-[#5667fe]/10 text-[#5667fe] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              {t('rimcCase.meta.category')}
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-white leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              {t('rimcCase.header.title')}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white/70 mb-8 sm:mb-10">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{t('rimcCase.meta.date')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{t('rimcCase.meta.readingTime')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          <div className="mb-8 sm:mb-12">
            <Image 
              src="/images/1rimc.jpeg" 
              alt="1º Registro de Imóveis de Montes Claros" 
              width={800}
              height={320}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-lg"
            />
          </div>

          {/* Overview Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl sm:text-3xl font-urbancat-st font-bold text-[#191927] mb-4 sm:mb-6">
                  {t('rimcCase.overview.title')}
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-inter">
                    {t('rimcCase.overview.description1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-inter">
                    {t('rimcCase.overview.description2')}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-inter">
                    {t('rimcCase.overview.description3')}
                  </p>
                </div>
              </div>
              <div className="bg-[#5667fe]/5 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-urbancat-st font-bold text-[#191927] mb-3 sm:mb-4">
                  {t('rimcCase.overview.projectInfo.title')}
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm">
                  <div className="border-b border-gray-100 pb-2">
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('rimcCase.overview.projectInfo.client')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('rimcCase.overview.projectInfo.clientName')}</div>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('rimcCase.overview.projectInfo.duration')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('rimcCase.overview.projectInfo.durationValue')}</div>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('rimcCase.overview.projectInfo.category')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('rimcCase.overview.projectInfo.categoryValue')}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('rimcCase.overview.projectInfo.solution')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('rimcCase.overview.projectInfo.solutionValue')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Objective Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-[#5667fe]/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#5667fe]" />
                  </div>
                  <h2 className="text-2xl font-urbancat-st font-bold text-[#191927]">
                    {t('rimcCase.objective.title')}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed font-inter">
                  {t('rimcCase.objective.description')}
                </p>
              </div>

              {/* Approach Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-[#5667fe]/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-[#5667fe]" />
                  </div>
                  <h2 className="text-2xl font-urbancat-st font-bold text-[#191927]">
                    {t('rimcCase.approach.title')}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed font-inter mb-6">
                  {t('rimcCase.approach.description')}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-2">{t('rimcCase.approach.hybridService.title')}</h4>
                    <p className="text-sm text-gray-600">{t('rimcCase.approach.hybridService.description')}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-2">{t('rimcCase.approach.digitalManagement.title')}</h4>
                    <p className="text-sm text-gray-600">{t('rimcCase.approach.digitalManagement.description')}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Challenges Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-urbancat-st font-bold text-[#191927]">
                    {t('rimcCase.challenges.title')}
                  </h2>
                </div>
                
                <div className="space-y-8">
                  {/* Challenge 1 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('rimcCase.challenges.challenge1.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('rimcCase.challenges.challenge1.description')}
                    </p>
                  </div>

                  {/* Challenge 2 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('rimcCase.challenges.challenge2.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('rimcCase.challenges.challenge2.description')}
                    </p>
                  </div>

                  {/* Challenge 3 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('rimcCase.challenges.challenge3.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('rimcCase.challenges.challenge3.description')}
                    </p>
                  </div>

                  {/* Challenge 4 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('rimcCase.challenges.challenge4.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('rimcCase.challenges.challenge4.description')}
                    </p>
                  </div>

                  {/* Challenge 5 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('rimcCase.challenges.challenge5.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('rimcCase.challenges.challenge5.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tools Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-[#5667fe]/10 rounded-lg flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-[#5667fe]" />
                  </div>
                  <h2 className="text-2xl font-urbancat-st font-bold text-[#191927]">
                    {t('rimcCase.tools.title')}
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-3">{t('rimcCase.tools.mainPlatformTitle')}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('rimcCase.tools.eAgendaPlatform')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('rimcCase.tools.virtualService')}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-3">{t('rimcCase.tools.functionalitiesTitle')}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('rimcCase.tools.digitalTickets')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('rimcCase.tools.callPanels')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('rimcCase.tools.integratedVirtual')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-urbancat-st font-bold text-[#191927]">
                    {t('rimcCase.results.title')}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed font-inter mb-6">
                  {t('rimcCase.results.description')}
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">{t('rimcCase.results.hybridService.title')}</h4>
                      <p className="text-xs text-gray-600">{t('rimcCase.results.hybridService.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">{t('rimcCase.results.efficientManagement.title')}</h4>
                      <p className="text-xs text-gray-600">{t('rimcCase.results.efficientManagement.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">{t('rimcCase.results.reducedWaiting.title')}</h4>
                      <p className="text-xs text-gray-600">{t('rimcCase.results.reducedWaiting.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">{t('rimcCase.results.completeModernization.title')}</h4>
                      <p className="text-xs text-gray-600">{t('rimcCase.results.completeModernization.description')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-urbancat-st font-bold text-[#191927] mb-3">
                    {t('rimcCase.results.conclusion.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-inter">
                    {t('rimcCase.results.conclusion.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
                {/* Challenges Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-urbancat-st font-bold text-gray-900 mb-4" style={{ fontWeight: 700 }}>
                    {t('rimcCase.sidebar.challengesTitle')}
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('rimcCase.sidebar.challenge1.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('rimcCase.sidebar.challenge1.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('rimcCase.sidebar.challenge2.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('rimcCase.sidebar.challenge2.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('rimcCase.sidebar.challenge3.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('rimcCase.sidebar.challenge3.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('rimcCase.sidebar.challenge4.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('rimcCase.sidebar.challenge4.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('rimcCase.sidebar.challenge5.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('rimcCase.sidebar.challenge5.description')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-[#5667fe]/5 border border-[#5667fe]/20 rounded-xl p-6">
                  <h3 className="text-lg font-urbancat-st font-bold text-[#191927] mb-2">
                    {t('rimcCase.cta.title')}
                  </h3>
                  <p className="text-gray-600 mb-4 font-inter text-sm">
                    {t('rimcCase.cta.description')}
                  </p>
                  <button
                    onClick={() => router.push('/#contact')}
                    className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm w-full justify-center"
                  >
                    <span>{t('rimcCase.cta.button')}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
};

export default RimcCasePage;