import { MetadataRoute } from 'next'

async function getBlogPosts() {
  try {
    const response = await fetch(
      'https://mupisystems.com.br/wp-json/wp/v2/posts?per_page=100&_fields=slug,modified',
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )
    
    if (!response.ok) {
      console.error('Failed to fetch blog posts for sitemap')
      return []
    }
    
    const posts = await response.json()
    return posts
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mupisystems.com.br'
  
  // Define all your static pages with proper priorities
  const routes = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/cases', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  // Generate sitemap entries for static pages
  // Note: Language is handled via cookies/context, not URL paths
  const staticPages: MetadataRoute.Sitemap = routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Add dynamic blog posts from WordPress
  const blogPosts = await getBlogPosts()
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post: { slug: string; modified: string }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Add case study pages
  const caseStudies = [
    'bienal-livro-rio-2025',
    '1rimc-registro-imoveis-montes-claros',
  ]

  const casePages: MetadataRoute.Sitemap = caseStudies.map(caseSlug => ({
    url: `${baseUrl}/cases/${caseSlug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [...staticPages, ...blogPages, ...casePages]
}
