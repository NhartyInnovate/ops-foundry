/**
 * Ops Foundry Academy — Supporting Pages Content Module
 *
 * Source of Truth: Ops_Foundry_Academy_Website_Master_Brief.docx (Sections 01, 02, 06, 07, 08, 11)
 *
 * Contains approved working copy for:
 * 1. How Learning Works
 * 2. Admissions
 * 3. Career Opportunities & Placement
 * 4. Tuition & Scholarships
 * 5. For Partners
 * 6. About the Academy
 * 7. FAQs and Contact (structured pending-confirmation states, no fictional details)
 */

// ============================================================================
// 1. HOW LEARNING WORKS (SECTIONS 02 & 03)
// ============================================================================

export const howWeLearnPageContent = {
  hero: {
    title: 'How Learning Works',
    lead: 'A clear path from foundation to specialization, grounded in real business workflows.',
    supporting:
      'Ops Foundry Academy develops people for practical digital and AI-enabled business operations. Learning progresses in structured steps: building essential core capabilities, specializing in a chosen pathway, demonstrating competence, and preparing for real opportunities.',
    image: {
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=80',
      alt: 'Two learners reviewing structured project notes and working on a laptop together',
      caption:
        'Focused on structured development, active practice, and clear professional communication.',
    },
  },
  fourStagePath: {
    heading: 'The Four Stages of Academy Progression',
    intro:
      'Every learner progresses through four connected stages designed around the work done at Ops Foundry and across our partner ecosystem:',
    stages: [
      {
        stageNumber: '01',
        title: 'Build Foundation',
        summary: 'Ops Foundry Core',
        description:
          'Develop essential skills in digital productivity, communication, structured workflows, responsible AI use and problem-solving through the Ops Foundry Core.',
        inPractice:
          'Mastering daily operational hygiene: documentation discipline, task tracking, and thoughtful tool selection.',
      },
      {
        stageNumber: '02',
        title: 'Specialize',
        summary: 'Pathway Specialization',
        description:
          'Progress into a career pathway according to your interests, performance, aptitude and available places. Build deeper skills through guided projects and realistic business tasks.',
        inPractice:
          'Hands-on execution in Growth Operations, Content Operations, or Web & Digital Operations.',
      },
      {
        stageNumber: '03',
        title: 'Demonstrate Capability',
        summary: 'Practical Assessments & Credentials',
        description:
          'Complete practical assessments and build evidence of your work. Successful learners may earn Academy-issued credentials for competencies they demonstrate.',
        inPractice:
          'Building verified portfolios and completing realistic, proctored workplace scenarios.',
      },
      {
        stageNumber: '04',
        title: 'Be Considered for Opportunities',
        summary: 'Readiness & Selection',
        description:
          'Graduates who meet role-specific readiness standards may be considered for available openings at Ops Foundry or with partner employers. Hiring depends on vacancies and employer selection.',
        inPractice:
          'Clear progression from proven capability to recruitment consideration without artificial guarantees.',
      },
    ],
  },
  whyPracticalLearningMatters: {
    heading: 'Training Connected to Real Work',
    paragraphs: [
      'In many learning environments, success is measured by how well someone can memorize terminology or summarize theory. In modern business operations, however, what matters is whether a person can understand an objective, organize a clear workflow, use tools responsibly, and carry a task through to completion.',
      'Ops Foundry Academy bridges the gap between knowing a concept and executing it reliably. Our learning philosophy emphasizes clarity, structured habits, and disciplined execution so learners build confidence that transfers directly to real responsibilities.',
    ],
  },
  sixPrinciplesDetailed: {
    heading: 'The Six Core Principles of Academy Learning',
    intro:
      'All Academy training is grounded in six operational learning principles:',
    principles: [
      {
        number: '01',
        title: 'Practical Learning',
        summary: 'Grounded in the realities of modern professional work.',
        detail:
          'Learning is framed around practical situations: how tasks are scoped, how information is organized, and how dependable work is delivered in modern teams.',
        inPractice:
          'Focusing on clear communication, organized documentation, and purposeful problem-solving.',
      },
      {
        number: '02',
        title: 'Structured Development',
        summary: 'Building capability step by step in a logical sequence.',
        detail:
          'Strong execution relies on solid foundations. Learning progresses systematically from foundational working habits toward more comprehensive tasks.',
        inPractice:
          'Following clear stages of preparation, execution, and review rather than improvising without a framework.',
      },
      {
        number: '03',
        title: 'Learning by Doing',
        summary: 'Developing competence through active engagement and practice.',
        detail:
          'Real understanding deepens when learners work through tasks themselves, encounter practical decisions, and organize their own outputs.',
        inPractice:
          'Practicing directly on realistic business exercises rather than relying on passive study alone.',
      },
      {
        number: '04',
        title: 'Relevant Skills',
        summary: 'Concentrating on capabilities needed in contemporary workplaces.',
        detail:
          'Modern work calls for people who can think clearly, follow documented processes, communicate effectively, and work thoughtfully alongside digital and AI-enabled tools.',
        inPractice:
          'Developing practical workflow literacy, attention to detail, and responsible judgment.',
      },
      {
        number: '05',
        title: 'Application of Knowledge',
        summary: 'Translating what you learn into clear, dependable outputs.',
        detail:
          'Knowledge is most valuable when translated into clear, dependable outputs that colleagues and clients can review and use.',
        inPractice:
          'Connecting concepts directly to tangible deliverables and realistic workplace scenarios.',
      },
      {
        number: '06',
        title: 'Continuous Improvement',
        summary: 'Refining quality through reflection, review, and iteration.',
        detail:
          'Dependable professionals review their own work, incorporate constructive feedback, and strengthen their approach over time.',
        inPractice:
          'Building the habit of checking work carefully, learning from feedback, and improving consistency.',
      },
    ],
  },
  programmeDeliveryGovernance: {
    heading: 'Programme Format & Publication Governance',
    paragraphs: [
      'While our four-stage journey and six learning principles guide the entire Academy, individual programmes differ in their specific activities, tools, and schedules.',
      'In keeping with our factual publication controls, programme-specific delivery formats, exact schedules, and review criteria will be published alongside each confirmed course specification.',
    ],
    notice:
      'Governance Note: Training, certification, readiness and hiring are separate decisions. Completion of an Academy programme does not guarantee employment.',
  },
  cta: {
    heading: 'Ready to explore our career pathways and training offers?',
    body: 'Discover the operational roles behind growing businesses or review our structured admissions guide.',
    primaryLabel: 'Explore Career Pathways',
    primaryHref: '/pathways',
    secondaryLabel: 'Admissions Guide',
    secondaryHref: '/admissions',
  },
} as const;

