export const CORPORATE_WEBSITE_URL = (
  process.env.NEXT_PUBLIC_CORPORATE_URL || 'http://localhost:3000'
).replace(/\/$/, '');

export const ACADEMY_WEBSITE_URL = (
  process.env.NEXT_PUBLIC_ACADEMY_URL || 'http://localhost:3001'
).replace(/\/$/, '');

export interface AcademyNavItem {
  label: string;
  /**
   * Active destination in Phase 3C.1 so all public navigation links resolve
   * to meaningful sections without 404s prior to Phase 3C.2 supporting pages.
   */
  href: string;
  /**
   * Dedicated route path reserved for Phase 3C.2 supporting pages.
   */
  plannedRoute: string;
}

export const academyNavigation = {
  brandName: 'Ops Foundry',
  brandSuffix: 'Academy',
  fullBrandName: 'Ops Foundry Academy',
  items: [
    {
      label: 'Home',
      href: '/',
      plannedRoute: '/',
    },
    {
      label: 'Programmes',
      href: '/#programmes',
      plannedRoute: '/programmes',
    },
    {
      label: 'How We Learn',
      href: '/#how-we-learn',
      plannedRoute: '/how-we-learn',
    },
    {
      label: 'Admissions',
      href: '/#admissions',
      plannedRoute: '/admissions',
    },
    {
      label: 'About',
      href: '/#about',
      plannedRoute: '/about',
    },
  ] satisfies AcademyNavItem[],
  primaryCta: {
    label: 'Apply Now',
    href: '/#admissions',
    plannedRoute: '/admissions#apply',
  },
  corporateCrossLink: {
    label: 'Corporate Website',
    href: CORPORATE_WEBSITE_URL,
  },
} as const;

export const academyHeroContent = {
  headline: 'Build practical skills. Become ready for real work.',
  supporting:
    'Ops Foundry Academy helps people develop relevant, practical skills through structured learning, hands-on application and a focus on the demands of modern work.',
  primaryCta: {
    label: 'Explore Programmes',
    href: '/#programmes',
  },
  secondaryCta: {
    label: 'How Learning Works',
    href: '/#how-we-learn',
  },
  highlights: [
    {
      title: 'Structured Learning',
      detail: 'Clear progression built around practical capability.',
    },
    {
      title: 'Hands-On Application',
      detail: 'Practice applying concepts to realistic work tasks.',
    },
    {
      title: 'Modern Work Readiness',
      detail: 'Focused on disciplined execution and modern tools.',
    },
  ],
  visual: {
    imageSrc:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1100&q=80',
    imageAlt:
      'Learners collaborating around laptops and working documents in a modern workspace',
    captionTitle: 'Learning designed around real-world application.',
    captionBody:
      'Developing practical competence through structured exercises, clear workflows, and collaborative review.',
  },
} as const;

export const academyIntroductionContent = {
  id: 'about',
  heading: 'A Learning Environment Built Around Practical Capability',
  lead: 'Ops Foundry Academy is the learning and professional development arm of the Ops Foundry ecosystem.',
  paragraphs: [
    'Many learning programmes stop at theory—leaving people with notes and terminology, but little practice in actually carrying work from start to finish. Ops Foundry Academy exists to bridge the gap between learning a concept and applying it reliably in a modern working environment.',
    'Connected to Ops Foundry’s wider focus on structured workflows and human-plus-AI operational execution, the Academy is designed as a serious, encouraging place to build real capabilities. Learners focus on disciplined habits, clear communication, and practical execution.',
  ],
  commitmentCard: {
    heading: 'Clear & Honest Expectations',
    body: 'Ops Foundry Academy is dedicated to practical skill development and professional readiness. Participation or completion of an Academy programme does not constitute a guarantee of employment, automatic recruitment into Ops Foundry, or guaranteed external job placement.',
  },
} as const;

