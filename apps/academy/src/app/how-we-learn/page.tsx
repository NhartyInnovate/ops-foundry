import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { howWeLearnPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'How We Learn — Ops Foundry Academy',
  description:
    'Discover the six learning principles that guide Ops Foundry Academy: Practical Learning, Structured Development, Learning by Doing, Relevant Skills, Application of Knowledge, and Continuous Improvement.',
  alternates: {
    canonical: '/how-we-learn',
  },
  openGraph: {
    title: 'How We Learn — Ops Foundry Academy',
    description:
      'Discover the six learning principles that guide Ops Foundry Academy: Practical Learning, Structured Development, Learning by Doing, Relevant Skills, Application of Knowledge, and Continuous Improvement.',
    type: 'website',
  },
};

export default function HowWeLearnPage() {
  const {
    hero,
    whyPracticalLearningMatters,
    sixPrinciplesDetailed,
    programmeDeliveryGovernance,
    cta,
  } = howWeLearnPageContent;

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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
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
                  className="text-foundry-slate font-medium leading-relaxed max-w-2xl"
                >
                  {hero.lead}
                </Text>
                <Text
                  size="base"
                  tone="secondary"
                  className="max-w-2xl leading-relaxed"
                >
                  {hero.supporting}
                </Text>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                    <Link href="/programmes">
                      <span>Explore Programmes</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/admissions">Admissions Guide</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="relative rounded-2xl overflow-hidden border border-foundry-border bg-white shadow-sm">
                  <div className="aspect-[16/11] w-full overflow-hidden bg-gray-100">
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

        {/* 2. Why Practical Learning Matters */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <Heading as="h2" size="xl" className="text-foundry-slate">
                  {whyPracticalLearningMatters.heading}
                </Heading>
              </div>
              <div className="lg:col-span-7 space-y-5">
                {whyPracticalLearningMatters.paragraphs.map((paragraph) => (
                  <Text
                    key={paragraph}
                    size="base"
                    tone="secondary"
                    className="leading-relaxed"
                  >
                    {paragraph}
                  </Text>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. The Six Principles of Academy Learning */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title={sixPrinciplesDetailed.heading}
              description={sixPrinciplesDetailed.intro}
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {sixPrinciplesDetailed.principles.map((principle) => (
                <article
                  key={principle.number}
                  className="flex flex-col justify-between rounded-2xl bg-white p-7 lg:p-9 border border-foundry-border shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-foundry-border">
                      <Heading as="h3" size="lg" className="text-foundry-slate">
                        {principle.title}
                      </Heading>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foundry-slate text-white font-display font-bold text-xs shrink-0">
                        {principle.number}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-foundry-slate mb-3 leading-snug">
                      {principle.summary}
                    </p>

                    <Text size="sm" tone="secondary" className="mb-6 leading-relaxed">
                      {principle.detail}
                    </Text>
                  </div>

                  <div className="pt-4 border-t border-foundry-border">
                    <p className="text-xs font-semibold text-foundry-slate mb-1">
                      What This Means in Practice:
                    </p>
                    <p className="text-xs text-foundry-secondary leading-relaxed">
                      {principle.inPractice}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Programme Format & Governance Notice */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-6">
              <Heading as="h2" size="xl" className="text-foundry-slate">
                {programmeDeliveryGovernance.heading}
              </Heading>

              {programmeDeliveryGovernance.paragraphs.map((paragraph) => (
                <Text
                  key={paragraph}
                  size="base"
                  tone="secondary"
                  className="leading-relaxed"
                >
                  {paragraph}
                </Text>
              ))}

              <div
                role="note"
                aria-label="Programme format publication notice"
                className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border text-xs sm:text-sm text-foundry-secondary leading-relaxed"
              >
                {programmeDeliveryGovernance.notice}
              </div>
            </div>
          </Container>
        </Section>

        {/* 5. Conversion CTA */}
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
