'use client';

import { ArrowRight, Filter, Calendar, User, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BlogPost, WordPressCategory } from '@/types/wordpress';

interface BlogPostsListProps {
  initialPosts: BlogPost[];
  categories: WordPressCategory[];
  totalPostsCount: number;
  translations: {
    filterByCategory: string;
    all: string;
    readMore: string;
    by: string;
    in: string;
    minutes: string;
    emptyTitle: string;
    emptyDescription: string;
    viewAll: string;
  };
}

export default function BlogPostsList({ initialPosts, categories, totalPostsCount, translations }: BlogPostsListProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // Estado inalterado com todos os posts
  const [allPosts] = useState<BlogPost[]>(initialPosts);
  // Estado alterado que será renderizado
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);

  // Filtrar posts localmente quando a categoria muda
  useEffect(() => {
    if (selectedCategory === null) {
      // Mostrar todos os posts
      setFilteredPosts(allPosts);
    } else {
      // Filtrar posts pela categoria selecionada
      const filtered = allPosts.filter(post => 
        post.categories.some(cat => cat.id === selectedCategory)
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, allPosts]);

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-[1000px]">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
            {/* Filters Sidebar */}
            <aside className="mb-8 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
              <h3 className="text-lg font-urbancat-st font-bold text-[#191927] mb-4 text-center lg:text-left">
                {translations.filterByCategory}
              </h3>
              
              <div className="flex overflow-x-auto scrollbar-hide gap-3 pb-2 lg:flex-col lg:overflow-x-visible lg:gap-2 lg:pb-0">
                {/* All posts button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === null
                      ? 'bg-[#5667fe] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  } lg:w-full lg:justify-between`}
                >
                  <span>{translations.all}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === null
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {totalPostsCount}
                  </span>
                </button>

                {/* Category buttons */}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-[#5667fe] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    } lg:w-full lg:justify-between`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Posts List */}
            <div>
              <div className="space-y-6 lg:space-y-8">
                {filteredPosts.map((post) => (
                    <article 
                      key={post.id}
                      className="relative h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-500"
                      onClick={() => handlePostClick(post.slug)}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        {post.featuredImage?.url ? (
                          <Image 
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#5667fe] to-[#191927]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>

                      {/* Content Overlay */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8">
                        {/* Top Section */}
                        <div className="flex items-start justify-between">
                          {post.categories.length > 0 && (
                            <span className="bg-[#5667fe] text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium">
                              {post.categories[0].name}
                            </span>
                          )}
                        </div>

                        {/* Bottom Section */}
                        <div className="space-y-2 sm:space-y-3">
                          {/* Title */}
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-urbancat-st font-bold text-white leading-tight transition-colors duration-300">
                            {post.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-white/85 text-sm sm:text-base leading-relaxed font-inter max-w-xl lg:max-w-2xl line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Meta Information */}
                          <div className="flex flex-wrap items-center gap-3 text-white/70 text-xs sm:text-sm">
                            <div className="flex items-center space-x-1.5">
                              <User className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{calculateReadingTime(post.content)} {translations.minutes}</span>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <div className="hidden sm:block pt-3">
                            <button
                              onClick={() => handlePostClick(post.slug)}
                              className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium group/btn text-xs backdrop-blur-sm"
                            >
                              <span>{translations.readMore}</span>
                              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5667fe]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </article>
                  ))}
                </div>

              {/* Empty State */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-urbancat-st font-bold text-gray-700 mb-2">
                    {translations.emptyTitle}
                  </h3>
                  <p className="text-gray-500 font-inter mb-4">
                    {translations.emptyDescription}
                  </p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="inline-flex items-center space-x-2 text-[#5667fe] hover:text-[#5667fe]/80 font-medium text-sm transition-colors duration-300"
                  >
                    <span>{translations.viewAll}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
