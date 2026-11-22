/**
 * Ops Foundry Academy — Scholarship & Funding Content Module
 *
 * Source of Truth: Ops_Foundry_Academy_Website_Master_Brief.docx (Sections 02, 07, 11)
 *
 * Architectural Boundary:
 * Scholarships represent funding opportunities provided by Ops Foundry Academy or approved partners.
 * Admission to a programme and scholarship funding are separate decisions.
 *
 * Publication Control (Section 11):
 * All scholarship records remain unpublished until formal partner agreements, logos, and award
 * allocations are signed off. No unconfirmed sponsor names or invented scholarship titles are published.
 */

export interface ScholarshipRecord {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  isPartnerConfirmed: boolean;
  status: 'draft' | 'pending_partner_confirmation' | 'active' | 'closed' | 'archived';
  coverageType: 'full_tuition' | 'partial_tuition' | 'tuition_and_equipment';
  awardDescription: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationRoute: 'hosted' | 'external_sponsor';
  decisionAuthority: string;
  publicationNotice: string;
}

export interface ScholarshipApplicationRouteInfo {
  id: 'hosted' | 'external_sponsor';
  title: string;
  summary: string;
  features: string[];
  statusLabel: string;
}

export const scholarshipApplicationRoutes: ScholarshipApplicationRouteInfo[] = [
  {
    id: 'hosted',
    title: 'Hosted Academy Application Route',
    summary:
      'Applications processed directly through Ops Foundry Academy with secure review by the Admissions & Scholarship Committee.',
    features: [
      'Single integrated application reviewed alongside your admissions profile.',
      'Transparent eligibility review based on academic merit and socio-economic need.',
      'Clear decision timelines and direct status notification.',
    ],
    statusLabel: 'Awaiting Cohort Agreement Sign-Off',
  },
  {
    id: 'external_sponsor',
    title: 'External Sponsor Application Route',
    summary:
      'Direct application links to verified philanthropic foundations, corporate sponsors, and funding partners who support tuition awards.',
    features: [
      'Direct application submitted to the participating sponsor organisation.',
      'Sponsor-specific eligibility criteria and review processes.',
      'Award allocations confirmed directly by the sponsoring partner.',
    ],
    statusLabel: 'Awaiting Partner Agreement Confirmation',
  },
];

export const scholarshipDirectoryNotice = {
  heading: 'Scholarship Publication Status',
  body:
    'Explore funding opportunities from Ops Foundry Academy and approved partners. Each listing explains who is eligible, what the award covers, deadlines and how to apply. Scholarships may cover all or part of tuition, and admission is assessed separately.',
  scopingNotice:
    'In accordance with institutional publishing controls (Master Brief Section 11), specific scholarship schemes, participating partner names, award coverage amounts, eligibility criteria, and deadlines remain unpublished until formal agreements are executed. Confirmed scholarship listings will appear here as partnership agreements are finalised.',
} as const;

// In accordance with Section 11, specific scholarship schemes remain unpublished until confirmed
export const plannedScholarships: ScholarshipRecord[] = [];
