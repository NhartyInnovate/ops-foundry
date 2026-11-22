import React from 'react';
import Link from 'next/link';
import { Heading, Text } from '@opsfoundry/ui';
import { ArrowRight, Compass } from 'lucide-react';
import type { CareerPathway } from '../content/pathways';
import { StatusBadge } from './status-badge';

export interface PathwayCardProps {
  pathway: CareerPathway;
  className?: string;
}

export function PathwayCard({ pathway, className = '' }: PathwayCardProps) {
  const isUpcoming = pathway.status === 'upcoming';
  const detailHref = `/pathways/${pathway.slug}`;

  return (
    <article
      className={`flex flex-col justify-between rounded-2xl bg-white p-7 lg:p-8 border transition-all ${
        isUpcoming
          ? 'border-gray-200 bg-gray-50/60 hover:border-gray-300'
          : 'border-foundry-border hover:border-academy-primary/50 shadow-xs'
      } ${className}`.trim()}
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-foundry-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
            <span>Career Pathway</span>
          </span>
          <StatusBadge
            status={isUpcoming ? 'upcoming' : 'open'}
            label={isUpcoming ? 'Upcoming Pathway' : 'Active Pathway'}
            size="sm"
          />
        </div>

        {/* Pathway Title */}
        <Heading as="h3" size="md" className="text-foundry-slate mb-3">
          {pathway.title}
        </Heading>

        {/* Plain Language Role Description */}
        <Text size="sm" tone="default" className="text-foundry-slate leading-relaxed mb-4 font-normal">
          {pathway.plainLanguageRole}
        </Text>

        {/* Who might enjoy this (Suitability Statement) */}
        <div className="rounded-xl bg-foundry-canvas p-4 border border-foundry-border mb-6">
          <p className="text-xs font-bold text-foundry-slate mb-1">Role Fit &amp; Qualities:</p>
          <p className="text-xs text-foundry-secondary leading-relaxed">
            {pathway.suitability}
          </p>
        </div>
      </div>

      {/* Card Footer / CTA */}
      <div className="pt-4 border-t border-foundry-border flex items-center justify-between gap-3">
        {isUpcoming ? (
          <span className="text-xs text-foundry-secondary italic">
            Under curriculum scoping
          </span>
        ) : (
          <span className="text-xs font-semibold text-academy-primary">
            Launch Pathway
          </span>
        )}

        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foundry-slate hover:text-academy-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors group"
        >
          <span>{pathway.cta.label}</span>
          <ArrowRight
            className="h-3.5 w-3.5 text-academy-primary group-hover:translate-x-0.5 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
