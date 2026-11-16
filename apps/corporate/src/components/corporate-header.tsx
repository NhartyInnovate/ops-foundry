'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Button } from '@opsfoundry/ui';
import { ChevronDown, Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react';
import { corporateNavigation } from '../content/homepage';

export function CorporateHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverOpenedAtRef = useRef<number>(0);

  const isServicesActive = pathname === '/services' || pathname.startsWith('/services/');
  const isHomeActive = pathname === '/';

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
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-gray-700"
        >
          <Link
            href="/"
            aria-current={isHomeActive ? 'page' : undefined}
            className={`inline-flex min-h-[44px] shrink-0 whitespace-nowrap items-center rounded-lg px-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange ${
              isHomeActive
                ? 'font-semibold text-foundry-orange'
                : 'text-gray-700 hover:text-foundry-dark'
            }`}
          >
            Home
          </Link>

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
                  hoverOpenedAtRef.current = 0;
                  setIsServicesOpen(true);
                } else {
                  setIsServicesOpen((prev) => !prev);
                }
              }}
              className={`inline-flex min-h-[44px] whitespace-nowrap items-center gap-1.5 rounded-lg px-2 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange cursor-pointer ${
                isServicesActive
                  ? 'font-semibold text-foundry-orange'
                  : 'font-medium text-gray-700 hover:text-foundry-dark'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen
                    ? 'rotate-180 text-foundry-dark'
                    : isServicesActive
                      ? 'text-foundry-orange'
                      : 'text-gray-500'
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
                <Link
                  href={corporateNavigation.servicesOverview.href}
                  aria-current={pathname === '/services' ? 'page' : undefined}
                  onClick={closeMenus}
                  className={`block rounded-xl p-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange ${
                    pathname === '/services'
                      ? 'bg-foundry-orange-light/70'
                      : 'hover:bg-foundry-canvas'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-foundry-dark whitespace-nowrap">
                      {corporateNavigation.servicesOverview.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-foundry-orange shrink-0" aria-hidden="true" />
                  </div>
                  <p className="mt-0.5 text-xs text-foundry-secondary leading-snug">
                    {corporateNavigation.servicesOverview.summary}
                  </p>
                </Link>

                <div className="my-1.5 border-t border-gray-100" />

                <ul className="space-y-1">
                  {corporateNavigation.serviceItems.map((service) => {
                    const isItemActive = pathname === service.href;
                    return (
                      <li key={service.id}>
                        <Link
                          href={service.href}
                          aria-current={isItemActive ? 'page' : undefined}
                          onClick={closeMenus}
                          className={`block rounded-xl p-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange ${
                            isItemActive
                              ? 'bg-foundry-orange-light/70'
                              : 'hover:bg-foundry-orange-light/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-display text-sm font-semibold text-foundry-dark whitespace-nowrap">
                              {service.title}
                            </span>
                            <ArrowRight
                              className={`h-3.5 w-3.5 shrink-0 ${
                                isItemActive ? 'text-foundry-orange' : 'text-gray-400'
                              }`}
                              aria-hidden="true"
                            />
                          </div>
                          <p className="mt-0.5 text-xs text-foundry-secondary leading-snug">
                            {service.summary}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {corporateNavigation.primaryLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-[44px] shrink-0 whitespace-nowrap items-center rounded-lg px-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foundry-orange ${
                  isActive
                    ? 'font-semibold text-foundry-orange'
                    : 'text-gray-700 hover:text-foundry-dark'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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

          <Button
            asChild
            variant={pathname === '/pilot' ? 'primary' : 'secondary'}
            size="sm"
          >
            <Link
              href={corporateNavigation.primaryCta.href}
              aria-current={pathname === '/pilot' ? 'page' : undefined}
            >
              {corporateNavigation.primaryCta.label}
            </Link>
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
            <div className="space-y-1">
              <Link
                href="/"
                aria-current={isHomeActive ? 'page' : undefined}
                onClick={closeMenus}
                className={`flex min-h-[44px] items-center rounded-xl px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange ${
                  isHomeActive
                    ? 'bg-foundry-orange-light/70 text-foundry-orange'
                    : 'text-foundry-dark hover:bg-foundry-canvas'
                }`}
              >
                Home
              </Link>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-4">
              <div className="px-3 pb-1 text-xs font-semibold text-foundry-secondary">
                Services
              </div>
              <Link
                href={corporateNavigation.servicesOverview.href}
                aria-current={pathname === '/services' ? 'page' : undefined}
                onClick={closeMenus}
                className={`flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange ${
                  pathname === '/services'
                    ? 'bg-foundry-orange-light/70 text-foundry-orange'
                    : 'text-foundry-dark hover:bg-foundry-canvas'
                }`}
              >
                <span>{corporateNavigation.servicesOverview.title}</span>
                <span className="text-xs font-normal text-foundry-secondary">Overview</span>
              </Link>
              <div className="ml-3 border-l-2 border-foundry-orange-border pl-3 space-y-1">
                {corporateNavigation.serviceItems.map((service) => {
                  const isItemActive = pathname === service.href;
                  return (
                    <Link
                      key={service.id}
                      href={service.href}
                      aria-current={isItemActive ? 'page' : undefined}
                      onClick={closeMenus}
                      className={`flex min-h-[44px] flex-col justify-center rounded-xl px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange ${
                        isItemActive
                          ? 'bg-foundry-orange-light/70 text-foundry-orange'
                          : 'hover:bg-foundry-canvas text-foundry-dark'
                      }`}
                    >
                      <span className="text-sm font-semibold">
                        {service.title}
                      </span>
                      <span className="text-xs text-foundry-secondary">
                        {service.summary}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-1">
              {corporateNavigation.primaryLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMenus}
                    className={`flex min-h-[44px] items-center rounded-xl px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-orange ${
                      isActive
                        ? 'bg-foundry-orange-light/70 font-semibold text-foundry-orange'
                        : 'text-gray-800 hover:bg-foundry-canvas'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
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
                <Link href={corporateNavigation.primaryCta.href} onClick={closeMenus}>
                  {corporateNavigation.primaryCta.label}
                </Link>
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
