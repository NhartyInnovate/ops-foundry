import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../components/abstract-brand-geometry';
import { ScrollReveal, ScrollRevealGroup } from '../../components/scroll-reveal';
import { howWeWorkPageContent } from '../../content/supporting-pages';
import { getCorporateSiteUrl } from '../../content/site-config';

export const metadata: Metadata = {
  title: 'How We Work — Ops Foundry | Human-AI Operating Model',
  description:
    'Discover how Ops Foundry combines managed teams, structured workflows, and AI-enabled tools across Discover, Scope, Deliver, and Review engagement stages.',
  alternates: {
    canonical: '/how-we-work',
  },
  openGraph: {
    title: 'How We Work — Ops Foundry | Human-AI Operating Model',
    description:
      'Discover how Ops Foundry combines managed teams, structured workflows, and AI-enabled tools across Discover, Scope, Deliver, and Review engagement stages.',
    url: '/how-we-work',
    type: 'website',
  },
};

export default function HowWeWorkPage() {
  const { hero, pillarsIntegration, operatingModel, governanceAgreements, cta } =
    howWeWorkPageContent;
  const siteUrl = getCorporateSiteUrl();

  const howWeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/how-we-work#webpage`,
    url: `${siteUrl}/how-we-work`,
    name: 'How We Work — Ops Foundry | Human-AI Operating Model',
    description:
      'Discover how Ops Foundry combines managed teams, structured workflows, and AI-enabled tools across Discover, Scope, Deliver, and Review engagement stages.',
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Ops Foundry',
      url: siteUrl,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howWeWorkSchema) }}
      />
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Editorial Hero */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="relative pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden"
        >
          <AbstractBrandGeometry variant="subtle" />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <Heading
                  as="h1"
                  size="display"
                  className="animate-hero-1 mb-6 text-foundry-dark tracking-tight leading-[1.08]"
                >
                  {hero.title}
                </Heading>
                <Text
                  size="lg"
                  tone="default"
                  className="animate-hero-2 mb-5 font-medium leading-relaxed max-w-2xl"
                >
                  {hero.lead}
                </Text>
                <Text
                  size="base"
                  tone="secondary"
                  className="animate-hero-3 mb-8 max-w-2xl leading-relaxed"
                >
                  {hero.supporting}
                </Text>
                <div className="animate-hero-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link href="/pilot" className="inline-flex">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      Explore a Pilot
                    </Button>
                  </Link>
                  <Link href="/services" className="inline-flex">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      View Service Lines
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="animate-hero-image relative rounded-2xl overflow-hidden border border-foundry-border bg-white shadow-sm">
                  <div className="aspect-[16/11] w-full overflow-hidden bg-foundry-surface-alt">
                    <img
                      src={hero.image.src}
                      alt={hero.image.alt}
                      className="h-full w-full object-cover object-center"
                      loading="eager"
                    />
                  </div>
                  <figcaption className="px-5 py-4 bg-white border-t border-foundry-border text-xs text-foundry-secondary leading-relaxed">
                    {hero.image.caption}
                  </figcaption>
                </figure>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Combining Managed Teams, Structured Workflows, and AI-Enabled Tools */}
        <Section tone="canvas" spacing="lg" border="bottom" className="bg-foundry-muted">
          <Container>
            <ScrollReveal animation="fade-up" className="max-w-3xl mb-12">
              <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                {pillarsIntegration.heading}
              </Heading>
              <Text size="lg" tone="secondary" className="leading-relaxed">
                {pillarsIntegration.intro}
              </Text>
            </ScrollReveal>

            <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {pillarsIntegration.items.map((item, idx) => (
                <ScrollReveal
                  key={item.title}
                  as="article"
                  animation={idx === 0 ? 'stagger-1' : idx === 1 ? 'stagger-2' : 'stagger-3'}
                  className="flex flex-col justify-between rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs"
                >
                  <div>
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-foundry-dark text-white font-display font-bold text-sm">
                      0{idx + 1}
                    </div>
                    <Heading as="h3" size="sm" className="mb-3 text-foundry-dark">
                      {item.title}
                    </Heading>
                    <Text size="sm" tone="secondary" className="leading-relaxed">
                      {item.body}
                    </Text>
                  </div>
                </ScrollReveal>
              ))}
            </ScrollRevealGroup>
          </Container>
        </Section>

        {/* 3. Proposed Four-Stage Operating Model */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <ScrollReveal animation="fade-up" className="max-w-3xl mb-8">
              <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                {operatingModel.heading}
              </Heading>
              <Text size="lg" tone="secondary" className="leading-relaxed">
                {operatingModel.intro}
              </Text>
            </ScrollReveal>

            {/* Required Governance Notice: Proposed / Indicative Operating Model */}
            <ScrollReveal
              animation="fade-up"
              role="note"
              aria-label="Operating model scope notice"
              className="mb-10 rounded-xl border border-foundry-border bg-foundry-muted px-6 py-4 text-sm text-foundry-dark leading-relaxed shadow-xs"
            >
              {operatingModel.disclaimer}
            </ScrollReveal>

            <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {operatingModel.stages.map((stage, idx) => (
                <ScrollReveal
                  key={stage.title}
                  as="article"
                  animation={
                    idx === 0
                      ? 'stagger-1'
                      : idx === 1
                      ? 'stagger-2'
                      : idx === 2
                      ? 'stagger-3'
                      : 'stagger-4'
                  }
                  className="flex flex-col justify-between rounded-2xl bg-foundry-muted p-7 lg:p-9 border border-foundry-border shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-foundry-border">
                      <Heading as="h3" size="lg" className="text-foundry-dark">
                        {stage.title}
                      </Heading>
                      <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-foundry-dark border border-foundry-border">
                        {stage.number}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-foundry-secondary mb-6 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-foundry-border">
                    <h4 className="text-xs font-semibold text-foundry-dark mb-3">
                      Indicative Stage Outputs:
                    </h4>
                    <ul className="space-y-2">
                      {stage.typicalOutputs.map((output) => (
                        <li
                          key={output}
                          className="flex items-start gap-2.5 text-xs text-foundry-secondary leading-relaxed"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foundry-dark shrink-0"
                            aria-hidden="true"
                          />
                          <span>{output}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </ScrollRevealGroup>
          </Container>
        </Section>

        {/* 4. How Engagements Are Governed */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <ScrollReveal animation="fade-up" className="lg:col-span-5">
                <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                  {governanceAgreements.heading}
                </Heading>
                <Text size="base" tone="secondary" className="mb-6 leading-relaxed">
                  {governanceAgreements.intro}
                </Text>
                <div className="rounded-2xl bg-foundry-muted p-6 border border-foundry-border">
                  <Heading as="h3" size="sm" className="mb-2 text-foundry-dark">
                    {governanceAgreements.pilotNotice.heading}
                  </Heading>
                  <Text size="sm" tone="secondary" className="mb-5 leading-relaxed">
                    {governanceAgreements.pilotNotice.body}
                  </Text>
                  <Link href={governanceAgreements.pilotNotice.linkHref} className="inline-flex">
                    <Button variant="outline" size="md">
                      {governanceAgreements.pilotNotice.linkLabel}
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delayMs={100} className="lg:col-span-7 space-y-4">
                {governanceAgreements.agreements.map((agreement, index) => (
                  <div
                    key={agreement.topic}
                    className="rounded-2xl bg-foundry-muted p-6 border border-foundry-border flex flex-col sm:flex-row gap-4 sm:items-start"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foundry-dark text-white font-display font-bold text-xs">
                      0{index + 1}
                    </div>
                    <div>
                      <Heading as="h3" size="sm" className="mb-1.5 text-foundry-dark">
                        {agreement.topic}
                      </Heading>
                      <Text size="sm" tone="secondary" className="leading-relaxed">
                        {agreement.explanation}
                      </Text>
                    </div>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </Container>
        </Section>

        {/* 5. Conversion CTA */}
        <Section tone="pure" spacing="lg">
          <Container>
            <ScrollReveal animation="fade-up" className="relative overflow-hidden rounded-3xl bg-foundry-muted border border-foundry-border p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
              <AbstractBrandGeometry variant="cta" />
              <div className="relative z-10">
                <Heading as="h2" size="xl" tone="default" className="mb-4">
                  {cta.heading}
                </Heading>
                <Text size="lg" tone="secondary" className="mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600">
                  {cta.body}
                </Text>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                  <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                    <Link href={cta.primaryHref}>
                      {cta.primaryLabel}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href={cta.secondaryHref}>
                      {cta.secondaryLabel}
                    </Link>
                  </Button>
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
