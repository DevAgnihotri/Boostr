# Project Summary — Boostr

## Project Overview

- Problem statement: Provide a lightweight Next.js-based creator support platform where fans can send one-time payments (donations) to creators and creators can receive funds via Razorpay.
- Objective: Let users view a creator profile, make payments through Razorpay checkout, and let creators collect payments tied to their own Razorpay credentials.
- Scope: Frontend built with Next.js (App Router), server API routes for payment verification and auth, MongoDB (mongoose) for users and payments, and NextAuth for OAuth sign-in.

## Your Role & Responsibilities

(I describe concrete tasks inferred from the repository — these are the typical responsibilities for the author of this code.)

- Implemented server-side and client-side Razorpay integration: created orders, opened client checkout, and verified payments.
- Built and wired NextAuth OAuth sign-in (GitHub and Google providers) and the callback logic that ensures DB user records exist.
- Designed and implemented `User` and `Payment` mongoose schemas and the DB connection helper.
- Implemented the UI pages and components for profile, payment flow, and payment-related client logic (`PaymentPage`, `SessionWrapper`, etc.).
- Implemented server API routes that verify Razorpay signatures and update payment records.

## Technical Stack Used

- Framework: Next.js (App Router) — `next` in package.json (v14.x).
- Authentication: `next-auth` (GitHub + Google providers configured).
- Database: MongoDB with `mongoose` (models in `models/User.js` and `models/Payment.js`). DB connection helper at `db/connectDb.js`.
- Payments: Razorpay REST API + client checkout. `razorpay` package is used for signature verification utilities and server code uses direct REST calls for order creation.
- UI: React + Next.js client components, `react-toastify` for toasts, TailwindCSS for styling.
- Hosting/deploy hints: Netlify plugin in `devDependencies` (project includes `@netlify/plugin-nextjs`).

## Challenges Faced & Solutions (especially Razorpay integration and multi-provider auth)

- Challenge: Securely creating and verifying payments when multiple creators must receive funds into their own Razorpay accounts.
  - Solution: Store per-creator Razorpay credentials in the `User` document (`razorpayid` and `razorpaysecret`). When a supporter initiates a payment, the server uses the recipient's credentials to create an order via Razorpay REST API (basic auth). The created order id is saved in `Payment` as `oid` and later used for verification.
  - Implementation details:
    - Client `PaymentPage` calls `initiate()` (server action in `actions/useractions.js`) which reads the recipient's Razorpay keys and calls `https://api.razorpay.com/v1/orders` with Basic auth (key_id:key_secret encoded in base64).
    - After checkout completes, the client handler posts `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature` to server route `/api/razorpay`.
    - Server `app/api/razorpay/route.js` uses `validatePaymentVerification` from `razorpay/dist/utils/razorpay-utils` and the recipient's `razorpaysecret` to verify the signature. On success it updates the `Payment` document (`done: true`) and redirects the user to a success URL.
- Challenge: Storing and using secrets safely in env + per-user secrets.
  - Solution: The repo reads global keys from `.env.local` (e.g. `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID`) but the code primarily uses per-user secrets from the DB. This enables creators to receive funds into their own accounts while still allowing a fallback global key if needed.
- Challenge: Ensuring users created by OAuth providers have DB entries that can accept payments and have default usernames.
  - Solution: NextAuth `signIn` callback (in `app/api/auth/[...nextauth]/route.js`) connects to DB and creates a `User` record if the email does not exist; `session` callback enriches session.user.name from DB.
- Challenge: Serverless/edge-like environments where DB connections may be ephemeral.
  - Solution: `db/connectDb.js` tries to connect using environment variables (robust selection) and throws an informative error if MONGO_URI is missing. Callers await `connectDb()` before DB operations.

## Learning Outcomes

- Razorpay flow: Learned how to (1) create server-side orders with Basic auth, (2) open checkout on the client with `order_id` and `key_id`, and (3) verify signatures server-side using the order id + payment id + secret. Also learned practical tradeoffs between global and per-user credentials.
- OAuth + multi-provider sign-in: Implemented NextAuth providers (GitHub, Google), learned how to create DB user records in the `signIn` callback, and how to add app-specific profile data (username, profilepic) separately from provider profiles.
- MongoDB + Mongoose best practices: Learned to use a shared `connectDb()` helper, keep schemas simple and serializable for client transfer (the code converts dates/IDs to strings), and how to perform safe update operations across related collections (e.g., updating payments if a username is changed).
- Practical app reliability: Handling missing env variables clearly, defensive checks for missing Razorpay credentials, and defensive client-side checks (disable payments when creator credentials are missing) to improve UX and security.

## Quick File Map (where to look for the implementation)

- [app/api/razorpay/route.js](app/api/razorpay/route.js) — payment verification route using `validatePaymentVerification`.
- [actions/useractions.js](actions/useractions.js) — server action `initiate()` creates Razorpay order and saves `Payment` with `oid`.
- [models/User.js](models/User.js) — `User` schema (includes `razorpayid` and `razorpaysecret`).
- [models/Payment.js](models/Payment.js) — `Payment` schema (fields: `oid`, `amount`, `to_user`, `done`).
- [app/api/auth/[...nextauth]/route.js](app/api/auth/[...nextauth]/route.js) — NextAuth providers and callbacks to create/augment DB users.
- [db/connectDb.js](db/connectDb.js) — DB connection helper used across server actions and API routes.
- [components/PaymentPage.js](components/PaymentPage.js) — client UI that opens Razorpay checkout and posts verification to the server.
- [.env.local](.env.local) — sample env vars for `MONGO_URI`, OAuth client IDs/secrets, and optional Razorpay keys.
