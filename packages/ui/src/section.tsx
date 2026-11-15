import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: 'canvas' | 'pure' | 'dark' | 'slate';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'none' | 'top' | 'bottom' | 'both';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone = 'canvas', spacing = 'lg', border = 'none', ...props }, ref) => {
    const tones = {
      canvas: 'bg-foundry-canvas text-foundry-dark',
      pure: 'bg-white text-foundry-dark',
      dark: 'bg-foundry-dark text-white',
      slate: 'bg-foundry-slate text-white',
    }[tone];

    const spacings = {
      none: '',
      sm: 'py-12 sm:py-16',
      md: 'py-16 sm:py-20',
      lg: 'py-20 sm:py-24 lg:py-28',
    }[spacing];

    const borderColor =
      tone === 'dark'
        ? 'border-foundry-dark-border'
        : tone === 'slate'
          ? 'border-foundry-slate-border'
          : 'border-foundry-border';

    const borders = {
      none: '',
      top: `border-t ${borderColor}`,
      bottom: `border-b ${borderColor}`,
      both: `border-y ${borderColor}`,
    }[border];

    return (
      <section
        ref={ref}
        className={twMerge(clsx('relative', tones, spacings, borders, className))}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';
