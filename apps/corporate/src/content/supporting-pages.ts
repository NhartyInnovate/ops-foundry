export const howWeWorkPageContent = {
  hero: {
    title: 'How We Work',
    lead: 'Practical operational execution depends on how people, workflows, and tools are organized together.',
    supporting:
      'Ops Foundry combines managed teams, documented workflows, and AI-enabled tools so business priorities can move from discussion to finished work without adding daily management burden to your leadership team.',
    image: {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80',
      alt: 'Operations team coordinating workflow stages and reviewing project deliverables around a table',
      caption: 'Execution structured around clear scope, documented procedures, and human accountability.',
    },
  },
  pillarsIntegration: {
    heading: 'Combining Managed Teams, Structured Workflows, and AI-Enabled Tools',
    intro:
      'Effective execution requires people, processes and technology working together. Each supports a different part of the work.',
    items: [
      {
        title: 'Managed Teams',
        body: 'People accountable for coordinating and completing assigned work.',
      },
      {
        title: 'Structured Workflows',
        body: 'Clear processes, responsibilities and quality checks that keep work consistent.',
      },
      {
        title: 'AI-Enabled Tools',
        body: 'Practical tools that support research, organization and everyday execution.',
      },
    ],
  },
  operatingModel: {
    heading: 'Proposed Four-Stage Operating Model',
    intro:
      "We organize engagements around four stages, adapting the process to each client's needs, scope and priorities.",
    disclaimer:
      'This is an indicative framework. Each engagement is scoped according to its specific requirements.',
    stages: [
      {
        number: 'Stage 1',
        title: 'Intake & Scoping',
        description:
          'Understand the business need, identify the priority and agree on the scope of work.',
        typicalOutputs: [
          'Agreed scope and priorities.',
          'Defined responsibilities and dependencies.',
          'Initial execution plan.',
        ],
      },
      {
        number: 'Stage 2',
        title: 'Workflow Architecture',
        description:
          'Define how the work will be completed, reviewed and supported by the right tools.',
        typicalOutputs: [
          'Documented workflows.',
          'Assigned responsibilities and checkpoints.',
          'Supporting tools and templates.',
        ],
      },
      {
        number: 'Stage 3',
        title: 'Pod Deployment',
        description:
          'Deploy the agreed team and workflows to carry out the work.',
        typicalOutputs: [
          'Execution of agreed activities.',
          'Ongoing quality checks.',
          'Progress updates.',
        ],
      },
      {
        number: 'Stage 4',
        title: 'Review & Handover',
        description:
          'Review completed work, confirm deliverables and agree on the next steps.',
        typicalOutputs: [
          'Reviewed deliverables.',
          'Relevant documentation and updates.',
          'Handover or continuation plan.',
        ],
      },
    ],
  },
  governanceAgreements: {
    heading: 'How Engagements Are Governed',
    intro:
      'Before work begins, Ops Foundry and the client agree on expectations, responsibilities and how progress will be reviewed.',
    pilotNotice: {
      heading: 'Starting with a Scoped Pilot',
      body: 'Every engagement begins with a review of the business need and a clearly defined scope.',
      linkLabel: 'Review Pilot Governance',
      linkHref: '/pilot',
    },
    agreements: [
      {
        topic: 'Scope',
        explanation: 'Define the work to be completed and the boundaries of the engagement.',
      },
      {
        topic: 'Deliverables',
        explanation: 'Agree on the expected outputs and what completion looks like.',
      },
      {
        topic: 'Responsibilities & Dependencies',
        explanation:
          'Clarify what the client provides and what Ops Foundry is responsible for.',
      },
      {
        topic: 'Quality Checks',
        explanation: 'Review work against agreed requirements before delivery.',
      },
      {
        topic: 'Reporting & Communication',
        explanation: 'Share progress, updates, questions and dependencies clearly.',
      },
    ],
  },
  cta: {
    heading: 'See how this approach applies to your business.',
    body: 'Explore a scoped pilot with Ops Foundry to address a practical operational priority across Get Online, Get Visible, or Get Customers.',
    primaryLabel: 'Explore a Pilot',
    primaryHref: '/pilot',
    secondaryLabel: 'Explore Our Services',
    secondaryHref: '/services',
  },
} as const;

