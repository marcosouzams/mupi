'use client';

import { ArrowLeft, Calendar, Clock, User, Tag, FolderOpen, Share2, Lightbulb, X, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { BlogPost } from '@/types/wordpress';
import BlogPostContent from '@/components/blog/BlogPostContent';

interface BlogPostClientProps {
  post: BlogPost;
  translations: {
    meta: {
      backButton: string;
      readingTime: string;
      by: string;
      publishedOn: string;
    };
    sidebar: {
      categories: string;
      tags: string;
      author: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  readingTime: number;
  formattedDate: string;
}

const BlogPostClient = ({ post, translations, readingTime, formattedDate }: BlogPostClientProps) => {
  const router = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleBackClick = () => {
    router.push('/blog');
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform animate-slideUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-urbancat-st font-bold text-[#191927]">
                Compartilhar artigo
              </h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-full flex items-center gap-4 p-4 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-xl transition-colors"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Facebook className="w-5 h-5 fill-current" />
                </div>
                <span className="font-urbancat-st font-medium">Compartilhar no Facebook</span>
              </button>

              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-full flex items-center gap-4 p-4 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white rounded-xl transition-colors"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Twitter className="w-5 h-5 fill-current" />
                </div>
                <span className="font-urbancat-st font-medium">Compartilhar no Twitter</span>
              </button>

              <button
                onClick={() => handleSocialShare('linkedin')}
                className="w-full flex items-center gap-4 p-4 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white rounded-xl transition-colors"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Linkedin className="w-5 h-5 fill-current" />
                </div>
                <span className="font-urbancat-st font-medium">Compartilhar no LinkedIn</span>
              </button>

              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="w-full flex items-center gap-4 p-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl transition-colors"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-urbancat-st font-medium">Compartilhar no WhatsApp</span>
              </button>
            </div>

            {/* Copy Link Section */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 font-inter mb-3">Ou copie o link</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-inter focus:outline-none focus:ring-2 focus:ring-[#5667fe]/20"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-6 py-3 rounded-lg font-urbancat-st font-medium transition-all ${
                    isCopied
                      ? 'bg-green-500 text-white'
                      : 'bg-[#5667fe] hover:bg-[#5667fe]/90 text-white'
                  }`}
                >
                  {isCopied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              {isCopied && (
                <p className="text-sm text-green-600 font-inter mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Link copiado com sucesso!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-[#191927] pt-32 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white mb-6 sm:mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-inter text-sm">{translations.meta.backButton}</span>
          </button>

          {/* Article Header */}
          <div className="text-center">
            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
                {post.categories.map((category) => (
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
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-inter max-w-3xl mx-auto mb-6 sm:mb-8">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white/70 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-xs sm:text-sm">
                  {translations.meta.by} {post.author.name}
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
                  {readingTime} {translations.meta.readingTime}
                </span>
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12 sm:mb-16">
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  width={1200}
                  height={600}
                  className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-200">
                <BlogPostContent content={post.content} />
              </div>

              {/* Tags Section */}
              {post.tags.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-[#5667fe]" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-urbancat-st">
                      {translations.sidebar.tags}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-inter transition-colors cursor-pointer"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
                {/* Author Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-[#5667fe]" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-urbancat-st">
                      {translations.sidebar.author}
                    </h3>
                  </div>
                  <div className="flex items-start gap-4">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#5667fe] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-urbancat-st font-bold text-xl">
                          {post.author.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-urbancat-st font-bold text-[#191927] mb-1">
                        {post.author.name}
                      </p>
                      <p className="text-sm text-gray-600 font-inter">
                        Especialista em transformação digital
                      </p>
                    </div>
                  </div>
                </div>

                {/* Categories Card */}
                {post.categories.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <FolderOpen className="w-4 h-4 text-[#5667fe]" />
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-urbancat-st">
                        {translations.sidebar.categories}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {post.categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <span className="text-sm font-inter text-gray-700">
                            {category.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="bg-[#5667fe] rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-urbancat-st font-bold text-white">
                      {translations.cta.title}
                    </h3>
                  </div>
                  <p className="text-white/90 mb-6 font-inter text-sm leading-relaxed">
                    {translations.cta.description}
                  </p>
                  <button
                    onClick={() => router.push('/contact')}
                    className="w-full bg-white hover:bg-gray-50 text-[#5667fe] px-6 py-3 rounded-xl transition-colors font-urbancat-st font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <span>{translations.cta.button}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default BlogPostClient;