// ============================================================================
// 2. ADMISSIONS (SECTION 07)
// ============================================================================

export const admissionsPageContent = {
  hero: {
    title: 'Admissions',
    lead: 'A clear, structured admissions process for prospective learners.',
    supporting:
      'Apply to build practical skills for modern business operations. We review eligibility, motivation and readiness, and may require an aptitude assessment or practical task. Admission decisions and scholarship decisions are separate.',
  },
  applicationStatusBanner: {
    badge: 'Intake Scoping Status',
    heading: 'Cohort Admissions Preparation',
    body:
      'Programme details and schedules for our launch programmes are currently undergoing final confirmation. Prospective learners can review the admissions stages below and register their interest for upcoming intakes.',
  },
  admissionsStatusesExplanation: {
    heading: 'Admissions Decision Statuses',
    intro:
      'Every applicant receives clear status communication and access to an enquiry route. We do not use unvalidated scores for automatic final rejection.',
    statuses: [
      {
        name: 'Admitted',
        description: 'Meets eligibility, motivation, and readiness criteria; offered a confirmed place in the intake.',
      },
      {
        name: 'Conditional',
        description: 'Offered admission subject to completing a specific preparation task or verifying submitted documents.',
      },
      {
        name: 'Waitlisted',
        description: 'Qualified applicant placed on the intake waitlist if cohort capacity has been reached.',
      },
      {
        name: 'Declined',
        description: 'Current profile or assessment does not meet entry requirements for the selected programme.',
      },
      {
        name: 'Withdrawn',
        description: 'Application closed at the applicant’s request or due to inactivity during the intake window.',
      },
    ],
  },
  journeySteps: {
    heading: 'Admissions Review & Assessment',
    intro:
      'How applicants progress through evaluation when an intake window opens:',
    steps: [
      {
        step: 'Step 01',
        title: 'Review Programme & Eligibility',
        description:
          'Review available programmes, weekly time commitments, and prerequisite recommendations before applying.',
      },
      {
        step: 'Step 02',
        title: 'Submit Application & Information',
        description:
          'Submit your background details, motivation for digital operations, and selected programme track.',
      },
      {
        step: 'Step 03',
        title: 'Practical Task or Aptitude Review',
        description:
          'Complete an aptitude assessment or practical task to demonstrate foundational readiness and commitment.',
      },
      {
        step: 'Step 04',
        title: 'Admissions Decision Communication',
        description:
          'Receive status notification (Admitted, Conditional, Waitlisted, Declined, or Withdrawn) with enquiry access.',
      },
    ],
  },
  preferredProgrammePolicy: {
    heading: 'Separate Admissions & Funding Evaluation',
    paragraphs: [
      'Apply to build practical skills for modern business operations. We review eligibility, motivation and readiness, and may require an aptitude assessment or practical task.',
      'Admission decisions and scholarship decisions are separate. An offer of admission is based on applicant readiness, while scholarship awards depend on partner eligibility criteria and capacity.',
    ],
  },
  applicationGuidance: {
    heading: 'What to Keep in Mind Before Applying',
    intro:
      'Key guidelines for applicants preparing for upcoming intakes:',
    items: [
      {
        title: 'Practical Motivation Over Academic Theory',
        body: 'We look for people genuinely motivated by organizing real work, solving operational problems, and building reliable daily working habits.',
      },
      {
        title: 'Time & Weekly Commitment',
        body: 'Programmes require focused weekly study, task completion, and collaborative review. Ensure your schedule accommodates consistent participation.',
      },
      {
        title: 'Transparent Fees & Funding',
        body: 'Understand the full cost before you enrol. Each programme displays its total fee, what is included, and available payment options as they are approved.',
      },
      {
        title: 'Separate Readiness & Hiring Decisions',
        body: 'Admission to and completion of the Academy does not guarantee employment. Readiness is earned through demonstrated performance.',
      },
    ],
  },
  plannedApplicationFieldsPreview: {
    heading: 'What the Application Covers',
    intro:
      'When an intake is open, applicants complete a concise application covering:',
    fields: [
      {
        label: 'Candidate & Contact Details',
        detail: 'Full legal name, primary email address, telephone contact, and geographic location.',
      },
      {
        label: 'Chosen Programme & Track',
        detail: 'Direct selection of your preferred launch programme: Growth Operations, Content Operations, or Web & Digital Operations.',
      },
      {
        label: 'Background & Learning Motivation',
        detail: 'Overview of past experience, reasons for pursuing practical operational skills, and weekly availability.',
      },
    ],
    statusNote:
      'Note: Online application submission is in scoping mode while first-cohort dates are confirmed. No personal data is stored until an intake formally opens.',
  },
  cta: {
    heading: 'Explore our career pathways and planned programme tracks.',
    body: 'Review the skills required for modern operations roles or register interest for upcoming intakes.',
    primaryLabel: 'Explore Career Pathways',
    primaryHref: '/pathways',
    secondaryLabel: 'How Learning Works',
    secondaryHref: '/how-we-learn',
  },
} as const;

