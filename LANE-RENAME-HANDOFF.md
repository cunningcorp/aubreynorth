# Handoff — "Type" lane renamed to "Archetype"

_From the Cowork/site session, 22 Aug 2026. For the portal code pass and any other system
that references the lane. Owner: Demetri._

The third Reads lane, formerly **"Type"**, is now **"Archetype"** — a clearer public name
for the anonymised-business-archetype lane. This document says exactly what changed on the
website, and the one decision that keeps your side simple.

## The key decision (please keep this)

**The internal lane value stays `type`. Only the two public-facing surfaces changed: the
display label ("Archetype") and the public URL (`/reads/archetype/`).**

That means **no database migration, no enum change, no edge-function change is required.**
Every Read still carries `lane: type` in frontmatter; `reads_queue.lane` is still `type`;
the CHECK constraint stays `('screen','type','business')`; `insert-draft` / `publish-read`
keep validating and writing `type`. The word "type" is now purely an internal key; the world
sees "Archetype".

If you would rather rename the internal value too (`type` → `archetype`), that is possible
but is a coordinated migration (enum, constraint, every existing row's `lane` and stored
frontmatter, all three edge functions, plus a redeploy). **Recommendation: do not.** The
label/URL split already gives the clean public result with none of that risk.

## What already changed on the website (aubreynorth repo — done, pending push to main)

- `src/consts.ts`: the lane's `label` is now `Archetype` and its `slug` is now `archetype`
  (lane key unchanged: `type`).
- Page route moved: `src/pages/reads/type.astro` → `src/pages/reads/archetype.astro`
  (renders `<LaneListing lane="type" />` — prop unchanged).
- `astro.config.mjs`: added a redirect `'/reads/type/' → '/reads/archetype/'` so old links
  and any indexed URLs don't 404 (static redirect page).
- `src/content/reads/the-everything-pitch.md`: its lane link updated from `/reads/type/`
  ("Type lane") to `/reads/archetype/` ("Archetype lane").
- Verified in a build: `/reads/archetype/` renders, label shows "Archetype" everywhere, old
  URL redirects, sitemap lists `archetype`, no stray `/reads/type/` links remain.

## What the portal / other systems need (your side)

All **cosmetic** — because the lane value is still `type`:

1. **Portal UI label.** Wherever the portal shows the lane name to Demetri (queue cards,
   lane filter chips, the "Type" badge, the editor), display **"Archetype"** instead of
   "Type" for the `type` lane value. This is a label mapping change, not a data change.
2. **Any hardcoded `/reads/type/`** in portal code, previews, or the design files → point to
   `/reads/archetype/` (or rely on the site redirect, but better to update). Note: the
   portal's markdown preview already absolutizes `/reads/…`, so relative links are fine; this
   is only for any literal `/reads/type/` strings.
3. **Lane pickers / any place a human selects or reads the lane.** Keep the stored/submitted
   value `type`; change only the shown text to "Archetype".
4. **Anywhere else the lane surfaces** that Demetri flagged ("further reaching places") —
   social templates, OG text, docs, dashboards: same rule — display "Archetype", keep the
   value `type`.

## Not required, optional tidy

- The already-published `reads_queue` row for `the-everything-pitch` still stores the old
  `/reads/type/` link and an italic closing line in its historical `markdown`. The **live
  site file** (repo) is already corrected, so this is cosmetic history only. Update the row
  if you want the queue record to match; not needed for the live site.

## Summary

Public name and URL: **Archetype**, `/reads/archetype/`. Internal value everywhere else:
**`type`** — unchanged. Your work is a label swap in the portal UI plus fixing any literal
`/reads/type/` strings. No migration, no schema change, nothing that can break publishing.
