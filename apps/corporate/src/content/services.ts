export type ServiceSlug = 'get-online' | 'get-visible' | 'get-customers';

export interface ServiceDetailContent {
  slug: ServiceSlug;
  title: string;
  lead: string;
  heroSummary: string;
  heroImage: {
    src: string;
    alt: string;
    caption: string;
  };
  problemHeading: string;
  problemSummary: string;
  howWeHelpHeading: string;
  howWeHelp: string;
  activitiesHeading: string;
  activitiesDisclaimer: string;
  typicalActivities: {
    category: string;
    items: string[];
  }[];
  potentialEngagement: {
    title: string;
    content: string;
    relevantWork?: string;
    scopeBoundary: string;
  };
  dependenciesHeading: string;
  dependenciesIntro: string;
  clientDependencies: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaHref: string;
}

export const servicesOverviewContent = {
  hero: {
    title: 'Essential work. Managed with care.',
    lead:
      'Your business needs more than ideas and tools. It needs dependable execution. Ops Foundry helps growing businesses manage the digital and commercial work that supports everyday growth.',
    primaryCta: {
      label: 'Explore a Pilot',
      href: '/pilot',
    },
    secondaryCta: {
      label: 'See How We Work',
      href: '/how-we-work',
    },
  },
  categories: [
    {
      slug: 'get-online' as ServiceSlug,
      title: 'Get Online',
      description:
        'Build and maintain your digital presence. Websites, landing pages, content updates, enquiry forms and ongoing digital upkeep.',
      href: '/services/get-online',
    },
    {
      slug: 'get-visible' as ServiceSlug,
      title: 'Get Visible',
      description:
        'Plan and run consistent communications. Content operations, publishing support, repurposing and reporting.',
      href: '/services/get-visible',
    },
    {
      slug: 'get-customers' as ServiceSlug,
      title: 'Get Customers',
      description:
        'Organize the work behind customer acquisition. Prospect research, CRM management, outreach coordination and pipeline reporting.',
      href: '/services/get-customers',
    },
  ],
  serviceBlocks: [
    {
      slug: 'get-online' as ServiceSlug,
      title: 'Get Online',
      description:
        'Build and maintain your digital presence. Websites, landing pages, content updates, enquiry forms and ongoing digital upkeep.',
      image: {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80',
        alt: 'Modern architectural office workspace representing structured digital presence foundations',
      },
      focusAreas: [
        'Business websites and landing pages',
        'Website structure, copy placement and content updates',
        'Content management systems and routine publishing',
        'Contact forms and enquiry pathways',
        'Quality checks, basic analytics and ongoing maintenance',
      ],
      href: '/services/get-online',
    },
    {
      slug: 'get-visible' as ServiceSlug,
      title: 'Get Visible',
      description:
        'Plan and run consistent communications. Content operations, publishing support, repurposing and reporting.',
      image: {
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80',
        alt: 'Team reviewing editorial schedules and communication materials at a workspace table',
      },
      focusAreas: [
        'Content planning and editorial calendars',
        'Content drafting, editing and repurposing',
        'Social media scheduling and publishing support',
        'Website and profile content updates',
        'Basic search-friendly content practices',
        'Content performance reporting',
      ],
      href: '/services/get-visible',
    },
    {
      slug: 'get-customers' as ServiceSlug,
      title: 'Get Customers',
      description:
        'Organize the work behind customer acquisition. Prospect research, CRM management, outreach coordination and pipeline reporting.',
      image: {
        src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=80',
        alt: 'Commercial operations team reviewing customer pipeline workflows in a meeting room',
      },
      focusAreas: [
        'Ideal customer profile research and account targeting support',
        'Prospect research and lead-list preparation',
        'CRM setup support, data hygiene and updates',
        'Outreach preparation and coordination within approved channels',
        'Inbound enquiry organization and follow-up tracking',
        'Pipeline dashboards and activity reporting',
      ],
      href: '/services/get-customers',
    },
  ],
  howEngagementWorks: {
    title: 'How Engagement Works',
    description:
      'We begin with a discovery conversation, agree on a scoped paid pilot, deliver with oversight and reporting, and review whether continued support makes sense.',
  },
  finalCta: {
    heading: 'Ready to explore an operational pilot?',
    body:
      'Tell us where your business needs support. We will explore the challenge with you and, where there is a fit, prepare a focused proposal with clear deliverables, timing and fees.',
    processHeading: 'How engagement works',
    stages: [
      {
        slug: 'discover',
        title: 'Discover',
        description:
          'Begin with a discovery conversation to understand the business challenge.',
      },
      {
        slug: 'scope',
        title: 'Scope',
        description:
          'Agree on a clearly defined, paid pilot with specific deliverables, timing and fees.',
      },
      {
        slug: 'deliver',
        title: 'Deliver',
        description:
          'Execute the pilot with appropriate oversight and reporting.',
      },
      {
        slug: 'review',
        title: 'Review',
        description:
          'Evaluate the outcomes and determine whether continued support makes sense.',
      },
    ],
    primaryLabel: 'Explore a Pilot',
    primaryHref: '/pilot',
    secondaryLabel: 'See How We Work',
    secondaryHref: '/how-we-work',
  },
} as const;

