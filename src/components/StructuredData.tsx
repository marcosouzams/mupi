import Script from 'next/script'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'BreadcrumbList'
  data: Record<string, unknown>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Organization Schema for homepage
export function OrganizationSchema() {
  const organizationData = {
    name: 'MUPI Systems',
    legalName: 'MUPI Systems',
    url: 'https://mupisystems.com.br',
    logo: 'https://mupisystems.com.br/logo_mupi.png',
    foundingDate: '2016',
    description: 'Transformamos ideias em soluções digitais inovadoras. Plataformas SaaS como eAgenda, Minha Sala Virtual, Meu Atendimento, eQualifica e mais.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contato@mupisystems.com.br',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
    },
    sameAs: [
      // Add social media links here
      'https://www.linkedin.com/company/mupisystems',
      // Add more social profiles
    ],
  }

  return <StructuredData type="Organization" data={organizationData} />
}

// Website Schema
export function WebSiteSchema() {
  const websiteData = {
    url: 'https://mupisystems.com.br',
    name: 'MUPI Systems',
    description: 'Soluções Digitais Inovadoras e Plataformas SaaS',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://mupisystems.com.br/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['pt-BR', 'en-US', 'es-ES'],
  }

  return <StructuredData type="WebSite" data={websiteData} />
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbData = {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <StructuredData type="BreadcrumbList" data={breadcrumbData} />
}
