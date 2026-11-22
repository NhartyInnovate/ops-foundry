import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { AbstractBrandGeometry } from '../../components/abstract-brand-geometry';
import { ContactEnquiryForm } from '../../components/contact-enquiry-form';
import { contactPageContent } from '../../content/supporting-pages';
import { getCorporateSiteUrl } from '../../content/site-config';

export const metadata: Metadata = {
  title: 'Contact Ops Foundry — Discuss Operational Support & Pilots',
  description:
    'Get in touch with Ops Foundry to discuss your operational bottlenecks, explore digital services, or begin scoping a targeted pilot engagement.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Ops Foundry — Discuss Operational Support & Pilots',
    description:
      'Get in touch with Ops Foundry to discuss your operational bottlenecks, explore digital services, or begin scoping a targeted pilot engagement.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const { hero, pilotCallout, formSection } = contactPageContent;
  const siteUrl = getCorporateSiteUrl();

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteUrl}/contact#webpage`,
    url: `${siteUrl}/contact`,
    name: 'Contact Ops Foundry — Discuss Operational Support & Pilots',
    description:
      'Get in touch with Ops Foundry to discuss your operational bottlenecks, explore digital services, or begin scoping a targeted pilot engagement.',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Ops Foundry',
      url: siteUrl,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="relative pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden"
        >
          <AbstractBrandGeometry variant="subtle" />
          <Container className="relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block font-display text-xs font-bold tracking-widest text-foundry-secondary uppercase mb-3">
                Ops Foundry / Contact &amp; Enquiries
              </span>
              <Heading
                as="h1"
                size="display"
                className="mb-6 text-foundry-dark tracking-tight leading-[1.08]"
              >
                {hero.title}
              </Heading>
              <Text
                size="lg"
                tone="default"
                className="mb-8 font-medium leading-relaxed max-w-2xl text-gray-700"
              >
                {hero.lead}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href="#general-enquiry-form">
                    Send General Enquiry
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Contact Main Section */}
        <Section id="general-enquiry-form" tone="pure" spacing="lg">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Direct Pilot Callout & Channels Notice */}
              <div className="lg:col-span-5 space-y-8">
                {/* Structured Pilot Direct Link Card */}
                <div className="rounded-3xl bg-foundry-muted border border-foundry-border p-7 sm:p-8 space-y-5 shadow-xs">
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-foundry-dark border border-foundry-border">
                      Priority Pathway
                    </span>
                    <Heading as="h2" size="sm" tone="default">
                      {pilotCallout.heading}
                    </Heading>
                  </div>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {pilotCallout.body}
                  </Text>
                  <Button asChild variant="primary" size="md" className="w-full sm:w-auto">
                    <Link href={pilotCallout.ctaHref}>
                      {pilotCallout.ctaLabel}
                    </Link>
                  </Button>
                </div>

                {/* Direct Contact Notice */}
                <div className="rounded-2xl border border-foundry-border bg-white p-6 space-y-3 shadow-xs">
                  <Heading as="h3" size="sm" className="text-foundry-dark">
                    Direct Contact Channels
                  </Heading>
                  <p className="text-xs text-foundry-secondary leading-relaxed">
                    Official corporate telephone, email, and registered office addresses are pending publication.
                    In the interim, please use this general enquiry form or our structured pilot intake form.
                  </p>
                </div>
              </div>

              {/* Right Column: General Enquiry Form */}
              <div className="lg:col-span-7">
                <div className="mb-8">
                  <Heading as="h2" size="xl" className="mb-2 text-foundry-dark">
                    {formSection.heading}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {formSection.intro}
                  </Text>
                </div>

                <ContactEnquiryForm />
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
