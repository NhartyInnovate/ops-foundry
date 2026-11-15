# Phase 3B.2 Implementation Report — Ops Foundry Corporate Supporting Pages

**Date:** 2026-11-15  
**Phase:** Phase 3B.2 (Corporate Website Supporting Pages, Navigation, SEO & Responsive QA)  
**Application Scope:** `apps/corporate`  
**Base Commit Inspected:** `0c860ea51042d1a4a43e6a25522fce1be8a22c1a` (`main`)

---

## 1. Summary of Implemented Pages and Routes

Phase 3B.2 completes the supporting page architecture of the Ops Foundry Corporate website (`apps/corporate`) while preserving the approved Direction C brand system (Warm Stone `#F6F4EF` canvas, Pure White `#FFFFFF` cards, Foundry Dark `#111215` authority blocks, Foundry Orange `#FF5A1F` primary action accents, and `Manrope` + `Plus Jakarta Sans` typography) and the existing Corporate homepage (`/`):

| Route | Page Title | Static Generation Mode | Purpose & Key Sections |
| :--- | :--- | :--- | :--- |
| `/` | `Ops Foundry — Human-AI Operational Infrastructure` | Static (`○`) | Corporate homepage (preserved from Phase 3B.1; internal CTAs updated to link directly to `/services`, `/services/*`, `/how-we-work`, `/partners`, and `/pilot`). |
| `/services` | `Services — Ops Foundry` | Static (`○`) | Services Overview explaining the three commercial service lines (*Get Online*, *Get Visible*, *Get Customers*), the business problem each addresses, what Ops Foundry helps accomplish, representative activities, indicative engagement structure, how the three service lines connect, and pilot CTA. |
| `/services/get-online` | `Get Online — Digital Presence & Web Foundations \| Ops Foundry` | SSG (`●` via `generateStaticParams`) | Service detail page covering Digital Presence & Web Foundations: editorial hero, business problem context, application of Managed Teams / Structured Workflows / AI-Enabled Tools, representative activities & deliverables, engagement scoping, client dependencies, and pilot CTA. |
| `/services/get-visible` | `Get Visible — Content, Communications & Discoverability \| Ops Foundry` | SSG (`●` via `generateStaticParams`) | Service detail page covering Content, Communications & Discoverability across the same structured 7-part commercial layout. |
| `/services/get-customers` | `Get Customers — Prospecting & Pipeline Operations \| Ops Foundry` | SSG (`●` via `generateStaticParams`) | Service detail page covering Prospecting & Pipeline Operations across the same structured 7-part commercial layout. |
| `/how-we-work` | `How We Work — Ops Foundry` | Static (`○`) | Explains how Managed Teams, Structured Workflows, and AI-Enabled Tools operate together; presents the 4-stage model (*Intake & Scoping*, *Workflow Architecture*, *Pod Deployment*, *Review & Handover*) explicitly as a proposed/indicative framework; details the 5 practical governance agreements (*Scope*, *Deliverables*, *Responsibilities & Dependencies*, *Quality Checks*, *Reporting & Communication*). |
| `/about` | `About Ops Foundry — Human-AI Operational Infrastructure` | Static (`○`) | Explains what Ops Foundry is, why it exists, the three operational bottlenecks it addresses, its Human + AI operational philosophy, and an explicit Company Profile & Governance Note. |
| `/partners` | `For Partners — Ops Foundry` | Static (`○`) | Outlines potential collaboration across all 5 approved partner categories (*Business Support Organisations*, *Technology Providers*, *Training & Education Partners*, *Corporate Organisations*, *Ecosystem & Institutional Partners*), how partnership conversations are structured, and a partnership CTA. |
| `/pilot` | `Explore a Pilot — Ops Foundry` | Static (`○`) | Explains what a scoped pilot is, covers all 10 required governance dimensions (*Business Problem*, *Proposed Scope*, *Deliverables*, *Exclusions*, *Timeline*, *Client Dependencies*, *Fees*, *Quality Assurance*, *Reporting*, *Success Criteria*), and provides the client-side Pilot Consultation Brief validation interface. |
| `/sitemap.xml` | Metadata Route (`sitemap.ts`) | Static (`○`) | Lists all 9 public Corporate routes using a configurable `NEXT_PUBLIC_CORPORATE_URL` fallback (`http://localhost:3000`). |
| `/robots.txt` | Metadata Route (`robots.ts`) | Static (`○`) | Configures crawler access (`Allow: /`) and references `/sitemap.xml`. |

