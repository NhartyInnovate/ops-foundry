'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container, Button } from '@opsfoundry/ui';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { corporateNavigation } from '../content/homepage';

export function CorporateHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverOpenedAtRef = useRef<number>(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenus = () => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-foundry-border bg-white/95 backdrop-blur-md transition-colors">
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Brand Lockup */}
        <Link
          href="/"
          onClick={closeMenus}
          className="inline-flex min-h-[44px] shrink-0 whitespace-nowrap items-center gap-2.5 rounded-lg px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foundry-orange"
        >
          <span
            className="h-2.5 w-2.5 rounded-full bg-foundry-orange shrink-0"
            aria-hidden="true"
          />
          <span className="font-display text-xl font-extrabold tracking-tight text-foundry-dark whitespace-nowrap">
            {corporateNavigation.brandName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-gray-700"
        >
          {/* Services Accessible Dropdown */}
          <div
            ref={dropdownRef}
            className="relative shrink-0"
            onMouseEnter={() => {
              setIsServicesOpen((prev) => {
                if (!prev) {
                  hoverOpenedAtRef.current = Date.now();
                }
                return true;
              });
            }}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              aria-controls="desktop-services-menu"
              onClick={() => {
                const elapsedSinceHoverOpen = Date.now() - hoverOpenedAtRef.current;
                if (isServicesOpen && elapsedSinceHoverOpen < 400) {
                  // Prevent immediate click right after mouseEnter from closing the newly hovered dropdown
                  hoverOpenedAtRef.current = 0;
                  setIsServicesOpen(true);
                } else {
                  setIsServicesOpen((prev) => !prev);
                }
              }}
              className="inline-flex min-h-[44px] whitespace-nowrap items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 hover:text-foundry-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors cursor-pointer"
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180 text-foundry-dark' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              id="desktop-services-menu"
              role="region"
              aria-label="Services navigation"
              className={`absolute left-0 top-full pt-2 w-96 z-50 transition-all duration-150 ${
                isServicesOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="rounded-2xl border border-foundry-border bg-white p-3 shadow-xl">
                <a
                  href={corporateNavigation.servicesOverview.href}
                  onClick={closeMenus}
                  className="block rounded-xl p-3 hover:bg-foundry-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-foundry-dark whitespace-nowrap">
                      {corporateNavigation.servicesOverview.title}
                    </span>
                    <span className="text-[11px] font-medium text-foundry-secondary whitespace-nowrap">
                      Section
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-foundry-secondary leading-snug">
                    {corporateNavigation.servicesOverview.summary}
                  </p>
                </a>

                <div className="my-1.5 border-t border-gray-100" />

                <ul className="space-y-1">
                  {corporateNavigation.serviceItems.map((service) => (
                    <li key={service.id}>
                      <a
                        href={service.href}
                        onClick={closeMenus}
                        className="block rounded-xl p-3 hover:bg-foundry-orange-light/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-display text-sm font-semibold text-foundry-dark whitespace-nowrap">
                            {service.title}
                          </span>
                          <span
                            className="text-[11px] text-gray-500 whitespace-nowrap"
                            title={`Dedicated page ${service.plannedRoute} planned for Phase 3B.2`}
                          >
                            {service.plannedRoute} (Planned)
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-foundry-secondary leading-snug">
                          {service.summary}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {corporateNavigation.primaryLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] shrink-0 whitespace-nowrap items-center rounded-lg px-1.5 text-gray-700 hover:text-foundry-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex shrink-0 items-center gap-3">
          <a
            href={corporateNavigation.academyBridge.href}
            className="inline-flex min-h-[40px] shrink-0 whitespace-nowrap items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:border-foundry-dark hover:text-foundry-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-dark transition-colors"
          >
            <span>{corporateNavigation.academyBridge.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-foundry-orange shrink-0" aria-hidden="true" />
          </a>

          <Button asChild variant="secondary" size="sm">
            <a href={corporateNavigation.primaryCta.href}>
              {corporateNavigation.primaryCta.label}
            </a>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="corporate-mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex lg:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-foundry-dark hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <nav
          id="corporate-mobile-navigation"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-foundry-border bg-white shadow-lg"
        >
          <Container className="py-6 space-y-6">
            <div className="space-y-2">
              <div className="px-2 pb-1 text-xs font-semibold text-foundry-secondary">
                Services
              </div>
              <a
                href={corporateNavigation.servicesOverview.href}
                onClick={closeMenus}
                className="flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-foundry-dark hover:bg-foundry-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange"
              >
                <span>{corporateNavigation.servicesOverview.title}</span>
                <span className="text-xs font-normal text-foundry-secondary">Overview</span>
              </a>
              <div className="ml-3 border-l-2 border-foundry-orange-border pl-3 space-y-1">
                {corporateNavigation.serviceItems.map((service) => (
                  <a
                    key={service.id}
                    href={service.href}
                    onClick={closeMenus}
                    className="flex min-h-[44px] flex-col justify-center rounded-xl px-3 py-2 hover:bg-foundry-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange"
                  >
                    <span className="text-sm font-semibold text-foundry-dark">
                      {service.title}
                    </span>
                    <span className="text-xs text-foundry-secondary">
                      {service.summary}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-1">
              {corporateNavigation.primaryLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className="flex min-h-[44px] items-center rounded-xl px-3 py-2 text-sm font-medium text-gray-800 hover:bg-foundry-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-5 flex flex-col gap-3">
              <a
                href={corporateNavigation.academyBridge.href}
                onClick={closeMenus}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-foundry-dark hover:border-foundry-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-dark"
              >
                <span>{corporateNavigation.academyBridge.label}</span>
                <ArrowUpRight className="h-4 w-4 text-foundry-orange" aria-hidden="true" />
              </a>

              <Button asChild variant="primary" size="lg" className="w-full">
                <a href={corporateNavigation.primaryCta.href} onClick={closeMenus}>
                  {corporateNavigation.primaryCta.label}
                </a>
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
