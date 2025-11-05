import { fetchPostBySlug, fetchPosts } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostClient from '@/components/blog/BlogPostClient';

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
    // Fetch ALL posts (WordPress default max is 100, so we need to paginate)
    let allSlugs: string[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://mupisystems.com.br/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=slug`,
        { cache: 'no-store' } // No cache during build
      );

      if (!response.ok) {
        break;
      }

      const posts: { slug: string }[] = await response.json();
      allSlugs = allSlugs.concat(posts.map(p => p.slug));

      // Check if there are more pages
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
      hasMore = page < totalPages;
      page++;
    }

    console.log(`[SSG] Generating ${allSlugs.length} blog post pages...`);
    
    return allSlugs.map((slug) => ({
      slug,
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

// Disable dynamic params - only generate pages from generateStaticParams
export const dynamicParams = false;

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
    <BlogPostClient 
      post={post}
      translations={translations}
      readingTime={readingTime}
      formattedDate={formattedDate}
    />
  );
};

export default BlogPostPage;
