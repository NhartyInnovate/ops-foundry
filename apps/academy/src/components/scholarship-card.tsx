import React from 'react';
import { Heading, Text } from '@opsfoundry/ui';
import { Award, FileText, CheckCircle2, Lock } from 'lucide-react';
import type { ScholarshipRecord } from '../content/scholarships';
import { StatusBadge } from './status-badge';

export interface ScholarshipCardProps {
  scholarship: ScholarshipRecord;
  className?: string;
}

export function ScholarshipCard({
  scholarship,
  className = '',
}: ScholarshipCardProps) {
  const isConfirmed = scholarship.status === 'active' && scholarship.isPartnerConfirmed;

  return (
    <article
      className={`rounded-2xl bg-white p-7 lg:p-8 border flex flex-col justify-between transition-all ${
        isConfirmed
          ? 'border-foundry-border shadow-xs hover:border-academy-primary/50'
          : 'border-gray-200 bg-gray-50/70'
      } ${className}`.trim()}
    >
      <div>
        {/* Top Header & Status */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-foundry-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
            <span>Scholarship Scheme</span>
          </span>

          <StatusBadge
            status={isConfirmed ? 'open' : 'upcoming'}
            label={isConfirmed ? 'Applications Open' : 'Under Partner Scoping'}
            size="sm"
          />
        </div>

        {/* Title */}
        <Heading as="h3" size="sm" className="text-foundry-slate mb-2">
          {scholarship.title}
        </Heading>

        {/* Provider */}
        <p className="text-xs font-medium text-foundry-secondary mb-4">
          Provider:{' '}
          <span className="font-semibold text-foundry-slate">
            {scholarship.providerName}
          </span>
        </p>

        {/* Award Summary */}
        <Text size="sm" tone="secondary" className="leading-relaxed mb-5">
          {scholarship.awardDescription}
        </Text>

        {/* Eligibility Criteria */}
        {scholarship.eligibilityCriteria.length > 0 && (
          <div className="rounded-xl bg-foundry-canvas p-4 border border-foundry-border mb-5 space-y-2">
            <p className="text-xs font-bold text-foundry-slate">Eligibility Overview:</p>
            <ul className="space-y-1.5 text-xs text-foundry-secondary">
              {scholarship.eligibilityCriteria.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Publication Notice */}
        <div
          role="note"
          aria-label="Scholarship confirmation status"
          className="rounded-xl border border-academy-purple-border/60 bg-academy-light-purple/40 p-3.5 text-xs text-foundry-slate leading-relaxed flex items-start gap-2.5 mb-2"
        >
          <FileText className="h-4 w-4 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
          <p>{scholarship.publicationNotice}</p>
        </div>
      </div>

      {/* Footer Meta & Action */}
      <div className="pt-4 mt-4 border-t border-foundry-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="text-foundry-secondary">
          Authority: <span className="font-semibold text-foundry-slate">{scholarship.decisionAuthority}</span>
        </span>

        {isConfirmed ? (
          <a
            href={`/tuition-scholarships/${scholarship.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
          >
            <span>View Scheme Guidelines</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full select-none">
            <Lock className="h-3 w-3 text-gray-400" aria-hidden="true" />
            <span>Details Being Finalised</span>
          </span>
        )}
      </div>
    </article>
  );
}
