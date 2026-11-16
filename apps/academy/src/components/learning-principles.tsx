import React from 'react';
import { Container, Section, Heading, Text } from '@opsfoundry/ui';
import { learningPhilosophyContent } from '../content/homepage';
import { SectionHeading } from './section-heading';

export function LearningPrinciples() {
  return (
    <Section
      id={learningPhilosophyContent.id}
      tone="slate"
      spacing="lg"
      border="bottom"
    >
      <Container>
        <SectionHeading
          title={learningPhilosophyContent.heading}
          description={learningPhilosophyContent.intro}
          tone="inverse"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {learningPhilosophyContent.principles.map((principle) => (
            <article
              key={principle.number}
              className="rounded-2xl bg-foundry-slate-card border border-foundry-slate-border p-7 lg:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foundry-orange/15 border border-foundry-orange/30 text-foundry-orange font-display font-bold text-xs">
                  {principle.number}
                </div>
                <Heading as="h3" size="sm" tone="inverse" className="mb-3">
                  {principle.title}
                </Heading>
                <Text size="sm" tone="inverseMuted" className="leading-relaxed">
                  {principle.description}
                </Text>
              </div>
            </article>
          ))}
        </div>

        <div
          role="note"
          aria-label="Learning methodology notice"
          className="mt-10 rounded-xl border border-foundry-slate-border bg-foundry-slate-card/70 px-6 py-4 text-xs sm:text-sm text-gray-300 leading-relaxed"
        >
          {learningPhilosophyContent.methodologyNotice}
        </div>
      </Container>
    </Section>
  );
}
