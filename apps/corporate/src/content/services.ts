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
  problemContext: string[];
  whatWeHelpAccomplish: string;
  serviceInvolvesHeading: string;
  serviceInvolvesIntro: string;
  servicePillars: {
    title: string;
    description: string;
  }[];
  activitiesHeading: string;
  activitiesDisclaimer: string;
  typicalActivities: {
    category: string;
    items: string[];
  }[];
  scopingHeading: string;
  scopingIntro: string;
  scopingModels: {
    title: string;
    summary: string;
    suitableWhen: string;
  }[];
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
    lead: 'Your business has work to do. We help you get it done across three practical operational areas: getting online, staying visible, and running disciplined customer pipeline operations.',
    supporting:
      'Rather than acting as a traditional agency or handing you software to manage on your own, Ops Foundry combines managed teams, documented workflows, and AI-enabled tools to execute scoped operational work.',
    primaryCta: {
      label: 'Explore a Pilot',
      href: '/pilot',
    },
    secondaryCta: {
      label: 'See How We Work',
      href: '/how-we-work',
    },
  },
  howServicesWorkTogether: {
    heading: 'Three Connected Areas of Business Execution',
    intro:
      'Businesses rarely face a single isolated bottleneck. A company may need a credible digital presence first, then a sustainable way to publish communications, and finally a structured process to handle incoming prospect inquiries. You can engage Ops Foundry for a focused pilot in one service line or combine them as your operational needs evolve.',
    governanceNote:
      'Every engagement is scoped individually. Examples of activities across our service pages illustrate the types of work we can support—actual deliverables, responsibilities, and boundaries are agreed during pilot scoping.',
  },
  comparisonRows: [
    {
      slug: 'get-online' as ServiceSlug,
      title: 'Get Online',
      focus: 'Digital Presence & Web Foundations',
      whenToChoose:
        'When your website is outdated, incomplete, or difficult to update, or when your business needs a reliable digital presence built and maintained properly.',
      href: '/services/get-online',
    },
    {
      slug: 'get-visible' as ServiceSlug,
      title: 'Get Visible',
      focus: 'Content, Communications & Discoverability',
      whenToChoose:
        'When your team knows it needs to communicate consistently and improve search/local discoverability, but day-to-day operational work keeps pushing publishing aside.',
      href: '/services/get-visible',
    },
    {
      slug: 'get-customers' as ServiceSlug,
      title: 'Get Customers',
      focus: 'Prospecting & Pipeline Operations',
      whenToChoose:
        'When prospect research, inbound lead capture, inquiry routing, and follow-up tracking are handled inconsistently across spreadsheets or inboxes.',
      href: '/services/get-customers',
    },
  ],
  finalCta: {
    heading: 'Not sure which service line fits your immediate bottleneck?',
    body: 'Start by exploring a pilot. We review the work your business needs done, help identify the most practical starting scope, and outline clear deliverables and boundaries before any engagement begins.',
    primaryLabel: 'Explore a Pilot',
    primaryHref: '/pilot',
    secondaryLabel: 'Review Our Operating Model',
    secondaryHref: '/how-we-work',
  },
} as const;

