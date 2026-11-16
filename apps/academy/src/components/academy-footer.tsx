import React from 'react';
import Link from 'next/link';
import { Container, Badge } from '@opsfoundry/ui';
import { ArrowUpRight } from 'lucide-react';
import { academyNavigation, academyFooterContent } from '../content/homepage';
import { plannedAcademyProgrammes } from '../content/programmes';

export function AcademyFooter() {
  const { corporateCrossLink } = academyNavigation;

  return (
    <footer
      role="contentinfo"
      className="bg-foundry-slate text-white border-t border-foundry-slate-border pt-16 pb-12"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-foundry-slate-border">
          {/* Column 1: Academy Identity & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foundry-orange"
            >
              <span
                className="h-3 w-3 rounded-full bg-foundry-orange shrink-0"
                aria-hidden="true"
              />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                {academyNavigation.brandName}
              </span>
              <Badge
                variant="brand"
                className="text-[11px] font-semibold px-2.5 py-0.5"
              >
                {academyNavigation.brandSuffix}
              </Badge>
            </Link>

            <p className="font-body text-sm text-gray-300 max-w-sm leading-relaxed">
              {academyFooterContent.description}
            </p>

            <p className="font-body text-xs text-gray-400 max-w-sm leading-relaxed">
              {academyFooterContent.ecosystemNote}
            </p>
          </div>

          {/* Column 2: Academy Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-display text-sm font-bold text-white">
              Academy
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {academyNavigation.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programmes */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-display text-sm font-bold text-white">
              Programmes
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link
                  href="/programmes"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  Programmes Overview
                </Link>
              </li>
              {plannedAcademyProgrammes.map((programme) => (
                <li key={programme.courseId}>
                  <Link
                    href={`/programmes/${programme.slug}`}
                    className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                  >
                    {programme.slotLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Admissions & Ecosystem */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-display text-sm font-bold text-white">
              Admissions &amp; Ecosystem
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  Admissions Overview
                </Link>
              </li>
              <li>
                <Link
                  href={academyNavigation.primaryCta.href}
                  className="font-semibold text-foundry-orange hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  {academyNavigation.primaryCta.label}
                </Link>
              </li>
              <li>
                {corporateCrossLink.isExternal ? (
                  <a
                    href={corporateCrossLink.href}
                    className="inline-flex items-center gap-1.5 text-gray-200 hover:text-foundry-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                  >
                    <span>{corporateCrossLink.label}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-foundry-orange"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Link
                    href={corporateCrossLink.href}
                    className="inline-flex items-center gap-1.5 text-gray-200 hover:text-foundry-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                  >
                    <span>{corporateCrossLink.label}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-foundry-orange"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </li>
            </ul>

            <p className="pt-2 text-xs text-gray-400 leading-relaxed">
              {academyFooterContent.contactGovernanceNote}
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Governance Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} Ops Foundry Academy. All rights reserved.
          </div>
          <div>
            Part of the Ops Foundry operational learning and execution ecosystem.
          </div>
        </div>
      </Container>
    </footer>
  );
}
