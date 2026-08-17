# Reads — SEO & content strategy

Cadence: **one Read per week.** Topics are **keyword-led** — each Read exists to catch a
real search query, not to mirror the video pipeline. Voice and copy are governed by
`_handoff/brand/copylock.json`; the Dropbox Read is the tone reference.

The publish loop: Claude drafts → Demetri reviews and edits → commit → `git push`.
Nothing publishes without Demetri's approval. That is a copylock rule, not a preference.

---

## The reach thesis

Nobody searches "narrative advisory." People search around the problem, and the largest
search behaviour adjacent to what Aubrey North does is not business messaging — it is
**storytelling itself**. Structure, character, stakes, why stories hold and why they lose
people. That is a permanently searched subject with a library of evergreen queries, and it
is upstream of everything AN argues.

So the reach engine is **the foundations of storytelling**, and the Screen lane carries it.

Screen's remit is therefore **broadened**: from TV and film craft to story craft generally
— structure, technique, and the mechanics of why stories work, wherever they appear. TV and
film remain the richest source of examples, not the boundary of the lane.

This is a **topical authority play, not a lead play.** A reader searching "three act
structure" is not buying narrative advisory. The traffic pays off only through the
internal-link spine below, which is the mechanism that turns reach into conversion. Without
that discipline, this strategy produces visitors and nothing else.

### What broadening Screen does not change

Nothing in the build. `lane: screen` stays as-is, `/reads/screen/` stays as-is, the schema
in `src/content/config.ts` is untouched, and the lane pages carry labels rather than
descriptions. The change is editorial remit only.

---

## The library rule (self-consistency)

Aubrey North argues for restraint. A large content library looks like the opposite, and
that tension needs settling once, in writing, because every future decision leans on it:

> **Restraint is a constraint per piece, not a cap on the library.**

A hundred Reads is fine if each one says one thing. One Read that says eight things is the
failure. Volume of pieces is not volume of voice. The 1/8th principle governs the *inside*
of a Read; it does not govern how many Reads exist.

This is the line that licenses the expansion. It also sets its limit: the moment a Read
starts hedging, cataloguing or covering the subject comprehensively, it has broken the rule
regardless of how well it ranks.

---

## Lanes

| Lane | Search behaviour | Role | Intent |
|---|---|---|---|
| **Screen** | Story-craft queries ("sagging middle", "three act structure", "why shows get worse after season 2") | Reach engine — biggest volume, builds topical authority on narrative | Low |
| **Business** | Company-name queries ("why did X's rebrand fail", "how Y marketed Z") | Ranking engine — searcher is a business-curious reader | Medium |
| **Type** | Problem queries ("customers don't understand what we do") | Conversion engine — tiny volume, exactly our buyer | High |

**Mix: 2 Screen : 2 Business : 1 Type** over any five-week stretch.

Screen moves to the front of the ratio because it now carries the foundations corpus, which
is the largest body of available queries. The previous 2 Business : 2 Screen : 1 Type split
assumed a narrower Screen; the counts are unchanged, the emphasis is not.

Volume estimates below are directional (based on query shape, not a paid keyword tool).
Validate winners in Search Console once impressions start arriving, and double down on
whatever lane earns impressions first.

### Screen sub-streams

Three kinds of Screen Read, all under `lane: screen`. Tags separate them; no new lane.

1. **Foundations** — the mechanics of story. Highest volume, hardest competition.
2. **Cases** — a specific show or film as the worked example. Where TV/culture now sits.
3. **Failures** — a named way stories lose people, then the business version of the same
   failure. The bridge sub-stream, and the one that routes best to Type.

Keep foundations and failures roughly balanced. Foundations earns impressions; failures
earns the click through to Type.

---

## The internal-link spine

This is the load-bearing part of the strategy and the thing most likely to be skipped.

Reach traffic converts only if it is routed. Every Read carries, at minimum:

- **One link up** to the lane page (`/reads/screen/`, `/reads/business/`, `/reads/type/`).
- **One link across** to a related Read.
- **Screen and Business Reads additionally carry one link toward a Type Read.** Not a
  call to action — a genuine "the same failure, seen from inside a business" link. Type is
  where the buyer is; nothing else reaches them.

A Screen Read with no path toward Type is a dead end. Rank it, and it still earns nothing.

