# Spec — Reads Editor for portal.cunningcorp.com (v2, extends the queue)

_Prepared 21 Aug 2026 for the portal design/build chat. Owner: Demetri._
_Builds on `PORTAL-PUBLISH-SPEC.md` (the queue + publish-read function), which is live._

> **Read this first — what "automated" means here.** Automation applies to **drafting only**.
> The system drafts Reads daily and places them in the portal queue as **drafts**. **Nothing
> is ever published to the live site automatically.** A Read goes live only when Demetri
> manually clicks **Publish** in the portal. No schedule, bot, or function may call publish on
> its own — the drafting engine can only insert drafts, and the publish path is triggered
> exclusively by Demetri's click. If any part of this build could publish without that click,
> it is wrong.

## What changes

The portal today is a **queue**: finished Reads arrive with `status='ready'` and Demetri
clicks Publish. This upgrade turns it into an **editor**. Reads are now drafted
automatically and land as **drafts**; Demetri reviews, edits, and takes AI fix suggestions
inline — the whole review loop we currently run in chat moves into the portal — then
publishes. The existing publish path (edge function → GitHub commit → site deploy) is
unchanged and still the only way anything goes live.

Three parts:
1. **A drafting engine** that writes ~3 Reads/day (one per lane) into the queue as drafts.
2. **An editor UI** in the portal to review, edit, and publish them.
3. **AI fix suggestions** — pre-attached to each draft, plus an on-demand button.

## Decisions locked (Demetri, 21 Aug)

- **AI fixes: both.** Suggestions arrive attached to each draft; an on-demand "suggest more"
  button calls Claude live for further passes.
- **Cadence: one per lane per day** — Screen, Type, Business — so 3 drafts/day into the queue.
- **All three lanes automated,** including Business (named real companies), with the
  factual-verification protocol run automatically and sources attached for review.

