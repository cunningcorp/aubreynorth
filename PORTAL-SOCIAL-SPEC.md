# Spec — Social panel for portal.cunningcorp.com (v3, extends the editor)

_Prepared 21 Aug 2026 for the portal design/build chat. Owner: Demetri._
_Builds on `PORTAL-PUBLISH-SPEC.md` (queue + publish, live) and `PORTAL-EDITOR-SPEC.md`
(editor + suggest-fixes). Strategy source: `DISTRIBUTION-STRATEGY.md` (repo root)._

> **Read this first — what this does and does not do.** This panel **generates social copy
> and helps Demetri post it by hand. It never posts anything itself.** There is no posting
> API, no scheduler, no automation that reaches LinkedIn or X. Generation happens only after
> Demetri marks a Read **`ready`** — from the final, edited copy, never a draft. If any part
> of this build could post to a platform without Demetri pasting it, it is wrong.

## What this adds

Once a Read is approved (`ready`), the portal generates its platform versions into a **Social
panel** on that Read: the X Article, an X post pointing to it, the LinkedIn Newsletter entry,
a LinkedIn feed post, and the quote micro-posts. Demetri edits them inline (same
suggestion/validation loop as the editor), clicks **Copy**, and pastes into each platform's
composer. The long-form homes (X Articles, LinkedIn Newsletters) are rich editors with no
clean API — manual is the correct and only sensible path, and it keeps the copy gate absolute.

## Decisions locked (Demetri, 21 Aug)

- **X long-form: an X Article** per Read (rich, links allowed in body) **+ a long post** as
  the feed hook pointing to it. Needs X Premium.
- **LinkedIn long-form: a Newsletter entry** per Read (notifies subscribers, links not
  downranked) **+ a feed post** hook. Needs newsletter access on the page.
- **Posting: generate-and-paste, no API.** Zero per-post cost; Demetri posts manually.
- **Trigger: on `ready`.** Social generates from the final copy, not at draft time.
- **Voice: single-source** — same `VOICE-RULES.md` config as drafting + suggest-fixes.

---

## Part 1 — Data model (Supabase `reads_queue`)

Add one column; the pack is a structured JSON blob per Read (mirrors the `suggestions` /
`sources` jsonb pattern already in use).

```sql
alter table public.reads_queue
  add column if not exists social jsonb default '{}';   -- the generated social pack + per-channel state
```

Pack shape (the panel reads/writes this):

```json
{
  "status": "none | generating | generated | posted",   // overall
  "generated_at": "<timestamptz>",
  "x_article":    { "title": "", "body_markdown": "", "state": "generated|copied|posted" },
  "x_post":       { "text": "", "state": "..." },        // feed hook; first ~280 chars = the hook
  "li_newsletter":{ "title": "", "body_markdown": "", "state": "..." },
  "li_post":      { "text": "", "first_comment": "", "state": "..." },  // link lives in first_comment
  "micro_posts":  [ { "text": "", "platforms": ["x","linkedin"], "offset_days": 2, "state": "..." } ]
}
```

Notes:
- Canonical link (to `https://aubreynorth.com/reads/<slug>/`) goes **in the body** of
  `x_article` and `li_newsletter`, and in `li_post.first_comment` — never in a feed post body.
- `state` per channel is Demetri's manual tracker (generated → copied → posted). The panel
  never sets `posted` on its own.
- RLS unchanged; authenticated/shared-key access only, no anon.

---

## Part 2 — Edge function: `generate-social`

Deployed in the aubreynorth Supabase project, alongside `suggest-fixes` and `publish-read`.

- **Input:** `{ id }`. **Guard:** the Read must be `status='ready'`; reject otherwise (social
  is generated from final copy only).
- Loads the Read's final body + frontmatter (title, description, slug, lane, tags).
- Calls the **Anthropic API** with a system prompt built from the **shared voice config**
  (`VOICE-RULES.md` — the same one `suggest-fixes` uses; do not duplicate the rules) plus the
  **format templates** from `DISTRIBUTION-STRATEGY.md`:
  - **x_article** — the Read as a native X Article: same argument, rich long-form, canonical
    link in the body. Withhold nothing here; it is the full piece.
  - **x_post** — a feed hook whose first line is the Read's Mirror line; teases, does not
    resolve; points to the Article. No body link.
  - **li_newsletter** — the Read as a Newsletter entry (title + body), canonical link in body.
  - **li_post** — a feed hook (AN voice, first person "we"); `first_comment` carries the link.
  - **micro_posts** — 4–6 pull-quotes, one idea each, resolution withheld, with suggested
    `offset_days`.
