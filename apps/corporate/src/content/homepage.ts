export interface NavServiceItem {
  id: 'get-online' | 'get-visible' | 'get-customers';
  title: string;
  summary: string;
  href: string;
}

export interface OperatingPillar {
  number: string;
  title: string;
  summary: string;
}

export interface CorporateServiceLine {
  id: 'get-online' | 'get-visible' | 'get-customers';
  anchorId: string;
  title: string;
  description: string;
  focusAreas: string[];
  ctaLabel: string;
  ctaHref: string;
  pilotHref: string;
  image: {
    src: string;
    alt: string;
    caption: string;
  };
}

export interface SelectedWorkProject {
  id: string;
  title: string;
  supportingCopy: string;
  verified: boolean;
  image?: {
    src: string;
    alt: string;
  };
  link?: string;
}

export const corporateNavigation = {
  brandName: 'Ops Foundry',
  primaryLinks: [
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'About', href: '/about' },
  ],
  servicesOverview: {
    title: 'Services Overview',
    summary:
      'How we help businesses execute across digital presence, visibility, and pipeline operations',
    href: '/services',
  },
  serviceItems: [
    {
      id: 'get-online',
      title: 'Get Online',
      summary: 'Build and maintain a digital presence that works',
      href: '/services/get-online',
    },
    {
      id: 'get-visible',
      title: 'Get Visible',
      summary: 'Stay visible without adding to your team’s workload',
      href: '/services/get-visible',
    },
    {
      id: 'get-customers',
      title: 'Get Customers',
      summary: 'Bring structure to customer acquisition',
      href: '/services/get-customers',
    },
  ] satisfies NavServiceItem[],
  primaryCta: {
    label: 'Explore a Pilot',
    href: '/pilot',
  },
} as const;

export const heroContent = {
  eyebrow: 'OPS FOUNDRY / MANAGED BUSINESS OPERATIONS',
  headlinePrimary: 'Your business has work to do.',
  headlineAccent: 'We help you get it done.',
  supportingCopy:
    'We help growing businesses build, manage and improve essential digital and business operations through skilled teams, structured workflows and AI-enabled tools.',
  primaryCta: {
    label: 'Explore a Pilot',
    href: '/pilot',
  },
  secondaryCta: {
    label: 'Explore Our Services',
    href: '/services',
  },
  highlights: [
    {
      title: 'Managed Teams',
      description: 'Operators who take responsibility for agreed work and deliverables',
    },
    {
      title: 'Structured Workflows',
      description: 'Clear workflows, quality reviews and reporting that keep execution consistent',
    },
    {
      title: 'AI-Enabled Tools',
      description: 'Practical AI-enabled tools that support faster work under human oversight',
    },
  ],
  heroImage: {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    alt: 'Operations team members reviewing project workflows and planning deliverables around a conference table',
    captionTitle: 'People, processes, and technology working as one system.',
    captionBody:
      'Managed operational teams work inside documented workflows with practical AI tools to deliver consistent business execution.',
  },
} as const;

export const brandsWeSupportContent = {
  heading: "Brands we've supported.",
  statement:
    'We work with forward-thinking businesses and partner organisations to strengthen day-to-day execution.',
  organisations: [
    {
      name: 'TeleSoftas',
      logo: '/images/brands/telesoftas-white.png',
      logoDark: '/images/brands/telesoftas.png',
      width: 252,
      height: 61,
    },
    {
      name: 'Mintage Africa',
      logo: '/images/brands/mintage-africa-white.png',
      logoDark: '/images/brands/mintage-africa.png',
      width: 1024,
      height: 379,
    },
    {
      name: 'Roomkind',
      logo: '/images/brands/roomkind-white.png',
      logoDark: '/images/brands/roomkind.png',
      width: 600,
      height: 200,
    },
  ],
} as const;

export const challengeContent = {
  headline: 'Growth brings opportunity. It also brings more work.',
  lead:
    'Your website needs attention. Content needs to be created and published. Potential customers need researching, engaging and following up. Yet building a separate in-house team for every function is not always practical.',
  editorialCallout:
    'Ops Foundry gives you a more structured way to get essential work done, with accountable delivery and clear visibility into progress.',
  image: {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Two colleagues reviewing operational documentation and workflow priorities at a desk',
    caption:
      'Structured coordination turns recurring operational bottlenecks into manageable, repeatable work.',
  },
} as const;

// Backward-compatible alias for existing imports
export const whyOpsFoundryContent = challengeContent;

export const whyOpsFoundrySectionContent = {
  heading: 'Why Ops Foundry',
  headline: 'We take ownership of the work, not just the task list.',
  supportingCopy:
    'We help define the work, coordinate delivery, check quality and keep you informed. You get an accountable operating partner, not another collection of tasks to manage.',
} as const;

export const selectedWorkContent = {
  heading: 'Selected Work',
  headline: 'Practical work. Visible outcomes.',
  // Publication control: active on homepage; verification tracks formal external authorization
  published: true,
  projects: [
    {
      id: 'status-event-management',
      title: 'A digital home for Status Event Management Company.',
      supportingCopy:
        'Website and digital presence delivery within the Telesoftas ecosystem, helping the business present its services and give customers a clearer way to connect.',
      verified: false,
      image: {
        src: '/images/selected-work/event-management-website-mockup.jpg',
        alt: 'Illustrative event management website homepage mockup displayed inside a desktop browser frame',
      },
    },
  ] as SelectedWorkProject[],
} as const;

