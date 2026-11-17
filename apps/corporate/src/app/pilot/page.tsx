import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../components/abstract-brand-geometry';
import { PilotIntakeForm } from '../../components/pilot-intake-form';
import { pilotPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'Explore a Pilot — Ops Foundry',
  description:
    'Learn how an Ops Foundry pilot is scoped around a defined business problem across ten practical governance dimensions.',
  openGraph: {
    title: 'Explore a Pilot — Ops Foundry',
    description:
      'Learn how an Ops Foundry pilot is scoped around a defined business problem across ten practical governance dimensions.',
    type: 'website',
  },
};

export default function PilotPage() {
  const { hero, whyStartWithPilot, tenGovernanceDimensions, formSection } = pilotPageContent;

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
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
              <Heading
                as="h1"
                size="display"
                className="mb-6 text-foundry-dark tracking-tight leading-[1.08]"
              >
                {hero.title}
              </Heading>
              <Text
                size="lg"
                tone="default"
                className="mb-5 font-medium leading-relaxed"
              >
                {hero.lead}
              </Text>
              <Text
                size="base"
                tone="secondary"
                className="mb-8 leading-relaxed"
              >
                {hero.supporting}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a href="#pilot-brief-form" className="inline-flex">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Prepare Pilot Brief
                  </Button>
                </a>
                <Link href="/services" className="inline-flex">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Compare Service Lines
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Why Start With a Scoped Pilot */}
        <Section tone="canvas" spacing="lg" border="bottom" className="bg-foundry-muted">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <Heading as="h2" size="xl" className="text-foundry-dark">
                  {whyStartWithPilot.heading}
                </Heading>
              </div>
              <div className="lg:col-span-7 space-y-6">
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
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Ten Required Governance Dimensions */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl mb-12">
              <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                {tenGovernanceDimensions.heading}
              </Heading>
              <Text size="lg" tone="secondary" className="leading-relaxed">
                {tenGovernanceDimensions.intro}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
              {tenGovernanceDimensions.dimensions.map((item) => (
                <article
                  key={item.number}
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
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Pilot Consultation Brief Form (Client-Side Validation UI) */}
        <Section id="pilot-brief-form" tone="pure" spacing="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="mb-10">
                <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                  {formSection.heading}
                </Heading>
                <Text size="base" tone="secondary" className="leading-relaxed">
                  {formSection.intro}
                </Text>
              </div>

              <PilotIntakeForm />
            </div>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
