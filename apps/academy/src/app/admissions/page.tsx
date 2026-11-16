import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button, Badge } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { admissionsPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'Admissions — Ops Foundry Academy',
  description:
    'Learn how the Ops Foundry Academy admissions process works, how to explore available programmes, and how applicants select their preferred programme track.',
  alternates: {
    canonical: '/admissions',
  },
  openGraph: {
    title: 'Admissions — Ops Foundry Academy',
    description:
      'Learn how the Ops Foundry Academy admissions process works, how to explore available programmes, and how applicants select their preferred programme track.',
    type: 'website',
  },
};

export default function AdmissionsPage() {
  const {
    hero,
    applicationStatusBanner,
    journeySteps,
    preferredProgrammePolicy,
    applicationGuidance,
    plannedApplicationFieldsPreview,
    cta,
  } = admissionsPageContent;

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
                  <Link href="/programmes">
                    <span>Explore Programmes</span>
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

        {/* 2. Honest Admissions Status Banner */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div
              role="status"
              aria-label="Admissions status notice"
              className="rounded-2xl border border-foundry-orange/30 bg-foundry-canvas p-7 lg:p-9 shadow-xs space-y-4"
            >
              <Badge variant="brand">{applicationStatusBanner.badge}</Badge>
              <Heading as="h2" size="lg" className="text-foundry-slate">
                {applicationStatusBanner.heading}
              </Heading>
              <Text size="base" tone="secondary" className="leading-relaxed max-w-3xl">
                {applicationStatusBanner.body}
              </Text>
            </div>
          </Container>
        </Section>

        {/* 3. How the Admissions Journey Works */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title={journeySteps.heading}
              description={journeySteps.intro}
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {journeySteps.steps.map((item) => (
                <article
                  key={item.step}
                  className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-foundry-border">
                      <Heading as="h3" size="md" className="text-foundry-slate">
                        {item.title}
                      </Heading>
                      <span className="inline-flex items-center rounded-full bg-foundry-slate px-3.5 py-1 text-xs font-semibold text-white shrink-0">
                        {item.step}
                      </span>
                    </div>
                    <Text size="sm" tone="secondary" className="leading-relaxed">
                      {item.description}
                    </Text>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Selecting Your Preferred Programme & Application Guidance */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5 space-y-5">
                <Heading as="h2" size="xl" className="text-foundry-slate">
                  {preferredProgrammePolicy.heading}
                </Heading>
                {preferredProgrammePolicy.paragraphs.map((paragraph) => (
                  <Text
                    key={paragraph}
                    size="base"
                    tone="secondary"
                    className="leading-relaxed"
                  >
                    {paragraph}
                  </Text>
                ))}
                <div className="pt-2">
                  <Button asChild variant="outline" size="md">
                    <Link href="/programmes">Compare Planned Programme Tracks</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div>
                  <Heading as="h2" size="lg" className="text-foundry-slate mb-2">
                    {applicationGuidance.heading}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {applicationGuidance.intro}
                  </Text>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {applicationGuidance.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border"
                    >
                      <Heading as="h3" size="sm" className="text-foundry-slate mb-2">
                        {item.title}
                      </Heading>
                      <Text size="sm" tone="secondary" className="leading-relaxed">
                        {item.body}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 5. What the Application Form Will Cover (Honest Preview) */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-4xl mx-auto rounded-2xl bg-white p-7 sm:p-9 lg:p-11 border border-foundry-border shadow-xs space-y-8">
              <div className="space-y-3">
                <Heading as="h2" size="lg" className="text-foundry-slate">
                  {plannedApplicationFieldsPreview.heading}
                </Heading>
                <Text size="base" tone="secondary" className="leading-relaxed">
                  {plannedApplicationFieldsPreview.intro}
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {plannedApplicationFieldsPreview.fields.map((field, idx) => (
                  <div
                    key={field.label}
                    className="rounded-xl bg-foundry-canvas p-5 border border-foundry-border"
                  >
                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foundry-slate text-white font-display font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="font-display text-sm font-bold text-foundry-slate mb-1.5">
                      {field.label}
                    </h3>
                    <p className="text-xs text-foundry-secondary leading-relaxed">
                      {field.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div
                role="note"
                aria-label="Application submission status"
                className="rounded-xl border border-foundry-border bg-foundry-canvas px-5 py-4 text-xs sm:text-sm text-foundry-secondary leading-relaxed"
              >
                {plannedApplicationFieldsPreview.statusNote}
              </div>
            </div>
          </Container>
        </Section>

        {/* 6. Conversion CTA */}
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
