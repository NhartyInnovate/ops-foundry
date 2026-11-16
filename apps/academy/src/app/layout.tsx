import type { Metadata } from 'next';
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import { getAcademyMetadataBase } from '../content/site-config';
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

export const metadata: Metadata = {
  metadataBase: getAcademyMetadataBase(),
  title: 'Ops Foundry Academy — Build Practical Skills for Real Work',
  description:
    'Ops Foundry Academy helps people develop relevant, practical skills through structured learning, hands-on application, and a focus on the demands of modern work.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ops Foundry Academy — Build Practical Skills for Real Work',
    description:
      'Build practical skills. Become ready for real work. Structured learning, hands-on application, and practical professional development.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-foundry-canvas text-foundry-slate font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-foundry-slate focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-foundry-orange"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
