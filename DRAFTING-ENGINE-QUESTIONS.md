# Questions for the code pass — drafting engine + VOICE-RULES

_From the Cowork drafting session, 21 Aug 2026. Context: `DRAFTING-ENGINE-SETUP.md` and
`VOICE-RULES.md` on branch `feat/voice-rules-config`; parent spec `PORTAL-EDITOR-SPEC.md`._

I reviewed both new files against the live Supabase project and confirmed the groundwork is
in place: the `reads_queue` editor migration is already applied (columns `body_markdown`,
`suggestions`, `sources`, `sources_checked`, `updated_at`, `notes` all exist; status enum now
includes `draft` and `in_review`), and all five existing Reads pass the stricter hype-word +
exclamation checks. Three things need a decision before the drafting engine can go live.

## 1. Branch `feat/voice-rules-config` — status and merge

`VOICE-RULES.md` and `DRAFTING-ENGINE-SETUP.md` exist only on the local branch
`feat/voice-rules-config` (not pushed, not on `main`).

- Who owns this branch, and is it ready to merge to `main`, or still in review?
- The drafting engine and the `suggest-fixes` edge function are both specced to **read
  `VOICE-RULES.md` from the repo at runtime.** If it lives only on a branch, neither can
  read it. Does it need to be on `main` first — and does `suggest-fixes` read it from `main`
  via the GitHub API, or from a bundled copy?

## 2. How does a headless scheduled run authenticate to Supabase?

`DRAFTING-ENGINE-SETUP.md` says the drafting session writes to `reads_queue` via the service
role, "key provided by Demetri per run, never stored." In an interactive Cowork session the
writes currently go through the connected Supabase tool, not a stored key.

- When the drafting task runs **on a schedule (unattended)**, what credential does it use to
  INSERT into `reads_queue`? Does the scheduled task inherit the same Supabase connection as
  an interactive session, or does it need a service-role key made available some other way?
- If a key is required, where should it live so it is available to the scheduled run but
  never written to the repo, a file, or chat?

This is the blocker for actually scheduling the daily run — everything else is ready.

## 3. Hype-word list — hard block vs soft warn

`VOICE-RULES.md` §"Hard rules" makes the full hype-word list a **publish blocker** (enforced
in the UI and server-side). The list includes some words with legitimate non-hype uses:
`unlock`, `elevate`, `empower`, `seamless`, `leverage`, `delve`.

- Keep the whole list as a hard block (occasional false-positive that Demetri overrides), or
  split it: a **hard-block** set (revolutionary, game-changing, unleash, supercharge,
  disrupt, mind-blowing, etc.) and a **soft-warn** set (unlock, elevate, empower, seamless,
  leverage, delve) that flags but does not block publish?
- If there is a hard block, is there an **override** path in the portal for a deliberate,
  legitimate use, or is the word simply not allowed?
- Confirm the check matches on **whole words / word families** (not naive substrings), so
  "unlocked the door" or a proper noun isn't caught wrongly.

## Not blocking, for awareness

- Drafting (3/day) intentionally outpaces publishing (~1/day); the queue grows by design.
  The setup spec flags pausing a lane if unpublished count exceeds ~15 — confirm that
  threshold is acceptable.
- Business-lane drafts must carry a non-empty verified `sources` list or they are held back,
  and `sources_checked` stays false until Demetri ticks it in the portal. This is the main
  safety gate for automated named-brand content — confirm the server enforces it, not just
  the UI.
