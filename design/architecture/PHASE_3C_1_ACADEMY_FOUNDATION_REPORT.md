# Phase 3C.1 Implementation Report — Ops Foundry Academy Foundation, Navigation & Homepage

**Date:** 2026-11-16
**Phase:** Phase 3C.1 (Academy Foundation, Navigation & Homepage)
**Application Scope:** `apps/academy`
**Base Commit Inspected:** `720d33245822aaf1cd298ad8a5726252f5d64f39` (`main`)

---

## 1. Summary of What Was Implemented

Phase 3C.1 transforms the `apps/academy` Next.js 16.4.6 foundation shell into a complete, responsive, production-quality **Ops Foundry Academy** homepage and navigation foundation while keeping `apps/corporate` untouched:

1. **Dedicated Academy Navigation (`AcademyHeader` & `AcademyMobileNavigation`):**
   - Brand lockup: Foundry Orange indicator dot + `Ops Foundry` display wordmark + `Academy` Deep Slate pill badge (`#1E232E`).
   - Primary navigation items: `Home` (`/`), `Programmes` (`/#programmes`), `How We Learn` (`/#how-we-learn`), `Admissions` (`/#admissions`), and `About` (`/#about`), with active route indication (`aria-current="page"`) and reserved `plannedRoute` mappings (`/programmes`, `/how-we-learn`, `/admissions`, `/about`) ready for Phase 3C.2 supporting pages.
   - Cross-property link: `Corporate Website ↗` pointing to `NEXT_PUBLIC_CORPORATE_URL || 'http://localhost:3000'` (never an anchor on the Academy homepage).
   - Primary CTA: `Apply Now` (`/#admissions`).
   - Accessible mobile drawer (`#academy-mobile-menu`) with `aria-expanded`, `aria-controls`, Escape-key dismissal, and route-click auto-close.
2. **Editorial Hero Section (`AcademyHero`):**
   - Headline: *"Build practical skills. Become ready for real work."*
   - Supporting copy: *"Ops Foundry Academy helps people develop relevant, practical skills through structured learning, hands-on application and a focus on the demands of modern work."*
   - Primary CTA: `Explore Programmes` (`/#programmes`); Secondary CTA: `How Learning Works` (`/#how-we-learn`).
   - Three grounded learning highlights (*Structured Learning*, *Hands-On Application*, *Modern Work Readiness*) paired with a documentary-style collaborative workspace visual and Academy Deep Slate caption block.
3. **Academy Introduction (`#about`):**
   - Positions Ops Foundry Academy as the learning and professional development arm of the Ops Foundry ecosystem focused on practical capability and real-world readiness.
   - Includes an explicit *Clear & Honest Expectations* notice (`role="note"`) stating that participation or completion of an Academy programme does not guarantee employment, automatic recruitment into Ops Foundry, or guaranteed external job placement.
4. **Learning Philosophy (`LearningPrinciples`, `#how-we-learn`):**
   - Set on Academy Deep Slate (`#1E232E`), communicating the six core learning principles:
     1. *Practical Learning*
     2. *Structured Development*
     3. *Learning by Doing*
     4. *Relevant Skills*
     5. *Application of Knowledge*
     6. *Continuous Improvement*
   - Includes a governance note clarifying that delivery formats, schedules, and review criteria vary by programme and will be published alongside each confirmed course specification.
5. **Programmes Preview (`ProgrammePreview`, `#programmes`):**
   - Driven by `plannedAcademyProgrammes` in `apps/academy/src/content/programmes.ts` (typed against `ProgrammeFrontmatter` and `CourseCodeSchema` from `@opsfoundry/types`).
   - Introduces the three planned programme tracks (`Programme Track 01`, `Programme Track 02`, `Programme Track 03`) with explicit pending-confirmation metadata (`Official Title: Pending confirmation`, `Duration & Schedule: To be confirmed`, `Prerequisites & Tuition: To be confirmed`) and zero fabricated course titles, durations, tuition rates, prerequisites, or schedules.
   - Includes the `View All Programmes` CTA.
6. **Who the Academy Is For (`#who-it-is-for`):**
   - Introduces three intended learner profiles (*People Preparing for Modern Work*, *Professionals Developing New Capabilities*, *Career Switchers Seeking Practical Grounding*) without inventing age restrictions or unsupported academic prerequisites.
7. **Admissions Preview & Final CTA (`AdmissionsCta`, `#admissions`):**
   - Outlines the 3-step admissions flow (*Step 01: Explore Available Programmes*, *Step 02: Select Your Preferred Programme*, *Step 03: Submit Your Application Details*), emphasizing that applicants select their preferred programme directly during application rather than facing an unapproved entrance exam or automatic assignment.
   - Includes the `Explore Admissions` CTA.
   - Closes with the Final CTA section on Academy Deep Slate (`"Your next chapter starts with what you learn today."` + `Explore the Academy`).