// ============================================================================
// 3. CAREER OPPORTUNITIES & PLACEMENT (SECTION 06)
// ============================================================================

export const careerOpportunitiesPageContent = {
  hero: {
    title: 'Career Opportunities & Placement',
    lead: 'Skills developed for real work. Opportunities earned through proven readiness.',
    supporting:
      'Prepare for opportunities. Demonstrate your readiness. The Academy is designed to build operational talent for Ops Foundry’s managed services teams and partner employers.',
  },
  headline: 'Prepare for opportunities. Demonstrate your readiness.',
  body:
    'Our first priority is to develop people who can meet the operational needs of Ops Foundry. As relevant positions open, qualified Academy graduates may be considered for recruitment. We may also introduce eligible graduates to opportunities with partner organizations, subject to partner needs and selection processes.',
  supportingLine:
    'Academy admission, certification and deployment readiness do not guarantee employment or paid placement.',
  howItWorks: {
    heading: 'How it works',
    intro:
      'How learners transition from practical training to potential recruitment consideration:',
    steps: [
      {
        stepNumber: '01',
        title: 'Complete training and required assessments.',
        description:
          'Complete all required foundational coursework, pathway exercises, and practical assessments.',
      },
      {
        stepNumber: '02',
        title: 'Meet role-specific readiness standards.',
        description:
          'Demonstrate verified capability, documentation discipline, and role-specific readiness standards.',
      },
      {
        stepNumber: '03',
        title: 'Express interest in an available role.',
        description:
          'Express interest in open positions at Ops Foundry or with partner employers as vacancies arise.',
      },
      {
        stepNumber: '04',
        title: 'Complete any interviews, work samples or employer checks.',
        description:
          'Participate in structured employer interviews, practical work sample evaluations, and screening checks.',
      },
      {
        stepNumber: '05',
        title: 'Receive a hiring decision from the recruiting organization.',
        description:
          'Receive an independent hiring decision based on employer operational requirements and candidate suitability.',
      },
    ],
  },
  ecosystemConnection: {
    heading: 'Built Around Ops Foundry’s Managed Services Operating Model',
    body:
      'Ops Foundry helps businesses manage important digital and operational work. The Academy develops the capabilities people need to contribute to that work. Because our curriculum mirrors real project workflows, graduates who achieve deployment readiness have practical experience in the exact tools and disciplines modern teams require.',
  },
  partnerEmployers: {
    heading: 'Opportunities with Partner Employers',
    body:
      'Beyond Ops Foundry’s internal recruitment needs, we collaborate with employer partners who value structured operational discipline. Eligible graduates may be introduced to partner openings, subject to employer requirements and selection procedures.',
  },
  cta: {
    heading: 'Build real capability for modern business operations.',
    body: 'Discover the work done across our career pathways or explore our upcoming training programmes.',
    primaryLabel: 'Explore Career Pathways',
    primaryHref: '/pathways',
    secondaryLabel: 'How Learning Works',
    secondaryHref: '/how-we-learn',
  },
} as const;

