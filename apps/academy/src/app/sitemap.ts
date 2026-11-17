import type { MetadataRoute } from 'next';
import { getAcademySitemapOrigin } from '../content/site-config';
import { plannedAcademyProgrammes } from '../content/programmes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getAcademySitemapOrigin();
  const lastModified = new Date('2026-04-06T00:00:00.000Z');

  const staticRoutes = [
    { path: '', priority: 1.0 },
    { path: '/apply', priority: 0.95 },
    { path: '/programmes', priority: 0.9 },
    { path: '/how-we-learn', priority: 0.85 },
    { path: '/admissions', priority: 0.9 },
    { path: '/about', priority: 0.8 },
  ];

  const programmeRoutes = plannedAcademyProgrammes.map((programme) => ({
    path: `/programmes/${programme.slug}`,
    priority: 0.8,
  }));

  return [...staticRoutes, ...programmeRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route.priority,
  }));
}
