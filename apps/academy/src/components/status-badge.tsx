import React from 'react';

export type LifecycleStatus =
  | 'draft'
  | 'upcoming'
  | 'open'
  | 'full'
  | 'waitlist'
  | 'closed'
  | 'archived';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: LifecycleStatus;
  label?: string;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  LifecycleStatus,
  { defaultLabel: string; dotClass: string; badgeClass: string; ariaPrefix: string }
> = {
  draft: {
    defaultLabel: 'Draft',
    dotClass: 'bg-gray-400',
    badgeClass: 'bg-gray-50 text-gray-600 border-dashed border-gray-300',
    ariaPrefix: 'Draft status',
  },
  upcoming: {
    defaultLabel: 'Upcoming',
    dotClass: 'bg-academy-primary',
    badgeClass: 'bg-academy-light-purple text-academy-primary border-academy-purple-border font-semibold',
    ariaPrefix: 'Upcoming status',
  },
  open: {
    defaultLabel: 'Applications Open',
    dotClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    ariaPrefix: 'Open status',
  },
  full: {
    defaultLabel: 'Cohort Full',
    dotClass: 'bg-rose-500',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    ariaPrefix: 'Cohort full',
  },
  waitlist: {
    defaultLabel: 'Waitlist Open',
    dotClass: 'bg-amber-500',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    ariaPrefix: 'Waitlist status',
  },
  closed: {
    defaultLabel: 'Applications Closed',
    dotClass: 'bg-gray-400',
    badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
    ariaPrefix: 'Closed status',
  },
  archived: {
    defaultLabel: 'Archived',
    dotClass: 'bg-gray-300',
    badgeClass: 'bg-gray-100 text-gray-500 border-gray-200',
    ariaPrefix: 'Archived status',
  },
};

export function StatusBadge({
  status,
  label,
  size = 'md',
  className = '',
  ...props
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.upcoming;
  const displayLabel = label || config.defaultLabel;

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px] gap-1.5'
      : 'px-2.5 py-1 text-xs gap-2';

  return (
    <span
      role="status"
      aria-label={`${config.ariaPrefix}: ${displayLabel}`}
      className={`inline-flex items-center rounded-full border transition-colors select-none ${sizeClasses} ${config.badgeClass} ${className}`.trim()}
      {...props}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${config.dotClass}`}
        aria-hidden="true"
      />
      <span>{displayLabel}</span>
    </span>
  );
}