- **Returns** the pack JSON; writes it to `social` with `status='generated'`. **Posts nothing.**
- Secret: reuse `ANTHROPIC_API_KEY` (edge-function secret only). CORS limited to
  `https://portal.cunningcorp.com`.

---

## Part 3 — Social panel (portal UI)

Appears on a Read **only when `status` is `ready` or beyond**. Match the portal's design
system; requirements, not styling.

- **Generate.** A **Generate social** button (or auto-generate on first entry to `ready`).
  While running, show progress; on return, populate the sections. A **Regenerate** action
  re-runs the function (replaces unposted copy; warn if any section is already `posted`).
- **Sections**, each editable with the same accept/reject suggestion affordance as the editor
  and live validation:
  - **X Article** — title + body (markdown / light rich). Link-in-body allowed.
  - **X post** — single field; show a live 280-char "preview cutoff" marker so the hook fits.
  - **LinkedIn Newsletter** — title + body. Link-in-body allowed.
  - **LinkedIn post** — post body **and a separate first-comment field** (the link); both have
    their own Copy button.
  - **Micro-posts** — a list; each editable, with its `platforms` and `offset_days`
    (display-only scheduling hint — Demetri still posts by hand).
- **Per section:** a **Copy** button and an **Open composer** link (X Articles editor, X
  compose, LinkedIn newsletter/article editor, LinkedIn post composer). A **state** control
  (generated → copied → posted) Demetri sets manually.
- **Validation** (inline, shared with the editor's rules where they apply):
  - No exclamation marks, no hard-block hype words, no italics.
  - Feed hooks (x_post, li_post) withhold the resolution; the link is not in a feed-post body.
  - X post ≤ 25,000 chars; LinkedIn post ≤ 3,000 chars; description-style limits where used.
  - Canonical link present in x_article, li_newsletter, and li_post.first_comment.

---

## Guardrails & policy

- **Nothing posts itself.** No platform API, no scheduler. The panel produces copy; Demetri
  pastes it. This is the whole safety model and the reason it needs no posting credentials.
- **Generate only at `ready`.** No social from a draft; `generate-social` rejects non-ready
  Reads.
- **Voice single-source.** `generate-social` and `suggest-fixes` share the `VOICE-RULES.md`
  config; never restate the rules in a second prompt that can drift.
- **Link discipline** baked into validation: body links only in the long-form homes; feed
  posts keep the link in the comment/reply.
- **Cost visibility.** `generate-social` is an Anthropic call per Read (plus regenerations) —
  fold into the same per-month usage note as `suggest-fixes`.

## Out of scope (v3)

Auto-posting or scheduling to any platform · analytics · Instagram tiles/carousels and the
Animated Read video (separate later specs) · OG/hero image generation for the X Article ·
multi-account support.

## Acceptance criteria

- [ ] The Social panel is hidden until a Read is `ready`; `generate-social` rejects any
      non-`ready` Read.
- [ ] Generate returns all five sections populated in-voice, written to `social` as
      `status='generated'`; nothing is posted anywhere.
- [ ] Each section is editable, passes the shared voice validation, and has working Copy +
      Open-composer + manual state controls; LinkedIn post exposes a separate first-comment
      Copy.
- [ ] Canonical link is in x_article / li_newsletter bodies and li_post.first_comment, and
      never in a feed-post body.
- [ ] `ANTHROPIC_API_KEY` stays an edge-function secret; `generate-social` CORS is limited to
      the portal origin.
- [ ] No code path can post to X or LinkedIn.

## Seed / first test

Generate social for a published Read already in the system (e.g. **The Narrative Read**) and
confirm the five sections come back in-voice, editable, and copyable — then hand-post one as
the end-to-end check.

## Open decisions for the design chat

1. Auto-generate on entering `ready`, or an explicit **Generate social** click.
2. Whether **Open composer** deep-links are reliable per platform (X Articles / LinkedIn
   newsletter editors) or the panel just shows "Copy, then open X/LinkedIn and paste".
3. Newsletter cadence: one Newsletter issue per Read, or batch several Reads into a periodic
   issue.
4. Whether the X Article needs a hero image (and if so, where it comes from — out of scope to
   build here, but flag the field).
5. Where the shared `VOICE-RULES.md` config physically lives so `generate-social` and
   `suggest-fixes` read the exact same rules.
