import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { CorporateHeader } from '../../../components/corporate-header';
import { CorporateFooter } from '../../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../../components/abstract-brand-geometry';
import {
  serviceDetailsBySlug,
  allServiceSlugs,
  type ServiceSlug,
} from '../../../content/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetailsBySlug[slug as ServiceSlug];

  if (!service) {
    return {
      title: 'Service Not Found — Ops Foundry',
    };
  }

  return {
    title: `${service.title} — Ops Foundry Services`,
    description: `${service.lead} ${service.heroSummary}`,
    openGraph: {
      title: `${service.title} — Ops Foundry Services`,
      description: `${service.lead} ${service.heroSummary}`,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetailsBySlug[slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* Service Switcher Bar */}
        <div className="border-b border-foundry-border bg-white">
          <Container className="py-3.5 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-foundry-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-dark"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>All Services</span>
            </Link>

            <nav aria-label="Service line switcher" className="flex flex-wrap items-center gap-2">
              {allServiceSlugs.map((itemSlug) => {
                const item = serviceDetailsBySlug[itemSlug];
                const isActive = itemSlug === service.slug;
                return (
                  <Link
                    key={itemSlug}
                    href={`/services/${itemSlug}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`inline-flex min-h-[36px] items-center rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-dark ${
                      isActive
                        ? 'bg-foundry-dark text-white shadow-sm'
                        : 'border border-gray-300 bg-white text-gray-700 hover:border-foundry-dark hover:text-foundry-dark'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>

        {/* Section 1 — Service Hero */}
        <Section
          tone="canvas"
          spacing="none"
          className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-foundry-border overflow-hidden"
        >
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Heading as="h1" size="display">
                  {service.title}
                </Heading>
                <p className="font-display text-xl sm:text-2xl font-bold text-foundry-dark leading-snug">
                  {service.lead}
                </p>
                <Text size="lg" className="text-gray-600 max-w-2xl leading-relaxed">
                  {service.heroSummary}
                </Text>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Button asChild variant="primary" size="lg">
                    <Link href={service.ctaHref}>
                      <span>{service.ctaButtonLabel}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/how-we-work">
                      See How We Work
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="rounded-3xl overflow-hidden border border-foundry-border bg-white shadow-lg">
                  <div className="relative aspect-[4/3] w-full bg-gray-100">
                    <Image
                      src={service.heroImage.src}
                      alt={service.heroImage.alt}
                      fill
                      priority
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
          </Container>
        </Section>

        {/* Section 2 — The Business Problem & How Ops Foundry Helps */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left: The Business Problem */}
              <div className="lg:col-span-6 space-y-4">
                <Heading as="h2" size="xl">
                  {service.problemHeading}
                </Heading>
                <Text size="base" className="text-gray-700 leading-relaxed">
                  {service.problemSummary}
                </Text>
              </div>

              {/* Right: How Ops Foundry Helps */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-foundry-muted border-l-4 border-foundry-dark p-6 sm:p-7 space-y-3">
                  <Heading as="h3" size="sm" className="text-foundry-dark">
                    {service.howWeHelpHeading}
                  </Heading>
                  <p className="font-body text-sm sm:text-base text-gray-700 leading-relaxed">
                    {service.howWeHelp}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 3 — Representative Activities & Deliverables */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-4 mb-10">
              <Heading as="h2" size="xl">
                {service.activitiesHeading}
              </Heading>
              <p className="rounded-xl border border-foundry-border bg-white px-4 py-3 text-xs text-gray-700 leading-relaxed">
                {service.activitiesDisclaimer}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {service.typicalActivities.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-foundry-border bg-white p-7 space-y-4 shadow-xs"
                >
                  <h3 className="font-display text-base font-bold text-foundry-dark">
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed"
                      >
                        <CheckCircle2
                          className="h-4 w-4 text-foundry-dark shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 4 — Potential Engagement & Client Dependencies */}
        <Section tone="pure" spacing="lg">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Potential Engagement Model */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <Heading as="h2" size="lg">
                    What a Potential Engagement Could Look Like
                  </Heading>
                  <Text size="sm" tone="secondary">
                    Every engagement is scoped around a defined business problem. Below is an indicative example:
                  </Text>
                </div>

                <div className="rounded-2xl border border-foundry-border bg-foundry-muted p-6 sm:p-7 space-y-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foundry-dark font-display text-xs font-bold text-white">
                      01
                    </span>
                    <h3 className="font-display text-base font-bold text-foundry-dark">
                      {service.potentialEngagement.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-gray-700 leading-relaxed">
                    {service.potentialEngagement.summary}
                  </p>
                  <p className="font-body text-xs text-foundry-secondary">
                    {service.potentialEngagement.suitableWhen}
                  </p>
                  <p className="font-body text-xs text-foundry-secondary italic border-t border-foundry-border pt-3">
                    {service.potentialEngagement.disclaimer}
                  </p>
                </div>
              </div>

              {/* Right Column: Client Responsibilities & Dependencies */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-foundry-muted text-foundry-dark border border-foundry-border p-7 sm:p-8 space-y-5 shadow-xs">
                  <div className="space-y-2">
                    <Heading as="h2" size="sm" tone="default">
                      {service.dependenciesHeading}
                    </Heading>
                    <p className="font-body text-xs text-foundry-secondary leading-relaxed">
                      {service.dependenciesIntro}
                    </p>
                  </div>

                  <ul className="space-y-3 border-t border-gray-200 pt-4">
                    {service.clientDependencies.map((dep) => (
                      <li
                        key={dep}
                        className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foundry-dark shrink-0"
                          aria-hidden="true"
                        />
                        <span>{dep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 5 — Clear Closing CTA */}
        <Section tone="pure" spacing="lg" border="top">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-foundry-muted text-foundry-dark border border-foundry-border p-8 sm:p-12 lg:p-16 text-center space-y-6">
              <AbstractBrandGeometry variant="cta" />
              <div className="relative z-10 space-y-6">
                <Heading as="h2" size="xl" tone="default" className="max-w-2xl mx-auto">
                  {service.ctaHeading}
                </Heading>
                <Text size="base" tone="secondary" className="max-w-xl mx-auto text-gray-600">
                  {service.ctaBody}
                </Text>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                  <Button asChild variant="primary" size="lg">
                    <Link href={service.ctaHref}>
                      <span>{service.ctaButtonLabel}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/services">
                      Compare All Services
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
