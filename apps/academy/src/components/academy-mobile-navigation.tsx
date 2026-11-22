'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@opsfoundry/ui';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { academyNavigation } from '../content/homepage';

export interface AcademyMobileNavigationProps {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

export function AcademyMobileNavigation({
  isOpen,
  pathname,
  onClose,
}: AcademyMobileNavigationProps) {
  if (!isOpen) {
    return null;
  }

  const { corporateCrossLink, mobileSections, primaryCta } = academyNavigation;

  return (
    <div
      id="academy-mobile-menu"
      role="region"
      aria-label="Mobile navigation"
      className="xl:hidden border-t border-foundry-border bg-white px-6 py-6 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-2 duration-150"
    >
      <nav aria-label="Mobile navigation links" className="space-y-6">
        {/* Categorized Link Sections */}
        {mobileSections.map((section) => (
          <div key={section.category} className="space-y-2">
            <h3 className="font-display text-[11px] font-bold uppercase tracking-wider text-foundry-secondary px-3">
              {section.category}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                // For pending routes, render a disabled, non-navigating presentation
                if (item.isPendingRoute) {
                  return (
                    <div
                      key={item.label}
                      aria-disabled="true"
                      title={`${item.label} — Route in scoping, scheduled for subsequent stage`}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200/60 cursor-not-allowed select-none"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-academy-primary bg-academy-light-purple px-2 py-0.5 rounded">
                        Scoping
                      </span>
                    </div>
                  );
                }

                const isItemHome = (item.href as string) === '/';
                const isActive =
                  pathname === item.href ||
                  (!isItemHome && pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-academy-light-purple font-semibold text-academy-primary'
                        : 'font-medium text-foundry-slate hover:bg-foundry-canvas'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Corporate Cross-Link and Primary CTA */}
        <div className="pt-4 border-t border-foundry-border flex flex-col gap-3">
          {corporateCrossLink.isExternal ? (
            <a
              href={corporateCrossLink.href}
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-academy-purple-border bg-white px-5 py-2.5 text-xs font-semibold text-academy-primary hover:bg-academy-light-purple hover:border-academy-primary transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
            </a>
          ) : (
            <Link
              href={corporateCrossLink.href}
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-academy-purple-border bg-white px-5 py-2.5 text-xs font-semibold text-academy-primary hover:bg-academy-light-purple hover:border-academy-primary transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-academy-primary" aria-hidden="true" />
            </Link>
          )}

          <Button asChild variant="primary" size="md" className="w-full">
            <Link href={primaryCta.href} onClick={onClose}>
              <span>{primaryCta.label}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
