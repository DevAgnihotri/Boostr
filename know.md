# Boostr Repository Overview (know.md)

This document outlines the full directory structure of the Boostr project and explains the purpose of each folder and file based on common Next.js conventions and filenames discovered in the repository.

## Directory Tree

```
Boostr/
├─ actions/
│  └─ useractions.js
├─ app/
│  ├─ globals.css
│  ├─ layout.js
│  ├─ favicon.ico
│  ├─ page.js
│  ├─ [username]/
│  │  └─ page.js
│  ├─ about/
│  │  └─ page.js
│  ├─ api/
│  │  ├─ auth/
│  │  │  └─ [...nextauth]/
│  │  │     └─ route.js
│  │  ├─ chatbot/
│  │  │  └─ route.js
│  │  ├─ profile/
│  │  │  └─ route.js
│  │  └─ razorpay/
│  │     └─ route.js
│  ├─ creators/
│  │  └─ page.js
│  ├─ dashboard/
│  │  └─ page.js
│  └─ login/
│     └─ page.js
├─ components/
│  ├─ ChatBot.js
│  ├─ Dashboard.js
│  ├─ Footer.js
│  ├─ Navbar.js
│  ├─ PaymentPage.js
│  └─ SessionWrapper.js
├─ db/
│  └─ connectDb.js
├─ models/
│  ├─ Payment.js
│  └─ User.js
├─ public/
│  ├─ avatar.gif
│  ├─ coin.gif
│  ├─ group.gif
│  ├─ man.gif
│  ├─ next.svg
│  ├─ tea.gif
│  ├─ vercel.svg
│  └─ assets/
│     └─ videos/
│        └─ hero-video.mp4
├─ .eslintrc.json
├─ .gitignore
├─ jsconfig.json
├─ netlify.toml
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ README.md
```

## Folders

- actions/

  - Holds server/client actions that encapsulate side-effectful logic (e.g., user flows). Centralizes calls used across pages/components.

- app/

  - Next.js App Router source (pages, layouts, API routes).
  - `layout.js`: Root layout (shared HTML structure, metadata, providers).
  - `globals.css`: Global styles applied across the app.
  - `favicon.ico`: Site icon.
  - `page.js`: Home route ("/") UI.
  - [username]/
    - `page.js`: Dynamic user profile page for `/[username]`.
  - about/
    - `page.js`: Static About page.
  - creators/
    - `page.js`: Listing or landing for creators.
  - dashboard/
    - `page.js`: User dashboard view.
  - login/
    - `page.js`: Authentication/login page.
  - api/
    - Serverless route handlers (Edge/Node) for backend endpoints.
    - auth/[...nextauth]/
      - `route.js`: NextAuth handler for OAuth/credentials sessions.
    - chatbot/
      - `route.js`: Chatbot API endpoint (handles chat requests/responses).
    - profile/
      - `route.js`: Profile API (fetch/update of user profile data).
    - razorpay/
      - `route.js`: Payment webhook/operations for Razorpay integration.

- components/

  - Reusable React components.
  - `ChatBot.js`: Chat UI widget/container.
  - `Dashboard.js`: Dashboard view shell/widgets.
  - `Footer.js`: Site footer.
  - `Navbar.js`: Top navigation bar.
  - `PaymentPage.js`: Payment flow UI (hooks into Razorpay API).
  - `SessionWrapper.js`: Wraps app/sections with auth session provider.

- db/

  - Backend/database utilities.
  - `connectDb.js`: Database connection helper (e.g., establishing a single shared connection instance).

- models/

  - Data models/schemas used by API routes.
  - `Payment.js`: Payment model (amount, status, metadata).
  - `User.js`: User model (auth/provider/profile fields).

- public/
  - Static assets served directly by Next.js.
  - Images/SVG/GIFs and marketing media.
  - `assets/videos/hero-video.mp4`: Landing/hero video asset.

## Root Files

- `.eslintrc.json`: ESLint configuration (lint rules and parser options).
- `.gitignore`: Files and folders ignored by Git.
- `jsconfig.json`: JS/TS path aliases and editor IntelliSense configuration.
- `netlify.toml`: Netlify build/deploy configuration (redirects, env, commands).
- `next.config.mjs`: Next.js configuration (experimental flags, images, headers, etc.).
- `package.json`: Project metadata, scripts, and npm dependencies.
- `package-lock.json`: Exact dependency lockfile for reproducible installs.
- `postcss.config.js`: PostCSS pipeline configuration.
- `tailwind.config.js`: Tailwind CSS theme and content scanning config.
- `README.md`: Primary project documentation and usage instructions.

## Notes

- Descriptions reflect common patterns for Next.js App Router projects and are inferred from filenames and structure.
- API route behavior, models, and DB specifics are determined by code inside each file; refer to those files when implementing or debugging features.
