'use client';

import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ShareModal from './ShareModal';

interface BlogPostHeaderProps {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  categories: Array<{ id: number; name: string; slug: string }>;
  readingTime: number;
  formattedDate: string;
  translations: {
    backButton: string;
    readingTime: string;
    by: string;
    publishedOn: string;
  };
}

const BlogPostHeader = ({
  title,
  excerpt,
  author,
  categories,
  readingTime,
  formattedDate,
  translations,
}: BlogPostHeaderProps) => {
  const router = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleBackClick = () => {
    router.push('/blog');
  };

  return (
    <>
      {isShareModalOpen && (
        <ShareModal
          title={title}
          excerpt={excerpt}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      <section className="bg-[#191927] pt-32 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white mb-6 sm:mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-inter text-sm">{translations.backButton}</span>
          </button>

          {/* Article Header */}
          <div className="text-center">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
                {categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block bg-[#5667fe]/10 text-[#5667fe] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-white leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              {title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-inter max-w-3xl mx-auto mb-6 sm:mb-8">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white/70 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-xs sm:text-sm">
                  {translations.by} {author.name}
                </span>
              </div>
              <span className="hidden sm:inline text-white/50">•</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{formattedDate}</span>
              </div>
              <span className="hidden sm:inline text-white/50">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs sm:text-sm">
                  {readingTime} {translations.readingTime}
                </span>
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostHeader;
