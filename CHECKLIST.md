# Portfolio v3 checklist

Brief (from Rayyan): super-minimal home with name, short bio and the statue image
(transparent); scrolling down reveals a horizontal "book" rail of project covers
(rauno.me-style); /projects shows thumbnails only, no text; clicking opens a project
page with architecture, then screenshots, then information. Then screenshots,
a GPT handoff and a build.

## Assets
- [x] Engraved portrait of Rayyan with white removed (soft alpha) → public/portrait-engraved.png (replaced the statue)
- [x] Light-only palette (statue's navy ink disappears on dark backgrounds)

## Home `/`
- [x] First screen: name, one-line role/location, short bio, statue — nothing else
- [x] Tiny header links only (Projects, CV, Email)
- [x] Scroll down → horizontal book rail driven by vertical scroll (desktop)
- [x] Rail position ticks (rauno-style scrubber, clickable)
- [x] Each cover links to /projects/[slug]
- [x] Phones: native horizontal swipe with snap, no scroll hijack
- [x] Minimal contact footer (email, GitHub, LinkedIn, Scholar, CV)

## Projects `/projects`
- [x] Thumbnails only, no visible text; accessible names via aria-label
- [x] Only built / in-progress work (roadmap not shown as if it were built)

## Project page `/projects/[slug]`
- [x] Order: cover → title line → Architecture → Screenshots → Information
- [x] Information: problem, metrics (verbatim), what I built + team credit,
      how it works, tech, deck / code links
- [x] Previous / next project navigation
- [x] Statically generated for every built project

## Facts
- [x] No invented results; existing labels and team credit kept verbatim

## Verification
- [x] Screenshots: home (hero, rail), /projects, one project page — 1440 and 375
- [x] No horizontal page overflow; anchors and links resolve
- [x] npm run lint, tsc, npm run build pass
- [x] GPT handoff written (~/Downloads/codex/GPT_HANDOFF.md)

## Not verified / open
- [~] Keyboard: covers move into view on focus (element.focus() verified; live Tab not testable in the automated browser)
- [ ] Rail on a touch-pad with momentum scrolling (only mouse-wheel tested)
- [ ] Roadmap projects are no longer shown anywhere (still in content/projects.ts) — decide if wanted
- [ ] Deploy: set NEXT_PUBLIC_SITE_URL so Open Graph images resolve

## Codex review v3 (REVIEW_V3.md) — fixes
- [x] Tick hit areas 24×44px
- [x] Reduced motion → native scroller, no pinning (verified via matchMedia override)
- [x] Native scroller is the server/no-JS layout; pinning only after mount
- [x] Pipeline diagram layout by container width; no mid-word breaks
- [ ] NEXT_PUBLIC_SITE_URL — needs the real domain
- [x] Status in rail labels for unfinished work; "Work ↓" link; results line in project header
- [x] 768px screenshots
