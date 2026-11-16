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

export const metadata: Metadata = {
  metadataBase: new URL(getCorporateSiteUrl()),
  title: 'Ops Foundry — Human-AI Operational Infrastructure',
  description:
    'Your business has work to do. We help you get it done. Ops Foundry combines managed teams, structured workflows, and AI-enabled tools to help businesses execute.',
  openGraph: {
    title: 'Ops Foundry — Human-AI Operational Infrastructure',
    description:
      'Your business has work to do. We help you get it done. Managed teams, structured workflows, and AI-enabled tools for business execution.',
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
      <body className="min-h-screen bg-foundry-canvas text-foundry-dark font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-foundry-dark focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-foundry-orange"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
