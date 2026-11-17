import type { ProgrammeFrontmatter } from '@opsfoundry/types';

export interface AcademyProgrammeSlot extends ProgrammeFrontmatter {
  slug: 'programme-one' | 'programme-two' | 'programme-three';
  trackNumber: '01' | '02' | '03';
  slotLabel: string;
  statusLabel: string;
  readinessNote: string;
  overviewParagraphs: string[];
  pendingSpecificationItems: {
    area: string;
    status: string;
    explanation: string;
  }[];
}

/**
 * Git-managed structured programme catalogue for Ops Foundry Academy.
 *
 * Governance Note (Phase 3C.2):
 * Three programmes are planned for the Academy. Because official course titles,
 * detailed curricula, durations, prerequisites, tuition, and cohort schedules
 * have not yet been confirmed for public release, each entry uses honest
 * pending-confirmation states rather than presenting placeholder names as
 * approved public course titles or fabricating curriculum details.
 */
export const plannedAcademyProgrammes: AcademyProgrammeSlot[] = [
  {
    courseId: 'COURSE_01',
    slug: 'programme-one',
    trackNumber: '01',
    slotLabel: 'Programme Track 01',
    title: 'Programme Track 01 (Official Title Pending Confirmation)',
    provisionalTitle: null,
    isOfficialTitle: false,
    statusLabel: 'Details Being Finalised',
    summary:
      'The first of three planned practical learning programmes at Ops Foundry Academy. Official programme title, syllabus modules, duration, prerequisites, cohort schedule, and tuition details are currently being finalised prior to public release.',
    duration: 'Pending final confirmation',
    deliveryFormat: 'Structured learning & hands-on application (format being finalised)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'Pending final confirmation',
    cohortDates: [],
    readinessNote:
      'Once programme specifications are published and cohort admissions open, applicants will be able to select Programme Track 01 directly as their preferred course.',
    overviewParagraphs: [
      'Programme Track 01 is one of three planned courses within the Ops Foundry Academy catalogue. In keeping with our commitment to factual accuracy, we do not publish speculative course titles, unconfirmed module lists, or placeholder schedules before they are formally approved.',
      'Like every track in the Academy, this programme is being structured around our six core learning principles: practical learning, structured development, learning by doing, relevant skills, application of knowledge, and continuous improvement.',
    ],
    pendingSpecificationItems: [
      {
        area: 'Official Programme Title & Focus',
        status: 'Being finalised',
        explanation:
          'The approved public title and specific capability domain for Programme Track 01 will replace this track identifier once confirmed.',
      },
      {
        area: 'Curriculum & Practical Exercises',
        status: 'Being finalised',
        explanation:
          'Module-by-module learning objectives and applied exercises will be published here prior to cohort opening.',
      },
      {
        area: 'Duration & Schedule',
        status: 'Being finalised',
        explanation:
          'Programme length, weekly time expectations, and cohort start dates will be announced once the schedule is confirmed.',
      },
      {
        area: 'Prerequisites & Preparation',
        status: 'Being finalised',
        explanation:
          'Any recommended background knowledge or technical preparation required for applicants will be listed clearly.',
      },
      {
        area: 'Tuition & Financial Information',
        status: 'Being finalised',
        explanation:
          'Confirmed tuition details and any applicable payment or support arrangements will be published before applications open.',
      },
    ],
  },
  {
    courseId: 'COURSE_02',
    slug: 'programme-two',
    trackNumber: '02',
    slotLabel: 'Programme Track 02',
    title: 'Programme Track 02 (Official Title Pending Confirmation)',
    provisionalTitle: null,
    isOfficialTitle: false,
    statusLabel: 'Details Being Finalised',
    summary:
      'The second of three planned practical learning programmes at Ops Foundry Academy. Official programme title, syllabus modules, duration, prerequisites, cohort schedule, and tuition details are currently being finalised prior to public release.',
    duration: 'Pending final confirmation',
    deliveryFormat: 'Structured learning & hands-on application (format being finalised)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'Pending final confirmation',
    cohortDates: [],
    readinessNote:
      'Once programme specifications are published and cohort admissions open, applicants will be able to select Programme Track 02 directly as their preferred course.',
    overviewParagraphs: [
      'Programme Track 02 is the second of three planned courses within the Ops Foundry Academy catalogue. Rather than publishing unconfirmed curriculum details or provisional course names as final, this page tracks the publication readiness of the programme.',
      'This programme is being developed around the Academy’s focus on practical capability, structured skill progression, and applying knowledge to realistic modern work.',
    ],
    pendingSpecificationItems: [
      {
        area: 'Official Programme Title & Focus',
        status: 'Being finalised',
        explanation:
          'The approved public title and specific capability domain for Programme Track 02 will replace this track identifier once confirmed.',
      },
      {
        area: 'Curriculum & Practical Exercises',
        status: 'Being finalised',
        explanation:
          'Module-by-module learning objectives and applied exercises will be published here prior to cohort opening.',
      },
      {
        area: 'Duration & Schedule',
        status: 'Being finalised',
        explanation:
          'Programme length, weekly time expectations, and cohort start dates will be announced once the schedule is confirmed.',
      },
      {
        area: 'Prerequisites & Preparation',
        status: 'Being finalised',
        explanation:
          'Any recommended background knowledge or technical preparation required for applicants will be listed clearly.',
      },
      {
        area: 'Tuition & Financial Information',
        status: 'Being finalised',
        explanation:
          'Confirmed tuition details and any applicable payment or support arrangements will be published before applications open.',
      },
    ],
  },
  {
    courseId: 'COURSE_03',
    slug: 'programme-three',
    trackNumber: '03',
    slotLabel: 'Programme Track 03',
    title: 'Programme Track 03 (Official Title Pending Confirmation)',
    provisionalTitle: null,
    isOfficialTitle: false,
    statusLabel: 'Details Being Finalised',
    summary:
      'The third of three planned practical learning programmes at Ops Foundry Academy. Official programme title, syllabus modules, duration, prerequisites, cohort schedule, and tuition details are currently being finalised prior to public release.',
    duration: 'Pending final confirmation',
    deliveryFormat: 'Structured learning & hands-on application (format being finalised)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'Pending final confirmation',
    cohortDates: [],
    readinessNote:
      'Once programme specifications are published and cohort admissions open, applicants will be able to select Programme Track 03 directly as their preferred course.',
    overviewParagraphs: [
      'Programme Track 03 is the third planned course in the initial Ops Foundry Academy catalogue. Official programme details are currently being finalised and will be published here once approved.',
      'Designed around practical learning and structured development, this track will prepare learners to apply relevant skills thoughtfully and consistently in real-world contexts.',
    ],
    pendingSpecificationItems: [
      {
        area: 'Official Programme Title & Focus',
        status: 'Being finalised',
        explanation:
          'The approved public title and specific capability domain for Programme Track 03 will replace this track identifier once confirmed.',
      },
      {
        area: 'Curriculum & Practical Exercises',
        status: 'Being finalised',
        explanation:
          'Module-by-module learning objectives and applied exercises will be published here prior to cohort opening.',
      },
      {
        area: 'Duration & Schedule',
        status: 'Being finalised',
        explanation:
          'Programme length, weekly time expectations, and cohort start dates will be announced once the schedule is confirmed.',
      },
      {
        area: 'Prerequisites & Preparation',
        status: 'Being finalised',
        explanation:
          'Any recommended background knowledge or technical preparation required for applicants will be listed clearly.',
      },
      {
        area: 'Tuition & Financial Information',
        status: 'Being finalised',
        explanation:
          'Confirmed tuition details and any applicable payment or support arrangements will be published before applications open.',
      },
    ],
  },
];

