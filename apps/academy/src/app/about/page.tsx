import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button, Badge } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { aboutAcademyPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'About — Ops Foundry Academy',
  description:
    'Learn what Ops Foundry Academy is, how it relates to Ops Foundry, and its commitment to practical skill development and real-world readiness.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About — Ops Foundry Academy',
    description:
      'Learn what Ops Foundry Academy is, how it relates to Ops Foundry, and its commitment to practical skill development and real-world readiness.',
    type: 'website',
  },
};

export default function AboutAcademyPage() {
  const {
    hero,
    whatAcademyIs,
    focusAreas,
    ecosystemRelationship,
    governanceCommitment,
    cta,
  } = aboutAcademyPageContent;

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
                    <Link href="/pathways">
                      <span>Explore Career Pathways</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/how-we-learn">How We Learn</Link>
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

        {/* 2. What Ops Foundry Academy Is */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <Heading as="h2" size="xl" className="text-foundry-slate">
                  {whatAcademyIs.heading}
                </Heading>
              </div>
              <div className="lg:col-span-7 space-y-5">
                {whatAcademyIs.paragraphs.map((paragraph) => (
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

        {/* 3. Focus on Practical Skills & Professional Development */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <SectionHeading
              title={focusAreas.heading}
              description={focusAreas.intro}
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {focusAreas.items.map((item, idx) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs"
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foundry-slate text-white font-display font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <Heading as="h3" size="sm" className="text-foundry-slate mb-2">
                    {item.title}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {item.description}
                  </Text>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Relationship Between Ops Foundry & Ops Foundry Academy */}
        <Section
          id={ecosystemRelationship.id}
          tone="pure"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <SectionHeading
              title={ecosystemRelationship.heading}
              description={ecosystemRelationship.intro}
              className="mb-12"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {ecosystemRelationship.entities.map((entity) => (
                <article
                  key={entity.name}
                  className="rounded-2xl bg-foundry-canvas p-7 lg:p-9 border border-foundry-border space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-foundry-border">
                    <Heading as="h3" size="md" className="text-foundry-slate">
                      {entity.name}
                    </Heading>
                    <Badge variant="neutral">{entity.audience}</Badge>
                  </div>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {entity.description}
                  </Text>
                </article>
              ))}
            </div>

            <div
              role="note"
              aria-label="Platform distinction notice"
              className="rounded-2xl border border-academy-primary/30 bg-foundry-canvas p-6 lg:p-7 text-sm text-foundry-slate leading-relaxed mb-8"
            >
              {ecosystemRelationship.distinctionNotice}
            </div>

            <div className="rounded-2xl bg-foundry-canvas p-6 lg:p-8 border border-foundry-border">
              <Heading as="h3" size="sm" className="text-foundry-slate mb-2">
                {governanceCommitment.heading}
              </Heading>
              <Text size="sm" tone="secondary" className="leading-relaxed">
                {governanceCommitment.body}
              </Text>
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
