# OPS FOUNDRY — PRODUCTION ARCHITECTURE SPECIFICATION
**System Architecture, Database Blueprint & Engineering Specifications**  
**Document Location:** `design/architecture/PRODUCTION_ARCHITECTURE.md`  
**Phase:** Phase 3 — Production Architecture & Implementation Planning  
**Status:** Canonical Technical Specification (Final Security & Version Consistency)  
**Date:** November 15, 2026  

---

## 1. Executive Architectural Blueprint

Ops Foundry operates two connected digital properties under a unified brand identity (**Direction C: Shared Foundation, Distinct Personalities**):

1. **Ops Foundry Corporate Website (`opsfoundry.com`):** The primary commercial B2B experience targeting business owners, executives, and department leaders. Focused on operational outsourcing, pilot engagements, and managed execution infrastructure.
2. **Ops Foundry Academy (`academy.opsfoundry.com`):** The dedicated talent development experience targeting prospective learners, sponsors, and institutional partners. Focused on practical skills acquisition, workplace simulations, and admissions.

```
                                  ┌───────────────────────────────────────────────┐
                                  │           DNS & EDGE CDN [Provisional]        │
                                  │      Cloudflare Edge CDN / SSL Termination    │
                                  └──────────────────────┬────────────────────────┘
                                                         │
                                ┌────────────────────────┴────────────────────────┐
                                │                                                 │
                                ▼                                                 ▼
        ┌─────────────────────────────────────────────────┐      ┌─────────────────────────────────────────────────┐
        │   opsfoundry.com (Apex & www) [Provisional]     │      │     academy.opsfoundry.com [Provisional]        │
        ├─────────────────────────────────────────────────┤      ├─────────────────────────────────────────────────┤
        │ • App: apps/corporate                           │      │ • App: apps/academy                             │
        │ • Framework: Next.js 16.4.1 (Turbopack)         │      │ • Framework: Next.js 16.4.1 (Turbopack)         │
        │ • Personality: Confident, B2B Commercial        │      │ • Personality: Welcoming, Scholastic Slate      │
        │ • Rendering: Static Pre-render (SSG) + Server   │      │ • Rendering: Static Pre-render (SSG) + Server   │
        │ • Content: Git-Managed MDX (Website Owner)      │      │ • Content: Git-Managed MDX (Website Owner)      │
        └───────────────────────┬─────────────────────────┘      └────────────────────────┬────────────────────────┘
                                │                                                         │
                                └────────────────────────────┬────────────────────────────┘
                                                             │
                                                             ▼
                                ┌─────────────────────────────────────────────────────────┐
                                │               SHARED WORKSPACE PACKAGES                 │
                                ├─────────────────────────────────────────────────────────┤
                                │ • packages/tokens     — Design tokens & Tailwind theme  │
                                │ • packages/ui         — Accessible unstyled UI controls │
                                │ • packages/types      — Shared TypeScript interfaces    │
                                │ • packages/db         — Drizzle ORM, Schemas & Queries  │
                                └────────────────────────────┬────────────────────────────┘
                                                             │
                                ┌────────────────────────────┴────────────────────────────┐
                                │                                                         │
                                ▼                                                         ▼
        ┌─────────────────────────────────────────────────┐      ┌─────────────────────────────────────────────────┐
        │    TRANSACTIONAL OUTBOX (SUPABASE POSTGRESQL)   │      │         NOTIFICATION WORKER (apps/worker)       │
        │    • Single atomic transaction:                 │◄─────┤        • Decoupled from Server Action lifetime  │
        │      1. Insert Application record               │      │        • Two-Phase Atomic Claim & Heartbeat     │
        │      2. Insert Initial Audit History entry      │      │        • Minimal notification payload hygiene   │
        │      3. Insert Notification Job into Outbox     │      │        • Redacted logging & lease recovery      │
        └─────────────────────────────────────────────────┘      └─────────────────────────────────────────────────┘
                                                                                          │
                                                                 ┌────────────────────────┴────────────────────────┐
                                                                 │                                                 │
                                                                 ▼                                                 ▼
                                                  ┌──────────────────────────────┐  ┌──────────────────────────────┐
                                                  │ Resend API (Applicant Email) │  │ HTTPS Webhook (Slack / CRM)  │
                                                  └──────────────────────────────┘  └──────────────────────────────┘
```

---

## 2. Architecture Comparison: Monorepo vs. Single Next.js Application `[Confirmed]`

To establish a scalable and resilient engineering foundation, two architectural patterns were evaluated:

### Option A: Lightweight Monorepo (Turborepo 2.11.2 + pnpm Workspaces) `[Recommended & Confirmed]`
Independent Next.js App Router applications (`apps/corporate`, `apps/academy`, and worker `apps/worker`, with future `apps/admin`) coexisting in a single repository with shared internal packages (`packages/tokens`, `packages/ui`, `packages/types`, `packages/db`).

* **How it works:** Each application is an independent project with its own `package.json`, environment variables, and deployment pipeline. Shared tokens, data models, database queries, and primitive components are imported directly through TypeScript path aliases and workspace package exports.

### Option B: Single Next.js Application with Route Groups & Middleware
A single Next.js project using App Router route groups (`app/(corporate)` and `app/(academy)`). Subdomain routing is handled via Next.js Edge Middleware (`middleware.ts`) that inspects the incoming `Host` header and rewrites requests dynamically.

