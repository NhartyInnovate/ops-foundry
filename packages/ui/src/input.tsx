import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          clsx(
            'flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm text-[#111215] placeholder:text-gray-400 transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
            error
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'border-gray-200 hover:border-gray-300 focus-visible:border-[#FF5A1F] focus-visible:ring-[#FF5A1F]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
