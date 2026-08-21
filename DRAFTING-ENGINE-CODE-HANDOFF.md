# Drafting engine — note back to the code pass

_From the Cowork drafting session, 21 Aug 2026. Re: `insert-draft`, `DRAFT_INSERT_SECRET`,
`DRAFTING-ENGINE-SETUP.md`._

The daily drafting task is now live (Cowork scheduled task, ~06:30 Europe/London, one Read
per lane, drafts only). One deviation from the specced pipeline you should know about, plus
two confirmations.

## Deviation: the Cowork task inserts via the Supabase connection, not `insert-draft`

The scheduled Cowork run executes in a sandbox with **no outbound network to the Supabase
functions endpoint** — a POST to `insert-draft` returns HTTP 000 (unreachable). So the daily
task cannot use the shared-secret HTTP endpoint.

Instead it inserts `status='draft'` rows **directly into `public.reads_queue` through the
managed Supabase connection** (the same channel this session used to seed the existing
queue). Consequences:

- The task holds **no secret and no service-role key** — it uses the managed connection, so
  it is arguably safer than embedding `DRAFT_INSERT_SECRET`. But it **bypasses
  `insert-draft`'s server-side validation.** Those checks (dup-slug 409, Business-requires-
  sources 422, description 140–160) are **replicated in the task's own logic** instead.
- `insert-draft` and `DRAFT_INSERT_SECRET` are **not removed and not wasted** — they remain
  the correct entry point for any **non-Cowork** caller (portal, another service). Keep them.

If you'd prefer the Cowork task to go through `insert-draft` anyway, it would need a network
path from the scheduled sandbox to `*.functions.supabase.co` — not available today. Flag it
if that changes.

## Please confirm on your side

1. **Server-side enforcement still matters.** Since one writer (Cowork) now bypasses
   `insert-draft`, keep the Business **sources gate enforced at publish** in `publish-read` /
   the portal (not only in `insert-draft`), so a draft that reached the queue by any path
   still can't publish without `sources_checked = true`. This is the real safety net for
   automated named-brand content.
2. **`draft`/`in_review` etc. render correctly** in the portal's queue columns for rows
   inserted directly (they carry the same columns `insert-draft` would set:
   `body_markdown`, `suggestions`, `sources`, `sources_checked=false`).

## Unchanged

Publishing is still exclusively Demetri's click via `publish-read`. The drafting task cannot
publish — it only writes `status='draft'`. Nothing about the live-site path changed.
