# Drafting engine — setup spec for the Cowork drafting session

_Prepared 21 Aug 2026. Owner: Demetri. Parent spec: `PORTAL-EDITOR-SPEC.md` Part 1
(read it first — its guardrails are law). Voice source: `VOICE-RULES.md` (repo root)._

> **The one rule above all others:** this engine **drafts**, it never publishes.
> It inserts rows with `status='draft'` and nothing else. Publishing happens only
> when Demetri clicks Publish in the portal. If any part of this setup could make
> content live on aubreynorth.com without that click, it is wrong.

## What you are building

A scheduled task in this Cowork project that runs each weekday morning, drafts up
to three Reads (one per lane: Screen, Type, Business), and inserts them into the
portal's editing queue as drafts, each arriving with pre-attached fix suggestions
(and, for Business, a verified sources list). Demetri then reviews, edits, and
publishes them in the portal at portal.cunningcorp.com — that side is built and
is not your concern.

## What this session must have access to

- **This repo folder** (`aubreynorth`): `CONTENT-STRATEGY.md` (the topic backlog),
  `VOICE-RULES.md`, `_handoff/brand/copylock.json`, `STORY-CORPUS.md`, and
  `src/content/reads/` (existing Reads, for internal links and slug checks).
- **The `draft-a-read` skill** — the drafting procedure itself. This spec changes
  its *destination* (drafts land as `status='draft'` for review, not
  `status='ready'`) but not its craft rules.
- **Supabase project `aubreynorth`** (ref `qeafetctmtnqonhwhhlw`), specifically
  INSERT + SELECT on `public.reads_queue`. Writes go through the service role —
  the key is handled Demetri-side (shell variable or an existing MCP connection),
  never stored in a file, repo, or chat message.
- **Web search**, for the Business-lane verification protocol.

## The queue row contract (what to insert)

Table: `public.reads_queue`. One row per draft:

| column           | value |
|------------------|-------|
| `slug`           | kebab-case, `[a-z0-9-]+` only. Must not collide with any existing queue row OR any file in `src/content/reads/` — check both first. |
| `title`          | Lane convention: Screen/Business → "The <Name> Read"; Type → "The <Archetype>". |
| `lane`           | `screen` \| `type` \| `business` |
| `description`    | 140–160 chars, contains the target query, earns the click. The portal blocks publish outside this range — get it right at draft time. |
| `tags`           | text[], 3–5 lowercase, reuse existing tags where true. |
| `target_query`   | the search query the Read answers. |
| `word_count`     | integer. |
| `markdown`       | the FULL file: frontmatter (`title`, `description`, `lane`, `pubDate` today, `draft: true`, `tags`) + body. publish-read rewrites `draft`/`pubDate` at publish. |
| `body_markdown`  | the body only (no frontmatter) — the editor edits this field. |
| `status`         | **`draft`**. Always. Never `ready`, never anything else. |
| `suggestions`    | jsonb array of pre-attached fixes (shape below). `[]` if genuinely none. |
| `sources`        | Business lane: jsonb array of `{claim, url, publisher}`. Other lanes `[]`. |
| `sources_checked`| `false`. Always — Demetri ticks it in the portal after review. |

Suggestion shape (the portal's stepper renders exactly this):

```json
{ "id": "<uuid>", "section": "<the paragraph it applies to, truncated ok>",
  "original": "<exact span from the body>", "suggested": "<replacement>",
  "reason": "<which rule it serves, a few words>" }
```

`original` must be an exact substring of the body — the portal applies accepts by
string replacement. Suggestions are proposals only; never pre-apply them.

## The run, step by step (once per lane per run)

1. **Pick the topic.** Open `CONTENT-STRATEGY.md`, take the next unchecked topic
   for the lane, keeping the lane mix. If the lane's backlog is empty, **skip the
   lane and flag it in the run summary** — never invent a filler topic.
2. **Verify facts before drafting.** Web-search every factual claim (dates,
   figures, campaigns, episodes, plot points). Never invent numbers, dates, or
   quotes. Business Reads follow the full verification protocol in
   `VOICE-RULES.md` (well-documented cases only, fact vs interpretation, fair
   comment) and MUST produce a non-empty `sources` list — a Business draft with
   no sources is a failure state: do not insert it; flag it instead.
3. **Draft to the rules.** `VOICE-RULES.md` is the voice; the `draft-a-read`
   skill is the procedure (structure, SEO, internal links root-relative
   `/reads/<slug>/`, the "The business edit" heading convention, 2–4 H2s,
   answer the query in the first ~150 words).
4. **Generate pre-attached suggestions.** Run a self-edit pass against
   `VOICE-RULES.md` (the recurring edit patterns section especially) and attach
   what you find as suggestions rather than silently fixing — the review loop in
   the portal is the point. Aim for the 2–5 most valuable; zero is acceptable.
5. **Slug check, then insert** the row per the contract above.
6. **Tick the topic** in `CONTENT-STRATEGY.md` as drafted (commit that change to
   a branch — this session should follow the same no-push-to-main discipline;
   Demetri merges).
7. **Summarise the run to Demetri in chat**: which lanes drafted, titles, word
   counts, suggestion counts, any lane skipped and why, any Business Read held
   back for missing sources.

## Scheduling

- Cadence per the parent spec: daily, one per lane (≈3/day). Recommended:
  **weekday mornings, one run per day**, e.g. 06:30 Europe/London, so drafts are
  waiting before the day starts. Confirm the exact time with Demetri before
  creating the schedule.
- Drafting (3/day) intentionally outpaces publishing (~1/day); a growing queue
  is fine. If the queue's unpublished count exceeds ~15, note it in the run
  summary and suggest pausing a lane rather than silently piling on.
- The schedule inserts drafts only. Re-read the rule at the top.

## Guardrails recap (from the parent spec — non-negotiable)

- Nothing publishes without Demetri's click. `status='draft'` only.
- No duplicate slugs (queue + live site both checked).
- Business: non-empty verified `sources` or no insert; `sources_checked=false`.
- Voice single-source: draft from `VOICE-RULES.md`; never restate the rules in a
  local prompt that can drift from it.
- Backlog exhaustion → skip and flag, never pad.
- The service-role key is Demetri's to provide per run/session; never persist it.

## Acceptance (the setup is done when)

- [ ] A manual test run drafts one Screen Read end to end: row lands in
      `reads_queue` with `status='draft'`, valid 140–160 description, suggestions
      attached, and it appears in the portal's Draft column.
- [ ] A Business test run attaches real, checkable sources.
- [ ] The scheduled task exists at the agreed time and its prompt encodes this
      spec (or points at this file).
- [ ] `CONTENT-STRATEGY.md` ticking works on a branch.
- [ ] Demetri has seen one full run summary and approved the cadence.
