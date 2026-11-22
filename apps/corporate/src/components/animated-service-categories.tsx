'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';

export interface ServiceCategoryItem {
  slug: string;
  title: string;
  description: string;
  href: string;
}

interface AnimatedServiceCategoriesProps {
  categories: readonly ServiceCategoryItem[] | ServiceCategoryItem[];
}

export function AnimatedServiceCategories({ categories }: AnimatedServiceCategoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, trigger immediately without wait
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const element = containerRef.current;
    if (!element) {
      setInView(true);
      return;
    }

    // Trigger animation when the element enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-14 pt-10 border-t border-foundry-border grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {categories.map((category, index) => {
        const animationClass = inView
          ? index === 0
            ? 'animate-slide-in-card-1'
            : index === 1
            ? 'animate-slide-in-card-2'
            : 'animate-slide-in-card-3'
          : 'opacity-0';

        return (
          <div
            key={category.slug}
            className={`flex flex-col justify-between space-y-5 border-l-2 border-foundry-dark pl-5 ${animationClass}`}
          >
            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-foundry-dark">
                {category.title}
              </h2>
              <p className="font-body text-sm text-foundry-secondary leading-relaxed">
                {category.description}
              </p>
            </div>
            <div className="pt-2">
              <Button asChild variant="primary" size="md">
                <Link href={category.href}>
                  <span>Explore {category.title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
