import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import {
  servicesOverviewContent,
  serviceDetailsBySlug,
  allServiceSlugs,
} from '../../content/services';

export const metadata: Metadata = {
  title: 'Services — Ops Foundry | Get Online, Get Visible, Get Customers',
  description:
    'Explore Ops Foundry’s three operational service lines: Get Online (digital presence), Get Visible (content & communications), and Get Customers (prospecting & pipeline operations).',
  openGraph: {
    title: 'Services — Ops Foundry | Get Online, Get Visible, Get Customers',
    description:
      'Structured operational services combining managed teams, documented workflows, and AI-enabled tools across digital presence, visibility, and customer pipeline operations.',
    type: 'website',
  },
};

export default function ServicesOverviewPage() {
  const orderedServices = allServiceSlugs.map((slug) => serviceDetailsBySlug[slug]);

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Section
          tone="canvas"
          spacing="none"
          className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-foundry-border"
        >
          <Container>
            <div className="max-w-3xl space-y-6">
              <Heading as="h1" size="display">
                {servicesOverviewContent.hero.title}
              </Heading>
              <p className="font-display text-lg sm:text-xl font-semibold text-foundry-dark leading-snug">
                {servicesOverviewContent.hero.lead}
              </p>
              <Text size="lg" className="text-gray-600">
                {servicesOverviewContent.hero.supporting}
              </Text>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg">
                  <Link href={servicesOverviewContent.hero.primaryCta.href}>
                    <span>{servicesOverviewContent.hero.primaryCta.label}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={servicesOverviewContent.hero.secondaryCta.href}>
                    {servicesOverviewContent.hero.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Service Line Index */}
            <div className="mt-14 pt-10 border-t border-foundry-border grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicesOverviewContent.comparisonRows.map((row) => (
                <div
                  key={row.slug}
                  className="flex flex-col justify-between space-y-4 border-l-2 border-foundry-orange pl-5"
                >
                  <div className="space-y-1.5">
                    <h2 className="font-display text-xl font-bold text-foundry-dark">
                      {row.title}
                    </h2>
                    <p className="font-display text-xs font-semibold text-gray-700">
                      {row.focus}
                    </p>
                    <p className="font-body text-sm text-foundry-secondary leading-relaxed">
                      {row.whenToChoose}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={row.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-foundry-orange hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange"
                    >
                      <span>Explore {row.title}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Editorial Service Line Spreads */}
        <Section tone="pure" spacing="lg">
          <Container>
            <div className="max-w-3xl space-y-4 pb-12 border-b border-foundry-border">
              <Heading as="h2" size="xl">
                {servicesOverviewContent.howServicesWorkTogether.heading}
              </Heading>
              <Text size="base" className="text-gray-600">
                {servicesOverviewContent.howServicesWorkTogether.intro}
              </Text>
              <p className="font-body text-xs text-foundry-secondary">
                {servicesOverviewContent.howServicesWorkTogether.governanceNote}
              </p>
            </div>

            <div className="divide-y divide-foundry-border">
              {orderedServices.map((service) => (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="py-16 lg:py-20 first:pt-14 last:pb-4 space-y-10"
                >
                  {/* Top Editorial Row: Title, Problem, Accomplishment & Photo */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <Heading as="h3" size="xl">
                          {service.title}
                        </Heading>
                        <p className="font-display text-lg sm:text-xl font-semibold text-foundry-orange">
                          {service.lead}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-display text-base font-bold text-foundry-dark">
                          The Business Problem
                        </h4>
                        <Text size="base" className="text-gray-600">
                          {service.problemContext[0]}
                        </Text>
                      </div>

                      <div className="rounded-2xl bg-foundry-canvas border-l-4 border-foundry-orange p-5 space-y-1.5">
                        <h4 className="font-display text-sm font-bold text-foundry-dark">
                          What Ops Foundry Helps You Accomplish
                        </h4>
                        <p className="font-body text-sm text-gray-700 leading-relaxed">
                          {service.whatWeHelpAccomplish}
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <figure className="rounded-2xl overflow-hidden border border-foundry-border bg-foundry-canvas shadow-sm">
                        <div className="relative aspect-[4/3] w-full bg-gray-100">
                          <Image
                            src={service.heroImage.src}
                            alt={service.heroImage.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="p-4 text-xs text-foundry-secondary border-t border-foundry-border">
                          {service.heroImage.caption}
                        </figcaption>
                      </figure>
                    </div>
                  </div>

                  {/* Bottom Ledger: Relevant Activities & Engagement Models */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-gray-100">
                    <div className="lg:col-span-7 space-y-4">
                      <h4 className="font-display text-sm font-bold text-foundry-dark">
                        Examples of Relevant Activities (Scoped per Engagement)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.typicalActivities.slice(0, 2).map((group) => (
                          <div
                            key={group.category}
                            className="rounded-xl border border-foundry-border bg-foundry-canvas p-5 space-y-2.5"
                          >
                            <p className="font-display text-sm font-bold text-foundry-dark">
                              {group.category}
                            </p>
                            <ul className="space-y-2">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed"
                                >
                                  <CheckCircle2
                                    className="h-3.5 w-3.5 text-foundry-orange shrink-0 mt-0.5"
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-foundry-dark text-white p-6 sm:p-7 space-y-6">
                      <div className="space-y-3">
                        <h4 className="font-display text-base font-bold text-white">
                          What a Potential Engagement Could Look Like
                        </h4>
                        <p className="font-body text-xs text-gray-300 leading-relaxed">
                          <span className="font-semibold text-white">
                            {service.scopingModels[0].title}:{' '}
                          </span>
                          {service.scopingModels[0].summary}
                        </p>
                        <p className="font-body text-xs text-gray-400 leading-relaxed">
                          {service.scopingModels[0].suitableWhen}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
                        <Button asChild variant="primary" size="sm">
                          <Link href={`/services/${service.slug}`}>
                            <span>Full {service.title} Specification</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </Button>
                        <Button asChild variant="inverseOutline" size="sm">
                          <Link href={service.ctaHref}>
                            Explore a Pilot
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* Bottom Pilot CTA */}
        <Section tone="canvas" spacing="lg" border="top">
          <Container>
            <div className="rounded-3xl bg-foundry-dark text-white p-8 sm:p-12 lg:p-16 text-center space-y-6">
              <Heading as="h2" size="xl" tone="inverse" className="max-w-2xl mx-auto">
                {servicesOverviewContent.finalCta.heading}
              </Heading>
              <Text size="base" tone="inverseMuted" className="max-w-xl mx-auto">
                {servicesOverviewContent.finalCta.body}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg">
                  <Link href={servicesOverviewContent.finalCta.primaryHref}>
                    <span>{servicesOverviewContent.finalCta.primaryLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg">
                  <Link href={servicesOverviewContent.finalCta.secondaryHref}>
                    {servicesOverviewContent.finalCta.secondaryLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