---

## 2. Files Created or Modified

### Created Files
- `apps/corporate/src/content/services.ts` — Git-managed structured copy for `/services` (`servicesOverviewContent`) and `/services/[slug]` (`serviceDetailsBySlug` for `get-online`, `get-visible`, `get-customers`).
- `apps/corporate/src/content/supporting-pages.ts` — Git-managed structured copy for `/how-we-work` (`howWeWorkPageContent`), `/about` (`aboutPageContent`), `/partners` (`partnersPageContent`), and `/pilot` (`pilotPageContent`).
- `apps/corporate/src/app/services/page.tsx` — Services Overview page component and route metadata.
- `apps/corporate/src/app/services/[slug]/page.tsx` — Dynamic SSG route for `/services/get-online`, `/services/get-visible`, and `/services/get-customers` with `generateStaticParams()`, `dynamicParams = false`, and `generateMetadata()`.
- `apps/corporate/src/app/how-we-work/page.tsx` — How We Work page component and route metadata.
- `apps/corporate/src/app/about/page.tsx` — About Ops Foundry page component and route metadata.
- `apps/corporate/src/app/partners/page.tsx` — For Partners page component and route metadata.
- `apps/corporate/src/components/pilot-intake-form.tsx` — Client-side Pilot Consultation Brief form component with accessible labels, field-level validation, error summary (`role="alert"`), and an explicit local validation preview (`Local Preview Only (Phase 3D Pending)`).
- `apps/corporate/src/app/pilot/page.tsx` — Explore a Pilot page component rendering the 10 governance dimensions and `<PilotIntakeForm />`.
- `apps/corporate/src/app/sitemap.ts` — Next.js App Router sitemap generator.
- `apps/corporate/src/app/robots.ts` — Next.js App Router robots generator.
- `design/architecture/PHASE_3B_2_CORPORATE_SUPPORTING_PAGES_REPORT.md` — This implementation and verification report.

### Modified Files
- `apps/corporate/src/content/homepage.ts` — Updated header navigation items, service pillar links, and homepage CTAs to point to the live supporting routes (`/services`, `/services/get-online`, `/services/get-visible`, `/services/get-customers`, `/how-we-work`, `/about`, `/partners`, `/pilot`).
- `apps/corporate/src/components/corporate-header.tsx` — Replaced static anchor tags with `next/link` and `usePathname()` active-route detection (`aria-current="page"`), highlighting active top-level links and active child items inside the `Services` dropdown and mobile navigation drawer; removed `(Planned)` badges from implemented routes.
- `apps/corporate/src/components/corporate-footer.tsx` — Updated all Service Lines, Company, and Ecosystem footer links to use `next/link` and resolve to real routes with zero `href="#"` placeholders.
- `apps/corporate/src/app/page.tsx` — Updated homepage hero, service cards, operating model, partners, and bottom CTA links to use `next/link` pointing to the new supporting routes.
- `apps/corporate/src/app/layout.tsx` — Added `metadataBase` configured via `process.env.NEXT_PUBLIC_CORPORATE_URL || 'http://localhost:3000'`.

---

## 3. Content Governance Compliance Summary

All supporting page copy was authored in Git-managed content modules (`apps/corporate/src/content/services.ts` and `apps/corporate/src/content/supporting-pages.ts`) and verified against the project's content governance rules:

1. **No Unverified Claims or Fabricated Social Proof:**
   - Zero fabricated client logos, testimonials, case studies, revenue/conversion percentages, staff headcount claims, or awards appear on any page.
   - `/about` includes an explicit *Company Profile & Governance Note* explaining that Ops Foundry does not publish placeholder biographies, fabricated logos, or unverified statistics.
