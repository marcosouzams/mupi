'use client';

import { ArrowLeft, Target, Lightbulb, Building2, Clock, Wrench, CheckCircle, TrendingUp, Zap, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface RimcCasePageClientProps {
  translations: any;
}

export default function RimcCasePageClient({ translations: t }: RimcCasePageClientProps) {
  const router = useRouter();
  
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
            <span className="font-inter text-sm">{t.rimcCase.meta.backButton}</span>
          </button>

          {/* Article Header */}
          <div className="text-center">
            <span className="inline-block bg-[#5667fe]/10 text-[#5667fe] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              {t.rimcCase.meta.category}
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-white leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              {t.rimcCase.header.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white/70 mb-8 sm:mb-10">
              <span className="text-xs sm:text-sm">{t.rimcCase.meta.date}</span>
              <span className="hidden sm:inline text-white/50">•</span>
              <span className="text-xs sm:text-sm">{t.rimcCase.meta.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image - Clean e Simples */}
          <div className="mb-12 sm:mb-16">
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image 
                src="/images/1rimc.jpeg" 
                alt="1º Registro de Imóveis de Montes Claros" 
                width={1200}
                height={400}
                className="w-full h-64 sm:h-80 lg:h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Overview Section */}
          <div className="mb-16">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="mb-6">
                  <span className="inline-block text-xs font-bold text-[#5667fe] uppercase tracking-wider font-urbancat-st mb-4">
                    {t.rimcCase.overview.title}
                  </span>
                  <div className="h-px bg-gradient-to-r from-[#5667fe]/40 via-[#5667fe]/20 to-transparent mb-8"></div>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed text-lg font-inter mb-6">
                    {t.rimcCase.overview.description1}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base font-inter mb-4">
                    {t.rimcCase.overview.description2}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base font-inter">
                    {t.rimcCase.overview.description3}
                  </p>
                </div>
              </div>

              {/* Project Info Card - Clean Sidebar */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Building2 className="w-4 h-4 text-[#5667fe]" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-urbancat-st">
                      {t.rimcCase.overview.projectInfo.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide font-urbancat-st mb-2">
                        {t.rimcCase.overview.projectInfo.client}
                      </p>
                      <p className="text-sm text-gray-600 font-inter">
                        {t.rimcCase.overview.projectInfo.clientName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide font-urbancat-st mb-2">
                        {t.rimcCase.overview.projectInfo.duration}
                      </p>
                      <p className="text-sm text-gray-600 font-inter">
                        {t.rimcCase.overview.projectInfo.durationValue}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide font-urbancat-st mb-2">
                        {t.rimcCase.overview.projectInfo.category}
                      </p>
                      <p className="text-sm text-gray-600 font-inter">
                        {t.rimcCase.overview.projectInfo.categoryValue}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide font-urbancat-st mb-2">
                        {t.rimcCase.overview.projectInfo.solution}
                      </p>
                      <p className="text-sm text-gray-600 font-inter">
                        {t.rimcCase.overview.projectInfo.solutionValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Objective Section */}
              <div>
                <div className="mb-6">
                  <span className="inline-block text-xs font-bold text-[#5667fe] uppercase tracking-wider font-urbancat-st mb-4">
                    {t.rimcCase.objective.title}
                  </span>
                  <div className="h-px bg-gradient-to-r from-[#5667fe]/40 via-[#5667fe]/20 to-transparent mb-6"></div>
                </div>
                <p className="text-gray-800 leading-relaxed font-inter text-lg">
                  {t.rimcCase.objective.description}
                </p>
              </div>

              {/* Approach Section */}
              <div>
                <div className="mb-6">
                  <span className="inline-block text-xs font-bold text-[#5667fe] uppercase tracking-wider font-urbancat-st mb-4">
                    {t.rimcCase.approach.title}
                  </span>
                  <div className="h-px bg-gradient-to-r from-[#5667fe]/40 via-[#5667fe]/20 to-transparent mb-6"></div>
                </div>
                <p className="text-gray-800 leading-relaxed font-inter text-lg mb-8">
                  {t.rimcCase.approach.description}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.approach.hybridService.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-base font-inter">
                      {t.rimcCase.approach.hybridService.description}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.approach.digitalManagement.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-base font-inter">
                      {t.rimcCase.approach.digitalManagement.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Challenges Section */}
              <div>
                <div className="mb-6">
                  <span className="inline-block text-xs font-bold text-[#5667fe] uppercase tracking-wider font-urbancat-st mb-4">
                    {t.rimcCase.challenges.title}
                  </span>
                  <div className="h-px bg-gradient-to-r from-[#5667fe]/40 via-[#5667fe]/20 to-transparent mb-8"></div>
                </div>
                
                <div className="space-y-8">
                  {/* Challenge 1 */}
                  <div>
                    <h3 className="text-sm font-urbancat-st font-bold text-[#191927] mb-2">
                      {t.rimcCase.challenges.challenge1.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-inter text-base">
                      {t.rimcCase.challenges.challenge1.description}
                    </p>
                  </div>

                  {/* Challenge 2 */}
                  <div>
                    <h3 className="text-sm font-urbancat-st font-bold text-[#191927] mb-2">
                      {t.rimcCase.challenges.challenge2.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-inter text-base">
                      {t.rimcCase.challenges.challenge2.description}
                    </p>
                  </div>

                  {/* Challenge 3 */}
                  <div>
                    <h3 className="text-sm font-urbancat-st font-bold text-[#191927] mb-2">
                      {t.rimcCase.challenges.challenge3.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-inter text-base">
                      {t.rimcCase.challenges.challenge3.description}
                    </p>
                  </div>

                  {/* Challenge 4 */}
                  <div>
                    <h3 className="text-sm font-urbancat-st font-bold text-[#191927] mb-2">
                      {t.rimcCase.challenges.challenge4.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-inter text-base">
                      {t.rimcCase.challenges.challenge4.description}
                    </p>
                  </div>

                  {/* Challenge 5 */}
                  <div>
                    <h3 className="text-sm font-urbancat-st font-bold text-[#191927] mb-2">
                      {t.rimcCase.challenges.challenge5.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-inter text-base">
                      {t.rimcCase.challenges.challenge5.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tools Section */}
              <div>
                <div className="mb-6">
                  <span className="inline-block text-xs font-bold text-[#5667fe] uppercase tracking-wider font-urbancat-st mb-4">
                    {t.rimcCase.tools.title}
                  </span>
                  <div className="h-px bg-gradient-to-r from-[#5667fe]/40 via-[#5667fe]/20 to-transparent mb-8"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Main Platform */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Wrench className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.tools.mainPlatformTitle}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-800 text-base font-inter">{t.rimcCase.tools.eAgendaPlatform}</p>
                      <p className="text-gray-800 text-base font-inter">{t.rimcCase.tools.virtualService}</p>
                    </div>
                  </div>
                  
                  {/* Functionalities */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.tools.functionalitiesTitle}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-800 text-base font-inter">{t.rimcCase.tools.digitalTickets}</p>
                      <p className="text-gray-800 text-base font-inter">{t.rimcCase.tools.callPanels}</p>
                      <p className="text-gray-800 text-base font-inter">{t.rimcCase.tools.integratedVirtual}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div>
                <div className="mb-6">
                  <span className="inline-block text-xs font-bold text-[#5667fe] uppercase tracking-wider font-urbancat-st mb-4">
                    {t.rimcCase.results.title}
                  </span>
                  <div className="h-px bg-gradient-to-r from-[#5667fe]/40 via-[#5667fe]/20 to-transparent mb-6"></div>
                </div>
                <p className="text-gray-800 leading-relaxed font-inter text-lg mb-8">
                  {t.rimcCase.results.description}
                </p>
                <div className="grid md:grid-cols-2 gap-5 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.results.hybridService.title}
                      </h4>
                    </div>
                    <p className="text-base text-gray-600 font-inter leading-relaxed">
                      {t.rimcCase.results.hybridService.description}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.results.efficientManagement.title}
                      </h4>
                    </div>
                    <p className="text-base text-gray-600 font-inter leading-relaxed">
                      {t.rimcCase.results.efficientManagement.description}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.results.reducedWaiting.title}
                      </h4>
                    </div>
                    <p className="text-base text-gray-600 font-inter leading-relaxed">
                      {t.rimcCase.results.reducedWaiting.description}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#5667fe]" />
                      <h4 className="font-urbancat-st font-bold text-[#191927] text-sm">
                        {t.rimcCase.results.completeModernization.title}
                      </h4>
                    </div>
                    <p className="text-base text-gray-600 font-inter leading-relaxed">
                      {t.rimcCase.results.completeModernization.description}
                    </p>
                  </div>
                </div>
                
                {/* Conclusion */}
                <div className="bg-[#5667fe]/5 rounded-xl p-6 border border-[#5667fe]/20">
                  <h3 className="text-lg font-urbancat-st font-bold text-[#191927] mb-3">
                    {t.rimcCase.results.conclusion.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-inter text-sm">
                    {t.rimcCase.results.conclusion.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
                {/* Challenges Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-5 h-5 text-orange-600" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-urbancat-st">
                      {t.rimcCase.sidebar.challengesTitle}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num}>
                        <h4 className="font-urbancat-st font-semibold text-[#191927] text-sm mb-2">
                          {t.rimcCase.sidebar[`challenge${num}`].title}
                        </h4>
                        <p className="text-xs text-gray-600 font-inter leading-relaxed">
                          {t.rimcCase.sidebar[`challenge${num}`].description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-[#5667fe] rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-urbancat-st font-bold text-white">
                      {t.rimcCase.cta.title}
                    </h3>
                  </div>
                  <p className="text-white/90 mb-6 font-inter text-sm leading-relaxed">
                    {t.rimcCase.cta.description}
                  </p>
                  <button
                    onClick={() => router.push('/#contact')}
                    className="w-full bg-white hover:bg-gray-50 text-[#5667fe] px-6 py-3 rounded-xl transition-colors font-urbancat-st font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <span>{t.rimcCase.cta.button}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}
