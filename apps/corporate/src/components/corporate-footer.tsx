import React from 'react';
import Link from 'next/link';
import { Container } from '@opsfoundry/ui';
import { ArrowUpRight } from 'lucide-react';
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
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foundry-orange"
            >
              <span
                className="h-3 w-3 rounded-full bg-foundry-orange shrink-0"
                aria-hidden="true"
              />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                {corporateNavigation.brandName}
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
              <li>
                <a
                  href={corporateNavigation.servicesOverview.href}
                  className="inline-flex items-center gap-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  <span>Services Overview</span>
                </a>
              </li>
              {corporateNavigation.serviceItems.map((service) => (
                <li key={service.id}>
                  <a
                    href={service.href}
                    className="inline-flex flex-wrap items-baseline gap-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                  >
                    <span>{service.title}</span>
                    <span className="text-xs text-gray-500">
                      ({service.plannedRoute} planned)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Navigation & Ecosystem */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-display text-sm font-bold text-white">
              Corporate &amp; Ecosystem
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a
                  href="#why-ops-foundry"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  Why Ops Foundry
                </a>
              </li>
              <li>
                <a
                  href="#operating-pillars"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  Our Operating Pillars
                </a>
              </li>
              <li>
                <a
                  href="#how-we-work"
                  className="inline-flex flex-wrap items-baseline gap-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  <span>How We Work</span>
                  <span className="text-xs text-gray-500">(/how-we-work planned)</span>
                </a>
              </li>
              <li>
                <a
                  href="#who-we-help"
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  Who We Help
                </a>
              </li>
              <li>
                <a
                  href="#academy"
                  className="inline-flex items-center gap-1.5 text-gray-200 hover:text-foundry-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  <span>Ops Foundry Academy</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-foundry-orange" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="#explore-pilot"
                  className="inline-flex flex-wrap items-baseline gap-2 text-foundry-orange font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  <span>Explore a Pilot</span>
                  <span className="text-xs font-normal text-gray-500">(/pilot planned)</span>
                </a>
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
            Dedicated service pages, pilot intake submission, and formal legal policies are scheduled for upcoming Phase 3 milestones.
          </div>
        </div>
      </Container>
    </footer>
  );
}