export const serviceDetailsBySlug: Record<ServiceSlug, ServiceDetailContent> = {
  'get-online': {
    slug: 'get-online',
    title: 'Get Online',
    lead: 'Help businesses establish or improve their digital presence.',
    heroSummary:
      'We help businesses plan, structure, build, and maintain dependable websites and foundational digital systems—combining managed operators, structured content workflows, and modern tooling so your online presence stays accurate and functional.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80',
      alt: 'Modern architectural office workspace representing structured digital presence foundations',
      caption: 'A clear, maintainable digital presence built around how your business actually operates.',
    },
    problemHeading: 'The Business Problem Get Online Addresses',
    problemContext: [
      'For many businesses, establishing or updating a website becomes a stalled internal project. DIY builders often result in half-finished pages because nobody on the team has time to structure the copy, format assets, and maintain the site. Conversely, traditional web projects can leave businesses with a static site and no operational support once changes are needed.',
      'An outdated or unclear online presence creates friction every time a prospective customer, partner, or applicant looks up your business. Services are poorly explained, contact routes are broken or unmonitored, and routine updates take weeks.',
    ],
    whatWeHelpAccomplish:
      'Ops Foundry helps your business put a clean, credible, and maintainable digital presence in place—and provides the operational workflow to keep it current as your services and priorities evolve.',
    serviceInvolvesHeading: 'How Our Operating Pillars Apply to Get Online',
    serviceInvolvesIntro:
      'Rather than treating a website as a one-off design artifact, we treat your digital presence as an operational workstream supported by people, processes, and tools:',
    servicePillars: [
      {
        title: 'Managed Teams',
        description:
          'Operators coordinate content gathering, page assembly, quality checks, and ongoing site updates so your internal team is not stuck managing technical chores.',
      },
      {
        title: 'Structured Workflows',
        description:
          'Documented checklists for page structure, metadata, responsiveness, link integrity, and content review keep implementation methodical.',
      },
      {
        title: 'AI-Enabled Tools',
        description:
          'AI-assisted drafting and content structuring tools help organize raw business notes into clear service descriptions, always reviewed and refined by human operators.',
      },
    ],
    activitiesHeading: 'Examples of Relevant Activities & Deliverables',
    activitiesDisclaimer:
      'Note: The items below are representative examples of work supported under Get Online. Every engagement is scoped individually—inclusion of specific activities depends on your agreed pilot or project scope.',
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
          'Turning internal business documents or rough notes into structured, editorial page copy',
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
    scopingHeading: 'What a Potential Engagement Could Look Like',
    scopingIntro:
      'Get Online engagements are structured around your current starting point and the specific outcome you need achieved:',
    scopingModels: [
      {
        title: 'Foundational Presence Pilot',
        summary:
          'A focused engagement to launch or overhaul a core set of business pages with clear messaging, responsive layouts, and functional inquiry routing.',
        suitableWhen:
          'Best when your business lacks a credible website or needs an outdated site replaced cleanly.',
      },
      {
        title: 'Service Architecture & Content Restructure',
        summary:
          'A scoped project to reorganize and rewrite key service or programme pages on an existing site so your commercial offering is clearly communicated.',
        suitableWhen:
          'Best when your business has evolved but your current site no longer reflects what you actually do.',
      },
      {
        title: 'Ongoing Digital Upkeep Workflow',
        summary:
          'A recurring operational cadence where a managed pod handles scheduled content updates, new page assembly, and routine site maintenance.',
        suitableWhen:
          'Best when your internal team wants ongoing execution support after the initial site is live.',
      },
    ],
    dependenciesHeading: 'Client Responsibilities & Dependencies',
    dependenciesIntro:
      'To execute a Get Online engagement effectively, we rely on clear inputs and timely collaboration from your team:',
    clientDependencies: [
      'A designated point of contact authorized to review drafts and approve page content',
      'Accurate factual information about your business, services, and commercial positioning',
      'Existing brand assets (such as logos or approved photography) where available',
      'Appropriate administrative access or coordination with your domain/hosting administrator when deployment is part of the agreed scope',
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
    lead: 'Help businesses create consistent content and communications.',
    heroSummary:
      'We help businesses turn scattered expertise and irregular updates into structured content workflows, clear communications, and organized search/digital profiles so prospective customers can find and understand your work.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80',
      alt: 'Team reviewing editorial schedules and communication materials at a workspace table',
      caption: 'Structured editorial and discovery workflows that keep your business visible consistently.',
    },
    problemHeading: 'The Business Problem Get Visible Addresses',
    problemContext: [
      'Many capable businesses remain hard to find or appear inactive online because communication depends entirely on a founder or busy manager finding spare time to write updates, maintain business profiles, or organize search metadata.',
      'When operational demands spike, content and communications are the first activities to stop. Publishing becomes sporadic, business directory profiles fall out of date, and prospective customers searching for your services encounter incomplete or inconsistent information.',
    ],
    whatWeHelpAccomplish:
      'Ops Foundry helps your business establish a sustainable, structured rhythm for content preparation, external communications, and digital discoverability—without requiring your leadership team to manage every step manually.',
    serviceInvolvesHeading: 'How Our Operating Pillars Apply to Get Visible',
    serviceInvolvesIntro:
      'Consistent visibility comes from disciplined workflow management rather than sporadic bursts of effort:',
    servicePillars: [
      {
        title: 'Managed Teams',
        description:
          'Operators manage the editorial calendar, prepare drafts from approved business inputs, format assets, and coordinate publishing schedules.',
      },
      {
        title: 'Structured Workflows',
        description:
          'Clear processes for topic intake, source verification, brand-voice review, approval sign-off, and multi-channel formatting prevent bottlenecks and unapproved claims.',
      },
      {
        title: 'AI-Enabled Tools',
        description:
          'Language-model workflows assist with initial outlining, repurposing approved source material across formats, and metadata structuring under strict human editing.',
      },
    ],
    activitiesHeading: 'Examples of Relevant Activities & Deliverables',
    activitiesDisclaimer:
      'Note: The items below are representative examples of work supported under Get Visible. Every engagement is scoped individually—inclusion of specific activities depends on your agreed pilot or project scope.',
    typicalActivities: [
      {
        category: 'Content & Communication Workflows',
        items: [
          'Structuring a practical editorial calendar aligned with your core services and audience questions',
          'Drafting and formatting service explainers, operational case notes, or company updates from interviews or raw notes',
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
    scopingHeading: 'What a Potential Engagement Could Look Like',
    scopingIntro:
      'Get Visible engagements can be scoped as an initial foundation pilot or a recurring editorial operations workflow:',
    scopingModels: [
      {
        title: 'Visibility & Messaging Foundation Pilot',
        summary:
          'A focused engagement to clean up search metadata, standardize external business profiles, and produce an initial set of foundational service explainers.',
        suitableWhen:
          'Best when your website exists but your public profiles and foundational communications are sparse or inconsistent.',
      },
      {
        title: 'Structured Content Production Pilot',
        summary:
          'A scoped workflow pilot where our team takes raw subject-matter inputs from your team and produces a defined batch of reviewed articles, guides, or updates.',
        suitableWhen:
          'Best when your team has valuable operational knowledge to share but lacks the bandwidth to write, edit, and format it.',
      },
      {
        title: 'Recurring Communications Cadence',
        summary:
          'An ongoing operational workflow supporting regular content preparation, review coordination, and publishing maintenance.',
        suitableWhen:
          'Best after an initial pilot has established your preferred tone, review process, and publishing standards.',
      },
    ],
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
    lead: 'Help businesses improve prospecting and pipeline operations.',
    heroSummary:
      'We help businesses bring structure and operational discipline to prospect research, inbound inquiry handling, lead routing, and pipeline follow-up—so commercial opportunities are organized and acted upon consistently.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=80',
      alt: 'Commercial operations team reviewing customer pipeline workflows in a meeting room',
      caption: 'Disciplined prospecting and pipeline operations that support your commercial team.',
    },
    problemHeading: 'The Business Problem Get Customers Addresses',
    problemContext: [
      'In many growing businesses, commercial pipeline operations happen in fits and starts. Prospect lists sit half-researched in spreadsheets, inbound inquiries wait in shared email inboxes without clear ownership, and follow-ups are forgotten when delivery work gets busy.',
      'Even when a business invests in a CRM or outreach tool, the software does not clean the data, research the accounts, triage the incoming briefs, or maintain pipeline hygiene. Without operational execution behind the scenes, commercial momentum stalls.',
    ],
    whatWeHelpAccomplish:
      'Ops Foundry helps your business build and run structured prospecting and pipeline support workflows—giving your commercial leaders clean account preparation, organized inquiry intake, and dependable follow-up coordination.',
    serviceInvolvesHeading: 'How Our Operating Pillars Apply to Get Customers',
    serviceInvolvesIntro:
      'We focus on the operational preparation, routing, and hygiene that make commercial outreach and customer intake reliable:',
    servicePillars: [
      {
        title: 'Managed Teams',
        description:
          'Operators execute account research, verify prospect records, organize inbound inquiries, and maintain CRM/pipeline stages according to your qualification criteria.',
      },
      {
        title: 'Structured Workflows',
        description:
          'Documented procedures for lead qualification, data formatting, response preparation, and follow-up scheduling ensure opportunities do not slip through the cracks.',
      },
      {
        title: 'AI-Enabled Tools',
        description:
          'AI-assisted research and summarization workflows help prepare concise account briefs and organize inquiry details before human operators verify and route them.',
      },
    ],
    activitiesHeading: 'Examples of Relevant Activities & Deliverables',
    activitiesDisclaimer:
      'Note: The items below are representative examples of work supported under Get Customers. Every engagement is scoped individually—inclusion of specific activities depends on your agreed pilot or project scope.',
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
    scopingHeading: 'What a Potential Engagement Could Look Like',
    scopingIntro:
      'Get Customers engagements are scoped around the specific stage of your commercial pipeline that needs operational support:',
    scopingModels: [
      {
        title: 'Inbound Intake & Triage Pilot',
        summary:
          'A focused pilot to structure how incoming customer inquiries are captured, qualified, logged, and routed to your team with clear follow-up procedures.',
        suitableWhen:
          'Best when inquiries currently arrive through unstructured emails or forms without a consistent intake workflow.',
      },
      {
        title: 'Prospect Research & Account Preparation Pilot',
        summary:
          'A scoped workflow where a managed pod researches, verifies, and prepares a defined set of target accounts and outreach briefs based on your criteria.',
        suitableWhen:
          'Best when your sales or leadership team knows who they want to reach but lacks the time to research and prepare accounts.',
      },
      {
        title: 'Ongoing Pipeline Operations Support',
        summary:
          'A recurring operational cadence supporting continuous list preparation, CRM hygiene, follow-up tracking, and weekly pipeline reporting.',
        suitableWhen:
          'Best when your commercial team wants dedicated operational support to keep pipeline administration organized.',
      },
    ],
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
      'Explore a pilot with Ops Foundry. Note that we focus on disciplined operational execution and do not promise guaranteed revenue, customers, or conversion rates. We will review your pipeline bottlenecks and define a practical pilot scope.',
    ctaButtonLabel: 'Explore a Get Customers Pilot',
    ctaHref: '/pilot?service=get-customers',
  },
};

export const allServiceSlugs: ServiceSlug[] = [
  'get-online',
  'get-visible',
  'get-customers',
];
