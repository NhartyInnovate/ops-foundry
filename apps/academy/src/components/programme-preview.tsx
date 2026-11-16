import React from 'react';
import Link from 'next/link';
import { Container, Section, Button } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { programmesPreviewContent } from '../content/homepage';
import { plannedAcademyProgrammes } from '../content/programmes';
import { SectionHeading } from './section-heading';
import { ProgrammeCard } from './programme-card';

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
            <ProgrammeCard key={programme.courseId} programme={programme} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
