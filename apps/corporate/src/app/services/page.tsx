import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../components/abstract-brand-geometry';
import { servicesOverviewContent } from '../../content/services';

export const metadata: Metadata = {
  title: 'Services — Ops Foundry | Get Online, Get Visible, Get Customers',
  description:
    'Explore Ops Foundry’s three operational service lines: Get Online (digital presence), Get Visible (content & communications), and Get Customers (prospecting & pipeline operations).',
  openGraph: {
    title: 'Services — Ops Foundry | Get Online, Get Visible, Get Customers',
    description:
      'Structured operational services across digital presence, communications visibility, and customer pipeline operations.',
    type: 'website',
  },
};

export default function ServicesOverviewPage() {
  const { hero, categories, serviceBlocks, finalCta } = servicesOverviewContent;

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
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
            <div className="mt-14 pt-10 border-t border-foundry-border grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="flex flex-col justify-between space-y-4 border-l-2 border-foundry-dark pl-5"
                >
                  <div className="space-y-2">
                    <h2 className="font-display text-xl font-bold text-foundry-dark">
                      {category.title}
                    </h2>
                    <p className="font-body text-sm text-foundry-secondary leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={category.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-foundry-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-dark"
                    >
                      <span>Explore {category.title}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Concise Service Presentation Blocks */}
        <Section tone="pure" spacing="lg">
          <Container>
            <div className="divide-y divide-foundry-border">
              {serviceBlocks.map((service) => (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="py-14 lg:py-16 first:pt-4 last:pb-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left: Text & Focus Areas */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2.5">
                        <Heading as="h2" size="xl">
                          {service.title}
                        </Heading>
                        <Text size="lg" className="text-gray-700 leading-relaxed">
                          {service.description}
                        </Text>
                      </div>

                      <div className="space-y-3 pt-1">
                        <p className="font-display text-xs font-bold uppercase tracking-wider text-foundry-secondary">
                          Representative Focus Areas
                        </p>
                        <ul className="space-y-2.5">
                          {service.focusAreas.map((area) => (
                            <li
                              key={area}
                              className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed"
                            >
                              <CheckCircle2
                                className="h-4 w-4 text-foundry-dark shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center gap-3.5 pt-2">
                        <Button asChild variant="primary" size="md">
                          <Link href={service.href}>
                            <span>Explore {service.title}</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="md">
                          <Link href={`/pilot?service=${service.slug}`}>
                            Explore a Pilot
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Right: Existing Relevant Image */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl overflow-hidden border border-foundry-border bg-foundry-canvas shadow-xs">
                        <div className="relative aspect-[4/3] w-full bg-gray-100">
                          <Image
                            src={service.image.src}
                            alt={service.image.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* Closing Pilot CTA */}
        <Section tone="pure" spacing="lg" border="top">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-foundry-muted text-foundry-dark border border-foundry-border p-8 sm:p-12 lg:p-16 text-center space-y-6">
              <AbstractBrandGeometry variant="cta" />
              <div className="relative z-10 space-y-6">
                <Heading as="h2" size="xl" tone="default" className="max-w-2xl mx-auto">
                  {finalCta.heading}
                </Heading>
                <Text size="base" tone="secondary" className="max-w-xl mx-auto text-gray-600">
                  {finalCta.body}
                </Text>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
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
