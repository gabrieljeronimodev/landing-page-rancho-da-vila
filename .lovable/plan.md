# Landing Page — Rancho Da Vila Arens (Demo)

Single-page prototype in pt-BR for a self-service restaurant in Vila Arens, Jundiaí. Warm/human aesthetic, red+orange palette, all CTAs route to WhatsApp.

## Stack & setup
- Existing TanStack Start template — keep it. All page content goes into `src/routes/index.tsx` (replacing the placeholder). Per brief's "no TanStack Query/Router/Table", I'll avoid those libs but keep the file-based router that ships with the template (it's the router shell, not a data layer).
- Install: `motion` (^12), `lucide-react` already present? will verify and add if missing.
- Google Fonts via `<link>` tags in `src/routes/__root.tsx` head: **Playfair Display** (display) + **Outfit** (body).
- Design tokens added to `src/styles.css` under `:root` (primary #C0392B, secondary #E67E22, accent #F39C12, neutrals, shadows, radii, font vars). Use CSS vars + arbitrary Tailwind values; no inline styles.
- Update `<title>`, meta description, og tags, and `robots: noindex` via root route `head()`.

## Constants (top of index.tsx)
- `OWNER_NAME = "Lovable Studio"` (placeholder freelancer brand)
- `OWNER_WHATSAPP = "5511999999999"` (placeholder — user can edit)
- `CLIENT_WHATSAPP = "551127098582"`

## Components (all in `src/routes/index.tsx`)
1. **TopWrapper** — fixed top, contains DemoBanner + Navbar (no separate offset math).
2. **DemoBanner** — slate-900 bar, "🚀 Protótipo criado para Rancho Da Vila Arens…" + pill button to OWNER_WHATSAPP.
3. **Navbar** — brand name (Playfair, primary), center nav (Serviços/Sobre/Depoimentos/Contato smooth-scroll), right CTA "Falar no WhatsApp". Mobile: condensed (no hamburger drawer per anti-patterns — show brand + CTA only on mobile).
4. **Hero** — eyebrow badge "Sabor caseiro em Vila Arens", H1 benefit headline (e.g. "Comida fresca, no capricho, pelo peso justo."), supporting paragraph, two CTAs (primary WhatsApp + secondary "Ver cardápio" → #services), trust strip (Google 4.5★ · 383 avaliações · 8+ anos · Seg–Sáb). Branded gradient background using primary/secondary tints; decorative blurred blobs. Framer Motion staggered entrance.
5. **TrustBar** — count-up metrics with `useInView` + `animate()`: 4.5 rating, 383 avaliações, 8+ anos, ~50k pratos servidos (auto). Lucide icons (Star, Users, Award, UtensilsCrossed).
6. **Services** — 3-card grid (Self Service — featured with "Mais procurado" badge, Marmitex, Drive-Through). Each card: lucide icon (UtensilsCrossed, Package, Car), title, 2–3 line auto description in pt-BR, hover lift. Featured card gets primary gradient accent.
7. **About** — two-column (text + visual). Story in pt-BR about the family/neighborhood roots; bullet list of differentiators (HeartHandshake, Leaf, Clock, MapPin). Visual side = CSS gradient panel with stacked stat cards (no image placeholder).
8. **Testimonials** — 3 cards using uploaded avatars (Daniela Rodrigues, Eddy Paulini, Renan Taveira) via Lovable Assets pointers; 5-star row, quote in pt-BR, name + role. Subtle entrance stagger.
9. **CTASection** — full-width primary gradient band, headline + WhatsApp button, scale 0.97→1 on enter.
10. **Contact** — two columns: left = info rows (MapPin address "R. Gen. Carneiro, 223", Phone "(11) 2709-8582", Clock "Seg a Sáb, 11h às 14h30") + form (Nome/Telefone/Mensagem) submitting via `wa.me` deep link with prefilled text. Right = Google Maps iframe (rounded, shadow).
11. **Footer** — fg bg, 3 cols (brand+tagline+socials inline SVG IG/FB + WhatsApp via MessageCircle, quick links, contact). Bottom bar: copyright + "Site demonstrativo desenvolvido por Lovable Studio" linking OWNER_WHATSAPP.
12. **WhatsAppFAB** — fixed 56px circle, #25D366, MessageCircle icon, pulse keyframes (defined in styles.css), hover tooltip.
13. **MobileStickyCTA** — fixed bottom bar, primary bg, full-width WhatsApp link, hidden md+.
14. Body gets `pb-16 md:pb-0` so sticky bar doesn't cover footer.

## Animations
- Shared `fadeUp` variant (opacity/y, 0.5s, custom ease) + stagger container (0.08s).
- Hero stagger delays 0/0.12/0.22/0.32/0.42.
- All wrapped in `useReducedMotion` guard.
- Count-up uses `useInView` + `animate()` from motion.

## Assets
- Three uploaded testimonial avatars → uploaded via `lovable-assets` CLI from `/mnt/user-uploads/`, imported as `.asset.json` pointers.

## SEO / a11y
- `head()` in index route: title "Rancho Da Vila Arens — Self-Service em Vila Arens, Jundiaí", description (pt-BR), og tags, `robots: noindex` (demo).
- Semantic `<header><main><section><footer>`, aria-labels on icon-only buttons, form labels, focus-visible rings, WCAG AA contrast verified for #C0392B on white.

## Out of scope (per brief anti-patterns)
No dark mode, no hamburger drawer, no modals/popups, no parallax, no extra UI libs, no image placeholders.

## Technical details
- Files touched: `src/routes/index.tsx` (full rewrite), `src/routes/__root.tsx` (fonts + meta), `src/styles.css` (tokens, pulse keyframes, font-family vars), `package.json` (add `motion` if missing).
- All colors via CSS vars / arbitrary Tailwind (`bg-[var(--color-primary)]`), no hardcoded hex inside JSX.
