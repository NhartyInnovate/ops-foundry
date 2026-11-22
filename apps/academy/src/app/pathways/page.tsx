import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { Compass, ArrowRight, Layers, GraduationCap, ShieldCheck } from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { PathwayCard } from '../../components/pathway-card';
import { careerPathways } from '../../content/pathways';

export const metadata: Metadata = {
  title: 'Career Pathways — Ops Foundry Academy',
  description:
    'Explore the career pathways at Ops Foundry Academy: Growth Operations, Content Operations, Web & Digital Operations, and Customer & Community Operations.',
  alternates: {
    canonical: '/pathways',
  },
  openGraph: {
    title: 'Career Pathways — Ops Foundry Academy',
    description:
      'Explore practical digital and AI-enabled business operations pathways. Discover the skills required and find the kind of work that fits you.',
    type: 'website',
  },
};

export default function PathwaysDirectoryPage() {
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
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-academy-primary font-display">
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span>Career Pathways Directory</span>
              </div>
              <Heading
                as="h1"
                size="display"
                className="text-foundry-slate tracking-tight leading-[1.08]"
              >
                Find the kind of work that fits you.
              </Heading>
              <Text
                size="xl"
                tone="default"
                className="text-foundry-slate font-medium leading-relaxed"
              >
                Not every digital career requires software engineering. Explore the work behind growing businesses, the skills each role requires, and the qualities that can help you thrive.
              </Text>
              <Text
                size="base"
                tone="secondary"
                className="leading-relaxed"
              >
                A career pathway describes the type of work a person may pursue and the operational disciplines required to excel. Pathways are distinct from our training programmes, which deliver the structured curricula, schedules, and assessments needed to develop those capabilities.
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/programmes">
                    <span>Explore Training Programmes</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/how-we-learn">How Learning Works</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Pathways vs. Programmes Governance Distinction */}
        <Section tone="pure" spacing="md" border="bottom">
          <Container>
            <div className="rounded-2xl border border-academy-purple-border/60 bg-academy-light-purple/30 p-6 lg:p-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-academy-primary">
                    Architectural Distinction
                  </p>
                </div>
                <Heading as="h2" size="sm" className="text-foundry-slate">
                  Career Pathways vs. Training Programmes
                </Heading>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  A <strong>Career Pathway</strong> represents the occupational profile, day-to-day workflow responsibilities, and qualitative qualities of real operational roles. A <strong>Programme</strong> is the actual structured training course with scheduled cohort intakes, weekly time commitments, and tuition terms.
                </Text>
              </div>

              <div className="rounded-xl bg-white p-5 border border-foundry-border space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-foundry-slate" aria-hidden="true" />
                  <p className="font-display text-xs font-bold text-foundry-slate">
                    Ready to enrol in a cohort?
                  </p>
                </div>
                <p className="text-xs text-foundry-secondary leading-relaxed">
                  Review our 3 launch programmes in Growth Operations, Content Operations, and Web &amp; Digital Operations to compare curricula and admissions requirements.
                </p>
                <div className="pt-1">
                  <Link
                    href="/programmes"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-academy-primary hover:underline"
                  >
                    <span>View Programmes Overview</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. The 4 Career Pathways Grid */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title="Available Operational Pathways"
              description="Each pathway develops people for practical roles in modern business operations, combining digital fluency, structured workflows, and responsible AI use."
              className="mb-10 lg:mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {careerPathways.map((pathway) => (
                <PathwayCard key={pathway.slug} pathway={pathway} />
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Career Readiness & Hiring Reality */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-4">
              <SectionHeading
                title="Training Connected to Real Operations"
                description="Ops Foundry develops talent primarily for our own managed services operations and secondarily for partner employers seeking structured digital execution."
              />
              <Text size="sm" tone="secondary" className="leading-relaxed">
                Completing an Academy pathway or training programme provides verified practical evidence of what you can do. However, training, certification, deployment readiness and hiring are separate decisions. Vacancies, competency benchmarks, interviews and employer selection determine hiring.
              </Text>

              {/* Employment Reality Notice */}
              <div
                role="note"
                aria-label="Important employment reality notice"
                className="rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3 mt-4"
              >
                <ShieldCheck className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-bold text-foundry-slate mb-1">
                    Clear Institutional Expectation
                  </p>
                  <p className="text-foundry-secondary text-xs sm:text-sm">
                    Academy admission, certification and deployment readiness do not guarantee employment or paid placement.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 5. Final CTA */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                Take the next step in your digital operations career.
              </Heading>
              <Text
                size="lg"
                tone="inverseMuted"
                className="max-w-2xl mx-auto leading-relaxed"
              >
                Review our planned training programmes, understand admissions requirements, or explore our learning principles.
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/programmes">
                    <span>Explore Programmes</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg" className="w-full sm:w-auto">
                  <Link href="/admissions">Admissions Guide</Link>
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
