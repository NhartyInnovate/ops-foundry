import React from 'react';
import { Heading, Text } from '@opsfoundry/ui';

export interface SectionHeadingProps {
  title: string;
  description?: string;
  tone?: 'default' | 'inverse';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  description,
  tone = 'default',
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignmentClasses =
    align === 'center' ? 'mx-auto text-center max-w-3xl' : 'max-w-3xl';

  return (
    <div className={`${alignmentClasses} ${className}`.trim()}>
      <Heading
        as="h2"
        size="xl"
        tone={tone}
        className={tone === 'default' ? 'text-foundry-slate mb-4' : 'mb-4'}
      >
        {title}
      </Heading>
      {description && (
        <Text
          size="lg"
          tone={tone === 'inverse' ? 'inverseMuted' : 'secondary'}
          className="leading-relaxed"
        >
          {description}
        </Text>
      )}
    </div>
  );
}
