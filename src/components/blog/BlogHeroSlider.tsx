'use client';

import { ArrowRight, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BlogPost } from '@/types/wordpress';

interface BlogHeroSliderProps {
  featuredPosts: BlogPost[];
  translations: {
    viewFullPost: string;
    minutes: string;
  };
}

export default function BlogHeroSlider({ featuredPosts, translations }: BlogHeroSliderProps) {
  const router = useRouter();
  const [swiperInstance, setSwiperInstance] = useState<{slidePrev: () => void, slideNext: () => void} | null>(null);

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
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

  if (featuredPosts.length === 0) return null;

  return (
    <>
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active-custom {
          background: #5667fe !important;
          transform: scale(1.2);
        }
      `}</style>

      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="h-[500px] lg:h-[550px]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={setSwiperInstance}
            pagination={{ 
              clickable: true,
              el: '.swiper-pagination-custom',
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="h-full"
          >
            {featuredPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="relative h-full">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    {post.featuredImage?.url ? (
                      <Image 
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#5667fe] to-[#191927]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center h-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <div className="max-w-lg">
                        {post.categories.length > 0 && (
                          <span className="inline-block bg-[#5667fe]/90 text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                            {post.categories[0].name}
                          </span>
                        )}
                        
                        <h1 className="text-2xl lg:text-3xl font-urbancat-st font-bold text-white leading-tight mb-4">
                          {post.title}
                        </h1>
                        
                        <p className="text-base text-white/90 leading-relaxed font-inter mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center space-x-4 mb-6 text-white/80 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{calculateReadingTime(post.content)} {translations.minutes}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handlePostClick(post.slug)}
                          className="inline-flex items-center space-x-2 bg-[#5667fe] hover:bg-[#5667fe]/90 text-white px-5 py-2.5 rounded-lg transition-all duration-300 font-medium group text-sm"
                        >
                          <span>{translations.viewFullPost}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          {featuredPosts.length > 1 && (
            <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 z-20 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePrevSlide}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNextSlide}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Custom Pagination */}
              <div className="swiper-pagination-custom flex space-x-2"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
