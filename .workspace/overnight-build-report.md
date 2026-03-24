# Overnight Build Report — Feasibility Intelligence MVP

Date: 2026-03-25 (AEST)
Project: feasibility-intelligence
Target URL: https://feasibility-intelligence.thedeploylab.au

## What was built

- Rebuilt the project as a **Next.js App Router + React + TypeScript + Tailwind CSS** landing page.
- Implemented a premium dark SaaS visual system aligned to the provided palette:
  - Background `#0A0D11`
  - Muted blue primary accents
  - Warm neutral accent
  - Off-white text
- Implemented a **Framer Motion hero animation** (`components/hero-engine.tsx`) with required visual structure:
  - Left: inputs (Zoning, Site Metrics, Constraints, Market)
  - Middle: 3 vertical processing layers
  - Right: outputs (Not feasible / Needs review / High potential)
  - Smooth looped animation with subtle flowing lines and pulsing nodes
- Implemented required page structure and messaging:
  1. Hero
  2. Problem
  3. Solution
  4. How it works
  5. CTA with placeholder email capture
- Added OG/Twitter metadata and preview asset for link unfurls:
  - `public/og/feasibility-intelligence-preview.svg`
- Added deployment script:
  - `scripts/deploy-prod.sh`
  - Build + static export + release publish to MVP host release path

## What is working

### Build / quality

- `npm run typecheck` passes.
- `npm run build` passes.
- No TypeScript errors.
- Static export generated and deployable.

### GitHub workflow

Repository is active and continuously pushed:
- Remote: `https://github.com/simon1971/feasibility-intelligence.git`
- Branch: `main`
- Commits completed during this run:
  - `ca79e1f` — `feat: rebuild site as nextjs landing page`
  - `f00ed7b` — `fix: patch nextjs and harden deployment script`

### Deployment (server-side)

- New release deployed to MVP host path:
  - `/srv/mvps/feasibility-intelligence/prod/releases/20260324T150444Z`
- Current symlink points to latest release:
  - `/srv/mvps/feasibility-intelligence/prod/current`
- Nginx site configured and loaded:
  - `/etc/nginx/sites-available/feasibility-intelligence.thedeploylab.au`
  - symlinked in `/etc/nginx/sites-enabled/`
  - nginx config test and reload successful
- Verified content is served correctly when host resolves to MVP server:
  - `curl --resolve feasibility-intelligence.thedeploylab.au:80:127.0.0.1 http://feasibility-intelligence.thedeploylab.au/`
  - returned live Next-rendered landing HTML with expected metadata and sections

## Limitations / blockers

1. **Public DNS record for `feasibility-intelligence.thedeploylab.au` is currently missing/unresolved** from this environment.
   - Current result: `Could not resolve host: feasibility-intelligence.thedeploylab.au`
   - This is an external DNS layer issue (Cloudflare/authoritative DNS), not application/runtime.
2. Browser-tool visual screenshot validation was unavailable in-session due browser service timeout, so visual verification was done via HTML/render path checks and structure review.

## Recommended next steps

1. Create/verify DNS record for `feasibility-intelligence.thedeploylab.au` to point to the MVP delivery endpoint (matching the existing `*.thedeploylab.au` routing pattern).
2. After DNS propagation, verify externally:
   - `https://feasibility-intelligence.thedeploylab.au`
   - OG image URL: `https://feasibility-intelligence.thedeploylab.au/og/feasibility-intelligence-preview.svg`
3. Add HTTPS termination route if required by current edge pattern (if not already inherited from existing setup).
4. Optional polish pass:
   - Tune responsive spacing/typography at 375px and 768px breakpoints
   - Replace CTA placeholder with real capture endpoint
   - Add lightweight analytics

## Status

- Application build: ✅
- Hero animation requirement: ✅
- GitHub continuous commit/push: ✅
- Server deployment and nginx route: ✅
- Public URL resolution: ❌ (blocked by DNS)

Current overall status: **Near-complete — waiting on DNS propagation/record creation for public accessibility at the exact target hostname.**