export const serviceDetailsBySlug: Record<ServiceSlug, ServiceDetailContent> = {
  'get-online': {
    slug: 'get-online',
    title: 'Get Online',
    lead: 'A digital presence that works for your business.',
    heroSummary:
      'We help you build, improve and maintain the digital touchpoints customers use to find you, understand what you offer and get in touch.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80',
      alt: 'Modern architectural office workspace representing structured digital presence foundations',
      caption: 'A clear, maintainable digital presence built around how your business actually operates.',
    },
    problemHeading: 'Get online. Stay up to date.',
    problemSummary:
      'A website should not become another unfinished project. Whether you need a simple new presence or reliable support for an existing site, we handle the practical work needed to keep it useful.',
    howWeHelpHeading: 'What We Can Manage',
    howWeHelp:
      'From business websites and landing pages to updates, forms and content management, we help keep your digital foundations useful and current.',
    activitiesHeading: 'What We Can Manage',
    activitiesDisclaimer:
      'Note: The activities below reflect our core operational deliverables. Every engagement is scoped individually—specific deliverables and boundaries are agreed during pilot scoping.',
    typicalActivities: [
      {
        category: 'Digital Presence & Updates',
        items: [
          'Business websites and landing pages',
          'Website structure, copy placement and content updates',
          'Content management systems and routine publishing',
          'Contact forms and enquiry pathways',
          'Quality checks, basic analytics and ongoing maintenance',
        ],
      },
    ],
    potentialEngagement: {
      title: 'What a Pilot Could Look Like',
      content:
        'A focused website launch, a landing-page improvement or a defined set of website updates. We agree on scope, required content, responsibilities, delivery timeline and acceptance criteria before work begins.',
      scopeBoundary:
        'Ongoing website maintenance, hosting and third-party software costs are excluded unless separately agreed, subject to the actual service terms.',
    },
    dependenciesHeading: 'Client Responsibilities & Dependencies',
    dependenciesIntro:
      'To execute a Get Online engagement effectively, we rely on clear inputs and timely collaboration from your team:',
    clientDependencies: [
      'A designated point of contact authorized to review drafts and approve page content',
      'Accurate factual information about your business, services, and commercial positioning',
      'Existing brand assets (such as logos or approved photography) where available',
      'Appropriate administrative access or coordination with your domain/hosting administrator when deployment is part of agreed scope',
    ],
    ctaHeading: 'Make your digital presence work harder.',
    ctaBody:
      'Explore a Get Online pilot to build, improve or maintain your digital touchpoints.',
    ctaButtonLabel: 'Explore a Get Online Pilot',
    ctaHref: '/pilot?service=get-online',
  },

  'get-visible': {
    slug: 'get-visible',
    title: 'Get Visible',
    lead: 'Show up consistently. Stay relevant.',
    heroSummary:
      'We help growing businesses turn ideas, expertise and updates into organized digital communications, without adding another operational burden to their teams.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80',
      alt: 'Team reviewing editorial schedules and communication materials at a workspace table',
      caption: 'Structured editorial and discovery workflows that keep your business visible consistently.',
    },
    problemHeading: 'Consistent content needs a working system.',
    problemSummary:
      'Creating a few posts is easy. Maintaining a clear message, steady publishing rhythm and useful performance feedback takes coordination. We help manage that ongoing work.',
    howWeHelpHeading: 'What We Can Manage',
    howWeHelp:
      'We help plan, create, repurpose, publish and track content that keeps your business communicating consistently.',
    activitiesHeading: 'What We Can Manage',
    activitiesDisclaimer:
      'Note: Ops Foundry focuses on disciplined operational execution. Paid media buying, brand strategy overhauls and guaranteed reach or follower growth are not included unless separately agreed.',
    typicalActivities: [
      {
        category: 'Content Operations & Publishing',
        items: [
          'Content planning and editorial calendars',
          'Content drafting, editing and repurposing',
          'Social media scheduling and publishing support',
          'Website and profile content updates',
          'Basic search-friendly content practices',
          'Content performance reporting',
        ],
      },
    ],
    potentialEngagement: {
      title: 'What a Pilot Could Look Like',
      content:
        'A defined content cycle for selected channels, including an agreed content calendar, content deliverables, publishing channels, review checkpoints and performance summary.',
      scopeBoundary:
        'Paid media buying, major brand strategy overhauls and guaranteed reach or follower growth are not included unless separately agreed.',
    },
    dependenciesHeading: 'Client Responsibilities & Dependencies',
    dependenciesIntro:
      'Because credible business communication must reflect your real expertise and policies, client collaboration is essential:',
    clientDependencies: [
      'Subject-matter input (such as brief recorded conversations, bulleted notes, or reference documents) so content remains grounded in your actual work',
      'Timely review and sign-off on drafted communications before publication',
      'Clear guidelines on commercial claims, terminology, or regulatory boundaries specific to your industry',
      'Authorized access or publishing permissions for the channels included in the agreed scope',
    ],
    ctaHeading: 'Make consistency part of your operations.',
    ctaBody:
      'Explore a Get Visible pilot to establish consistent communication and content workflows.',
    ctaButtonLabel: 'Explore a Get Visible Pilot',
    ctaHref: '/pilot?service=get-visible',
  },

  'get-customers': {
    slug: 'get-customers',
    title: 'Get Customers',
    lead: 'A more organized path from prospect to customer.',
    heroSummary:
      'Customer acquisition depends on work that happens before and after a sales conversation. We help you research prospects, organize information and keep your pipeline moving with greater consistency.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=80',
      alt: 'Commercial operations team reviewing customer pipeline workflows in a meeting room',
      caption: 'Disciplined prospecting and pipeline operations that support your commercial team.',
    },
    problemHeading: 'Better follow-through starts behind the scenes.',
    problemSummary:
      'Prospect lists become outdated. CRM records go incomplete. Follow-ups are missed. We help put structure around these tasks so your commercial team can spend more time on meaningful customer conversations.',
    howWeHelpHeading: 'What We Can Manage',
    howWeHelp:
      'We support prospect research, CRM operations, outreach coordination and pipeline follow-through so your team can focus on customer conversations.',
    activitiesHeading: 'What We Can Manage',
    activitiesDisclaimer:
      'Note: We support acquisition operations. We do not guarantee leads, booked meetings, conversions or sales revenue.',
    typicalActivities: [
      {
        category: 'Pipeline & Outreach Coordination',
        items: [
          'Ideal customer profile research and account targeting support',
          'Prospect research and lead-list preparation',
          'CRM setup support, data hygiene and updates',
          'Outreach preparation and coordination within approved channels',
          'Inbound enquiry organization and follow-up tracking',
          'Pipeline dashboards and activity reporting',
        ],
      },
    ],
    potentialEngagement: {
      title: 'What a Pilot Could Look Like',
      content:
        'A defined target segment, agreed research and CRM tasks, a managed workflow and a reporting cadence. Any external outreach is subject to client approval, lawful data practices and accurate messaging.',
      scopeBoundary:
        'We support acquisition operations. We do not guarantee leads, booked meetings, conversions or sales revenue.',
    },
    dependenciesHeading: 'Client Responsibilities & Dependencies',
    dependenciesIntro:
      'Ops Foundry supports your commercial operations; we do not make unapproved representations or replace your core commercial decision-makers:',
    clientDependencies: [
      'Clear definition of your target customer profile, qualification rules, and commercial exclusions',
      'A designated commercial owner on your team to handle live sales conversations, pricing proposals, and contract closing',
      'Approved messaging guidelines and compliance boundaries for any external communications',
      'Appropriate access to the CRM, spreadsheet, or intake tools used within the agreed workflow',
    ],
    ctaHeading: 'Give your customer pipeline more structure.',
    ctaBody:
      'Explore a Get Customers pilot to bring structure and consistency to your commercial operations.',
    ctaButtonLabel: 'Explore a Get Customers Pilot',
    ctaHref: '/pilot?service=get-customers',
  },
};

export const allServiceSlugs: ServiceSlug[] = [
  'get-online',
  'get-visible',
  'get-customers',
];
