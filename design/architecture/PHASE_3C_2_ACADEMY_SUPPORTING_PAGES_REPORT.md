# Phase 3C.2 Implementation Report — Ops Foundry Academy Supporting Pages & Navigation

**Date:** 2026-11-16
**Phase:** Phase 3C.2 (Academy Supporting Pages, Navigation, SEO & Responsive QA)
**Application Scope:** `apps/academy`
**Base Commit Inspected:** `ddd9d30fa159a14a7bd7d26cecbf4d737f72b907` (`master`, parent `720d33245822aaf1cd298ad8a5726252f5d64f39`)

---

## 1. Routes Implemented

Phase 3C.2 expands `apps/academy` from a single-page foundation into a complete public-facing learning website with dedicated App Router routes, while keeping `apps/corporate` untouched:

| Route | Page Title | Static Generation Mode | Purpose & Key Sections |
| :--- | :--- | :--- | :--- |
| `/` | `Ops Foundry Academy — Build Practical Skills for Real Work` | Static (`○`) | Academy homepage (preserved from Phase 3C.1; updated navigation, hero, programme cards, and admissions CTAs to point to the dedicated supporting routes). |
| `/programmes` | `Programmes — Ops Foundry Academy` | Static (`○`) | Programmes Catalogue presenting the three planned programme tracks (`Programme Track 01`, `Programme Track 02`, `Programme Track 03`), an explicit *Programme Specification Status* notice, shared Academy standards, and an admissions CTA. |
| `/programmes/programme-one` | `Programme Track 01 — Ops Foundry Academy` | SSG (`●` via `generateStaticParams`) | Individual detail route for `COURSE_01` with transparent pending-confirmation status table, the 5 specification areas being finalised, the 6 Academy learning principles, and links to the other two planned tracks. |
| `/programmes/programme-two` | `Programme Track 02 — Ops Foundry Academy` | SSG (`●` via `generateStaticParams`) | Individual detail route for `COURSE_02` following the same structured specification and governance layout. |
| `/programmes/programme-three` | `Programme Track 03 — Ops Foundry Academy` | SSG (`●` via `generateStaticParams`) | Individual detail route for `COURSE_03` following the same structured specification and governance layout. |
| `/how-we-learn` | `How We Learn — Ops Foundry Academy` | Static (`○`) | Explains the Academy's learning philosophy across the six established principles (*Practical Learning*, *Structured Development*, *Learning by Doing*, *Relevant Skills*, *Application of Knowledge*, *Continuous Improvement*) and includes an explicit programme-delivery governance note. |
| `/admissions` | `Admissions — Ops Foundry Academy` | Static (`○`) | Explains the learner admissions journey, the *Cohort Applications Are Currently Being Prepared* status banner, the 4-stage admissions process, direct preferred-programme selection by applicants, application guidance, and a transparent preview of the planned application fields. |
| `/about` | `About — Ops Foundry Academy` | Static (`○`) | Explains what Ops Foundry Academy is, its four practical focus areas, its relationship and distinction with Ops Foundry (`#ops-foundry-ecosystem`), and its commitment to factual transparency. |
| `/sitemap.xml` | Metadata Route (`sitemap.ts`) | Static (`○`) | Statically generated XML sitemap containing all 8 public Academy HTML routes. |
| `/robots.txt` | Metadata Route (`robots.ts`) | Static (`○`) | Statically generated crawler configuration (`Allow: /`) referencing `/sitemap.xml`. |

---

## 2. Files Created and Modified

### Created Files (`9`)
- `apps/academy/src/content/site-config.ts` — Environment-aware URL resolution (`getConfiguredAcademyUrl()`, `getAcademyMetadataBase()`, `getAcademySitemapOrigin()`, `getCorporateWebsiteLink()`) ensuring zero hardcoded `localhost` URLs are emitted in production navigation or production HTML metadata.
- `apps/academy/src/content/supporting-pages.ts` — Git-managed structured content for `/how-we-learn` (`howWeLearnPageContent`), `/admissions` (`admissionsPageContent`), and `/about` (`aboutAcademyPageContent`).
- `apps/academy/src/components/programme-card.tsx` — Reusable programme card component shared by the homepage preview, `/programmes` catalogue, and `/programmes/[slug]` cross-links.
- `apps/academy/src/app/programmes/page.tsx` — Programmes Catalogue route and metadata.
- `apps/academy/src/app/programmes/[slug]/page.tsx` — Dynamic SSG route for `/programmes/programme-one`, `/programmes/programme-two`, and `/programmes/programme-three` (`generateStaticParams`, `dynamicParams = false`, `generateMetadata`).
- `apps/academy/src/app/how-we-learn/page.tsx` — How We Learn route and metadata.
- `apps/academy/src/app/admissions/page.tsx` — Admissions route and metadata.
- `apps/academy/src/app/about/page.tsx` — About Ops Foundry Academy route and metadata.
- `apps/academy/src/app/sitemap.ts` — Next.js App Router sitemap generator.
- `apps/academy/src/app/robots.ts` — Next.js App Router robots generator.
- `design/architecture/PHASE_3C_2_ACADEMY_SUPPORTING_PAGES_REPORT.md` — This implementation and verification report.

