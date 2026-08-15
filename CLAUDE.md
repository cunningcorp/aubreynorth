# Aubrey North — Astro migration brief

You are migrating aubreynorth.com from a single client-rendered artifact bundle to a
**static, SEO-first Astro site** hosted on GitHub Pages, so that a growing library of
written "Reads" can rank in search. The visual design is **locked**. Your job is to
change the delivery, not the look.

Read this whole file before writing code. Everything you need is in `_handoff/`.

---

## Why this migration exists (do not lose sight of this)

The current site is one 280KB `index.html` that unpacks a React app from base64 blobs
in the browser. Crawlers see an empty shell, there are no per-page URLs, no per-page
titles, no sitemap. That makes it impossible to grow written content that ranks.

**The single measure of success: a new Read is a markdown file that ships as a unique,
fully server-rendered, indexable URL with its own title, description and structured
data — no JS required to read the words.** If a change doesn't serve that, don't make it.

---

## Source material (in `_handoff/`)

- `_handoff/design-reference/an-site-src.html` — the **clean, un-bundled source of the
  current live site**. This is your design ground truth: nav → hero → the hook → where we
  sit → how we work → contact → footer. Rebuild the homepage from this markup. It is plain
  HTML with inline styles; port it faithfully.
- `_handoff/design-reference/fonts/` — the three fonts the site actually uses. Keep these
  exact files and weights.
- `_handoff/design-reference/favicon-an.svg` — favicon.
- `_handoff/design-reference/support.js` — the artifact runtime. **Reference only. Do NOT
  ship it** — it is the client-side bundler you are replacing.
- `_handoff/brand/Handbook.dc.html` — the brand handbook (mark, palette, type, ladder,
  voice). Authoritative for anything not spelled out below.
- `_handoff/brand/copylock.json` — canonical, approved copy and voice rules. Treat as
  locked. Do not rewrite site copy; reuse it.
- `_handoff/brand/Brand Ladder.dc.html` — human-readable brand ladder.

When design and this brief disagree, the design source + handbook win on **look**; this
brief wins on **architecture and SEO**.

---

## Locked brand facts (from handbook + copylock)

**Palette**
- Paper `#f6f3ec` (background)
- Ink `#1b1a17` (primary text)
- Terracotta / Rust `#C0593B` (Aubrey North accent)
- Body `#4a463e` (warm grey ramp for body copy)

**Type roles — do not swap these**
- **Scenario** (Scenario-700.ttf) — wordmark, labels, buttons
- **Recoleta** (Recoleta-300.woff2) — headlines / editorial voice
- **Futura** (Futura-400.ttf) — body text throughout

**Voice (from copylock `voice.rules`)** — sharp, dry, confident, no hype, no exclamation
marks. The 1/8th principle: show the one lit idea, never list every venture. Aubrey North
is the *quietest* volume in the Cunning Corp ladder. Any new UI microcopy you must write
should obey this; prefer reusing copylock strings.

---

## Copy governance — copylock is law (do not let the writing drift)

`_handoff/brand/copylock.json` is the **single source of truth for all words on the site**.
It is versioned and approved (`status: approved`). Treat it the way you treat the palette:
not a suggestion, a lock. This applies to the homepage, the Reads index, lane pages, every
individual Read, and any microcopy (buttons, labels, meta descriptions, alt text, 404s).

Rules, in priority order:

1. **Reuse before you write.** If copylock already has a string for something — a tagline,
   the positioning line, a division descriptor — use it verbatim. Do not paraphrase locked
   copy.
2. **New writing must pass `voice.rules` before it ships.** Specifically: wit is a scalpel
   (one clever turn per piece, maximum); confidence, no hype (no exclamation marks, no
   "revolutionary" / "game-changing" / "unleash"); the 1/8th principle (show the one lit
   idea, never list every venture); story leads, method follows; Aubrey North sits at the
   *quietest* volume in the ladder.
3. **Reads are held to the same bar as site copy.** A new Read's `title`, `description`,
   headings and body all obey `voice.rules`. `the-dropbox-read.md` is the reference for tone
   — match it, don't exceed it.
4. **Never invent brand facts.** Names, taglines, positioning, division roles, accents and
   the mission line come from copylock / the handbook only. If a needed string is missing,
   do not improvise it into the build — leave a `TODO(copy)` comment and flag it for Demetri
   rather than guessing.
5. **Respect volume.** Cunning Corp is full wit; Aubrey North is the quietest volume. Copy
   that would suit the house voice is usually too loud for Aubrey North. When unsure, cut.

If a change would require writing copy that isn't in copylock and isn't derivable from
`voice.rules`, that is a decision for Demetri, not a thing to fill in.

---

## Tech decisions (fixed — do not re-litigate)

- **Framework: Astro**, static output (`output: 'static'`). No SSR runtime — GitHub Pages
  is static hosting.
- **Deploy target: GitHub Pages on the apex domain.** Preserve `CNAME` (aubreynorth.com).
  Add a GitHub Actions workflow that builds Astro and deploys to Pages. Set `site:
  'https://aubreynorth.com'` in `astro.config`.
- **Content: an Astro content collection** named `reads`, authored as Markdown/MDX in
  `src/content/reads/`. Adding a `.md` file must be the entire process of publishing a Read.
- Ship fonts self-hosted from the files provided, with `font-display: swap`. No Google Fonts.
- No client JS unless a specific interaction requires it. The homepage and every Read must
  be fully readable as static HTML.

---

## Backend / forms (contact form → Supabase)

The site is static, so the CONTACT form has no server to post to. Wire it to **Supabase**
(Demetri already uses Supabase). Keep everything else static — this is the only dynamic
piece, and it needs only a few lines of client JS on the contact section, nowhere else.