// ============================================================================
// 4. TUITION & SCHOLARSHIPS (SECTION 07)
// ============================================================================

export const tuitionAndScholarshipsPageContent = {
  hero: {
    title: 'Tuition & Scholarships',
    lead: 'Clear, transparent financial information so you can plan with confidence.',
    supporting:
      'Understand the full cost before you enrol. Explore funding opportunities from Ops Foundry Academy and approved partners.',
  },
  tuitionOverview: {
    heading: 'Tuition Transparency',
    body:
      'Understand the full cost before you enrol. Each published programme shows its total fee, what is included, available payment arrangements and applicable refund or deferral terms. Amounts will appear only when approved.',
    inclusionsNote:
      'When published, tuition covers all structured learning materials, practical project briefs, proctored assessments, and credential verification.',
    installmentsNote:
      'Flexible payment options and installment plans will be clearly detailed on programme pages once cohort specifications are finalized.',
    statusNotice:
      'Publication Notice: Official tuition amounts, installment schedules, and payment terms are currently being finalized. No fees will be collected until approved.',
  },
  scholarshipOverview: {
    heading: 'Scholarships & Funding Opportunities',
    body:
      'Explore funding opportunities from Ops Foundry Academy and approved partners. Each listing explains who is eligible, what the award covers, deadlines and how to apply. Scholarships may cover all or part of tuition, and admission is assessed separately.',
    applicationRoutesNote:
      'Scholarship application routes include hosted Academy applications with secure review or direct links to external funding sponsors. Each scholarship has specific eligibility criteria, required documents, and decision timelines.',
    governanceNotice:
      'Funding Partner Status: Specific scholarship schemes and partner announcements are currently undergoing formal confirmation. Partner details and award amounts will be published only after all partnership agreements are finalized.',
  },
  cta: {
    heading: 'Have questions about admissions or funding?',
    body: 'Review our admissions guide or explore our career pathways.',
    primaryLabel: 'Admissions Guide',
    primaryHref: '/admissions',
    secondaryLabel: 'Career Pathways',
    secondaryHref: '/pathways',
  },
} as const;

// ============================================================================
// 5. FOR PARTNERS (SECTION 08)
// ============================================================================

