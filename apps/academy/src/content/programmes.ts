import type { ProgrammeFrontmatter } from '@opsfoundry/types';

/**
 * Ops Foundry Academy — Programme Architecture & Content Module
 *
 * Source of Truth: Ops_Foundry_Academy_Website_Master_Brief.docx (Sections 01, 02, 05, 06, 07, 11)
 *
 * Architectural Boundary (Master Brief Section 05):
 * A Career Pathway describes the kind of work a learner may pursue, the skills
 * required, and the operational domains behind modern businesses.
 * A Training Programme describes the actual training offer, including its structure,
 * schedule, price, delivery mode, and cohort intake once approved.
 *
 * Publication Governance (Master Brief Section 11):
 * "Keep programmes, scholarship listings and fees unpublished until approved;
 * allow site to launch with pathways and registration of interest."
 *
 * All launch programmes are held in:
 * - programmeStatus: 'upcoming'
 * - publicationStatus: 'pending_approval'
 * - ctaMode: 'register_interest'
 *
 * Internal Draft vs. Public Content Separation (Stage 5.1):
 * Unsupported programme-specific details (specific software vendors, unapproved
 * prerequisites, detailed module rubrics, and provisional hours) remain internal
 * draft data structures only and are NOT exposed on public pages.
 */

/**
 * Master Brief Section 11 Publication Switch (Stage 5.3):
 * "Keep programmes, scholarship listings and fees unpublished until approved;
 * allow site to launch with pathways and registration of interest."
 *
 * Set to `false` (Decision B — Strict Public Launch Boundary).
 * Routes `/programmes` and `/programmes/[slug]` return 404 until leadership
 * formally approves publication.
 */
export const IS_PROGRAMMES_PUBLIC_APPROVED = false;

export type ProgrammeLifecycleStatus =
  | 'draft'
  | 'upcoming'
  | 'open'
  | 'full'
  | 'waitlist'
  | 'closed'
  | 'archived';

export type ProgrammePublicationStatus =
  | 'draft'
  | 'pending_approval'
  | 'published';

export type ProgrammeCtaMode = 'apply' | 'join_waitlist' | 'register_interest';

export type ProgrammeSlug =
  | 'growth-operations'
  | 'content-operations'
  | 'web-digital-operations';

export interface ProgrammeSpecificationArea {
  area: string;
  status: 'Under review' | 'Pending approval' | 'Pending partner confirmation' | 'Confirmed';
  explanation: string;
}

export interface AcademyProgrammeSlot extends ProgrammeFrontmatter {
  id: string;
  courseId: 'COURSE_01' | 'COURSE_02' | 'COURSE_03';
  slug: ProgrammeSlug;
  trackNumber: '01' | '02' | '03';
  slotLabel: string;
  title: string;
  provisionalTitle: string | null;
  isOfficialTitle: boolean;
  statusLabel: string;
  programmeStatus: ProgrammeLifecycleStatus;
  publicationStatus: ProgrammePublicationStatus;
  ctaMode: ProgrammeCtaMode;
  cta: {
    label: string;
    href: string;
    note: string;
  };
  linkedPathwaySlug: string;
  linkedPathway: {
    slug: string;
    title: string;
    href: string;
    relationshipNote: string;
  };
  readinessNote: string;
  overviewParagraphs: string[];

  // Reusable tracking of specification areas undergoing sign-off
  pendingSpecificationItems: ProgrammeSpecificationArea[];

  // Legacy compatibility fields
  scheduleGovernance: {
    durationNote: string;
    provisionalModelNote: string;
    isConfirmed: boolean;
  };
  tuitionGovernance: {
    isConfirmed: boolean;
    policyNote: string;
  };
  outcomes: string[];
}

/**
 * Launch programme catalogue for Ops Foundry Academy.
 *
 * Governance Note (Master Brief Sections 05 & 11):
 * Three launch programmes are confirmed: Growth Operations, Content Operations,
 * and Web & Digital Operations.
 *
 * Customer & Community Operations is an upcoming career pathway and is
 * explicitly NOT a launch programme or open for first-cohort admissions.
 *
 * All three programmes remain in 'upcoming' / 'pending_approval' status.
 */
