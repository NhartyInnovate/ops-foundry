import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverseOutline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const base =
      'inline-flex items-center justify-center whitespace-nowrap shrink-0 font-body font-semibold rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

    const sizes = {
      sm: 'min-h-[40px] text-xs px-5 py-2 gap-1.5',
      md: 'min-h-[44px] text-sm px-6 py-3 gap-2',
      lg: 'min-h-[48px] text-sm sm:text-base px-8 py-3.5 gap-2.5',
    }[size];

    const variants = {
      primary:
        'bg-foundry-orange hover:bg-foundry-orange-hover text-white shadow-sm focus-visible:outline-foundry-orange',
      secondary:
        'bg-foundry-dark hover:bg-foundry-dark-hover text-white shadow-sm focus-visible:outline-foundry-dark',
      outline:
        'border border-gray-300 hover:border-foundry-dark bg-white hover:bg-gray-50 text-foundry-dark focus-visible:outline-foundry-dark',
      ghost:
        'hover:bg-gray-100 text-gray-700 hover:text-foundry-dark focus-visible:outline-gray-500',
      inverseOutline:
        'border border-white/25 hover:border-white bg-transparent text-white hover:bg-white/10 focus-visible:outline-white',
    }[variant];

    return (
      <Comp
        ref={ref}
        className={twMerge(clsx(base, sizes, variants, className))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
