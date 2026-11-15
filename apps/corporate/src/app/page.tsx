import React from 'react';
import Image from 'next/image';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CorporateHeader } from '../components/corporate-header';
import { CorporateFooter } from '../components/corporate-footer';
import {
  heroContent,
  whyOpsFoundryContent,
  operatingPillarsContent,
  servicesContent,
  howWeWorkContent,
  whoWeHelpContent,
  academyBridgeContent,
  insightsContent,
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
                    <a href={heroContent.primaryCta.href}>
                      <span>{heroContent.primaryCta.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  </Button>

                  <Button asChild variant="outline" size="lg">
                    <a href={heroContent.secondaryCta.href}>
                      {heroContent.secondaryCta.label}
                    </a>
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

        {/* Section 2 — Why Ops Foundry Exists */}
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

              {/* Right Column: Operational Analysis & Resolution */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-5">
                  {whyOpsFoundryContent.narrativeParagraphs.map((paragraph, idx) => (
                    <Text key={idx} size="lg" className="text-gray-700">
                      {paragraph}
                    </Text>
                  ))}
                </div>

                {/* Editorial Operational Contrasts */}
                <div className="border-t border-foundry-border divide-y divide-foundry-border">
                  {whyOpsFoundryContent.contrasts.map((item) => (
                    <div
                      key={item.challenge}
                      className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
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

        {/* Section 3 — Our Operating Pillars (Editorial Architectural Ledger) */}
        <Section id="operating-pillars" tone="canvas" spacing="lg">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Section Thesis & System Integration Explanation */}
              <div className="lg:col-span-4 space-y-6">
                <Heading as="h2" size="xl">
                  {operatingPillarsContent.headline}
                </Heading>
                <Text size="base" className="text-gray-600">
                  {operatingPillarsContent.intro}
                </Text>
                <div className="rounded-2xl bg-foundry-dark text-white p-6 space-y-2">
                  <p className="font-display text-sm font-bold text-white">
                    Integrated Execution
                  </p>
                  <p className="font-body text-xs text-gray-300 leading-relaxed">
                    {operatingPillarsContent.systemNote}
                  </p>
                </div>
              </div>

              {/* Right Column: Editorial Stacked Pillar Ledger (Non-Card Layout) */}
              <div className="lg:col-span-8 border-t-2 border-foundry-dark divide-y divide-foundry-border">
                {operatingPillarsContent.pillars.map((pillar) => (
                  <article
                    key={pillar.number}
                    className="py-8 sm:py-10 first:pt-8 last:pb-2 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start"
                  >
                    <div className="sm:col-span-3 flex sm:flex-col items-baseline sm:items-start gap-3">
                      <span
                        className="font-display text-2xl sm:text-3xl font-extrabold text-foundry-orange"
                        aria-hidden="true"
                      >
                        {pillar.number}
                      </span>
                      <h3 className="font-display text-xl font-bold text-foundry-dark">
                        {pillar.title}
                      </h3>
                    </div>

                    <div className="sm:col-span-9 space-y-3">
                      <p className="font-display text-base sm:text-lg font-semibold text-foundry-dark leading-snug">
                        {pillar.summary}
                      </p>
                      <Text size="sm" className="text-gray-600">
                        {pillar.detail}
                      </Text>
                      <p className="pt-1 font-body text-xs font-medium text-gray-700">
                        <span className="font-semibold text-foundry-dark">
                          How it connects:{' '}
                        </span>
                        {pillar.interplay}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 4 — Our Services */}
        <Section id="services" tone="pure" spacing="lg" border="both">
          <Container>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-foundry-border">
              <div className="max-w-2xl space-y-4">
                <Heading as="h2" size="xl">
                  {servicesContent.headline}
                </Heading>
                <Text size="base" className="text-gray-600">
                  {servicesContent.intro}
                </Text>
              </div>
              <p className="font-body text-xs text-foundry-secondary max-w-xs lg:text-right">
                {servicesContent.scopeNotice}
              </p>
            </div>

            <div className="divide-y divide-foundry-border">
              {servicesContent.services.map((service) => (
                <article
                  key={service.id}
                  id={service.anchorId}
                  className="py-12 sm:py-16 first:pt-12 last:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center scroll-mt-24"
                >
                  <div className="lg:col-span-7 space-y-5">
                    <div className="space-y-2">
                      <Heading as="h3" size="lg">
                        {service.title}
                      </Heading>
                      <p className="font-display text-base sm:text-lg font-semibold text-gray-800">
                        {service.lead}
                      </p>
                    </div>

                    <Text size="base" className="text-gray-600 max-w-2xl">
                      {service.description}
                    </Text>

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
                      <Button asChild variant="outline" size="md">
                        <a href={service.ctaHref}>
                          <span>{service.ctaLabel}</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>
                      <span className="text-xs text-foundry-secondary">
                        Dedicated service page ({service.plannedRoute}) planned for Phase 3B.2
                      </span>
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

        {/* Section 5 — How We Work */}
        <Section id="how-we-work" tone="dark" spacing="lg">
          <Container>
            <div className="max-w-3xl space-y-4 mb-14">
              <Heading as="h2" size="xl" tone="inverse">
                {howWeWorkContent.headline}
              </Heading>
              <Text size="base" tone="inverseMuted">
                {howWeWorkContent.intro}
              </Text>
              <p className="inline-block rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-gray-300 leading-relaxed">
                {howWeWorkContent.approvalNotice}
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howWeWorkContent.stages.map((stage) => (
                <li
                  key={stage.stage}
                  className="border-t border-foundry-dark-border pt-6 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <span className="font-display text-xs font-bold text-foundry-orange">
                      {stage.stage}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">
                      {stage.title}
                    </h3>
                    <p className="font-body text-sm text-gray-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="block text-[11px] text-gray-400">
                      Stage Focus
                    </span>
                    <span className="font-body text-xs font-medium text-gray-200">
                      {stage.focusOutput}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* Section 6 — Who We Help */}
        <Section id="who-we-help" tone="canvas" spacing="lg">
          <Container>
            <div className="max-w-2xl space-y-4 mb-14">
              <Heading as="h2" size="xl">
                {whoWeHelpContent.headline}
              </Heading>
              <Text size="base" className="text-gray-600">
                {whoWeHelpContent.intro}
              </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {whoWeHelpContent.profiles.map((profile) => (
                <article
                  key={profile.title}
                  className="rounded-2xl border border-foundry-border bg-white p-8 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <Heading as="h3" size="sm">
                      {profile.title}
                    </Heading>
                    <div className="space-y-1.5">
                      <p className="font-display text-xs font-bold text-gray-500">
                        Operational Challenge
                      </p>
                      <Text size="sm" className="text-gray-600">
                        {profile.challenge}
                      </Text>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100 space-y-1.5">
                    <p className="font-display text-xs font-bold text-foundry-dark">
                      How Ops Foundry Helps
                    </p>
                    <p className="font-body text-sm text-gray-700 leading-relaxed">
                      {profile.howWeHelp}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section 7 — Academy Introduction */}
        <Section id="academy" tone="pure" spacing="lg" border="top">
          <Container>
            <div className="rounded-3xl border border-foundry-border bg-foundry-canvas p-8 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <Heading as="h2" size="lg">
                      {academyBridgeContent.headline}
                    </Heading>
                    <p className="font-display text-base sm:text-lg font-semibold text-gray-800 leading-snug">
                      {academyBridgeContent.lead}
                    </p>
                  </div>

                  <Text size="base" className="text-gray-600">
                    {academyBridgeContent.body}
                  </Text>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {academyBridgeContent.ecosystemPoints.map((point) => (
                      <div
                        key={point.title}
                        className="rounded-xl bg-white border border-foundry-border p-4 space-y-1.5"
                      >
                        <h3 className="font-display text-sm font-bold text-foundry-dark">
                          {point.title}
                        </h3>
                        <p className="font-body text-xs text-foundry-secondary leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Button asChild variant="secondary" size="md">
                      <a href="#explore-pilot">
                        <span>{academyBridgeContent.ctaLabel}</span>
                        <ArrowUpRight className="h-4 w-4 text-foundry-orange" aria-hidden="true" />
                      </a>
                    </Button>
                    <span className="text-xs text-foundry-secondary">
                      Dedicated Ops Foundry Academy web experience scheduled for Phase 3C
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <figure className="rounded-2xl overflow-hidden border border-foundry-border bg-white shadow-sm">
                    <div className="relative aspect-[4/3] w-full bg-gray-100">
                      <Image
                        src={academyBridgeContent.image.src}
                        alt={academyBridgeContent.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 38vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-4 text-xs text-foundry-secondary border-t border-foundry-border">
                      {academyBridgeContent.image.caption}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 8 — Insights */}
        <Section id="insights" tone="pure" spacing="md" border="top">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <Heading as="h2" size="lg">
                  {insightsContent.headline}
                </Heading>
                <Text size="base" className="text-gray-600">
                  {insightsContent.lead}
                </Text>
                <p className="font-body text-xs text-foundry-secondary pt-1">
                  {insightsContent.statusNote}
                </p>
              </div>

              <div className="lg:col-span-7 border-t border-foundry-border divide-y divide-foundry-border">
                {insightsContent.themes.map((theme) => (
                  <div
                    key={theme.title}
                    className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6"
                  >
                    <h3 className="font-display text-base font-bold text-foundry-dark shrink-0">
                      {theme.title}
                    </h3>
                    <p className="font-body text-sm text-foundry-secondary sm:text-right">
                      {theme.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Section 9 — Final CTA (Explore a Pilot) */}
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
                      <a href="#explore-pilot">
                        <span>{finalCtaContent.primaryCtaLabel}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>

                    <Button asChild variant="inverseOutline" size="lg">
                      <a href={finalCtaContent.secondaryCtaHref}>
                        {finalCtaContent.secondaryCtaLabel}
                      </a>
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

      {/* Section 10 — Footer */}
      <CorporateFooter />
    </div>
  );
}
