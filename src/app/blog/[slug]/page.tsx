import { fetchPostBySlug } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostClient from '@/components/blog/BlogPostClient';

// ISR: Only revalidate on-demand via webhook (no time-based revalidation)
export const revalidate = false;

// Enable dynamic params - allow new posts to be generated on-demand
export const dynamicParams = true;

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
      `https://mupisystems.com.br/wp-json/wp/v2/posts?per_page=10&page=1&_fields=slug`,
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
    <BlogPostClient 
      post={post}
      translations={translations}
      readingTime={readingTime}
      formattedDate={formattedDate}
    />
  );
};

export default BlogPostPage;
