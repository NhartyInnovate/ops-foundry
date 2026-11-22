import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import {
  ArrowRight,
  Compass,
  CheckCircle2,
  Building2,
  GraduationCap,
  Users,
  Laptop,
  BookOpen,
  Briefcase,
  Layers,
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  Award,
  Sparkles,
} from 'lucide-react';
import { AcademyHeader } from '../components/academy-header';
import { AcademyHero } from '../components/academy-hero';
import { SectionHeading } from '../components/section-heading';
import { LearningJourneyStepper } from '../components/learning-journey-stepper';
import { PathwayCard } from '../components/pathway-card';
import { ReadinessFramework } from '../components/readiness-framework';
import { AcademyFooter } from '../components/academy-footer';
import { careerPathways } from '../content/pathways';
import {
  homepageHeroSection,
  homepageWhyAcademyExistsSection,
  homepageLearningPathwaySection,
  homepageExplorePathwaysSection,
  homepageCareerOpportunitiesSection,
  homepageAdmissionsFundingSection,
  homepageAboutOpsFoundrySection,
  homepagePartnershipsSection,
  homepageFinalCtaSection,
  admissionsPreviewContent,
} from '../content/homepage';
import { forPartnersPageContent } from '../content/supporting-pages';
import { getCorporateWebsiteLink } from '../content/site-config';

export const metadata: Metadata = {
  title: 'Ops Foundry Academy — Learn the skills. Prove what you can do. Build your career.',
  description:
    'Ops Foundry Academy prepares people for practical roles in modern business operations through hands-on training, verified capability, and structured workflows.',
};