---

### Side-by-Side Comparison Matrix

| Architectural Criterion | Option A: Monorepo (Turborepo 2.11.2) | Option B: Single App + Route Groups | Analysis for Ops Foundry |
| :--- | :--- | :--- | :--- |
| **Deployment Independence** | **High:** Deploying an update to Corporate never triggers a rebuild, invalidation, or downtime risk for Academy, and vice versa. | **Low:** Every deployment updates both sites simultaneously. A build failure or broken test in Academy blocks Corporate marketing deploys. | **Advantage Option A:** Marketing campaigns and admissions cycles operate on independent business tempos. |
| **Architectural Decoupling** | **High:** Corporate remains a lean, high-speed commercial site. Academy can add future admissions workflows without polluting Corporate dependencies. | **Moderate:** Shared `node_modules` and shared root dependencies. Heavy libraries added for Academy affect the entire application bundle. | **Advantage Option A:** Keeps Corporate bundle size and build times strictly minimal. |
| **Subdomain Routing & Edge Cost** | **Zero Middleware Rewrite:** Deployed directly to custom domains on Vercel/Netlify. No edge compute invocations for simple routing. | **Requires Edge Middleware:** Every incoming HTTP request must execute edge middleware to inspect the `Host` header and rewrite paths. | **Advantage Option A:** Faster Time to First Byte (TTFB) and lower serverless edge compute costs. |
| **Design System Enforcement** | **Strict:** Shared primitives must be consumed through `packages/ui` and `packages/tokens`, preventing accidental copy-paste or leaky abstractions. | **Loose:** Developers can easily import corporate components into academy routes without discipline, eroding personality boundaries. | **Advantage Option A:** Enforces Direction C (Shared Foundation, Distinct Personalities) by architecture. |
| **Local Development Experience** | **Fast & Isolated:** Turborepo 2.11.2 caches builds and linting. Developers run `pnpm dev --filter corporate` or both concurrently. | **Simple:** Single `pnpm dev` command starts both sites on a single localhost port (with simulated host headers). | **Tie:** Option B is slightly simpler on Day 1; Option A is significantly faster as the codebase matures. |
| **Future Extensibility (Phase 4+)** | **Seamless:** The private Admin Dashboard has an explicitly designated home (`apps/admin`) sharing `packages/db` without touching public apps. | **Complex:** Introducing administrative dashboards and protected session routes requires complex middleware matching rules to avoid hitting public routes. | **Advantage Option A:** Built to support future admin functionality without refactoring. |

#### Architectural Conclusion:
**Option A (Turborepo Monorepo) is the confirmed architectural foundation.**

---

## 3. Rendering Model & Resolution of Deployment Contradictions `[Confirmed]`

### 3.1 Resolution of Static Export vs Server Contradiction
Earlier draft documentation incorrectly referenced `output: 'export'` alongside Next.js Server Actions and Incremental Static Regeneration (ISR). 

* **The Contradiction:** Setting `output: 'export'` forces Next.js to compile exclusively into static HTML/CSS/JS files for static file hosting. This completely disables Server Actions, Node.js server runtimes, dynamic API route handlers, and serverless execution.
* **The Correction:**
  * **Remove all references to `output: 'export'`.**
  * Ops Foundry deploys using the **standard server-capable Next.js deployment model** (Node.js / Serverless Edge runtime on Vercel or Netlify).
  * This enables a **Hybrid Architecture**:
    1. **Pre-Rendered Static Pages (SSG / RSC):** Marketing pages (`/`, `/about`, `/services`, `/programmes`) are pre-rendered at build time for sub-second global edge delivery and maximum SEO crawlability.
    2. **Server Actions for Form Intake:** The Pilot Consultation Form and Admissions Application execute via Server Actions on secure serverless runtimes.
    3. **Transactional Outbox Commit:** Server Actions securely connect to Supabase PostgreSQL over the Supabase Transaction Pooler (`prepare: false`) to commit applications, audit records, and outbox jobs in a single transaction.
    4. **Dynamic Revalidation:** When Git-managed content is updated, on-demand revalidation (`revalidatePath` / `revalidateTag`) updates cached pages without requiring a full monorepo rebuild.

---

## 4. Domain, Subdomain & DNS Topology `[Provisional / Pending stakeholder approval]`

> [!IMPORTANT]
> The domains, DNS configurations, and hosting infrastructure listed below are **provisional recommendations** subject to stakeholder confirmation of domain ownership and organizational hosting accounts. Do NOT configure production DNS records until formal approval is granted.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                       PROVISIONAL DNS RECORD TOPOLOGY [Pending Approval]                    │
├──────────────────────────┬──────────┬──────────────────────┬────────────────────────────────┤
│ Domain / Hostname        │ Type     │ Target / Value       │ Purpose                        │
├──────────────────────────┼──────────┼──────────────────────┼────────────────────────────────┤
│ opsfoundry.com           │ A / ALIAS│ 76.76.21.21 (Vercel) │ Apex Domain (Corporate)       │
│ www.opsfoundry.com       │ CNAME    │ cname.vercel-dns.com │ Redirect to apex domain        │
│ academy.opsfoundry.com   │ CNAME    │ cname.vercel-dns.com │ Academy Subdomain              │
│ preview-*.opsfoundry.com │ CNAME    │ cname.vercel-dns.com │ PR & Branch Staging Previews   │
└──────────────────────────┴──────────┴──────────────────────┴────────────────────────────────┘
```

### 4.1 Multi-Origin CORS & Security Policy `[Confirmed]`
* **Authorized Origin Whitelist:**
  * `https://opsfoundry.com` (Corporate production apex)
  * `https://www.opsfoundry.com` (Corporate production www)
  * `https://academy.opsfoundry.com` (Academy production subdomain)
  * `http://localhost:3000` (Local corporate development)
  * `http://localhost:3001` (Local academy development)
  * `https://*-opsfoundry.vercel.app` (Staging preview deployments — non-production only)
