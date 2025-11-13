'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import BlogHeroSlider from '@/components/blog/BlogHeroSlider';
import BlogPostsList from '@/components/blog/BlogPostsList';
import BlogCTASection from '@/components/blog/BlogCTASection';
import type { BlogPost, WordPressCategory } from '@/types/wordpress';

interface BlogPageClientProps {
  featuredPosts: BlogPost[];
  posts: BlogPost[];
  categories: WordPressCategory[];
  currentPage: number;
  totalPages: number;
  selectedCategory?: number;
}

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
      knowSolutions: "Know our solutions"
    }
  },
  es: {
    hero: {
      viewFullPost: "Leer publicación completa"
    },
    header: {
      subtitle: "NUESTRO BLOG",
      title: "Perspectivas y <span class=\"text-[#5667fe]\">Novedades</span>",
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
      description: "Nuestro equipo de expertos está listo para ayudar a tu empresa a crecer con tecnología de punta.",
      contactSpecialists: "Hablar con especialistas",
      knowSolutions: "Conocer nuestras soluciones"
    }
  }
};

const BlogPageClient = ({ featuredPosts, posts, categories, currentPage, totalPages, selectedCategory }: BlogPageClientProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <section className="bg-[#191927] pt-40 lg:pt-48 pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 lg:mb-12">
            <span className="text-sm font-urbancat-st font-bold text-[#5667fe] uppercase tracking-[0.15em] mb-5 block">
              {t.header.subtitle}
            </span>
            <h1 
              className="text-3xl lg:text-4xl xl:text-5xl font-urbancat-st font-bold text-white leading-tight mb-5"
              dangerouslySetInnerHTML={{ __html: t.header.title }}
            />
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed font-inter max-w-3xl mx-auto">
              {t.header.description}
            </p>
          </div>

          {/* Hero Slider */}
          <BlogHeroSlider 
            featuredPosts={featuredPosts}
            translations={{
              viewFullPost: t.hero.viewFullPost,
              minutes: t.postCard.minutes
            }}
          />
        </div>
      </section>

      {/* Posts with Filters */}
      <section className="py-16 lg:py-20">
        <BlogPostsList 
          posts={posts}
          categories={categories}
          currentPage={currentPage}
          totalPages={totalPages}
          selectedCategory={selectedCategory}
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
      </section>

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

export default BlogPageClient;
