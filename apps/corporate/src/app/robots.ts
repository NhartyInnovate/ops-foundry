import type { MetadataRoute } from 'next';
import { getCorporateSiteUrl } from '../content/site-config';

const BASE_URL = getCorporateSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
