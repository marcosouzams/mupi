import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mupisystems.com.br'
  
  // Define all your static pages
  const routes = [
    '',
    '/about',
    '/cases',
    '/blog',
    '/contact',
  ]

  // Generate sitemap entries for each route in all languages
  const languages = ['pt', 'en', 'es']
  const staticPages: MetadataRoute.Sitemap = []

  routes.forEach(route => {
    languages.forEach(lang => {
      const url = lang === 'pt' ? `${baseUrl}${route}` : `${baseUrl}/${lang}${route}`
      staticPages.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/blog' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            'pt-BR': `${baseUrl}${route}`,
            'en': `${baseUrl}/en${route}`,
            'es': `${baseUrl}/es${route}`,
          }
        }
      })
    })
  })

  // TODO: Add dynamic blog posts from WordPress
  // You can fetch blog posts and add them here dynamically
  
  return staticPages
}
