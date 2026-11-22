/**
 * Ops Foundry Academy — Career Pathways Content Module
 *
 * Source of Truth: Ops_Foundry_Academy_Website_Master_Brief.docx (Sections 01, 02, 03, 04)
 *
 * Architectural Boundary:
 * A Career Pathway describes the kind of work a learner may pursue,
 * the skills required, and the qualities that help professionals thrive.
 * It is distinct from a Programme, which describes the actual training offer,
 * duration, tuition, schedule, and cohort intake.
 */

export type PathwayStatus = 'active' | 'upcoming';

export interface CareerPathway {
  slug: 'growth-operations' | 'content-operations' | 'web-digital-operations' | 'customer-community-operations';
  title: string;
  tagline: string;
  status: PathwayStatus;
  plainLanguageRole: string;
  suitability: string;
  cta: {
    label: string;
    href: string;
  };
  relatedProgrammeSlug: string | null;
  readinessNote: string;

  // Detailed fields supported by the template (Section 04).
  // Unapproved items explicitly use 'pending_confirmation' status.
  whatWorkLooksLike: {
    status: 'published' | 'pending_confirmation';
    summary: string;
    responsibilities: string[];
    sampleDayInTheLife: string | null;
  };
  whoMightThrive: {
    status: 'published' | 'pending_confirmation';
    interests: string[];
    workHabits: string[];
    strengths: string[];
  };
  skillsYouDevelop: {
    status: 'published' | 'pending_confirmation';
    summary: string;
    tools: string[];
    tasks: string[];
    workflows: string[];
    responsibleAiUse: string[];
  };
  evidenceOfCapability: {
    status: 'published' | 'pending_confirmation';
    summary: string;
    practicalProjects: string[];
    assessments: string[];
    credentials: string[];
  };
  potentialRoles: {
    status: 'published' | 'pending_confirmation';
    summary: string;
    examples: string[];
    disclaimer: string;
  };
  progressionAndOpportunity: {
    status: 'published' | 'pending_confirmation';
    readinessCriteria: string[];
    placementProcess: string;
    disclaimer: string;
  };
}

