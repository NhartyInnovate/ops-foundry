import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { CorporateHeader } from '../components/corporate-header';
import { CorporateFooter } from '../components/corporate-footer';
import { AbstractBrandGeometry } from '../components/abstract-brand-geometry';
import { EventWebsiteMockup } from '../components/event-website-mockup';
import { ScrollReveal, ScrollRevealGroup } from '../components/scroll-reveal';
import {
  heroContent,
  brandsWeSupportContent,
  challengeContent,
  operatingPillarsContent,
  servicesContent,
  whyOpsFoundrySectionContent,
  selectedWorkContent,
  pilotOverviewContent,
  finalCtaContent,
} from '../content/homepage';

export const metadata: Metadata = {
  title: 'Ops Foundry — Human-AI Operational Infrastructure',
  description:
    'Your business has work to do. We help you get it done. Ops Foundry combines managed teams, structured workflows, and AI-enabled tools to help businesses execute.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ops Foundry — Human-AI Operational Infrastructure',
    description:
      'Your business has work to do. We help you get it done. Ops Foundry combines managed teams, structured workflows, and AI-enabled tools to help businesses execute.',
    url: '/',
  },
};

export default function CorporateHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* Section 1 — Hero */}
        <Section
          tone="canvas"
          spacing="none"
          className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28 overflow-hidden"
        >
          {/* Container-aligned decorative brand gradient and ambient glow */}
          <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
            <Container className="relative h-full">
              <AbstractBrandGeometry variant="hero" />
            </Container>
          </div>

          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Core Positioning & CTAs */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  {'eyebrow' in heroContent && heroContent.eyebrow ? (
                    <span className="animate-hero-1 inline-block font-display text-xs font-bold tracking-widest text-foundry-secondary uppercase">
                      {heroContent.eyebrow}
                    </span>
                  ) : null}
                  <Heading as="h1" size="display" className="animate-hero-2">
                    {heroContent.headlinePrimary}{' '}
                    <span className="block mt-1 text-foundry-dark">
                      {heroContent.headlineAccent}
                    </span>
                  </Heading>
                </div>

                <Text size="xl" className="animate-hero-3 max-w-2xl text-gray-600">
                  {heroContent.supportingCopy}
                </Text>

                <div className="animate-hero-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
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

              </div>

              {/* Right Column: Prominent Hero Portrait Cutout */}
              <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end items-end self-end -mb-16 sm:-mb-20 lg:-mb-28">
                <Image
                  src="/images/brand/hero/hero-professional-woman.png"
                  alt="Smiling professional woman in business attire"
                  width={1200}
                  height={800}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 720px"
                  className="animate-hero-image relative z-10 h-auto max-w-full sm:max-w-none w-[340px] sm:w-[420px] md:w-[480px] lg:max-w-none lg:w-[540px] xl:w-[580px] object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Social Proof Strip — Brands We've Supported */}
        <Section
          id="brands-supported"
          tone="dark"
          spacing="none"
          border="both"
          className="py-8 sm:py-10 bg-foundry-dark border-foundry-dark-border"
        >
          <Container>
            <ScrollReveal animation="fade-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
                <p className="font-display text-xs font-bold tracking-widest uppercase text-gray-400 shrink-0">
                  {brandsWeSupportContent.heading}
                </p>
                <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-12 lg:gap-16 w-full md:w-auto">
                  {brandsWeSupportContent.organisations.map((org) => {
                    const hasLogo = Boolean(org.logo);
                    return (
                      <div key={org.name} className="flex items-center justify-center shrink-0">
                        {hasLogo ? (
                          <Image
                            src={org.logo}
                            alt={org.name}
                            width={org.width}
                            height={org.height}
                            className="h-5.5 sm:h-7 md:h-8 w-auto max-w-[105px] sm:max-w-none object-contain opacity-85 hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <span className="font-display text-xs sm:text-base md:text-lg font-medium tracking-tight text-slate-200/90 hover:text-white transition-colors select-none">
                            {org.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Section 2 — The Challenge */}
        <Section id="challenge" tone="canvas" spacing="lg" border="both" className="bg-foundry-muted">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Core Thesis & Callout Card */}
              <ScrollReveal animation="fade-up" className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <Heading as="h2" size="xl">
                    {challengeContent.headline}
                  </Heading>
                  <Text size="base" className="text-gray-600">
                    {challengeContent.lead}
                  </Text>
                </div>

                <blockquote className="rounded-2xl bg-white border-l-4 border-foundry-dark p-6 sm:p-7 shadow-xs">
                  <p className="font-display text-base sm:text-lg font-bold text-foundry-dark leading-snug">
                    {challengeContent.editorialCallout}
                  </p>
                </blockquote>
              </ScrollReveal>

              {/* Right Column: Preserved Documentary Image */}
              <ScrollReveal animation="fade-up" delayMs={150} className="lg:col-span-5">
                <figure className="rounded-2xl overflow-hidden border border-foundry-border bg-white shadow-xs">
                  <div className="relative aspect-[4/3] w-full bg-gray-100">
                    <Image
                      src={challengeContent.image.src}
                      alt={challengeContent.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="p-4 text-xs text-foundry-secondary leading-relaxed border-t border-foundry-border">
                    {challengeContent.image.caption}
                  </figcaption>
                </figure>
              </ScrollReveal>
            </div>
          </Container>
        </Section>

        {/* Section 3 — Operating Model (Three Pillars) */}
        <Section id="operating-pillars" tone="pure" spacing="lg">
          <Container>
            <ScrollReveal animation="fade-up" className="max-w-3xl mb-12">
              <Heading as="h2" size="xl">
                {operatingPillarsContent.headline}
              </Heading>
            </ScrollReveal>

            <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {operatingPillarsContent.pillars.map((pillar, idx) => (
                <ScrollReveal
                  key={pillar.number}
                  as="article"
                  animation={idx === 0 ? 'stagger-1' : idx === 1 ? 'stagger-2' : 'stagger-3'}
                  className="rounded-2xl bg-foundry-muted p-7 lg:p-8 border border-foundry-border space-y-4 shadow-xs"
                >
                  <span
                    className="block font-display text-2xl font-extrabold text-foundry-dark"
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
                </ScrollReveal>
              ))}
            </ScrollRevealGroup>

            <ScrollReveal animation="fade-up" className="mt-10 sm:mt-12 flex items-center justify-start">
              <Button asChild variant="primary" size="lg">
                <Link href={operatingPillarsContent.ctaHref}>
                  <span>{operatingPillarsContent.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </Button>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Section 4 — Services (Three Service Lines) */}
        <Section id="services" tone="pure" spacing="lg" border="top">
          <Container>
            <ScrollReveal animation="fade-up" className="max-w-3xl mb-12">
              <Heading as="h2" size="xl">
                {servicesContent.headline}
              </Heading>
            </ScrollReveal>

            <div className="divide-y divide-foundry-border">
              {servicesContent.services.map((service) => (
                <ScrollReveal
                  key={service.id}
                  id={service.anchorId}
                  as="article"
                  animation="fade-up"
                  className="py-12 sm:py-14 first:pt-4 last:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center scroll-mt-24"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                      <Heading as="h3" size="lg">
                        {service.title}
                      </Heading>
                      <Text size="lg" className="text-gray-700 font-medium leading-relaxed">
                        {service.description}
                      </Text>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Button asChild variant="primary" size="md">
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
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 5 — Why Ops Foundry */}
        <Section id="why-ops-foundry" tone="canvas" spacing="lg" border="top" className="bg-foundry-muted">
          <Container>
            <ScrollReveal animation="fade-up" className="rounded-3xl bg-white border border-foundry-border p-8 sm:p-12 lg:p-16 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-block font-display text-xs font-bold tracking-widest text-foundry-secondary uppercase">
                    {whyOpsFoundrySectionContent.heading}
                  </span>
                  <Heading as="h2" size="xl" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foundry-dark leading-snug">
                    {whyOpsFoundrySectionContent.headline}
                  </Heading>
                </div>
                <div className="lg:col-span-5 lg:border-l lg:border-foundry-border lg:pl-10">
                  <Text size="lg" className="text-gray-600 leading-relaxed font-medium">
                    {whyOpsFoundrySectionContent.supportingCopy}
                  </Text>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Section 6 — Selected Work */}
        {selectedWorkContent.published && selectedWorkContent.projects.length > 0 ? (
          <Section id="selected-work" tone="pure" spacing="lg" border="top" className="scroll-mt-24">
            <Container>
              <ScrollReveal animation="fade-up" className="max-w-3xl mb-10 sm:mb-14 space-y-3">
                <span className="inline-block font-display text-xs font-bold tracking-widest text-foundry-secondary uppercase">
                  {selectedWorkContent.heading}
                </span>
                <Heading as="h2" size="xl">
                  {selectedWorkContent.headline}
                </Heading>
              </ScrollReveal>

              <div className="space-y-12">
                {selectedWorkContent.projects.map((project) => (
                  <ScrollReveal
                    key={project.id}
                    as="article"
                    animation="fade-up"
                    className="rounded-3xl bg-foundry-muted/50 border border-foundry-border p-5 sm:p-10 lg:p-12 shadow-xs transition-all duration-300 hover:border-slate-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                      {/* Visual Mockup Column (Occupies ~58% width on desktop: lg:col-span-7) */}
                      <div className="lg:col-span-7 w-full">
                        <EventWebsiteMockup
                          imageSrc={project.image?.src}
                          imageAlt={project.image?.alt}
                        />
                      </div>

                      {/* Content Column (Occupies ~42% width on desktop: lg:col-span-5) */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-4">
                          <Heading as="h3" size="lg" className="text-2xl sm:text-3xl font-bold text-foundry-dark leading-snug">
                            {project.title}
                          </Heading>
                          <Text size="lg" className="text-gray-600 leading-relaxed font-normal">
                            {project.supportingCopy}
                          </Text>
                        </div>

                        <div className="pt-4 border-t border-foundry-border flex flex-wrap items-center justify-between gap-3 text-xs text-foundry-secondary">
                          <span className="font-medium text-foundry-dark/80">Telesoftas Ecosystem</span>
                          <span className="text-[11px] text-gray-500">Illustrative concept preview</span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        {/* Section 7 — Final CTA (Explore a Pilot) */}
        <Section id="explore-pilot" tone="pure" spacing="lg" border="top">
          <Container>
            <ScrollReveal animation="fade-up" className="relative overflow-hidden rounded-3xl bg-foundry-muted text-foundry-dark border border-foundry-border p-8 sm:p-12 lg:p-16">
              <AbstractBrandGeometry variant="cta" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Commercial Invitation */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <Heading as="h2" size="xl" tone="default">
                      {finalCtaContent.headline}
                    </Heading>
                    <p className="font-display text-xl sm:text-2xl font-bold text-foundry-dark">
                      {finalCtaContent.subheadline}
                    </p>
                  </div>

                  <Text size="base" tone="secondary" className="max-w-xl text-gray-600">
                    {finalCtaContent.body}
                  </Text>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <Button asChild variant="primary" size="lg">
                      <Link href={finalCtaContent.primaryCtaHref}>
                        <span>{finalCtaContent.primaryCtaLabel}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Link href={finalCtaContent.secondaryCtaHref}>
                        {finalCtaContent.secondaryCtaLabel}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right Column: Pilot Focus Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-white border border-foundry-border p-6 sm:p-8 space-y-4 shadow-xs">
                    <span className="inline-block font-display text-xs font-bold tracking-widest text-foundry-secondary uppercase">
                      {pilotOverviewContent.eyebrow}
                    </span>
                    <Heading as="h3" size="md" className="text-xl sm:text-2xl font-bold text-foundry-dark leading-snug">
                      {pilotOverviewContent.headline}
                    </Heading>
                    <Text size="base" className="text-gray-600 leading-relaxed font-normal">
                      {pilotOverviewContent.body}
                    </Text>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
