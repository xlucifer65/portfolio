# Design notes — v3 (engraved portrait home + book rail)

Reference: rauno.me layout mechanics (grey page, white cards, tiny labels, tick scrubber,
horizontal rail). Own content and art; not a copy of its branding.

## Structure
- `/` — header links (Projects, CV, Email) · first screen: name, role/city, one-line bio,
  engraved portrait of Rayyan (public/portrait-engraved.png, white removed to soft alpha) · book rail: scrolling down moves the
  covers sideways (desktop, pinned section); phones swipe with snap · contact/education/publication footer.
- `/projects` — thumbnails only (covers), no visible text; links carry aria-label titles.
- `/projects/[slug]` — cover → title line → Architecture → Screenshots → Information
  (problem, team, metrics verbatim, what I built, how it works, tech, deck/code) → prev/next.
  Statically generated for every built project (app/lib/work.ts). Roadmap not shown.

## Visual system
- Light only (the portrait's navy ink fails on dark). Tokens in app/globals.css:
  bg #ededed, white cards, ink #111, muted #5f5f5f, navy #23409a, gold #c9a227.
- Covers (app/components/Cover.tsx): one big glyph + one disc per project, drawn on a centred
  5:3 stage so the art keeps proportions in any card shape. Decorative (aria-hidden).

## Files
New: app/components/{BookRail,Cover,TopBar}.tsx, app/lib/work.ts, app/projects/[slug]/page.tsx,
public/portrait-engraved.png, CHECKLIST.md. Rewritten: app/page.tsx, app/projects/page.tsx,
app/components/SiteFooter.tsx, app/globals.css. Tweaked: PipelineDiagram (hyphenation).
Deleted: Hero, Spotlight, SelectedWork, About, Research, Skills, Nav, SectionHeading.

## Validation
lint pass · tsc pass · npm run build pass (isolated copy; :3457 untouched) · no horizontal
overflow at 375 and 1440 on /, /projects, /projects/eu-ai-act-assistant.
Screenshots: ~/Downloads/codex/claude-screens/v3/.

## EU AI Act illustrated RAG case study
- Reference: https://www.ragie.ai/ — illustrated steps paired with explanations.
- Original SVG artwork uses the site's existing navy/gold/grey/white tokens.
- Updated hero and seven process panels use existing case-study copy verbatim.
- Metrics, screenshots, contribution, team credit and deck are retained.
- Changed: app/components/RAG{Illustration,CaseStudy}.tsx, RAGCaseStudy.module.css,
  app/projects/[slug]/page.tsx, DESIGN_NOTES.md. Other project presentation is retained.
- No dependencies or content changes. Lint and webpack build passed.
- SVG artwork inspected; browser layouts not verified in this sandbox.
- Working copy: ~/Downloads/codex/rag-case-study. Patch: rag-case-study.patch.

## Changes made — illustrated projects
- All six covers now explain each project's subject and architecture with original SVGs.
- Homepage rail retains the original glyph-and-circle images; grid and detail pages use illustrations.
- Other project pages now use illustrated heroes and existing process explanations.
- EU AI Act's illustrated case study is retained. No source facts or dependencies changed.
- Changed files: app/page.tsx, ClassicCover.tsx, Cover.tsx, Cover.module.css, ProjectCoverArt.tsx, ProjectStory.tsx,
  ProjectStory.module.css, ProjectStepArt.tsx, app/projects/[slug]/page.tsx, DESIGN_NOTES.md.
- Lint and production webpack build passed. All content files unchanged byte-for-byte.
- Artwork preview: ~/Downloads/codex/project-cover-art-preview.png.
- Standalone pages: ~/Downloads/codex/project-illustrations-preview/projects/index.html.
- Browser screenshots unavailable in this sandbox; responsive browser checks remain.
