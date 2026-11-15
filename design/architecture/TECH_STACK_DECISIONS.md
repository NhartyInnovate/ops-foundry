# OPS FOUNDRY — PRODUCTION TECHNOLOGY STACK DECISIONS
**Technical Evaluation, Dependency Matrix & Architectural Standards**  
**Document Location:** `design/architecture/TECH_STACK_DECISIONS.md`  
**Phase:** Phase 3 — Production Architecture & Implementation Planning  
**Status:** Canonical Technical Specification (Final Security & Version Consistency)  
**Date:** November 15, 2026  

---

## 1. Governance Principles & Confirmed Decisions

All technical selections for Ops Foundry adhere to five foundational architectural principles:

1. **Commercial Credibility & Speed:** Sub-second page loads, Lighthouse scores of 95+, and zero Cumulative Layout Shift (CLS). The technical infrastructure must project institutional authority.
2. **Strict Design Token Enforcement (Direction C):** Enforces shared brand foundations (Manrope, Plus Jakarta Sans, Foundry Orange `#FF5A1F`, off-white `#FBFBF9`) while granting full styling autonomy between Corporate (Carbon Black `#111215`) and Academy (Scholastic Slate `#1E232E`).
3. **Durable Data Integrity (Transactional Outbox):** Zero inquiry or application loss. Admissions applications (or corporate inquiries), initial audit entries, and outbound notification jobs are written in a **single atomic PostgreSQL transaction** before success receipts are returned to users.
4. **Decoupled Growth Paths:** Technology must allow the Academy to grow in future phases (applicant tracking, private admin dashboard in `apps/admin`) without impacting the Corporate commercial website.
5. **Least-Privilege Security & PII Minimization:** Database roles enforce strict least privilege. The notification worker (`apps/worker`) processes only the minimal notification fields required for delivery, with full application records isolated from worker access.

### Decision Classification Legend:
Throughout this specification, all architectural choices are explicitly tagged:
* `[Confirmed]`: Formally approved by stakeholders and design review.
* `[Recommended]`: Technically evaluated engineering recommendation requiring stakeholder sign-off prior to Phase 3A scaffolding.
* `[Pending stakeholder approval]`: Commercial, operational, or legal decision requiring stakeholder review.

---

## 2. Production Technology Stack Matrix (Pinned Compatible Versions)