export default function AcademyHomePage() {
  const corporateLink = getCorporateWebsiteLink();

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-slate">
      {/* Academy Header & Navigation */}
      <AcademyHeader />

      <main id="main-content" className="flex-1">
        {/* ================================================================= */}
        {/* SECTION 1 — HERO                                                  */}
        {/* ================================================================= */}
        <AcademyHero />

        {/* ================================================================= */}
        {/* SECTION 2 — WHY THIS ACADEMY EXISTS                              */}
        {/* ================================================================= */}
        <Section
          id={homepageWhyAcademyExistsSection.id}
          tone="pure"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Heading & Core Positioning */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Purpose &amp; Foundations</span>
                </span>
                <Heading as="h2" size="xl" className="text-foundry-slate">
                  {homepageWhyAcademyExistsSection.headline}
                </Heading>
                <Text
                  size="lg"
                  tone="default"
                  className="text-foundry-slate font-medium leading-relaxed"
                >
                  Ops Foundry Academy develops people for practical digital and AI-enabled business operations.
                </Text>
              </div>

              {/* Right Column: Narrative & Governance Callout */}
              <div className="lg:col-span-7 space-y-6">
                <Text size="base" tone="secondary" className="leading-relaxed">
                  {homepageWhyAcademyExistsSection.body}
                </Text>

                <Text size="base" tone="secondary" className="leading-relaxed">
                  Training progresses from the foundational Ops Foundry Core—covering digital productivity, communication, structured workflows, responsible AI use and operational problem-solving—into specialized domain practice.
                </Text>

                {/* Expectations Note */}
                <div
                  role="note"
                  aria-label="Training and employment expectations"
                  className="rounded-2xl bg-foundry-canvas p-6 lg:p-7 border border-foundry-border space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-academy-primary shrink-0" aria-hidden="true" />
                    <Heading as="h3" size="sm" className="text-foundry-slate">
                      {homepageWhyAcademyExistsSection.governanceCommitment.heading}
                    </Heading>
                  </div>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {homepageWhyAcademyExistsSection.governanceCommitment.body}
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ================================================================= */}
        {/* SECTION 3 — THE LEARNING PATHWAY                                 */}
        {/* ================================================================= */}
        <Section
          id={homepageLearningPathwaySection.id}
          tone="canvas"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                How Learning Works
              </span>
              <SectionHeading
                title={homepageLearningPathwaySection.headline}
                description="Every learner progresses through four connected stages designed around the work done at Ops Foundry and across our partner ecosystem."
              />
            </div>

            {/* Reusable Learning Journey Stepper (4 Approved Stages) */}
            <LearningJourneyStepper />

            {/* Methodology Deep-Dive Banner */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-6 border border-foundry-border shadow-xs">
              <div className="space-y-1">
                <p className="font-display text-sm font-bold text-foundry-slate">
                  Curious about our learning methodology?
                </p>
                <p className="text-xs text-foundry-secondary">
                  Read our six core learning principles and how daily operational habits are developed.
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <Link href="/how-we-learn">
                  <span>See How Learning Works</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* ================================================================= */}
        {/* SECTION 4 — EXPLORE CAREER PATHWAYS                              */}
        {/* ================================================================= */}
        <Section
          id="career-pathways"
          tone="pure"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                Career Pathways
              </span>
              <SectionHeading
                title={homepageExplorePathwaysSection.headline}
                description={homepageExplorePathwaysSection.intro}
              />
            </div>

            {/* 4 Career Pathway Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {careerPathways.map((pathway) => (
                <PathwayCard key={pathway.slug} pathway={pathway} />
              ))}
            </div>

            {/* Pathways to Programmes Alignment Banner */}
            <div className="mt-12 rounded-2xl bg-foundry-canvas p-6 lg:p-8 border border-foundry-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <p className="font-display text-sm font-bold text-foundry-slate">
                  Upcoming Cohort Intakes &amp; Scoping
                </p>
                <p className="text-xs sm:text-sm text-foundry-secondary leading-relaxed">
                  Curriculum specifications and cohort schedules for our launch pathways are currently undergoing operational confirmation. Register your interest to receive announcements when cohort applications formally open.
                </p>
              </div>
              <Button asChild variant="primary" size="md" className="shrink-0">
                <Link href="/apply">
                  <span>Register Interest</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* ================================================================= */}
        {/* SECTION 5 — CAREER OPPORTUNITIES                                 */}
        {/* ================================================================= */}
        <Section
          id={homepageCareerOpportunitiesSection.id}
          tone="canvas"
          spacing="lg"
          border="bottom"
        >
          <Container>
            {/* Reusable Readiness Framework (5 Steps + Approved Disclaimer) */}
            <ReadinessFramework />

            {/* Pending Route Safety CTA for Career Opportunities */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-5 border border-foundry-border shadow-xs">
              <div className="space-y-1">
                <p className="font-display text-xs sm:text-sm font-bold text-foundry-slate">
                  Detailed Career Opportunities Guide
                </p>
                <p className="text-xs text-foundry-secondary">
                  Learn how our readiness requirements align with operational hiring across Ops Foundry and partner teams.
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <Link href="/career-opportunities">
                  <span>Understand Career Opportunities</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* ================================================================= */}
        {/* SECTION 6 — ADMISSIONS AND FUNDING                               */}
        {/* ================================================================= */}
        <Section
          id={homepageAdmissionsFundingSection.id}
          tone="pure"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Admissions Overview & Approved Positioning */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                    Admissions &amp; Funding
                  </span>
                  <SectionHeading
                    title={homepageAdmissionsFundingSection.headline}
                    description={homepageAdmissionsFundingSection.body}
                  />
                </div>

                {/* Approved Admissions Review Guidance from Master Brief Section 07 */}
                <div
                  role="note"
                  aria-label="Admissions review guidance"
                  className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border space-y-2"
                >
                  <Heading as="h3" size="sm" className="text-foundry-slate">
                    Admissions Review &amp; Assessment
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {admissionsPreviewContent.admissionsCopy}
                  </Text>
                </div>

                {/* Transparent Review Governance Note */}
                <div
                  role="note"
                  aria-label="Review governance note"
                  className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border space-y-2"
                >
                  <Heading as="h3" size="sm" className="text-foundry-slate">
                    Decision Statuses &amp; Communication
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {admissionsPreviewContent.governanceNotice}
                  </Text>
                  <p className="text-xs text-foundry-secondary pt-1">
                    Statuses: Admitted &middot; Conditional &middot; Waitlisted &middot; Declined &middot; Withdrawn
                  </p>
                </div>

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Button asChild variant="primary" size="md">
                    <Link href="/admissions">
                      <span>{homepageAdmissionsFundingSection.primaryCta.label}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="md">
                    <Link href="/tuition-scholarships">
                      <span>{homepageAdmissionsFundingSection.secondaryCta.label}</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Approved Tuition & Scholarships Information */}
              <div className="lg:col-span-7 space-y-5">
                {/* Tuition Transparency Card (Master Brief Section 07) */}
                <article className="rounded-2xl bg-white p-7 border border-foundry-border shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-foundry-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <span>Financial Information</span>
                    </span>
                    <span className="text-xs font-semibold text-academy-primary">
                      Upfront Terms
                    </span>
                  </div>
                  <Heading as="h3" size="md" className="text-foundry-slate">
                    Tuition Transparency
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {admissionsPreviewContent.tuitionCopy}
                  </Text>
                  <div className="rounded-xl bg-foundry-canvas p-4 border border-foundry-border text-xs text-foundry-secondary leading-relaxed">
                    Publication Notice: Official tuition amounts, installment schedules, and refund terms will be published directly on each programme page once cohort specifications are formally confirmed.
                  </div>
                </article>

                {/* Scholarships & Funding Card (Master Brief Section 07) */}
                <article className="rounded-2xl bg-white p-7 border border-foundry-border shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-foundry-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <span>Funding Opportunities</span>
                    </span>
                    <span className="text-xs font-semibold text-academy-primary">
                      Partner Support
                    </span>
                  </div>
                  <Heading as="h3" size="md" className="text-foundry-slate">
                    Scholarships &amp; Funding Opportunities
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {admissionsPreviewContent.scholarshipCopy}
                  </Text>
                  <div className="rounded-xl bg-foundry-canvas p-4 border border-foundry-border text-xs text-foundry-secondary leading-relaxed">
                    Partner Scheme Status: Sponsored funding routes, partner award allocations, and application requirements will appear alongside confirmed cohort announcements. Admission and scholarship decisions remain strictly separate.
                  </div>
                </article>
              </div>
            </div>
          </Container>
        </Section>

        {/* ================================================================= */}
        {/* SECTION 7 — ABOUT OPS FOUNDRY                                    */}
        {/* ================================================================= */}
        <Section
          id={homepageAboutOpsFoundrySection.id}
          tone="canvas"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                The Ecosystem
              </span>
              <SectionHeading
                title={homepageAboutOpsFoundrySection.headline}
                description={homepageAboutOpsFoundrySection.body}
              />
            </div>

            {/* Ecosystem Distinction Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {/* Entity 1: Ops Foundry (Corporate) */}
              <div className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-foundry-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <span>Corporate Business</span>
                    </span>
                    <span className="text-xs font-semibold text-foundry-slate">
                      For Businesses
                    </span>
                  </div>
                  <Heading as="h3" size="md" className="text-foundry-slate mb-3">
                    Ops Foundry
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed mb-6">
                    A managed services business that helps growing companies execute digital and business operations through skilled teams, structured processes, and AI-enabled tools across Get Online, Get Visible, and Get Customers.
                  </Text>
                </div>
                <div className="pt-4 border-t border-foundry-border">
                  <a
                    href={corporateLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
                  >
                    <span>Discover Ops Foundry</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Entity 2: Ops Foundry Academy (Learning Platform) */}
              <div className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-foundry-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                      <span>Learning Platform</span>
                    </span>
                    <span className="text-xs font-semibold text-foundry-slate">
                      For Learners &amp; Partners
                    </span>
                  </div>
                  <Heading as="h3" size="md" className="text-foundry-slate mb-3">
                    Ops Foundry Academy
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed mb-6">
                    The learning platform that develops operational capabilities for Ops Foundry’s operating model and for related roles with partner employers. Built around disciplined execution, verified capability, and modern workflows.
                  </Text>
                </div>
                <div className="pt-4 border-t border-foundry-border">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foundry-slate hover:text-academy-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
                  >
                    <span>About the Academy</span>
                    <ArrowRight className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Institutional Distinction Notice */}
            <div
              role="note"
              aria-label="Institutional distinction notice"
              className="rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3"
            >
              <ShieldAlert className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-foundry-slate mb-1">Clear Institutional Distinction</p>
                <p className="text-foundry-secondary text-xs sm:text-sm">
                  Ops Foundry Academy is an educational and skill-development platform. Enrolling in or completing an Academy programme does not constitute employment with Ops Foundry or a guarantee of job placement.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* ================================================================= */}
        {/* SECTION 8 — PARTNERSHIPS                                         */}
        {/* ================================================================= */}
        <Section
          id={homepagePartnershipsSection.id}
          tone="pure"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                Partnership Opportunities
              </span>
              <SectionHeading
                title={homepagePartnershipsSection.headline}
                description={homepagePartnershipsSection.body}
              />
            </div>

            {/* 5 Collaboration Areas (Master Brief Section 08) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {forPartnersPageContent.partnershipTypes.types.map((type, idx) => (
                <div
                  key={type.id}
                  className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-foundry-slate text-white text-xs font-bold font-display">
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-foundry-secondary">
                        Collaboration Area
                      </span>
                    </div>
                    <Heading as="h4" size="sm" className="text-foundry-slate">
                      {type.title}
                    </Heading>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      {type.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA with Pending-Route Safety Treatment */}
            <div className="rounded-2xl bg-white p-6 lg:p-8 border border-foundry-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <p className="font-display text-sm font-bold text-foundry-slate">
                  Discuss an Institutional Partnership
                </p>
                <p className="text-xs sm:text-sm text-foundry-secondary leading-relaxed">
                  Partner inquiry channels and structured sponsorship agreements are being finalized prior to cohort launch. Tell us how your organization would like to collaborate.
                </p>
              </div>

              <Button asChild variant="primary" size="md" className="shrink-0">
                <Link href="/for-partners">
                  <span>{homepagePartnershipsSection.cta.label}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* ================================================================= */}
        {/* SECTION 9 — FINAL CTA                                            */}
        {/* ================================================================= */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-academy-primary/20 border border-academy-primary/40 px-3.5 py-1 text-xs font-semibold text-purple-200">
                <Sparkles className="h-3 w-3 text-purple-300" aria-hidden="true" />
                <span>Next Intake Scoping</span>
              </span>

              <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                {homepageFinalCtaSection.headline}
              </Heading>

              <Text
                size="lg"
                tone="inverseMuted"
                className="max-w-2xl mx-auto leading-relaxed"
              >
                Explore how Ops Foundry Academy helps learners build practical capabilities, structured habits, and readiness for real-world work.
              </Text>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href={homepageFinalCtaSection.primaryCta.href}>
                    <span>{homepageFinalCtaSection.primaryCta.label}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="inverseOutline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={homepageFinalCtaSection.secondaryCta.href}>
                    {homepageFinalCtaSection.secondaryCta.label}
                  </Link>
                </Button>
              </div>

              {/* Reassurance Note */}
              <p className="text-xs text-gray-400 pt-4 border-t border-foundry-slate-border max-w-xl mx-auto leading-relaxed">
                Clear expectations: Admission is assessed through practical review. Training, certification, readiness and hiring remain separate decisions.
              </p>
            </div>
          </Container>
        </Section>
      </main>

      {/* Academy Footer */}
      <AcademyFooter />
    </div>
  );
}
