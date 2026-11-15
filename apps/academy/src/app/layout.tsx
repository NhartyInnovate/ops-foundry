import type { Metadata } from 'next';
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google';
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
  title: 'Ops Foundry Academy — Structured Technical & Operations Training',
  description: 'Ops Foundry Academy equips operational teams and ambitious professionals with structured workflows, AI tooling mastery, and modern operational skills.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-foundry-canvas text-foundry-slate antialiased">
        {children}
      </body>
    </html>
  );
}
