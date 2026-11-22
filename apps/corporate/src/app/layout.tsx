import type { Metadata } from 'next';
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import { getCorporateSiteUrl } from '../content/site-config';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const siteUrl = getCorporateSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ops Foundry — Human-AI Operational Infrastructure',
    template: '%s',
  },
  description:
    'Your business has work to do. We help you get it done. Ops Foundry combines managed teams, structured workflows, and AI-enabled tools to help businesses execute.',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Ops Foundry — Human-AI Operational Infrastructure',
    description:
      'Your business has work to do. We help you get it done. Managed teams, structured workflows, and AI-enabled tools for business execution.',
    url: './',
    siteName: 'Ops Foundry',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ops Foundry — Human-AI Operational Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ops Foundry — Human-AI Operational Infrastructure',
    description:
      'Your business has work to do. We help you get it done. Managed teams, structured workflows, and AI-enabled tools for business execution.',
    images: ['/images/brand/og-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: [
      {
        url: '/images/brand/ops-foundry-symbol.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/images/brand/ops-foundry-symbol.svg',
    apple: '/images/brand/ops-foundry-symbol.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Ops Foundry',
    url: siteUrl,
    logo: `${siteUrl}/images/brand/ops-foundry-logo-dark.svg`,
    image: `${siteUrl}/images/brand/og-image.png`,
    description:
      'Ops Foundry provides human-AI operational infrastructure combining managed teams, structured workflows, and AI-enabled tools.',
    knowsAbout: [
      'Website & Digital Presence Operations',
      'Content & Communications Operations',
      'Prospecting & Pipeline Operations',
      'Human-AI Operational Systems',
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Ops Foundry',
    url: siteUrl,
    description: 'Human-AI Operational Infrastructure for Business Execution',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-US',
  };

  return (
    <html lang="en" className={`${manrope.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-foundry-canvas text-foundry-dark font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-foundry-dark focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-foundry-dark"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