When a Read has no natural Type destination yet, that gap is the next Type topic.

---

## Topic backlog

Work top to bottom within a lane, but keep the lane mix. One target query per Read —
answer it early, then earn the deeper point.

### Screen lane — Failures

- [ ] **The Sagging Middle Read** — target: "sagging middle story". Why stories lose their
      audience at the midpoint — and the business version of the same failure.
- [ ] **The Season Two Read** — target: "why do shows get worse after season one". The
      expired premise: a story that keeps talking after its question is answered.
- [ ] **The Show-Don't-Tell Read** — target: "show don't tell examples". The gap between
      claiming a quality and demonstrating it, on screen and in business copy.

### Screen lane — Foundations

Provisional. To be extended and reordered against Demetri's existing storytelling notes
once those are inventoried — see *Open decisions*. Do not treat this ordering as settled.

- [ ] **The Cold Open Read** — target: "what is a cold open". Why starting inside the
      story beats starting with the setup — on screen and in a pitch.
- [ ] **The In Medias Res Read** — target: "in medias res meaning". Starting where the
      interest already is.
- [ ] **Story vs narrative** — target: "story vs narrative difference". The distinction the
      whole advisory rests on. Highest strategic value in this sub-stream.
- [ ] **Three-act structure** — target: "three act structure". Very high volume, very
      contested. Only worth attempting with the diagnostic angle, never as an explainer.
- [ ] **Story arcs** — target: "types of story arcs". The shapes stories take and what each
      one asks of an audience.
- [ ] **Stakes** — target: "what are stakes in a story". Why nothing lands when nothing is
      at risk — the most transferable idea in the corpus.
- [ ] **Chekhov's gun** — target: "chekhov's gun meaning". Everything present must earn its
      place. Naturally adjacent to 1/8th without stating it.

**On competing for foundations terms:** the incumbents (StudioBinder, MasterClass, Reedsy
and similar) rank by being complete. AN cannot win on completeness and should not try — a
comprehensive explainer would break the library rule anyway. The differentiator is the
diagnostic turn: not "here is what a three-act structure is" but "here is what goes wrong
when a story has one and still fails." Expect the realistic wins to be long-tail and
question-shaped rather than the head terms themselves.

### Screen lane — Cases

- [ ] Unwritten. Cases should be chosen once foundations Reads exist to link them to,
      so each case has something to substantiate.

### Business lane (company-name queries)

- [x] The Dropbox Read — *published*
- [ ] **The Tropicana Read** — target: "tropicana rebrand failure". The 2009 packaging
      redesign: $30M+ lost by discarding the story customers already understood.
- [ ] **The Old Spice Read** — target: "old spice rebrand". A dying brand that chose one
      absurdly specific story instead of chasing everyone.
- [ ] **The Liquid Death Read** — target: "liquid death marketing strategy". Water in a
      can; the product is ordinary, the story does all the work.
- [ ] **The Patagonia Read** — target: "don't buy this jacket ad". Saying less — literally
      "don't buy" — as the highest-trust pitch.
- [ ] **The Airbnb Read** — target: "airbnb belong anywhere rebrand". Moving from listing
      features (air beds) to one narrative (belonging).
- [ ] **The Slack Read** — target: "slack early marketing". Selling the outcome (calmer
      teams) rather than the feature list.

### Type lane (problem queries — anonymised archetypes)

- [ ] **The Everything Pitch** — target: "how to explain what your business does". The
      founder who answers with all eight eighths.
- [ ] **The Understood Problem** — target: "customers don't understand what we do".
      Diagnosis: it's a clarity problem, not a reach problem.
- [ ] **The Louder Budget** — target: "why isn't my marketing working". Spending more to
      amplify a message nobody understood at normal volume.
- [ ] **The Positioning Muddle** — target: "positioning vs branding vs marketing". Where
      narrative sits and why the other two depend on it.

---

## Per-Read SEO checklist (in addition to voice rules)

1. **One target query.** It appears naturally in the `title`, the `description`, and the
   H1 or first heading — never stuffed.
2. **Answer arrives early.** The searcher's question is addressed in the first ~150 words;
   the deeper Aubrey North point follows. Story leads, method follows.
