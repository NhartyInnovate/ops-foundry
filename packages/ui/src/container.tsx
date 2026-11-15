import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = '2xl', ...props }, ref) => {
    const maxWidths = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-[1440px]',
      full: 'max-w-full',
    }[size];

    return (
      <div
        ref={ref}
        className={twMerge(clsx('mx-auto w-full px-4 sm:px-6 lg:px-8', maxWidths, className))}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
