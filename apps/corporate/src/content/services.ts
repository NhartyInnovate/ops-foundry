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
    summary: string;
    suitableWhen: string;
    disclaimer: string;
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
    title: 'Structured Operational Services for Growing Businesses',
    lead:
      'Ops Foundry helps businesses strengthen their digital presence, improve visibility and organize customer pipeline operations through three practical service lines.',
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
      description: 'Build and maintain a professional digital presence.',
      href: '/services/get-online',
    },
    {
      slug: 'get-visible' as ServiceSlug,
      title: 'Get Visible',
      description:
        'Build consistent content and communication workflows that help your business stay visible.',
      href: '/services/get-visible',
    },
    {
      slug: 'get-customers' as ServiceSlug,
      title: 'Get Customers',
      description:
        'Organize prospecting, incoming enquiries and customer pipeline operations.',
      href: '/services/get-customers',
    },
  ],
  serviceBlocks: [
    {
      slug: 'get-online' as ServiceSlug,
      title: 'Get Online',
      description: 'Build and maintain a professional digital presence.',
      image: {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80',
        alt: 'Modern architectural office workspace representing structured digital presence foundations',
      },
      focusAreas: [
        'Website structure and implementation',
        'Service and company page organization',
        'Routine digital upkeep and content updates',
      ],
      href: '/services/get-online',
    },
    {
      slug: 'get-visible' as ServiceSlug,
      title: 'Get Visible',
      description:
        'Build consistent content and communication workflows that help your business stay visible.',
      image: {
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80',
        alt: 'Team reviewing editorial schedules and communication materials at a workspace table',
      },
      focusAreas: [
        'Editorial calendar and content workflows',
        'Search and discovery page structure',
        'Business profile and directory consistency',
      ],
      href: '/services/get-visible',
    },
    {
      slug: 'get-customers' as ServiceSlug,
      title: 'Get Customers',
      description:
        'Organize prospecting, incoming enquiries and customer pipeline operations.',
      image: {
        src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=80',
        alt: 'Commercial operations team reviewing customer pipeline workflows in a meeting room',
      },
      focusAreas: [
        'Prospect research and account brief preparation',
        'Inbound inquiry intake and qualification routing',
        'Pipeline hygiene and follow-up tracking',
      ],
      href: '/services/get-customers',
    },
  ],
  finalCta: {
    heading: 'Not sure which service line fits your immediate bottleneck?',
    body:
      'Start by exploring a pilot. We review the work your business needs done, help identify the most practical starting scope, and outline clear deliverables and boundaries before any engagement begins.',
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
    lead: 'Build a credible digital presence that clearly represents your business and supports its growth.',
    heroSummary:
      'We help businesses plan, structure, build, and maintain dependable websites and digital presence systems—combining disciplined workflows and modern tooling so your online presence remains accurate, functional, and up to date.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80',
      alt: 'Modern architectural office workspace representing structured digital presence foundations',
      caption: 'A clear, maintainable digital presence built around how your business actually operates.',
    },
    problemHeading: 'The Business Problem',
    problemSummary:
      'For many growing businesses, establishing or updating a website becomes a stalled internal project. Without dedicated operational support, websites fall out of date, services are poorly explained, contact routes are unmonitored, and routine updates are neglected—creating friction whenever prospective customers, partners, or applicants look up your company.',
    howWeHelpHeading: 'How Ops Foundry Helps',
    howWeHelp:
      'Ops Foundry helps your business plan, structure, build, and maintain a clear, dependable digital presence. We organize your core service and company pages, structure digital content for readability, connect functional inquiry pathways, and provide scheduled operational upkeep so your website stays accurate as your priorities evolve.',
    activitiesHeading: 'Representative Activities & Deliverables',
    activitiesDisclaimer:
      'Note: The activities below illustrate the types of work supported under Get Online. Every engagement is scoped individually—specific deliverables and boundaries are agreed during pilot scoping.',
    typicalActivities: [
      {
        category: 'Website Structure & Implementation',
        items: [
          'Structuring and building core business pages (Home, Services, About, Contact/Inquiry)',
          'Improving existing website layouts for mobile, tablet, and desktop readability',
          'Organizing service and product descriptions so prospective buyers understand what you offer',
        ],
      },
      {
        category: 'Content & Asset Organization',
        items: [
          'Turning internal business documents or notes into structured, editorial page copy',
          'Formatting imagery, team profiles, and reference documents for web presentation',
          'Establishing a clear structure for future page updates and additions',
        ],
      },
      {
        category: 'Foundational Digital Setup & Handover',
        items: [
          'Connecting contact or inquiry forms to designated business routing channels',
          'Basic technical hygiene checks (broken links, page titles, metadata, and mobile rendering)',
          'Documenting how the site is organized for smooth handover or ongoing maintenance',
        ],
      },
    ],
    potentialEngagement: {
      title: 'Foundational Presence Pilot',
      summary:
        'A focused engagement to launch or overhaul core business pages with clear messaging, responsive layouts, and functional inquiry routing.',
      suitableWhen:
        'Suitable when your business lacks a credible website, needs an outdated site replaced cleanly, or needs existing service pages reorganized.',
      disclaimer:
        'Exact scope, deliverables, and timelines are determined during individual pilot assessment.',
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
    ctaHeading: 'Ready to establish or improve your digital presence?',
    ctaBody:
      'Explore a pilot with Ops Foundry. We will review your current online presence, discuss what needs to be built or improved, and outline a proposed pilot scope.',
    ctaButtonLabel: 'Explore a Get Online Pilot',
    ctaHref: '/pilot?service=get-online',
  },

  'get-visible': {
    slug: 'get-visible',
    title: 'Get Visible',
    lead: 'Build consistent content and communication workflows that help the right audience discover and understand your business.',
    heroSummary:
      'We help businesses establish structured editorial and communication processes—turning scattered expertise into clear service explainers, organized search metadata, and consistent company profiles so your business stays visible.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80',
      alt: 'Team reviewing editorial schedules and communication materials at a workspace table',
      caption: 'Structured editorial and discovery workflows that keep your business visible consistently.',
    },
    problemHeading: 'The Business Problem',
    problemSummary:
      'Many capable businesses remain hard to find or appear inactive online because communications depend entirely on busy leaders finding spare time. When operational demands spike, content and publishing are the first activities to stop. Updates become sporadic, directory profiles fall out of date, and prospective customers searching for your services encounter incomplete or outdated information.',
    howWeHelpHeading: 'How Ops Foundry Helps',
    howWeHelp:
      'Ops Foundry provides disciplined operational support for content preparation, business profile consistency, and search discoverability. We manage editorial schedules, organize page and directory metadata, and run documented drafting and review workflows—helping your business stay consistently visible without overburdening your leadership team.',
    activitiesHeading: 'Representative Activities & Deliverables',
    activitiesDisclaimer:
      'Note: Ops Foundry focuses on disciplined operational execution and does not promise search rankings, guaranteed traffic, or commercial visibility. Deliverables are scoped individually per engagement.',
    typicalActivities: [
      {
        category: 'Content & Communication Workflows',
        items: [
          'Structuring a practical editorial calendar aligned with your core services and audience questions',
          'Drafting and formatting service explainers, operational case notes, or company updates from approved notes',
          'Repurposing approved long-form material into structured updates for company channels or newsletters',
        ],
      },
      {
        category: 'Search & Discovery Structure',
        items: [
          'Reviewing and organizing page titles, meta descriptions, and heading hierarchies across key website pages',
          'Structuring FAQ or resource pages around real questions prospective buyers ask',
          'Ensuring internal linking across service and informational pages is logical and complete',
        ],
      },
      {
        category: 'Business Profile & Directory Consistency',
        items: [
          'Auditing and standardizing core business information across relevant public profiles and directories',
          'Preparing structured service summaries and visual assets for external company listings',
          'Maintaining an operational log of published updates and profile changes',
        ],
      },
    ],
    potentialEngagement: {
      title: 'Visibility & Messaging Foundation Pilot',
      summary:
        'A focused engagement to clean up search metadata, standardize external business profiles, and produce an initial set of foundational service explainers.',
      suitableWhen:
        'Suitable when your website exists but your public profiles, directory listings, and foundational communications are sparse or inconsistent.',
      disclaimer:
        'Scope and deliverables are agreed upon during pilot scoping based on your business priorities.',
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
    ctaHeading: 'Ready to bring consistency to your content and visibility?',
    ctaBody:
      'Explore a pilot with Ops Foundry. We will discuss your current communication bottlenecks and outline a practical scope for getting your business visible.',
    ctaButtonLabel: 'Explore a Get Visible Pilot',
    ctaHref: '/pilot?service=get-visible',
  },

  'get-customers': {
    slug: 'get-customers',
    title: 'Get Customers',
    lead: 'Build more organized prospecting, enquiry management and customer pipeline operations.',
    heroSummary:
      'We help businesses bring operational structure to prospect research, inbound inquiry handling, lead qualification, and pipeline follow-up—so commercial opportunities are organized and acted upon consistently.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=80',
      alt: 'Commercial operations team reviewing customer pipeline workflows in a meeting room',
      caption: 'Disciplined prospecting and pipeline operations that support your commercial team.',
    },
    problemHeading: 'The Business Problem',
    problemSummary:
      'In many growing businesses, commercial pipeline operations suffer from operational fragmentation. Prospect lists sit half-researched in spreadsheets, inbound inquiries wait in shared inboxes without clear ownership, and follow-ups are delayed when delivery work peaks. Without disciplined administrative execution behind the scenes, commercial momentum stalls.',
    howWeHelpHeading: 'How Ops Foundry Helps',
    howWeHelp:
      'Ops Foundry helps your business build and run structured prospecting and pipeline support workflows. We prepare and verify targeted account research, organize inbound inquiry qualification and routing, and coordinate systematic follow-up tracking—ensuring your commercial leaders have clean data and disciplined operational execution behind them.',
    activitiesHeading: 'Representative Activities & Deliverables',
    activitiesDisclaimer:
      'Note: Ops Foundry focuses on disciplined administrative execution. We do not claim or promise guaranteed leads, sales, conversions, or revenue. All deliverables are scoped individually per engagement.',
    typicalActivities: [
      {
        category: 'Prospect Research & List Operations',
        items: [
          'Building and verifying targeted prospect or partner lists based on your defined ideal customer criteria',
          'Preparing concise account research briefs before your commercial team conducts outreach or meetings',
          'Cleaning, deduplicating, and standardizing existing contact or account spreadsheets',
        ],
      },
      {
        category: 'Inbound Inquiry Intake & Routing',
        items: [
          'Structuring inbound consultation or project inquiry forms to capture clear qualification context',
          'Organizing triage workflows so incoming inquiries are logged, summarized, and routed to the right owner',
          'Preparing standardized response templates and intake acknowledgment workflows',
        ],
      },
      {
        category: 'Pipeline Hygiene & Follow-Up Coordination',
        items: [
          'Updating CRM or pipeline tracker records after commercial interactions so leadership has an accurate view',
          'Tracking pending follow-ups and preparing scheduled check-in drafts for your team to review and send',
          'Producing structured weekly pipeline activity and status summaries',
        ],
      },
    ],
    potentialEngagement: {
      title: 'Inbound Intake & Triage Pilot',
      summary:
        'A focused pilot to structure how incoming customer inquiries are captured, qualified, logged, and routed to your team with clear follow-up procedures.',
      suitableWhen:
        'Suitable when inquiries currently arrive through unstructured emails or forms without a consistent intake and routing workflow.',
      disclaimer:
        'Scope and deliverables are agreed upon during pilot scoping based on your qualification criteria.',
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
    ctaHeading: 'Ready to bring structure to your prospecting and pipeline operations?',
    ctaBody:
      'Explore a pilot with Ops Foundry. We will review your pipeline bottlenecks, discuss your intake and tracking requirements, and define a practical pilot scope.',
    ctaButtonLabel: 'Explore a Get Customers Pilot',
    ctaHref: '/pilot?service=get-customers',
  },
};

export const allServiceSlugs: ServiceSlug[] = [
  'get-online',
  'get-visible',
  'get-customers',
];