export const aboutPageContent = {
  hero: {
    title: 'About Ops Foundry',
    lead: 'Ops Foundry is a human-AI operational infrastructure company built to help businesses get important work done.',
    supporting:
      'We focus on the practical middle ground between strategy and software: combining managed teams, structured workflows, and AI-enabled tools so organizations can execute consistently.',
    image: {
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1100&q=80',
      alt: 'Two business operators reviewing workflow documentation and project priorities in an office workspace',
      caption: 'Focused on practical, structured business execution through people, processes, and technology.',
    },
  },
  whatWeAreAndWhyWeExist: {
    heading: 'Why Ops Foundry Exists',
    paragraphs: [
      'Across industries, businesses face a familiar operational gap. Leaders know they need a clear digital presence, consistent market communications, and organized customer pipeline operations—yet day-to-day execution repeatedly falls behind.',
      'The market typically offers two incomplete answers: buy another software subscription that your team still has to configure and run, or hire ad-hoc contractors that your team still has to coordinate and supervise every day.',
      'Ops Foundry exists to provide a third option: a practical execution partner that brings together accountable human operators, documented workflows, and modern AI-enabled tools to carry operational work through to completion.',
    ],
  },
  problemsWeSolve: {
    heading: 'The Operational Problems We Help Businesses Solve',
    intro:
      'We concentrate on three foundational areas where execution bottlenecks most frequently hold businesses back:',
    items: [
      {
        title: 'Stalled Digital Presence (Get Online)',
        description:
          'Helping businesses replace outdated, incomplete, or hard-to-maintain websites with structured, reliable digital foundations.',
        href: '/services/get-online',
      },
      {
        title: 'Inconsistent Communications & Visibility (Get Visible)',
        description:
          'Helping businesses turn irregular updates and scattered knowledge into repeatable content, communication, and search-discovery workflows.',
        href: '/services/get-visible',
      },
      {
        title: 'Fragmented Pipeline Operations (Get Customers)',
        description:
          'Helping businesses organize prospect research, inbound inquiry handling, and pipeline follow-up so commercial interest is managed systematically.',
        href: '/services/get-customers',
      },
    ],
  },
  philosophy: {
    heading: 'Our Human + AI Operational Philosophy',
    intro:
      'We view artificial intelligence as a practical operational multiplier—not a replacement for human accountability or clear process design.',
    principles: [
      {
        title: 'Process Before Automation',
        description:
          'Automating an undocumented or broken process only produces errors faster. We structure the workflow and quality standards first, then apply tooling where it genuinely helps.',
      },
      {
        title: 'Human-in-the-Loop Accountability',
        description:
          'AI tools can accelerate research, initial drafting, and data organization, but human operators remain responsible for context, accuracy, brand alignment, and final verification.',
      },
      {
        title: 'Scoped, Transparent Execution',
        description:
          'We do not rely on vague promises or black-box automation. Every engagement starts with a clear discussion of the problem, proposed scope, deliverables, and client dependencies.',
      },
      {
        title: 'Connected to Talent Development',
        description:
          'Through Ops Foundry Academy—the learning and talent-development side of our ecosystem—we are building an environment dedicated to training practical operational skills.',
      },
    ],
  },
  companyProfileNotice: {
    heading: 'Company Profile & Governance Note',
    body: 'Ops Foundry maintains a strict policy of factual accuracy across its corporate materials. We do not publish fabricated client logos, unverified performance statistics, or placeholder executive biographies. Official corporate registration details, leadership profiles, and verified case notes are published in this Git-managed profile as they are formally approved for public release.',
  },
  cta: {
    heading: 'Have operational work that needs to get done?',
    body: 'Explore a scoped pilot with Ops Foundry or review how our services are structured.',
    primaryLabel: 'Explore a Pilot',
    primaryHref: '/pilot',
    secondaryLabel: 'Explore Our Services',
    secondaryHref: '/services',
  },
} as const;

