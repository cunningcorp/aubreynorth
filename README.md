# Aubrey North

The Aubrey North website — a static, SEO-first [Astro](https://astro.build) site
deployed to GitHub Pages on the apex domain `aubreynorth.com`.

The site was migrated from a single client-rendered artifact bundle to server-rendered
static HTML so that a growing library of written **Reads** can rank in search. The
migration brief and design/brand reference kit live in [`CLAUDE.md`](CLAUDE.md) and
[`_handoff/`](_handoff/) — those remain the source of truth for look, copy and intent.

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # static build to dist/
npm run preview  # serve the built dist/ locally
```

## Publishing a Read

Adding a Read is the whole publishing process: drop a Markdown file into
[`src/content/reads/`](src/content/reads/) and push to `main`. Match the frontmatter of
[`the-narrative-read.md`](src/content/reads/the-narrative-read.md):

```yaml
title: string          # post title
description: string     # 140–160 chars → <meta description> + Open Graph
lane: screen | type | business
pubDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD # optional
draft: false            # true = excluded from build, sitemap and RSS
tags: [string]          # optional
```

Copy is held to the brand voice rules in `_handoff/brand/copylock.json` — sharp, dry,
no hype, no exclamation marks. See `CLAUDE.md` → "Copy governance".

## Architecture

- **`src/content.config.ts`** — the single `reads` content collection + Zod schema.
- **`src/pages/`** — routes:
  - `index.astro` — homepage, ported from `_handoff/design-reference/an-site-src.html`.
  - `reads/index.astro` — Reads index (newest first).
  - `reads/[slug].astro` — one server-rendered page per Read (the SEO surface).
  - `reads/{screen,type,business}.astro` — lane archive pages. Kept as static named
    routes so they never collide with the dynamic `[slug]` route.
  - `rss.xml.js`, `404.astro`.
- **`src/components/BaseHead.astro`** — per-page `<title>`, description, canonical,
  Open Graph/Twitter, and JSON-LD. Every route emits these server-side.
- **`src/layouts/`** — `BaseLayout` (HTML shell + reveal script) and `ReadLayout`
  (article chrome + `Article` structured data + prose styles).
- **`src/styles/global.css`** — self-hosted fonts (`font-display: swap`), locked palette
  tokens, base styles.
- **`ContactForm.astro`** — the only dynamic piece. Inserts to Supabase
  (`contact_submissions`, insert-only RLS) via a client-side `fetch`; degrades to a
  `mailto:` fallback when `PUBLIC_SUPABASE_*` env vars are absent. Honeypot spam field.

Everything is server-rendered static HTML. Client JS is progressive enhancement only —
the homepage and every Read are fully readable with JavaScript disabled.

## Deployment

`.github/workflows/deploy.yml` builds Astro and deploys to GitHub Pages on push to
`main`. `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` are read from GitHub Actions
secrets (the anon key is publishable and safe client-side only because RLS is
insert-only — never add the service-role key). `public/CNAME` preserves the apex domain.
