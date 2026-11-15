import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'display' | 'xl' | 'lg' | 'md' | 'sm';
  tone?: 'default' | 'inverse';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Tag = 'h2', size = 'xl', tone = 'default', ...props }, ref) => {
    const sizes = {
      display: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]',
      xl: 'text-3xl sm:text-4xl font-bold tracking-tight leading-[1.16]',
      lg: 'text-2xl sm:text-3xl font-bold tracking-tight leading-[1.2]',
      md: 'text-xl sm:text-2xl font-bold tracking-tight leading-snug',
      sm: 'text-lg sm:text-xl font-bold leading-snug',
    }[size];

    const tones = {
      default: 'text-foundry-dark',
      inverse: 'text-white',
    }[tone];

    return (
      <Tag
        ref={ref}
        className={twMerge(clsx('font-display', sizes, tones, className))}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'xl' | 'lg' | 'base' | 'sm' | 'xs';
  tone?: 'default' | 'secondary' | 'inverse' | 'inverseMuted';
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Tag = 'p', size = 'base', tone = 'secondary', ...props }, ref) => {
    const sizes = {
      xl: 'text-lg sm:text-xl leading-relaxed',
      lg: 'text-base sm:text-lg leading-relaxed',
      base: 'text-base leading-relaxed',
      sm: 'text-sm leading-relaxed',
      xs: 'text-xs leading-normal',
    }[size];

    const tones = {
      default: 'text-foundry-dark',
      secondary: 'text-foundry-secondary',
      inverse: 'text-white',
      inverseMuted: 'text-gray-300',
    }[tone];

    return (
      <Tag
        ref={ref}
        className={twMerge(clsx('font-body', sizes, tones, className))}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';
