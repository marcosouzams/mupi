import { WordPressPost, WordPressCategory, BlogPost } from '@/types/wordpress';

const WORDPRESS_API_URL = 'https://mupisystems.com.br/wp-json/wp/v2';

// Helper function to strip HTML tags and decode HTML entities
const stripHtml = (html: string): string => {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Decode common HTML entities (named)
  text = text
    .replace(/&hellip;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"');
  
  // Decode numeric HTML entities
  text = text
    .replace(/&#8211;/g, '–')  // en dash
    .replace(/&#8212;/g, '—')  // em dash
    .replace(/&#8216;/g, "'")  // left single quote
    .replace(/&#8217;/g, "'")  // right single quote
    .replace(/&#8220;/g, '"')  // left double quote
    .replace(/&#8221;/g, '"')  // right double quote
    .replace(/&#8230;/g, '...'); // horizontal ellipsis
  
  // Remove brackets around ellipsis if present
  text = text.replace(/\[\.\.\.\]/g, '...');
  
  return text.trim();
};

// Transform WordPress post to BlogPost (with content)
const transformPost = (wpPost: WordPressPost): BlogPost => {
  const post: BlogPost = {
    id: wpPost.id,
    slug: wpPost.slug,
    title: stripHtml(wpPost.title.rendered),
    excerpt: stripHtml(wpPost.excerpt.rendered).substring(0, 200),
    content: wpPost.content.rendered,
    date: wpPost.date,
    author: {
      name: wpPost._embedded?.author?.[0]?.name || 'Mupi Systems',
      avatar: wpPost._embedded?.author?.[0]?.avatar_urls?.['96'] || '',
    },
    categories: wpPost._embedded?.['wp:term']?.[0]?.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })) || [],
    tags: wpPost._embedded?.['wp:term']?.[1]?.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })) || [],
    isFeatured: wpPost.sticky,
  };

  // Add featured image if available
  if (wpPost._embedded?.['wp:featuredmedia']?.[0]) {
    const media = wpPost._embedded['wp:featuredmedia'][0];
    if (media.source_url && media.source_url.trim() !== '') {
      post.featuredImage = {
        url: media.source_url,
        alt: media.alt_text || post.title,
      };
    }
  }

  return post;
};

// Transform WordPress post to BlogPost (WITHOUT content - for listing pages)
const transformPostWithoutContent = (wpPost: WordPressPost): BlogPost => {
  const post: BlogPost = {
    id: wpPost.id,
    slug: wpPost.slug,
    title: stripHtml(wpPost.title.rendered),
    excerpt: stripHtml(wpPost.excerpt.rendered).substring(0, 200),
    content: '', // Empty content for listing
    date: wpPost.date,
    author: {
      name: wpPost._embedded?.author?.[0]?.name || 'Mupi Systems',
      avatar: wpPost._embedded?.author?.[0]?.avatar_urls?.['96'] || '',
    },
    categories: wpPost._embedded?.['wp:term']?.[0]?.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })) || [],
    tags: wpPost._embedded?.['wp:term']?.[1]?.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })) || [],
    isFeatured: wpPost.sticky,
  };

  // Add featured image if available
  if (wpPost._embedded?.['wp:featuredmedia']?.[0]) {
    const media = wpPost._embedded['wp:featuredmedia'][0];
    if (media.source_url && media.source_url.trim() !== '') {
      post.featuredImage = {
        url: media.source_url,
        alt: media.alt_text || post.title,
      };
    }
  }

  return post;
};

