'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container, Button } from '@opsfoundry/ui';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { academyNavigation } from '../content/homepage';
import { AcademyMobileNavigation } from './academy-mobile-navigation';

export function AcademyHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const { corporateCrossLink } = academyNavigation;
  const isAdmissionsActive =
    pathname === academyNavigation.primaryCta.href ||
    pathname.startsWith(`${academyNavigation.primaryCta.href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-foundry-border bg-white/95 backdrop-blur-md transition-colors">
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Academy Brand Lockup with TeleSoftas Endorsement */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          aria-label="Ops Foundry Academy by TeleSoftas — Homepage"
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 sm:gap-3 rounded-lg px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-primary"
        >
          <Image
            src="/images/brand/academy/academy-logo.svg"
            alt="Ops Foundry Academy"
            width={166}
            height={48}
            priority
            className="h-8 sm:h-9 w-auto object-contain select-none"
          />
          <span
            className="h-5 sm:h-6 w-px bg-gray-300"
            aria-hidden="true"
          />
          <span className="font-body text-xs sm:text-sm tracking-tight text-foundry-slate whitespace-nowrap select-none">
            <span className="font-normal text-foundry-slate/70">by</span>{' '}
            <span className="font-semibold text-foundry-slate">TeleSoftas</span>
          </span>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Academy primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-gray-700"
        >
          {academyNavigation.items.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-[44px] shrink-0 whitespace-nowrap items-center rounded-lg px-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary ${
                  isActive
                    ? 'font-semibold text-academy-primary'
                    : 'text-gray-700 hover:text-foundry-slate'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Cross-Property Link & Primary CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {corporateCrossLink.isExternal ? (
            <a
              href={corporateCrossLink.href}
              className="inline-flex min-h-[40px] whitespace-nowrap items-center gap-1.5 rounded-full border border-academy-purple-border bg-white px-4 py-2 text-xs font-semibold text-academy-primary hover:bg-academy-light-purple hover:border-academy-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-academy-primary shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <Link
              href={corporateCrossLink.href}
              className="inline-flex min-h-[40px] whitespace-nowrap items-center gap-1.5 rounded-full border border-academy-purple-border bg-white px-4 py-2 text-xs font-semibold text-academy-primary hover:bg-academy-light-purple hover:border-academy-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-academy-primary shrink-0" aria-hidden="true" />
            </Link>
          )}

          <Button asChild variant="primary" size="sm">
            <Link
              href={academyNavigation.primaryCta.href}
              aria-current={isAdmissionsActive ? 'page' : undefined}
            >
              {academyNavigation.primaryCta.label}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="academy-mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-foundry-slate hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AcademyMobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
        items={academyNavigation.items}
        corporateCrossLink={corporateCrossLink}
      />
    </header>
  );
}
