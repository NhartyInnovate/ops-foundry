import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import {
  Mail,
  ArrowRight,
  HelpCircle,
  Handshake,
  GraduationCap,
  Info,
  Compass,
} from 'lucide-react';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { SectionHeading } from '../../components/section-heading';
import { ContactEnquiryForm } from '../../components/contact-enquiry-form';
import { contactPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'Contact the Academy — Ops Foundry Academy',
  description:
    'Get in touch with the Ops Foundry Academy admissions and partnerships team for prospective learner questions, partnership discussions, and pathway guidance.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact the Academy — Ops Foundry Academy',
    description:
      'Connect with the Ops Foundry Academy team. Review enquiry channels and guidance for upcoming cohort intakes.',
    type: 'website',
  },
};

export default function ContactPage() {
  const { heading, intro, notice, channels } = contactPageContent;

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
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Admissions &amp; Enquiries</span>
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
                  <a href="#contact-form-section">
                    <span>Send an Enquiry</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/faqs">Browse FAQs</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Official Channels & Launch Preparation Notice */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {/* Channel 1: Admissions Support */}
              <div className="rounded-2xl bg-foundry-canvas p-7 border border-foundry-border shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-academy-primary" aria-hidden="true" />
                  <Heading as="h2" size="sm" className="text-foundry-slate">
                    {channels[0].title}
                  </Heading>
                </div>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  {channels[0].description}
                </Text>
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-academy-primary bg-academy-light-purple px-2.5 py-1 rounded-md">
                    {channels[0].status}
                  </span>
                </div>
              </div>

              {/* Channel 2: Institutional Partnerships */}
              <div className="rounded-2xl bg-foundry-canvas p-7 border border-foundry-border shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-academy-primary" aria-hidden="true" />
                  <Heading as="h2" size="sm" className="text-foundry-slate">
                    {channels[1].title}
                  </Heading>
                </div>
                <Text size="xs" tone="secondary" className="leading-relaxed">
                  {channels[1].description}
                </Text>
                <div className="pt-2">
                  <Link
                    href={channels[1].routeHref || '/for-partners'}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-academy-primary hover:underline"
                  >
                    <span>{channels[1].routeLabel || 'Submit a Partner Inquiry'}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Factual Support Notice */}
            <div
              role="note"
              aria-label="Contact governance notice"
              className="rounded-2xl border border-academy-purple-border/70 bg-academy-light-purple/40 p-5 sm:p-6 text-xs sm:text-sm text-foundry-slate leading-relaxed flex items-start gap-3 max-w-4xl"
            >
              <Info className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-foundry-slate mb-0.5">Communications Governance</p>
                <p className="text-foundry-secondary">
                  {notice} To ensure accurate assistance, prospective applicants and organizational sponsors receive direct status updates and notifications via formal intake announcements.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Frontend Contact Form */}
        <Section id="contact-form-section" tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-primary font-display block">
                  Enquiry Form
                </span>
                <Heading as="h2" size="xl" className="text-foundry-slate">
                  Send a Message
                </Heading>
                <Text size="sm" tone="secondary" className="max-w-xl mx-auto leading-relaxed">
                  Have a question about upcoming intakes, eligibility, or learning pathways? Send us your enquiry using the form below.
                </Text>
              </div>

              <ContactEnquiryForm />
            </div>
          </Container>
        </Section>

        {/* 4. Quick Reference Directory Links */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <Heading as="h3" size="md" className="text-foundry-slate">
                  Helpful Academy Resources
                </Heading>
                <Text size="xs" tone="secondary">
                  Explore other areas of the Academy website for immediate information:
                </Text>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/faqs"
                  className="rounded-2xl border border-foundry-border bg-foundry-canvas p-5 hover:border-academy-primary/40 hover:bg-white transition-all text-center space-y-2 group"
                >
                  <HelpCircle className="h-5 w-5 text-academy-primary mx-auto" aria-hidden="true" />
                  <p className="font-display text-xs font-bold text-foundry-slate group-hover:text-academy-primary transition-colors">
                    Frequently Asked Questions
                  </p>
                  <p className="text-[11px] text-foundry-secondary">
                    Review answers across Admissions, Curriculum, and Funding.
                  </p>
                </Link>

                <Link
                  href="/pathways"
                  className="rounded-2xl border border-foundry-border bg-foundry-canvas p-5 hover:border-academy-primary/40 hover:bg-white transition-all text-center space-y-2 group"
                >
                  <Compass className="h-5 w-5 text-academy-primary mx-auto" aria-hidden="true" />
                  <p className="font-display text-xs font-bold text-foundry-slate group-hover:text-academy-primary transition-colors">
                    Career Pathways
                  </p>
                  <p className="text-[11px] text-foundry-secondary">
                    Explore our 4 operational career tracks and role descriptions.
                  </p>
                </Link>

                <Link
                  href="/admissions"
                  className="rounded-2xl border border-foundry-border bg-foundry-canvas p-5 hover:border-academy-primary/40 hover:bg-white transition-all text-center space-y-2 group"
                >
                  <GraduationCap className="h-5 w-5 text-academy-primary mx-auto" aria-hidden="true" />
                  <p className="font-display text-xs font-bold text-foundry-slate group-hover:text-academy-primary transition-colors">
                    Admissions Guide
                  </p>
                  <p className="text-[11px] text-foundry-secondary">
                    Learn about evaluation criteria and intake schedules.
                  </p>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <AcademyFooter />
    </div>
  );
}
