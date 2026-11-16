import type { ProgrammeFrontmatter } from '@opsfoundry/types';

export interface AcademyProgrammeSlot extends ProgrammeFrontmatter {
  slug: string;
  slotLabel: string;
  statusLabel: string;
  readinessNote: string;
}

/**
 * Git-managed structured programme catalogue for Ops Foundry Academy.
 *
 * Governance Note (Phase 3C.1):
 * Three courses are planned for the Academy. Because official course titles,
 * detailed curricula, durations, prerequisites, tuition, and cohort schedules
 * have not yet been confirmed for public release, each slot below uses honest
 * pending-approval metadata and avoids fabricated details. When stakeholder
 * sign-off is completed, approved values can be populated directly in this file.
 */
export const plannedAcademyProgrammes: AcademyProgrammeSlot[] = [
  {
    courseId: 'COURSE_01',
    slug: 'programme-one',
    slotLabel: 'Programme Track 01',
    title: 'Planned Programme One',
    provisionalTitle: null,
    isOfficialTitle: false,
    statusLabel: 'Curriculum & Schedule in Preparation',
    summary:
      'One of three planned practical learning programmes currently being prepared for upcoming Ops Foundry Academy cohorts. Official programme title, learning modules, and project scope will be published here once confirmed.',
    duration: 'To be confirmed upon programme publication',
    deliveryFormat: 'Structured learning & hands-on application (format to be confirmed)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'To be confirmed upon programme publication',
    cohortDates: [],
    readinessNote:
      'Prospective learners will be able to select this programme as their preferred track once cohort admissions open.',
  },
  {
    courseId: 'COURSE_02',
    slug: 'programme-two',
    slotLabel: 'Programme Track 02',
    title: 'Planned Programme Two',
    provisionalTitle: null,
    isOfficialTitle: false,
    statusLabel: 'Curriculum & Schedule in Preparation',
    summary:
      'One of three planned practical learning programmes currently being prepared for upcoming Ops Foundry Academy cohorts. Official programme title, learning modules, and project scope will be published here once confirmed.',
    duration: 'To be confirmed upon programme publication',
    deliveryFormat: 'Structured learning & hands-on application (format to be confirmed)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'To be confirmed upon programme publication',
    cohortDates: [],
    readinessNote:
      'Prospective learners will be able to select this programme as their preferred track once cohort admissions open.',
  },
  {
    courseId: 'COURSE_03',
    slug: 'programme-three',
    slotLabel: 'Programme Track 03',
    title: 'Planned Programme Three',
    provisionalTitle: null,
    isOfficialTitle: false,
    statusLabel: 'Curriculum & Schedule in Preparation',
    summary:
      'One of three planned practical learning programmes currently being prepared for upcoming Ops Foundry Academy cohorts. Official programme title, learning modules, and project scope will be published here once confirmed.',
    duration: 'To be confirmed upon programme publication',
    deliveryFormat: 'Structured learning & hands-on application (format to be confirmed)',
    prerequisites: [],
    admissionRequirements: [],
    curriculumModules: [],
    tuition: {
      amount: null,
      currency: 'USD',
      status: 'pending_approval',
    },
    scholarshipInformation: 'To be confirmed upon programme publication',
    cohortDates: [],
    readinessNote:
      'Prospective learners will be able to select this programme as their preferred track once cohort admissions open.',
  },
];
