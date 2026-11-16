import React from 'react';
import Link from 'next/link';
import { Heading, Text, Badge } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import type { AcademyProgrammeSlot } from '../content/programmes';

export interface ProgrammeCardProps {
  programme: AcademyProgrammeSlot;
}

export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const detailHref = `/programmes/${programme.slug}`;

  return (
    <article className="flex flex-col justify-between rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs hover:border-gray-300 transition-colors">
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
              {programme.duration}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="font-semibold text-foundry-slate shrink-0">
              Prerequisites &amp; Tuition:
            </dt>
            <dd className="text-foundry-secondary text-right">
              Pending confirmation
            </dd>
          </div>
        </dl>
      </div>

      <div className="pt-5 mt-6 border-t border-foundry-border space-y-4">
        <p className="text-xs text-foundry-secondary leading-relaxed">
          {programme.readinessNote}
        </p>

        <Link
          href={detailHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-foundry-slate hover:text-foundry-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
        >
          <span>View {programme.slotLabel} Status</span>
          <ArrowRight className="h-4 w-4 text-foundry-orange" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