3. `description` is 140–160 chars and would earn a click on its own.
4. 700–1,100 words. If it needs padding to get there, it's the wrong topic.
5. One `##` heading every 200–300 words, phrased as sense-making, not keywords.
6. Internal links per the spine above — lane page, related Read, and a route toward Type
   from Screen and Business Reads.
7. Frontmatter complete: `title`, `description`, `lane`, `pubDate`, `tags` (3–5,
   lowercase, reuse existing tags where true).
8. Facts verified — company Reads make factual claims; check them before drafting around
   them. No invented numbers, dates, or quotes.
9. **Library rule check.** The piece says one thing. If it covers a subject, it has failed.

---

## Expansion: social and short-form video

Sequenced **after** the Read library reaches roughly 6–8 pieces. Earlier than that there is
nothing to repurpose and nothing to link back to.

### A stated decision to make deliberately

This document previously held that topics are keyword-led and deliberately **not** mirroring
the video pipeline. Repurposing Reads into social and video **reverses that decoupling.**
That is a legitimate change, but it is a change — the two channels stop being independent
and the Read becomes the source text.

Consequence to accept: the video pipeline loses the freedom to run its own sequence, and
Read topic selection starts carrying a second constraint (does this repurpose?). If that
constraint ever outranks the search rationale, the strategy has drifted.

### Format gates

The faceless-reel moral-story format was already assessed as incompatible with Aubrey North
— stated morals, explained lessons, and rags-to-riches mechanics contradict the brand
directly. AI-generated video drifts toward exactly that shape by default. So any social or
video output passes these gates before production:

1. **The resolution is withheld.** Descriptions and captions do not state the lesson. This
   already governs platform metadata; it governs the cut as well.
2. **Symptom before thesis.** Open in the audience's felt experience, never with the
   channel's purpose or the principle's name.
3. **No stated moral.** If the piece ends by explaining what it meant, it is the reel
   format wearing a different typeface.
4. **One idea.** The library rule applies per post, not per campaign.
5. **Volume check.** Aubrey North is the quietest volume in the ladder. Copy that suits the
   house voice is usually too loud here.

A format that cannot pass all five runs as a sub-brand, not under the AN name.

### Watch item

Drafts drift consistently toward volume framing — "stand out", "clear away the clutter",
"show your true self". This drift is a known pattern and gets corrected back toward
precision every time. Flag it in review rather than waiting for it to be caught.

---

## What this strategy does not do

- No comprehensive guides, no "ultimate" anything, no listicles.
- No competing on explainer completeness against the craft incumbents.
- No fourth lane. Foundations sits inside Screen; the three-lane model holds.
- No publishing without Demetri's approval.
- No invented brand facts. Missing strings are left as `TODO(copy)`, not improvised.

---

## Measurement

- **Search Console** (property: aubreynorth.com) — check monthly: impressions by page,
  queries earning impressions, pages indexed vs excluded.
- Expect nothing for 4–8 weeks. The library compounds; individual pieces rarely spike.
- When a Read earns impressions for a query it doesn't fully answer, that query is the
  next Read.
- **Additionally, for the reach thesis:** track whether Screen traffic reaches Type pages
  at all. If Screen earns impressions and no Type page ever sees a referral from it, the
  spine is not working and the reach is decorative. That is the number that decides whether
  broadening Screen was correct.

---

## Open decisions

- **Storytelling corpus not yet inventoried.** Demetri holds existing notes and story
  examples; the foundations backlog above is provisional until those are read and mapped to
  queries. The reference folder connected on 2026-08-17
  (`Branding/refereences`) contains Cunning Corp brand material and the HECTARE universe
  documents, not the storytelling corpus.
- **Whether Screen's broadened remit needs stated copy on `/reads/screen/`.** The lane pages
  currently carry labels only. If a descriptor is wanted, it is locked copy and Demetri
  writes it — `TODO(copy)`.
- **Examples library.** A structured, growing collection of story examples may deserve its
  own content type rather than living inside Reads. Deferred until the corpus is inventoried.

---

## Publishing mechanics (already built)

Adding a `.md` file to `src/content/reads/` and pushing to `main` is the entire process.
The deploy workflow builds, the sitemap updates itself, drafts (`draft: true`) are
excluded automatically. Use the **draft-a-read** skill to generate drafts in the locked
voice against this backlog.