### Modified Files (`7`)
- `apps/academy/src/content/programmes.ts` — Expanded with `getProgrammeBySlug()`, `programmesCataloguePageContent`, `overviewParagraphs`, and `pendingSpecificationItems` for `COURSE_01`, `COURSE_02`, and `COURSE_03`.
- `apps/academy/src/content/homepage.ts` — Updated `academyNavigation` and homepage CTAs to point directly to `/programmes`, `/how-we-learn`, `/admissions`, and `/about`, and wired `corporateCrossLink` through `getCorporateWebsiteLink()`.
- `apps/academy/src/components/programme-preview.tsx` — Updated to render `ProgrammeCard` linking each track to `/programmes/[slug]`.
- `apps/academy/src/components/academy-header.tsx` — Updated active-state detection (`pathname === item.href || pathname.startsWith(`${item.href}/`)`) so `/programmes/*` highlights `Programmes` and `/admissions` highlights both `Admissions` and `Apply Now`; added internal/external rendering for `corporateCrossLink`.
- `apps/academy/src/components/academy-mobile-navigation.tsx` — Updated active-state matching and `corporateCrossLink` handling to match desktop header behaviour.
- `apps/academy/src/components/academy-footer.tsx` — Updated Programme links to point to `/programmes` and `/programmes/programme-one`..`programme-three`, Admissions links to `/admissions`, and `Corporate Website` to use `corporateCrossLink`.
- `apps/academy/src/app/layout.tsx` — Updated `metadataBase` to use `getAcademyMetadataBase()` and added `alternates: { canonical: '/' }`.

*(Zero files in `apps/corporate`, `packages/*`, or root workspace configuration were modified.)*

---

## 3. Programme Content Architecture

- **Type-Safe & Git-Managed:** `apps/academy/src/content/programmes.ts` defines `AcademyProgrammeSlot` extending `ProgrammeFrontmatter` from `@opsfoundry/types`, keyed by `CourseCodeSchema` (`'COURSE_01'`, `'COURSE_02'`, `'COURSE_03'`) and stable URL slugs (`'programme-one'`, `'programme-two'`, `'programme-three'`).
- **Honest Pending-Confirmation States:** Because official programme names, detailed syllabi, durations, prerequisites, schedules, and tuition have not yet been confirmed, neither `/programmes` nor `/programmes/[slug]` presents placeholder names as approved course titles. Instead, each page displays:
  - Explicit track identifiers (`Programme Track 01`, `Programme Track 02`, `Programme Track 03`) and `Details Being Finalised` status badges.
  - A structured *Current Specification Status* table showing `Pending confirmation` / `Pending final confirmation`.
  - Five explicit specification cards (*Official Programme Title & Focus*, *Curriculum & Practical Exercises*, *Duration & Schedule*, *Prerequisites & Preparation*, *Tuition & Financial Information*) ready to be populated once approved.

---

## 4. Admissions Experience

- **Clear 4-Stage Admissions Journey (`/admissions`):**
  1. *Stage 01: Explore Available Programmes*
  2. *Stage 02: Select Your Preferred Programme*
  3. *Stage 03: Complete Your Application Information*
  4. *Stage 04: Application Review & Next Steps*
- **Direct Learner Programme Selection:** Explicitly explains that applicants choose their preferred programme track directly during application rather than taking an unapproved entrance examination, mandatory pre-test, or receiving an automatic course assignment.
- **Honest Application Preparation Status:** Displays a prominent status notice (`Cohort Applications Are Currently Being Prepared`) and a structured preview of what the application form will cover (*Contact Information*, *Preferred Programme Track*, *Learning Motivation & Background* aligned with `AdmissionsSubmissionSchema` in `@opsfoundry/types`), while stating clearly that live form submission and database persistence are not active yet.

---

## 5. SEO & Cross-Property URL Implementation

