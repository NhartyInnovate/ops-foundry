import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import {
  Award,
  ArrowRight,
  ShieldCheck,
  FileText,
  CreditCard,
  HelpCircle,
  Lock,
  Layers,
} from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { StatusBadge } from '../../components/status-badge';
import {
  scholarshipApplicationRoutes,
  scholarshipDirectoryNotice,
} from '../../content/scholarships';
import { tuitionAndScholarshipsPageContent } from '../../content/supporting-pages';
import { plannedAcademyProgrammes } from '../../content/programmes';

export const metadata: Metadata = {
  title: 'Tuition & Scholarships — Ops Foundry Academy',
  description:
    'Clear, transparent financial information regarding Ops Foundry Academy programme tuition, upfront fee disclosure standards, and approved partner scholarship opportunities.',
  alternates: {
    canonical: '/tuition-scholarships',
  },
  openGraph: {
    title: 'Tuition & Scholarships — Ops Foundry Academy',
    description:
      'Clear, transparent financial information so you can plan with confidence. Understand upfront tuition terms and partner funding opportunities.',
    type: 'website',
  },
};

export default function TuitionAndScholarshipsPage() {
  const { hero, tuitionOverview, scholarshipOverview } = tuitionAndScholarshipsPageContent;

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
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>Financial Transparency &amp; Funding</span>
              </div>
              <Heading
                as="h1"
                size="display"
                className="text-foundry-slate tracking-tight leading-[1.08]"
              >
                {hero.title}
              </Heading>
              <Text
                size="xl"
                tone="default"
                className="text-foundry-slate font-medium leading-relaxed"
              >
                {hero.lead}
              </Text>
              <Text
                size="base"
                tone="secondary"
                className="leading-relaxed"
              >
                {hero.supporting}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/admissions">
                    <span>Admissions Guide</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/pathways">Explore Career Pathways</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Understanding Programme Tuition & Disclosure Standards */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                  Pricing Transparency
                </span>
                <SectionHeading
                  title={tuitionOverview.heading}
                  description={tuitionOverview.body}
                />

                <div className="rounded-2xl border border-academy-purple-border/60 bg-academy-light-purple/30 p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                    <p className="font-display text-xs font-bold text-foundry-slate">
                      Official Governance Notice
                    </p>
                  </div>
                  <p className="text-xs text-foundry-secondary leading-relaxed">
                    {tuitionOverview.statusNotice}
                  </p>
                </div>
              </div>

              {/* What Published Programme Fees Must Disclose */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-academy-primary">
                  What Published Programme Fees Disclose
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-foundry-canvas p-5 border border-foundry-border space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <Heading as="h4" size="sm" className="font-bold text-foundry-slate">
                        Total Upfront Fee
                      </Heading>
                    </div>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      Every published course displays its full programme fee upfront with no hidden registration surcharges.
                    </Text>
                  </div>

                  <div className="rounded-2xl bg-foundry-canvas p-5 border border-foundry-border space-y-2">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <Heading as="h4" size="sm" className="font-bold text-foundry-slate">
                        Full Curriculum Inclusions
                      </Heading>
                    </div>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      Tuition covers all Ops Foundry Core modules, specialized pathway briefs, assessments, and credentials.
                    </Text>
                  </div>

                  <div className="rounded-2xl bg-foundry-canvas p-5 border border-foundry-border space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <Heading as="h4" size="sm" className="font-bold text-foundry-slate">
                        Payment Arrangements
                      </Heading>
                    </div>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      Flexible installment plans and payment schedules are detailed prior to enrolment confirmation.
                    </Text>
                  </div>

                  <div className="rounded-2xl bg-foundry-canvas p-5 border border-foundry-border space-y-2">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <Heading as="h4" size="sm" className="font-bold text-foundry-slate">
                        Refund &amp; Deferral Terms
                      </Heading>
                    </div>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      Clear, documented policies define cohort withdrawal windows, deferral criteria, and fee protection.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Launch Programmes Fee Status Overview */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                Programme Catalogue Status
              </span>
              <SectionHeading
                title="Launch Programmes Tuition Status"
                description="Official fee schedules for our three initial programmes are currently undergoing institutional sign-off."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plannedAcademyProgrammes.map((prog) => (
                <div
                  key={prog.slug}
                  className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-3 border-b border-foundry-border">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-academy-primary">
                        {prog.slotLabel}
                      </span>
                      <StatusBadge status="upcoming" label="Fee in Scoping" size="sm" />
                    </div>
                    <Heading as="h3" size="sm" className="text-foundry-slate">
                      {prog.title}
                    </Heading>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      {prog.summary}
                    </Text>
                  </div>

                  <div className="pt-3 border-t border-foundry-border space-y-2">
                    <div className="flex items-center justify-between text-xs text-foundry-secondary">
                      <span>Tuition Status:</span>
                      <span className="font-semibold text-foundry-slate">Under Final Sign-Off</span>
                    </div>
                    <div className="pt-1">
                      <Link
                        href={`/pathways/${prog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-academy-primary hover:underline"
                      >
                        <span>View Aligned Career Pathway</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Scholarships & Funding Opportunities Directory */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                Funding Schemes
              </span>
              <SectionHeading
                title={scholarshipOverview.heading}
                description={scholarshipOverview.body}
              />
            </div>

            {/* Publication Governance Notice */}
            <div
              role="note"
              aria-label="Scholarship publication governance"
              className="rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 mb-8 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3"
            >
              <Lock className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-foundry-slate mb-1">
                  {scholarshipDirectoryNotice.heading}
                </p>
                <p className="text-foundry-secondary text-xs sm:text-sm leading-relaxed mb-2">
                  {scholarshipDirectoryNotice.body}
                </p>
                <p className="text-foundry-secondary text-xs sm:text-sm leading-relaxed">
                  {scholarshipDirectoryNotice.scopingNotice}
                </p>
              </div>
            </div>

            {/* Approved Scholarship Application Routes (Master Brief Section 07) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {scholarshipApplicationRoutes.map((route) => (
                <article
                  key={route.id}
                  className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-foundry-border">
                      <span className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
                        <span>Application Route</span>
                      </span>
                      <StatusBadge status="upcoming" label="Under Scoping" size="sm" />
                    </div>
                    <Heading as="h3" size="sm" className="text-foundry-slate">
                      {route.title}
                    </Heading>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      {route.summary}
                    </Text>
                    <div className="rounded-xl bg-foundry-canvas p-4 border border-foundry-border space-y-2">
                      <p className="text-xs font-bold text-foundry-slate">Route Characteristics:</p>
                      <ul className="space-y-1.5 text-xs text-foundry-secondary">
                        {route.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-academy-primary shrink-0 mt-1.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-foundry-border flex items-center justify-between text-xs">
                    <span className="text-foundry-secondary">Status:</span>
                    <span className="font-semibold text-foundry-slate">{route.statusLabel}</span>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 5. Separate Admissions vs. Funding Decisions */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                Institutional Policy
              </span>
              <SectionHeading
                title="Separate Admissions &amp; Scholarship Decisions"
                description="To ensure fairness and maintain academic standards, application to an Academy programme and application for scholarship funding are evaluated through separate decision processes."
              />
              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-3">
                <div className="space-y-1">
                  <p className="font-display text-sm font-bold text-foundry-slate">
                    Admission Offer
                  </p>
                  <p className="text-xs text-foundry-secondary leading-relaxed">
                    Evaluated by the Admissions Committee based on applicant eligibility, analytical motivation, and practical assessment readiness.
                  </p>
                </div>
                <div className="space-y-1 pt-3 border-t border-gray-100">
                  <p className="font-display text-sm font-bold text-foundry-slate">
                    Scholarship Award
                  </p>
                  <p className="text-xs text-foundry-secondary leading-relaxed">
                    Evaluated by the Scholarship Committee and participating funding partners based on specific eligibility criteria, socio-economic factors, and available quota allocations.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 6. Final CTA */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                Plan your digital operations journey with confidence.
              </Heading>
              <Text
                size="lg"
                tone="inverseMuted"
                className="max-w-2xl mx-auto leading-relaxed"
              >
                Review our admissions requirements, explore our career pathways, or get in touch with our team for guidance.
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/admissions">
                    <span>Admissions Guide</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg" className="w-full sm:w-auto">
                  <Link href="/pathways">Explore Pathways</Link>
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