* **Crucial Security Distinction:**
  * CORS is an in-browser access control mechanism, not a comprehensive backend security perimeter. CORS rules do not prevent malicious server-to-server requests or bot automation.
  * Backend endpoints and Server Actions are secured through Cloudflare Turnstile bot verification, salted IP sliding-window rate limiting, and strict server-side Zod validation.

---

## 5. Content Management Architecture: Git-Managed Content `[Confirmed]`

### 5.1 Personal Management by the Website Owner
The website owner will personally manage all content for both properties. No third-party CMS (Sanity, Strapi, Contentful) will be introduced in the initial release.

### 5.2 Content Organization & Directory Hierarchy
All content is organized into type-safe MDX files located directly within each application's repository structure:

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

### 5.3 Updating Content Without Code Changes
1. **Decoupled Architecture:** Content files contain YAML frontmatter (metadata) and Markdown prose (descriptions, outlines).
2. **Editing:** The website owner updates text directly in `.mdx` files via VS Code or GitHub Web Editor.
3. **Automated Validation:** Monorepo build scripts parse frontmatter against strict Zod schemas (`packages/types`). Missing required fields trigger build-time errors before deployment.
4. **Zero Component Changes:** Content updates deploy via standard Git commits without touching React components, CSS, or application logic.
5. **Headless CMS Bridge:** If a headless CMS is introduced in a future phase, only the local file reader (`lib/mdx.ts`) is replaced with the CMS API client. Presentation components remain 100% unchanged.

### 5.4 Content Governance: Strict Removal of Invented Content
* **Academy Schemas:** All course modules and prerequisites ("basic computer literacy") from earlier drafts are removed. All unconfirmed fields remain empty arrays or explicitly marked `[Pending stakeholder approval]`.
* **Corporate Scopes:** All corporate deliverables and operating model timelines are explicitly presented as **proposed scopes under review**, not binding guarantees.

#### Authoritative Academy Content Schema (`packages/types/src/programme.ts`):
```typescript
import { z } from 'zod';

export const ProgrammeFrontmatterSchema = z.object({
  // Stable programmatic course identifier (never coupled to marketing titles)
  courseId: z.enum(["COURSE_01", "COURSE_02", "COURSE_03"]),
  
  title: z.string(), // e.g. "Course One"
  provisionalTitle: z.string().nullable().default(null),
  isOfficialTitle: z.boolean().default(false),
  summary: z.string(),
  
  // Operational Details [Marked pending approval if unconfirmed]
  duration: z.string().default("[Pending stakeholder approval]"),
  deliveryFormat: z.string().default("[Pending stakeholder approval]"),
  
  // Prerequisites & Admission Requirements (Strictly uninvented)
  prerequisites: z.array(z.string()).default([]),
  admissionRequirements: z.array(z.string()).default([]),
  
  // Curriculum Structure (Empty array until formally signed off)
  curriculumModules: z.array(
    z.object({
      phase: z.number(),
      title: z.string(),
      description: z.string(),
      learningOutcomes: z.array(z.string()).default([]),
    })
  ).default([]),
  
  // Financials & Dates
  tuition: z.object({
    amount: z.number().nullable().default(null),
    currency: z.string().default("USD"),
    status: z.enum(["confirmed", "provisional", "pending_approval"]).default("pending_approval"),
  }),
  scholarshipInformation: z.string().default("[Pending stakeholder approval]"),
  cohortDates: z.array(z.string()).default([]),
});

export type ProgrammeFrontmatter = z.infer<typeof ProgrammeFrontmatterSchema>;
```

---

## 6. Monorepo Directory Architecture `[Confirmed]`

The monorepo structure cleanly separates applications, the outbox worker, and shared packages:

