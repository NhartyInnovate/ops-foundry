import { getCorporateWebsiteLink } from './site-config';

/**
 * Ops Foundry Academy — Homepage Structured Content Module
 *
 * Source of Truth: Ops_Foundry_Academy_Website_Master_Brief.docx (Sections 01, 02, 03)
 *
 * Contains:
 * 1. The 9 Master Brief Homepage Sections (exact approved working copy).
 * 2. Backwards-compatible exports to keep existing components functioning
 *    cleanly during Stage 1 prior to Stage 3 homepage component restructuring.
 */

export interface AcademyNavItem {
  label: string;
  href: string;
  isPendingRoute?: boolean;
}

export interface AcademyNavDropdownGroup {
  label: string;
  items: AcademyNavItem[];
}

export interface AcademyMobileSection {
  category: string;
  items: AcademyNavItem[];
}

export const academyNavigation = {
  brandName: 'Ops Foundry',
  brandSuffix: 'Academy',
  fullBrandName: 'Ops Foundry Academy',
  // Direct desktop primary links
  primaryLinks: [
    {
      label: 'Career Pathways',
      href: '/pathways',
      isPendingRoute: false,
    },
    {
      label: 'How Learning Works',
      href: '/how-we-learn',
      isPendingRoute: false,
    },
  ] satisfies AcademyNavItem[],
  // Desktop dropdown groups for clean, uncluttered access without overflow
  dropdownGroups: [
    {
      label: 'Admissions & Funding',
      items: [
        {
          label: 'Admissions Guide',
          href: '/admissions',
          isPendingRoute: false,
        },
        {
          label: 'Tuition & Scholarships',
          href: '/tuition-scholarships',
          isPendingRoute: false,
        },
        {
          label: 'Career Opportunities',
          href: '/career-opportunities',
          isPendingRoute: false,
        },
      ],
    },
    {
      label: 'About',
      items: [
        {
          label: 'About the Academy',
          href: '/about',
          isPendingRoute: false,
        },
        {
          label: 'For Partners',
          href: '/for-partners',
          isPendingRoute: false,
        },
        {
          label: 'FAQs',
          href: '/faqs',
          isPendingRoute: false,
        },
        {
          label: 'Contact',
          href: '/contact',
          isPendingRoute: false,
        },
      ],
    },
  ] satisfies AcademyNavDropdownGroup[],
  // Mobile organized sections
  mobileSections: [
    {
      category: 'Learning & Pathways',
      items: [
        { label: 'Career Pathways', href: '/pathways', isPendingRoute: false },
        { label: 'How Learning Works', href: '/how-we-learn', isPendingRoute: false },
      ],
    },
    {
      category: 'Admissions & Opportunities',
      items: [
        { label: 'Admissions', href: '/admissions', isPendingRoute: false },
        { label: 'Tuition & Scholarships', href: '/tuition-scholarships', isPendingRoute: false },
        { label: 'Career Opportunities', href: '/career-opportunities', isPendingRoute: false },
      ],
    },
    {
      category: 'Institutional & Support',
      items: [
        { label: 'For Partners', href: '/for-partners', isPendingRoute: false },
        { label: 'About', href: '/about', isPendingRoute: false },
        { label: 'FAQs', href: '/faqs', isPendingRoute: false },
        { label: 'Contact', href: '/contact', isPendingRoute: false },
      ],
    },
  ] satisfies AcademyMobileSection[],
  // All required active public destinations
  allRequiredDestinations: [
    { label: 'Career Pathways', href: '/pathways', isPendingRoute: false },
    { label: 'How Learning Works', href: '/how-we-learn', isPendingRoute: false },
    { label: 'Career Opportunities', href: '/career-opportunities', isPendingRoute: false },
    { label: 'Admissions', href: '/admissions', isPendingRoute: false },
    { label: 'Tuition & Scholarships', href: '/tuition-scholarships', isPendingRoute: false },
    { label: 'For Partners', href: '/for-partners', isPendingRoute: false },
    { label: 'About', href: '/about', isPendingRoute: false },
    { label: 'FAQs', href: '/faqs', isPendingRoute: false },
    { label: 'Contact', href: '/contact', isPendingRoute: false },
  ] satisfies AcademyNavItem[],
  // Backwards-compatible items export for any existing consumer
  items: [
    { label: 'Career Pathways', href: '/pathways' },
    { label: 'How Learning Works', href: '/how-we-learn' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'About', href: '/about' },
  ] satisfies AcademyNavItem[],
  primaryCta: {
    label: 'Register Interest',
    href: '/apply',
  },
  corporateCrossLink: getCorporateWebsiteLink(),
} as const;