export const careerPathways: CareerPathway[] = [
  {
    slug: 'growth-operations',
    title: 'Growth Operations',
    tagline: 'Research markets, organize prospect data, and support commercial pipeline execution.',
    status: 'active',
    plainLanguageRole:
      'Help teams research markets, identify prospects, organize customer information and support pipeline processes.',
    suitability:
      'You may enjoy this pathway if you like research, organization, clear communication and commercial problem-solving.',
    cta: {
      label: 'Explore Growth Operations',
      href: '/pathways/growth-operations',
    },
    relatedProgrammeSlug: 'growth-operations',
    readinessNote:
      'Growth Operations is an active launch pathway with an aligned training programme currently in scoping for upcoming intake.',
    whatWorkLooksLike: {
      status: 'pending_confirmation',
      summary:
        'Growth Operations professionals enable sales and business development teams by ensuring market data is accurate, leads are qualified, and CRM workflows operate smoothly.',
      responsibilities: [
        'Conducting structured desk research to identify target companies and relevant market segments.',
        'Verifying and enriching prospect contact information using digital data tools.',
        'Organizing and maintaining clean records inside customer relationship management (CRM) systems.',
        'Supporting outbound communication cadences, tracking responses, and routing qualified opportunities.',
        'Documenting pipeline activity and preparing accurate operational reports for commercial leadership.',
      ],
      sampleDayInTheLife: null,
    },
    whoMightThrive: {
      status: 'published',
      interests: [
        'Commercial research and business analysis',
        'Data organization and process coordination',
        'Direct, concise professional communication',
      ],
      workHabits: [
        'Systematic attention to detail and verification',
        'Structured note-taking and documentation habits',
        'Disciplined follow-through on recurring daily workflows',
      ],
      strengths: [
        'Commercial problem-solving',
        'Information synthesis',
        'Process reliability',
      ],
    },
    skillsYouDevelop: {
      status: 'pending_confirmation',
      summary:
        'Skills focus on market research, CRM data integrity, structured communication, and responsible AI-assisted data enrichment. Tool specifications will be confirmed upon syllabus approval.',
      tools: [],
      tasks: [
        'Prospect research and lead verification',
        'Pipeline data organization and CRM hygiene',
        'Outreach workflow coordination',
      ],
      workflows: [
        'Inbound and outbound data handling',
        'Commercial pipeline tracking',
      ],
      responsibleAiUse: [
        'Using AI tools for initial research synthesis while maintaining strict human verification of contact data and claims.',
      ],
    },
    evidenceOfCapability: {
      status: 'pending_confirmation',
      summary:
        'Learners demonstrate capability through verified practical tasks and real-world pipeline scenarios. Specific assessment briefs will be published alongside course specifications.',
      practicalProjects: [],
      assessments: [],
      credentials: [],
    },
    potentialRoles: {
      status: 'published',
      summary:
        'Graduates who meet readiness standards may be considered for entry-level and junior operational roles in commercial teams.',
      examples: [
        'Growth Operations Associate',
        'Sales Operations Coordinator',
        'Pipeline Development Specialist',
        'Market Research Assistant',
      ],
      disclaimer:
        'Role titles are illustrative examples of typical market opportunities and do not represent guaranteed job vacancies or automatic placement.',
    },
    progressionAndOpportunity: {
      status: 'published',
      readinessCriteria: [
        'Successful completion of core and specialization requirements.',
        'Demonstrated competency on proctored practical tasks.',
        'Adherence to professional operational standards.',
      ],
      placementProcess:
        'Qualified graduates who achieve role-specific readiness may be invited to interview for available openings at Ops Foundry or referred to partner employers.',
      disclaimer:
        'Training, certification, readiness and hiring are separate decisions. Completion of an Academy programme does not guarantee employment.',
    },
  },
  {
    slug: 'content-operations',
    title: 'Content Operations',
    tagline: 'Plan, produce, organize, and publish digital content assets across modern channels.',
    status: 'active',
    plainLanguageRole:
      'Help businesses plan, create, organize and publish digital content.',
    suitability:
      'You may enjoy this pathway if you like writing, creativity, detail and communicating ideas clearly.',
    cta: {
      label: 'Explore Content Operations',
      href: '/pathways/content-operations',
    },
    relatedProgrammeSlug: 'content-operations',
    readinessNote:
      'Content Operations is an active launch pathway with an aligned training programme currently in scoping for upcoming intake.',
    whatWorkLooksLike: {
      status: 'pending_confirmation',
      summary:
        'Content Operations specialists manage the structured execution of content workflows—from drafting and asset collection to proofreading, scheduling, and publication.',
      responsibilities: [
        'Drafting clear, purposeful written copy for web pages, articles, newsletters, and social channels.',
        'Reviewing content against brand guidelines, editorial standards, and factual requirements.',
        'Formatting, proofreading, and staging content inside content management systems (CMS).',
        'Coordinating editorial calendars, tracking publication deadlines, and archiving digital assets.',
        'Assisting with asset preparation, basic image resizing, and metadata documentation.',
      ],
      sampleDayInTheLife: null,
    },
    whoMightThrive: {
      status: 'published',
      interests: [
        'Writing, storytelling, and editorial clarity',
        'Digital media organization and scheduling',
        'Visual presentation and formatting consistency',
      ],
      workHabits: [
        'Meticulous proofreading and grammar checking',
        'Respect for editorial guidelines and deadlines',
        'Constructive engagement with editorial feedback',
      ],
      strengths: [
        'Clear written expression',
        'Visual and structural detail',
        'Editorial consistency',
      ],
    },
    skillsYouDevelop: {
      status: 'pending_confirmation',
      summary:
        'Skills focus on copywriting, editorial workflow management, CMS formatting, and responsible AI prompting for drafting and editing.',
      tools: [],
      tasks: [
        'Copy drafting and editorial refinement',
        'CMS staging, formatting, and scheduling',
        'Asset cataloguing and digital asset management',
      ],
      workflows: [
        'Editorial approval cycles',
        'Multi-channel content scheduling',
      ],
      responsibleAiUse: [
        'Employing generative AI as a drafting accelerator while maintaining human editorial oversight, fact-checking, and voice consistency.',
      ],
    },
    evidenceOfCapability: {
      status: 'pending_confirmation',
      summary:
        'Learners produce a portfolio of verified content outputs and complete CMS publishing exercises.',
      practicalProjects: [],
      assessments: [],
      credentials: [],
    },
    potentialRoles: {
      status: 'published',
      summary:
        'Graduates who meet readiness standards may be considered for operational content roles across marketing and media teams.',
      examples: [
        'Content Operations Specialist',
        'Digital Content Coordinator',
        'Editorial Assistant',
        'CMS Publisher',
      ],
      disclaimer:
        'Role titles are illustrative examples of typical market opportunities and do not represent guaranteed job vacancies or automatic placement.',
    },
    progressionAndOpportunity: {
      status: 'published',
      readinessCriteria: [
        'Demonstrated writing fluency and accurate grammar.',
        'Competency in digital publishing workflows and CMS formatting.',
        'Adherence to editorial guidelines without recurring errors.',
      ],
      placementProcess:
        'Qualified graduates who achieve role-specific readiness may be invited to interview for available openings at Ops Foundry or referred to partner employers.',
      disclaimer:
        'Training, certification, readiness and hiring are separate decisions. Completion of an Academy programme does not guarantee employment.',
    },
  },
  {
    slug: 'web-digital-operations',
    title: 'Web & Digital Operations',
    tagline: 'Build, maintain, test, and support modern websites and connected digital workflows.',
    status: 'active',
    plainLanguageRole:
      'Build and maintain websites, update content, test forms and support digital workflows.',
    suitability:
      'You may enjoy this pathway if you like technology, troubleshooting, structure and making things work.',
    cta: {
      label: 'Explore Web & Digital Operations',
      href: '/pathways/web-digital-operations',
    },
    relatedProgrammeSlug: 'web-digital-operations',
    readinessNote:
      'Web & Digital Operations is an active launch pathway with an aligned training programme currently in scoping for upcoming intake.',
    whatWorkLooksLike: {
      status: 'pending_confirmation',
      summary:
        'Web & Digital Operations professionals bridge design, content, and technology by configuring site pages, verifying form submissions, and ensuring digital touchpoints function reliably.',
      responsibilities: [
        'Building and updating website pages using modern content platforms and page builders.',
        'Testing forms, navigation menus, links, and cross-browser responsiveness.',
        'Configuring basic integrations between websites, forms, and email/CRM tools.',
        'Conducting routine site audits for broken links, missing meta tags, and accessibility issues.',
        'Documenting technical setup procedures and troubleshooting routine digital errors.',
      ],
      sampleDayInTheLife: null,
    },
    whoMightThrive: {
      status: 'published',
      interests: [
        'Web technology, digital platforms, and user experience',
        'Troubleshooting, debugging, and problem resolution',
        'Logical organization and structured testing',
      ],
      workHabits: [
        'Methodical testing and step-by-step verification',
        'Curiosity about how software and tools connect',
        'Structured documentation of technical issues',
      ],
      strengths: [
        'Technical troubleshooting',
        'Attention to digital detail',
        'Process automation mindset',
      ],
    },
    skillsYouDevelop: {
      status: 'pending_confirmation',
      summary:
        'Skills focus on website publishing, CMS configuration, QA testing, form verification, and AI-assisted web maintenance.',
      tools: [],
      tasks: [
        'Page construction and content layout',
        'Quality assurance (QA) and regression testing',
        'Basic domain, DNS, and hosting maintenance verification',
      ],
      workflows: [
        'Website launch checklists',
        'Bug reporting and fix verification',
      ],
      responsibleAiUse: [
        'Using AI code assistants and debugging tools thoughtfully with human validation of code, layouts, and site behavior.',
      ],
    },
    evidenceOfCapability: {
      status: 'pending_confirmation',
      summary:
        'Learners demonstrate capability by building working digital assets, completing QA audit scenarios, and resolving real-world bug tickets.',
      practicalProjects: [],
      assessments: [],
      credentials: [],
    },
    potentialRoles: {
      status: 'published',
      summary:
        'Graduates who meet readiness standards may be considered for web administration, digital support, and site coordination roles.',
      examples: [
        'Web Operations Assistant',
        'Digital Operations Specialist',
        'Website Administrator',
        'QA & Web Support Coordinator',
      ],
      disclaimer:
        'Role titles are illustrative examples of typical market opportunities and do not represent guaranteed job vacancies or automatic placement.',
    },
    progressionAndOpportunity: {
      status: 'published',
      readinessCriteria: [
        'Proven ability to build and modify web pages without design breakage.',
        'Reliable execution of QA testing and bug reporting.',
        'Understanding of web security, backup, and form hygiene basics.',
      ],
      placementProcess:
        'Qualified graduates who achieve role-specific readiness may be invited to interview for available openings at Ops Foundry or referred to partner employers.',
      disclaimer:
        'Training, certification, readiness and hiring are separate decisions. Completion of an Academy programme does not guarantee employment.',
    },
  },
  {
    slug: 'customer-community-operations',
    title: 'Customer & Community Operations',
    tagline: 'Support customer onboarding, user enquiries, and community engagement.',
    status: 'upcoming',
    plainLanguageRole:
      'Support enquiries, onboarding, customer experience and community engagement.',
    suitability:
      'You may enjoy this pathway if you like helping people, listening, solving problems and following through.',
    cta: {
      label: 'Explore Pathway',
      href: '/pathways/customer-community-operations',
    },
    relatedProgrammeSlug: null,
    readinessNote:
      'Customer & Community Operations is an upcoming pathway undergoing curriculum development. It is not open for first-cohort admissions.',
    whatWorkLooksLike: {
      status: 'pending_confirmation',
      summary:
        'Customer & Community Operations professionals ensure users, clients, and community members receive thoughtful, timely assistance and onboarding guidance.',
      responsibilities: [
        'Responding to incoming user enquiries via email, chat, or support ticketing systems.',
        'Guiding new users through structured onboarding steps and account setup.',
        'Moderating community forums, discussion spaces, and event interactions.',
        'Documenting frequent customer issues and updating help documentation.',
        'Escalating technical problems to appropriate internal operational teams.',
      ],
      sampleDayInTheLife: null,
    },
    whoMightThrive: {
      status: 'published',
      interests: [
        'Helping people, relationship building, and active listening',
        'Customer experience and user satisfaction',
        'Community moderation and group facilitation',
      ],
      workHabits: [
        'Patience, empathy, and clear written communication',
        'Calmness under pressure when handling user difficulties',
        'Consistent follow-through until user problems are resolved',
      ],
      strengths: [
        'Empathetic communication',
        'Conflict de-escalation',
        'Customer advocacy',
      ],
    },
    skillsYouDevelop: {
      status: 'pending_confirmation',
      summary:
        'Skills focus on helpdesk ticketing, customer onboarding workflows, community engagement, and responsible AI support tooling.',
      tools: [],
      tasks: [
        'Ticket triage and customer response drafting',
        'User onboarding walkthroughs',
        'Community moderation and sentiment monitoring',
      ],
      workflows: [
        'Customer support escalation pathways',
        'Knowledge base article authoring',
      ],
      responsibleAiUse: [
        'Using AI suggestion tools for customer responses while ensuring all communications are personalized, accurate, and empathetic.',
      ],
    },
    evidenceOfCapability: {
      status: 'pending_confirmation',
      summary:
        'Assessment frameworks for this pathway will be finalized prior to cohort release.',
      practicalProjects: [],
      assessments: [],
      credentials: [],
    },
    potentialRoles: {
      status: 'published',
      summary:
        'Illustrative future opportunities for qualified graduates in customer and community operations.',
      examples: [
        'Customer Operations Specialist',
        'Onboarding Coordinator',
        'Community Operations Associate',
        'User Support Specialist',
      ],
      disclaimer:
        'Role titles are illustrative examples of typical market opportunities and do not represent guaranteed job vacancies or automatic placement.',
    },
    progressionAndOpportunity: {
      status: 'published',
      readinessCriteria: [
        'Upcoming pathway: readiness criteria will be published upon cohort confirmation.',
      ],
      placementProcess:
        'Not currently open for first-cohort admissions.',
      disclaimer:
        'Training, certification, readiness and hiring are separate decisions. Completion of an Academy programme does not guarantee employment.',
    },
  },
];

export function getPathwayBySlug(slug: string): CareerPathway | undefined {
  return careerPathways.find((p) => p.slug === slug);
}

export function getActivePathways(): CareerPathway[] {
  return careerPathways.filter((p) => p.status === 'active');
}

export function getUpcomingPathways(): CareerPathway[] {
  return careerPathways.filter((p) => p.status === 'upcoming');
}
