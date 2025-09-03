'use client';

import { ArrowLeft, Calendar, User, Clock, Target, Lightbulb, Wrench, TrendingUp, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const BienalCasePage = () => {
  const router = useRouter();
  const { t } = useTranslation('bienal-case');
  
  const handleBackClick = () => {
    router.push('/cases');
  };

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
            <span className="font-inter text-sm">{t('bienalCase.meta.backButton')}</span>
          </button>

          {/* Article Header */}
          <div className="text-center">
            <span className="inline-block bg-[#5667fe]/10 text-[#5667fe] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              {t('bienalCase.meta.category')}
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-white leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              {t('bienalCase.header.title')}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 text-sm text-white/70 mb-8 sm:mb-10">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{t('bienalCase.meta.author')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{t('bienalCase.meta.date')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{t('bienalCase.meta.readingTime')}</span>
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
              src="/images/bienal.webp" 
              alt="Bienal do Livro Rio 2025" 
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
                  {t('bienalCase.overview.title')}
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-inter">
                    {t('bienalCase.overview.description1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-inter">
                    {t('bienalCase.overview.description2')}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-inter">
                    {t('bienalCase.overview.description3')}
                  </p>
                </div>
              </div>
              <div className="bg-[#5667fe]/5 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-urbancat-st font-bold text-[#191927] mb-3 sm:mb-4">
                  {t('bienalCase.overview.projectInfo.title')}
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm">
                  <div className="border-b border-gray-100 pb-2">
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('bienalCase.overview.projectInfo.client')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('bienalCase.overview.projectInfo.clientName')}</div>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('bienalCase.overview.projectInfo.duration')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('bienalCase.overview.projectInfo.durationValue')}</div>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('bienalCase.overview.projectInfo.category')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('bienalCase.overview.projectInfo.categoryValue')}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-1">{t('bienalCase.overview.projectInfo.solution')}</div>
                    <div className="font-medium text-[#191927] break-words text-sm">{t('bienalCase.overview.projectInfo.solutionValue')}</div>
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
                    {t('bienalCase.objective.title')}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed font-inter">
                  {t('bienalCase.objective.description')}
                </p>
              </div>

              {/* Approach Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-[#5667fe]/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-[#5667fe]" />
                  </div>
                  <h2 className="text-2xl font-urbancat-st font-bold text-[#191927]">
                    {t('bienalCase.approach.title')}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed font-inter mb-6">
                  {t('bienalCase.approach.description')}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-2">{t('bienalCase.approach.architecture.title')}</h4>
                    <p className="text-sm text-gray-600">{t('bienalCase.approach.architecture.description')}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-2">{t('bienalCase.approach.rules.title')}</h4>
                    <p className="text-sm text-gray-600">{t('bienalCase.approach.rules.description')}</p>
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
                    {t('bienalCase.challenges.title')}
                  </h2>
                </div>
                
                <div className="space-y-8">
                  {/* Challenge 1 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('bienalCase.challenges.challenge1.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('bienalCase.challenges.challenge1.description')}
                    </p>
                  </div>

                  {/* Challenge 2 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('bienalCase.challenges.challenge2.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('bienalCase.challenges.challenge2.description')}
                    </p>
                  </div>

                  {/* Challenge 3 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('bienalCase.challenges.challenge3.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('bienalCase.challenges.challenge3.description')}
                    </p>
                  </div>

                  {/* Challenge 4 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('bienalCase.challenges.challenge4.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('bienalCase.challenges.challenge4.description')}
                    </p>
                  </div>

                  {/* Challenge 5 */}
                  <div>
                    <h3 className="text-xl font-urbancat-st font-bold text-[#191927] mb-3">
                      {t('bienalCase.challenges.challenge5.title')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {t('bienalCase.challenges.challenge5.description')}
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
                    {t('bienalCase.tools.title')}
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-3">{t('bienalCase.tools.mainTechTitle')}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('bienalCase.tools.eAgendaPlatform')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('bienalCase.tools.cloudArchitecture')}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-urbancat-st font-bold text-[#191927] mb-3">{t('bienalCase.tools.functionalitiesTitle')}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('bienalCase.tools.validationSystem')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#5667fe] rounded-full"></div>
                        <span className="text-gray-700 text-sm">{t('bienalCase.tools.waitingList')}</span>
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
                    {t('bienalCase.results.title')}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed font-inter mb-6">
                  {t('bienalCase.results.description')}
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">Sistema Estável</h4>
                      <p className="text-xs text-gray-600">Zero downtime durante picos de acesso</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">Controle Eficaz</h4>
                      <p className="text-xs text-gray-600">Distribuição justa de vagas implementada</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">Otimização de Vagas</h4>
                      <p className="text-xs text-gray-600">Lista de espera minimizou vagas ociosas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">Experiência Fluida</h4>
                      <p className="text-xs text-gray-600">Processo de agendamento intuitivo</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-urbancat-st font-bold text-[#191927] mb-3">
                    {t('bienalCase.results.conclusion.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-inter">
                    {t('bienalCase.results.conclusion.description')}
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
                    {t('bienalCase.sidebar.challengesTitle')}
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('bienalCase.sidebar.challenge1.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('bienalCase.sidebar.challenge1.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('bienalCase.sidebar.challenge2.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('bienalCase.sidebar.challenge2.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('bienalCase.sidebar.challenge3.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('bienalCase.sidebar.challenge3.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('bienalCase.sidebar.challenge4.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('bienalCase.sidebar.challenge4.description')}
                      </p>
                    </div>
                    <div className="border-l-4 border-[#5667fe] pl-4">
                      <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-1">
                        {t('bienalCase.sidebar.challenge5.title')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t('bienalCase.sidebar.challenge5.description')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-[#5667fe]/5 border border-[#5667fe]/20 rounded-xl p-6">
                  <h3 className="text-lg font-urbancat-st font-bold text-[#191927] mb-2">
                    {t('bienalCase.cta.title')}
                  </h3>
                  <p className="text-gray-600 mb-4 font-inter text-sm">
                    {t('bienalCase.cta.description')}
                  </p>
                  <button
                    onClick={() => router.push('/#contact')}
                    className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm w-full justify-center"
                  >
                    <span>{t('bienalCase.cta.button')}</span>
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

export default BienalCasePage;