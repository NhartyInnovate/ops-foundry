import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import {
  ArrowRight,
  MessagesSquare,
  ClipboardList,
  Workflow,
  ChartNoAxesCombined,
} from 'lucide-react';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../components/abstract-brand-geometry';
import { AnimatedServiceCategories } from '../../components/animated-service-categories';
import { servicesOverviewContent } from '../../content/services';
import { getCorporateSiteUrl } from '../../content/site-config';

export const metadata: Metadata = {
  title: 'Operational Services — Ops Foundry | Get Online, Get Visible, Get Customers',
  description:
    'Explore Ops Foundry’s three operational service lines: Get Online (digital presence), Get Visible (content operations), and Get Customers (pipeline coordination).',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Operational Services — Ops Foundry | Get Online, Get Visible, Get Customers',
    description:
      'Structured operational services across digital presence, communications visibility, and customer pipeline operations.',
    url: '/services',
    type: 'website',
  },
};

const stageIcons = {
  discover: MessagesSquare,
  scope: ClipboardList,
  deliver: Workflow,
  review: ChartNoAxesCombined,
} as const;

export default function ServicesOverviewPage() {
  const { hero, categories, finalCta } = servicesOverviewContent;
  const siteUrl = getCorporateSiteUrl();

  const servicesListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ops Foundry Operational Services',
    description: 'Core operational service lines provided by Ops Foundry',
    itemListElement: categories.map((cat, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: cat.title,
      description: cat.description,
      url: `${siteUrl}${cat.href}`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListSchema) }}
      />
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* Services Hero Section */}
        <Section
          tone="canvas"
          spacing="none"
          className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-foundry-border overflow-hidden"
        >
          <Container className="relative z-10">
            <div className="max-w-3xl space-y-6">
              <Heading as="h1" size="display">
                {hero.title}
              </Heading>
              <Text size="lg" className="text-gray-700 font-medium leading-relaxed">
                {hero.lead}
              </Text>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg">
                  <Link href={hero.primaryCta.href}>
                    <span>{hero.primaryCta.label}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={hero.secondaryCta.href}>
                    {hero.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Three Service Categories Index */}
            <AnimatedServiceCategories categories={categories} />
          </Container>
        </Section>

        {/* Closing Pilot CTA */}
        <Section tone="pure" spacing="lg" border="top">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-foundry-muted text-foundry-dark border border-foundry-border p-8 sm:p-12 lg:p-16 text-center space-y-8 sm:space-y-10">
              <AbstractBrandGeometry variant="cta" />
              <div className="relative z-10 space-y-8 sm:space-y-10">
                {/* Heading & Intro Paragraph */}
                <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                  <Heading as="h2" size="xl" tone="default">
                    {finalCta.heading}
                  </Heading>
                  <Text size="base" tone="secondary" className="max-w-xl mx-auto text-gray-600">
                    {finalCta.body}
                  </Text>
                </div>

                {/* Engagement Process */}
                <div className="space-y-5 max-w-5xl mx-auto">
                  <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-foundry-secondary">
                    {finalCta.processHeading}
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                    {finalCta.stages.map((stage) => {
                      const Icon = stageIcons[stage.slug as keyof typeof stageIcons];
                      return (
                        <div
                          key={stage.slug}
                          className="h-full rounded-2xl bg-white border border-foundry-border p-4 sm:p-5 flex flex-col items-center text-center shadow-2xs transition-shadow hover:shadow-xs"
                        >
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-foundry-muted border border-foundry-border flex items-center justify-center text-foundry-dark mb-3 shrink-0">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foundry-dark" strokeWidth={1.75} aria-hidden="true" />
                          </div>
                          <h4 className="font-display font-bold text-base sm:text-lg text-foundry-dark mb-1.5">
                            {stage.title}
                          </h4>
                          <p className="font-body text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-1">
                  <Button asChild variant="primary" size="lg">
                    <Link href={finalCta.primaryHref}>
                      <span>{finalCta.primaryLabel}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href={finalCta.secondaryHref}>
                      {finalCta.secondaryLabel}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
