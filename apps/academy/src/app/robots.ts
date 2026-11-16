import type { MetadataRoute } from 'next';
import { getAcademySitemapOrigin } from '../content/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getAcademySitemapOrigin();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
