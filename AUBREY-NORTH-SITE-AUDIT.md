# Aubrey North site — design audit / handoff (21 Aug 2026)

_Result of reconciling `Aubrey North.dc.html` (design copy) against the live
`cunningcorp/aubreynorth` repo, after this session's Aubrey North pass
(no-italics rule, footer alignment, article view, Reads list spacing, mobile)._

## TL;DR — no code action required

Everything we touched in the design copy is **already implemented in the repo**.
This pass reconciled the DC *to* the repo; it did not surface changes the site
is missing. Recorded here so it's on the books.

## Item by item

1. **No italics, site-wide.** Already enforced.
   `src/styles/global.css:154–156`:
   ```css
   /* No italics site-wide (per brand decision 2026-08-17). Emphasis renders upright;
      markdown *…* / <em> and <cite>/<i> lose the slant. */
   em, i, cite, q, address, dfn, var, blockquote { font-style: normal; }
   ```
   So the `<em>` in `index.astro` ("actually", "understood.", "less") render upright
   already — the emphasis colour (`.rust`) stays, only the slant is gone. In the DC I
   removed the `<em>` markup outright (→ rust `<span>`); the repo keeps `<em>` and
   neutralises it in CSS. Both render identically. **No change needed** — if code ever
   wants the markup to match the DC exactly it's cosmetic, not required.

2. **Footer alignment.** Already correct.
   `src/components/Footer.astro`: `.an-footer__inner { display:flex;
   justify-content:space-between; flex-wrap:wrap; }` with `.an-footer__right`
   column-aligned `flex-end`. The left-drift I saw was a **DC-only** bug (the legal
   paragraph wasn't allowed to flex-shrink); fixed in `Aubrey North.dc.html`. The
   repo footer was always right.

3. **Article view — tags + lane link.** Already present.
   `src/layouts/ReadLayout.astro` renders the lane link (`{laneMeta.label} Read`) and,
   when `tags` exist, the tag list at the article foot. Bringing the DC "fully in line"
   (adding tag pills, dropping the extra flourishes) matched the DC to this.

4. **Reads list top gap.** DC-only.
   `src/pages/reads/index.astro` uses its own `section__pad` (88/56px) and list padding
   (`40px 0`), so the site never had the doubled-padding gap. The gap was the DC
   inheriting generic mobile section padding; fixed in the DC with a dedicated
   `[data-padlist]` rule. **Not a site issue.**

5. **Mobile hash routing.** DC-only, not applicable.
   Added to `Aubrey North.dc.html` so the mobile preview harness can deep-link views.
   The Astro site already has real routes (`/reads/`, `/reads/[lane]/`, `/reads/[slug]/`),
   so there is nothing to port.

## What this leaves

- **Repo:** unchanged and already compliant — no PR from this pass.
- **Design copy `Aubrey North.dc.html`:** now matches the live site (italics gone,
  footer right-aligned, article view in line, Reads spacing fixed) and adds the
  `Aubrey North - Mobile Preview.html` renderer + hash routing for future review.
- If a future brand tweak *does* need to change the site, the italics rule lives at
  `global.css:156`, the footer at `Footer.astro`, the article template at
  `ReadLayout.astro`, and the Reads index at `pages/reads/index.astro`.
