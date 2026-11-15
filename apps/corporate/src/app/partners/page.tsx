import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Heading, Text, Button } from '@opsfoundry/ui';
import { CorporateHeader } from '../../components/corporate-header';
import { CorporateFooter } from '../../components/corporate-footer';
import { partnersPageContent } from '../../content/supporting-pages';

export const metadata: Metadata = {
  title: 'For Partners — Ops Foundry',
  description:
    'Explore potential collaboration with Ops Foundry across business support organisations, technology providers, training and education partners, corporate teams, and institutional ecosystems.',
  openGraph: {
    title: 'For Partners — Ops Foundry',
    description:
      'Explore potential collaboration with Ops Foundry across business support organisations, technology providers, training and education partners, corporate teams, and institutional ecosystems.',
    type: 'website',
  },
};

export default function PartnersPage() {
  const { hero, collaborationIntro, partnerCategories, howPartnershipWorks, cta } =
    partnersPageContent;

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-dark">
      <CorporateHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Editorial Hero */}
        <Section
          tone="canvas"
          spacing="none"
          border="bottom"
          className="pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
        >
          <Container>
            <div className="max-w-3xl">
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
                className="mb-5 font-medium leading-relaxed"
              >
                {hero.lead}
              </Text>
              <Text
                size="base"
                tone="secondary"
                className="mb-8 leading-relaxed"
              >
                {hero.supporting}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link href="/pilot?service=all" className="inline-flex">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Start a Partnership Conversation
                  </Button>
                </Link>
                <Link href="/how-we-work" className="inline-flex">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Review How We Work
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Partner Categories */}
        <Section tone="pure" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl mb-8">
              <Heading as="h2" size="xl" className="mb-4 text-foundry-dark">
                {collaborationIntro.heading}
              </Heading>
              <Text size="lg" tone="secondary" className="leading-relaxed">
                {collaborationIntro.intro}
              </Text>
            </div>

            <div
              role="note"
              aria-label="Partnership scope notice"
              className="mb-10 rounded-xl border border-foundry-border bg-foundry-canvas px-6 py-4 text-xs sm:text-sm text-foundry-secondary leading-relaxed"
            >
              {collaborationIntro.notice}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {partnerCategories.map((category, idx) => (
                <article
                  key={category.title}
                  className="flex flex-col justify-between rounded-2xl bg-foundry-canvas p-7 lg:p-9 border border-foundry-border"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-foundry-border">
                      <Heading as="h3" size="lg" className="text-foundry-dark">
                        {category.title}
                      </Heading>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foundry-dark text-white font-display font-bold text-xs">
                        0{idx + 1}
                      </span>
                    </div>

                    <Text size="sm" tone="secondary" className="mb-6 leading-relaxed">
                      {category.whoTheyAre}
                    </Text>

                    <div className="rounded-xl bg-white p-5 border border-foundry-border">
                      <h4 className="text-xs font-semibold text-foundry-dark mb-3">
                        Potential Collaboration Areas:
                      </h4>
                      <ul className="space-y-2.5">
                        {category.howWeCanCollaborate.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-foundry-secondary leading-relaxed"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foundry-orange shrink-0"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 3. How We Approach Partnership Conversations */}
        <Section tone="canvas" spacing="lg" border="bottom">
          <Container>
            <div className="max-w-3xl mb-12">
              <Heading as="h2" size="xl" className="text-foundry-dark">
                {howPartnershipWorks.heading}
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {howPartnershipWorks.steps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl bg-white p-7 lg:p-8 border border-foundry-border shadow-xs"
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foundry-dark text-white font-display font-bold text-xs">
                    {step.step}
                  </div>
                  <Heading as="h3" size="sm" className="mb-3 text-foundry-dark">
                    {step.title}
                  </Heading>
                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {step.description}
                  </Text>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. Conversion CTA */}
        <Section tone="dark" spacing="lg">
          <Container>
            <div className="rounded-3xl bg-[#181A1F] border border-white/10 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
              <Heading as="h2" size="xl" tone="inverse" className="mb-4">
                {cta.heading}
              </Heading>
              <Text size="lg" tone="inverseMuted" className="mb-8 max-w-2xl mx-auto leading-relaxed">
                {cta.body}
              </Text>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                <Link href={cta.primaryHref} className="inline-flex justify-center">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    {cta.primaryLabel}
                  </Button>
                </Link>
                <Link href={cta.secondaryHref} className="inline-flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/25 text-white hover:bg-white hover:text-foundry-dark"
                  >
                    {cta.secondaryLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <CorporateFooter />
    </div>
  );
}
