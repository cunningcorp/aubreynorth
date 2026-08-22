<!--
  VOICE-RULES.md — single source of truth for Aubrey North editorial voice.
  Read by BOTH the drafting engine (draft-a-read skill) and the suggest-fixes
  edge function, so voice never drifts between drafting and review.
  Governed by copylock: this file restates and operationalises the rules in
  _handoff/brand/copylock.json (voice.*) and the draft-a-read skill; it does
  not invent new positioning. Bump the version and note changes below.

  version: 1.1
  updated: 2026-08-22
  sources: _handoff/brand/copylock.json (v1.3), draft-a-read skill, clear-writing skill
  changelog:
    1.1 — added "name what the term hides" de-jargon rule (industry jargon +
          opaque craft metaphors); added de-jargon to recurring edit patterns;
          closing lane-link line is plain text, no whole-line italics.
    1.0 — initial consolidation of copylock voice + clarity + edit patterns.
-->

# Aubrey North — voice rules

Aubrey North is the quietest volume in the Cunning Corp ladder. Sharp, dry,
confident — never zany, never hyped. Warm and a little whimsical, but every
line must still paint a clear picture. When unsure, cut.

## Hard rules (a Read that breaks one is not publishable)

1. No exclamation marks. Anywhere.
2. No hype words. Two tiers, matched whole-word and case-insensitive:
   - **Hard block** (a Read with one is not publishable): revolutionary,
     game-changing, game changer, unleash, supercharge, turbocharge, disrupt,
     disruptive, cutting-edge, next-level, world-class, effortless, mind-blowing,
     jaw-dropping, best-in-class, paradigm, synergy.
   - **Soft warn** (flagged in the editor, does not block publish): unlock,
     elevate, empower, seamless, leverage (as a verb), delve. These have honest
     uses; the flag lets Demetri keep a deliberate one.
   State the point plainly and let it glow.
3. Wit is a scalpel: at most one clever turn per Read.
4. The 1/8th principle: make one idea land; never catalogue every venture or point.
5. Story leads, method follows: open inside the story — a scene, a moment, a
   year — not the thesis or the lesson.

## Clarity over compression (Demetri's standing rule)

Clarity beats cleverness. Compression reads as vagueness because it makes the
reader supply the meaning you left out. Where a sentence could be crisp-but-vague
or longer-but-unmistakable, choose unmistakable.

- Name the concrete thing. Abstract placeholders — the thing, the part, the mark,
  the distance, the point, what it is — must be replaced by, or paired with, the
  specific thing they refer to. If a reader could ask "which thing?", it isn't done.
- Name what the term hides. If a word sounds meaningful but doesn't tell the reader
  what to picture or do, replace it with the concrete thing it stands for. Two kinds
  to catch: (a) industry jargon a general reader may not parse — "the ask", "the
  close", "top of funnel"; (b) internal or craft metaphors that read as meaningful but
  are opaque — "start folding", "let it breathe", "the strands haven't begun to fold".
  Test: could a smart reader outside the field ask "what does that actually mean?" If
  yes, say it plainly. E.g. "the ask" → "the moment you ask them for something"; "the
  close is ready" → "you know how you'll finish"; "it has to start folding" → "it has
  to start pulling together".
- Prefer explicit over elegant. One unambiguous longer sentence beats a tighter
  one open to three readings. Never sacrifice meaning for rhythm.
- Spell out the mechanism. If X causes Y, or something "just works", say how, plainly.
- One idea, said plainly — not a licence to pad. Every added word must add meaning;
  the target is the shortest version that is still fully clear.

## Recurring edit patterns (draft to these; suggest-fixes proposes them)

- Kill accidental double meanings. Scan for a word carrying a second sense in
  context (e.g. "thins to a film" reading as film = movie) and swap it.
- Measured confidence, not absolutes. Soften over-broad claims: "a business
  sprawls" → "a business can sprawl"; "it reads as blurry" → "it may read as blurry".
- Cut throat-clearing and meta. "There is a trick underneath worth saying plainly"
  → "There's a trick to this." Remove phrases that announce the point instead of
  making it, and redundant tails ("happen and land" → "happen").
- Precise verbs and nouns. "feels fully there" → "feels fully realised". Reach for
  the exact word.
- Parallelism for antithesis. "present in every category, is fully real in none" →
  "present in every category, is truly present in none" — repeat the key word to
  sharpen the contrast.
- De-jargon (name what the term hides). Replace insider terms and opaque metaphors
  with the plain thing they mean: "the ask" → "the moment you ask for something";
  "the close is ready" → "you know how you'll finish"; "it has to start folding" →
  "it has to start pulling together".

Net: tighten and hedge at once — measured confidence that removes anything a reader
could trip on or over-read.

## Programmatic checks (enforced in the UI and server-side before publish)

These are mechanical and must all pass. suggest-fixes may propose changes that
satisfy them; publish is blocked until they do.

- description: 140–160 characters, contains the target query, earns the click.
- No exclamation marks in title, description, or body.
- No hard-block hype words (list above) in title, description, or body; soft-warn
  words are flagged for review but do not block publish. Matched whole-word,
  case-insensitive.
- Exactly one H1; 2–4 H2 (`##`) headings, phrased as sense-making turns, not keywords.
- Internal links are root-relative (`/reads/<slug>/`) — never a claude.ai or other
  external URL for an internal reference. External citations in Business Reads are
  allowed only in the sources list, not as body links.

## Structure (guidance, not a hard gate)

700–1,100 words (leaner ~600–700 is fine — don't pad). Short paragraphs (1–4
sentences). Answer the searcher's question within the first ~150 words. Close by
landing the one idea, at most one echo of an AN line. Include at least one internal
link to a related Read and one to the lane page. The business-turn section is headed
"The business edit". The closing lane-link line (e.g. "More on how stories hold an
audience in the Screen lane.") is **plain text — not italicised, not wrapped in
asterisks**. Avoid a whole line set in italics anywhere in a Read.

## Approved coinages (from copylock aubreyNorthLexicon — use only these public terms)

- The Core — character plus motive: the thing an audience invests in, wanted but
  never quite reached. No core, no reason for the idea to exist.
- The Boundary — a defined, small world has depth; large to the audience, few grand
  things to the maker.
- The BOW mentality — refusing to tie a story off in a neat, contrived bow.

Internal working terms (String Cheese, Panda Construct, etc.) shape a Read but are
never named on the page.

## Business Reads — factual verification (mandatory for the Business lane)

Business Reads name real companies, so they carry factual and reputational risk.

- Only well-documented cases covered by multiple reputable outlets.
- Verify every factual claim by web search; no number, date, or quote without a
  source. Use "reportedly"/"around" for disputed or approximate figures.
- Separate fact from interpretation. State reported facts as facts; frame the
  strategic read as interpretation ("the lesson usually drawn is…"), never assert
  private intent as fact.
- Fair comment, not accusation. Analyse public decisions and public results only.
- Deliver a sources list (claim + URL) with the draft; it stays out of the published
  markdown and is reviewed via the portal's Sources panel before publish.

## Suggestion contract (for suggest-fixes and the editor)

Every fix suggestion is `{ id, section, original, suggested, reason }`. `reason`
cites the rule it serves in a few words (e.g. "clarity: names the concrete thing",
"kills accidental double meaning", "measured confidence", "hype word"). Suggestions
are line-level, never rewrite a whole Read, and are never auto-applied — Demetri
accepts or rejects each one.
