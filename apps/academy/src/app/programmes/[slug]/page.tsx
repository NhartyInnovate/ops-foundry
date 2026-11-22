import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, Heading, Text, Button, Badge } from '@opsfoundry/ui';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  ShieldAlert,
  Info,
  Clock,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { AcademyHeader } from '../../../components/academy-header';
import { AcademyFooter } from '../../../components/academy-footer';
import { SectionHeading } from '../../../components/section-heading';
import { ProgrammeCard } from '../../../components/programme-card';
import {
  plannedAcademyProgrammes,
  getProgrammeBySlug,
  IS_PROGRAMMES_PUBLIC_APPROVED,
} from '../../../content/programmes';
import { learningPhilosophyContent } from '../../../content/homepage';

export const dynamicParams = false;

export function generateStaticParams() {
  if (!IS_PROGRAMMES_PUBLIC_APPROVED) {
    return [];
  }
  return plannedAcademyProgrammes.map((programme) => ({
    slug: programme.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);

  if (!IS_PROGRAMMES_PUBLIC_APPROVED || !programme) {
    return {
      title: 'Programme Not Found — Ops Foundry Academy',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${programme.slotLabel} Programme — Ops Foundry Academy`,
    robots: {
      index: false,
      follow: false,
    },
    description: programme.summary,
    alternates: {
      canonical: `/programmes/${programme.slug}`,
    },
    openGraph: {
      title: `${programme.slotLabel} Programme — Ops Foundry Academy`,
      description: programme.summary,
      type: 'website',
    },
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!IS_PROGRAMMES_PUBLIC_APPROVED) {
    notFound();
  }

  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);

  if (!programme) {
    notFound();
  }

  const otherProgrammes = plannedAcademyProgrammes.filter(
    (item) => item.slug !== programme.slug
  );

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-slate">
      <AcademyHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Breadcrumbs & Editorial Hero */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="pt-8 pb-14 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24"
        >
          <Container>
            {/* Breadcrumb Navigation Trail */}
            <nav aria-label="Breadcrumb" className="mb-8 text-xs text-foundry-secondary">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
                  >
                    Academy Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/programmes"
                    className="hover:text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
                  >
                    Programmes
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-foundry-slate">
                  {programme.slotLabel}
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="academy">{programme.slotLabel}</Badge>
                  <Badge variant="brand">{programme.statusLabel}</Badge>
                  <span className="text-xs font-semibold text-foundry-secondary">
                    Track {programme.trackNumber}
                  </span>
                </div>

                <Heading
                  as="h1"
                  size="display"
                  className="text-foundry-slate tracking-tight leading-[1.08]"
                >
                  {programme.title}
                </Heading>

                <Text
                  size="lg"
                  tone="default"
                  className="text-foundry-slate font-medium leading-relaxed"
                >
                  {programme.summary}
                </Text>

                <div className="space-y-4">
                  {programme.overviewParagraphs.map((paragraph) => (
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

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                    <Link href={`/apply?programme=${programme.slug}`}>
                      <span>Register Interest</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href={programme.linkedPathway.href}>
                      <span>Explore Aligned Pathway</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Specification Status Summary */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs space-y-6">
                  <div className="pb-4 border-b border-foundry-border">
                    <Heading as="h2" size="sm" className="text-foundry-slate mb-1">
                      Current Specification Status
                    </Heading>
                    <p className="text-xs text-foundry-secondary">
                      Publication Governance: Values below are undergoing curriculum sign-off prior to cohort opening.
                    </p>
                  </div>

                  <dl className="space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-foundry-border">
                      <dt className="font-semibold text-foundry-slate">Track Reference</dt>
                      <dd className="text-foundry-secondary text-right">
                        {programme.slotLabel} ({programme.courseId})
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-foundry-border">
                      <dt className="font-semibold text-foundry-slate">Linked Career Pathway</dt>
                      <dd className="text-right">
                        <Link
                          href={programme.linkedPathway.href}
                          className="font-semibold text-academy-primary hover:underline"
                        >
                          {programme.linkedPathway.title} →
                        </Link>
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-foundry-border">
                      <dt className="font-semibold text-foundry-slate">Official Course Title</dt>
                      <dd className="text-foundry-secondary text-right">
                        Pending confirmation
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-foundry-border">
                      <dt className="font-semibold text-foundry-slate">Duration &amp; Schedule</dt>
                      <dd className="text-foundry-secondary text-right">
                        {programme.duration}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-foundry-border">
                      <dt className="font-semibold text-foundry-slate">Delivery Format</dt>
                      <dd className="text-foundry-secondary text-right">
                        Pending final confirmation
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-foundry-border">
                      <dt className="font-semibold text-foundry-slate">Prerequisites</dt>
                      <dd className="text-foundry-secondary text-right">
                        Pending final confirmation
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="font-semibold text-foundry-slate">Tuition &amp; Fees</dt>
                      <dd className="text-foundry-secondary text-right">
                        Pending approval
                      </dd>
                    </div>
                  </dl>

                  <div
                    role="note"
                    aria-label="Programme readiness note"
                    className="rounded-xl bg-foundry-canvas p-4 border border-foundry-border text-xs text-foundry-secondary leading-relaxed"
                  >
                    {programme.readinessNote}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Direct Connection to Career Pathway */}
        <Section tone="pure" spacing="md" border="bottom">
          <Container>
            <div className="rounded-2xl border border-academy-primary/20 bg-academy-light-purple/40 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-academy-primary font-display">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  <span>Aligned Operational Domain</span>
                </div>
                <Heading as="h2" size="sm" className="text-foundry-slate">
                  How This Programme Connects to the {programme.linkedPathway.title} Pathway
                </Heading>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {programme.linkedPathway.relationshipNote}
                </Text>
              </div>

              <Button asChild variant="outline" size="md" className="w-full sm:w-auto shrink-0 bg-white text-center">
                <Link href={programme.linkedPathway.href} className="flex items-center justify-center gap-2 whitespace-normal text-center">
                  <span>Explore Aligned Pathway</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* 3. Specification Status: What Is Being Finalised */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title={`Specification & Scoping Status for ${programme.slotLabel}`}
              description="In accordance with Section 11 of the Master Brief, detailed course syllabi, tools, weekly hours, tuition fees, and admission criteria are undergoing formal curriculum sign-off prior to cohort launch."
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
              {programme.pendingSpecificationItems.map((item, idx) => (
                <article
                  key={item.area}
                  className="rounded-2xl bg-white p-7 border border-foundry-border shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-foundry-border">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foundry-slate text-white font-display font-bold text-xs">
                        0{idx + 1}
                      </span>
                      <Badge variant="brand" className="text-[11px]">
                        {item.status}
                      </Badge>
                    </div>
                    <Heading as="h3" size="sm" className="text-foundry-slate mb-2">
                      {item.area}
                    </Heading>
                    <Text size="sm" tone="secondary" className="leading-relaxed">
                      {item.explanation}
                    </Text>
                  </div>
                </article>
              ))}
            </div>

            {/* Approved Employment Disclaimer Banner */}
            <div
              role="note"
              aria-label="Employment reality notice"
              className="mt-10 rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3"
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

        {/* 4. Publication Governance & Admissions Transparency */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Admissions & Separate Decisions */}
              <div className="rounded-2xl bg-foundry-canvas p-7 sm:p-8 border border-foundry-border space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-academy-primary" aria-hidden="true" />
                  <Heading as="h3" size="sm" className="text-foundry-slate">
                    Admissions &amp; Separate Decisions
                  </Heading>
                </div>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  Apply to build practical skills for modern business operations. We review eligibility, motivation and readiness, and may require an aptitude assessment or practical task. Admission decisions and scholarship decisions are separate.
                </Text>
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admissions">
                      <span>Review Admissions Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Tuition Transparency */}
              <div className="rounded-2xl bg-foundry-canvas p-7 sm:p-8 border border-foundry-border space-y-4">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-academy-primary" aria-hidden="true" />
                  <Heading as="h3" size="sm" className="text-foundry-slate">
                    Tuition &amp; Funding Transparency
                  </Heading>
                </div>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  Understand the full cost before you enrol. Each published programme shows its total fee, what is included, available payment arrangements and applicable refund or deferral terms. Amounts will appear only when approved.
                </Text>
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/tuition-scholarships">
                      <span>Explore Tuition &amp; Scholarships</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 5. Guided by the Six Academy Learning Principles */}
        <Section tone="slate" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title="Guided by the Six Academy Learning Principles"
              description={`Once published, ${programme.slotLabel} will follow the same practical learning philosophy that underpins all Ops Foundry Academy programmes:`}
              tone="inverse"
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPhilosophyContent.principles.map((principle) => (
                <div
                  key={principle.number}
                  className="rounded-2xl bg-foundry-slate-card border border-foundry-slate-border p-6 lg:p-7"
                >
                  <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-academy-primary/20 border border-academy-primary/40 text-purple-300 font-display font-bold text-xs">
                    {principle.number}
                  </div>
                  <Heading as="h3" size="sm" tone="inverse" className="mb-2">
                    {principle.title}
                  </Heading>
                  <Text size="sm" tone="inverseMuted" className="leading-relaxed">
                    {principle.description}
                  </Text>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 6. Other Planned Programme Tracks */}
        <Section tone="canvas" spacing="lg">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <SectionHeading
                title="Other Planned Programme Tracks"
                description="Explore the other two planned programme slots in the Ops Foundry Academy catalogue."
              />
              <Button asChild variant="outline" size="md">
                <Link href="/programmes">View All Programmes</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {otherProgrammes.map((other) => (
                <ProgrammeCard key={other.courseId} programme={other} />
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <AcademyFooter />
    </div>
  );
}
