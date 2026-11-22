import React from 'react';
import { Heading, Text } from '@opsfoundry/ui';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { homepageLearningPathwaySection } from '../content/homepage';

export interface LearningJourneyStepperProps {
  className?: string;
  tone?: 'default' | 'inverse';
}

export function LearningJourneyStepper({
  className = '',
  tone = 'default',
}: LearningJourneyStepperProps) {
  const { steps } = homepageLearningPathwaySection;
  const isInverse = tone === 'inverse';

  return (
    <div className={`space-y-6 ${className}`.trim()}>
      <ol
        aria-label="Academy 4-Stage Learning Journey"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
      >
        {steps.map((item, idx) => {
          const isLast = idx === steps.length - 1;

          return (
            <li
              key={item.stepNumber}
              className={`relative rounded-2xl p-6 lg:p-7 border flex flex-col justify-between transition-all ${
                isInverse
                  ? 'bg-foundry-slate-card border-foundry-slate-border text-white'
                  : 'bg-white border-foundry-border shadow-xs'
              }`}
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-foundry-border">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold font-display tracking-wider ${
                      isInverse
                        ? 'bg-academy-primary/30 text-purple-200 border border-academy-primary/50'
                        : 'bg-academy-primary text-white'
                    }`}
                  >
                    {item.stepNumber}
                  </span>

                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isInverse ? 'text-gray-400' : 'text-foundry-secondary'
                    }`}
                  >
                    Stage {item.stepNumber}
                  </span>
                </div>

                {/* Step Title (Approved 4 stage labels from Master Brief) */}
                <Heading
                  as="h3"
                  size="sm"
                  tone={isInverse ? 'inverse' : 'default'}
                  className="mb-2 font-bold"
                >
                  {item.title}
                </Heading>

                {/* Step Description */}
                <Text
                  size="sm"
                  tone={isInverse ? 'inverseMuted' : 'secondary'}
                  className="leading-relaxed"
                >
                  {item.description}
                </Text>
              </div>

              {/* Bottom Meta Bar: Stage Step Indicator */}
              <div className="pt-4 mt-4 border-t border-foundry-border flex items-center justify-between text-xs">
                <span
                  className={`font-semibold ${
                    isInverse ? 'text-purple-300' : 'text-academy-primary'
                  }`}
                >
                  Stage {item.stepNumber}
                </span>

                {!isLast && (
                  <ArrowRight
                    className={`h-3.5 w-3.5 shrink-0 hidden lg:inline-block ${
                      isInverse ? 'text-gray-500' : 'text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                )}
                {isLast && (
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-emerald-500 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
