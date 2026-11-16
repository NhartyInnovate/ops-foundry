import React from 'react';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button, Badge } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { programmesPreviewContent } from '../content/homepage';
import { plannedAcademyProgrammes } from '../content/programmes';
import { SectionHeading } from './section-heading';

export function ProgrammePreview() {
  return (
    <Section
      id={programmesPreviewContent.id}
      tone="canvas"
      spacing="lg"
      border="bottom"
    >
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <SectionHeading
            title={programmesPreviewContent.heading}
            description={programmesPreviewContent.intro}
          />
          <div className="shrink-0">
            <Button asChild variant="outline" size="md">
              <Link href={programmesPreviewContent.cta.href}>
                <span>{programmesPreviewContent.cta.label}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Honest Programme Publication Governance Notice */}
        <div
          role="note"
          aria-label="Programme publication status"
          className="mb-10 rounded-2xl border border-foundry-orange/30 bg-white px-6 py-5 text-sm text-foundry-slate leading-relaxed shadow-xs"
        >
          {programmesPreviewContent.governanceNotice}
        </div>

        {/* Three Planned Programme Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plannedAcademyProgrammes.map((programme) => (
            <article
              key={programme.courseId}
              className="flex flex-col justify-between rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-foundry-border">
                  <span className="text-xs font-semibold text-foundry-slate">
                    {programme.slotLabel}
                  </span>
                  <Badge variant="brand" className="text-[11px]">
                    {programme.statusLabel}
                  </Badge>
                </div>

                <Heading as="h3" size="md" className="text-foundry-slate mb-3">
                  {programme.title}
                </Heading>

                <Text size="sm" tone="secondary" className="mb-6 leading-relaxed">
                  {programme.summary}
                </Text>

                <dl className="rounded-xl bg-foundry-canvas p-4 border border-foundry-border space-y-2.5 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-semibold text-foundry-slate shrink-0">
                      Official Title:
                    </dt>
                    <dd className="text-foundry-secondary text-right">
                      Pending confirmation
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-semibold text-foundry-slate shrink-0">
                      Duration &amp; Schedule:
                    </dt>
                    <dd className="text-foundry-secondary text-right">
                      To be confirmed
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-semibold text-foundry-slate shrink-0">
                      Prerequisites &amp; Tuition:
                    </dt>
                    <dd className="text-foundry-secondary text-right">
                      To be confirmed
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-5 mt-6 border-t border-foundry-border">
                <p className="text-xs text-foundry-secondary leading-relaxed">
                  {programme.readinessNote}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