// ============================================================================
// THE 9 HOMEPAGE SECTIONS (EXACT MASTER BRIEF SECTION 03 COPY)
// ============================================================================

/** Section 1: Hero */
export const homepageHeroSection = {
  id: 'hero',
  headline: 'Learn the skills. Prove what you can do. Build your career.',
  body:
    'Ops Foundry Academy prepares people for practical roles in modern business operations. Learn digital tools, AI-enabled workflows and specialist skills through hands-on training designed around the work done at Ops Foundry and across our partner ecosystem.',
  primaryCta: {
    label: 'Explore Career Pathways',
    href: '/pathways',
    isPendingRoute: false,
  },
  secondaryCta: {
    label: 'How Learning Works',
    href: '/how-we-learn',
  },
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

/** Section 2: Why This Academy Exists */
export const homepageWhyAcademyExistsSection = {
  id: 'why-academy-exists',
  headline: 'Training connected to real work.',
  body:
    'Ops Foundry helps businesses manage important digital and operational work. Our Academy develops the capabilities people need to contribute to that work. You learn how modern teams research, create, organize, communicate and deliver, then demonstrate what you can do through practical assignments and assessments.',
  governanceCommitment: {
    heading: 'Clear & Honest Expectations',
    body:
      'Training, certification, readiness and hiring are separate decisions. Completion of an Academy programme does not guarantee a job or automatic placement.',
  },
} as const;

/** Section 3: Learning Pathway */
export const homepageLearningPathwaySection = {
  id: 'learning-pathway',
  headline: 'A clear path from foundation to specialization.',
  steps: [
    {
      stepNumber: '01',
      title: 'Build your foundation.',
      description:
        'Develop essential skills in digital productivity, communication, structured workflows, responsible AI use and problem-solving through the Ops Foundry Core.',
    },
    {
      stepNumber: '02',
      title: 'Specialize.',
      description:
        'Progress into a career pathway according to your interests, performance, aptitude and available places. Build deeper skills through guided projects and realistic business tasks.',
    },
    {
      stepNumber: '03',
      title: 'Demonstrate your capability.',
      description:
        'Complete practical assessments and build evidence of your work. Successful learners may earn Academy-issued credentials for competencies they demonstrate.',
    },
    {
      stepNumber: '04',
      title: 'Be considered for opportunities.',
      description:
        'Graduates who meet role-specific readiness standards may be considered for available openings at Ops Foundry or with partner employers. Hiring depends on vacancies and employer selection.',
    },
  ],
  cta: {
    label: 'See How Learning Works',
    href: '/how-we-learn',
  },
} as const;

/** Section 4: Explore Career Pathways */
export const homepageExplorePathwaysSection = {
  id: 'career-pathways',
  headline: 'Find the kind of work that fits you.',
  intro:
    'Not every digital career requires software engineering. Explore the work behind growing businesses, the skills each role requires and the qualities that can help you thrive.',
  pathways: [
    {
      slug: 'growth-operations',
      title: 'Growth Operations',
      description:
        'Help teams research markets, identify prospects, organize customer information and support pipeline processes.',
      suitability:
        'You may enjoy this pathway if you like research, organization, clear communication and commercial problem-solving.',
      status: 'active' as const,
      ctaLabel: 'Explore Growth Operations',
      href: '/pathways/growth-operations',
    },
    {
      slug: 'content-operations',
      title: 'Content Operations',
      description:
        'Help businesses plan, create, organize and publish digital content.',
      suitability:
        'You may enjoy this pathway if you like writing, creativity, detail and communicating ideas clearly.',
      status: 'active' as const,
      ctaLabel: 'Explore Content Operations',
      href: '/pathways/content-operations',
    },
    {
      slug: 'web-digital-operations',
      title: 'Web & Digital Operations',
      description:
        'Build and maintain websites, update content, test forms and support digital workflows.',
      suitability:
        'You may enjoy this pathway if you like technology, troubleshooting, structure and making things work.',
      status: 'active' as const,
      ctaLabel: 'Explore Web & Digital Operations',
      href: '/pathways/web-digital-operations',
    },
    {
      slug: 'customer-community-operations',
      title: 'Customer & Community Operations',
      description:
        'Support enquiries, onboarding, customer experience and community engagement.',
      suitability:
        'You may enjoy this pathway if you like helping people, listening, solving problems and following through.',
      status: 'upcoming' as const,
      ctaLabel: 'Explore Pathway',
      href: '/pathways/customer-community-operations',
    },
  ],
  viewAllCta: {
    label: 'View All Career Pathways',
    href: '/pathways',
  },
} as const;

/** Section 5: Career Opportunities */
export const homepageCareerOpportunitiesSection = {
  id: 'career-opportunities',
  headline: 'Skills developed for work. Opportunities earned through readiness.',
  body:
    'The Academy is designed to build talent for Ops Foundry’s managed services operations. As roles become available, qualified graduates may be invited to apply or take part in further selection. We also work to connect suitable candidates with opportunities from partner organizations. Placement is not automatic: vacancies, competency standards, interviews and employer decisions determine hiring.',
  cta: {
    label: 'Understand Career Opportunities',
    href: '/career-opportunities',
  },
} as const;

/** Section 6: Admissions and Funding */
export const homepageAdmissionsFundingSection = {
  id: 'admissions-and-funding',
  headline: 'Your next step starts with an application.',
  body:
    'Explore the available programmes, review the time commitment and eligibility requirements, and apply for an open intake. Tuition, payment options and scholarship opportunities are shown on each programme and funding page as they are confirmed.',
  primaryCta: {
    label: 'View Admissions',
    href: '/admissions',
  },
  secondaryCta: {
    label: 'Explore Scholarships',
    href: '/tuition-scholarships',
  },
} as const;

/** Section 7: About Ops Foundry */
export const homepageAboutOpsFoundrySection = {
  id: 'about-ops-foundry',
  headline: 'Connected to the work businesses need done.',
  body:
    'Ops Foundry is a managed services business that helps growing companies execute digital and business operations through skilled teams, structured processes and AI-enabled tools. The Academy develops talent for this operating model and for related roles with partner employers.',
  cta: {
    label: 'Discover Ops Foundry',
    href: getCorporateWebsiteLink().href,
    isExternal: true,
  },
} as const;

/** Section 8: Partnerships and final CTA */
export const homepagePartnershipsSection = {
  id: 'partnerships',
  headline: 'Help create access to practical careers.',
  body:
    'We welcome organizations interested in sponsoring learners, providing computers or connectivity, supporting training, or opening pathways to employment. Tell us how you would like to collaborate.',
  cta: {
    label: 'Partner With the Academy',
    href: '/for-partners',
  },
} as const;

/** Section 9: Final CTA */
export const homepageFinalCtaSection = {
  id: 'final-cta',
  headline: 'Explore a pathway. Take the next step.',
  primaryCta: {
    label: 'Explore Career Pathways',
    href: '/pathways',
  },
  secondaryCta: {
    label: 'Register Interest',
    href: '/apply',
  },
} as const;

// ============================================================================
// BACKWARDS-COMPATIBILITY EXPORTS FOR EXISTING COMPONENTS
// (Ensures existing components in src/app/page.tsx, academy-hero.tsx, etc. compile cleanly)
// ============================================================================

export const academyHeroContent = {
  headline: homepageHeroSection.headline,
  supporting: homepageHeroSection.body,
  primaryCta: {
    label: 'Explore Career Pathways',
    href: '/pathways',
    isPendingRoute: false,
  },
  secondaryCta: {
    label: 'How Learning Works',
    href: '/how-we-learn',
  },
  highlights: [
    {
      title: 'Build Foundation',
      detail: 'Develop essential skills in digital productivity, workflows and responsible AI through the Ops Foundry Core.',
    },
    {
      title: 'Specialize',
      detail: 'Progress into a chosen pathway through guided projects and realistic business tasks.',
    },
    {
      title: 'Demonstrate Capability',
      detail: 'Complete practical assessments and build verified evidence of what you can do.',
    },
    {
      title: 'Be Considered for Opportunities',
      detail: 'Earned readiness for potential roles with Ops Foundry and partner employers.',
    },
  ],
  visual: homepageHeroSection.visual,
} as const;

export const academyIntroductionContent = {
  id: 'about',
  heading: homepageWhyAcademyExistsSection.headline,
  lead:
    'Ops Foundry Academy develops people for practical digital and AI-enabled business operations.',
  paragraphs: [
    homepageWhyAcademyExistsSection.body,
    'Training progresses from the foundational Ops Foundry Core—covering digital productivity, communication, structured workflows, responsible AI use and problem-solving—into specialized domain practice.',
  ],
  commitmentCard: homepageWhyAcademyExistsSection.governanceCommitment,
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
    'Ops Foundry Academy is preparing three initial programmes: Growth Operations, Content Operations, and Web & Digital Operations.',
  governanceNotice:
    'Programme Publication Status: Official start dates, curriculum modules, weekly schedules, and tuition details are undergoing final confirmation prior to opening public cohort applications.',
  cta: {
    label: 'Explore Career Pathways',
    href: '/pathways',
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
  heading: homepageAdmissionsFundingSection.headline,
  intro: homepageAdmissionsFundingSection.body,
  admissionsCopy:
    'Apply to build practical skills for modern business operations. We review eligibility, motivation and readiness, and may require an aptitude assessment or practical task. Admission decisions and scholarship decisions are separate.',
  tuitionCopy:
    'Understand the full cost before you enrol. Each published programme shows its total fee, what is included, available payment arrangements and applicable refund or deferral terms. Amounts will appear only when approved.',
  scholarshipCopy:
    'Explore funding opportunities from Ops Foundry Academy and approved partners. Each listing explains who is eligible, what the award covers, deadlines and how to apply. Scholarships may cover all or part of tuition, and admission is assessed separately.',
  statuses: [
    { name: 'Admitted', description: 'Offer of admission issued for an upcoming cohort intake.' },
    { name: 'Conditional', description: 'Admission subject to completing prerequisite preparation.' },
    { name: 'Waitlisted', description: 'Qualified applicant placed on the intake waiting list.' },
    { name: 'Declined', description: 'Application not accepted for the current cohort window.' },
    { name: 'Withdrawn', description: 'Application closed at applicant request or due to inactivity.' },
  ],
  governanceNotice:
    'Transparent Review: Applicants receive status updates and an enquiry route. We do not use unvalidated scores for automatic final rejection.',
  cta: {
    label: 'View Admissions',
    href: '/admissions',
  },
} as const;

export const finalCtaContent = {
  heading: homepageFinalCtaSection.headline,
  supporting:
    'Explore how Ops Foundry Academy helps learners build practical capabilities, structured habits, and readiness for real-world work.',
  primaryCta: homepageFinalCtaSection.primaryCta,
  secondaryCta: homepageFinalCtaSection.secondaryCta,
} as const;

export const academyFooterContent = {
  description:
    'Ops Foundry Academy develops people for practical digital and AI-enabled business operations.',
  ecosystemNote:
    'Part of the Ops Foundry ecosystem — connecting practical skill development with disciplined operational execution.',
  contactGovernanceNote:
    'Official admissions contact channels, programme syllabi, and cohort schedules will be published here as they are formally confirmed.',
} as const;