```
ops-foundry/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Automated lint, typecheck, RLS tests & build
│       └── deploy.yml             # Preview & production deployment triggers
├── apps/
│   ├── corporate/                 # Corporate Commercial Web Application
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx       # Corporate Homepage
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx   # About Us
│   │   │   │   ├── how-we-work/
│   │   │   │   │   └── page.tsx   # The Operating Model (Proposed Scopes)
│   │   │   │   ├── services/
│   │   │   │   │   ├── page.tsx   # Services Overview Hub
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx # Get Online, Visible, Customers
│   │   │   │   └── pilot/
│   │   │   │       └── page.tsx   # Pilot Consultation Intake Form
│   │   │   ├── layout.tsx         # Global Corporate Layout
│   │   │   ├── sitemap.ts         # Dynamic XML Sitemap
│   │   │   └── robots.ts          # Search engine crawl directives
│   │   ├── components/            # Corporate Layout & Editorial Components
│   │   ├── content/services/      # Git-managed MDX service files
│   │   ├── public/images/         # Optimized WebP/AVIF operations assets
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── academy/                   # Ops Foundry Academy Web Application
│   │   ├── app/
│   │   │   ├── (portal)/
│   │   │   │   ├── page.tsx       # Academy Homepage
│   │   │   │   ├── programmes/
│   │   │   │   │   ├── page.tsx   # Programmes Directory
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx # Course Detail Pages (Schema-governed)
│   │   │   │   ├── how-it-works/
│   │   │   │   └── page.tsx   # Learning Simulations & Methodology
│   │   │   │   ├── admissions/
│   │   │   │   │   └── page.tsx   # Admissions Process & Application Form
│   │   │   │   ├── tuition-scholarships/
│   │   │   │   │   └── page.tsx   # Tuition & Scholarships (Provisional)
│   │   │   │   └── sponsors/
│   │   │   │       └── page.tsx   # Institutional Sponsor Partnerships
│   │   │   ├── layout.tsx         # Global Academy Layout
│   │   │   ├── sitemap.ts
│   │   │   └── robots.ts
│   │   ├── components/            # Academy Layout & Editorial Components
│   │   ├── content/programmes/    # Git-managed MDX course files
│   │   ├── public/images/         # Academy workshop photography
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── worker/                    # Notification Outbox Worker (apps/worker)
│   │   ├── src/
│   │   │   ├── index.ts           # Worker execution entrypoint (HTTP / Cron)
│   │   │   ├── processor.ts       # Job claiming, heartbeat, lease expiry & dispatch
│   │   │   └── channels/
│   │   │       ├── email.ts       # Resend API integration (with idempotency header)
│   │   │       └── webhook.ts     # Operational triage webhook dispatcher
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── admin/                     # Ops Foundry Admin Dashboard (Phase 4 Future Scope)
│       └── [Strictly UNIMPLEMENTED in Phase 3; scaffolded in Phase 4]
│
├── packages/
│   ├── tokens/                    # Shared Design Tokens & Tailwind 4 Theme
│   │   ├── src/
│   │   │   ├── colors.ts          # Color tokens (#FF5A1F, #FBFBF9, #111215, #1E232E)
│   │   │   ├── typography.ts      # Manrope + Plus Jakarta Sans font scales
│   │   │   ├── spacing.ts         # Container widths, paddings, border radii
│   │   │   └── theme.css          # Tailwind 4 CSS @theme stylesheet
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                        # Shared Accessible UI Primitives
│   │   ├── src/
│   │   │   ├── button.tsx         # Base button primitive (semantic variants)
│   │   │   ├── container.tsx      # Responsive max-width container wrapper
│   │   │   ├── input.tsx          # Accessible text input control
│   │   │   ├── select.tsx         # Radix-powered accessible select dropdown
│   │   │   ├── textarea.tsx       # Accessible multi-line textarea
│   │   │   ├── modal.tsx          # Radix-powered accessible dialog primitive
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                     # Shared TypeScript Interfaces & Zod Schemas
│   │   ├── src/
│   │   │   ├── service.ts         # Service scope & deliverable models
│   │   │   ├── programme.ts       # Course outline & curriculum schemas
│   │   │   ├── admissions.ts      # Admission application data models
│   │   │   ├── inquiry.ts         # Corporate consultation inquiry models
│   │   │   ├── outbox.ts          # Notification outbox job contracts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── db/                        # Durable Database Layer (Drizzle ORM & Supabase)
│       ├── src/
│       │   ├── schema.ts          # PostgreSQL table definitions & constraints
│       │   ├── client.ts          # Drizzle client (Supabase Pooler, prepare: false)
│       │   ├── queries/           # Shared queries (claimOutboxJobs, completeOutboxJob, etc.)
│       │   ├── migrations/        # Type-safe SQL migrations
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                   # Root monorepo manifest
├── pnpm-workspace.yaml            # pnpm workspace definition
├── turbo.json                     # Turborepo 2.11 task pipeline & build caching
└── tsconfig.base.json             # Root TypeScript base configuration
```

---

## 7. Refined Design System: Preserving Direction C `[Confirmed]`

Shared packages provide **foundations and accessible primitives**, not identical page structures:
* **What is Shared (`packages/tokens` and `packages/ui`):**
  * Color palette: Foundry Orange (`#FF5A1F`), Off-White (`#FBFBF9`), Carbon Black (`#111215`), Scholastic Slate (`#1E232E`), muted borders, and neutral grays.
  * Typography scales: Manrope for display headings, Plus Jakarta Sans for body prose and technical data.
  * Base UI primitives: Unstyled Radix wrappers, accessible form controls, standard responsive containers. No forced `themeVariant` prop requirements.
* **What Remains Autonomous (`apps/corporate` and `apps/academy`):**
  * **Headers & Navigation:** Corporate features a high-contrast industrial header with an `Ops Foundry Academy ↗` cross-link pill. Academy features a scholastic slate header with a `Corporate ↗` cross-link.
  * **Footers:** Corporate uses an authoritative 4-column dark carbon layout; Academy uses an academic resource layout.
  * **Hero Sections:** Corporate utilizes an asymmetrical editorial layout with operations imagery; Academy uses an immersive collaborative workshop composition.

---

## 8. Refined Admissions Database Design & Schema `[Confirmed]`

