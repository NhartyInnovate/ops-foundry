/**
 * Ops Foundry Corporate — Environment-Aware Site & Cross-Property URL Configuration
 *
 * Uses NEXT_PUBLIC_CORPORATE_URL and NEXT_PUBLIC_ACADEMY_URL when configured,
 * defaulting to the verified production Vercel deployment URLs so production
 * builds never expose localhost URLs or broken fallback links.
 */

export const DEFAULT_CORPORATE_PRODUCTION_URL = 'https://ops-foundry-two.vercel.app';
export const DEFAULT_ACADEMY_PRODUCTION_URL = 'https://academy-neon-gamma.vercel.app';

function normalizeUrl(rawUrl: string | undefined, fallback: string): string {
  if (!rawUrl || !rawUrl.trim()) {
    return fallback;
  }
  return rawUrl.trim().replace(/\/$/, '');
}

export function getCorporateSiteUrl(): string {
  return normalizeUrl(
    process.env.NEXT_PUBLIC_CORPORATE_URL,
    DEFAULT_CORPORATE_PRODUCTION_URL
  );
}

export function getAcademySiteUrl(): string {
  return normalizeUrl(
    process.env.NEXT_PUBLIC_ACADEMY_URL,
    DEFAULT_ACADEMY_PRODUCTION_URL
  );
}