Consequence to plan for: drafting (3/day) will outpace publishing (Demetri's ~1/day), so the
queue is a growing buffer by design. That is fine, but the editor must make a larger queue
easy to triage (filters, lane grouping, clear states).

---

## Part 1 — Drafting engine

The engine is a **scheduled task on the Cowork/Claude side** (not the portal). It has the
`draft-a-read` skill, the repo (`CONTENT-STRATEGY.md` backlog, copylock voice rules), and
Supabase access — everything needed to draft in-voice and insert to the queue. The portal
does not draft; it consumes what the engine produces.

Each run (once per lane per day):
1. Reads `CONTENT-STRATEGY.md`, takes the next unchecked topic for that lane.
2. Drafts the Read to the locked voice + clarity rules.
3. For a Business Read, runs the **verification protocol**: web-searches every factual
   claim, and produces a `sources` list (claim → URL).
4. Generates **pre-attached fix suggestions** (see Part 3) so the draft arrives review-ready.
5. Inserts a row with `status='draft'`, ticks the backlog topic as "drafted".

Guardrails the engine must honour:
- **Backlog exhaustion:** if a lane's backlog is empty, skip that lane and flag it rather
  than inventing a weak topic.
- **No duplicate slugs:** check `reads_queue` and the live site before inserting.
- **Business drafts are never auto-published** and must carry a non-empty `sources` list;
  a Business draft with no sources is a failure state, surfaced for Demetri.

(Setup of this scheduled task is a Cowork task, not portal work — noted here so the design
chat understands where drafts come from.)

---

## Part 2 — Data model changes (Supabase `reads_queue`)

Extend the existing table (add columns; keep what's there):

```sql
alter table public.reads_queue
  add column if not exists body_markdown text,        -- editable body (frontmatter kept separate or whole-file; see note)
  add column if not exists suggestions jsonb default '[]',   -- AI fix suggestions (see Part 3 shape)
  add column if not exists sources jsonb default '[]',       -- Business Reads: [{claim, url, publisher}]
  add column if not exists sources_checked boolean default false,
  add column if not exists updated_at timestamptz default now(),
  add column if not exists notes text;                -- freeform reviewer notes

-- Expand status lifecycle:
-- 'draft'      → auto-generated, awaiting review
-- 'in_review'  → Demetri has opened/edited it
-- 'ready'      → approved, publishable
-- 'publishing' | 'published' | 'failed'  (unchanged)
alter table public.reads_queue drop constraint if exists reads_queue_status_check;
alter table public.reads_queue add constraint reads_queue_status_check
  check (status in ('draft','in_review','ready','publishing','published','failed'));
```

Note on storage: keep storing the full `markdown` (frontmatter + body) as the publish
payload, and let the editor edit it — either as one markdown field or as structured
frontmatter fields + `body_markdown` recombined on save. The design chat can pick; the
publish-read function only needs the final full markdown.

RLS stays on; access via the portal's authenticated session or the shared-key pattern from
the v1 spec. No anon access.

---

## Part 3 — Editor UI

Match the portal's existing design system. Requirements, not styling:

**Queue view.** Reads grouped by `status` (Draft, In review, Ready, Published) and
filterable by lane. Each row: title, lane badge, target query, word count, date, and status.
With 3/day arriving, triage matters — default sort newest-first, drafts on top.

**Editor view** (opening a Read):
- **Edit the copy.** Body as an editable markdown field (or a light rich editor that emits
  markdown) plus editable frontmatter fields: title, description, tags, target_query.
  Opening a draft flips its status to `in_review`; saving updates `updated_at`.
- **Live validation** against the voice rules, shown inline as you edit:
  - description 140–160 chars
  - no exclamation marks; no hype words (revolutionary, game-changing, unleash…)
  - internal links are root-relative (`/reads/...`), never claude.ai/external
  - exactly one H1; 2–4 H2s
  Publish stays disabled until validation passes.
- **AI suggestions panel** (see below): pre-attached suggestions with accept/reject, plus a
  "Suggest more" button.
- **Sources panel** (Business Reads only): the `sources` list, each claim linked to its URL.
  A **"Sources checked" toggle** (`sources_checked`) that must be on before a Business Read
  can be published. This is the safety gate for automated named-brand content.
- **Preview** — rendered markdown as it will appear on the site.
- **Publish** — the existing publish-read flow. Enabled only when `status` can go to `ready`,
  validation passes, and (for Business) `sources_checked = true`.

**AI suggestions — shape and behaviour.** Suggestions (pre-attached and on-demand) are a
JSON array, each: `{ id, section, original, suggested, reason }`. The reason cites which
rule it serves (e.g. "clarity: names the concrete thing", "kills accidental double meaning",
"measured confidence"). In the UI each suggestion shows original → suggested with the reason;
**Accept** applies the diff to the body, **Reject** dismisses it. "Suggest more" calls the
live function (Part 4) for a fresh pass and appends results.

---

## Part 4 — Edge function: `suggest-fixes` (live AI)

Deployed in the aubreynorth Supabase project. Powers the "Suggest more" button (and can be
reused by the drafting engine for the pre-attached pass, so the rules live in one place).

- Input: `{ id }` (or raw markdown). Loads the Read's current body.
- Calls the **Anthropic API** with a system prompt built from the same voice + clarity +
  recurring-edit-pattern rules as the `draft-a-read` skill. Keep those rules in **one shared
  config** referenced by both the drafting engine and this function, so voice never drifts
  between them.
- Returns the suggestions JSON shape above; the portal renders them. Does **not** auto-apply.
- Secret: `ANTHROPIC_API_KEY` as an edge-function secret (never client-side). CORS limited to
  `https://portal.cunningcorp.com`.
- Model: a fast Claude model is fine for line-level fixes; note per-call cost since it can be
  clicked repeatedly.

---

## Guardrails & policy

- **Nothing publishes without Demetri.** Auto-drafting changes who *writes*, never who
  *publishes*. The publish button stays the only path live.
- **Business safety gate:** an automated Business Read cannot be published until
  `sources_checked = true` and the sources panel has been opened. Wrong facts about a named
  company are the main risk of automating this lane — this toggle is the backstop.
- **Voice single-source:** drafting engine and `suggest-fixes` share one rules config; do not
  duplicate the rules in two prompts that can drift.
- **Validation before publish** (the programmatic checks above) runs server-side too, not
  just in the UI, so a bad payload can't be forced through.
- **Cost visibility:** 3 drafts/day + repeated "suggest more" calls have an API cost; worth a
  simple per-month usage note somewhere in the portal.

## Out of scope (v2)

Scheduling *publishes* (Demetri still clicks) · unpublish/rollback (stays a git op) ·
multi-author roles · analytics dashboards · image generation for OG cards per Read.

## Acceptance criteria

- [ ] Drafts arrive automatically, one per lane per day, as `status='draft'` with pre-attached
      suggestions (and sources for Business).
- [ ] Demetri can edit body + frontmatter in the portal; live validation blocks publish until
      voice rules pass.
- [ ] Accept/reject on pre-attached suggestions applies/dismisses cleanly; "Suggest more"
      returns a fresh live pass.
- [ ] A Business Read cannot be published until `sources_checked = true`.
- [ ] Publish still commits to GitHub via publish-read and the site deploys, unchanged.
- [ ] `ANTHROPIC_API_KEY` exists only as an edge-function secret; suggest-fixes rejects calls
      without auth; CORS limited to the portal origin.
- [ ] Queue remains readable at volume (lane filters, status grouping, newest-first).

## Open decisions for the design chat

1. Editor input: raw markdown field vs a light rich-text editor that emits markdown.
2. Where the shared voice-rules config lives (a Supabase row, a repo file the function reads,
   or an inline constant) so drafting + suggest-fixes stay in sync.
3. Whether "Suggest more" runs on the whole Read or a selected paragraph (cheaper, more
   targeted).
4. Notifications: does a new batch of morning drafts ping Demetri (email/Slack)?