export const forPartnersPageContent = {
  hero: {
    title: 'Partner With the Academy',
    lead: 'Collaborate with Ops Foundry Academy to develop practical, job-ready talent.',
    supporting:
      'Partner with us to develop practical talent. We collaborate with organizations that want to expand access to skills, technology and employment pathways.',
  },
  headline: 'Partner with us to develop practical talent.',
  body:
    'We collaborate with organizations that want to expand access to skills, technology and employment pathways. Your support can help learners access training, equipment, connectivity, workplace exposure and potential career opportunities.',
  partnershipTypes: {
    heading: 'Ways to Collaborate',
    intro: 'We welcome partnerships across five core areas:',
    types: [
      {
        id: 'scholarships',
        title: 'Sponsor Scholarships',
        description:
          'Fund full or partial tuition scholarships for high-potential learners from underserved or underrepresented backgrounds.',
      },
      {
        id: 'devices',
        title: 'Provide Devices or Connectivity',
        description:
          'Support learners with hardware (laptops, peripherals) and internet connectivity essential for rigorous remote training.',
      },
      {
        id: 'curriculum',
        title: 'Support Curriculum or Industry Projects',
        description:
          'Contribute real-world business scenarios, data sets, or guest reviews that strengthen practical workplace relevance.',
      },
      {
        id: 'employment',
        title: 'Offer Internships or Job Opportunities',
        description:
          'Connect with qualified Academy graduates who have demonstrated verified operational competency on practical assessments.',
      },
      {
        id: 'cohorts',
        title: 'Co-Create a Programme or Cohort',
        description:
          'Collaborate on a tailored operational training track designed around your organization’s specific operational requirements.',
      },
    ],
  },
  ctaText: 'Discuss a Partnership',
  formGuidance: {
    heading: 'Partner Enquiry Form',
    intro:
      'Submit your organization’s details and collaboration interests. Our team will review your enquiry and schedule an exploratory discussion.',
    fieldsDescription:
      'The enquiry form collects: Organization name, contact person, work email, location, partnership type (multi-select), proposed contribution, approximate scale, timing, message, and consent.',
  },
} as const;

// ============================================================================
// 6. ABOUT THE ACADEMY (SECTIONS 01, 02, 03)
// ============================================================================

export const aboutAcademyPageContent = {
  hero: {
    title: 'About Ops Foundry Academy',
    lead: 'Developing people for practical digital and AI-enabled business operations.',
    supporting:
      'Ops Foundry Academy exists to prepare people for practical roles in modern business operations—bridging the gap between learning a concept and applying it reliably in a professional team.',
    image: {
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1100&q=80',
      alt: 'Collaborative workspace where learners and practitioners review structured workflows on laptops',
      caption:
        'A serious, encouraging learning environment focused on practical capability and real-world application.',
    },
  },
  whatAcademyIs: {
    heading: 'What Ops Foundry Academy Is',
    paragraphs: [
      'Ops Foundry Academy develops people for practical digital and AI-enabled business operations, primarily to prepare qualified graduates for potential roles at Ops Foundry and secondarily for opportunities with partner employers.',
      'Training, certification, readiness and hiring are separate decisions. Completion of an Academy programme does not guarantee a job. Our mission is to ensure every graduate possesses genuine, demonstrated competence in the workflows that modern companies depend on.',
    ],
  },
  focusAreas: {
    heading: 'Our Operational Priorities',
    intro:
      'Everything in the Academy is structured around four foundational commitments:',
    items: [
      {
        title: 'Training Connected to Real Work',
        description:
          'Curricula are built around the practical tasks executed at Ops Foundry and across modern operational teams—not abstract academic theory.',
      },
      {
        title: 'A Foundation in the Ops Foundry Core',
        description:
          'Every learner builds essential habits in digital productivity, clear communication, structured workflows, and responsible AI use before specializing.',
      },
      {
        title: 'Evidence of Capability',
        description:
          'Competence is proven through active problem-solving, verified project outputs, and practical assessments.',
      },
      {
        title: 'Opportunities Earned Through Readiness',
        description:
          'Graduates who achieve role-specific readiness standards may be considered for recruitment at Ops Foundry or with partner employers as vacancies arise.',
      },
    ],
  },
  ecosystemRelationship: {
    id: 'ops-foundry-ecosystem',
    heading: 'Relationship Between Ops Foundry and the Academy',
    intro:
      'Ops Foundry operates two connected but distinct entities sharing a focus on structured execution:',
    entities: [
      {
        name: 'Ops Foundry (Corporate Business)',
        audience: 'For Businesses & Organisations',
        description:
          'A managed services business that helps growing companies execute digital and business operations through skilled teams, structured processes, and AI-enabled tools across Get Online, Get Visible, and Get Customers.',
      },
      {
        name: 'Ops Foundry Academy (Learning Platform)',
        audience: 'For Learners, Career Switchers & Partners',
        description:
          'The learning platform that develops operational capabilities for Ops Foundry’s operating model and for related roles with partner employers.',
      },
    ],
    distinctionNotice:
      'Clear Institutional Distinction: Ops Foundry Academy is an educational and skill-development platform. Enrolling in or completing an Academy programme does not constitute employment with Ops Foundry or a guarantee of job placement.',
  },
  governanceCommitment: {
    heading: 'Commitment to Factual Transparency',
    body:
      'Ops Foundry Academy maintains strict standards of honesty across all public information. We do not publish speculative course titles, fabricated student headcounts, fake graduate testimonials, unverified employment statistics, or unconfirmed partner logos. Official programme specifications and cohort updates are published only as they are formally signed off.',
  },
  cta: {
    heading: 'Explore how learning and admissions work at the Academy.',
    body: 'Browse our career pathways, review our programme catalogue, or read our admissions guide.',
    primaryLabel: 'Explore Career Pathways',
    primaryHref: '/pathways',
    secondaryLabel: 'Explore Admissions',
    secondaryHref: '/admissions',
  },
} as const;

