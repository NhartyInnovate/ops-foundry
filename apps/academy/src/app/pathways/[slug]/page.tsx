import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  CheckCircle2,
  Briefcase,
  Layers,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  Lock,
} from 'lucide-react';
import { AcademyHeader } from '../../../components/academy-header';
import { AcademyFooter } from '../../../components/academy-footer';
import { SectionHeading } from '../../../components/section-heading';
import { StatusBadge } from '../../../components/status-badge';
import {
  careerPathways,
  getPathwayBySlug,
  type CareerPathway,
} from '../../../content/pathways';
import { getProgrammeBySlug } from '../../../content/programmes';

export const dynamicParams = false;

export function generateStaticParams() {
  return careerPathways.map((pathway) => ({
    slug: pathway.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pathway = getPathwayBySlug(slug);

  if (!pathway) {
    return {
      title: 'Pathway Not Found — Ops Foundry Academy',
    };
  }

  return {
    title: `${pathway.title} — Career Pathway — Ops Foundry Academy`,
    description: pathway.plainLanguageRole,
    alternates: {
      canonical: `/pathways/${pathway.slug}`,
    },
    openGraph: {
      title: `${pathway.title} — Career Pathway — Ops Foundry Academy`,
      description: pathway.plainLanguageRole,
      type: 'website',
    },
  };
}

export default async function PathwayDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pathway = getPathwayBySlug(slug);

  if (!pathway) {
    notFound();
  }

  const isUpcoming = pathway.status === 'upcoming';
  const relatedProgramme = pathway.relatedProgrammeSlug
    ? getProgrammeBySlug(pathway.relatedProgrammeSlug)
    : undefined;

  const otherPathways = careerPathways.filter((p) => p.slug !== pathway.slug);

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-slate">
      <AcademyHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Breadcrumbs & Hero */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="pt-10 pb-14 md:pt-14 md:pb-18 lg:pt-16 lg:pb-20"
        >
          <Container>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-foundry-secondary">
                <li>
                  <Link href="/pathways" className="hover:text-academy-primary transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                    <span>Career Pathways</span>
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-foundry-slate" aria-current="page">
                  {pathway.title}
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge
                    status={isUpcoming ? 'upcoming' : 'open'}
                    label={isUpcoming ? 'Upcoming Pathway' : 'Launch Pathway'}
                    size="md"
                  />
                  <span className="text-xs font-semibold text-foundry-secondary flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
                    <span>Operational Career Track</span>
                  </span>
                </div>

                <Heading
                  as="h1"
                  size="display"
                  className="text-foundry-slate tracking-tight leading-[1.08]"
                >
                  {pathway.title}
                </Heading>

                <Text
                  size="xl"
                  tone="default"
                  className="text-foundry-slate font-medium leading-relaxed"
                >
                  {pathway.tagline}
                </Text>

                <Text
                  size="base"
                  tone="secondary"
                  className="leading-relaxed"
                >
                  {pathway.plainLanguageRole}
                </Text>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {!isUpcoming ? (
                    <Button asChild variant="primary" size="md" className="w-full sm:w-auto text-center">
                      <Link href={`/apply?pathway=${pathway.slug}`}>
                        <span>Register Interest</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </Button>
                  ) : (
                    <div
                      aria-disabled="true"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 px-5 py-2.5 text-xs font-semibold text-gray-500 cursor-not-allowed select-none"
                    >
                      <Lock className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                      <span>Curriculum Under Scoping — Not Open for First Cohort</span>
                    </div>
                  )}

                  <Button asChild variant="outline" size="md">
                    <Link href="/pathways">View All Pathways</Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Quick Pathway Summary Box */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-foundry-border bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-foundry-border">
                    <Sparkles className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                    <Heading as="h2" size="sm" className="font-bold text-foundry-slate uppercase tracking-wider text-xs">
                      Pathway Profile
                    </Heading>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foundry-secondary">
                      Suitability &amp; Qualities
                    </span>
                    <p className="text-xs text-foundry-slate leading-relaxed">
                      {pathway.suitability}
                    </p>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foundry-secondary">
                      Readiness Status
                    </span>
                    <p className="text-xs text-foundry-secondary leading-relaxed">
                      {pathway.readinessNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Responsibilities & What the Work Looks Like */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                  Day-to-Day Responsibilities
                </span>
                <SectionHeading
                  title="What the Work Involves"
                  description={pathway.whatWorkLooksLike.summary}
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-2xl bg-white border border-foundry-border p-6 lg:p-7 shadow-xs space-y-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-academy-primary">
                    Core Operational Tasks
                  </h3>
                  <ul className="space-y-3">
                    {pathway.whatWorkLooksLike.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-3 text-xs sm:text-sm text-foundry-secondary leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {pathway.whatWorkLooksLike.status === 'pending_confirmation' && (
                    <div className="rounded-xl bg-foundry-canvas p-3.5 border border-foundry-border text-xs text-foundry-secondary">
                      Specification Notice: Detailed workflow tasks are aligned with Ops Foundry managed operations and are confirmed during cohort orientation.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Who Might Thrive in this Pathway */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="mb-10 lg:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display mb-2 block">
                Candidate Profile
              </span>
              <SectionHeading
                title="Who Might Thrive in this Role"
                description={pathway.suitability}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Interests */}
              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-academy-light-purple text-academy-primary text-xs font-bold">
                  01
                </span>
                <Heading as="h3" size="sm" className="text-foundry-slate">
                  Natural Interests
                </Heading>
                <ul className="space-y-2 text-xs text-foundry-secondary leading-relaxed">
                  {pathway.whoMightThrive.interests.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-academy-primary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Work Habits */}
              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-academy-light-purple text-academy-primary text-xs font-bold">
                  02
                </span>
                <Heading as="h3" size="sm" className="text-foundry-slate">
                  Work Habits
                </Heading>
                <ul className="space-y-2 text-xs text-foundry-secondary leading-relaxed">
                  {pathway.whoMightThrive.workHabits.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-academy-primary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strengths */}
              <div className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs space-y-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-academy-light-purple text-academy-primary text-xs font-bold">
                  03
                </span>
                <Heading as="h3" size="sm" className="text-foundry-slate">
                  Strengths Developed
                </Heading>
                <ul className="space-y-2 text-xs text-foundry-secondary leading-relaxed">
                  {pathway.whoMightThrive.strengths.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-academy-primary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* 4. Skills & Evidence of Capability */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left: Skills Developed */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                  Practical Capabilities
                </span>
                <Heading as="h2" size="lg" className="text-foundry-slate">
                  Skills You Develop
                </Heading>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {pathway.skillsYouDevelop.summary}
                </Text>

                <div className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border space-y-3">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-foundry-slate">
                    Core Workflows &amp; Tool Disciplines
                  </h3>
                  <ul className="space-y-2 text-xs text-foundry-secondary leading-relaxed">
                    {pathway.skillsYouDevelop.workflows.map((wf) => (
                      <li key={wf} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{wf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Evidence of Capability */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                  Demonstrable Output
                </span>
                <Heading as="h2" size="lg" className="text-foundry-slate">
                  Evidence of Capability
                </Heading>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {pathway.evidenceOfCapability.summary}
                </Text>

                <div className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border space-y-3">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-foundry-slate">
                    Practical Demonstration Areas
                  </h3>
                  <ul className="space-y-2 text-xs text-foundry-secondary leading-relaxed">
                    {pathway.evidenceOfCapability.practicalProjects.length > 0 ? (
                      pathway.evidenceOfCapability.practicalProjects.map((proj) => (
                        <li key={proj} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{proj}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-foundry-secondary italic">
                        Practical project scopes and assessment criteria will be published upon cohort confirmation.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 5. Potential Roles & Important Notice */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                Occupational Context
              </span>
              <SectionHeading
                title="Potential Operational Roles"
                description={pathway.potentialRoles.summary}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pathway.potentialRoles.examples.map((roleTitle) => (
                  <div
                    key={roleTitle}
                    className="rounded-xl border border-foundry-border bg-white px-4 py-3 text-xs font-bold text-foundry-slate flex items-center gap-2 shadow-xs"
                  >
                    <Briefcase className="h-4 w-4 text-academy-primary shrink-0" aria-hidden="true" />
                    <span>{roleTitle}</span>
                  </div>
                ))}
              </div>

              {/* Role Reality Disclaimer */}
              <p className="text-xs text-foundry-secondary leading-relaxed pt-2">
                {pathway.potentialRoles.disclaimer}
              </p>

              {/* Important Employment Reality Notice */}
              <div
                role="note"
                aria-label="Important employment reality notice"
                className="rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3 mt-4"
              >
                <ShieldAlert className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
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

        {/* 6. Other Available Pathways */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <Heading as="h2" size="md" className="text-foundry-slate mb-1">
                  Explore Other Career Pathways
                </Heading>
                <Text size="sm" tone="secondary">
                  Compare operational requirements and skills across our different career tracks.
                </Text>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/pathways">View Directory</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPathways.map((other) => (
                <div
                  key={other.slug}
                  className="rounded-2xl bg-foundry-canvas p-6 border border-foundry-border flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-academy-primary">
                      {other.status === 'upcoming' ? 'Upcoming' : 'Launch Pathway'}
                    </span>
                    <Heading as="h3" size="sm" className="text-foundry-slate">
                      {other.title}
                    </Heading>
                    <Text size="xs" tone="secondary" className="leading-relaxed">
                      {other.plainLanguageRole}
                    </Text>
                  </div>
                  <div className="pt-4 mt-4 border-t border-foundry-border">
                    <Link
                      href={`/pathways/${other.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-academy-primary hover:underline"
                    >
                      <span>Explore Pathway</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 7. Aligned Programme or Upcoming Action */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              {!isUpcoming && relatedProgramme ? (
                <>
                  <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                    Ready to prepare for {pathway.title}?
                  </Heading>
                  <Text
                    size="lg"
                    tone="inverseMuted"
                    className="max-w-2xl mx-auto leading-relaxed"
                  >
                    Training connected to {pathway.title} is currently in curriculum scoping for upcoming intakes. Register your interest to receive announcements when cohort applications formally open.
                  </Text>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                    <Button asChild variant="primary" size="lg" className="w-full sm:w-auto text-center">
                      <Link href={`/apply?pathway=${pathway.slug}`}>
                        <span>Register Interest for Intakes</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild variant="inverseOutline" size="lg" className="w-full sm:w-auto">
                      <Link href="/admissions">Admissions Guide</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                    {pathway.title} is an Upcoming Pathway.
                  </Heading>
                  <Text
                    size="lg"
                    tone="inverseMuted"
                    className="max-w-2xl mx-auto leading-relaxed"
                  >
                    Curriculum scoping for Customer &amp; Community Operations is underway for subsequent cohort admissions. Explore our active launch pathways or review how learning works.
                  </Text>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                    <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                      <Link href="/pathways">
                        <span>Explore Launch Pathways</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild variant="inverseOutline" size="lg" className="w-full sm:w-auto">
                      <Link href="/how-we-learn">How Learning Works</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Container>
        </Section>
      </main>

      <AcademyFooter />
    </div>
  );
}
