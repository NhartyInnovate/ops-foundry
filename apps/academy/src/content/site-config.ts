/**
 * Ops Foundry Academy — Environment-Aware Site & Cross-Property URL Configuration
 *
 * Uses NEXT_PUBLIC_ACADEMY_URL and NEXT_PUBLIC_CORPORATE_URL when configured,
 * defaulting to the verified production Vercel deployment URLs so production
 * builds never expose localhost URLs or broken fallback links.
 */

export const DEFAULT_ACADEMY_PRODUCTION_URL = 'https://academy-neon-gamma.vercel.app';
export const DEFAULT_CORPORATE_PRODUCTION_URL = 'https://ops-foundry-two.vercel.app';

function normalizeUrl(rawUrl: string | undefined, fallback: string): string {
  if (!rawUrl || !rawUrl.trim()) {
    return fallback;
  }
  return rawUrl.trim().replace(/\/$/, '');
}

/**
 * Returns the configured Academy URL from NEXT_PUBLIC_ACADEMY_URL,
 * defaulting to the verified production Academy deployment URL.
 */
export function getConfiguredAcademyUrl(): string {
  return normalizeUrl(
    process.env.NEXT_PUBLIC_ACADEMY_URL,
    DEFAULT_ACADEMY_PRODUCTION_URL
  );
}

/**
 * Returns a URL instance for Next.js `metadataBase` using NEXT_PUBLIC_ACADEMY_URL
 * (or the verified production Academy deployment URL).
 */
export function getAcademyMetadataBase(): URL {
  return new URL(getConfiguredAcademyUrl());
}

/**
 * Returns the Academy origin for `/sitemap.xml` and `/robots.txt`.
 */
export function getAcademySitemapOrigin(): string {
  return getConfiguredAcademyUrl();
}

export interface CorporateWebsiteLinkConfig {
  label: string;
  href: string;
  isExternal: boolean;
}

/**
 * Resolves the Corporate Website navigation destination from NEXT_PUBLIC_CORPORATE_URL,
 * defaulting to https://ops-foundry-two.vercel.app.
 */
export function getCorporateWebsiteLink(): CorporateWebsiteLinkConfig {
  return {
    label: 'Corporate Website',
    href: normalizeUrl(
      process.env.NEXT_PUBLIC_CORPORATE_URL,
      DEFAULT_CORPORATE_PRODUCTION_URL
    ),
    isExternal: true,
  };
}