### 8.1 Key Architectural Refinements
1. **Stable Course Identifiers:** Courses are identified via immutable programmatic codes (`COURSE_01`, `COURSE_02`, `COURSE_03`) rather than volatile marketing titles. When official curriculum names are approved, they are updated in content collections without altering database keys. In future phases, a `courses` table can be introduced where `course_code` becomes a foreign key `REFERENCES courses(id)` without any breaking schema rewrite.
2. **Database Status Constraints:** Application statuses are enforced via database `CHECK` constraints: `CHECK (status IN ('submitted', 'in_review', 'approved', 'rejected', 'waitlisted', 'archived'))`.
3. **Transactional Notification Outbox:** A dedicated `notification_outbox` table guarantees zero notification loss without relying on long-lived serverless functions.
4. **Atomic Initial Status History:** The application, initial status-history record, and notification outbox jobs are written in a **single atomic PostgreSQL transaction**.
5. **Append-Only Audit History:** `admissions_status_history` is strictly append-only. Database triggers and permissions revoke `UPDATE` and `DELETE` privileges for application users and administrators.
6. **Salted IP Hashing & Retention `[Pending stakeholder approval]`:** The raw IP address is **never stored**. Only a salted SHA-256 hash (`ip_hash`) is stored temporarily solely for anti-spam abuse detection and rate limiting. The salt is managed via an environment secret (`IP_HASH_SALT`). A 30-day retention schedule is proposed, after which an automated cron sets `ip_hash = null` to minimize PII footprint under GDPR/NDPR/POPIA.
7. **Idempotency Scoping & Retention:** The client generates a unique UUID on form load. The server derives an idempotency key: `SHA-256(client_uuid + normalized_email + course_code + submission_date)`. A `UNIQUE` database constraint prevents duplicate rows. Duplicate submissions return the existing application reference safely without creating duplicate database records or queueing redundant notification jobs.

### 8.2 Database Schema (`packages/db/src/schema.ts`)
```typescript
import { pgTable, uuid, varchar, text, timestamp, jsonb, index, integer, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// 1. Academy Admissions Applications Table
export const admissionsApplications = pgTable('admissions_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Applicant Identity (Approved form fields only)
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  
  // Stable Course Identifier (COURSE_01, COURSE_02, COURSE_03)
  courseCode: varchar('course_code', { length: 50 }).notNull(),
  
  // Server-Validated Structured Form Responses
  formResponses: jsonb('form_responses').notNull().default({}),
  
  // Extensible Status Model with strict DB Check Constraint
  status: varchar('status', { length: 50 }).default('submitted').notNull(),
  
  // Administrative Review Notes & Audit Info
  adminNotes: text('admin_notes'),
  statusUpdatedAt: timestamp('status_updated_at', { withTimezone: true }),
  statusUpdatedBy: varchar('status_updated_by', { length: 255 }), // Administrator Identifier
  
  // Operational Delivery & Abuse Protection
  idempotencyKey: varchar('idempotency_key', { length: 128 }).notNull().unique(),
  ipHash: varchar('ip_hash', { length: 64 }), // Salted SHA-256
  
  // Audit Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  statusCheck: check('admissions_status_check', 
    sql`${table.status} IN ('submitted', 'in_review', 'approved', 'rejected', 'waitlisted', 'archived')`),
  emailIdx: index('admissions_email_idx').on(table.email),
  courseIdx: index('admissions_course_idx').on(table.courseCode),
  statusIdx: index('admissions_status_idx').on(table.status),
  createdIdx: index('admissions_created_at_idx').on(table.createdAt),
}));

// 2. Application Status History Table (Append-Only Audit Log)
export const admissionsStatusHistory = pgTable('admissions_status_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => admissionsApplications.id, { onDelete: 'cascade' }),
  fromStatus: varchar('from_status', { length: 50 }),
  toStatus: varchar('to_status', { length: 50 }).notNull(),
  changedAt: timestamp('changed_at', { withTimezone: true }).defaultNow().notNull(),
  changedBy: varchar('changed_by', { length: 255 }), // Admin UUID (null for automated initial submit)
  note: text('note'),
}, (table) => ({
  statusCheck: check('history_status_check', 
    sql`${table.toStatus} IN ('submitted', 'in_review', 'approved', 'rejected', 'waitlisted', 'archived')`),
  applicationIdx: index('status_history_app_idx').on(table.applicationId),
  changedAtIdx: index('status_history_changed_at_idx').on(table.changedAt),
}));

// 3. Transactional Notification Outbox Table
export const notificationOutbox = pgTable('notification_outbox', {
  id: uuid('id').primaryKey().defaultRandom(),
  channel: varchar('channel', { length: 50 }).notNull(), // 'applicant_email' | 'operational_triage_webhook'
  recipient: varchar('recipient', { length: 255 }).notNull(), // Email address or webhook URL
  payload: jsonb('payload').notNull(), // Minimal notification payload only
  
  // Outbox Execution & Lease Management
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  workerId: varchar('worker_id', { length: 100 }),          // Claiming worker identifier
  claimId: uuid('claim_id'),                                // Unique lease token per claim
  leaseExpiresAt: timestamp('lease_expires_at', { withTimezone: true }), // Lease expiration
  attempts: integer('attempts').default(0).notNull(),       // Corrected integer counter
  maxAttempts: integer('max_attempts').default(5).notNull(),
  lastAttemptAt: timestamp('last_attempt_at', { withTimezone: true }),
  scheduledFor: timestamp('scheduled_for', { withTimezone: true }).defaultNow().notNull(),
  errorMessage: text('error_message'),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  
  // Audit Reference
  applicationId: uuid('application_id')
    .references(() => admissionsApplications.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  outboxStatusCheck: check('outbox_status_check', 
    sql`${table.status} IN ('pending', 'processing', 'completed', 'failed', 'dead_letter')`),
  claimIdx: index('outbox_claim_idx').on(table.status, table.scheduledFor, table.leaseExpiresAt),
}));

// 4. Corporate Pilot Consultation Inquiries Table
export const corporateInquiries = pgTable('corporate_inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  organization: varchar('organization', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  serviceInterest: varchar('service_interest', { length: 100 }), // 'get-online' | 'get-visible' | 'get-customers' | 'all'
  message: text('message'),
  status: varchar('status', { length: 50 }).default('submitted').notNull(),
  idempotencyKey: varchar('idempotency_key', { length: 128 }).notNull().unique(),
  ipHash: varchar('ip_hash', { length: 64 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  corpStatusCheck: check('corp_status_check', 
    sql`${table.status} IN ('submitted', 'in_review', 'contacted', 'archived')`),
  emailIdx: index('corp_email_idx').on(table.email),
  createdIdx: index('corp_created_at_idx').on(table.createdAt),
}));
```

