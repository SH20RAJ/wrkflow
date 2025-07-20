import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/handler/',
        '/dashboard/',
        '/profile/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}