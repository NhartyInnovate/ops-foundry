export interface ProgrammeApplicationConfig {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  cohort: {
    name: string;
    launchDate: string;
    deadline: string;
    deadlineISO: string;
  };
  scholarshipNotice: string;
  sectionOne: {
    stepNumber: string;
    heading: string;
    intro: string;
    hubProximityIntro: string;
  };
}

export const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Federal Capital Territory (FCT)',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
] as const;

export const GENDER_OPTIONS = [
  'Female',
  'Male',
  'Prefer not to say',
] as const;

export const AGE_BRACKET_OPTIONS = [
  'Under 18',
  '18–24 years',
  '25–29 years',
  '30–35 years',
  'Above 35 years',
] as const;

export const HUB_PROXIMITY_OPTIONS = [
  'Abuja (Primary Pilot Hub)',
  'Lagos',
  'Enugu',
  'Ondo (Akure)',
  'Nasarawa',
  'Anambra (Awka)',
  'Rivers (Port Harcourt)',
  'Kano',
  'I am currently not near any of these hubs (Willing to travel for physical test days)',
  'I can only participate 100% remotely',
] as const;

export const fellowshipCohortOneApplication: ProgrammeApplicationConfig = {
  id: 'fellowship-cohort-1',
  slug: 'fellowship-cohort-1',
  title: 'OpsFoundry Fellowship Application — Cohort 1',
  shortTitle: 'OpsFoundry Fellowship',
  badge: 'Cohort 1 Admissions',
  description:
    'OpsFoundry is an elite talent accelerator and BPO services engine. We train high-potential talent in B2B Outbound Sales (SDR) and Digital Presence & Content Operations, connecting top graduates directly to paying global and local client retainers.',
  cohort: {
    name: 'Cohort 1',
    launchDate: 'Late November 2026',
    deadline: 'November 20, 2026, 11:59 PM WAT',
    deadlineISO: '2026-11-20T23:59:00+01:00',
  },
  scholarshipNotice:
    'Full scholarships are available via the Mastercard Foundation for qualified female candidates, with subsidized slots available via IDICE.',
  sectionOne: {
    stepNumber: '01',
    heading: 'Section 1: Personal & Demographic Information',
    intro:
      'Please provide your accurate personal details as they appear on official identification.',
    hubProximityIntro:
      'While foundational learning is hybrid/online, proctored assessments and simulated client work take place at regional partner hubs.',
  },
} as const;

export const APPLICATION_STEPS = [
  {
    id: 1,
    title: 'Personal & Demographic Information',
    shortTitle: 'Personal & Demographic',
    status: 'Available',
    isLocked: false,
    supportingText: 'This is the only section applicants can currently access.',
  },
  {
    id: 2,
    title: 'Additional Application Information',
    shortTitle: 'Additional Information',
    status: 'Locked',
    isLocked: true,
    supportingText: 'Questions are currently being finalised.',
  },
  {
    id: 3,
    title: 'Final Review',
    shortTitle: 'Final Review',
    status: 'Locked',
    isLocked: true,
    supportingText: 'Available when all application sections are complete.',
  },
] as const;
