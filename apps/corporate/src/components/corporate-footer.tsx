import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@opsfoundry/ui';
import { corporateNavigation } from '../content/homepage';

export function CorporateFooter() {
  return (
    <footer
      role="contentinfo"
      className="bg-foundry-dark text-white border-t border-foundry-dark-border pt-16 pb-12"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-foundry-dark-border">
          {/* Column 1: Brand Identity & Positioning */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 sm:gap-3.5 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="Ops Foundry by TeleSoftas — Home"
            >
              <Image
                src="/images/brand/ops-foundry-logo-dark.svg"
                alt="Ops Foundry"
                width={160}
                height={55}
                className="h-auto w-[140px] sm:w-[160px] object-contain"
              />
              <span
                className="h-6 sm:h-7 w-px bg-white/20"
                aria-hidden="true"
              />
              <span className="font-body text-xs sm:text-sm tracking-tight text-white whitespace-nowrap select-none">
                <span className="font-normal text-gray-400">by</span>{' '}
                <span className="font-semibold text-white">TeleSoftas</span>
              </span>
            </Link>

            <p className="font-body text-sm text-gray-300 max-w-sm leading-relaxed">
              Your business has work to do. We help you get it done. Ops Foundry combines managed teams, structured workflows, and AI-enabled tools to help businesses execute reliably.
            </p>

            <p className="font-body text-xs text-gray-400 max-w-sm leading-relaxed">
              Human-AI operational infrastructure across digital presence, content visibility, and customer pipeline operations.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-display text-sm font-bold text-white">
              Services
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {corporateNavigation.serviceItems.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                  >
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-display text-sm font-bold text-white">
              Company
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link
                  href="/how-we-work"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  How We Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Governance Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} Ops Foundry. All rights reserved.
          </div>
          <div className="text-gray-400">
            Formal legal policies and live database inquiry submission are scheduled for publication prior to public launch.
          </div>
        </div>
      </Container>
    </footer>
  );
}