export const learningPhilosophyContent = {
  id: 'how-we-learn',
  heading: 'Our Learning Philosophy',
  intro:
    'We believe lasting capability comes from combining clear structure with active practice. Rather than relying on passive memorization, the Academy is guided by six core learning principles:',
  principles: [
    {
      number: '01',
      title: 'Practical Learning',
      description:
        'Every concept is grounded in how work is actually organized, communicated, and completed in real professional settings.',
    },
    {
      number: '02',
      title: 'Structured Development',
      description:
        'Learning progresses step by step—helping learners build a solid foundation before moving on to more complex operational tasks.',
    },
    {
      number: '03',
      title: 'Learning by Doing',
      description:
        'Understanding deepens through action. Learners spend time actively working through tasks, exercises, and practical scenarios.',
    },
    {
      number: '04',
      title: 'Relevant Skills',
      description:
        'We focus on capabilities that matter in contemporary workplaces: structured thinking, clear documentation, digital fluency, and responsible tool use.',
    },
    {
      number: '05',
      title: 'Application of Knowledge',
      description:
        'Knowledge is most valuable when it can be translated into clear, dependable outputs that others can review and use.',
    },
    {
      number: '06',
      title: 'Continuous Improvement',
      description:
        'Reviewing work, reflecting on feedback, and refining how a task is approached are central habits of strong professionals.',
    },
  ],
  methodologyNotice:
    'Note: Specific delivery formats, learning schedules, and review criteria vary by programme and will be published alongside each confirmed course specification.',
} as const;

export const programmesPreviewContent = {
  id: 'programmes',
  heading: 'Academy Programmes',
  intro:
    'Ops Foundry Academy is preparing three initial programmes designed around practical skill development and real-world application.',
  governanceNotice:
    'Programme Publication Status: Three courses are planned for the Academy. Official course titles, detailed curricula, durations, prerequisites, tuition details, and schedules are currently undergoing final confirmation and will be published here once approved.',
  cta: {
    label: 'View All Programmes',
    href: '/#programmes',
    plannedRoute: '/programmes',
  },
} as const;

export const whoAcademyIsForContent = {
  id: 'who-it-is-for',
  heading: 'Who the Academy Is For',
  intro:
    'Ops Foundry Academy is designed for motivated individuals who want to strengthen their practical capabilities and prepare for the expectations of modern work.',
  profiles: [
    {
      title: 'People Preparing for Modern Work',
      description:
        'Individuals who want to move beyond purely theoretical study and build practical habits for organizing, executing, and completing real work.',
    },
    {
      title: 'Professionals Developing New Capabilities',
      description:
        'Working professionals looking to sharpen their operational discipline, learn structured workflow habits, and use modern tools more effectively.',
    },
    {
      title: 'Career Switchers Seeking Practical Grounding',
      description:
        'People transitioning into new professional roles who want a structured, supportive environment to practice relevant skills and build confidence.',
    },
  ],
  eligibilityNote:
    'Programme-specific suitability guidance and any recommended preparation will be published with each confirmed course description.',
} as const;

export const admissionsPreviewContent = {
  id: 'admissions',
  heading: 'A Clear, Structured Path to Admissions',
  intro:
    'When cohort applications open, prospective learners will be able to review the confirmed programme options and apply through a straightforward admissions process.',
  steps: [
    {
      step: 'Step 01',
      title: 'Explore Available Programmes',
      description:
        'Review the published programme overviews, learning objectives, and commitment expectations to understand what each track covers.',
    },
    {
      step: 'Step 02',
      title: 'Select Your Preferred Programme',
      description:
        'During application, you will choose the specific programme you wish to pursue rather than being automatically assigned to a track.',
    },
    {
      step: 'Step 03',
      title: 'Submit Your Application Details',
      description:
        'Share your background, learning goals, and motivation through our structured admissions application for review by the Academy team.',
    },
  ],
  admissionsNote:
    'Applicants choose their preferred programme directly during the application process. Any programme-specific admissions requirements will be clearly stated once final course details are published.',
  cta: {
    label: 'Explore Admissions',
    href: '/#admissions',
    plannedRoute: '/admissions',
  },
} as const;

export const finalCtaContent = {
  heading: 'Your next chapter starts with what you learn today.',
  supporting:
    'Explore how Ops Foundry Academy helps learners build practical capabilities, structured habits, and readiness for real-world work.',
  primaryCta: {
    label: 'Explore the Academy',
    href: '/#programmes',
  },
  secondaryCta: {
    label: 'Explore Admissions',
    href: '/#admissions',
  },
} as const;

export const academyFooterContent = {
  description:
    'Ops Foundry Academy helps people develop relevant, practical skills through structured learning, hands-on application, and a focus on the demands of modern work.',
  ecosystemNote:
    'Part of the Ops Foundry ecosystem — connecting practical skill development with disciplined operational execution.',
  contactGovernanceNote:
    'Official admissions contact channels, programme syllabi, and cohort schedules will be published here as they are formally confirmed.',
} as const;
