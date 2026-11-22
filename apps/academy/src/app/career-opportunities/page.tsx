import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import {
  Briefcase,
  ArrowRight,
  ShieldAlert,
  Building2,
  Users,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { ReadinessFramework } from '../../components/readiness-framework';
import { careerOpportunitiesPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'Career Opportunities & Placement — Ops Foundry Academy',
  description:
    'Understand how Ops Foundry Academy prepares learners for potential operational roles, the 5-step career opportunity process, and our clear governance standards.',
  alternates: {
    canonical: '/career-opportunities',
  },
  openGraph: {
    title: 'Career Opportunities & Placement — Ops Foundry Academy',
    description:
      'Skills developed for real work. Opportunities earned through proven readiness. Learn how readiness connects to operational roles.',
    type: 'website',
  },
};

export default function CareerOpportunitiesPage() {
  const { hero, ecosystemConnection, partnerEmployers } = careerOpportunitiesPageContent;

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
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                <span>Career Progression &amp; Governance</span>
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
                  <Link href="/pathways">
                    <span>Explore Career Pathways</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/admissions">Admissions Guide</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. The 5-Step Opportunity Process (ReadinessFramework) */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <ReadinessFramework />
          </Container>
        </Section>

        {/* 3. Explicit Governance: Training vs. Certification vs. Readiness vs. Hiring */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                Decision Governance
              </span>
              <SectionHeading
                title="Four Distinct Operational Decisions"
                description="To ensure clarity for learners and employers, Ops Foundry Academy strictly distinguishes between academic progression and hiring decisions."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-academy-light-purple text-academy-primary text-xs font-bold font-display">
                  01
                </span>
                <Heading as="h3" size="sm" className="font-bold text-foundry-slate">
                  Training Completion
                </Heading>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  Finishing coursework, practical exercises, and pathway learning modules confirms instructional participation.
                </Text>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-academy-light-purple text-academy-primary text-xs font-bold font-display">
                  02
                </span>
                <Heading as="h3" size="sm" className="font-bold text-foundry-slate">
                  Certification
                </Heading>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  Passing proctored practical assessments confirms that demonstrable capability has been independently verified.
                </Text>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-academy-light-purple text-academy-primary text-xs font-bold font-display">
                  03
                </span>
                <Heading as="h3" size="sm" className="font-bold text-foundry-slate">
                  Deployment Readiness
                </Heading>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  Meeting role-specific quality, documentation discipline, and workplace habits qualifies graduates for recruitment referral.
                </Text>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-academy-light-purple text-academy-primary text-xs font-bold font-display">
                  04
                </span>
                <Heading as="h3" size="sm" className="font-bold text-foundry-slate">
                  Hiring Decision
                </Heading>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  Recruiting organizations make independent hiring decisions based on open vacancies, commercial capacity, and interview evaluation.
                </Text>
              </div>
            </div>
          </Container>
        </Section>

        {/* 4. Ecosystem Alignment & Employer Collaboration */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Internal Recruitment Connection */}
              <div className="rounded-2xl bg-foundry-canvas p-7 lg:p-8 border border-foundry-border space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-academy-primary" aria-hidden="true" />
                  <Heading as="h3" size="sm" className="text-foundry-slate">
                    {ecosystemConnection.heading}
                  </Heading>
                </div>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {ecosystemConnection.body}
                </Text>
              </div>

              {/* Partner Employer Collaboration */}
              <div className="rounded-2xl bg-foundry-canvas p-7 lg:p-8 border border-foundry-border space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-academy-primary" aria-hidden="true" />
                  <Heading as="h3" size="sm" className="text-foundry-slate">
                    {partnerEmployers.heading}
                  </Heading>
                </div>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {partnerEmployers.body}
                </Text>
              </div>
            </div>

            {/* Important Employment Reality Notice */}
            <div
              role="note"
              aria-label="Important employment reality notice"
              className="rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3 mt-8"
            >
              <ShieldAlert className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-foundry-slate mb-1">
                  Important Notice
                </p>
                <p className="text-foundry-secondary text-xs sm:text-sm">
                  Academy admission, certification and deployment readiness do not guarantee employment or paid placement.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 5. Final CTA */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                Build real capability for modern business operations.
              </Heading>
              <Text
                size="lg"
                tone="inverseMuted"
                className="max-w-2xl mx-auto leading-relaxed"
              >
                Discover the work done across our career pathways or explore our upcoming training programmes.
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/pathways">
                    <span>Explore Career Pathways</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg" className="w-full sm:w-auto">
                  <Link href="/programmes">Explore Programmes</Link>
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