---

## 9. Database Credentials, Least-Privilege Grants & Worker PII Access `[Confirmed]`

### 9.1 Accurate Documentation of Worker PII Access
* **Limited PII Processing Acknowledgment:** The notification worker (`apps/worker`) **necessarily processes limited personal information** strictly required to deliver outbound messages:
  1. Recipient email address (e.g. `applicant@example.com`).
  2. Applicant first name (used strictly in email template greetings).
  3. Unique application reference ID.
  4. Selected course code (`COURSE_01`, `COURSE_02`, `COURSE_03`).
* **Strict Payload Minimization:** Full application records are **never** copied into the outbox payload. Phone numbers, motivation responses, background information, salted IP hashes, and administrative review notes are strictly excluded from `notification_outbox.payload`.
  * *Email Job Payload Structure:*
    ```json
    {
      "template": "admissions_submission_receipt",
      "recipientEmail": "applicant@example.com",
      "templateVars": {
        "firstName": "Alex",
        "referenceId": "f7d9a1e0-...",
        "courseCode": "COURSE_01"
      }
    }
    ```
* **Database Isolation:** Database roles enforce that `apps/worker` has permissions **strictly on `notification_outbox`**. It possesses **zero SELECT or UPDATE permissions on `admissions_applications` or `corporate_inquiries`**, preventing worker code from querying applicant data beyond its assigned notifications.
* **Operational Log Redaction:** Personal information is scrubbed from worker operational logs. Email addresses have their local-part masked (`a***@example.com`). Logs record only outbox UUIDs, channels, attempt counts, status transitions, and error codes.
* **Payload Retention & Deletion Schedule `[Pending stakeholder approval]`:** Completed outbox records containing recipient email addresses are retained for 30 days for delivery verification, after which an automated cron task sanitizes payloads (`payload = '{}'`) or purges completed rows.

---

### 9.2 Complete Database Privilege & Role Matrix

