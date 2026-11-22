import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { Container, Section } from '@opsfoundry/ui';
import { AcademyHeader } from '../../components/academy-header';
import { AcademyFooter } from '../../components/academy-footer';
import { FellowshipApplicationForm } from '../../components/fellowship-application-form';
import { fellowshipCohortOneApplication } from '../../content/fellowship-application';

export const metadata: Metadata = {
  title: 'Apply for an Open Intake — Ops Foundry Academy',
  description:
    'Apply to build practical skills for modern business operations. We review eligibility, motivation and readiness, and may require an aptitude assessment or practical task. Admission decisions and scholarship decisions are separate.',
  alternates: {
    canonical: '/apply',
  },
  openGraph: {
    title: 'Apply for an Open Intake — Ops Foundry Academy',
    description:
      'Apply to build practical skills for modern business operations. We review eligibility, motivation and readiness, and may require an aptitude assessment or practical task. Admission decisions and scholarship decisions are separate.',
    type: 'website',
  },
};

interface ApplyPageProps {
  searchParams?: Promise<{ programme?: string }>;
}

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const programmeParam = resolvedParams?.programme || fellowshipCohortOneApplication.slug;

  return (
    <div className="min-h-screen flex flex-col bg-foundry-canvas text-foundry-slate">
      <AcademyHeader />

      <main id="main-content" className="flex-1 py-10 sm:py-14 lg:py-16">
        <Container className="max-w-4xl">
          {/* Breadcrumb Navigation Trail */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-foundry-secondary">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
                >
                  Academy Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
                >
                  Admissions
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-foundry-slate">
                Apply for an Intake
              </li>
            </ol>
          </nav>

          <Suspense
            fallback={
              <div className="rounded-3xl border border-foundry-border bg-white p-12 text-center text-sm text-foundry-secondary animate-pulse">
                Loading application form...
              </div>
            }
          >
            <FellowshipApplicationForm programmeParam={programmeParam} />
          </Suspense>
        </Container>
      </main>

      <AcademyFooter />
    </div>
  );
}
