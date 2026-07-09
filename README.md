# Rancho da Vila — Landing Page

A high-conversion, single-page marketing site for a Brazilian self-service
restaurant ("self-service por quilo"), built with React 19, Vite 8, and TanStack
Router. The entire conversion funnel is anchored on a **WhatsApp deeplink** —
no backend, no forms posting anywhere, no analytics pipeline. Just a fast,
SEO-friendly page that gets hungry visitors to message the restaurant.

A Portuguese (Brazil) version of this document is available at
[`README.pt-BR.md`](./README.pt-BR.md).

## Key Features

- Animated hero with motion-driven `CountUp` stats and reduced-motion fallback
- Service cards (Self-Service, Marmitex, Drive-Through) with lazy-loaded imagery
- Testimonials section with rating stars and avatars
- Sticky navbar with scroll-aware backdrop blur
- Floating WhatsApp button (`WhatsAppFAB`) with pulse animation + tooltip
- Mobile sticky CTA bar (visible < 768px)
- Contact form that composes a `wa.me` URL and opens WhatsApp in a new tab
- Embedded Google Map (`output=embed`, no API key required)
- SEO: `lang="pt-BR"`, Open Graph, Twitter cards, `Schema.org` JSON-LD
  (`Restaurant`)
- Smooth-scroll anchor navigation between sections
- Dual design-token system (brand hex palette + shadcn/ui oklch palette)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Configuration & Content](#configuration--content)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)
- [Known Issues & Roadmap](#known-issues--roadmap)
- [Project History](#project-history)
- [License](#license)

---

## Tech Stack

| Layer           | Technology                                         |
| --------------- | -------------------------------------------------- |
| Language        | TypeScript 5.8 (`strict: true`)                    |
| UI Runtime      | React 19.2                                         |
| Build Tool      | Vite 8.0                                           |
| Routing         | `@tanstack/react-router` 1.168 (config-based, SPA) |
| Data Fetching   | `@tanstack/react-query` 5.83 (installed, not used) |
| Styling         | Tailwind CSS 4.2 + `tw-animate-css`                |
| Animation       | `motion` 12 (Framer Motion)                        |
| Icons           | `lucide-react` 0.575                               |
| UI Kit          | shadcn/ui ("new-york") — 46 components installed   |
| Package Manager | Bun 1.1+ (primary) / npm / yarn / pnpm (alt.)      |
| Lint / Format   | ESLint 9 + `typescript-eslint` + Prettier 3        |
| Origin Template | Lovable `tanstack_start_ts_2026-06-17`             |

---

## Prerequisites

- **Node.js** 20 or higher (required by Vite 8)
- **Bun** 1.1 or higher ([install](https://bun.sh/docs/install)) —
  alternative package managers also work, see
  [Getting Started](#getting-started)
- **Git** 2.20+

No database, no API keys, no environment variables are required to run the
project locally.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gabrieljeronimodev/landing-page-rancho-da-vila.git
cd landing-page-rancho-da-vila
```

### 2. Install Dependencies

The repository ships both `bun.lock` and `package-lock.json`. Choose **one**
package manager and stick with it to avoid lockfile drift.

```bash
# Bun (recommended)
bun install
```

<details>
<summary>Alternative package managers</summary>

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

</details>

### 3. Start the Development Server

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Vite
exposes the dev server on port **5173** by default (no override in
`vite.config.ts`).

Hot Module Replacement (HMR) is active — edits to `src/routes/index.tsx` update
the page instantly.

### 4. Verify the Build (optional)

```bash
bun run build      # produces ./dist/
bun run preview    # serves the production build locally
```

---

## Available Scripts

| Command             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `bun run dev`       | Start Vite dev server with HMR on `:5173`              |
| `bun run build`     | Type-check + production build to `dist/`               |
| `bun run build:dev` | Build in development mode (unminified, dev sourcemaps) |
| `bun run preview`   | Locally serve the production build from `dist/`        |
| `bun run lint`      | Run ESLint across the codebase                         |
| `bun run format`    | Run Prettier against the codebase                      |

Replace `bun run` with `npm run`, `yarn`, or `pnpm run` if you chose a
different package manager.

---

## Architecture

### Directory Structure

```
.
├── index.html                  # HTML shell: meta tags, OG, JSON-LD, fonts
├── vite.config.ts              # Vite + React + Tailwind 4 plugins
├── tsconfig.json               # TS strict, path alias @/* -> ./src/*
├── components.json              # shadcn/ui config (new-york style, slate base)
├── eslint.config.js            # ESLint + typescript-eslint + prettier
├── .prettierrc                 # printWidth 100, double quotes, trailing comma all
├── src/
│   ├── main.tsx                # Bootstrap React + QueryClient + RouterProvider
│   ├── router.tsx              # TanStack Router (root + index "/")
│   ├── styles.css              # Tailwind 4 + dual design tokens + wa-pulse keyframe
│   ├── routes/
│   │   ├── index.tsx          # THE LANDING PAGE — 880 lines, 14 components
│   │   └── README.md          # (stale) describes TanStack Start file-based routing
│   ├── components/
│   │   └── ui/                # 46 shadcn/ui components (template, mostly unused)
│   ├── hooks/
│   │   └── use-mobile.tsx     # useIsMobile() via matchMedia(768px) — unused by LP
│   ├── lib/
│   │   └── utils.ts           # cn() = twMerge(clsx(...))
│   └── assets/                # Local images: hero, about, service cards, avatars
├── dist/                       # Production build output (gitignored)
└── .lovable/                   # Lovable metadata (project.json, plan.md)
```

### Routing

Routing is configured **manually** in `src/router.tsx` (not file-based,
despite what `src/routes/README.md` suggests — that file is stale template
boilerplate left over from the TanStack Start origin).

- `rootRoute` (`src/router.tsx:14`) wraps all outlets in a `QueryClientProvider`.
- `indexRoute` (`src/router.tsx:18`) registers `path: "/"` with the `LandingPage`
  component imported from `./routes/index`.
- The router is exported at `src/router.tsx:26` with `scrollRestoration: true`.

There is exactly **one navigable route** (`/`). All section-to-section
navigation is anchor scrolling (`#services`, `#about`, `#testimonials`,
`#contact`) smoothed by `html { scroll-behavior: smooth }` in `styles.css:27`.

### Landing Page Composition

The entire landing page lives in `src/routes/index.tsx` as 14 inline component
functions. composition order matches the rendered tree:

| Component         | Location                   | Role                                                      |
| ----------------- | -------------------------- | --------------------------------------------------------- |
| `LandingPage`     | `src/routes/index.tsx:38`  | Root composition: nav + main sections + footer + fabs     |
| `TopWrapper`      | `src/routes/index.tsx:59`  | Fixed-position wrapper for the navbar                     |
| `Navbar`          | `src/routes/index.tsx:67`  | Scroll-aware header with anchor links + WhatsApp CTA      |
| `Hero`            | `src/routes/index.tsx:115` | Full-bleed hero with badge, headline, CTAs, stats         |
| `CountUp`         | `src/routes/index.tsx:200` | `useInView` + `motion` counter; honors reduced motion     |
| `TrustBar`        | `src/routes/index.tsx:231` | 4 animated stat cards (rating, reviews, years, dishes)    |
| `Services`        | `src/routes/index.tsx:256` | 3 service cards (Self-Service / Marmitex / Drive-Thru)    |
| `SectionHead`     | `src/routes/index.tsx:335` | Reusable eyebrow + H2 helper with `whileInView`           |
| `About`           | `src/routes/index.tsx:374` | Two-column story + feature points + image overlay         |
| `Testimonials`    | `src/routes/index.tsx:489` | 3 `motion.figure` testimonials with 5-star ratings        |
| `CTASection`      | `src/routes/index.tsx:564` | Full-width gradient CTA strip                             |
| `Contact`         | `src/routes/index.tsx:599` | Info rows + form that composes a `wa.me` URL + map iframe |
| `InfoRow`         | `src/routes/index.tsx:716` | Icon + label + text row, optionally wrapped in `<a>`      |
| `Footer`          | `src/routes/index.tsx:750` | 3-column footer with social, quick links, contact         |
| `SocialLink`      | `src/routes/index.tsx:828` | Circular social icon with hover (inline SVG)              |
| `WhatsAppFAB`     | `src/routes/index.tsx:851` | Floating fixed green button with `wa-pulse` animation     |
| `MobileStickyCTA` | `src/routes/index.tsx:869` | Bottom sticky CTA bar visible on `< 768px`                |

Reusable animation variants live near the top of the file:
`fadeUp` (`src/routes/index.tsx:29`) and `stagger` (`src/routes/index.tsx:33`).

### Design System

`src/styles.css` (174 lines) contains **two parallel token systems**:

1. **Brand tokens** (`styles.css:7-25`) — `--color-primary: #C0392B`,
   `--color-secondary: #E67E22`, `--color-accent: #F39C12`, plus background,
   foreground, muted, card, border, shadows, radii, and the two Google Fonts
   (`Playfair Display` for display, `Outfit` for body). The landing page
   consumes these via `var(--color-*)` throughout `routes/index.tsx`.
2. **shadcn/ui tokens** (`styles.css:51-163`) — Tailwind 4 `@theme inline`
   mapping plus `oklch` palettes for light/dark. Consumed by the 46 unused
   `src/components/ui/*` components but **not** by the landing page.

Because the two namespaces diverge (`--color-primary` hex vs `--primary`
oklch), the landing page always uses `var(--color-*)` explicitly — it never
relies on Tailwind utilities like `bg-primary` (which would resolve to the
shadcn oklch gray instead of the brand red).

The `WhatsAppFAB` pulse is defined at `styles.css:31-35` as a 2.2s
`@keyframes wa-pulse` (scale 1 → 1.08 → 1).

### Data Flow

```
Visitor
   │
   ├──> anchor scroll (#services / #about / #testimonials / #contact)
   │         │
   │         └──> motion `whileInView` triggers once
   │
   ├──> any CTA  ──> window.open("https://wa.me/[WHATSAPP_NUMBER]?text=...")
   │
   └──> contact form submit ──> composes ?text= ──> window.open wa.me link
                                                              │
                                                              └──> WhatsApp app / web
```

No requests leave the browser except for the `wa.me` redirect, the Google
Maps iframe, and the Google Fonts stylesheet.

### External Integrations

1. **WhatsApp deeplink** — `https://wa.me/${CLIENT_WHATSAPP}` referenced in
   12+ places via the constant `WA_LINK` defined at `src/routes/index.tsx:27`.
   The form's submit handler at `src/routes/index.tsx:601` URL-encodes
   `Nome / Telefone / Mensagem` and appends it as `?text=`.
2. **Google Maps embed** — `src/routes/index.tsx:700-709`, an `<iframe>` using
   `https://maps.google.com/maps?q=...&output=embed` with no API key, loaded
   lazily (`loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`).
3. **Schema.org JSON-LD** — `index.html:29-45` exposes a `Restaurant` node
   with address, telephone, opening hours; useful for Google rich results.

---

## Configuration & Content

All business content is **hardcoded** in `src/routes/index.tsx`. The constants
`CLIENT_WHATSAPP` and `WA_LINK` (`src/routes/index.tsx:26-27`) are the only
pieces referenced from multiple call sites — everything else (address, phone,
hours, stats, testimonials) is inline JSX.

To adapt this template for a different restaurant, edit:

| What                  | Where                                       | Use Placeholder     |
| --------------------- | ------------------------------------------- | ------------------- |
| WhatsApp number       | `src/routes/index.tsx:26`                   | `[WHATSAPP_NUMBER]` |
| Business address      | `src/routes/index.tsx` (Contact `InfoRow`s) | `[STREET_ADDRESS]`  |
| Phone number (shown)  | `src/routes/index.tsx` (Contact `InfoRow`)  | `[PHONE]`           |
| Opening hours         | `src/routes/index.tsx` (Contact `InfoRow`)  | `[HOURS]`           |
| Hero background image | `src/assets/images/hero-bg.jpg`             | Replace file        |
| Service card images   | `src/assets/images/service-*.jpg`           | Replace files       |
| Testimonial avatars   | `src/assets/*.jpg`                          | Replace files       |
| SEO metadata          | `index.html` (`<title>`, OG, JSON-LD)       | Replace literals    |

Replace placeholders (`[...]`) with the restaurant's real values before
deploying. The `[WHATSAPP_NUMBER]` must be in international format, digits
only, country code first (e.g. `5511999999999` for Brazil).

---

## Environment Variables

**None required.** The project is a static SPA — there is no backend, no
secrets, no credentials.

Optional future env vars (not currently wired in — see
[Roadmap](#roadmap)) could include:

| Variable                 | Purpose                               | Default           |
| ------------------------ | ------------------------------------- | ----------------- |
| `VITE_WHATSAPP_NUMBER`   | Replace hardcoded `CLIENT_WHATSAPP`   | hardcoded literal |
| `VITE_GOOGLE_MAPS_QUERY` | Replace hardcoded map `<iframe>` `q=` | hardcoded literal |
| `VITE_BUSINESS_ADDRESS`  | Replace `InfoRow` address             | hardcoded literal |
| `VITE_BUSINESS_PHONE`    | Replace `InfoRow` phone               | hardcoded literal |
| `VITE_BUSINESS_HOURS`    | Replace `InfoRow` hours               | hardcoded literal |

`VITE_*` prefix is required for Vite to expose them to the client bundle (see
[Vite env vars](https://vite.dev/guide/env-and-mode.html)).

---

## Testing

There is **no test setup** in this project. No test runner is installed or
configured.

Suggested future stack (not yet active):

- [Vitest](https://vitest.dev/) for unit/component tests
- [@testing-library/react](https://testing-library.com/) for DOM assertions
- [Playwright](https://playwright.dev/) for E2E coverage of anchor
  navigation, WhatsApp deeplink composition, and reduced-motion fallback
- [@tanstack/router-vitest-file-router-mock] or route-level fixtures once
  routes are extracted

Until a runner exists, lint is the closest thing to verification:

```bash
bun run lint
bun run build   # type-checks via TS + Vite
```

---

## Build & Deployment

### Production Build

```bash
bun run build
```

Outputs a static, fully prerendered SPA to `dist/` containing `index.html`
plus `assets/` (hashed JS/CSS chunks and image assets). No Node runtime is
required at serve time — any static host works.

### SPA Hosting Requirements

Because TanStack Router uses the History API and there is only one route, the
host must **fallback all unknown paths to `index.html`** so deep links and
refreshes resolve. On a VPS with nginx this means `try_files
$uri /index.html;`. Vercel, Netlify, and Cloudflare Pages configure this
automatically when "SPA" mode is selected.

### Recommended Platforms

Pick one; follow the platform's official Vite deployment guide:

- **Vercel** — <https://vercel.com/docs/frameworks/vite>
- **Netlify** — <https://docs.netlify.com/frameworks/vite/>
- **Cloudflare Pages** — <https://developers.cloudflare.com/pages/framework-guides/deploy-anything/#vite-project-structure>

Configuration values common to all three:

| Field            | Value                      |
| ---------------- | -------------------------- |
| Build command    | `bun run build`            |
| Output directory | `dist`                     |
| Install command  | `bun install` (or your PM) |
| Node version     | 20+                        |
| Environment      | none required              |

### Local Preview of the Production Build

```bash
bun run build
bun run preview
```

`vite preview` serves `dist/` on a local port (default `4173`) with SPA
fallback enabled — useful to validate the production artifact before
deploying.

---

## Troubleshooting

### Port 5173 already in use

```bash
# Find and kill the process holding the port
lsof -i :5173       # macOS / Linux
# or use a different port
bun run dev -- --port 5174
```

### Lockfile conflict (`bun.lock` vs `package-lock.json`)

Both lockfiles exist in the repository, which can confuse contributors. Pick
**one** package manager for the project and add the other lockfile to
`.gitignore`. If you commit to Bun:

```gitignore
# .gitignore
package-lock.json
pnpm-lock.yaml
yarn.lock
```

(Already partially done — see `.prettierignore`, but not `.gitignore`.)

### Google Maps iframe blocked by Content-Security-Policy

If you deploy behind a strict CSP, allow `https://maps.google.com` in
`frame-src` / `child-src`, otherwise the map silently fails to render.

### Google Fonts fail to load offline

Fonts are pulled from `https://fonts.googleapis.com` via `index.html:24-26`
with `rel="preconnect"` and `swap` display. If the deployment environment has
no outbound internet, the page falls back to `Georgia, serif` (display) and
`system-ui` (body) defined in `styles.css:16`.

### `vite preview` history fallback missing

If deep-links return 404 when previewing locally, ensure `vite preview` is
running (it enables SPA fallback automatically). Don't serve `dist/` with `python
-m http.server` — it has no fallback handler.

---

## Known Issues & Roadmap

This section is honest technical debt context for future maintainers — not
blocking issues.

### Known Issues

1. **46 unused shadcn/ui components** — `src/components/ui/*` (accordion,
   dialog, sheet, sidebar, carousel, calendar, charts, etc.) were installed by
   the Lovable template. The landing page imports **zero** of them. Their 26
   `@radix-ui/react-*` peer dependencies remain in `package.json`.
   Tree-shaking removes them from the production bundle, but `node_modules`
   bloat and lint scope suffer.
2. **Duplicate `QueryClient`** — One instance is created in `src/main.tsx:8`
   (wrapping everything), and another inside `src/router.tsx:8` (nested
   `QueryClientProvider` inside `RootRoute`). Two separate client instances,
   neither with custom `defaultOptions`. The inner one should be removed or
   shared.
3. **Stale `src/routes/README.md`** — describes TanStack Start file-based
   routing (`__root.tsx`, `routeTree.gen.ts`), but the project uses manual
   config-based routing in `src/router.tsx`. The README is template
   boilerplate and does not reflect reality.
4. **Orphan `useIsMobile` hook** — `src/hooks/use-mobile.tsx` is defined but
   never imported by `routes/index.tsx` (the LP uses Tailwind `md:` responsive
   utilities instead).
5. **Dual color systems in `styles.css`** — Two `:root` blocks (lines 7-25
   brand hex tokens; lines 94-163 shadcn oklch tokens) coexist with divergent
   naming. The landing page must always use `var(--color-*)` explicitly.
   Adopting a `bg-primary` utility would resolve to the shadcn gray, not the
   brand red.
6. **Manual contact form** — The form at `src/routes/index.tsx:629-696` uses
   raw `useState` despite `react-hook-form` + `zod` + `@hookform/resolvers`
   being installed. There is no client-side validation beyond HTML
   `required` and `maxLength`.
7. **Monolithic `routes/index.tsx`** — 880 lines, 14 components in one file.
   Candidate extraction: `src/components/sections/{Hero,Services,About,
Testimonials,CTA,Contact,Footer}.tsx`.
8. **No tests** — Lint + `tsc` pass is the only verification.
9. **Hardcoded business data** — Address, phone, hours, WhatsApp number,
   Google rating, testimonial names, photo paths — all literals in JSX. No
   env or JSON config layer.

### Roadmap

- Extract section components from `routes/index.tsx` into
  `src/components/sections/`
- Externalize business data to `VITE_*` env vars or a single `content.ts`
  module
- Unify the design-token system (collapse `--color-*` and `--primary*` into
  one namespace; remap shadcn tokens to the brand palette)
- Remove the redundant `QueryClientProvider` in `router.tsx`
- Adopt `react-hook-form` + `zod` for the contact form with pt-BR validation
  messages and `sonner` toast feedback
- Delete unused `src/components/ui/*` components (or adopt a handful: `Button`,
  `Input`, `Form`, `Sonner`)
- Add Vitest + Testing Library + a Playwright smoke test that asserts the
  WhatsApp deeplink is composed correctly on submit
- Replace `routes/README.md` with accurate routing documentation or delete it
- Add a `LICENSE` file pointer note to `AGENTS.md`

---

## Project History

This project was originally generated on [Lovable](https://lovable.dev) using
the `tanstack_start_ts_2026-06-17` template (see `.lovable/project.json`),
which produced a TanStack Start file-based routing project.

Commit `84a8097` (branch `migracao/tanstack-router`, merged via PR #2)
migrated the codebase from TanStack Start to TanStack Router in SPA mode,
replacing the file-based route generator with explicit router configuration
in `src/router.tsx`. The stale `src/routes/README.md` is the only surviving
artifact of the pre-migration layout.

Subsequent PRs (#1, #3) updated contact details and swapped image assets for
locally-stored photos in `src/assets/`.

The `AGENTS.md` file at the repository root contains a Lovable-managed
notice warning against rewriting published git history.

---

## License

Distributed under the [MIT License](./LICENSE). Copyright (c) 2026
gabrieljeronimodev.
