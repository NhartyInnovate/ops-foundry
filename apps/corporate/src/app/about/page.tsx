import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../components/abstract-brand-geometry';
import { aboutPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'About Ops Foundry — Human-AI Operational Infrastructure',
  description:
    'Learn what Ops Foundry is, why it exists, and its human-plus-AI operational philosophy.',
  openGraph: {
    title: 'About Ops Foundry — Human-AI Operational Infrastructure',
    description:
      'Learn what Ops Foundry is, why it exists, and its human-plus-AI operational philosophy.',
    type: 'website',
  },
};

export default function AboutPage() {
  const {
    hero,
    whatWeAreAndWhyWeExist,
    philosophy,
    companyProfileNotice,
    cta,
  } = aboutPageContent;

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Editorial Hero */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="relative pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden"
        >
          <AbstractBrandGeometry variant="subtle" />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <Heading
                  as="h1"
                  size="display"
                  className="mb-6 text-foundry-dark tracking-tight leading-[1.08]"
                >
                  {hero.title}
                </Heading>
                <Text
                  size="lg"
                  tone="default"
                  className="mb-5 font-medium leading-relaxed max-w-2xl"
                >
                  {hero.lead}
                </Text>
                <Text
                  size="base"
                  tone="secondary"
                  className="mb-8 max-w-2xl leading-relaxed"
                >
                  {hero.supporting}
                </Text>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                    <Link href="/pilot">Explore a Pilot</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/how-we-work">See How We Work</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="relative rounded-2xl overflow-hidden border border-foundry-border bg-white shadow-sm">
                  <div className="aspect-[16/11] w-full overflow-hidden bg-foundry-surface-alt">
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

        {/* 2. Why Ops Foundry Exists */}
        <Section tone="canvas" spacing="lg" border="bottom" className="bg-foundry-muted">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <Heading as="h2" size="xl" className="text-foundry-dark">
                  {whatWeAreAndWhyWeExist.heading}
                </Heading>
              </div>
              <div className="lg:col-span-7 space-y-5">
                {whatWeAreAndWhyWeExist.paragraphs.map((paragraph) => (
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

        {/* 3. Our Human + AI Operational Philosophy */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl mb-12">
              <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                {philosophy.heading}
              </Heading>
              <Text size="lg" tone="secondary" className="leading-relaxed">
                {philosophy.intro}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
              {philosophy.principles.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-2xl bg-foundry-muted p-7 lg:p-8 border border-foundry-border shadow-xs"
                >
                  <span className="font-display text-xs font-bold text-foundry-dark tracking-wider uppercase block mb-2.5">
                    {principle.number}
                  </span>
                  <Heading as="h3" size="sm" className="mb-3 text-foundry-dark">
                    {principle.title}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {principle.description}
                  </Text>
                </article>
              ))}
            </div>

            {/* Company Profile & Governance Note */}
            <div className="rounded-2xl bg-foundry-muted p-6 lg:p-8 border border-foundry-border shadow-xs">
              <Heading as="h3" size="sm" className="mb-2 text-foundry-dark">
                {companyProfileNotice.heading}
              </Heading>
              <Text size="sm" tone="secondary" className="leading-relaxed">
                {companyProfileNotice.body}
              </Text>
            </div>
          </Container>
        </Section>

        {/* 4. Conversion CTA */}
        <Section tone="pure" spacing="lg">
          <Container>
            <div className="relative overflow-hidden rounded-3xl bg-foundry-muted border border-foundry-border p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
              <AbstractBrandGeometry variant="cta" />
              <div className="relative z-10">
                <Heading as="h2" size="xl" tone="default" className="mb-4">
                  {cta.heading}
                </Heading>
                <Text size="lg" tone="secondary" className="mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600">
                  {cta.body}
                </Text>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                  <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                    <Link href={cta.primaryHref}>
                      {cta.primaryLabel}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href={cta.secondaryHref}>
                      {cta.secondaryLabel}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
