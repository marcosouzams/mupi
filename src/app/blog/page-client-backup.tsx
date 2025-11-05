'use client';

import { useEffect, useState } from 'react';
import { fetchAllPosts, fetchFeaturedPosts, fetchCategories } from '@/services/wordpress';
import BlogHeroSlider from '@/components/blog/BlogHeroSlider';
import BlogPostsList from '@/components/blog/BlogPostsList';
import BlogCTASection from '@/components/blog/BlogCTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost, WordPressCategory } from '@/types/wordpress';

// Traduções padrão
const translations = {
  pt: {
    hero: {
      viewFullPost: "Ler post completo"
    },
    header: {
      subtitle: "NOSSO BLOG",
      title: "Insights e <span class=\"text-[#5667fe]\">Novidades</span>",
      description: "Fique por dentro das últimas tendências em tecnologia, inovação e transformação digital."
    },
    filters: {
      filterByCategory: "Filtrar por Categoria",
      all: "Todos os Posts"
    },
    postCard: {
      readMore: "Ler mais",
      by: "Por",
      in: "em",
      minutes: "min de leitura"
    },
    emptyState: {
      title: "Nenhum post encontrado",
      description: "Não há posts nesta categoria no momento.",
      viewAll: "Ver todos os posts"
    },
    cta: {
      title: "Quer saber mais sobre nossas soluções?",
      description: "Nossa equipe de especialistas está pronta para ajudar sua empresa a crescer com tecnologia de ponta.",
      contactSpecialists: "Falar com especialistas",
      knowSolutions: "Conhecer nossas soluções"
    }
  },
  en: {
    hero: {
      viewFullPost: "Read full post"
    },
    header: {
      subtitle: "OUR BLOG",
      title: "Insights and <span class=\"text-[#5667fe]\">News</span>",
      description: "Stay up to date with the latest trends in technology, innovation and digital transformation."
    },
    filters: {
      filterByCategory: "Filter by Category",
      all: "All Posts"
    },
    postCard: {
      readMore: "Read more",
      by: "By",
      in: "in",
      minutes: "min read"
    },
    emptyState: {
      title: "No posts found",
      description: "There are no posts in this category at the moment.",
      viewAll: "View all posts"
    },
    cta: {
      title: "Want to know more about our solutions?",
      description: "Our team of experts is ready to help your company grow with cutting-edge technology.",
      contactSpecialists: "Talk to specialists",
      knowSolutions: "Discover our solutions"
    }
  },
  es: {
    hero: {
      viewFullPost: "Leer publicación completa"
    },
    header: {
      subtitle: "NUESTRO BLOG",
      title: "Perspectivas y <span class=\"text-[#5667fe]\">Noticias</span>",
      description: "Mantente al día con las últimas tendencias en tecnología, innovación y transformación digital."
    },
    filters: {
      filterByCategory: "Filtrar por Categoría",
      all: "Todas las Publicaciones"
    },
    postCard: {
      readMore: "Leer más",
      by: "Por",
      in: "en",
      minutes: "min de lectura"
    },
    emptyState: {
      title: "No se encontraron publicaciones",
      description: "No hay publicaciones en esta categoría en este momento.",
      viewAll: "Ver todas las publicaciones"
    },
    cta: {
      title: "¿Quieres saber más sobre nuestras soluciones?",
      description: "Nuestro equipo de expertos está listo para ayudar a su empresa a crecer con tecnología de vanguardia.",
      contactSpecialists: "Hablar con especialistas",
      knowSolutions: "Conocer nuestras soluciones"
    }
  }
};

const BlogPage = () => {
  const { language } = useLanguage();
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [featuredData, postsData, categoriesData] = await Promise.all([
          fetchFeaturedPosts(),
          fetchAllPosts(), // Busca TODOS os posts de forma otimizada
          fetchCategories(),
        ]);

        setFeaturedPosts(featuredData);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const t = translations[language as keyof typeof translations];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Skeleton */}
        <div className="relative h-[500px] bg-gray-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300"></div>
        </div>

        {/* Header Skeleton */}
        <section className="bg-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <div className="h-4 w-32 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-10 w-96 bg-gray-300 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-[500px] bg-gray-300 animate-pulse rounded mx-auto"></div>
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
              {/* Sidebar Skeleton */}
              <aside className="mb-8 lg:mb-0">
                <div className="h-6 w-48 bg-gray-300 animate-pulse rounded mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 bg-gray-300 animate-pulse rounded"></div>
                  ))}
                </div>
              </aside>

              {/* Posts Skeleton */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 bg-gray-300 animate-pulse rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const totalPostsCount = posts.length; // Total unique posts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <BlogHeroSlider 
        featuredPosts={featuredPosts}
        translations={{
          viewFullPost: t.hero.viewFullPost,
          minutes: t.postCard.minutes
        }}
      />

      {/* Header */}
      <section className="bg-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm font-urbancat-st font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-4 block">
            {t.header.subtitle}
          </span>
          <h2 
            className="text-2xl lg:text-3xl xl:text-4xl font-urbancat-st font-bold text-[#191927] leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t.header.title }}
          />
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-inter max-w-2xl mx-auto">
            {t.header.description}
          </p>
        </div>
      </section>

      {/* Posts with Filters */}
      <BlogPostsList 
        initialPosts={posts}
        categories={categories}
        totalPostsCount={totalPostsCount}
        translations={{
          filterByCategory: t.filters.filterByCategory,
          all: t.filters.all,
          readMore: t.postCard.readMore,
          by: t.postCard.by,
          in: t.postCard.in,
          minutes: t.postCard.minutes,
          emptyTitle: t.emptyState.title,
          emptyDescription: t.emptyState.description,
          viewAll: t.emptyState.viewAll
        }}
      />

      {/* CTA Section */}
      <BlogCTASection 
        translations={{
          title: t.cta.title,
          description: t.cta.description,
          contactSpecialists: t.cta.contactSpecialists,
          knowSolutions: t.cta.knowSolutions
        }}
      />
    </div>
  );
};

export default BlogPage;