export const plannedAcademyProgrammes: AcademyProgrammeSlot[] = [
  {
    id: 'prog-growth-ops',
    courseId: 'COURSE_01',
    slug: 'growth-operations',
    trackNumber: '01',
    slotLabel: 'Growth Operations',
    title: 'Growth Operations Programme',
    provisionalTitle: null,
    isOfficialTitle: true,
    statusLabel: 'Upcoming (Register Interest)',
    programmeStatus: 'upcoming',
    publicationStatus: 'pending_approval',
    ctaMode: 'register_interest',
    cta: {
      label: 'Register Interest',
      href: '/apply?programme=growth-operations',
      note: 'Cohort applications open formally upon curriculum and schedule sign-off. Prospective learners can register interest today.',
    },
    linkedPathwaySlug: 'growth-operations',
    linkedPathway: {
      slug: 'growth-operations',
      title: 'Growth Operations',
      href: '/pathways/growth-operations',
      relationshipNote:
        'This training programme develops practical capability for the Growth Operations career pathway. The pathway describes typical commercial operations responsibilities and workplace roles.',
    },
    summary:
      'Practical training in market research, prospect data verification, CRM organization, and commercial pipeline workflows designed around modern business operations.',
    duration: 'Schedule being finalised prior to cohort opening',
    deliveryFormat: 'Structured learning & hands-on application (format being finalised)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'Funding opportunities pending partner confirmation',
    cohortDates: [],
    readinessNote:
      'Growth Operations is an active launch programme. Official cohort dates, format, and tuition will be published once approved. Prospective learners can register interest today.',
    overviewParagraphs: [
      'The Growth Operations Programme prepares learners for practical commercial operations. Connected to Ops Foundry’s managed services model, this course focuses on how high-performing teams research target accounts, maintain CRM hygiene, and manage pipeline cadences.',
      'Training progresses from the foundational Ops Foundry Core—covering digital productivity, clear communication, structured workflows, and responsible AI use—into specialized commercial execution, realistic pipeline tasks, and supervised project assignments.',
    ],
    pendingSpecificationItems: [
      {
        area: 'Cohort Schedule & Dates',
        status: 'Under review',
        explanation:
          'Exact cohort start dates, application deadlines, and weekly schedules are undergoing operational confirmation.',
      },
      {
        area: 'Delivery Format & Location',
        status: 'Under review',
        explanation:
          'Confirmed hybrid, hub, or online delivery arrangements will be announced alongside cohort opening.',
      },
      {
        area: 'Curriculum Modules & Assessment Rules',
        status: 'Under review',
        explanation:
          'Detailed module syllabi, practical assignments, and credential criteria are undergoing curriculum sign-off.',
      },
      {
        area: 'Tuition & Payment Installments',
        status: 'Pending approval',
        explanation:
          'Full tuition details, payment plans, and refund terms will be published prior to accepting applications.',
      },
      {
        area: 'Scholarship Eligibility & Awards',
        status: 'Pending partner confirmation',
        explanation:
          'Approved funding opportunities and application guidelines will appear here once partner agreements are finalized.',
      },
    ],
    scheduleGovernance: {
      durationNote: 'Official programme duration and weekly schedule are undergoing sign-off.',
      provisionalModelNote:
        'A multi-week model with shared foundation core and domain specialization is under review. Exact dates will be published upon curriculum approval.',
      isConfirmed: false,
    },
    tuitionGovernance: {
      isConfirmed: false,
      policyNote:
        'Tuition amounts, inclusions, installment arrangements, and refund policies will appear only when formally approved by leadership.',
    },
    outcomes: [],
  },
  {
    id: 'prog-content-ops',
    courseId: 'COURSE_02',
    slug: 'content-operations',
    trackNumber: '02',
    slotLabel: 'Content Operations',
    title: 'Content Operations Programme',
    provisionalTitle: null,
    isOfficialTitle: true,
    statusLabel: 'Upcoming (Register Interest)',
    programmeStatus: 'upcoming',
    publicationStatus: 'pending_approval',
    ctaMode: 'register_interest',
    cta: {
      label: 'Register Interest',
      href: '/apply?programme=content-operations',
      note: 'Cohort applications open formally upon curriculum and schedule sign-off. Prospective learners can register interest today.',
    },
    linkedPathwaySlug: 'content-operations',
    linkedPathway: {
      slug: 'content-operations',
      title: 'Content Operations',
      href: '/pathways/content-operations',
      relationshipNote:
        'This training programme develops practical capability for the Content Operations career pathway. The pathway describes typical digital editorial responsibilities and publishing workflows.',
    },
    summary:
      'Practical training in digital copywriting, editorial calendar management, CMS staging, and structured asset workflows.',
    duration: 'Schedule being finalised prior to cohort opening',
    deliveryFormat: 'Structured learning & hands-on application (format being finalised)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'Funding opportunities pending partner confirmation',
    cohortDates: [],
    readinessNote:
      'Content Operations is an active launch programme. Official cohort dates, format, and tuition will be published once approved. Prospective learners can register interest today.',
    overviewParagraphs: [
      'The Content Operations Programme equips learners to organize, draft, proofread, and stage digital content across modern publishing platforms. Grounded in actual operational workflows, learners develop the discipline required for dependable digital publishing.',
      'Learners begin with the shared Ops Foundry Core before focusing on editorial review cycles, brand consistency, multi-channel scheduling, and responsible human-in-the-loop AI assistance.',
    ],
    pendingSpecificationItems: [
      {
        area: 'Cohort Schedule & Dates',
        status: 'Under review',
        explanation:
          'Exact cohort start dates, application deadlines, and weekly schedules are undergoing operational confirmation.',
      },
      {
        area: 'Delivery Format & Location',
        status: 'Under review',
        explanation:
          'Confirmed hybrid, hub, or online delivery arrangements will be announced alongside cohort opening.',
      },
      {
        area: 'Curriculum Modules & Assessment Rules',
        status: 'Under review',
        explanation:
          'Detailed module syllabi, practical assignments, and credential criteria are undergoing curriculum sign-off.',
      },
      {
        area: 'Tuition & Payment Installments',
        status: 'Pending approval',
        explanation:
          'Full tuition details, payment plans, and refund terms will be published prior to accepting applications.',
      },
      {
        area: 'Scholarship Eligibility & Awards',
        status: 'Pending partner confirmation',
        explanation:
          'Approved funding opportunities and application guidelines will appear here once partner agreements are finalized.',
      },
    ],
    scheduleGovernance: {
      durationNote: 'Official programme duration and weekly schedule are undergoing sign-off.',
      provisionalModelNote:
        'A multi-week model with shared foundation core and domain specialization is under review. Exact dates will be published upon curriculum approval.',
      isConfirmed: false,
    },
    tuitionGovernance: {
      isConfirmed: false,
      policyNote:
        'Tuition amounts, inclusions, installment arrangements, and refund policies will appear only when formally approved by leadership.',
    },
    outcomes: [],
  },
  {
    id: 'prog-web-digital-ops',
    courseId: 'COURSE_03',
    slug: 'web-digital-operations',
    trackNumber: '03',
    slotLabel: 'Web & Digital Operations',
    title: 'Web & Digital Operations Programme',
    provisionalTitle: null,
    isOfficialTitle: true,
    statusLabel: 'Upcoming (Register Interest)',
    programmeStatus: 'upcoming',
    publicationStatus: 'pending_approval',
    ctaMode: 'register_interest',
    cta: {
      label: 'Register Interest',
      href: '/apply?programme=web-digital-operations',
      note: 'Cohort applications open formally upon curriculum and schedule sign-off. Prospective learners can register interest today.',
    },
    linkedPathwaySlug: 'web-digital-operations',
    linkedPathway: {
      slug: 'web-digital-operations',
      title: 'Web & Digital Operations',
      href: '/pathways/web-digital-operations',
      relationshipNote:
        'This training programme develops practical capability for the Web & Digital Operations career pathway. The pathway describes typical website maintenance tasks, QA procedures, and digital operations.',
    },
    summary:
      'Hands-on training in website page construction, CMS management, quality assurance testing, and form integration workflows.',
    duration: 'Schedule being finalised prior to cohort opening',
    deliveryFormat: 'Structured learning & hands-on application (format being finalised)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'Funding opportunities pending partner confirmation',
    cohortDates: [],
    readinessNote:
      'Web & Digital Operations is an active launch programme. Official cohort dates, format, and tuition will be published once approved. Prospective learners can register interest today.',
    overviewParagraphs: [
      'The Web & Digital Operations Programme trains individuals to maintain and troubleshoot modern digital touchpoints. Learners practice building responsive pages, testing forms, auditing site performance, and resolving routine operational glitches.',
      'Starting with foundational digital workflow principles in the Ops Foundry Core, learners move into hands-on web tasks, quality assurance testing, and digital maintenance scenarios.',
    ],
    pendingSpecificationItems: [
      {
        area: 'Cohort Schedule & Dates',
        status: 'Under review',
        explanation:
          'Exact cohort start dates, application deadlines, and weekly schedules are undergoing operational confirmation.',
      },
      {
        area: 'Delivery Format & Location',
        status: 'Under review',
        explanation:
          'Confirmed hybrid, hub, or online delivery arrangements will be announced alongside cohort opening.',
      },
      {
        area: 'Curriculum Modules & Assessment Rules',
        status: 'Under review',
        explanation:
          'Detailed module syllabi, practical assignments, and credential criteria are undergoing curriculum sign-off.',
      },
      {
        area: 'Tuition & Payment Installments',
        status: 'Pending approval',
        explanation:
          'Full tuition details, payment plans, and refund terms will be published prior to accepting applications.',
      },
      {
        area: 'Scholarship Eligibility & Awards',
        status: 'Pending partner confirmation',
        explanation:
          'Approved funding opportunities and application guidelines will appear here once partner agreements are finalized.',
      },
    ],
    scheduleGovernance: {
      durationNote: 'Official programme duration and weekly schedule are undergoing sign-off.',
      provisionalModelNote:
        'A multi-week model with shared foundation core and domain specialization is under review. Exact dates will be published upon curriculum approval.',
      isConfirmed: false,
    },
    tuitionGovernance: {
      isConfirmed: false,
      policyNote:
        'Tuition amounts, inclusions, installment arrangements, and refund policies will appear only when formally approved by leadership.',
    },
    outcomes: [],
  },
];