To guarantee strict separation of concerns, distinct PostgreSQL roles enforce least privilege at the database engine level:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                            DATABASE ROLE & PRIVILEGE MATRIX                                 │
├──────────────────────┬────────────────────────┬──────────────────────┬──────────────────────┤
│ System Component     │ Database Role / User   │ Table Grants         │ Security Guarantee   │
├──────────────────────┼────────────────────────┼──────────────────────┼──────────────────────┤
│ Corporate Website    │ `ops_corp_runtime`     │ INSERT on:           │ Atomic commit of     │
│ (apps/corporate)     │                        │ • corporate_inquiry  │ corporate inquiries  │
│                      │                        │ • notification_outbox│ & notification jobs; │
│                      │                        │                      │ NO access to Academy │
├──────────────────────┼────────────────────────┼──────────────────────┼──────────────────────┤
│ Academy Website      │ `ops_intake_runtime`   │ INSERT on:           │ Atomic commit of     │
│ (apps/academy)       │                        │ • admissions_apps    │ admissions, history  │
│                      │                        │ • admissions_history │ & notification jobs; │
│                      │                        │ • notification_outbox│ NO read permissions  │
├──────────────────────┼────────────────────────┼──────────────────────┼──────────────────────┤
│ Notification Worker  │ `ops_worker_runtime`   │ SELECT, UPDATE on:   │ **NO ACCESS** to     │
│ (apps/worker)        │                        │ • notification_outbox│ admissions_apps or   │
│                      │                        │                      │ corporate_inquiries  │
├──────────────────────┼────────────────────────┼──────────────────────┼──────────────────────┤
│ Future Admin App     │ `ops_admin_runtime`    │ SELECT on all;       │ Access verified via  │
│ (apps/admin, Phase 4)│                        │ UPDATE on status     │ Supabase Auth JWT    │
├──────────────────────┼────────────────────────┼──────────────────────┼──────────────────────┤
│ Schema Migrations    │ `postgres` (Superuser) │ DDL / ALL            │ CI/CD pipeline only  │
└──────────────────────┴────────────────────────┴──────────────────────┴──────────────────────┘
```

* **Atomic Corporate Submission Mechanism:**
  * When a visitor submits a corporate pilot enquiry, `apps/corporate` uses `ops_corp_runtime` to execute an atomic transaction writing to `corporate_inquiries` AND inserting the triage webhook job into `notification_outbox`.
  * `ops_corp_runtime` is denied all privileges on `admissions_applications` and `admissions_status_history`, maintaining strict application boundary isolation.
* **Privileged Connection Clarification:**
  * Service-role connections bypass RLS; security for intake is enforced via Zod parsing at the Server Action boundary, while the worker is restricted by engine-level table grants.
  * Endpoint authentication (`CRON_SECRET`) authorizes the execution trigger, while database roles enforce data isolation at the database engine level.

---

## 10. Outbox Lease Renewal, Heartbeat & Concurrency Safety `[Confirmed]`

### 10.1 Two-Phase Atomic Claim, Heartbeat & Recovery Protocol

The outbox mechanism enforces optimistic concurrency with a **fencing claim token (`claim_id`)** to prevent race conditions, stale overwrites, or worker crash lockouts:

```
[ Worker Invocation (apps/worker) ]
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1 & 2. SELECT & LOCK ELIGIBLE OUTBOX ROWS                                   │
│    • Query eligible pending jobs or expired processing leases:              │
│      (status = 'pending' AND scheduled_for <= NOW()) OR                     │
│      (status = 'processing' AND lease_expires_at <= NOW())                  │
│    • Lock matched rows using `FOR UPDATE SKIP LOCKED`                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3, 4, 5 & 6. ATOMIC CLAIM UPDATE, LEASE STAMP & COMMIT                      │
│    Within the same claim transaction:                                       │
│    • Update status = 'processing'                                           │
│    • Assign worker_id = :worker_id and claim_id = gen_random_uuid()         │
│    • Set lease_expires_at = NOW() + INTERVAL '2 minutes'                    │
│    • Increment attempts = attempts + 1, last_attempt_at = NOW()             │
│    • RETURN claimed rows and COMMIT TRANSACTION IMMEDIATELY                 │
│    • Result: Database row lock released; logical lease stamped              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 7. PROCESS DELIVERIES OUTSIDE DB TRANSACTION (WITH 30s HEARTBEAT)           │
│    • Heartbeat query runs every 30s while actively processing:              │
│      UPDATE notification_outbox                                             │
│      SET lease_expires_at = NOW() + INTERVAL '2 minutes',                   │
│          updated_at = NOW()                                                 │
│      WHERE id = :id AND claim_id = :claim_id AND status = 'processing'      │
│        AND lease_expires_at > NOW(); -- Only if lease is still valid!        │
│    • If heartbeat updates 0 rows -> lease was lost; worker halts processing!│
│    • External Dispatches include Provider Idempotency:                      │
│      - Resend Email: `Idempotency-Key: ${job.id}`                           │
│      - Webhook: `X-OpsFoundry-Delivery-ID: ${job.id}`                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                       ┌───────────────┴───────────────┐
                       ▼                               ▼
┌─────────────────────────────────────────┐     ┌─────────────────────────────────────────┐
│ 8. ON SUCCESSFUL DELIVERY               │     │ 9. ON TRANSIENT DELIVERY FAILURE        │
│    • UPDATE notification_outbox         │     │    • If attempts < max_attempts:        │
│      SET status = 'completed',          │     │      SET status = 'pending',            │
│          completed_at = NOW(),          │     │          scheduled_for = NOW() +        │
│          lease_expires_at = NULL        │     │                          backoff,       │
│      WHERE id = :id AND                 │     │          lease_expires_at = NULL        │
│            claim_id = :claim_id         │     │      WHERE id = :id AND                 │
│        AND status = 'processing';       │     │            claim_id = :claim_id;        │
│    • Fencing Check: If 0 rows updated,  │     │    • If attempts >= max_attempts:       │
│      stale worker detected; no-op.      │     │      SET status = 'dead_letter'         │
└─────────────────────────────────────────┘     └─────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 10. RECOVERY OF EXPIRED PROCESSING LEASES & WORKER CRASH HANDLING           │
│     • If worker crashes or times out, its lease expires in 2 minutes.       │
│     • Subsequent worker invocation re-claims the job in Step 1.             │
│     • Stale workers cannot overwrite results because subsequent updates     │
│       require the current `claim_id`.                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Batch Sizing & Execution Budgeting
* **Conservative Batch Sizing:** To operate safely within hosting execution limits (10s on Netlify, 15s–60s on Vercel), workers process batches of **10 to 20 jobs** per invocation.
* **Execution Budget Monitoring:** During iteration, the worker monitors elapsed execution time (`performance.now()`). If remaining execution time falls below 3 seconds, the worker exits the processing loop gracefully, allowing the next cron tick to claim remaining jobs.

---

## 11. Hosting Cron Capabilities & Comparison `[Pending stakeholder approval]`

> [!IMPORTANT]
> The scheduled outbox execution frequency is **provisional** and subject to hosting provider plan selection. Vercel and Netlify have distinct cron capabilities and execution constraints.

### Comparison of Hosting Cron Capabilities:

