import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@opsfoundry/ui';
import { ArrowUpRight } from 'lucide-react';
import { academyNavigation, academyFooterContent } from '../content/homepage';
import { careerPathways } from '../content/pathways';

export function AcademyFooter() {
  const { corporateCrossLink, primaryCta } = academyNavigation;

  return (
    <footer
      role="contentinfo"
      className="bg-foundry-slate text-white border-t border-foundry-slate-border pt-16 pb-12"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-foundry-slate-border">
          {/* Column 1: Academy Identity & Purpose */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            {/* Academy Brand Lockup with TeleSoftas Endorsement */}
            <Link
              href="/"
              aria-label="Ops Foundry Academy by TeleSoftas — Homepage"
              className="inline-flex items-center gap-3 sm:gap-3.5 transition-opacity hover:opacity-90 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-primary"
            >
              <Image
                src="/images/brand/academy/academy-logo-dark.svg"
                alt="Ops Foundry Academy"
                width={166}
                height={48}
                className="h-9 sm:h-10 w-auto object-contain select-none"
              />
              <span className="h-6 sm:h-7 w-px bg-white/20" aria-hidden="true" />
              <span className="font-body text-xs sm:text-sm tracking-tight text-white whitespace-nowrap select-none">
                <span className="font-normal text-gray-400">by</span>{' '}
                <span className="font-semibold text-white">TeleSoftas</span>
              </span>
            </Link>

            <p className="font-body text-sm text-gray-300 max-w-sm leading-relaxed">
              {academyFooterContent.description}
            </p>

            <p className="font-body text-xs text-gray-400 max-w-sm leading-relaxed">
              {academyFooterContent.ecosystemNote}
            </p>
          </div>

          {/* Column 2: Learning & Career Pathways */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-purple-300">
              Pathways
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link
                  href="/how-we-learn"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  How Learning Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pathways"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors font-medium text-white"
                >
                  Pathways Directory
                </Link>
              </li>
              {careerPathways.map((pathway) => (
                <li key={pathway.slug}>
                  <Link
                    href={`/pathways/${pathway.slug}`}
                    className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors text-xs text-gray-400 hover:text-gray-200"
                  >
                    {pathway.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Admissions & Opportunities */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-purple-300">
              Admissions &amp; Opportunities
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  Admissions Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/tuition-scholarships"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  Tuition &amp; Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/career-opportunities"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  Career Opportunities
                </Link>
              </li>
              <li className="pt-2 border-t border-foundry-slate-border">
                <Link
                  href="/apply"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors font-medium text-white"
                >
                  Register Interest
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Partners, Support & Ecosystem */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-purple-300">
              Partners &amp; Academy
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link
                  href="/for-partners"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  For Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  About the Academy
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li className="pt-2 border-t border-foundry-slate-border">
                <Link
                  href={primaryCta.href}
                  className="font-semibold text-purple-300 hover:text-purple-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
                >
                  {primaryCta.label}
                </Link>
              </li>
              <li>
                {corporateCrossLink.isExternal ? (
                  <a
                    href={corporateCrossLink.href}
                    className="inline-flex items-center gap-1.5 text-gray-300 hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors text-xs"
                  >
                    <span>{corporateCrossLink.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-purple-400" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={corporateCrossLink.href}
                    className="inline-flex items-center gap-1.5 text-gray-300 hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors text-xs"
                  >
                    <span>{corporateCrossLink.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-purple-400" aria-hidden="true" />
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
