/**
 * Ops Foundry Academy — Admissions Application Content Module
 *
 * Source of Truth: Ops_Foundry_Academy_Website_Master_Brief.docx (Sections 01, 02, 05, 07, 10, 11)
 *
 * Contains approved copy for the cohort application interface, including
 * candidate evaluation fields, launch programme tracks, and publication controls.
 */

export interface AcademyApplicationConfig {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  governanceNotice: string;
  statusBanner: {
    badge: string;
    heading: string;
    body: string;
  };
  launchProgrammes: {
    slug: string;
    title: string;
    trackNumber: string;
    summary: string;
  }[];
}

export const academyApplicationConfig: AcademyApplicationConfig = {
  id: 'academy-intake-application',
  slug: 'apply',
  title: 'Register Interest for Upcoming Intakes',
  shortTitle: 'Register Interest',
  badge: 'Intake Preparation Mode',
  description:
    'Register interest to build practical skills for modern business operations. We review eligibility, motivation and readiness, and may require an aptitude assessment or practical task. Admission decisions and scholarship decisions are separate.',
  governanceNotice:
    'Publication Control: In accordance with institutional publication standards, official cohort dates, formats, durations, and tuition fees remain subject to formal approval before launch. This application interface operates in demonstration and scoping mode.',
  statusBanner: {
    badge: 'Intake Scoping Status',
    heading: 'Cohort Admissions Preparation',
    body:
      'Programme details and schedules for our launch programmes are currently undergoing final confirmation. Prospective learners can review the admissions stages below and register their interest for upcoming intakes.',
  },
  launchProgrammes: [
    {
      slug: 'growth-operations',
      title: 'Growth Operations Programme',
      trackNumber: 'Track 01',
      summary:
        'Practical training in market research, prospect data verification, CRM organization, and commercial pipeline workflows.',
    },
    {
      slug: 'content-operations',
      title: 'Content Operations Programme',
      trackNumber: 'Track 02',
      summary:
        'Practical training in digital copywriting, editorial calendar management, CMS staging, and structured asset workflows.',
    },
    {
      slug: 'web-digital-operations',
      title: 'Web & Digital Operations Programme',
      trackNumber: 'Track 03',
      summary:
        'Hands-on training in website page construction, CMS management, quality assurance testing, and form integration workflows.',
    },
  ],
};

// Re-export for compatibility with legacy import references
export const fellowshipCohortOneApplication = {
  id: academyApplicationConfig.id,
  slug: academyApplicationConfig.slug,
  title: academyApplicationConfig.title,
  shortTitle: academyApplicationConfig.shortTitle,
  badge: academyApplicationConfig.badge,
  description: academyApplicationConfig.description,
  cohort: {
    name: 'Launch Cohort',
    launchDate: 'Dates undergoing institutional confirmation',
    deadline: 'Application window will be announced alongside cohort opening',
    deadlineISO: '',
  },
  scholarshipNotice:
    'Scholarship and funding opportunities from Ops Foundry Academy and approved partners will be announced alongside confirmed intake specifications. Admission decisions and scholarship decisions are separate.',
  sectionOne: {
    stepNumber: '01',
    heading: 'Section 1: Candidate & Contact Details',
    intro:
      'Please provide your accurate personal details as they appear on official identification.',
    hubProximityIntro:
      'Delivery formats (online, hybrid, or hub-based) will be confirmed prior to cohort opening.',
  },
};