Each dependency has been evaluated against official release documentation and verified for cross-stack compatibility as of November 15, 2026. The stack utilizes **strictly one pinned compatible version per dependency**:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                           OPS FOUNDRY PRODUCTION TECHNOLOGY MATRIX                          │
├──────────────────────┬───────────────────────────────┬─────────────────┬────────────────────┤
│ Layer                │ Selected Technology           │ Status          │ Pinned Version     │
├──────────────────────┼───────────────────────────────┼─────────────────┼────────────────────┤
│ Runtime Environment  │ Node.js LTS (Active/Jod)      │ [Confirmed]     │ 22.12.0 LTS        │
│ Package Manager      │ pnpm                          │ [Confirmed]     │ 12.19.0            │
│ Monorepo Engine      │ Turborepo                     │ [Confirmed]     │ 2.11.2             │
│ Web Framework        │ Next.js (App Router, Server)  │ [Confirmed]     │ 16.4.1 (Turbopack) │
│ Core UI Library      │ React                         │ [Confirmed]     │ 19.3.0             │
│ Language / Compiler  │ TypeScript                    │ [Confirmed]     │ 7.0.2              │
│ Styling Engine       │ Tailwind CSS                  │ [Confirmed]     │ 4.3.0 (CSS @theme) │
│ Headings Typography  │ Manrope (`next/font/google`)  │ [Confirmed]     │ Variable (Font)    │
│ Body Typography      │ Plus Jakarta Sans (`next/font`)│ [Confirmed]    │ Variable (Font)    │
│ UI Primitives        │ Radix UI Primitives           │ [Confirmed]     │ 1.1.2 (React 19)   │
│ Iconography          │ Lucide React                  │ [Confirmed]     │ 0.475.0            │
│ Form State Engine    │ React Hook Form               │ [Confirmed]     │ 7.54.2             │
│ Schema Validation    │ Zod                           │ [Confirmed]     │ 3.24.2             │
│ Bot Protection       │ Cloudflare Turnstile          │ [Recommended]   │ Invisible widget   │
│ Managed Database     │ Supabase (Managed PostgreSQL) │ [Confirmed]     │ PostgreSQL 16.4    │
│ Database Client/ORM  │ Drizzle ORM                   │ [Confirmed]     │ 0.45.1             │
│ Database Migrations  │ drizzle-kit                   │ [Confirmed]     │ 0.35.0             │
│ PostgreSQL Driver    │ `postgres` (postgres.js)      │ [Confirmed]     │ 3.4.5 (prepare:fal)│
│ Supabase SDK         │ `@supabase/supabase-js`       │ [Confirmed]     │ 2.49.1             │
│ Transactional Email  │ Resend SDK                    │ [Recommended]   │ 4.1.2              │
│ Content CMS (Initial)│ Git-Managed MDX Collections   │ [Confirmed]     │ File-based git CMS │
│ Production Hosting   │ Vercel (or Netlify)           │ [Pending apprv] │ Serverless / Node  │
│ Outbox Worker Trigger│ Scheduled Hosting Cron        │ [Pending apprv] │ Provisional freq.  │
│ DNS & Edge Security  │ Cloudflare (or Registrar DNS) │ [Pending apprv] │ Managed Edge CDN   │
└──────────────────────┴───────────────────────────────┴─────────────────┴────────────────────┘
```

---

## 3. Technology Version Evaluation & Compatibility Analysis

### 3.1 Next.js 16.4.1 & React 19.3.0 `[Confirmed]`
* **Evaluation & Decision:** Next.js 16.4.1 is adopted as the primary web application framework, paired with React 19.3.0.
* **Compatibility Verification:**
  * Next.js 16.4.1 requires React 19.3.0 for its refined Server Components streaming protocol, server action serialization, and React Compiler integration.
  * Turbopack is the default engine for development and production compilation, eliminating custom Webpack configurations.
  * Native asynchronous request APIs (`await cookies()`, `await headers()`) ensure complete serverless request isolation.
* **Verified Compatibility:** 100% interoperable with Radix UI 1.1.2 and React Hook Form 7.54.2 under React 19.3.0.

---

### 3.2 Package Manager: pnpm 12.19.0 & Turborepo 2.11.2 `[Confirmed]`
* **pnpm 12.19.0:**
  * Uses hard-link content-addressable storage, preventing phantom dependencies.
  * Lockfile v9 ensures byte-for-byte deterministic installations across local and CI environments.
  * Strictly enforces workspace package boundaries across `apps/*` and `packages/*`.
* **Turborepo 2.11.2:**
  * Native workspace task caching, supporting parallel compilation of `apps/corporate`, `apps/academy`, and `apps/worker`.
  * Remote caching ready for CI/CD integration.

---

### 3.3 Language Compiler: TypeScript 7.0.2 `[Confirmed]`
* **Evaluation & Decision:** TypeScript 7.0.2 is verified and adopted across all applications and shared packages.
* **Compatibility Verification:**
  * Fully verified for Next.js 16.4.1 App Router types, Drizzle ORM 0.45.1 type inference, and React 19.3 JSX types.
  * Strict type checking enabled (`strict: true`, `noImplicitAny: true`) with project references configured in `tsconfig.base.json`.

---

### 3.4 Styling Engine: Tailwind CSS 4.3.0 `[Confirmed]`
* **Evaluation & Decision:** Tailwind CSS 4.3.0 is adopted, utilizing modern CSS-first `@theme` configuration.
* **Browser Compatibility Baseline:**
  * Relies on standard modern CSS features: CSS `@property`, `color-mix()`, and CSS Cascade Layers (`@layer`).
  * Supported natively across all target evergreen browsers: Chrome >= 111, Edge >= 111, Safari >= 16.4, iOS Safari >= 16.4, and Firefox >= 128.
* **Monorepo Token Architecture in Tailwind 4.3:**
  * `packages/tokens` exports `@opsfoundry/tokens/theme.css` via package exports.
  * Custom tokens (`--color-foundry-orange: #FF5A1F`, `--color-foundry-dark: #111215`, `--color-foundry-slate: #1E232E`) and typography scales are defined once in CSS.
  * Both `apps/corporate` and `apps/academy` import this single stylesheet in their global CSS (`@import "@opsfoundry/tokens/theme.css";`), ensuring single-source-of-truth token consumption with zero JavaScript build overhead.

---

### 3.5 Database Client: Drizzle ORM 0.45.1, drizzle-kit 0.35.0 & postgres 3.4.5 `[Confirmed]`
* **Library Pairing:** `drizzle-orm` 0.45.1, `drizzle-kit` 0.35.0, and `postgres` (postgres.js) 3.4.5.
* **Crucial Supabase Pooler Configuration (`prepare: false`):**
  * Next.js Server Actions and the notification worker connect to Supabase PostgreSQL via the **Transaction Pooler (Supavisor on port 6543)**.
  * **Mandatory Requirement:** In transaction pooling mode, prepared statements **must be explicitly disabled** (`postgres(connectionString, { prepare: false })`). PgBouncer/Supavisor multiplexes connections at the transaction level; prepared statements exist only on a single backend connection and fail when subsequent queries hit another connection in the pool.
  * Disabling prepared statements ensures 100% reliable execution under high concurrency.
* **Session State Limitations:** The transaction pooler does not support session-level PostgreSQL commands (`SET session...`, temporary tables, advisory locks spanning multiple queries). All transactions are structured as self-contained atomic blocks.

---

## 4. Content Management Architecture: Git-Managed MDX `[Confirmed]`

### 4.1 Owner-Managed Workflow
The website owner will personally manage all content for both the Corporate and Academy websites. No third-party CMS (Sanity, Strapi, Contentful) will be introduced in the initial release.

### 4.2 Content Directory Structure
```
apps/corporate/content/
└── services/
    ├── get-online.mdx         # Proposed scope, deliverables, operating model
    ├── get-visible.mdx        # Proposed scope, search & positioning
    └── get-customers.mdx      # Proposed scope, conversion enablement

apps/academy/content/
└── programmes/
    ├── course-one.mdx         # Stable ID: COURSE_01 (neutral placeholder)
    ├── course-two.mdx         # Stable ID: COURSE_02 (neutral placeholder)
    └── course-three.mdx       # Stable ID: COURSE_03 (neutral placeholder)
```

### 4.3 Updating Content Without Code Changes
1. **Decoupled Architecture:** Content files contain YAML frontmatter (metadata) and Markdown prose (descriptions, outlines).
2. **Editing:** The website owner updates text directly in `.mdx` files via VS Code or GitHub Web Editor.
3. **Automated Validation:** Monorepo build scripts parse frontmatter against strict Zod schemas (`packages/types`). Missing required fields trigger build-time errors before deployment.
4. **Zero Component Changes:** Content updates deploy via standard Git commits without touching React components, CSS, or application logic.
5. **Headless CMS Bridge:** If a headless CMS is introduced in a future phase, only the local file reader (`lib/mdx.ts`) is replaced with the CMS API client. Presentation components remain 100% unchanged.

---

## 5. Scope Boundaries for Initial Release vs Future Phases

| System / Capability | Initial Release (Phase 3) | Future Phase (Phase 4) | Target Phase |
| :--- | :--- | :--- | :--- |
| **Corporate Commercial Website** | Full production build (`apps/corporate`) | Maintenance & enhancements | Phase 3B |
| **Academy Commercial Website** | Full production build (`apps/academy`) | Maintenance & cohort updates | Phase 3C |
| **Transactional Outbox Storage** | Atomic commit (`admissions_applications` + `notification_outbox`) | Continues powering all intake | Phase 3D |
| **Outbox Worker Dispatch** | Dedicated worker (`apps/worker`) / scheduled cron job | Continues processing jobs | Phase 3D |
| **Private Admin Dashboard** | **Excluded** (`apps/admin` defined but strictly unimplemented) | **Built as `apps/admin`** | Phase 4A |
| **Applicant Filtering & CSV** | **Excluded** | **Included in Admin Dashboard** | Phase 4A |
| **Student Authentication / Portal** | **Excluded** | **Excluded** | Phase 5 |
| **Learning Management (LMS)** | **Excluded** | **Excluded** | Phase 5 |
| **Payment Gateways (Stripe/Paystack)**| **Excluded** | **Excluded** (Pending fee approvals) | Phase 5 |
