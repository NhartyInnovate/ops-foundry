import React from 'react';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { ArrowRight } from 'lucide-react';
import { academyHeroContent } from '../content/homepage';

export function AcademyHero() {
  return (
    <Section
      tone="canvas"
      spacing="none"
      border="bottom"
      className="pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline, Supporting Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            <Heading
              as="h1"
              size="display"
              className="text-foundry-slate tracking-tight leading-[1.08]"
            >
              {academyHeroContent.headline}
            </Heading>

            <Text
              size="xl"
              tone="secondary"
              className="max-w-2xl leading-relaxed font-normal"
            >
              {academyHeroContent.supporting}
            </Text>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                <Link href={academyHeroContent.primaryCta.href}>
                  <span>{academyHeroContent.primaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href={academyHeroContent.secondaryCta.href}>
                  {academyHeroContent.secondaryCta.label}
                </Link>
              </Button>
            </div>

            {/* Four Approved Learning Journey Highlights */}
            <div className="pt-8 border-t border-foundry-border grid grid-cols-2 lg:grid-cols-4 gap-5">
              {academyHeroContent.highlights.map((item) => (
                <div key={item.title} className="space-y-1">
                  <p className="font-display text-sm font-bold text-foundry-slate">
                    {item.title}
                  </p>
                  <p className="text-xs text-foundry-secondary leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Documentary Collaborative Work Composition */}
          <div className="lg:col-span-5">
            <figure className="relative rounded-3xl overflow-hidden border border-foundry-border bg-white shadow-sm">
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/4.2] w-full overflow-hidden bg-gray-100">
                <img
                  src={academyHeroContent.visual.imageSrc}
                  alt={academyHeroContent.visual.imageAlt}
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                />
              </div>
              <figcaption className="p-6 bg-foundry-slate text-white border-t border-foundry-slate-border">
                <p className="font-display text-sm font-bold text-white mb-1">
                  {academyHeroContent.visual.captionTitle}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {academyHeroContent.visual.captionBody}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </Section>
  );
}
