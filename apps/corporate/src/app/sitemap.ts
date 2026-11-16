import type { MetadataRoute } from 'next';
import { getCorporateSiteUrl } from '../content/site-config';

const BASE_URL = getCorporateSiteUrl();

const CORPORATE_ROUTES = [
  { path: '', priority: 1.0 },
  { path: '/services', priority: 0.9 },
  { path: '/services/get-online', priority: 0.85 },
  { path: '/services/get-visible', priority: 0.85 },
  { path: '/services/get-customers', priority: 0.85 },
  { path: '/how-we-work', priority: 0.85 },
  { path: '/about', priority: 0.8 },
  { path: '/partners', priority: 0.8 },
  { path: '/pilot', priority: 0.9 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-04-06T00:00:00.000Z');

  return CORPORATE_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route.priority,
  }));
}
