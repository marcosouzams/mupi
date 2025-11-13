import { fetchPostBySlug } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Tag } from 'lucide-react';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostSidebar from '@/components/blog/BlogPostSidebar';
import ExternalLinksEnhancer from '@/components/blog/ExternalLinksEnhancer';

// ISR: Only revalidate on-demand via webhook (no time-based revalidation)
export const revalidate = false;

// Enable dynamic params - allow new posts to be generated on-demand
export const dynamicParams = true;

// Force static rendering (no streaming) for better SEO crawler compatibility
export const dynamic = 'force-static';

// Fallback translations
const fallbackTranslations = {
  pt: {
    meta: {
      backButton: "Voltar para o blog",
      readingTime: "min de leitura",
      by: "Por",
      publishedOn: "Publicado em"
    },
    sidebar: {
      categories: "Categorias",
      tags: "Tags",
      author: "Sobre o Autor"
    },
    cta: {
      title: "Gostou deste conteúdo?",
      description: "Assine nossa newsletter e receba mais insights como este diretamente no seu e-mail.",
      button: "Falar com especialistas"
    },
    relatedPosts: {
      title: "Posts Relacionados"
    }
  },
  en: {
    meta: {
      backButton: "Back to blog",
      readingTime: "min read",
      by: "By",
      publishedOn: "Published on"
    },
    sidebar: {
      categories: "Categories",
      tags: "Tags",
      author: "About the Author"
    },
    cta: {
      title: "Did you like this content?",
      description: "Subscribe to our newsletter and receive more insights like this directly in your email.",
      button: "Talk to specialists"
    },
    relatedPosts: {
      title: "Related Posts"
    }
  },
  es: {
    meta: {
      backButton: "Volver al blog",
      readingTime: "min de lectura",
      by: "Por",
      publishedOn: "Publicado en"
    },
    sidebar: {
      categories: "Categorías",
      tags: "Etiquetas",
      author: "Sobre el Autor"
    },
    cta: {
      title: "¿Te gustó este contenido?",
      description: "Suscríbete a nuestro boletín y recibe más información como esta directamente en tu correo electrónico.",
      button: "Hablar con especialistas"
    },
    relatedPosts: {
      title: "Publicaciones Relacionadas"
    }
  }
};

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    // ISR Optimization: Only generate the most recent 10 posts at build time
    // Other posts will be generated on-demand when first requested
    const response = await fetch(
      `https://blog.mupisystems.com.br/wp-json/wp/v2/posts?per_page=10&page=1&_fields=slug`,
      { cache: 'force-cache' } // Cache at build time, revalidate via webhook only
    );

    if (!response.ok) {
      return [];
    }

    const posts: { slug: string }[] = await response.json();
    
    console.log(`[ISR] Pre-generating ${posts.length} most recent blog posts at build time...`);
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.title} | Mupi Systems Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage.url] : [],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // TODO: Get language from headers or locale
  const lang = 'pt';
  const translations = fallbackTranslations[lang as keyof typeof fallbackTranslations];

  // Calculate reading time (average 200 words per minute)
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Format date
  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with interactivity */}
      <BlogPostHeader
        title={post.title}
        excerpt={post.excerpt}
        author={post.author}
        categories={post.categories}
        readingTime={readingTime}
        formattedDate={formattedDate}
        translations={{
          backButton: translations.meta.backButton,
          readingTime: translations.meta.readingTime,
          by: translations.meta.by,
          publishedOn: translations.meta.publishedOn,
        }}
      />

      {/* Article Content - Rendered on Server for SEO */}
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
              <BlogPostSidebar
                author={post.author}
                categories={post.categories}
                translations={{
                  author: translations.sidebar.author,
                  categories: translations.sidebar.categories,
                  ctaTitle: translations.cta.title,
                  ctaDescription: translations.cta.description,
                  ctaButton: translations.cta.button,
                }}
              />
            </div>
          </div>
        </div>
      </article>

      {/* Progressive Enhancement: External links open in new tab */}
      <ExternalLinksEnhancer />
    </div>
  );
};

export default BlogPostPage;