export function getProgrammeBySlug(slug: string): AcademyProgrammeSlot | undefined {
  return plannedAcademyProgrammes.find((item) => item.slug === slug);
}

export function getProgrammeById(id: string): AcademyProgrammeSlot | undefined {
  return plannedAcademyProgrammes.find((item) => item.id === id);
}

export const programmesCataloguePageContent = {
  hero: {
    title: 'Academy Programmes',
    lead: 'Practical training offers built around real operational roles and verified readiness.',
    supporting:
      'Ops Foundry Academy is preparing three initial programmes: Growth Operations, Content Operations, and Web & Digital Operations. Each programme provides structured learning and hands-on practice directly linked to our career pathways.',
  },
  publicationNotice: {
    heading: 'Programme Specification & Intake Status',
    body: 'Three launch programmes are planned for the Academy catalogue. In keeping with strict publication controls (Master Brief Section 11), official start dates, curriculum modules, weekly schedules, and tuition details are undergoing final confirmation prior to opening public applications. Prospective learners can review the programme focus areas and register their interest below.',
  },
  pathwayDistinction: {
    heading: 'Understanding Programmes and Career Pathways',
    body: 'Ops Foundry Academy maintains a clear distinction between career pathways and training programmes:',
    pathwayDefinition:
      'A Career Pathway describes the kind of work a professional performs, the qualities that help practitioners thrive, and the operational roles behind growing businesses.',
    programmeDefinition:
      'A Training Programme describes the structured training offer—including curriculum modules, schedule, tuition, delivery mode, and cohort intake once approved.',
  },
  sharedStandards: {
    heading: 'What Every Academy Programme Is Built Around',
    intro:
      'While specific subject matter and tools differ by track, every Ops Foundry Academy programme shares three foundational commitments:',
    items: [
      {
        title: 'Training Connected to Real Work',
        description:
          'Programmes emphasize hands-on exercises and realistic business tasks so learners practice organizing, communicating, and delivering dependable outputs.',
      },
      {
        title: 'A Clear Path from Core to Specialization',
        description:
          'Learning begins with essential habits in digital productivity, structured workflows, and responsible AI use before progressing into deeper domain specialization.',
      },
      {
        title: 'Opportunities Earned Through Readiness',
        description:
          'Graduates who meet role-specific competency standards may be considered for opportunities at Ops Foundry or partner employers. Hiring depends on vacancies and selection.',
      },
    ],
  },
  cta: {
    heading: 'Ready to build practical skills for modern work?',
    body: 'Explore our launch programme tracks, review our career pathways, or read our structured admissions guide.',
    primaryLabel: 'Explore Career Pathways',
    primaryHref: '/pathways',
    secondaryLabel: 'Admissions Guide',
    secondaryHref: '/admissions',
  },
} as const;
