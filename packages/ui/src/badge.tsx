import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'corporate' | 'academy' | 'neutral' | 'outline';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'neutral', ...props }, ref) => {
    const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors';

    const variants = {
      brand: 'bg-[#FFF4EE] text-[#FF5A1F] border border-[#FFD7C2]',
      corporate: 'bg-[#111215] text-white',
      academy: 'bg-[#1E232E] text-white',
      neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
      outline: 'bg-transparent text-gray-700 border border-gray-300',
    }[variant];

    return (
      <span
        ref={ref}
        className={twMerge(clsx(base, variants, className))}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
