/**
 * Ops Foundry Academy — Environment-Aware Site & Cross-Property URL Configuration
 *
 * Governance Rules:
 * 1. Never invent an unapproved production domain.
 * 2. Use the production Corporate URL only when configured via NEXT_PUBLIC_CORPORATE_URL;
 *    never leave hardcoded localhost URLs in production navigation or production metadata.
 * 3. Provide sensible local development fallbacks when NODE_ENV === 'development'.
 */

function normalizeUrl(rawUrl: string | undefined): string | null {
  if (!rawUrl || !rawUrl.trim()) {
    return null;
  }
  return rawUrl.trim().replace(/\/$/, '');
}

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Returns the configured Academy URL if provided via environment variables,
 * or the development fallback only during local development.
 * Returns null in unconfigured production builds so localhost is never baked
 * into production HTML metadata.
 */
export function getConfiguredAcademyUrl(): string | null {
  const explicitUrl = normalizeUrl(process.env.NEXT_PUBLIC_ACADEMY_URL);
  if (explicitUrl) {
    return explicitUrl;
  }

  const vercelProdUrl = normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProdUrl) {
    return vercelProdUrl.startsWith('http')
      ? vercelProdUrl
      : `https://${vercelProdUrl}`;
  }

  const vercelUrl = normalizeUrl(process.env.VERCEL_URL);
  if (vercelUrl) {
    return vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;
  }

  if (isDevelopment) {
    return 'http://localhost:3001';
  }

  return null;
}

/**
 * Returns a URL instance for Next.js `metadataBase` when configured (or in dev),
 * or undefined in unconfigured production builds so relative canonical paths
 * never emit `http://localhost:3001` in production metadata.
 */
export function getAcademyMetadataBase(): URL | undefined {
  const url = getConfiguredAcademyUrl();
  if (!url) {
    return undefined;
  }
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}

/**
 * Sitemap and robots.txt require a valid origin string for XML `<loc>` entries.
 * Uses the configured Academy URL (or Vercel deployment URL), falling back to
 * the local development origin only when building locally without env vars.
 */
export function getAcademySitemapOrigin(): string {
  return getConfiguredAcademyUrl() ?? 'http://localhost:3001';
}

export interface CorporateWebsiteLinkConfig {
  label: string;
  href: string;
  isExternal: boolean;
}

/**
 * Resolves the Corporate Website navigation destination:
 * - Uses NEXT_PUBLIC_CORPORATE_URL when configured.
 * - Uses http://localhost:3000 only in local development (NODE_ENV === 'development').
 * - In unconfigured production builds, points to `/about#ops-foundry-ecosystem`
 *   so zero `localhost` URLs appear in production navigation while providing a
 *   meaningful explanation of the Corporate & Academy ecosystem.
 */
export function getCorporateWebsiteLink(): CorporateWebsiteLinkConfig {
  const configuredCorporateUrl = normalizeUrl(process.env.NEXT_PUBLIC_CORPORATE_URL);

  if (configuredCorporateUrl) {
    return {
      label: 'Corporate Website',
      href: configuredCorporateUrl,
      isExternal: true,
    };
  }

  if (isDevelopment) {
    return {
      label: 'Corporate Website',
      href: 'http://localhost:3000',
      isExternal: true,
    };
  }

  return {
    label: 'Corporate Website',
    href: '/about#ops-foundry-ecosystem',
    isExternal: false,
  };
}