**Status (already provisioned — do not recreate):** The Supabase project exists and the
`contact_submissions` table is live with insert-only RLS. Project URL is
`https://qeafetctmtnqonhwhhlw.supabase.co`. The publishable (anon) key is supplied via the
`PUBLIC_SUPABASE_ANON_KEY` GitHub Actions secret — do not hardcode it. Your job is only to
wire the form's client-side insert against these values.

- On submit, `POST` the form to Supabase — either a direct insert into a
  `contact_submissions` table via `supabase-js`, or a lightweight edge function. Prefer the
  direct table insert; it is simpler and needs no function deploy.
- Suggested table: `contact_submissions (id uuid pk default gen_random_uuid(), created_at
  timestamptz default now(), name text, email text, message text)`.
- **Row Level Security: on.** Add an INSERT-only policy for the `anon` role and **no SELECT
  policy** — the public can submit but cannot read submissions. Demetri reads them from the
  Supabase dashboard.
- **Secrets:** never hardcode. Read `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`
  from env (Astro `import.meta.env`, `PUBLIC_` prefix so they reach the client). The anon
  key is publishable and safe client-side *only* because RLS is insert-only — do not use the
  service-role key anywhere in the site. Wire the two values as GitHub Actions repository
  secrets/variables for the build. Leave them as `TODO(env)` placeholders if not provided.
- Add a hidden honeypot field for basic spam defence and show a plain, on-voice success and
  error state (no exclamation marks — obey `voice.rules`).
- If `PUBLIC_SUPABASE_*` env vars are absent at build time, the form must degrade gracefully
  (e.g. a `mailto:` fallback), never throw.

---

## Content model

One collection, `reads`, with frontmatter schema (use `zod` via `defineCollection`):

```
title: string            # post title
description: string       # 140–160 chars, used for <meta description> + OG
lane: 'screen' | 'type' | 'business'   # the three Read lanes
pubDate: date
updatedDate: date (optional)
draft: boolean (default false)         # drafts excluded from build + sitemap
tags: string[] (optional)
```

Routes to generate:
- `/` — homepage, ported from the design source.
- `/reads/` — index of published Reads, newest first, showing lane.
- `/reads/[slug]/` — individual Read. This is the SEO surface. One per markdown file.
- `/reads/screen/`, `/reads/type/`, `/reads/business/` — lane archive pages (taxonomy).

Build the Read layout to match Aubrey North's restraint: Recoleta headline, Futura body,
generous measure, terracotta used sparingly. Derive spacing/scale from the design source.

---

## SEO requirements (this is the point — treat as acceptance criteria)

Every route must emit, server-rendered in the initial HTML:

1. A **unique `<title>`** and **unique `<meta name="description">`**. No route shares the
   homepage's title.
2. A **canonical** `<link rel="canonical">` absolute URL.
3. **Open Graph + Twitter card** tags (title, description, type, url, image).
4. **JSON-LD structured data**: `Article` on each Read (headline, datePublished,
   dateModified, author/publisher = Aubrey North), `WebSite` + `Organization` on the homepage.
5. Auto-generated **`sitemap.xml`** (use `@astrojs/sitemap`), including all published Reads,
   excluding drafts.
6. A **`robots.txt`** that allows crawling and points to the sitemap.
7. Semantic HTML: one `<h1>` per page, real heading hierarchy, descriptive `<a>` text,
   `alt` on images.
8. An **RSS feed** at `/rss.xml` for the Reads (nice-to-have, include if cheap).

---

## Definition of done (verify before declaring complete)

- [ ] `npm run build` produces a static `dist/` with real HTML for `/`, `/reads/`, and each Read.
- [ ] `curl`-ing (or view-source of) a built Read page shows the **full article text** in
      the HTML — not a JS shell.
- [ ] Every page has a unique title + description (grep the built HTML to confirm).
- [ ] `dist/sitemap-index.xml` (or `sitemap.xml`) exists and lists the Reads; drafts absent.
- [ ] `dist/robots.txt` exists and references the sitemap.
- [ ] `dist/CNAME` contains `aubreynorth.com`.
- [ ] Homepage visually matches `_handoff/design-reference/an-site-src.html` (same layout,
      fonts, palette, copy). Spot-check side by side.
- [ ] Lighthouse SEO score 100 and Best-Practices high on a built page (run if tooling available).
- [ ] One example Read exists at `src/content/reads/` so the pipeline is proven end-to-end.
- [ ] GitHub Actions workflow builds and deploys to Pages on push to main.
- [ ] `support.js` and the old base64 `index.html` are gone from the served output.
- [ ] Contact form posts to Supabase (insert-only RLS), keys read from `PUBLIC_` env vars
      not hardcoded, honeypot present, and it degrades to a `mailto:` fallback if env is absent.
- [ ] **Copy governance:** all rendered copy either reuses copylock strings or passes
      `voice.rules` (no exclamation marks, no hype words, one clever turn max per piece).
      No brand facts invented; any gap left as a `TODO(copy)` flag, not filled in.

---

## Suggested order of work

1. Scaffold Astro, wire `astro.config` (`site`, static, sitemap integration), self-host fonts.
2. Build a base layout + reusable `<SEO>` head component (title/description/canonical/OG/JSON-LD).
3. Port the homepage from the design source into `src/pages/index.astro`.
4. Define the `reads` content collection + schema; build `/reads/`, `/reads/[slug]`, lane pages.
5. Add sitemap, robots.txt, RSS, one seed Read.
6. Add the Pages deploy workflow; keep CNAME.
7. Run the Definition-of-done checklist and fix gaps.

Do not delete `_handoff/` — it is the reference kit. You may leave it out of `dist/`.
