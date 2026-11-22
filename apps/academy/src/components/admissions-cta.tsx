import React from 'react';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { admissionsPreviewContent, finalCtaContent } from '../content/homepage';
import { SectionHeading } from './section-heading';

export function AdmissionsCta() {
  return (
    <>
      {/* Section G: Admissions Preview */}
      <Section
        id={admissionsPreviewContent.id}
        tone="canvas"
        spacing="lg"
        border="bottom"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                title={admissionsPreviewContent.heading}
                description={admissionsPreviewContent.intro}
              />

              <div
                role="note"
                aria-label="Admissions review guidance"
                className="rounded-2xl bg-white p-6 border border-foundry-border shadow-xs"
              >
                <Heading as="h3" size="sm" className="text-foundry-slate mb-2">
                  Admissions Review &amp; Assessment
                </Heading>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {admissionsPreviewContent.admissionsCopy}
                </Text>
              </div>

              <div>
                <Button asChild variant="primary" size="lg">
                  <Link href={admissionsPreviewContent.cta.href}>
                    <span>{admissionsPreviewContent.cta.label}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <article className="rounded-2xl bg-white p-7 border border-foundry-border shadow-xs space-y-3">
                <Heading as="h3" size="md" className="text-foundry-slate">
                  Tuition Transparency
                </Heading>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {admissionsPreviewContent.tuitionCopy}
                </Text>
              </article>

              <article className="rounded-2xl bg-white p-7 border border-foundry-border shadow-xs space-y-3">
                <Heading as="h3" size="md" className="text-foundry-slate">
                  Scholarships &amp; Funding Opportunities
                </Heading>
                <Text size="sm" tone="secondary" className="leading-relaxed">
                  {admissionsPreviewContent.scholarshipCopy}
                </Text>
              </article>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section H: Final CTA */}
      <Section tone="slate" spacing="lg">
        <Container>
          <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <Heading as="h2" size="xl" tone="inverse" className="mb-4">
              {finalCtaContent.heading}
            </Heading>
            <Text
              size="lg"
              tone="inverseMuted"
              className="mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {finalCtaContent.supporting}
            </Text>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                <Link href={finalCtaContent.primaryCta.href}>
                  <span>{finalCtaContent.primaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="inverseOutline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href={finalCtaContent.secondaryCta.href}>
                  {finalCtaContent.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
