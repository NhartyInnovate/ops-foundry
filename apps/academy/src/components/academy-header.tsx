'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container, Button } from '@opsfoundry/ui';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { academyNavigation } from '../content/homepage';
import { AcademyMobileNavigation } from './academy-mobile-navigation';

export function AcademyHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on Escape key or outside clicks
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const { corporateCrossLink, primaryLinks, dropdownGroups, primaryCta } = academyNavigation;

  const isCtaActive = pathname === primaryCta.href || pathname.startsWith(`${primaryCta.href}/`);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-foundry-border bg-white/95 backdrop-blur-md transition-colors">
      <Container className="flex h-20 items-center justify-between gap-3 lg:gap-4">
        {/* Academy Brand Lockup with TeleSoftas Endorsement */}
        <Link
          href="/"
          onClick={() => {
            closeMobileMenu();
            setOpenDropdown(null);
          }}
          aria-label="Ops Foundry Academy by TeleSoftas — Homepage"
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 sm:gap-2.5 rounded-lg px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-primary"
        >
          <Image
            src="/images/brand/academy/academy-logo.svg"
            alt="Ops Foundry Academy"
            width={166}
            height={48}
            priority
            className="h-8 sm:h-8.5 w-auto object-contain select-none"
          />
          <span className="h-5 w-px bg-gray-300" aria-hidden="true" />
          <span className="font-body text-xs sm:text-xs tracking-tight text-foundry-slate whitespace-nowrap select-none">
            <span className="font-normal text-foundry-slate/70">by</span>{' '}
            <span className="font-semibold text-foundry-slate">TeleSoftas</span>
          </span>
        </Link>

        {/* Desktop Primary Navigation with Clean Groupings */}
        <nav
          ref={navRef}
          aria-label="Academy primary navigation"
          className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs 2xl:text-sm font-medium text-gray-700"
        >
          {/* 1. Core Primary Link (How Learning Works) */}
          {primaryLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-[38px] shrink-0 whitespace-nowrap items-center rounded-lg px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary ${
                  isActive
                    ? 'font-semibold text-academy-primary bg-academy-light-purple/60'
                    : 'text-gray-700 hover:text-foundry-slate hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* 2. Accessible Dropdown Groups */}
          {dropdownGroups.map((group) => {
            const isGroupActive = group.items.some(
              (sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)
            );
            const isOpen = openDropdown === group.label;

            return (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => toggleDropdown(group.label)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenDropdown(group.label);
                    }
                  }}
                  className={`inline-flex min-h-[38px] shrink-0 whitespace-nowrap items-center gap-1 rounded-lg px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary cursor-pointer ${
                    isGroupActive || isOpen
                      ? 'font-semibold text-academy-primary bg-academy-light-purple/60'
                      : 'text-gray-700 hover:text-foundry-slate hover:bg-gray-50'
                  }`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-academy-primary' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown Menu Pane */}
                {isOpen && (
                  <div
                    role="menu"
                    aria-label={group.label}
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                  >
                    <div className="w-64 rounded-2xl border border-foundry-border bg-white p-2 shadow-xl ring-1 ring-black/5">
                      {group.items.map((subItem) => {
                        if (subItem.isPendingRoute) {
                          return (
                            <div
                              key={subItem.label}
                              role="menuitem"
                              aria-disabled="true"
                              title={`${subItem.label} — Route in scoping, scheduled for subsequent stage`}
                              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50/70 cursor-not-allowed select-none mb-1 last:mb-0"
                            >
                              <span>{subItem.label}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-academy-primary bg-academy-light-purple px-1.5 py-0.5 rounded">
                                Scoping
                              </span>
                            </div>
                          );
                        }

                        const isSubActive =
                          pathname === subItem.href || pathname.startsWith(`${subItem.href}/`);

                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors mb-1 last:mb-0 ${
                              isSubActive
                                ? 'bg-academy-light-purple font-semibold text-academy-primary'
                                : 'text-foundry-slate hover:bg-foundry-canvas hover:text-academy-primary'
                            }`}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Cross-Property Link & Primary CTA */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          {corporateCrossLink.isExternal ? (
            <a
              href={corporateCrossLink.href}
              className="inline-flex min-h-[36px] whitespace-nowrap items-center gap-1 rounded-full border border-academy-purple-border/80 bg-white px-3 py-1.5 text-xs font-semibold text-academy-primary hover:bg-academy-light-purple hover:border-academy-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3 w-3 text-academy-primary shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <Link
              href={corporateCrossLink.href}
              className="inline-flex min-h-[36px] whitespace-nowrap items-center gap-1 rounded-full border border-academy-purple-border/80 bg-white px-3 py-1.5 text-xs font-semibold text-academy-primary hover:bg-academy-light-purple hover:border-academy-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-primary transition-colors"
            >
              <span>{corporateCrossLink.label}</span>
              <ArrowUpRight className="h-3 w-3 text-academy-primary shrink-0" aria-hidden="true" />
            </Link>
          )}

          <Button asChild variant="primary" size="sm" className="whitespace-nowrap px-4">
            <Link href={primaryCta.href} aria-current={isCtaActive ? 'page' : undefined}>
              {primaryCta.label}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex xl:hidden items-center gap-2">
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
      />
    </header>
  );
}
