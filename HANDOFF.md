# Handoff — running the migration in Claude Code

Everything needed for the migration is already in this repo: the build brief
(`CLAUDE.md`), the clean design source and fonts (`_handoff/design-reference/`), the
locked brand rules and copylock (`_handoff/brand/`), and one seed Read
(`src/content/reads/the-dropbox-read.md`). The Supabase project and contact table are
live; the keys are set as GitHub Actions secrets.

## Steps

1. Open this repo in Claude Code.
2. Run `/init` so it indexes the repo.
3. Paste the prompt below.

## Prompt to paste

> Read CLAUDE.md and execute the Astro migration. Follow the Definition of Done
> checklist and verify against it before declaring complete. Work on a branch and open a
> PR — do not merge to main. When finished, tell me the branch name and how to preview it.

## Before you merge — quick checks

- **View Source on a built Read page** (e.g. `/reads/the-dropbox-read/`). The full article
  text must be in the HTML, not a JS shell. This is the SEO test that matters.
- **Homepage** should look like the old site — same layout, fonts, palette, copy. Spot-check
  against `_handoff/design-reference/an-site-src.html`.
- **Contact form** submits without error and a row appears in the Supabase
  `contact_submissions` table (dashboard → Table editor).
- `dist/` contains `sitemap.xml` (or `sitemap-index.xml`), `robots.txt`, and `CNAME` with
  `aubreynorth.com`.

## Notes

- The migration **replaces the old `index.html`** (the base64 bundle). That is intended.
  Nothing is lost — the old file stays in git history.
- The publishable Supabase key is visible in page source. That is by design and safe:
  it is the *publishable* key and RLS is insert-only. Never add the service-role key or the
  database password to this repo or its secrets.
- Publishing a new Read after this ships = add one markdown file to `src/content/reads/`,
  matching the frontmatter of `the-dropbox-read.md`, then push.

## GitHub secrets (already set)

- `PUBLIC_SUPABASE_URL` = https://qeafetctmtnqonhwhhlw.supabase.co
- `PUBLIC_SUPABASE_ANON_KEY` = the publishable (`sb_publishable_…`) key

---

## Post-review punch list (do these on `migrate/astro-static-seo`, then merge)

The build was reviewed and passes every item in the Definition of Done. One fix before merge:

### 1. Replace the SVG Open Graph image with a raster PNG

`public/og-default.svg` is used for `og:image` / `twitter:image`. Social scrapers
(Twitter/X, Facebook, LinkedIn, iMessage, Slack) do **not** reliably render SVG preview
cards, so links to the site would show no image.

- Produce a **1200×630 PNG** on-brand for the default OG card: Paper `#f6f3ec` background,
  Ink `#1b1a17` wordmark in Scenario, terracotta `#C0593B` orbital mark, plus the endorsement
  line "A Cunning Corp company." Keep it quiet — obey `voice.rules`; no taglines that aren't
  in copylock. Save as `public/og-default.png`.
- Point `og:image` and `twitter:image` at `/og-default.png` (absolute URL via the `site`
  config). Set `twitter:card` to `summary_large_image`. Add `og:image:width` 1200 and
  `og:image:height` 630.
- Leave the per-Read OG image on the same default for now (a per-Read generator can come
  later — do not build it in this pass).
- Rebuild and confirm the built HTML references `/og-default.png` and the file exists in
  `dist/`.

### 2. Then merge

Once the OG image is fixed and `npm run build` is clean, **merge
`migrate/astro-static-seo` into `main`** and push. The Pages workflow deploys on push to
`main`. After it deploys, sanity-check the live site: View Source on a Read shows the full
article text, and one test submission on the contact form lands a row in the Supabase
`contact_submissions` table.
