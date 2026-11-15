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
  detail: string;
  interplay: string;
}

export interface CorporateServiceLine {
  id: 'get-online' | 'get-visible' | 'get-customers';
  anchorId: string;
  title: string;
  lead: string;
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

export interface OperatingStage {
  stage: string;
  title: string;
  description: string;
  focusOutput: string;
}

export interface AudienceProfile {
  title: string;
  challenge: string;
  howWeHelp: string;
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
    summary: 'How we help businesses execute across digital presence, visibility, and pipeline operations',
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
    href: '/#academy',
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
    'Ops Foundry is a human-AI operational infrastructure partner. We combine managed teams, structured workflows, and AI-enabled tools so your business can move important operational work from backlog to completion.',
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
    'In many growing organizations, important commercial and operational work stalls—not because leadership lacks direction, but because day-to-day execution is fragmented across stretched staff, disconnected tools, and undocumented processes.',
  narrativeParagraphs: [
    'Buying another software subscription does not complete the work. Hiring ad-hoc freelancers often introduces coordination overhead without lasting operational consistency. And adopting AI tools without structured procedures or accountable human operators rarely produces dependable business output.',
    'Ops Foundry was built to close that execution gap. Rather than handing you another tool to manage or an abstract consulting deck, we act as a practical execution partner—bringing together trained operators, clear operating procedures, and purposeful tooling to get real business work done.',
  ],
  contrasts: [
    {
      challenge: 'Software alone does not execute work',
      resolution:
        'Tools require trained people and clear processes to turn features into finished deliverables.',
    },
    {
      challenge: 'Fragmented contractors create management drag',
      resolution:
        'Managed teams operate within shared standards, reducing daily coordination burden on your leadership.',
    },
    {
      challenge: 'Unstructured AI adoption creates uneven quality',
      resolution:
        'Human-in-the-loop review and documented workflows keep AI-assisted output accurate and aligned with your brand.',
    },
  ],
  editorialCallout:
    'Ops Foundry combines accountable people, repeatable processes, and practical technology into a single operational layer for your business.',
  image: {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Two colleagues reviewing operational documentation and workflow priorities at a desk',
    caption: 'Structured coordination turns recurring operational bottlenecks into manageable, repeatable work.',
  },
} as const;

export const operatingPillarsContent = {
  headline: 'Three Pillars Working as One Operating System',
  intro:
    'Execution breaks down when people, processes, and tools are treated as separate problems. Ops Foundry integrates all three so each pillar reinforces the others.',
  systemNote:
    'How the pillars connect: Structured workflows define how work should be done; AI-enabled tools accelerate drafting, organizing, and routing; and managed teams take ownership of review, judgment, and final delivery.',
  pillars: [
    {
      number: '01',
      title: 'Managed Teams',
      summary: 'Dedicated operational specialists accountable for getting the work across the finish line.',
      detail:
        'Technology still requires capable people who understand business context. Our managed teams handle day-to-day execution, coordinate inputs, apply quality checks, and maintain momentum across recurring operational tasks.',
      interplay: 'Operates the workflows and reviews all tool-assisted output before delivery.',
    },
    {
      number: '02',
      title: 'Structured Workflows',
      summary: 'Documented procedures that turn complex, ad-hoc tasks into repeatable operations.',
      detail:
        'Consistent output depends on clear process design. We break work down into documented standard operating procedures (SOPs), explicit handoffs, and quality checkpoints so execution does not rely on guesswork.',
      interplay: 'Provides the guardrails and standards that guide both human operators and AI tools.',
    },
    {
      number: '03',
      title: 'AI-Enabled Tools',
      summary: 'Practical automation and language-model workflows embedded inside the process.',
      detail:
        'We use modern AI and automation tools where they add genuine operational leverage—accelerating research, initial drafting, data structuring, and workflow routing—while keeping human operators in control of quality.',
      interplay: 'Reduces manual friction inside each workflow step so managed teams can focus on judgment and accuracy.',
    },
  ] satisfies OperatingPillar[],
} as const;

export const servicesContent = {
  headline: 'Three Ways We Help Businesses Execute',
  intro:
    'Our services focus on three practical areas where businesses frequently face execution bottlenecks: establishing a credible digital presence, maintaining consistent visibility, and running disciplined customer pipeline operations.',
  scopeNotice:
    'Specific deliverables and engagement scope are tailored during initial pilot scoping based on your operational priorities.',
  services: [
    {
      id: 'get-online',
      anchorId: 'service-get-online',
      title: 'Get Online',
      lead: 'Help businesses establish or improve their digital presence.',
      description:
        'Many businesses outgrow outdated websites or struggle to assemble a clear, reliable online presence. We help you plan, build, and maintain clean business websites, structured service pages, and foundational digital systems that accurately represent your company.',
      focusAreas: [
        'Business website implementation and structural improvements',
        'Clear service and company page organization for prospective buyers',
        'Foundational digital setup, content updates, and operational upkeep',
      ],
      ctaLabel: 'Explore Get Online',
      ctaHref: '/services/get-online',
      pilotHref: '/pilot?service=get-online',
      image: {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
        alt: 'Clean modern architectural office workspace representing structured digital foundations',
        caption: 'Dependable digital foundations built and maintained with structured operational discipline.',
      },
    },
    {
      id: 'get-visible',
      anchorId: 'service-get-visible',
      title: 'Get Visible',
      lead: 'Help businesses create consistent content and communications.',
      description:
        'Staying visible requires steady operational follow-through that busy internal teams often struggle to sustain. We help businesses establish structured content workflows, clear market communications, and search-friendly digital profiles so customers can discover and understand what you offer.',
      focusAreas: [
        'Editorial and communication workflows for consistent publishing',
        'Search discovery structure and clear business profile maintenance',
        'Repeatable content preparation, formatting, and distribution processes',
      ],
      ctaLabel: 'Explore Get Visible',
      ctaHref: '/services/get-visible',
      pilotHref: '/pilot?service=get-visible',
      image: {
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
        alt: 'Team reviewing editorial plans and communication materials at a worktable',
        caption: 'Repeatable content and communication workflows that keep your business visible without overwhelming your team.',
      },
    },
    {
      id: 'get-customers',
      anchorId: 'service-get-customers',
      title: 'Get Customers',
      lead: 'Help businesses improve prospecting and pipeline operations.',
      description:
        'Commercial momentum suffers when prospect research, inbound inquiries, and pipeline follow-ups are handled inconsistently. We help businesses organize prospecting workflows, structure lead intake and routing, and maintain clean pipeline hygiene so commercial opportunities are acted upon systematically.',
      focusAreas: [
        'Structured prospect research and account list preparation workflows',
        'Inbound inquiry organization, qualification steps, and routing procedures',
        'Pipeline hygiene, follow-up coordination, and operational tracking',
      ],
      ctaLabel: 'Explore Get Customers',
      ctaHref: '/services/get-customers',
      pilotHref: '/pilot?service=get-customers',
      image: {
        src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
        alt: 'Commercial team discussing customer pipeline operations in a meeting room',
        caption: 'Organized prospecting and pipeline workflows that support steady commercial follow-through.',
      },
    },
  ] satisfies CorporateServiceLine[],
} as const;

export const howWeWorkContent = {
  headline: 'How We Work: A Structured Four-Stage Operating Model',
  intro:
    'Rather than open-ended retainers with unclear expectations, we organize engagements around a structured operating process designed to clarify scope early and maintain visibility throughout execution.',
  approvalNotice:
    'Note: This four-stage operating model represents our indicative workflow framework and remains subject to final business approval and individual pilot scoping.',
  stages: [
    {
      stage: 'Stage 1',
      title: 'Intake & Scoping',
      description:
        'We review the work your business needs done, identify current operational bottlenecks, and agree on a focused pilot scope with clear responsibilities.',
      focusOutput: 'Agreed pilot scope & operational priorities',
    },
    {
      stage: 'Stage 2',
      title: 'Workflow Architecture',
      description:
        'Before execution begins at scale, we document the operating procedures, define review checkpoints, and configure the supporting AI-enabled tools.',
      focusOutput: 'Documented workflows & review checkpoints',
    },
    {
      stage: 'Stage 3',
      title: 'Pod Deployment',
      description:
        'A managed operational team executes the agreed work using the established workflows and tools, maintaining regular communication with your team.',
      focusOutput: 'Managed execution & progress updates',
    },
    {
      stage: 'Stage 4',
      title: 'Review & Handover',
      description:
        'Completed deliverables and workflow outputs are reviewed against the agreed scope, followed by structured handover or planning for ongoing operational support.',
      focusOutput: 'Reviewed deliverables & operational handover',
    },
  ] satisfies OperatingStage[],
} as const;

export const whoWeHelpContent = {
  headline: 'Who We Help',
  intro:
    'Ops Foundry is designed for organizations that have clear commercial priorities—across getting online, staying visible, or organizing customer pipeline work—but need structured operational capacity to execute consistently.',
  profiles: [
    {
      title: 'Growing Small & Medium Businesses',
      challenge:
        'Founders and lean teams often carry both strategic leadership and day-to-day digital, content, and sales administration on their own shoulders.',
      howWeHelp:
        'We provide structured operational support across web presence, communications, and lead handling without requiring you to build an internal operations department from scratch.',
    },
    {
      title: 'Established Businesses Modernizing Operations',
      challenge:
        'Organizations with established customer bases frequently face accumulating digital backlogs, inconsistent documentation, and uncertainty around practical AI adoption.',
      howWeHelp:
        'We help standardize recurring workflows and introduce AI-assisted processes with human oversight so operational modernization happens methodically.',
    },
    {
      title: 'Commercial & Operations Leaders',
      challenge:
        'Department leads often know what initiatives need to happen next, but internal bandwidth is consumed by routine coordination and repetitive preparation work.',
      howWeHelp:
        'We take on clearly scoped operational workstreams through managed pods so your internal team can stay focused on core commercial decisions.',
    },
  ] satisfies AudienceProfile[],
} as const;

export const academyBridgeContent = {
  headline: 'Ops Foundry Academy: The Learning & Talent Side of Our Ecosystem',
  lead:
    'Alongside our commercial operations work, Ops Foundry is building Ops Foundry Academy—our dedicated learning and talent-development environment.',
  body:
    'Ops Foundry Academy focuses on helping learners develop practical operational capabilities through workplace simulations, structured workflows, and responsible use of AI-enabled tools. Rather than passive theory, the Academy is designed around how real operational work is organized and reviewed.',
  ecosystemPoints: [
    {
      title: 'Practical Workplace Focus',
      description: 'Built around realistic operational workflows, documentation standards, and quality review.',
    },
    {
      title: 'Human-AI Operational Skills',
      description: 'Prepares talent to combine human judgment with modern productivity and AI-enabled tools.',
    },
    {
      title: 'Distinct Learning Experience',
      description: 'Operates as a dedicated educational property within the wider Ops Foundry ecosystem.',
    },
  ],
  ctaLabel: 'Explore Partner & Talent Collaboration',
  ctaHref: '/partners',
  image: {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    alt: 'Learners and mentors collaborating around laptops and notes in a bright workshop environment',
    caption: 'Ops Foundry Academy connects practical operational training with real-world workflow standards.',
  },
} as const;

export const insightsContent = {
  headline: 'Insights & Operational Notes',
  lead:
    'As Ops Foundry grows, this space will house practical field notes, workflow design guides, and candid perspectives on combining human teams with AI-enabled tools in everyday business operations.',
  themes: [
    {
      title: 'Workflow Design & SOPs',
      description: 'How to structure repeatable business processes before introducing automation.',
    },
    {
      title: 'Human-in-the-Loop Execution',
      description: 'Where AI tools genuinely save time—and where human judgment remains essential.',
    },
    {
      title: 'Practical Commercial Operations',
      description: 'Lessons on maintaining digital presence, content cadence, and pipeline hygiene.',
    },
  ],
  statusNote:
    'Editorial publications are being prepared for upcoming release. We do not publish placeholder or fabricated articles.',
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
      detail: 'Identify whether your priority starts with Get Online, Get Visible, or Get Customers.',
    },
    {
      label: 'The Work to Be Done',
      detail: 'Outline the recurring tasks, backlog items, or operational bottlenecks you want addressed.',
    },
    {
      label: 'Current Context & Tools',
      detail: 'Share how the work is currently handled and what systems your team already uses.',
    },
  ],
  phaseNotice:
    'Review our full 10-point pilot scoping framework and prepare your consultation brief on the dedicated Explore a Pilot page.',
} as const;
