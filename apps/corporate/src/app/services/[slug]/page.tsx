import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { CorporateHeader } from '../../../components/corporate-header';
import { CorporateFooter } from '../../../components/corporate-footer';
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-foundry-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange"
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
                    className={`inline-flex min-h-[36px] items-center rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange ${
                      isActive
                        ? 'bg-foundry-orange text-white shadow-sm'
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

        {/* Section 1 — Editorial Hero */}
        <Section
          tone="canvas"
          spacing="none"
          className="pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-foundry-border"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Heading as="h1" size="display">
                  {service.title}
                </Heading>
                <p className="font-display text-xl sm:text-2xl font-bold text-foundry-orange leading-snug">
                  {service.lead}
                </p>
                <Text size="lg" className="text-gray-600 max-w-2xl">
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

        {/* Section 2 — The Problem & Business Context */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 space-y-4">
                <Heading as="h2" size="xl">
                  {service.problemHeading}
                </Heading>
                <p className="font-body text-sm text-foundry-secondary">
                  Why businesses bring in Ops Foundry for {service.title} execution.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-6">
                {service.problemContext.map((paragraph, idx) => (
                  <Text key={idx} size="lg" className="text-gray-700">
                    {paragraph}
                  </Text>
                ))}

                <div className="rounded-2xl bg-foundry-canvas border-l-4 border-foundry-orange p-6 space-y-2">
                  <h3 className="font-display text-base font-bold text-foundry-dark">
                    What Ops Foundry Helps Your Business Accomplish
                  </h3>
                  <p className="font-body text-base text-gray-700 leading-relaxed">
                    {service.whatWeHelpAccomplish}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 3 — What the Service Involves (Operating Pillars Applied) */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-4 mb-12">
              <Heading as="h2" size="xl">
                {service.serviceInvolvesHeading}
              </Heading>
              <Text size="base" className="text-gray-600">
                {service.serviceInvolvesIntro}
              </Text>
            </div>

            <div className="border-t-2 border-foundry-dark divide-y divide-foundry-border">
              {service.servicePillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline"
                >
                  <div className="sm:col-span-4 flex items-baseline gap-3">
                    <span className="font-display text-lg font-extrabold text-foundry-orange">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foundry-dark">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="sm:col-span-8 font-body text-sm sm:text-base text-gray-700 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 4 — Typical Activities & Deliverables */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-4 mb-12">
              <Heading as="h2" size="xl">
                {service.activitiesHeading}
              </Heading>
              <p className="rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-3 text-xs text-gray-700 leading-relaxed">
                {service.activitiesDisclaimer}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {service.typicalActivities.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-foundry-border bg-foundry-canvas p-7 space-y-4"
                >
                  <h3 className="font-display text-lg font-bold text-foundry-dark">
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed"
                      >
                        <CheckCircle2
                          className="h-4 w-4 text-foundry-orange shrink-0 mt-0.5"
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

        {/* Section 5 — How the Engagement Could Be Scoped & Client Dependencies */}
        <Section tone="canvas" spacing="lg">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Engagement Scoping Models */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <Heading as="h2" size="lg">
                    {service.scopingHeading}
                  </Heading>
                  <Text size="base" className="text-gray-600">
                    {service.scopingIntro}
                  </Text>
                </div>

                <div className="space-y-4">
                  {service.scopingModels.map((model, idx) => (
                    <div
                      key={model.title}
                      className="rounded-2xl border border-foundry-border bg-white p-6 space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foundry-orange-light font-display text-xs font-bold text-foundry-orange">
                          {idx + 1}
                        </span>
                        <h3 className="font-display text-base font-bold text-foundry-dark">
                          {model.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm text-gray-700 leading-relaxed">
                        {model.summary}
                      </p>
                      <p className="font-body text-xs text-foundry-secondary pt-1">
                        {model.suitableWhen}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Client Responsibilities & Dependencies */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-foundry-dark text-white p-8 sm:p-10 space-y-6">
                  <div className="space-y-2">
                    <Heading as="h2" size="md" tone="inverse">
                      {service.dependenciesHeading}
                    </Heading>
                    <p className="font-body text-xs text-gray-300 leading-relaxed">
                      {service.dependenciesIntro}
                    </p>
                  </div>

                  <ul className="space-y-3.5 border-t border-white/10 pt-5">
                    {service.clientDependencies.map((dep) => (
                      <li
                        key={dep}
                        className="flex items-start gap-3 text-sm text-gray-200 leading-relaxed"
                      >
                        <span
                          className="mt-1.5 h-2 w-2 rounded-full bg-foundry-orange shrink-0"
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

        {/* Section 6 — Clear CTA to Explore a Pilot */}
        <Section tone="pure" spacing="lg" border="top">
          <Container>
            <div className="rounded-3xl bg-foundry-dark text-white p-8 sm:p-12 lg:p-16 text-center space-y-6">
              <Heading as="h2" size="xl" tone="inverse" className="max-w-2xl mx-auto">
                {service.ctaHeading}
              </Heading>
              <Text size="base" tone="inverseMuted" className="max-w-xl mx-auto">
                {service.ctaBody}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg">
                  <Link href={service.ctaHref}>
                    <span>{service.ctaButtonLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg">
                  <Link href="/services">
                    Compare All Services
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