2. **No Invented Pricing, Fixed Timelines, or Unconditional Guarantees:**
   - All service pages (`/services`, `/services/get-online`, `/services/get-visible`, `/services/get-customers`) explicitly label their activities and deliverables as **representative examples** subject to individual pilot scoping rather than automatic inclusions.
   - `/pilot` includes an explicit commercial outcomes disclaimer stating that Ops Foundry does not promise guaranteed revenue, guaranteed customer acquisition numbers, or guaranteed conversion rates.
3. **Operating Model Framed as Proposed / Indicative (`/how-we-work`):**
   - The 4-stage model (*Stage 1: Intake & Scoping*, *Stage 2: Workflow Architecture*, *Stage 3: Pod Deployment*, *Stage 4: Review & Handover*) is accompanied by a prominent `role="note"` disclaimer stating that the model is a proposed, indicative framework subject to final business approval and individual engagement scoping.
4. **All 10 Pilot Governance Dimensions Covered (`/pilot`):**
   - Explicitly documents: `01 Business Problem`, `02 Proposed Scope`, `03 Deliverables`, `04 Exclusions`, `05 Timeline`, `06 Client Dependencies`, `07 Fees`, `08 Quality Assurance`, `09 Reporting`, and `10 Success Criteria`.
5. **Honest Frontend Form Handling (`/pilot`):**
   - `PilotIntakeForm` performs client-side validation without calling `window.alert()` and without faking a backend submission.
   - Both the top status banner and the post-validation summary region explicitly state that live server submission, Cloudflare Turnstile verification, and durable PostgreSQL/outbox persistence are scheduled for Phase 3D and that **no inquiry has been sent or recorded**.
6. **Headline-First Editorial Hierarchy:**
   - Zero eyebrow labels above headings and zero decorative monospace tags were used across the new supporting pages.

---

## 4. Navigation and Footer Changes

- **Header Navigation (`CorporateHeader`):**
  - Top-level links: `Home` (`/`), `Services` dropdown (`/services`, `/services/get-online`, `/services/get-visible`, `/services/get-customers`), `How We Work` (`/how-we-work`), `About` (`/about`), `For Partners` (`/partners`), `Ops Foundry Academy` (`/#academy`), and the primary CTA button `Explore a Pilot` (`/pilot`).
  - Active route state: Uses `usePathname()` to apply `aria-current="page"` and `text-foundry-orange` to the active route on both desktop and mobile. Visiting any `/services/*` route highlights the `Services` parent trigger as well as the specific active link inside the dropdown and mobile drawer.
  - Keyboard and screen-reader support: Escape key closes open menus and returns focus to the trigger button; outside click closes the desktop dropdown; route changes automatically close open drawers/dropdowns.
- **Footer Navigation (`CorporateFooter`):**
  - *Service Lines*: `Services Overview` (`/services`), `Get Online` (`/services/get-online`), `Get Visible` (`/services/get-visible`), `Get Customers` (`/services/get-customers`).
  - *Company*: `How We Work` (`/how-we-work`), `About Ops Foundry` (`/about`), `For Partners` (`/partners`), `Explore a Pilot` (`/pilot`).
  - *Ecosystem*: `Ops Foundry Academy` (`/#academy`), `Start a Pilot Consultation` (`/pilot`).

---

## 5. SEO Metadata, Sitemap & Robots Summary

- **Unique Page Metadata:** Every route exports a distinct `title`, `description`, and `openGraph` configuration (`title`, `description`, `type: 'website'`). Dynamic service routes use `generateMetadata()` in `apps/corporate/src/app/services/[slug]/page.tsx`.
- **Configurable Base URL:** `apps/corporate/src/app/layout.tsx`, `sitemap.ts`, and `robots.ts` read `process.env.NEXT_PUBLIC_CORPORATE_URL` and fall back to `http://localhost:3000` for local development without inventing an unapproved production domain.
- **Sitemap (`/sitemap.xml`):** Statically generated at build time containing all 9 public Corporate routes (`/`, `/services`, `/services/get-online`, `/services/get-visible`, `/services/get-customers`, `/how-we-work`, `/about`, `/partners`, `/pilot`).
- **Robots (`/robots.txt`):** Statically generated at build time allowing all user agents (`Allow: /`) and pointing to `${BASE_URL}/sitemap.xml`.

