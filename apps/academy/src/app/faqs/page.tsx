import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { HelpCircle, ArrowRight, MessageSquare, Info } from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { FaqAccordion } from '../../components/faq-accordion';
import { faqsPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Ops Foundry Academy',
  description:
    'Answers to common questions regarding Ops Foundry Academy, admissions, curriculum structure, tuition transparency, and career opportunities.',
  alternates: {
    canonical: '/faqs',
  },
  openGraph: {
    title: 'Frequently Asked Questions — Ops Foundry Academy',
    description:
      'Clear, honest answers regarding Ops Foundry Academy admissions, curriculum, tuition fees, and career pathways.',
    type: 'website',
  },
};

export default function FaqsPage() {
  const { heading, intro, notice, provisionalFaqs } = faqsPageContent;

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-slate">
      <AcademyHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Editorial Hero */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
        >
          <Container>
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-academy-primary font-display">
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
                <span>Knowledge Base &amp; Answers</span>
              </div>
              <Heading
                as="h1"
                size="display"
                className="text-foundry-slate tracking-tight leading-[1.08]"
              >
                {heading}
              </Heading>
              <Text
                size="xl"
                tone="default"
                className="text-foundry-slate font-medium leading-relaxed"
              >
                {intro}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">
                    <span>Contact the Team</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/admissions">Admissions Guide</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Editorial Compilation Governance Notice */}
        <Section tone="pure" spacing="md" border="bottom">
          <Container>
            <div
              role="note"
              aria-label="FAQ publication status"
              className="rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3 max-w-4xl"
            >
              <Info className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-foundry-slate mb-0.5">Editorial Compilation Notice</p>
                <p className="text-foundry-secondary">
                  {notice} Programme syllabi, weekly time commitments, and fee terms are verified directly on each programme page as cohort specifications are formally approved.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Accordion Categories & Questions */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                  Common Questions
                </span>
                <SectionHeading
                  title="Explore Questions by Category"
                  description="Filter questions across Admissions, Curriculum, Tuition & Funding, and Career Opportunities."
                />
              </div>

              {/* Accessible Interactive Accordion */}
              <FaqAccordion items={provisionalFaqs} />
            </div>
          </Container>
        </Section>

        {/* 4. Have Unanswered Questions? */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="rounded-2xl bg-foundry-canvas p-7 lg:p-8 border border-foundry-border max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-academy-primary" aria-hidden="true" />
                  <Heading as="h3" size="sm" className="text-foundry-slate">
                    Have a specific question not covered here?
                  </Heading>
                </div>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  Our admissions and partnerships team is happy to help with prospective learner questions, partnership inquiries, and pathway recommendations.
                </Text>
              </div>

              <Button asChild variant="outline" size="md" className="shrink-0">
                <Link href="/contact">
                  <span>Contact the Academy</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* 5. Final CTA */}
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-foundry-slate-card border border-foundry-slate-border p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
              <Heading as="h2" size="xl" tone="inverse" className="tracking-tight">
                Ready to explore practical digital operations?
              </Heading>
              <Text
                size="lg"
                tone="inverseMuted"
                className="max-w-2xl mx-auto leading-relaxed"
              >
                Browse our career pathways, compare launch programmes, or read our learning principles.
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/pathways">
                    <span>Explore Pathways</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg" className="w-full sm:w-auto">
                  <Link href="/programmes">Explore Programmes</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <AcademyFooter />
    </div>
  );
}