8. **Dedicated Academy Footer (`AcademyFooter`):**
   - Set on Academy Deep Slate (`#1E232E`) with Academy identity, Academy navigation links, Programme track links, Admissions & Ecosystem links (`Admissions Overview`, `Apply Now`, `Corporate Website ↗`), copyright notice, and an explicit governance note rather than invented email addresses, phone numbers, or physical addresses.

---

## 2. Files Created

- `apps/academy/src/content/homepage.ts` — Git-managed structured content for Academy navigation, cross-property URLs (`CORPORATE_WEBSITE_URL`, `ACADEMY_WEBSITE_URL`), hero, introduction, learning philosophy, programmes preview, learner audience profiles, admissions preview, final CTA, and footer.
- `apps/academy/src/content/programmes.ts` — Git-managed structured programme slots (`COURSE_01`, `COURSE_02`, `COURSE_03`) typed against `ProgrammeFrontmatter` from `@opsfoundry/types`.
- `apps/academy/src/components/section-heading.tsx` — Reusable editorial section heading component for Academy sections.
- `apps/academy/src/components/academy-mobile-navigation.tsx` — Accessible mobile navigation drawer component.
- `apps/academy/src/components/academy-header.tsx` — Sticky Academy header component with brand lockup, primary navigation, cross-property Corporate link, and mobile drawer toggle.
- `apps/academy/src/components/academy-hero.tsx` — Academy homepage hero component.
- `apps/academy/src/components/learning-principles.tsx` — Academy Deep Slate 6-principle Learning Philosophy section component.
- `apps/academy/src/components/programme-preview.tsx` — 3-track Programmes Preview section component.
- `apps/academy/src/components/admissions-cta.tsx` — Admissions Preview and Final CTA section component.
- `apps/academy/src/components/academy-footer.tsx` — Dedicated Academy Deep Slate footer component.
- `design/architecture/PHASE_3C_1_ACADEMY_FOUNDATION_REPORT.md` — This implementation and verification report.

---

## 3. Files Modified

- `apps/academy/src/app/globals.css` — Added `@source "../../../../packages/ui/src/**/*.{ts,tsx}";` so Tailwind CSS v4 compiles all utility classes used inside `@opsfoundry/ui`, plus `prefers-reduced-motion` smooth scrolling and brand selection styling.
- `apps/academy/src/app/layout.tsx` — Added `metadataBase` (using `process.env.NEXT_PUBLIC_ACADEMY_URL || 'http://localhost:3001'`), updated SEO title/description and OpenGraph metadata, and added a keyboard-accessible `Skip to main content` link (`#main-content`).
- `apps/academy/src/app/page.tsx` — Replaced the Phase 3A verification placeholder with the modular Phase 3C.1 Academy homepage.

*(Zero files in `apps/corporate`, `packages/*`, or root configs were modified.)*

---

## 4. Final Academy Route List (Phase 3C.1)

| Route / Target | Type | Destination in Phase 3C.1 | Reserved Phase 3C.2 Route |
| :--- | :--- | :--- | :--- |
| `/` | Static App Route (`○`) | Academy Homepage | `/` |
| `/#programmes` | Homepage Section Anchor | Programmes Preview section | `/programmes` |
| `/#how-we-learn` | Homepage Section Anchor | Learning Philosophy section | `/how-we-learn` |
| `/#admissions` | Homepage Section Anchor | Admissions Preview section | `/admissions` |
| `/#about` | Homepage Section Anchor | Academy Introduction section | `/about` |
| `Corporate Website` | External Cross-Property Link | `NEXT_PUBLIC_CORPORATE_URL` (fallback `http://localhost:3000`) | External Corporate App |

---

## 5. Design Decisions

1. **Direction C ("Shared Foundation, Distinct Personalities") Execution:**
   - While sharing the Ops Foundry token system (`@opsfoundry/tokens`), typography (`Manrope` + `Plus Jakarta Sans`), and UI primitives (`@opsfoundry/ui`), the Academy uses **Academy Deep Slate (`#1E232E`)** as its primary text tone, badge accent, and signature dark section/footer surface, visually distinguishing it from Corporate's industrial carbon black (`#111215`).
2. **Editorial, Institution-Grade Layout:**
   - Avoided generic online-course marketplace tropes (star ratings, price tags, countdown timers, or unverified badge clutter). Used generous whitespace, clear numbered progression cards, and documentary workspace photography.
3. **Zero-404 Progressive Navigation Architecture:**
   - Each item in `academyNavigation.items` carries both a live `href` (`/#programmes`, `/#how-we-learn`, `/#admissions`, `/#about`) so every header/footer link works immediately in Phase 3C.1, and a `plannedRoute` (`/programmes`, `/how-we-learn`, `/admissions`, `/about`) so Phase 3C.2 can switch to dedicated routes in one place.

