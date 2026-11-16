import React from 'react';
import { Container, Section, Heading, Text } from '@opsfoundry/ui';
import { AcademyHeader } from '../components/academy-header';
import { AcademyHero } from '../components/academy-hero';
import { SectionHeading } from '../components/section-heading';
import { LearningPrinciples } from '../components/learning-principles';
import { ProgrammePreview } from '../components/programme-preview';
import { AdmissionsCta } from '../components/admissions-cta';
import { AcademyFooter } from '../components/academy-footer';
import {
  academyIntroductionContent,
  whoAcademyIsForContent,
} from '../content/homepage';

export default function AcademyHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-slate">
      {/* A. Dedicated Academy Header & Navigation */}
      <AcademyHeader />

      <main id="main-content" className="flex-1">
        {/* B. Hero Section */}
        <AcademyHero />

        {/* C. Academy Introduction */}
        <Section
          id={academyIntroductionContent.id}
          tone="pure"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-4">
                <Heading as="h2" size="xl" className="text-foundry-slate">
                  {academyIntroductionContent.heading}
                </Heading>
                <Text
                  size="lg"
                  tone="default"
                  className="text-foundry-slate font-medium leading-relaxed"
                >
                  {academyIntroductionContent.lead}
                </Text>
              </div>

              <div className="lg:col-span-7 space-y-6">
                {academyIntroductionContent.paragraphs.map((paragraph) => (
                  <Text
                    key={paragraph}
                    size="base"
                    tone="secondary"
                    className="leading-relaxed"
                  >
                    {paragraph}
                  </Text>
                ))}

                <div
                  role="note"
                  aria-label="Academy expectations notice"
                  className="rounded-2xl bg-foundry-canvas p-6 lg:p-7 border border-foundry-border"
                >
                  <Heading as="h3" size="sm" className="text-foundry-slate mb-2">
                    {academyIntroductionContent.commitmentCard.heading}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {academyIntroductionContent.commitmentCard.body}
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* D. Learning Philosophy */}
        <LearningPrinciples />

        {/* E. Programmes Preview */}
        <ProgrammePreview />

        {/* F. Who the Academy Is For */}
        <Section
          id={whoAcademyIsForContent.id}
          tone="pure"
          spacing="lg"
          border="bottom"
        >
          <Container>
            <SectionHeading
              title={whoAcademyIsForContent.heading}
              description={whoAcademyIsForContent.intro}
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {whoAcademyIsForContent.profiles.map((profile, idx) => (
                <article
                  key={profile.title}
                  className="rounded-2xl bg-foundry-canvas p-7 lg:p-8 border border-foundry-border flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-foundry-slate text-white font-display font-bold text-sm">
                      0{idx + 1}
                    </div>
                    <Heading as="h3" size="sm" className="text-foundry-slate mb-3">
                      {profile.title}
                    </Heading>
                    <Text size="sm" tone="secondary" className="leading-relaxed">
                      {profile.description}
                    </Text>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-foundry-canvas px-6 py-4 border border-foundry-border text-xs sm:text-sm text-foundry-secondary">
              {whoAcademyIsForContent.eligibilityNote}
            </div>
          </Container>
        </Section>

        {/* G. Admissions Preview & H. Final CTA */}
        <AdmissionsCta />
      </main>

      {/* I. Dedicated Academy Footer */}
      <AcademyFooter />
    </div>
  );
}
