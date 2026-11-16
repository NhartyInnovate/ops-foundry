import { getAcademySiteUrl } from './site-config';

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

export const corporateNavigation = {
  brandName: 'Ops Foundry',
  primaryLinks: [
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'About', href: '/about' },
    { label: 'For Partners', href: '/partners' },
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
      summary: 'Establish or improve your digital presence and web foundations',
      href: '/services/get-online',
    },
    {
      id: 'get-visible',
      title: 'Get Visible',
      summary: 'Create consistent content, communications, and search discoverability',
      href: '/services/get-visible',
    },
    {
      id: 'get-customers',
      title: 'Get Customers',
      summary: 'Improve prospecting, lead handling, and pipeline operations',
      href: '/services/get-customers',
    },
  ] satisfies NavServiceItem[],
  academyBridge: {
    label: 'Ops Foundry Academy',
    href: getAcademySiteUrl(),
  },
  primaryCta: {
    label: 'Explore a Pilot',
    href: '/pilot',
  },
} as const;

export const heroContent = {
  headlinePrimary: 'Your business has work to do.',
  headlineAccent: 'We help you get it done.',
  supportingCopy:
    'Ops Foundry is a human-AI operational infrastructure partner. We combine managed teams, structured workflows, and AI-enabled tools so businesses can move important operational work from backlog to completion.',
  primaryCta: {
    label: 'Explore a Pilot',
    href: '/pilot',
  },
  secondaryCta: {
    label: 'See How We Work',
    href: '/how-we-work',
  },
  highlights: [
    {
      title: 'Managed Teams',
      description: 'Accountable operators coordinating day-to-day execution',
    },
    {
      title: 'Structured Workflows',
      description: 'Documented procedures and clear review checkpoints',
    },
    {
      title: 'AI-Enabled Tools',
      description: 'Practical tooling integrated under human oversight',
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

export const whyOpsFoundryContent = {
  headline: "Most businesses don't lack ideas. They lack execution capacity.",
  lead:
    'Growing businesses often struggle to turn plans into consistent execution. Fragmented teams, disconnected tools and undocumented processes create operational bottlenecks.',
  contrasts: [
    {
      challenge: "Software alone doesn't execute work.",
      resolution:
        'Trained people and clear processes turn tools into completed work.',
    },
    {
      challenge: 'Fragmented teams slow execution.',
      resolution:
        'Managed operators bring coordination and accountability.',
    },
    {
      challenge: 'Unstructured AI creates inconsistent output.',
      resolution:
        'Human oversight and documented workflows improve reliability.',
    },
  ],
  editorialCallout:
    'Ops Foundry brings people, processes and practical technology together to help businesses execute consistently.',
  image: {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Two colleagues reviewing operational documentation and workflow priorities at a desk',
    caption:
      'Structured coordination turns recurring operational bottlenecks into manageable, repeatable work.',
  },
} as const;

export const operatingPillarsContent = {
  headline: 'Three Pillars Working as One Operating System',
  pillars: [
    {
      number: '01',
      title: 'Managed Teams',
      summary: 'Skilled people accountable for getting work done.',
    },
    {
      number: '02',
      title: 'Structured Workflows',
      summary: 'Clear processes that make execution consistent.',
    },
    {
      number: '03',
      title: 'AI-Enabled Tools',
      summary: 'Practical technology that improves operational efficiency.',
    },
  ] satisfies OperatingPillar[],
} as const;

export const servicesContent = {
  headline: 'Three Ways We Help Businesses Execute',
  intro:
    'We help businesses strengthen their digital presence, improve visibility and build more consistent customer pipelines.',
  scopeNotice:
    'Specific deliverables and engagement scope are tailored during initial pilot scoping based on your operational priorities.',
  services: [
    {
      id: 'get-online',
      anchorId: 'service-get-online',
      title: 'Get Online',
      description: 'Build and maintain a professional digital presence.',
      focusAreas: [
        'Business website development.',
        'Clear service and company pages.',
        'Website updates and maintenance.',
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
        'Help the right audience discover and understand your business.',
      focusAreas: [
        'Consistent content and communication workflows.',
        'Search-friendly page and profile structure.',
        'Repeatable publishing and distribution processes.',
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
        'Create more structured customer acquisition and follow-up processes.',
      focusAreas: [
        'Structured prospect research and list preparation.',
        'Inbound inquiry organization and routing.',
        'Consistent pipeline tracking and follow-up coordination.',
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

export const finalCtaContent = {
  headline: 'Ready to get important work done?',
  subheadline: 'Start by exploring a focused operational pilot.',
  body:
    'Whether your immediate priority is establishing a stronger digital presence (Get Online), building consistent content and communications (Get Visible), or organizing prospecting and pipeline workflows (Get Customers), a pilot allows us to scope a practical starting point together.',
  primaryCtaLabel: 'Explore a Pilot',
  primaryCtaHref: '/pilot',
  secondaryCtaLabel: 'Review Our Services',
  secondaryCtaHref: '/services',
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
    'Review our full 10-point pilot scoping framework and prepare your consultation brief on the dedicated Explore a Pilot page.',
} as const;
