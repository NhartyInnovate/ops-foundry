'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export type ScrollAnimationVariant =
  | 'fade-up'
  | 'stagger-1'
  | 'stagger-2'
  | 'stagger-3'
  | 'stagger-4'
  | 'slide-1'
  | 'slide-2'
  | 'slide-3';

const ScrollRevealGroupContext = createContext<boolean | null>(null);

export interface ScrollRevealGroupProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  as?: React.ElementType;
}

export function ScrollRevealGroup({
  children,
  threshold = 0.01,
  rootMargin = '0px 0px -20px 0px',
  className = '',
  as: Component = 'div',
  ...rest
}: ScrollRevealGroupProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 2500);

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          clearTimeout(fallbackTimer);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <ScrollRevealGroupContext.Provider value={inView}>
      <Component ref={containerRef as any} className={className} {...rest}>
        {children}
      </Component>
    </ScrollRevealGroupContext.Provider>
  );
}

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  animation?: ScrollAnimationVariant;
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  animation = 'fade-up',
  threshold = 0.01,
  rootMargin = '0px 0px -20px 0px',
  delayMs = 0,
  className = '',
  as: Component = 'div',
  ...rest
}: ScrollRevealProps) {
  const groupInView = useContext(ScrollRevealGroupContext);
  const isInsideGroup = groupInView !== null;

  const elementRef = useRef<HTMLElement>(null);
  const [selfInView, setSelfInView] = useState(false);

  useEffect(() => {
    // If inside a group, the group's observer dictates inView
    if (isInsideGroup) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setSelfInView(true);
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setSelfInView(true);
    }, 2500);

    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSelfInView(true);
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setSelfInView(true), delayMs);
          } else {
            setSelfInView(true);
          }
          clearTimeout(fallbackTimer);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [isInsideGroup, delayMs, threshold, rootMargin]);

  const activeInView = isInsideGroup ? groupInView : selfInView;

  let animationClass = 'opacity-0';
  if (activeInView) {
    switch (animation) {
      case 'fade-up':
        animationClass = 'animate-reveal';
        break;
      case 'stagger-1':
        animationClass = 'animate-reveal-stagger-1';
        break;
      case 'stagger-2':
        animationClass = 'animate-reveal-stagger-2';
        break;
      case 'stagger-3':
        animationClass = 'animate-reveal-stagger-3';
        break;
      case 'stagger-4':
        animationClass = 'animate-reveal-stagger-4';
        break;
      case 'slide-1':
        animationClass = 'animate-slide-left-1';
        break;
      case 'slide-2':
        animationClass = 'animate-slide-left-2';
        break;
      case 'slide-3':
        animationClass = 'animate-slide-left-3';
        break;
      default:
        animationClass = 'animate-reveal';
    }
  }

  return (
    <Component
      ref={elementRef as any}
      className={`${className} ${animationClass}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