| Feature / Limit | Vercel Cron Jobs | Netlify Scheduled Functions | Operational Impact on Outbox |
| :--- | :--- | :--- | :--- |
| **Minimum Schedule Frequency** | **Pro Plan ($20/mo):** Up to once every minute (`* * * * *`).<br>**Hobby Plan:** Limited to once per day (`0 0 * * *`). | **Pro / Enterprise:** Supports flexible cron schedules.<br>**Starter Plan:** Hourly or daily limits; high frequency requires external trigger. | **Provisional Cadence:** A 1-minute cadence requires a paid plan or an external scheduler (e.g. Upstash QStash). |
| **Execution Duration Limits** | **Serverless (Fluid Compute):** Default 15s (Hobby) up to 60s / 300s (Pro). | **Functions:** 10s default; background functions support up to 15 minutes. | **Well within limits:** The outbox worker processes batches of 10–20 jobs in under 5–10 seconds. |
| **Authentication of Invocations** | Sends native `Authorization: Bearer ${CRON_SECRET}` header. | Requires custom query parameter or secret header verification. | **Secure:** Both platforms support cryptographically secure shared secret headers. |
| **Failure Monitoring** | Monitored in Vercel Deployment Logs / Runtime Alerts. | Monitored in Netlify Function Logs. | **Alerting:** Failed cron runs trigger Sentry notifications. |
| **Recovery After Missed Executions** | Does not retry missed ticks; executes on next scheduled tick. | Does not retry missed ticks; executes on next scheduled tick. | **Fully Resilient:** Because outbox queries check `scheduled_for <= NOW()`, missed ticks automatically process accumulated jobs on the next tick. |

---

## 12. Future Ops Foundry Admin Dashboard (`apps/admin`) — Phase 4 Specification `[Confirmed]`

### 12.1 Architectural Boundary
The private **Ops Foundry Admin Dashboard** is designated as `apps/admin` within the Turborepo monorepo. It is **strictly unimplemented in Phase 3** and will be built during Phase 4.

### 12.2 Scoped Phase 4 Capabilities (v1):
1. **Administrator Login (MFA):** Authenticated via Supabase Auth with MFA. Access restricted strictly to verified `role = 'admin'` sessions.
2. **Key Metric Overview:** View total application counts, active cohort volume, and status distributions.
3. **Applicant Directory:** Searchable table listing applicants with columns for Name, Email, Course Code, Submission Date, and Current Status.
4. **Applicant Detail View:** Modal or detail view displaying complete validated application responses, submission timestamp, and audit trail.
5. **Course Breakdown & Filtering:** Filter applicants by Course Code (`COURSE_01`, `COURSE_02`, `COURSE_03`) and Status (`submitted`, `in_review`, `approved`, etc.), with full-text search by applicant name or email.
6. **Application Status Lifecycle Updates:** Update application status with a single click, recording internal comments in `admin_notes`.
7. **Audit Trail Recording:** Automatically writes to `admissions_status_history` logging `from_status`, `to_status`, `changed_at`, `changed_by` (admin UUID), and review note.
8. **One-Click CSV Export:** Export filtered or complete applicant datasets to CSV for admissions committee reviews.

---

## 13. Security, Privacy & Data Governance Blueprint `[Confirmed]`

1. **PII-Free Logging Hygiene:** Server execution logs (Sentry / Datadog / hosting logs) are strictly scrubbed. Application logs record only anonymized UUIDs, timestamps, and error codes. Applicant names, email addresses, and phone numbers are **never** logged to stdout/stderr.
2. **Data Retention & Erasure Schedule `[Pending stakeholder approval]`:**
   * Admissions Applications: Proposed retention for the prospective cohort admissions cycle plus 6 months for auditing, after which records are archived.
   * `ip_hash`: Proposed 30-day retention for anti-abuse protection; cleared automatically thereafter.
   * Corporate Inquiries: Proposed 12-month retention.
   * Data Subject Requests: Automated erasure procedures support complete PII deletion in full compliance with GDPR, NDPR, and POPIA regulations.
3. **Infrastructure SLA:** The system targets a realistic **99.9% uptime** matching standard cloud infrastructure (Vercel/Netlify and Supabase). Unsupported claims of 99.99% uptime are explicitly disclaimed.

---

## 14. CI/CD & Build Pipeline Specifications `[Confirmed]`

### 14.1 Independent Application Deployment
A core rationale for Option A (Monorepo) is independent application delivery. To ensure that changes to `apps/corporate` do not trigger unnecessary rebuilds of `apps/academy`:

* **Turborepo Build Pipeline (`turbo.json`):**
  ```json
  {
    "$schema": "https://turbo.build/schema.json",
    "tasks": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": [".next/**", "!.next/cache/**", "dist/**"]
      },
      "lint": {},
      "typecheck": {},
      "test:rls": {}
    }
  }
  ```
* **Hosting Build Filter Commands:**
  * **Corporate Project Settings:**
    * Root Directory: `apps/corporate`
    * Build Command: `turbo run build --filter=corporate`
    * Output Directory: `.next`
  * **Academy Project Settings:**
    * Root Directory: `apps/academy`
    * Build Command: `turbo run build --filter=academy`
    * Output Directory: `.next`
  * **Worker Project Settings:**
    * Root Directory: `apps/worker`
    * Build Command: `turbo run build --filter=worker`