// Fetch posts for LISTING (without full content) - Optimized for ISR
export const fetchPostsForListing = async (page: number = 1, perPage: number = 10): Promise<{ posts: BlogPost[]; totalPages: number }> => {
  try {
    // Remove 'content' field to reduce payload dramatically
    const fields = 'id,slug,title,excerpt,date,sticky,_links,_embedded';
    
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?page=${page}&per_page=${perPage}&_embed=1&_fields=${fields}&orderby=date&order=desc`,
      { 
        cache: 'force-cache' // ISR: Only revalidate via webhook
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    const wpPosts: WordPressPost[] = await response.json();
    const posts = wpPosts.map(transformPostWithoutContent);

    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 1 };
  }
};

// Fetch all posts for LISTING (optimized - without content)
export const fetchAllPostsForListing = async (): Promise<BlogPost[]> => {
  try {
    // Primeiro, busca a primeira página para saber quantas páginas existem
    const firstPageResult = await fetchPostsForListing(1, 100);
    const { posts: firstPagePosts, totalPages } = firstPageResult;
    
    // Se só tem uma página, retorna direto
    if (totalPages === 1) {
      return firstPagePosts;
    }
    
    // Se tem mais páginas, busca todas em paralelo
    const pagePromises: Promise<{ posts: BlogPost[]; totalPages: number }>[] = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(fetchPostsForListing(page, 100));
    }
    
    const results = await Promise.all(pagePromises);
    const allPosts = [
      ...firstPagePosts,
      ...results.flatMap(result => result.posts)
    ];
    
    return allPosts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
};

// Fetch all posts with pagination (WITH full content - only for individual pages)
export const fetchPosts = async (page: number = 1, perPage: number = 10): Promise<{ posts: BlogPost[]; totalPages: number }> => {
  try {
    // Campos específicos para reduzir payload
    const fields = 'id,slug,title,excerpt,content,date,sticky,_links,_embedded';
    
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?page=${page}&per_page=${perPage}&_embed=1&_fields=${fields}&orderby=date&order=desc`,
      { 
        cache: 'force-cache' // ISR: Only revalidate via webhook
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    const wpPosts: WordPressPost[] = await response.json();
    const posts = wpPosts.map(transformPost);

    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 1 };
  }
};

// Fetch ALL posts (busca todas as páginas em paralelo)
export const fetchAllPosts = async (): Promise<BlogPost[]> => {
  try {
    // Primeiro, busca a primeira página para saber quantas páginas existem
    const firstPageResult = await fetchPosts(1, 100);
    const { posts: firstPagePosts, totalPages } = firstPageResult;
    
    // Se só tem uma página, retorna direto
    if (totalPages === 1) {
      return firstPagePosts;
    }
    
    // Se tem mais páginas, busca todas em paralelo
    const pagePromises: Promise<{ posts: BlogPost[]; totalPages: number }>[] = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(fetchPosts(page, 100));
    }
    
    const results = await Promise.all(pagePromises);
    const allPosts = [
      ...firstPagePosts,
      ...results.flatMap(result => result.posts)
    ];
    
    return allPosts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
};

// Fetch featured posts (optimized - without full content for listing)
export const fetchFeaturedPosts = async (): Promise<BlogPost[]> => {
  try {
    // Remove 'content' field to reduce payload
    const fields = 'id,slug,title,excerpt,date,sticky,_links,_embedded';
    
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?sticky=true&_embed=1&_fields=${fields}&per_page=5`,
      { 
        cache: 'force-cache' // ISR: Only revalidate via webhook
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch featured posts');
    }

    const wpPosts: WordPressPost[] = await response.json();
    return wpPosts.map(transformPostWithoutContent);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

// Fetch posts by category
export const fetchPostsByCategory = async (categoryId: number, page: number = 1, perPage: number = 10): Promise<{ posts: BlogPost[]; totalPages: number }> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed=1&orderby=date&order=desc`,
      { 
        cache: 'force-cache' // ISR: Only revalidate via webhook
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts by category');
    }

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    const wpPosts: WordPressPost[] = await response.json();
    const posts = wpPosts.map(transformPost);

    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return { posts: [], totalPages: 1 };
  }
};

// Fetch all categories
export const fetchCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?per_page=100&orderby=count&order=desc`,
      { 
        cache: 'force-cache' // ISR: Only revalidate via webhook
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories: WordPressCategory[] = await response.json();
    // Filter out "Uncategorized" and categories with 0 posts
    return categories.filter(cat => cat.count > 0 && cat.slug !== 'uncategorized');
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch single post by slug
export const fetchPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=1`,
      { 
        cache: 'force-cache' // ISR: Only revalidate via webhook
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const wpPosts: WordPressPost[] = await response.json();
    
    if (wpPosts.length === 0) {
      return null;
    }

    return transformPost(wpPosts[0]);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};

// Search posts
export const searchPosts = async (query: string, page: number = 1, perPage: number = 10): Promise<{ posts: BlogPost[]; totalPages: number }> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?search=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&_embed=1`,
      { 
        cache: 'no-store' // Search results should not be cached
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search posts');
    }

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    const wpPosts: WordPressPost[] = await response.json();
    const posts = wpPosts.map(transformPost);

    return { posts, totalPages };
  } catch (error) {
    console.error('Error searching posts:', error);
    return { posts: [], totalPages: 1 };
  }
};