export const operatingPillarsContent = {
  headline: 'Skilled people. Structured processes. Smarter execution.',
  pillars: [
    {
      number: '01',
      title: 'People',
      summary: 'Operators who take responsibility for agreed work and deliverables.',
    },
    {
      number: '02',
      title: 'Process',
      summary: 'Clear workflows, quality reviews and reporting that keep execution consistent.',
    },
    {
      number: '03',
      title: 'Intelligence',
      summary: 'Practical AI-enabled tools that support faster work under human oversight.',
    },
  ] satisfies OperatingPillar[],
  ctaLabel: 'See How We Work',
  ctaHref: '/how-we-work',
} as const;

export const servicesContent = {
  headline: 'Three ways to move your business forward.',
  intro:
    'We help businesses strengthen their digital presence, improve visibility and build more consistent customer pipelines.',
  scopeNotice:
    'Specific deliverables and engagement scope are tailored during initial pilot scoping based on your operational priorities.',
  services: [
    {
      id: 'get-online',
      anchorId: 'service-get-online',
      title: 'Get Online',
      description:
        'Build and maintain a digital presence that works. From business websites and landing pages to updates, forms and content management, we help keep your digital foundations useful and current.',
      focusAreas: [
        'Business websites and landing pages',
        'Website structure, copy placement and content updates',
        'Content management systems and routine publishing',
        'Contact forms and enquiry pathways',
        'Quality checks, basic analytics and ongoing maintenance',
      ],
      ctaLabel: 'Explore Get Online',
      ctaHref: '/services/get-online',
      pilotHref: '/pilot?service=get-online',
      image: {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
        alt: 'Clean modern architectural office workspace representing structured digital foundations',
        caption:
          'Dependable digital foundations built and maintained with structured operational discipline.',
      },
    },
    {
      id: 'get-visible',
      anchorId: 'service-get-visible',
      title: 'Get Visible',
      description:
        'Stay visible without adding to your team’s workload. We help plan, create, repurpose, publish and track content that keeps your business communicating consistently.',
      focusAreas: [
        'Content planning and editorial calendars',
        'Content drafting, editing and repurposing',
        'Social media scheduling and publishing support',
        'Website and profile content updates',
        'Basic search-friendly content practices',
        'Content performance reporting',
      ],
      ctaLabel: 'Explore Get Visible',
      ctaHref: '/services/get-visible',
      pilotHref: '/pilot?service=get-visible',
      image: {
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
        alt: 'Team reviewing editorial plans and communication materials at a worktable',
        caption:
          'Repeatable content and communication workflows that keep your business visible without overwhelming your team.',
      },
    },
    {
      id: 'get-customers',
      anchorId: 'service-get-customers',
      title: 'Get Customers',
      description:
        'Bring structure to customer acquisition. We support prospect research, CRM operations, outreach coordination and pipeline follow-through so your team can focus on customer conversations.',
      focusAreas: [
        'Ideal customer profile research and account targeting support',
        'Prospect research and lead-list preparation',
        'CRM setup support, data hygiene and updates',
        'Outreach preparation and coordination within approved channels',
        'Inbound enquiry organization and follow-up tracking',
        'Pipeline dashboards and activity reporting',
      ],
      ctaLabel: 'Explore Get Customers',
      ctaHref: '/services/get-customers',
      pilotHref: '/pilot?service=get-customers',
      image: {
        src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
        alt: 'Commercial team discussing customer pipeline operations in a meeting room',
        caption:
          'Organized prospecting and pipeline workflows that support steady commercial follow-through.',
      },
    },
  ] satisfies CorporateServiceLine[],
} as const;

export const pilotOverviewContent = {
  eyebrow: 'Pilot',
  headline: 'Start with a specific need. Build from there.',
  body:
    'Tell us what needs attention. We will discuss the work, define a manageable scope and propose deliverables, timelines, fees and success criteria. A focused pilot lets us demonstrate how we work before you consider ongoing support.',
  ctaLabel: 'Explore a Pilot',
  ctaHref: '/pilot',
} as const;

export const finalCtaContent = {
  headline: 'Let’s get the important work done.',
  subheadline: 'Start by exploring a focused operational pilot.',
  body:
    'Whether you need a stronger digital presence, consistent content or better-organized customer acquisition, we can help you find a practical starting point.',
  primaryCtaLabel: 'Explore a Pilot',
  primaryCtaHref: '/pilot',
  secondaryCtaLabel: 'Contact Us',
  secondaryCtaHref: '/contact',
  pilotPreparationItems: [
    {
      label: 'Primary Service Area',
      detail:
        'Identify whether your priority starts with Get Online, Get Visible, or Get Customers.',
    },
    {
      label: 'The Work to Be Done',
      detail:
        'Outline the recurring tasks, backlog items, or operational bottlenecks you want addressed.',
    },
    {
      label: 'Current Context & Tools',
      detail:
        'Share how the work is currently handled and what systems your team already uses.',
    },
  ],
  phaseNotice:
    'Review our full scoping framework and prepare your consultation brief on the dedicated Explore a Pilot page.',
} as const;
