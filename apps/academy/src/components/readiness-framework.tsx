import React from 'react';
import { Heading, Text } from '@opsfoundry/ui';
import { ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { careerOpportunitiesPageContent } from '../content/supporting-pages';

export interface ReadinessFrameworkProps {
  className?: string;
  tone?: 'default' | 'inverse';
}

export function ReadinessFramework({
  className = '',
  tone = 'default',
}: ReadinessFrameworkProps) {
  const { headline, body, supportingLine, howItWorks } = careerOpportunitiesPageContent;
  const isInverse = tone === 'inverse';

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      {/* 1. Header Overview */}
      <div className="max-w-3xl space-y-3">
        <Heading
          as="h2"
          size="lg"
          tone={isInverse ? 'inverse' : 'default'}
          className="tracking-tight"
        >
          {headline}
        </Heading>
        <Text
          size="base"
          tone={isInverse ? 'inverseMuted' : 'secondary'}
          className="leading-relaxed"
        >
          {body}
        </Text>
      </div>

      {/* 2. 5-Step Progression Grid */}
      <div className="space-y-4">
        <h3
          className={`font-display text-xs font-bold uppercase tracking-wider ${
            isInverse ? 'text-purple-300' : 'text-academy-primary'
          }`}
        >
          {howItWorks.heading}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {howItWorks.steps.map((item, idx) => {
            const isLast = idx === howItWorks.steps.length - 1;

            return (
              <div
                key={item.stepNumber}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                  isInverse
                    ? 'bg-foundry-slate-card border-foundry-slate-border text-white'
                    : 'bg-white border-foundry-border shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-foundry-border">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold font-display ${
                        isInverse
                          ? 'bg-academy-primary/30 text-purple-200'
                          : 'bg-foundry-slate text-white'
                      }`}
                    >
                      {item.stepNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-foundry-secondary">
                      Step {item.stepNumber}
                    </span>
                  </div>

                  <h4
                    className={`font-display text-xs font-bold mb-2 leading-snug ${
                      isInverse ? 'text-white' : 'text-foundry-slate'
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p
                    className={`text-xs leading-relaxed ${
                      isInverse ? 'text-gray-300' : 'text-foundry-secondary'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-foundry-border flex items-center justify-between text-[11px]">
                  <span
                    className={
                      isLast
                        ? 'text-emerald-600 font-bold'
                        : isInverse
                        ? 'text-purple-300'
                        : 'text-academy-primary font-medium'
                    }
                  >
                    Step {item.stepNumber}
                  </span>
                  {isLast ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" aria-hidden="true" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Important Employment Reality Notice */}
      <div
        role="note"
        aria-label="Employment reality notice"
        className={`rounded-2xl border p-5 sm:p-6 flex items-start gap-4 ${
          isInverse
            ? 'bg-academy-deep-violet/30 border-academy-primary/40 text-purple-100'
            : 'bg-academy-light-purple/50 border-academy-purple-border text-foundry-slate'
        }`}
      >
        <ShieldAlert
          className="h-5 w-5 text-academy-primary shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-academy-primary">
            Clear Distinction: Training vs. Employment
          </p>
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            {supportingLine}
          </p>
          <p className="text-xs leading-relaxed text-foundry-secondary">
            Training, certification, readiness and hiring are separate decisions. Vacancies, competency benchmarks, interviews and employer selection determine hiring.
          </p>
        </div>
      </div>
    </div>
  );
}