- **Per-Page Metadata & Canonical URLs:** Every route defines a unique `title`, `description`, `openGraph`, and `alternates.canonical` path (`/`, `/programmes`, `/programmes/programme-one`, `/programmes/programme-two`, `/programmes/programme-three`, `/how-we-learn`, `/admissions`, `/about`).
- **Zero Hardcoded `localhost` in Production HTML:**
  - `getAcademyMetadataBase()` in `apps/academy/src/content/site-config.ts` sets `metadataBase` when `NEXT_PUBLIC_ACADEMY_URL` (or Vercel deployment env vars) is configured, or in `NODE_ENV === 'development'`, and returns `undefined` in unconfigured local production builds so relative canonical tags never emit `http://localhost:3001` in production HTML.
  - `getCorporateWebsiteLink()` uses `NEXT_PUBLIC_CORPORATE_URL` when configured, `http://localhost:3000` only in `NODE_ENV === 'development'`, and `/about#ops-foundry-ecosystem` in unconfigured production builds so no `http://localhost:3000` link is ever left in production navigation.
- **`sitemap.ts` & `robots.ts`:** Statically generate `/sitemap.xml` (all 8 Academy routes) and `/robots.txt`.

---

## 6. Responsive Browser QA (`1440×900`, `768×1024`, `390×844`)

Live browser verification was executed against `http://localhost:3001` across Desktop (`1440 × 900`), Tablet (`768 × 1024`), and Mobile (`390 × 844`):

| Route | HTTP Status | `<link rel="canonical">` | Active Header State (`aria-current="page"`) | Desktop (`1440px`) Overflow | Tablet (`768px`) Overflow | Mobile (`390px`) Overflow | Images (`naturalWidth > 0`) | Console Errors |
| :--- | :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `/` | `200` | `/` | `Home` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `0` |
| `/programmes` | `200` | `/programmes` | `Programmes` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `0 / 0` (`PASS`) | `0` |
| `/programmes/programme-one` | `200` | `/programmes/programme-one` | `Programmes` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `0 / 0` (`PASS`) | `0` |
| `/programmes/programme-two` | `200` | `/programmes/programme-two` | `Programmes` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `0 / 0` (`PASS`) | `0` |
| `/programmes/programme-three` | `200` | `/programmes/programme-three` | `Programmes` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `0 / 0` (`PASS`) | `0` |
| `/how-we-learn` | `200` | `/how-we-learn` | `How We Learn` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `0` |
| `/admissions` | `200` | `/admissions` | `Admissions`, `Apply Now` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `0 / 0` (`PASS`) | `0` |
| `/about` | `200` | `/about` | `About` | `PASS` (`1425 <= 1440`) | `PASS` (`753 <= 768`) | `PASS` (`375 <= 390`) | `1 / 1` (`PASS`) | `0` |
| `/sitemap.xml` | `200` | Valid XML (`8` URLs) | N/A | `PASS` | `PASS` | `PASS` | N/A | `0` |
| `/robots.txt` | `200` | Valid rules | N/A | `PASS` | `PASS` | `PASS` | N/A | `0` |

---

## 7. Typecheck, Build, Test & Diff Verification Results

1. **`pnpm.cmd typecheck`:** **PASSED** (`11/11` packages successful).
2. **`pnpm.cmd build`:** **PASSED** (`7/7` build tasks successful).
   - `academy:build`: Statically generated `12/12` app paths (`/`, `/_not-found`, `/about`, `/admissions`, `/how-we-learn`, `/programmes`, `/programmes/programme-one`, `/programmes/programme-two`, `/programmes/programme-three`, `/robots.txt`, `/sitemap.xml`).
   - `corporate:build`: Unchanged (`13/13` static pages).
3. **`pnpm.cmd --filter @opsfoundry/db test`:** **PASSED** (`6/6` runtime role isolation tests).
4. **`git diff --check`:** **PASSED** (`0` whitespace issues).

---

## 8. Outstanding Issues

- **None.** All routes, navigation states, content governance rules, SEO metadata, and responsive viewports passed verification with zero regressions.

---

## 9. Host-Verified Screenshots

- **Desktop (`1440 × 900`, `/programmes`):** `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_133.png`
- **Tablet (`768 × 1024`, `/admissions`):** `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_139.png`
- **Mobile (`390 × 844`, `/how-we-learn`):** `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_145.png`

---

## 10. Recommended Next Milestone

1. **Review & Git Checkpoint for Phase 3C.2:** Review the live Academy supporting pages at `http://localhost:3001` and this report, then authorize a Git commit and push of the Phase 3C.1 + 3C.2 Academy commits to `origin/main`.
2. **Independent Vercel Deployment (`apps/academy`) or Phase 3D (Transactional Intake & Outbox Integration):** Once pushed to `origin/main`, `apps/academy` is ready to be deployed as a separate Vercel project (Root Directory: `apps/academy`), followed by Phase 3D backend persistence for Corporate pilot inquiries (`ops_corp_runtime`) and Academy admissions applications (`ops_intake_runtime`).
