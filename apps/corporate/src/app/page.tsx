import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CorporateHeader } from '../components/corporate-header';
import { CorporateFooter } from '../components/corporate-footer';
import {
  heroContent,
  whyOpsFoundryContent,
  operatingPillarsContent,
  servicesContent,
  finalCtaContent,
} from '../content/homepage';

export default function CorporateHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* Section 1 — Hero */}
        <Section
          tone="canvas"
          spacing="none"
          className="pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28 overflow-hidden"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Core Positioning & CTAs */}
              <div className="lg:col-span-7 space-y-8">
                <Heading as="h1" size="display">
                  {heroContent.headlinePrimary}{' '}
                  <span className="block mt-1 text-foundry-orange">
                    {heroContent.headlineAccent}
                  </span>
                </Heading>

                <Text size="xl" className="max-w-2xl text-gray-600">
                  {heroContent.supportingCopy}
                </Text>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                  <Button asChild variant="primary" size="lg">
                    <Link href={heroContent.primaryCta.href}>
                      <span>{heroContent.primaryCta.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg">
                    <Link href={heroContent.secondaryCta.href}>
                      {heroContent.secondaryCta.label}
                    </Link>
                  </Button>
                </div>

                {/* Grounded Execution Summary */}
                <dl className="pt-8 border-t border-foundry-border grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {heroContent.highlights.map((item) => (
                    <div key={item.title} className="space-y-1">
                      <dt className="font-display text-base font-bold text-foundry-dark">
                        {item.title}
                      </dt>
                      <dd className="font-body text-xs text-foundry-secondary leading-relaxed">
                        {item.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right Column: Documentary Operations Photography */}
              <div className="lg:col-span-5">
                <figure className="relative rounded-3xl overflow-hidden border border-foundry-border bg-gray-100 shadow-xl aspect-[4/5]">
                  <Image
                    src={heroContent.heroImage.src}
                    alt={heroContent.heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                    aria-hidden="true"
                  />
                  <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl bg-foundry-dark/85 backdrop-blur-md p-4 sm:p-5 text-white border border-white/10">
                    <p className="font-display text-sm font-semibold text-white">
                      {heroContent.heroImage.captionTitle}
                    </p>
                    <p className="mt-1 font-body text-xs text-gray-300 leading-relaxed">
                      {heroContent.heroImage.captionBody}
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 2 — The Execution Capacity Problem */}
        <Section id="why-ops-foundry" tone="pure" spacing="lg" border="both">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Core Thesis & Documentary Image */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <Heading as="h2" size="xl">
                    {whyOpsFoundryContent.headline}
                  </Heading>
                  <Text size="base" className="text-gray-600">
                    {whyOpsFoundryContent.lead}
                  </Text>
                </div>

                <figure className="rounded-2xl overflow-hidden border border-foundry-border bg-foundry-canvas">
                  <div className="relative aspect-[4/3] w-full bg-gray-100">
                    <Image
                      src={whyOpsFoundryContent.image.src}
                      alt={whyOpsFoundryContent.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="p-4 text-xs text-foundry-secondary leading-relaxed border-t border-foundry-border">
                    {whyOpsFoundryContent.image.caption}
                  </figcaption>
                </figure>
              </div>

              {/* Right Column: Three Concise Problem/Solution Statements & Concluding Statement */}
              <div className="lg:col-span-7 space-y-8">
                <div className="border-t border-foundry-border divide-y divide-foundry-border">
                  {whyOpsFoundryContent.contrasts.map((item) => (
                    <div
                      key={item.challenge}
                      className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                    >
                      <h3 className="sm:col-span-5 font-display text-base font-bold text-foundry-dark">
                        {item.challenge}
                      </h3>
                      <p className="sm:col-span-7 font-body text-sm text-foundry-secondary leading-relaxed">
                        {item.resolution}
                      </p>
                    </div>
                  ))}
                </div>

                <blockquote className="rounded-2xl bg-foundry-canvas border-l-4 border-foundry-orange p-6 sm:p-7">
                  <p className="font-display text-base sm:text-lg font-bold text-foundry-dark leading-snug">
                    {whyOpsFoundryContent.editorialCallout}
                  </p>
                </blockquote>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 3 — Three Pillars */}
        <Section id="operating-pillars" tone="canvas" spacing="lg">
          <Container>
            <div className="max-w-3xl mb-12">
              <Heading as="h2" size="xl">
                {operatingPillarsContent.headline}
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {operatingPillarsContent.pillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border space-y-4"
                >
                  <span
                    className="block font-display text-2xl font-extrabold text-foundry-orange"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foundry-dark">
                    {pillar.title}
                  </h3>
                  <Text size="base" className="text-gray-600">
                    {pillar.summary}
                  </Text>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 4 — Three Service Lines */}
        <Section id="services" tone="pure" spacing="lg" border="top">
          <Container>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-foundry-border">
              <div className="max-w-2xl space-y-3">
                <Heading as="h2" size="xl">
                  {servicesContent.headline}
                </Heading>
                <Text size="lg" className="text-gray-600">
                  {servicesContent.intro}
                </Text>
              </div>
              <div className="flex flex-col lg:items-end gap-3 shrink-0">
                <p className="font-body text-xs text-foundry-secondary max-w-xs lg:text-right">
                  {servicesContent.scopeNotice}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foundry-orange hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange"
                >
                  <span>View Services Overview</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-foundry-border">
              {servicesContent.services.map((service) => (
                <article
                  key={service.id}
                  id={service.anchorId}
                  className="py-12 sm:py-14 first:pt-12 last:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center scroll-mt-24"
                >
                  <div className="lg:col-span-7 space-y-5">
                    <div className="space-y-2">
                      <Heading as="h3" size="lg">
                        {service.title}
                      </Heading>
                      <Text size="lg" className="text-gray-700 font-medium">
                        {service.description}
                      </Text>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <p className="font-display text-xs font-bold text-foundry-dark">
                        Representative Focus Areas (Indicative Scope):
                      </p>
                      <ul className="space-y-2">
                        {service.focusAreas.map((area) => (
                          <li
                            key={area}
                            className="flex items-start gap-2.5 text-sm text-gray-700"
                          >
                            <CheckCircle2
                              className="h-4 w-4 text-foundry-orange shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <Button asChild variant="secondary" size="md">
                        <Link href={service.ctaHref}>
                          <span>{service.ctaLabel}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="md">
                        <Link href={service.pilotHref}>
                          Explore a Pilot
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <figure className="rounded-2xl overflow-hidden border border-foundry-border bg-foundry-canvas shadow-sm">
                      <div className="relative aspect-[16/10] w-full bg-gray-100">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 38vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="px-4 py-3 text-xs text-foundry-secondary border-t border-foundry-border">
                        {service.image.caption}
                      </figcaption>
                    </figure>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 5 — Final CTA (Explore a Pilot) */}
        <Section id="explore-pilot" tone="canvas" spacing="lg" border="top">
          <Container>
            <div className="rounded-3xl bg-foundry-dark text-white p-8 sm:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Commercial Invitation */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <Heading as="h2" size="xl" tone="inverse">
                      {finalCtaContent.headline}
                    </Heading>
                    <p className="font-display text-xl sm:text-2xl font-bold text-foundry-orange">
                      {finalCtaContent.subheadline}
                    </p>
                  </div>

                  <Text size="base" tone="inverseMuted" className="max-w-xl">
                    {finalCtaContent.body}
                  </Text>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <Button asChild variant="primary" size="lg">
                      <Link href={finalCtaContent.primaryCtaHref}>
                        <span>{finalCtaContent.primaryCtaLabel}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-white text-[#111215] border-[#E5E7EB] hover:bg-gray-50 hover:text-[#111215] hover:border-gray-300 active:bg-gray-100 focus-visible:outline-white shadow-sm"
                    >
                      <Link href={finalCtaContent.secondaryCtaHref}>
                        {finalCtaContent.secondaryCtaLabel}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right Column: Pilot Scoping Preparation Summary */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-foundry-dark-card border border-foundry-dark-border p-6 sm:p-8 space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-display text-base font-bold text-white">
                        What We Review in a Pilot Conversation
                      </h3>
                      <p className="font-body text-xs text-gray-400">
                        Each pilot begins by aligning on three practical questions:
                      </p>
                    </div>

                    <ol className="space-y-4">
                      {finalCtaContent.pilotPreparationItems.map((item, index) => (
                        <li key={item.label} className="flex items-start gap-3.5">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-xs font-bold text-foundry-orange">
                            {index + 1}
                          </span>
                          <div className="space-y-0.5">
                            <p className="font-display text-sm font-semibold text-white">
                              {item.label}
                            </p>
                            <p className="font-body text-xs text-gray-300 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <p className="pt-4 border-t border-white/10 font-body text-xs text-gray-400 leading-relaxed">
                      {finalCtaContent.phaseNotice}
                    </p>
                  </div>
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