export const partnersPageContent = {
  hero: {
    title: 'For Partners',
    lead: 'Collaborating with organizations that support business growth, technology adoption, and practical skills development.',
    supporting:
      'Ops Foundry welcomes conversations with business networks, technology platforms, educational institutions, corporate teams, and ecosystem organizations interested in practical operational execution and talent development.',
  },
  collaborationIntro: {
    heading: 'Who We Collaborate With',
    intro:
      'Because Ops Foundry operates across both commercial business execution and practical operational training (through Ops Foundry Academy), we can explore structured collaboration across five partner categories:',
    notice:
      'Note: The categories below describe potential areas of collaboration. Ops Foundry does not claim unconfirmed institutional endorsements or commercial partnerships.',
  },
  partnerCategories: [
    {
      title: 'Business Support Organisations',
      whoTheyAre:
        'Chambers of commerce, SME associations, accelerators, incubators, and enterprise development hubs supporting growing companies.',
      howWeCanCollaborate: [
        'Providing structured operational clinics or workshops on digital presence, content workflows, and practical AI use',
        'Supporting member businesses through scoped Get Online, Get Visible, or Get Customers pilots',
        'Developing practical operational readiness resources for cohort companies',
      ],
    },
    {
      title: 'Technology Providers',
      whoTheyAre:
        'Software platforms, web infrastructure providers, CRM vendors, and productivity toolmakers whose customers need implementation and operational support.',
      howWeCanCollaborate: [
        'Helping business customers configure, adopt, and actually operate the workflows around their software tools',
        'Reducing customer onboarding friction through managed setup and documented operating procedures',
        'Aligning trained operational pods with modern toolchains',
      ],
    },
    {
      title: 'Training & Education Partners',
      whoTheyAre:
        'Educational institutions, skills initiatives, vocational programmes, and learning communities focused on employability and digital operations.',
      howWeCanCollaborate: [
        'Collaborating around practical workplace simulations and operational workflow training via Ops Foundry Academy',
        'Sharing operational frameworks that bridge classroom learning with real-world business execution standards',
        'Exploring joint workshops on human-in-the-loop AI workflows',
      ],
    },
    {
      title: 'Corporate Organisations',
      whoTheyAre:
        'Established enterprises and regional businesses seeking either external operational execution pods or structured talent development pathways.',
      howWeCanCollaborate: [
        'Scoping dedicated operational pilots to clear digital, content, or pipeline backlogs',
        'Exploring corporate sponsorship or talent pipeline alignment with Ops Foundry Academy',
        'Standardizing recurring operational workflows across commercial teams',
      ],
    },
    {
      title: 'Ecosystem & Institutional Partners',
      whoTheyAre:
        'Development programmes, foundations, and public-private initiatives focused on digital capability building, SME resilience, and workforce readiness.',
      howWeCanCollaborate: [
        'Structuring programme delivery that combines SME operational support with practical operator training',
        'Designing transparent, measurable pilot frameworks with clear governance and reporting',
        'Collaborating on research and field notes around human-AI operational adoption',
      ],
    },
  ],
  howPartnershipWorks: {
    heading: 'How We Approach Partnership Conversations',
    steps: [
      {
        step: '01',
        title: 'Initial Alignment',
        description:
          'We discuss your organization’s objectives, the audience or businesses you serve, and where operational execution or training support is needed.',
      },
      {
        step: '02',
        title: 'Scoped Collaboration Design',
        description:
          'Rather than broad, undefined memoranda, we outline a specific pilot initiative, workshop scope, or operational collaboration structure.',
      },
      {
        step: '03',
        title: 'Structured Delivery & Review',
        description:
          'We agree on clear responsibilities, communication checkpoints, and evaluation criteria before launching any joint activity.',
      },
    ],
  },
  cta: {
    heading: 'Interested in exploring a partnership with Ops Foundry?',
    body: 'Use our pilot and partnership inquiry pathway to share your organization’s focus and the type of collaboration you would like to discuss.',
    primaryLabel: 'Start a Partnership Conversation',
    primaryHref: '/pilot?service=all',
    secondaryLabel: 'Learn About Ops Foundry',
    secondaryHref: '/about',
  },
} as const;

