import React from 'react';
import Link from 'next/link';
import { Heading, Text } from '@opsfoundry/ui';
import { ArrowRight, Compass } from 'lucide-react';
import type { AcademyProgrammeSlot } from '../content/programmes';
import { StatusBadge } from './status-badge';

export interface ProgrammeCardProps {
  programme: AcademyProgrammeSlot;
}

export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const detailHref = `/programmes/${programme.slug}`;
  const pathwayHref = programme.linkedPathway?.href || `/pathways/${programme.linkedPathwaySlug}`;
  const pathwayTitle = programme.linkedPathway?.title || programme.slotLabel;

  return (
    <article className="flex flex-col justify-between h-full rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs hover:border-gray-300 transition-colors">
      <div className="flex flex-col flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-foundry-border">
          <span className="text-xs font-semibold text-foundry-slate">
            {programme.slotLabel} ({programme.courseId})
          </span>
          <StatusBadge
            status={programme.programmeStatus || 'upcoming'}
            label={programme.statusLabel}
            size="sm"
            className="whitespace-nowrap"
          />
        </div>

        <Heading as="h3" size="md" className="text-foundry-slate mb-3">
          {programme.title}
        </Heading>

        <Text size="sm" tone="secondary" className="mb-4 leading-relaxed flex-1">
          {programme.summary}
        </Text>

        {/* Linked Career Pathway Pill */}
        <div className="mb-5">
          <Link
            href={pathwayHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
          >
            <Compass className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Aligned Career Pathway: {pathwayTitle}</span>
          </Link>
        </div>

        <dl className="mt-auto rounded-xl bg-foundry-canvas p-4 border border-foundry-border space-y-2.5 text-xs">
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
              {programme.duration}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="font-semibold text-foundry-slate shrink-0">
              Tuition &amp; Fees:
            </dt>
            <dd className="text-foundry-secondary text-right">
              Pending approval
            </dd>
          </div>
        </dl>
      </div>

      <div className="pt-5 mt-6 border-t border-foundry-border space-y-4">
        <p className="text-xs text-foundry-secondary leading-relaxed">
          {programme.readinessNote}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foundry-slate hover:text-academy-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 text-academy-primary" aria-hidden="true" />
          </Link>

          <Link
            href={`/apply?programme=${programme.slug}`}
            className="text-xs font-semibold text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
          >
            Register Interest
          </Link>
        </div>
      </div>
    </article>
  );
}
