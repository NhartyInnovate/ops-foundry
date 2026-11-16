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

  const { corporateCrossLink } = academyNavigation;

  return (
    <div
      id="academy-mobile-menu"
      role="region"
      aria-label="Mobile navigation"
      className="lg:hidden border-t border-foundry-border bg-white px-6 py-6 shadow-xl"
    >
      <nav aria-label="Mobile navigation links" className="space-y-4">
        <div className="space-y-1">
          {academyNavigation.items.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`block rounded-xl px-3 py-2.5 text-base transition-colors ${
                  isActive
                    ? 'bg-foundry-canvas font-semibold text-foundry-orange'
                    : 'font-medium text-foundry-slate hover:bg-foundry-canvas'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-foundry-border flex flex-col gap-3">
          {corporateCrossLink.isExternal ? (
            <a
              href={corporateCrossLink.href}
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-foundry-slate hover:border-foundry-slate transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-foundry-orange" aria-hidden="true" />
            </a>
          ) : (
            <Link
              href={corporateCrossLink.href}
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-foundry-slate hover:border-foundry-slate transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-foundry-orange" aria-hidden="true" />
            </Link>
          )}

          <Button asChild variant="primary" size="md" className="w-full">
            <Link href={academyNavigation.primaryCta.href} onClick={onClose}>
              <span>{academyNavigation.primaryCta.label}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