export const pilotPageContent = {
  hero: {
    title: 'Explore a Pilot',
    lead: 'A pilot is a scoped engagement designed around a defined business problem.',
    supporting:
      'Rather than asking your business to commit to a vague, open-ended retainer, Ops Foundry starts with a structured pilot. Together, we define a specific operational problem across Get Online, Get Visible, or Get Customers and agree on clear parameters before work begins.',
  },
  whyStartWithPilot: {
    heading: 'Why We Start With a Scoped Pilot',
    body: 'Every business has its own existing tools, communication habits, and bottlenecks. Starting with a focused pilot lets both teams validate working rhythm, documentation standards, communication cadence, and deliverable quality on a well-defined piece of work before considering longer-term operational support.',
    disclaimer:
      'Ops Foundry focuses on disciplined operational execution. We do not promise guaranteed revenue, guaranteed customer acquisition numbers, guaranteed conversion rates, or unverified commercial outcomes.',
  },
  tenGovernanceDimensions: {
    heading: 'What to Understand Before Engaging in a Pilot',
    intro:
      'Before any pilot begins, Ops Foundry and the prospective client review and agree upon ten practical governance dimensions so expectations are clear on both sides:',
    dimensions: [
      {
        number: '01',
        title: 'Business Problem',
        description:
          'What specific operational bottleneck or backlog item is the pilot addressing (for example, an outdated website, inconsistent content output, or unstructured lead handling)?',
      },
      {
        number: '02',
        title: 'Proposed Scope',
        description:
          'Which service line (Get Online, Get Visible, or Get Customers) and which specific workstreams are included within the pilot boundary.',
      },
      {
        number: '03',
        title: 'Deliverables',
        description:
          'The concrete outputs, pages, documented workflows, content assets, or pipeline operations tasks to be completed during the pilot.',
      },
      {
        number: '04',
        title: 'Exclusions',
        description:
          'What is explicitly out of scope for the pilot—ensuring neither team assumes unagreed software development, ad spend, legal advice, or unrelated tasks are included.',
      },
      {
        number: '05',
        title: 'Timeline',
        description:
          'The indicative schedule and milestone checkpoints for scoping, workflow setup, execution, and review, tailored to the complexity of the agreed work.',
      },
      {
        number: '06',
        title: 'Client Dependencies',
        description:
          'The inputs, factual materials, brand assets, system permissions, and timely review sign-offs required from your team so execution is not blocked.',
      },
      {
        number: '07',
        title: 'Fees',
        description:
          'The commercial fee structure and payment terms agreed in writing for the scoped pilot prior to commencement (fees are scoped per engagement; no hidden charges apply).',
      },
      {
        number: '08',
        title: 'Quality Assurance',
        description:
          'How outputs are checked against documented procedures by Ops Foundry operators and how your designated point of contact reviews and approves deliverables.',
      },
      {
        number: '09',
        title: 'Reporting',
        description:
          'How progress updates, completed deliverables, and open questions are shared with your team throughout the engagement.',
      },
      {
        number: '10',
        title: 'Success Criteria',
        description:
          'The practical, observable criteria used at the Review & Handover stage to confirm that the agreed pilot deliverables and workflows have been completed as scoped.',
      },
    ],
  },
  formSection: {
    heading: 'Prepare Your Pilot Consultation Brief',
    intro:
      'Use the form below to structure your pilot brief across the key scoping areas.',
    statusNotice:
      'Pilot consultation submissions are not yet open. Please check back soon.',
  },
} as const;
