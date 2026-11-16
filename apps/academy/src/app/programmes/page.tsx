import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { ProgrammeCard } from '../../components/programme-card';
import {
  plannedAcademyProgrammes,
  programmesCataloguePageContent,
} from '../../content/programmes';

export const metadata: Metadata = {
  title: 'Programmes — Ops Foundry Academy',
  description:
    'Explore the planned practical learning programmes at Ops Foundry Academy, structured around real-world capability and hands-on application.',
  alternates: {
    canonical: '/programmes',
  },
  openGraph: {
    title: 'Programmes — Ops Foundry Academy',
    description:
      'Explore the planned practical learning programmes at Ops Foundry Academy, structured around real-world capability and hands-on application.',
    type: 'website',
  },
};

export default function ProgrammesPage() {
  const { hero, publicationNotice, sharedStandards, cta } =
    programmesCataloguePageContent;

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-slate">
      <AcademyHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Editorial Hero */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
        >
          <Container>
            <div className="max-w-3xl space-y-6">
              <Heading
                as="h1"
                size="display"
                className="text-foundry-slate tracking-tight leading-[1.08]"
              >
                {hero.title}
              </Heading>
              <Text
                size="lg"
                tone="default"
                className="text-foundry-slate font-medium leading-relaxed"
              >
                {hero.lead}
              </Text>
              <Text size="base" tone="secondary" className="leading-relaxed">
                {hero.supporting}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/admissions">
                    <span>Explore Admissions</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/how-we-learn">How We Learn</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Programme Catalogue & Honest Publication Status */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div
              role="note"
              aria-label="Programme publication status"
              className="mb-12 rounded-2xl border border-foundry-orange/30 bg-foundry-canvas p-6 lg:p-8 shadow-xs"
            >
              <Heading as="h2" size="sm" className="text-foundry-slate mb-2">
                {publicationNotice.heading}
              </Heading>
              <Text size="sm" tone="secondary" className="leading-relaxed">
                {publicationNotice.body}
              </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {plannedAcademyProgrammes.map((programme) => (
                <ProgrammeCard key={programme.courseId} programme={programme} />
              ))}
            </div>
          </Container>
        </Section>

        {/* 3. Shared Standards Across All Academy Programmes */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title={sharedStandards.heading}
              description={sharedStandards.intro}
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {sharedStandards.items.map((item, idx) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-foundry-slate text-white font-display font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <Heading as="h3" size="sm" className="text-foundry-slate mb-3">
                    {item.title}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {item.description}
                  </Text>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Conversion CTA */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
              <Heading as="h2" size="xl" tone="inverse" className="mb-4">
                {cta.heading}
              </Heading>
              <Text
                size="lg"
                tone="inverseMuted"
                className="mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                {cta.body}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href={cta.primaryHref}>
                    <span>{cta.primaryLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="inverseOutline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={cta.secondaryHref}>{cta.secondaryLabel}</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <AcademyFooter />
    </div>
  );
}
