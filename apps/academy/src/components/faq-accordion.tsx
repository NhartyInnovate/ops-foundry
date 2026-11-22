'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../content/supporting-pages';

export interface FaqAccordionProps {
  items: readonly FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Admissions', 'Curriculum', 'Tuition & Funding', 'Career Opportunities'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className={`space-y-6 ${className}`.trim()}>
      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="FAQ categories"
        className="flex flex-wrap items-center gap-2 pb-2"
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-academy-primary text-white shadow-xs'
                  : 'bg-white text-foundry-slate border border-foundry-border hover:border-academy-primary/40 hover:bg-academy-light-purple/30'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);
          const controlId = `faq-answer-${idx}`;
          const buttonId = `faq-question-${idx}`;

          return (
            <div
              key={item.question}
              className="rounded-2xl border border-foundry-border bg-white transition-colors overflow-hidden"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={controlId}
                  onClick={() => toggleItem(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-gray-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-foundry-slate">
                    {item.question}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-academy-primary bg-academy-light-purple px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-foundry-secondary transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-academy-primary' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={controlId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-foundry-secondary leading-relaxed border-t border-gray-100"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