---

## 6. Build, Typecheck & Test Results

Executed across the monorepo workspace:

1. **`pnpm.cmd typecheck`** — **PASSED** (`11/11` tasks successful across `@opsfoundry/tokens`, `@opsfoundry/types`, `@opsfoundry/db`, `@opsfoundry/ui`, `corporate`, `academy`, `worker`).
2. **`pnpm.cmd build`** — **PASSED** (`7/7` build tasks successful). Next.js 16.4.6 (Turbopack) statically prerendered all 13 Corporate app paths:
   - `○ /`
   - `○ /_not-found`
   - `○ /about`
   - `○ /how-we-work`
   - `○ /partners`
   - `○ /pilot`
   - `○ /robots.txt`
   - `○ /services`
   - `● /services/get-online`
   - `● /services/get-visible`
   - `● /services/get-customers`
   - `○ /sitemap.xml`
3. **`pnpm.cmd --filter @opsfoundry/db test`** — **PASSED** (`6/6` runtime role client isolation unit tests passed).

---

## 7. Responsive Browser QA Results (`1440×900`, `768×1024`, `390×844`)

Live browser verification was performed against the production server running at `http://localhost:3001` across Desktop (`1440 × 900`), Tablet (`768 × 1024`), and Mobile (`390 × 844`):

| Route | HTTP Status | Desktop (`1440×900`) Overflow Check | Tablet (`768×1024`) Overflow Check | Mobile (`390×844`) Overflow Check | Images Loaded (`naturalWidth > 0`) | Active Nav State (`aria-current="page"`) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `6 / 6` (`PASS`) | `Home` (`PASS`) |
| `/services` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `3 / 3` (`PASS`) | `Services` + `Services Overview` (`PASS`) |
| `/services/get-online` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `Services` + `Get Online` (`PASS`) |
| `/services/get-visible` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `Services` + `Get Visible` (`PASS`) |
| `/services/get-customers` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `Services` + `Get Customers` (`PASS`) |
| `/how-we-work` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `How We Work` (`PASS`) |
| `/about` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `About` (`PASS`) |
| `/partners` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `0 / 0` (`PASS`) | `For Partners` (`PASS`) |
| `/pilot` | `200` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `0 / 0` (`PASS`) | `Explore a Pilot` (`PASS`) |
| `/sitemap.xml` | `200` | Valid XML (`PASS`) | N/A | N/A | N/A | N/A |
| `/robots.txt` | `200` | Valid robots rules (`PASS`) | N/A | N/A | N/A | N/A |

### Host-Verified Browser Evidence
- `/services` Desktop (`1440×900`): `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_97.png`
- `/how-we-work` Mobile (`390×844` — Proposed Four-Stage Operating Model notice): `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_103.png`
- `/pilot` Desktop (`1440×900` — Validated Client-Side Summary State): `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_91.png`

---

## 8. Remaining Phase 3D Integration Hooks for Live Pilot Submission

`apps/corporate/src/components/pilot-intake-form.tsx` is structured so Phase 3D can wire live persistence without redesigning the page or form fields:

1. **Shared Zod Schema Alignment:** The form fields (`fullName`, `email`, `organization`, `phone`, `serviceInterest`, and `businessProblem` / `dependenciesAndTimeline`) map directly to `CorporateInquirySchema` in `packages/types/src/inquiry.ts`.
2. **Cloudflare Turnstile Slot:** Phase 3D will mount the Cloudflare Turnstile widget above the submit action bar to populate `turnstileToken` and generate a client-side `idempotencyKey` (`crypto.randomUUID()`).
3. **Server Action / Route Handler Wiring (`ops_corp_runtime`):** Phase 3D will connect `handleSubmit` to a Next.js Server Action or `/api/inquiries` endpoint that invokes `getCorpDb()` (`ops_corp_runtime`) and `submitCorporateInquiryWithOutbox()` from `@opsfoundry/db` to atomically insert the inquiry and enqueue the transactional outbox notification.
