import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

    const sizes = {
      sm: 'text-xs px-4 py-2 gap-1.5',
      md: 'text-sm px-6 py-3 gap-2',
      lg: 'text-base px-8 py-3.5 gap-2.5',
    }[size];

    const variants = {
      primary: 'bg-[#FF5A1F] hover:bg-[#E04810] text-white shadow-sm focus-visible:outline-[#FF5A1F]',
      secondary: 'bg-[#111215] hover:bg-black text-white focus-visible:outline-[#111215]',
      outline: 'border border-gray-300 hover:border-gray-900 bg-transparent text-[#111215] focus-visible:outline-gray-900',
      ghost: 'hover:bg-gray-100 text-gray-700 focus-visible:outline-gray-400',
    }[variant];

    return (
      <button
        ref={ref}
        className={twMerge(clsx(base, sizes, variants, className))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
