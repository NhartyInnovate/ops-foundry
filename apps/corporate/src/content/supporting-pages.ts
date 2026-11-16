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
    lead: 'Ops Foundry is a human-AI operational infrastructure company helping businesses move important work from backlog to completion.',
    supporting:
      'We bring together accountable people, structured workflows and practical technology to help businesses execute consistently.',
    image: {
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1100&q=80',
      alt: 'Two business operators reviewing workflow documentation and project priorities in an office workspace',
      caption: 'Focused on practical, structured business execution through people, processes, and technology.',
    },
  },
  whatWeAreAndWhyWeExist: {
    heading: 'Why Ops Foundry Exists',
    paragraphs: [
      'Growing businesses often have important work that remains unfinished because people, processes and tools are not properly coordinated.',
      'Buying more software or hiring disconnected contractors does not always solve the problem.',
      'Ops Foundry exists to bridge that execution gap by bringing together accountable human operators, documented workflows and practical AI-enabled tools.',
    ],
  },
  philosophy: {
    heading: 'Our Human + AI Operational Philosophy',
    intro:
      'We use AI to improve operational efficiency, while keeping people accountable for decisions, quality and delivery.',
    principles: [
      {
        number: '01',
        title: 'Process Before Automation',
        description:
          'Clear workflows come first. Automation supports processes that are already understood.',
      },
      {
        number: '02',
        title: 'Human-in-the-Loop Accountability',
        description:
          'People remain responsible for reviewing outputs, making decisions and maintaining quality.',
      },
      {
        number: '03',
        title: 'Scoped, Transparent Execution',
        description:
          'Every engagement begins with agreed expectations, deliverables and responsibilities.',
      },
      {
        number: '04',
        title: 'Connected to Talent Development',
        description:
          'Through Ops Foundry Academy, we support practical skills development and professional growth.',
      },
    ],
  },
  companyProfileNotice: {
    heading: 'Company Profile & Governance Note',
    body: 'Ops Foundry is committed to accurate, verifiable corporate information. We do not publish fabricated client logos, performance statistics, awards or unverified partnerships. Official company information and approved public claims are published only after verification.',
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
