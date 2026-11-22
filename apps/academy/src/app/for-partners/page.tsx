import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import {
  Handshake,
  ArrowRight,
  Award,
  Laptop,
  BookOpen,
  Briefcase,
  Layers,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { PartnershipEnquiryForm } from '../../components/partnership-enquiry-form';
import { forPartnersPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'For Partners — Ops Foundry Academy',
  description:
    'Partner with Ops Foundry Academy to develop practical, job-ready operational talent through scholarships, equipment, curriculum briefs, internships, and custom cohorts.',
  alternates: {
    canonical: '/for-partners',
  },
  openGraph: {
    title: 'For Partners — Ops Foundry Academy',
    description:
      'Partner with us to develop practical talent. Expand access to operational careers, technology, and modern digital business workflows.',
    type: 'website',
  },
};

export default function ForPartnersPage() {
  const { hero, headline, body, partnershipTypes } = forPartnersPageContent;

  const icons = [Award, Laptop, BookOpen, Briefcase, Layers];

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
                <Handshake className="h-4 w-4" aria-hidden="true" />
                <span>Institutional Partnerships</span>
              </div>
              <Heading
                as="h1"
                size="display"
                className="text-foundry-slate tracking-tight leading-[1.08]"
              >
                {headline}
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
                {body}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <a href="#partner-enquiry-form">
                    <span>Submit Partner Enquiry</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/about">About the Academy</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Five Collaboration Areas */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                Collaboration Modes
              </span>
              <SectionHeading
                title={partnershipTypes.heading}
                description={partnershipTypes.intro}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnershipTypes.types.map((type, idx) => {
                const IconComponent = icons[idx % icons.length];
                return (
                  <div
                    key={type.id}
                    className="rounded-2xl bg-foundry-canvas p-7 border border-foundry-border shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-foundry-border">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-academy-light-purple text-academy-primary text-xs font-bold font-display">
                          0{idx + 1}
                        </span>
                        <IconComponent className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      </div>
                      <Heading as="h3" size="sm" className="text-foundry-slate">
                        {type.title}
                      </Heading>
                      <Text size="xs" tone="secondary" className="leading-relaxed">
                        {type.description}
                      </Text>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-academy-primary uppercase tracking-wider">
                        Active Partnership Track
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* 3. Operational Standards & Quality Commitments */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="rounded-2xl border border-academy-purple-border/60 bg-academy-light-purple/30 p-6 lg:p-8 space-y-3 max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-academy-primary" aria-hidden="true" />
                <Heading as="h3" size="sm" className="text-foundry-slate">
                  Commitment to Quality &amp; Governance
                </Heading>
              </div>
              <Text size="xs" tone="secondary" className="leading-relaxed">
                Ops Foundry Academy partners with organizations that share our belief in disciplined execution and verified competence. We do not publish speculative logos or partner affiliations prior to formal agreement execution. All scholarship and device sponsorships are governed by formal institutional agreements and audited reporting.
              </Text>
            </div>
          </Container>
        </Section>

        {/* 4. Frontend Partnership Enquiry Form */}
        <Section id="partner-enquiry-form" tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                  Get in Touch
                </span>
                <Heading as="h2" size="xl" className="text-foundry-slate">
                  Discuss a Partnership
                </Heading>
                <Text size="sm" tone="secondary" className="max-w-xl mx-auto leading-relaxed">
                  Tell us how your organization would like to collaborate. Our admissions and partnerships team will review your enquiry and schedule an exploratory discussion.
                </Text>
              </div>

              {/* Form Component */}
              <PartnershipEnquiryForm />
            </div>
          </Container>
        </Section>

        {/* 5. Final CTA */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                Empowering the next generation of operational talent.
              </Heading>
              <Text
                size="lg"
                tone="inverseMuted"
                className="max-w-2xl mx-auto leading-relaxed"
              >
                Explore our training programmes, learn how our curricula mirror live business operations, or review our learning principles.
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/pathways">
                    <span>Explore Career Pathways</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg" className="w-full sm:w-auto">
                  <Link href="/how-we-learn">How Learning Works</Link>
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
