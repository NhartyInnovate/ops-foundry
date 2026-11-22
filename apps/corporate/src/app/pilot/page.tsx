import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../components/abstract-brand-geometry';
import { PilotIntakeForm } from '../../components/pilot-intake-form';
import { ScrollReveal, ScrollRevealGroup } from '../../components/scroll-reveal';
import { pilotPageContent } from '../../content/supporting-pages';
import { getCorporateSiteUrl } from '../../content/site-config';

export const metadata: Metadata = {
  title: 'Explore an Operational Pilot — Ops Foundry',
  description:
    'Start with a focused, low-risk paid pilot. Tell us what needs attention and receive a clear proposal with defined scope, timeline, deliverables, and fees.',
  alternates: {
    canonical: '/pilot',
  },
  openGraph: {
    title: 'Explore an Operational Pilot — Ops Foundry',
    description:
      'Start with a focused, low-risk paid pilot. Tell us what needs attention and receive a clear proposal with defined scope, timeline, deliverables, and fees.',
    url: '/pilot',
    type: 'website',
  },
};

export default function PilotPage() {
  const { hero, howPilotBegins, whyStartWithPilot, tenGovernanceDimensions, formSection } =
    pilotPageContent;
  const siteUrl = getCorporateSiteUrl();

  const pilotSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteUrl}/pilot#webpage`,
    url: `${siteUrl}/pilot`,
    name: 'Explore an Operational Pilot — Ops Foundry',
    description:
      'Start with a focused, low-risk paid pilot. Tell us what needs attention and receive a clear proposal with defined scope, timeline, deliverables, and fees.',
    mainEntity: {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pilotSchema) }}
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
            <div className="max-w-3xl">
              <span className="animate-hero-1 inline-block font-display text-xs font-bold tracking-widest text-foundry-secondary uppercase mb-3">
                Ops Foundry / Pilot Engagement
              </span>
              <Heading
                as="h1"
                size="display"
                className="animate-hero-2 mb-6 text-foundry-dark tracking-tight leading-[1.08]"
              >
                {hero.lead}
              </Heading>
              <Text
                size="lg"
                tone="default"
                className="animate-hero-3 mb-8 font-medium leading-relaxed max-w-2xl text-gray-700"
              >
                {hero.supporting}
              </Text>
              <div className="animate-hero-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <a href="#pilot-brief-form">Request a Pilot Conversation</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/services">Compare Service Lines</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. How a Pilot Begins */}
        <Section tone="canvas" spacing="lg" border="bottom" className="bg-foundry-muted">
          <Container>
            <ScrollReveal animation="fade-up" className="max-w-3xl mb-10">
              <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                {howPilotBegins.heading}
              </Heading>
              <Text size="base" tone="secondary" className="leading-relaxed">
                {howPilotBegins.intro}
              </Text>
            </ScrollReveal>

            <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {howPilotBegins.steps.map((step, idx) => (
                <ScrollReveal
                  key={step.number}
                  as="article"
                  animation={idx === 0 ? 'stagger-1' : idx === 1 ? 'stagger-2' : 'stagger-3'}
                  className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs space-y-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foundry-dark text-white font-display font-bold text-sm">
                    0{step.number}
                  </div>
                  <Heading as="h3" size="sm" className="text-foundry-dark">
                    {step.title}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {step.description}
                  </Text>
                </ScrollReveal>
              ))}
            </ScrollRevealGroup>
          </Container>
        </Section>

        {/* 3. Pilot Intake Form */}
        <Section id="pilot-brief-form" tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-4xl mx-auto">
              <ScrollReveal animation="fade-up" className="mb-10 text-center sm:text-left">
                <Heading as="h2" size="xl" className="mb-3 text-foundry-dark">
                  {formSection.heading}
                </Heading>
                <Text size="base" tone="secondary" className="max-w-2xl leading-relaxed">
                  {formSection.intro}
                </Text>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delayMs={100}>
                <PilotIntakeForm />
              </ScrollReveal>
            </div>
          </Container>
        </Section>

        {/* 4. Why Start With a Scoped Pilot */}
        <Section tone="canvas" spacing="lg" border="bottom" className="bg-foundry-muted">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <ScrollReveal animation="fade-up" className="lg:col-span-5">
                <Heading as="h2" size="xl" className="text-foundry-dark">
                  {whyStartWithPilot.heading}
                </Heading>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delayMs={100} className="lg:col-span-7 space-y-6">
                <Text size="base" tone="secondary" className="leading-relaxed">
                  {whyStartWithPilot.body}
                </Text>
                <div
                  role="note"
                  aria-label="Commercial outcomes disclaimer"
                  className="rounded-xl border border-foundry-border bg-white p-5 text-xs sm:text-sm text-foundry-secondary leading-relaxed shadow-xs"
                >
                  {whyStartWithPilot.disclaimer}
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </Section>

        {/* 5. Ten Required Governance Dimensions */}
        <Section tone="pure" spacing="lg">
          <Container>
            <ScrollReveal animation="fade-up" className="max-w-3xl mb-12">
              <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                {tenGovernanceDimensions.heading}
              </Heading>
              <Text size="lg" tone="secondary" className="leading-relaxed">
                {tenGovernanceDimensions.intro}
              </Text>
            </ScrollReveal>

            <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
              {tenGovernanceDimensions.dimensions.map((item, idx) => (
                <ScrollReveal
                  key={item.number}
                  as="article"
                  animation={idx % 2 === 0 ? 'stagger-1' : 'stagger-2'}
                  className="rounded-2xl bg-foundry-muted p-6 lg:p-7 border border-foundry-border shadow-xs flex items-start gap-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foundry-dark text-white font-display font-bold text-xs">
                    {item.number}
                  </div>
                  <div>
                    <Heading as="h3" size="sm" className="mb-2 text-foundry-dark">
                      {item.title}
                    </Heading>
                    <Text size="sm" tone="secondary" className="leading-relaxed">
                      {item.description}
                    </Text>
                  </div>
                </ScrollReveal>
              ))}
            </ScrollRevealGroup>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
