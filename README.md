# Sonali Jain — Portfolio

Cloud & DevOps engineer portfolio, styled as a live CI/CD pipeline. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, with GSAP for the scroll-driven pipeline rail, terminal typing, and custom cursor.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** for the build pipeline; the bespoke visual system (pipeline rail, terminal card, custom cursor) lives in `src/app/globals.css` as plain CSS driven by design-token custom properties
- **GSAP + ScrollTrigger** for the pipeline-rail progress, scroll reveals, and terminal typing sequence
- **next/font** for Bricolage Grotesque (display), IBM Plex Sans (body), IBM Plex Mono (data/labels)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `src/content/site.tsx` — all copy and data (nav, stats, jobs, skills, articles, repos) as typed arrays
- `src/components/CustomCursor.tsx` — the cursor dot/ring + magnetic hover (client component)
- `src/components/SiteEffects.tsx` — terminal typing, count-up stats, scroll reveals, pipeline-rail progress (client component)
- `src/app/page.tsx` — page markup, composed from the content above
- `src/app/globals.css` — design tokens + the full visual system
