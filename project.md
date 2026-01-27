# Project: BOOSTR — Introduction & Objectives

## Introduction

BOOSTR is a premium platform that enables creators to receive direct financial support from their audience. The project is designed for serious, professional creators — artists, musicians, writers, designers, indie developers, and other makers — who want a simple, elegant place to showcase their work and accept one-time or recurring support. At the core, BOOSTR combines a focused public profile for each creator with a secure payment flow powered by Razorpay, safe OAuth authentication (GitHub and Google), and an intuitive dashboard where creators manage their profile and payment settings.

This platform emphasizes quality over scale: the design, interactions, and features are tuned to present work in a refined, cinematic style while keeping friction low for supporters. Creators get a dedicated URL (for example `https://yourdomain.com/username`) that they can share across social networks. Supporters can visit that page, watch embedded content (like YouTube videos), leave a short message, and pay a chosen amount using a secure checkout. The creator receives the payment via their own Razorpay credentials that they configure in the dashboard — BOOSTR facilitates the payment flow and verification without holding funds on behalf of creators.

Beyond payments, BOOSTR includes an AI assistant (Mr. PayFix) that helps creators set up Razorpay keys, explains test vs live mode, and offers troubleshooting tips. The site is built on Next.js with Tailwind CSS for rapid, responsive UI development and MongoDB (Mongoose) for a simple, scalable data layer. Deployment targets modern serverless platforms (Netlify) and managed databases (MongoDB Atlas) so the stack remains easy to maintain and cost-effective at early scale.

Primary use-cases:

- Creator onboarding: quick account creation with OAuth, simple profile completion, and Razorpay key setup.
- Public tipping/support: fans visit a creator's page and send support with a message and amount.
- Creator management: creators edit profile, view recent supporters, and verify payments in the dashboard.
- Payments troubleshooting: AI assistant and server-side verification to keep transactions reliable.

This document expands the technical and operational details of BOOSTR — objectives, feasibility, system design, database models, diagrams, testing plans, deployment steps, and future enhancements — in plain English with practical examples.

## Objective of the Project

The primary objective of BOOSTR is to provide a secure, trustworthy, and elegant platform where creators can monetize attention directly from their audience. Success is measured by a small set of concrete outcomes: creators must be able to set up their profile and payment account in under 15 minutes; payments initiated by supporters should be verified automatically and reflected in the creator's dashboard within 30 seconds of completion; and the platform should retain basic resilience with 99% availability for public pages. The project focuses on delivering a minimal, reliable core experience first: profile pages, payment initiation via Razorpay, and robust order verification.

Specific, measurable goals:

- Onboarding time: average time from sign-up to live support-enabled page should be < 15 minutes for 90% of creators.
- Payment verification: successful verification and database update within 30 seconds for 95% of completed payments.
- Security baseline: follow NextAuth best practices, store no payment secrets in client code, and ensure Razorpay secrets are stored encrypted at rest.
- Performance target: first meaningful paint for public profile pages under 1.5 seconds for a typical broadband user.
- Reliability: public pages and checkout endpoints maintain 99% uptime during normal operation.

Scope boundaries (what we intentionally exclude at first):

- BOOSTR will not act as a payment custodian. Creators supply their own Razorpay credentials — BOOSTR only facilitates the creation of orders and verification.
- No payout automation from BOOSTR to creators in the initial version — payouts are handled by the payment provider and the creator's own account.
- No subscription billing in the initial release; recurring support may be a future enhancement.

Primary stakeholders and responsibilities:

- Project owner / maintainer: repository, deployment configuration, release process.
- Creators: provide profile content and Razorpay credentials; maintain their payment account.
- Supporters: use the public pages to support creators.
- Platform: runs the public site, provides verification, stores records, and offers AI-guided help for setup and common payment issues.

Next: I will draft the detailed Feasibility Study and Requirement Gathering sections. If you want any edits to tone or phrasing in these two sections, tell me now and I will adjust before I save them to the main project document.

## Feasibility Study

