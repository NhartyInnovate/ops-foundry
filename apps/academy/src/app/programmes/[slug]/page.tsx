import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, Heading, Text, Button, Badge } from '@opsfoundry/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AcademyHeader } from '../../../components/academy-header';
import { AcademyFooter } from '../../../components/academy-footer';
import { SectionHeading } from '../../../components/section-heading';
import { ProgrammeCard } from '../../../components/programme-card';
import {
  plannedAcademyProgrammes,
  getProgrammeBySlug,
} from '../../../content/programmes';
import { learningPhilosophyContent } from '../../../content/homepage';

export const dynamicParams = false;

export function generateStaticParams() {
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

  if (!programme) {
    return {
      title: 'Programme Not Found — Ops Foundry Academy',
    };
  }

  return {
    title: `${programme.slotLabel} — Ops Foundry Academy`,
    description: programme.summary,
    alternates: {
      canonical: `/programmes/${programme.slug}`,
    },
    openGraph: {
      title: `${programme.slotLabel} — Ops Foundry Academy`,
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
        {/* 1. Editorial Hero & Status */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
        >
          <Container>
            <div className="mb-8">
              <Link
                href="/programmes"
                className="inline-flex items-center gap-2 text-xs font-semibold text-foundry-secondary hover:text-foundry-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
                <span>Back to All Programmes</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="academy">{programme.slotLabel}</Badge>
                  <Badge variant="brand">{programme.statusLabel}</Badge>
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
                    <Link href="/admissions">Admissions Guide</Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Current Specification Status Summary */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs space-y-6">
                  <div className="pb-4 border-b border-foundry-border">
                    <Heading as="h2" size="sm" className="text-foundry-slate mb-1">
                      Current Specification Status
                    </Heading>
                    <p className="text-xs text-foundry-secondary">
                      Details below will be updated as final approval is completed.
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
                      <dt className="font-semibold text-foundry-slate">Official Course Title</dt>
                      <dd className="text-foundry-secondary text-right">
                        Pending confirmation
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-foundry-border">
                      <dt className="font-semibold text-foundry-slate">Duration</dt>
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
                      <dt className="font-semibold text-foundry-slate">Tuition &amp; Schedule</dt>
                      <dd className="text-foundry-secondary text-right">
                        Pending final confirmation
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

        {/* 2. What Is Being Finalised for This Programme */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title={`What Is Being Finalised for ${programme.slotLabel}`}
              description="Rather than publishing unconfirmed course information, we track the five specification areas below and publish each once formally approved."
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
              {programme.pendingSpecificationItems.map((item, idx) => (
                <article
                  key={item.area}
                  className="rounded-2xl bg-foundry-canvas p-7 border border-foundry-border flex flex-col justify-between"
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
          </Container>
        </Section>

        {/* 3. Shared Learning Principles */}
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

        {/* 4. Other Planned Programme Tracks */}
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