export function getProgrammeBySlug(slug: string): AcademyProgrammeSlot | undefined {
  return plannedAcademyProgrammes.find((item) => item.slug === slug);
}

export const programmesCataloguePageContent = {
  hero: {
    title: 'Academy Programmes',
    lead: 'Structured learning pathways built around practical skills and real-world readiness.',
    supporting:
      'Ops Foundry Academy is preparing three initial programmes. Each programme is designed to help learners move from understanding a concept to applying it reliably in modern working environments.',
  },
  publicationNotice: {
    heading: 'Programme Specification Status',
    body: 'Three programmes are planned for the Academy catalogue. Because official course titles, curriculum modules, durations, prerequisites, cohort schedules, and tuition have not yet been confirmed for public release, each entry below clearly indicates what is currently being finalised rather than presenting placeholder names or speculative details.',
  },
  sharedStandards: {
    heading: 'What Every Academy Programme Is Built Around',
    intro:
      'While specific subject matter and schedules will be published per track, every Ops Foundry Academy programme shares three foundational commitments:',
    items: [
      {
        title: 'Practical Application Over Passive Theory',
        description:
          'Programmes emphasize hands-on exercises and realistic work tasks so learners practice organizing and completing real outputs.',
      },
      {
        title: 'Structured Skill Progression',
        description:
          'Learning is organized into clear stages that build foundational habits, documentation discipline, and practical tool fluency.',
      },
      {
        title: 'Direct Programme Selection in Admissions',
        description:
          'When cohort applications open, prospective learners will review the confirmed programme specifications and select their preferred programme directly.',
      },
    ],
  },
  cta: {
    heading: 'Ready to build practical skills for modern work?',
    body: 'Apply for OpsFoundry Fellowship Cohort 1 or review our structured admissions guide.',
    primaryLabel: 'Apply Now',
    primaryHref: '/apply',
    secondaryLabel: 'Admissions Guide',
    secondaryHref: '/admissions',
  },
} as const;