// ============================================================================
// 7. FAQS AND CONTACT (STRUCTURED PENDING-CONFIRMATION MODULE)
// ============================================================================

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Admissions' | 'Curriculum' | 'Tuition & Funding' | 'Career Opportunities';
}

export const faqsPageContent = {
  heading: 'Frequently Asked Questions',
  intro:
    'Answers to common questions regarding Ops Foundry Academy, admissions, learning structure, and career opportunities.',
  status: 'pending_confirmation',
  notice:
    'Detailed category-by-category FAQs are currently undergoing editorial compilation and will be published alongside confirmed cohort intake dates.',
  provisionalFaqs: [
    {
      category: 'Admissions' as const,
      question: 'Who can apply to Ops Foundry Academy?',
      answer:
        'The Academy is open to motivated individuals who want to develop practical operational capabilities. Specific prerequisite recommendations will appear on each programme page once finalized.',
    },
    {
      category: 'Admissions' as const,
      question: 'Does applying guarantee admission?',
      answer:
        'No. We review applicant eligibility, motivation, and readiness, and may administer an aptitude assessment or practical task prior to making admissions decisions.',
    },
    {
      category: 'Curriculum' as const,
      question: 'What is the difference between a Career Pathway and a Programme?',
      answer:
        'A career pathway describes the type of work a person may pursue and the qualities required to thrive in that role. A programme describes the actual training offer, including schedule, delivery mode, curriculum, and fees.',
    },
    {
      category: 'Curriculum' as const,
      question: 'What is the Ops Foundry Core?',
      answer:
        'The Ops Foundry Core is a foundational curriculum covering digital productivity, professional communication, structured workflows, responsible AI use, and operational problem-solving that all learners complete before specializing.',
    },
    {
      category: 'Tuition & Funding' as const,
      question: 'How much does an Academy programme cost?',
      answer:
        'Official tuition amounts and payment installment plans are currently being finalized. Full fees and refund terms will be published openly on each programme page before applications open.',
    },
    {
      category: 'Career Opportunities' as const,
      question: 'Does completing the Academy guarantee a job at Ops Foundry?',
      answer:
        'No. Training, certification, readiness, and hiring are separate decisions. Qualified graduates who meet verified readiness standards may be considered for vacancies at Ops Foundry or introduced to partner employers, but hiring depends on available positions and employer selection.',
    },
  ],
} as const;

export const contactPageContent = {
  heading: 'Contact the Academy',
  intro:
    'Get in touch with the Ops Foundry Academy admissions and partnerships team.',
  status: 'pending_confirmation',
  notice:
    'Official admissions support channels, direct enquiry mailboxes, and operational office touchpoints are undergoing confirmation prior to cohort launch.',
  channels: [
    {
      title: 'Admissions Inquiries',
      description:
        'Dedicated admissions support for prospective learners regarding intake schedules, eligibility, and applications.',
      status: 'Channel opening alongside cohort announcement',
    },
    {
      title: 'Partnerships & Sponsorships',
      description:
        'For organizations interested in sponsoring scholarships, providing hardware, or exploring graduate hiring.',
      routeHref: '/for-partners',
      routeLabel: 'Submit a Partner Inquiry',
    },
  ],
} as const;