---

## 6. Content Assumptions & Governance Compliance

- **No Fabricated Course Details:** The three planned courses (`COURSE_01`, `COURSE_02`, `COURSE_03`) are presented as planned programme tracks with explicit pending-confirmation notices for title, duration, schedule, prerequisites, and tuition.
- **No Employment Guarantees:** The Academy Introduction includes a prominent notice stating that programme participation or completion does not guarantee employment, automatic recruitment into Ops Foundry, or external job placement.
- **Learner-Selected Programme Preference:** The Admissions Preview explicitly states that applicants choose their preferred programme directly during application and does not introduce any unapproved entrance exam or automatic track assignment.
- **No Invented Contact Details or Social Proof:** Zero fabricated student testimonials, graduate stories, statistics, accreditation claims, email addresses, phone numbers, or physical addresses appear anywhere in the Academy application.

---

## 7. TypeScript Results

Executed `pnpm.cmd typecheck` across the monorepo workspace:
- **Result:** **PASSED** (`11/11` tasks successful across `@opsfoundry/tokens`, `@opsfoundry/types`, `@opsfoundry/db`, `@opsfoundry/ui`, `academy`, `corporate`, and `worker`).

---

## 8. Production Build & Test Results

1. **`pnpm.cmd build`:** **PASSED** (`7/7` build tasks successful).
   - `academy:build`: Next.js 16.4.6 (Turbopack) compiled in `1690ms`, finished TypeScript check in `476ms`, and statically prerendered `3/3` pages (`/` and `/_not-found`).
   - `corporate:build`: Unchanged (`13/13` static pages).
2. **`pnpm.cmd --filter @opsfoundry/db test`:** **PASSED** (`6/6` runtime role client isolation unit tests passed).

---

## 9. Browser QA Results (`http://localhost:3001`)

Live browser verification was executed against `http://localhost:3001` across Desktop (`1440 × 900`), Tablet (`768 × 1024`), and Mobile (`390 × 844`):

| Check Category | Desktop (`1440×900`) | Tablet (`768×1024`) | Mobile (`390×844`) | Status |
| :--- | :--- | :--- | :--- | :---: |
| **HTTP Status (`/`)** | `200` | `200` | `200` | `PASS` |
| **Horizontal Overflow (`scrollWidth <= innerWidth`)** | `1425px <= 1440px` (`false`) | `753px <= 768px` (`false`) | `375px <= 390px` (`false`) | `PASS` |
| **Header Alignment & Active State** | Single-line nav (`y=18px`), `Home` `aria-current="page"` | Brand lockup + hamburger toggle | Brand lockup + hamburger toggle | `PASS` |
| **Mobile Drawer (`#academy-mobile-menu`)** | Hidden on `lg+` | Opens on click (`aria-expanded="true"`), closes on `Escape` | Opens on click (`aria-expanded="true"`), closes on `Escape` | `PASS` |
| **Cross-Property Link (`Corporate Website`)** | Points to `http://localhost:3000` | Inside drawer (`http://localhost:3000`) | Inside drawer (`http://localhost:3000`) | `PASS` |
| **Hero Image (`naturalWidth > 0`)** | Loaded (`459×482px`, HTTP `200`) | Loaded (`naturalWidth > 0`) | Loaded (`naturalWidth > 0`) | `PASS` |
| **All 8 Homepage Sections Rendered** | Verified (Hero -> Footer) | Verified (Hero -> Footer) | Verified (Hero -> Footer) | `PASS` |
| **Browser Console Errors** | `0` | `0` | `0` | `PASS` |

---

## 10. Host-Verified Screenshots (Desktop, Tablet & Mobile)

- **Desktop (`1440 × 900`):** `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_110.png`
- **Tablet (`768 × 1024`):** `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_116.png`
- **Mobile (`390 × 844`):** `C:/Users/Admin/.gemini/antigravity/brain/f27100ea-57e3-4553-af73-bbfcd2514d12/browser_evidence/de1ec5d3-be19-4254-a668-5fea72e6e7c9/final_step_122.png`

---

## 11. Outstanding Issues

- **None.** All TypeScript, Turborepo build, content governance, accessibility, and responsive viewport checks passed with zero regressions.

---

## 12. Recommended Next Milestone

1. **Review & Git Checkpoint for Phase 3C.1:** Review the live Academy homepage at `http://localhost:3001` and this report, then authorize a Git commit/push checkpoint (and optional independent Vercel project setup for `apps/academy`).
2. **Proceed to Phase 3C.2 (Academy Supporting Pages):** Implement the dedicated Academy supporting pages (`/programmes`, `/programmes/[slug]`, `/how-we-learn`, `/admissions`, `/about`, plus `sitemap.ts` and `robots.ts`) and switch `academyNavigation` links from homepage section anchors to the dedicated routes.
