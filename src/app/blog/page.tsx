import { fetchAllPostsForListing, fetchFeaturedPosts, fetchCategories } from '@/services/wordpress';
import BlogHeroSlider from '@/components/blog/BlogHeroSlider';
import BlogPostsList from '@/components/blog/BlogPostsList';
import BlogCTASection from '@/components/blog/BlogCTASection';
import type { BlogPost, WordPressCategory } from '@/types/wordpress';

// Traduções padrão (podemos pegar do contexto depois)
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
  }
};

const BlogPage = async () => {
  // Fetch all data at build time (optimized without full content)
  const [featuredPosts, posts, categories] = await Promise.all([
    fetchFeaturedPosts(),
    fetchAllPostsForListing(), // Optimized: without content field
    fetchCategories(),
  ]);

  // TODO: Get language from headers or locale
  const lang = 'pt';
  const t = translations[lang as keyof typeof translations];

  const totalPostsCount = posts.length;

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

export default BlogPage;