This section evaluates whether BOOSTR is practical to build and operate given current technology, time, and budget constraints. The technical feasibility is strong: BOOSTR uses well-supported, widely-adopted building blocks — Next.js for server-rendered React, Tailwind CSS for styling, MongoDB/Mongoose for a schemaless data store, and Razorpay for payments. Each of these has mature documentation and community support (see Next.js: https://nextjs.org/, MongoDB Atlas: https://www.mongodb.com/cloud/atlas, Razorpay: https://razorpay.com/docs/). The integration points are standard (OAuth for authentication via NextAuth, REST/HTTPS calls for payment orders, and webhook verification). A development team with basic familiarity with Node.js and React can implement the minimum viable product (MVP) in a matter of weeks.

Operational feasibility is also favorable. Hosting static and server-rendered parts of Next.js on Netlify or similar serverless platforms is common and cost-effective. MongoDB Atlas provides managed database hosting with scaling options and automated backups. Razorpay handles payment processing and settlements, reducing the burden of PCI compliance for BOOSTR — the platform never stores raw card data and relies on Razorpay’s PCI-certified systems for transaction handling.

Economic feasibility: initial costs include a small cloud hosting plan, a low-tier MongoDB Atlas cluster, and domain + SSL fees. Early-stage usage can be supported on modest budgets (under USD $50–150/month) using free/low-tier plans; costs scale predictably with traffic and data. Human cost (development, maintenance) is the major expense — plan for initial development effort of roughly 2–4 developer-months for an MVP.

Schedule feasibility: an MVP that includes account creation, public pages, payment initiation, order verification, and a basic dashboard is achievable in 6–10 weeks with a focused developer or small team. Adding the AI chatbot integration (Gemini or similar) may add 1–2 additional weeks for API access, prompt design, and safety rules.

Risks and mitigations:

- Payment configuration errors (creators enter wrong keys): mitigate with client-side validation, step-by-step onboarding, and in-dashboard key test mode with fake transactions.
- Webhook failures or delayed verification: implement idempotent webhook handlers, retry logic, and administrative alerts.
- Secrets exposure: store Razorpay secrets encrypted at rest using environment variables and restrict access; do not expose secrets to the client.
- Scalability pain points (sudden spikes in traffic): use CDN for static assets, rate-limit API endpoints, and provision higher-tier Atlas clusters when needed.

Overall, BOOSTR is feasible with the selected stack and can be launched as a reliable MVP with measured investment and standard operational safeguards.

## Requirement Gathering

This section lists the functional and non-functional requirements collected for BOOSTR. Requirements are written in simple, testable terms to guide implementation and verification.

### Functional Requirements (FR)

1. **FR-01 — User Authentication:** Users must be able to sign up and sign in using OAuth providers (GitHub and Google) and obtain a session via NextAuth.
2. **FR-02 — Creator Profile:** Authenticated creators must be able to create and edit a public profile with `username`, `name`, `profile picture`, `cover image`, and an optional list of YouTube video URLs.
3. **FR-03 — Public Creator Page:** Each creator must have a public page accessible at `/{username}` displaying profile information, embedded media, and a payment form.
4. **FR-04 — Payment Initiation:** Supporters can enter `name`, `message`, and `amount` and initiate payment; the server must create a Razorpay order using the creator’s configured Razorpay credentials.
5. **FR-05 — Payment Verification:** The system must verify completed payments via Razorpay webhook or post-payment verification endpoint and update the payment record to `done: true`.
6. **FR-06 — Dashboard:** Creators must see recent payments, pending orders, and a form to enter/update Razorpay Key ID and Secret.
7. **FR-07 — Chatbot Help:** Creators should be able to open Mr. PayFix chatbot for step-by-step guidance on fetching Razorpay keys and troubleshooting common errors.

### Non-Functional Requirements (NFR)

- **NFR-01 — Security:** All sensitive secrets (Razorpay keys, NextAuth secret) must be stored in environment variables and never exposed to client-side code. Use HTTPS for all endpoints.
- **NFR-02 — Performance:** Public profile pages should achieve a first meaningful paint under 1.5 seconds on typical broadband; server endpoints should respond within 300–800 ms for common operations.
- **NFR-03 — Reliability:** The platform should maintain an availability SLA target of 99% for public pages and payment endpoints under normal conditions.
- **NFR-04 — Scalability:** Design for horizontal scaling: stateless server functions, managed DB with sharding/replica options, and CDN for static assets.
- **NFR-05 — Compliance and Privacy:** Do not store full payment card details. Store minimal supporter data (name, message, email optional) and provide a data retention policy.
- **NFR-06 — Maintainability:** Codebase should use modular components, documented API routes, and clear Mongoose models for ease of maintenance.

### Acceptance Criteria (high-level)

- A user can sign up with GitHub or Google and reach the dashboard.
- A creator can configure Razorpay keys, and a support payment completed via Razorpay updates the creator's dashboard.
- The chatbot provides contextual help in typical onboarding scenarios.

Next: I will draft the System Analysis and Frontend/Backend Description sections unless you want edits here first.

## Hardware & Software Specification

### Hardware (recommended specs)

| Resource |                                     Minimum |                                                       Recommended |
| -------- | ------------------------------------------: | ----------------------------------------------------------------: |
| CPU      |                                     2 cores |                                                           4 cores |
| RAM      |                                        4 GB |                                                           8–16 GB |
| Disk     |                                       20 GB |                                                           100+ GB |
| OS       | Ubuntu 20.04 LTS / Windows 10 / macOS 10.15 |                         Ubuntu 22.04 LTS / Windows 11 / macOS 12+ |
| Editor   |                             VS Code (basic) | VS Code with ESLint, Prettier, Tailwind CSS IntelliSense, GitLens |

### Software

| Component       | Required / Minimum        | Recommended                           |
| --------------- | ------------------------- | ------------------------------------- |
| Node.js         | 18.x (LTS)                | Match package.json (18 or 20 LTS)     |
| Package manager | npm 8+                    | npm 9+ or pnpm                        |
| Framework       | Next.js                   | Latest stable (v14+)                  |
| Styling         | Tailwind CSS              | Tailwind v3+                          |
| Database        | MongoDB (Mongoose)        | MongoDB Atlas + Mongoose              |
| Auth            | NextAuth.js               | GitHub & Google OAuth                 |
| Payments        | Razorpay SDK / API        | Test keys for dev; live keys for prod |
| Dev tools       | VS Code, ESLint, Prettier | VS Code + recommended extensions      |
| Hosting / CDN   | Netlify / Vercel          | Netlify/Vercel; enable CDN caching    |
| Monitoring      | Basic logs                | Sentry or Logflare                    |

VS Code extensions (what to install and why)

- VS Code extensions: ESLint, Prettier, Tailwind CSS IntelliSense, GitLens, npm Intellisense, Path Intellisense, Import Cost, EditorConfig, Debugger for Chrome/Edge, Live Share, Settings Sync, TODO Tree
- Core runtime packages (dependencies): next, react, react-dom, tailwindcss, mongoose, next-auth, razorpay (server SDK), axios/ky, swr/@tanstack/react-query, zod
- Dev tools / devDependencies: eslint (+plugins), prettier, jest, @testing-library/react, msw, cypress/playwright, husky, lint-staged, typescript (optional)

next, react, react-dom, tailwindcss (+ postcss, autoprefixer) — core framework & styling.
mongoose, next-auth, razorpay (server-side) — DB, auth, and payments SDK.
fetch/axios or ky, swr/@tanstack/react-query, zod — HTTP client, data fetching, and runtime validation.
clsx/classnames, cookie/iron-session, dev tooling (eslint, prettier, jest, cypress, husky) — helpers and devDependencies.

- eslint, eslint-config-next, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y, prettier, eslint-config-prettier, eslint-plugin-prettier
- tailwindcss, postcss, autoprefixer
- jest, @testing-library/react, @testing-library/jest-dom, jest-environment-jsdom, msw, cypress or playwright
- husky, lint-staged, cross-env (or dotenv-cli), semantic-release / commitizen, typescript + @types/\*
- Paste the above into package.json under "devDependencies" as an example snippet

Security notes: store all secrets in environment variables or a host secret manager (`NEXTAUTH_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `GOOGLE_ID`, `GOOGLE_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`). Do not commit secrets to the repository.

## Project Modules

The Project Modules section outlines the core functional areas of BOOSTR as discrete, testable components.  
Each module specifies responsibilities, key routes/actions, and implementation notes to ensure clear ownership and secure integration.  
This modular design enables incremental development, horizontal scaling, and straightforward testing and maintenance.

- Authentication

  - Responsibilities: OAuth sign-in, session management, user creation.
  - Key routes / actions: `GET/POST /api/auth/[...nextauth]` (handled by NextAuth).
  - Notes: Use NextAuth callbacks to create/update User records; enforce secure cookies and session checks.

- Creator Profile

  - Responsibilities: Create/edit profile, manage media, store per-creator Razorpay keys.
  - Key routes / actions: `GET /api/profile/:username`, `POST /api/profile`.
  - Notes: Validate and sanitize fields server-side; ensure `username` uniqueness; encrypt or store Razorpay credentials securely.

- Payments

  - Responsibilities: Create Razorpay orders, initiate checkout, persist pending payments, verify completions.
  - Key routes / actions: `POST /api/payments/create`, `POST /api/razorpay` (webhook/verification).
  - Notes: Use creator-specific Razorpay credentials, mark payments `done:true` after signature verification, index order IDs for fast lookup, implement idempotent handlers and retries.

- Dashboard

  - Responsibilities: Creator-only UI to view payments, pending orders, edit profile and Razorpay keys, test keys.
  - Key routes / actions: `GET /dashboard`, `POST /dashboard/profile`.
  - Notes: Protect pages with server-side session checks, paginate payment history, provide key-test flows and UI guidance.

- Public Pages (Creators)

  - Responsibilities: Render public creator pages, embed media, accept supporter inputs and payments.
  - Key routes / actions: `GET /:username` (server/component rendering).
  - Notes: Cache public responses via CDN, provide graceful fallback when profile incomplete, optimize for fast first meaningful paint.

- Chatbot (Mr. PayFix)

  - Responsibilities: Guided Razorpay setup, troubleshooting, onboarding help via conversational UI.
  - Key routes / actions: `POST /api/chatbot`.
  - Notes: Proxy and sanitize requests to external LLM (Gemini), enforce prompt and policy constraints server-side, log interactions for analytics while preserving PII rules.

Example: Payments flow endpoints and data shapes

- `POST /api/payments/create`

  - Request: `{ username, amount, name, message }`
  - Server actions: validate input → fetch creator Razorpay keys → call Razorpay create order → persist Payment with `done:false` → return `{ orderId, amount, currency, key_id }` to client

- `POST /api/razorpay` (webhook or verification endpoint)
  - Request: form data from Razorpay with `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`
  - Server actions: verify signature with stored secret → mark Payment `done:true` → redirect or respond success

Implementation notes:

- Ensure `Payment.oid` is unique and indexed for fast lookups during webhook verification.
- Store minimal supporter PII; provide an easy way to purge or export payment records for compliance.
- Keep the creator's Razorpay credentials encrypted at rest (or in a secrets store) and accessible only to the server.

Next: I'll prepare the Database Structure and System Design sections, including Mermaid ER and DFD diagrams. Proceed? (Yes — write directly / No — show drafts here first)

## Database Structure

This section describes the main collections used by BOOSTR, the purpose of each field, indexing guidance, and example Mongoose schemas. The goal is to keep data simple, query-friendly, and privacy-aware.

Core collections:

- `users` — stores creator and (optionally) admin metadata. Each document identifies a user by `email` and `username` and stores profile and payment configuration.
- `payments` — stores payment attempts and completed payments. Records include supporter info, Razorpay order id, amount, and verification state.
- `sessions` — managed by NextAuth (optional if delegated). Stores session tokens and expiry.
- `logs` / `audit` — lightweight audit records for webhook deliveries and admin actions (useful for debugging and reconciliation).

Indexing recommendations:

- `users.username` — unique index for fast lookup by public route.
- `payments.oid` — unique index on Razorpay order id for webhook verification.
- `payments.to_user` + `createdAt` — compound index for fast pagination of a creator's payments.

Example Mongoose schemas (concise):

````javascript
// models/User.js
const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, index: true },
  name: String,
  profilepic: String,
  coverpic: String,
  videos: [String],
  razorpayid: String,
  razorpaysecret: String, // store carefully: encrypted or in secrets manager
  createdAt: { type: Date, default: Date.now },
});

// models/Payment.js
const PaymentSchema = new Schema({
  name: { type: String, required: true },


  ## Testing (repo-aware)

  I inspected the repository `package.json` and developer dependencies to align recommendations with the current project state.

  Relevant facts from `package.json`:

  - Current scripts: `dev`, `build`, `start`, `lint` (no test scripts defined).
  - Dev dependencies include Tailwind/PostCSS/Autoprefixer, ESLint, and `@netlify/plugin-nextjs` (a Netlify plugin).

  Because tests are not yet configured in the repo, the immediate, low-risk steps are:

  1. Add test scripts and lightweight test tooling.
  2. Run lint in CI and add test jobs when tests exist.

  Recommended quick additions (run locally to install):

  ```powershell
  npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom mongodb-memory-server supertest
  npm install -D playwright # or cypress if preferred
````

Add these `scripts` to `package.json` (example):

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest --passWithNoTests",
  "test:unit": "jest --runInBand",
  "test:e2e": "playwright test"
}
```

Practical test plan:

- Unit tests: validate helpers (signature creation/verification), small React components.
- Integration tests: use `supertest` + `mongodb-memory-server` to exercise API routes such as `/api/payments/create` and `/api/razorpay` (webhook) without hitting Atlas.
- E2E: run Playwright against a deployed preview or local server to exercise the checkout flow (use Razorpay sandbox keys).

CI recommendation (repo-aware): keep GitHub Actions minimal until test suites exist; run ESLint and build on PRs, then add `npm run test` once tests are added.

Example `ci.yml` snippet to add later (run after adding tests):

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run test
```

Local tips:

- Use `mongodb-memory-server` for fast DB-backed tests that don't require Atlas credentials.
- Keep E2E tests gated and run them against Preview deployments (Vercel previews) or a dedicated staging environment.

## Deployment (Vercel) — repo-aware guidance

Notes from the repo: the project currently includes `@netlify/plugin-nextjs` in `devDependencies`, which indicates it was previously prepared for Netlify. If you plan to deploy on Vercel, you can leave the dependency (it won't affect Vercel) or remove it to clean up the repo.

Recommended Vercel steps tailored to this repository:

1. Optional: remove `@netlify/plugin-nextjs` if you no longer use Netlify:

```powershell
npm remove @netlify/plugin-nextjs
```

2. Import the repository to Vercel (via GitHub import) and choose the **Next.js** preset.

3. Build command: `npm run build` (the project already has `build` script). Vercel will detect Next.js automatically.

4. Set Node version in Vercel project settings to a compatible version (Node 18+ is recommended if you use dependencies built for Node 18). The project does not currently declare `engines` in `package.json` so configure it in Vercel settings.

5. Add environment variables (Preview + Production) — required names and notes below.

Essential env vars (set these in Vercel):

- `MONGODB_URI` — MongoDB Atlas connection string.
- `NEXTAUTH_URL` — production URL (e.g. `https://your-app.vercel.app`).
- `NEXTAUTH_SECRET` — long random secret.
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` — server-side credentials.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — public key for client checkout.
- `RAZORPAY_WEBHOOK_SECRET` — used to verify Razorpay webhooks.

Webhook note: Razorpay expects your webhook endpoint to be reachable from their service. For production set the webhook URL in Razorpay to `https://<your-vercel-domain>/api/razorpay/webhook` and ensure the `RAZORPAY_WEBHOOK_SECRET` matches.

Optional `vercel.json` (only if you want custom routing or function memory settings):

```json
{
  "version": 2,
  "routes": [{ "src": "/api/(.*)", "dest": "/api/$1" }]
}
```

Post-deploy checklist (practical):

- Visit the Vercel deployment URL and confirm pages render.
- Run a sandbox Razorpay checkout using preview env keys and verify webhook handling updates the DB.
- Check Vercel build and server logs for errors; adjust Node version if native module build errors appear.

Next steps I can take now (tell me which):

- Add the `test` scripts and install recommended devDependencies in `package.json`.
- Create `.github/workflows/ci.yml` with the minimal CI pipeline.
- Create a `vercel.json` file and add it to the repo.

---

_I updated the Testing and Deployment sections to reflect the repository's current state and added concrete, repo-aware actions you can take next._

- Native Next.js support (server-side rendering, API routes, image optimization).
- Preview deployments for every PR and easy rollbacks.
- Simple environment variable management and integrations (logging, monitoring).

### Quick deploy steps

1. Sign in to Vercel and import the `Boostr` GitHub repository.
2. Select the **Next.js** framework preset during import.
3. Set the Build Command to `npm run build` (or `next build`) and leave Output Directory empty (Next auto-detected).
4. Add Environment Variables (see list below) for both Preview and Production scopes.
5. Deploy — Vercel will create a Preview for the branch and Production deployments when you push to `main` (or your configured production branch).

### Essential environment variables

Set these in the Vercel dashboard under Project Settings → Environment Variables. Use the appropriate scope (Preview / Production):

- `MONGODB_URI` or `MONGO_URI` — MongoDB Atlas connection string.
- `NEXTAUTH_URL` — your app URL (e.g., `https://your-app.vercel.app`).
- `NEXTAUTH_SECRET` — long random secret for NextAuth session encryption.
- `RAZORPAY_KEY_ID` — server-side Razorpay Key ID (keep private).
- `RAZORPAY_KEY_SECRET` — server-side Razorpay Key Secret.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — client-side Razorpay Key ID used in the browser.
- `RAZORPAY_WEBHOOK_SECRET` — webhook verification secret.
- Optional: `SENTRY_DSN`, `GA_MEASUREMENT_ID`, other third-party keys.

Important: mark server-only secrets as private (do not expose them as `NEXT_PUBLIC_...`). Only put the public key in `NEXT_PUBLIC_RAZORPAY_KEY_ID` so the browser can initialize checkout.

### Webhooks and URLs

- Add your webhook endpoint URL to the Razorpay dashboard: `https://your-app.vercel.app/api/razorpay/webhook`.
- Use the same `RAZORPAY_WEBHOOK_SECRET` in both Razorpay and Vercel to validate payloads.

### `vercel.json` example (optional)

```json
{
  "version": 2,
  "builds": [{ "src": "package.json", "use": "@vercel/node" }],
  "routes": [{ "src": "/api/(.*)", "dest": "/api/$1" }]
}
```

To tune function resources (if you need longer runtimes or more memory), add a `functions` block:

```json
{
  "functions": {
    "api/**/*.js": { "memory": 1024, "maxDuration": 10 }
  }
}
```

### Post-deploy checks

- Confirm the app loads at the Vercel URL and the `/api/health` (if present) returns OK.
- Run a sandbox checkout with Razorpay test keys and validate the webhook handling.
- Check Vercel logs (Production and Preview) for build or runtime errors.

### CI + Deploy integration

- Use Vercel for deployments while GitHub Actions runs tests and linters on each PR. Configure branch protection rules to require passing CI before merging to `main`.

### Troubleshooting tips

- Build fails with native dependency errors: ensure your Node version in Vercel matches your `engines.node` in `package.json` (or set runtime in project settings).
- Missing env var errors: double-check variable names and scopes (Preview vs Production).
- Webhook verification failures: ensure the secret string matches exactly and verify raw request body when computing signatures.

---

If you want, I can also:

- Add the example GitHub Actions CI file to `.github/workflows/ci.yml`.
- Add `vercel.json` to the repo with memory/timeout settings tailored for the API routes.
- Provide concrete Jest + Supertest example tests for the Razorpay webhook and Mongoose model tests.

```

```
