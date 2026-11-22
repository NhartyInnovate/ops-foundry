import React from 'react';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight, Home, Compass, Layers, Mail } from 'lucide-react';
import { CorporateHeader } from '../components/corporate-header';
import { CorporateFooter } from '../components/corporate-footer';
import { AbstractBrandGeometry } from '../components/abstract-brand-geometry';

export const metadata = {
  title: 'Page Not Found — Ops Foundry',
  description: 'The requested page could not be found. Explore Ops Foundry operational services or return to the homepage.',
};

export default function NotFound() {
  const helpfulLinks = [
    {
      title: 'Our Services',
      description: 'Get Online, Get Visible, and Get Customers operational services.',
      href: '/services',
      icon: Layers,
    },
    {
      title: 'How We Work',
      description: 'Our human-plus-AI operational model and governance structure.',
      href: '/how-we-work',
      icon: Compass,
    },
    {
      title: 'Explore a Pilot',
      description: 'Start with a scoped, low-risk operational pilot.',
      href: '/pilot',
      icon: ArrowRight,
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with the Ops Foundry team directly.',
      href: '/contact',
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        <Section
          tone="canvas"
          spacing="none"
          className="relative pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-32 overflow-hidden"
        >
          {/* Decorative ambient background geometry */}
          <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
            <Container className="relative h-full">
              <AbstractBrandGeometry variant="subtle" />
            </Container>
          </div>

          <Container className="relative z-10 max-w-4xl text-center">
            <span className="inline-block font-display text-xs font-bold tracking-widest text-foundry-secondary uppercase mb-4">
              404 — Page Not Found
            </span>

            <Heading as="h1" size="display" className="text-foundry-dark mb-6">
              The page you're looking for doesn't exist or has moved.
            </Heading>

            <Text size="lg" className="max-w-2xl mx-auto text-gray-600 mb-10">
              We couldn't locate the operational resource you requested. Return to our homepage or use the links below to find what you need.
            </Text>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button asChild variant="primary" size="lg">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span>Return to Homepage</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  <span>Explore Services</span>
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            {/* Helpful quick recovery cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-8 border-t border-foundry-border">
              {helpfulLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block p-5 rounded-xl border border-foundry-border bg-white hover:border-foundry-secondary/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-foundry-muted text-foundry-secondary group-hover:bg-foundry-secondary group-hover:text-white transition-colors">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="font-display text-sm font-semibold text-foundry-dark group-hover:text-foundry-secondary transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
