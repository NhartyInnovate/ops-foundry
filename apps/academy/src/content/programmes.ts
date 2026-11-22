import type { ProgrammeFrontmatter } from '@opsfoundry/types';

/**
 * Ops Foundry Academy — Programme Catalogue Content Module
 *
 * Source of Truth: Ops_Foundry_Academy_Website_Master_Brief.docx (Sections 02, 05, 11)
 *
 * Architectural Boundary:
 * A Programme describes the actual training offer: schedule, tuition, delivery format,
 * core/specialization structure, and cohort intake status.
 * It is distinct from a Career Pathway, which describes the professional domain and role fit.
 */

export type ProgrammeLifecycleStatus =
  | 'draft'
  | 'upcoming'
  | 'open'
  | 'full'
  | 'waitlist'
  | 'closed'
  | 'archived';

export type ProgrammeCtaMode = 'apply' | 'join_waitlist' | 'register_interest';

export type ProgrammeSlug =
  | 'growth-operations'
  | 'content-operations'
  | 'web-digital-operations';

export interface AcademyProgrammeSlot extends ProgrammeFrontmatter {
  id: string;
  slug: ProgrammeSlug;
  trackNumber: '01' | '02' | '03';
  slotLabel: string;
  statusLabel: string;
  programmeStatus: ProgrammeLifecycleStatus;
  ctaMode: ProgrammeCtaMode;
  linkedPathwaySlug: string;
  readinessNote: string;
  overviewParagraphs: string[];
  pendingSpecificationItems: {
    area: string;
    status: string;
    explanation: string;
  }[];
  // Operational Governance fields (Section 05 & 11)
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
 * All three programmes are currently set to 'upcoming' with 'register_interest' CTA mode.
 * In keeping with strict publication controls, no programme is marked 'open' prior to
 * verified leadership sign-off on cohort dates, capacity, format, and fees.
 * The provisional 8-week Core + 8-week specialization model remains a planning
 * assumption and is explicitly not published as an approved public schedule.
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
    ctaMode: 'register_interest',
    linkedPathwaySlug: 'growth-operations',
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
    outcomes: [
      'Conduct rigorous desk research to identify and qualify target commercial prospects.',
      'Organize and maintain clean, audit-ready data in modern CRM platforms.',
      'Execute outbound pipeline workflows and track commercial responses accurately.',
      'Synthesize operational pipeline reports for commercial leaders with clarity and precision.',
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
          'Detailed module syllabi, practical assignments, and credential criteria are in final editorial preparation.',
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
    ctaMode: 'register_interest',
    linkedPathwaySlug: 'content-operations',
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
    outcomes: [
      'Draft clear, concise written copy aligned with specific brand and editorial guidelines.',
      'Stage, format, and schedule digital assets accurately across content management systems.',
      'Manage editorial calendars and coordinate cross-functional publication deadlines.',
      'Apply responsible AI tools for drafting and editing while maintaining rigorous human fact-checking.',
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
          'Detailed module syllabi, practical assignments, and credential criteria are in final editorial preparation.',
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
    ctaMode: 'register_interest',
    linkedPathwaySlug: 'web-digital-operations',
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
    outcomes: [
      'Build and update web pages reliably using modern CMS platforms and layout builders.',
      'Execute structured QA checklists covering form submissions, broken links, and responsive layouts.',
      'Verify digital integrations between site forms and operational CRM/email platforms.',
      'Document troubleshooting steps clearly to maintain technical continuity across teams.',
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
          'Detailed module syllabi, practical assignments, and credential criteria are in final editorial preparation.',
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
    body: 'Three launch programmes are planned for the Academy catalogue. In keeping with strict publication controls, official start dates, curriculum modules, weekly schedules, and tuition details are undergoing final confirmation prior to opening public applications. Prospective learners can review the programme focus areas and register their interest below.',
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
