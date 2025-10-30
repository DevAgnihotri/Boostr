Create a cinematic, production-ready landing page and core UI for a modern web app with these exact design and engineering constraints:

Palette & tokens: canvas black #000000, text white #FFFFFF, primary green #10B981, energetic orange CTA #FF6A00, muted gray #9CA3AF. Use the green for subtle accents and success states, orange exclusively for primary CTAs and micro-interaction highlights.

Typography: use a thin/extralight geometric sans for headings (Inter Thin or similar, 100–300 weight) and light (300–400) for body copy; increase letter-spacing slightly for large hero headlines.

Hero: full-bleed background (video or animated gradient) that uses absolute inset-0 w-full h-full object-cover, autoplay muted loop playsInline; include a poster image fallback for mobile/data-saving; remove heavy dark tints so imagery remains vivid; add a slow cinematic scale (transform: scale(1) to scale(1.03)) over 20–30s for a parallax/zoom feel.

Motion & staging: staggered mask-based text reveal for the hero title (each line 600–800ms with 120–160ms stagger, easing cubic-bezier(.22,.9,.27,1)); CTA micro-animations on hover (scale 1.03 + soft orange glow); subtle parallax layers (background slowest, mid-layer shapes slightly faster, content static); add a low-opacity film grain overlay (2–3%) for texture. Honor prefers-reduced-motion with simplified fades and no parallax.

Accessibility & performance: decorative hero video set aria-hidden and provide caption/transcript if content is essential; ensure white-on-black contrast for body text; keyboard focus outlines for all interactive elements (3px orange ring or visible alternative); lazy-load non-critical assets; include poster fallback and mobile video disable.

Core components and behaviors to deliver:

- Navbar: left thin logo, right minimal controls + profile avatar initial; responsive collapse for mobile.
- Hero: title, subhead, primary orange CTA, secondary green-bordered CTA, and optional small animated accent shapes.
- Feature sections: cards with dark panels, thin green accents or orange micro accents, light copy, and CTA states.
- About: centered max-width content (max-w-6xl), well-spaced typography.
- Login (client): use next-auth useSession(); implement client-side redirect so when session exists the user is pushed to /dashboard (useEffect watching [session, router]).
- Dashboard: protected client-side skeleton that redirects to /login if no session.
- Profile/[username]: top cover image with no overlay opacity (full brightness), support/payment list UI with red/orange CTA buttons.
- Footer: black background, extralight small copy and a tiny orange brand accent.

Tech & deliverables: produce a Next.js App Router scaffold using Tailwind CSS and Framer Motion (or GSAP) for animations; include a Tailwind config with the color tokens, utility classes, and font settings; create React components for Navbar, Hero, FeatureCard, Footer, LoginClient, Dashboard, and Profile; include a Figma or design spec file (color/typography tokens, component sizes, asset exports) and sample hero video + poster image. Provide code comments on animation timings and prefers-reduced-motion fallbacks.

Acceptance criteria: hero video fills the hero section and scales slowly; hero text reveals in a cinematic stagger; primary CTA uses orange and shows micro-interaction; login route immediately redirects authenticated users to /dashboard; mobile uses poster fallback and disables heavy parallax; focus states are visible and accessible.

Output format required from the tool/agent you give this prompt to: 1) a Figma design file or equivalent visual spec, 2) a Next.js project skeleton (file tree) with the components implemented and Tailwind config, 3) a small assets folder with poster image and a short loop video or recommended free stock link, and 4) an animation spec sheet listing durations, easings, and reduced-motion fallbacks.

Tone for visuals: cinematic, minimal, luxe — lots of negative space, restrained motion, and clear hierarchy. Use green for calm confidence and orange for energetic CTAs. Keep all copy and icons light-weight and elegant.

End of prompt.
