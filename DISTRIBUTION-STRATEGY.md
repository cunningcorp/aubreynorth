# Aubrey North — distribution strategy

How a Read travels beyond the site. The Read is the quarry; everything here is cut from a
piece that already passed the copy gate, so it is on-voice by construction. This file holds
the **Animated Read** format spec and the **LinkedIn** publishing strategy; the **Instagram**
section comes next.

Governed by the same rules as the site: `_handoff/brand/copylock.json` (voice), the five
format gates in `CONTENT-STRATEGY.md` (the social/video expansion section), and the library
rule — restraint per piece, not a cap on the library.

### Voice on platform — adapting without going loud (decided 2026-08-17)

The site and the Reads stay exactly as copylock sets them: no emoji, no exclamation marks,
the quietest volume. **Social gets a little give.** Gentle, fitting emoji are allowed where
they genuinely aid readability or earn attention — a platform-native courtesy, not a change
of character. The guardrails:

- A light touch only, and only where it fits. Never as hype, bait, or decoration.
- Never on the canonical site — this give is for the platforms, not the Reads.
- Same test as wit: a scalpel, not a sprinkle. If an emoji is doing the job a strong line
  should do, cut it and write the line.

It is a fine balance — adapt to the platform to be seen, without becoming the loud thing the
brand exists to correct.

---

## The Animated Read (format spec)

A short animated video version of a Read. **Type-led, with brief AI b-roll** — kinetic
typography carries the argument; a few short generated clips carry the concrete story
moments. The words stay the star.

### The two registers

- **Type register** (built in VEED) — the *Read* elements: the argument, the turns, the
  owned lines. Paper/ink/rust; Scenario (labels), Recoleta (headlines), Futura (body).
  Quiet, restrained motion. **All on-screen text lives here** — never baked by the AI tool.
- **Scene register** (generated in Kling) — the *story* bits: brief 3–6s clips for concrete
  moments (the wedding, the empty chair). Silent b-roll only. Seasoning, not the meal.

**Per-Read flex.** The type-to-scene ratio dials per piece. Scene-rich Reads (Narrative, the
sagging middle, the cold open) earn more Kling; abstract ones (distinctions, positioning)
run almost all type with a single symbolic clip. Every Read can have an Animated Read; the
blend is what changes.

### Structure

- Built on the locked three-arc spine: **Mirror** (symptom-first hook) → **Turn** (diagnosis
  + re-hook) → **Read** (the one idea, landed). Follows the six-beat script template
  ("skeleton, not stencil").
- Length ~45–60s. A 30s cut-down for the hook where useful.
- Primary aspect 9:16 (Reels / Shorts / TikTok); export a 1:1 or 16:9 variant for
  LinkedIn / YouTube.
- Default **silent / type-led** with restrained sound design. VO is optional and, if used,
  dry — never a hyped voiceover. (VO vs silent: open decision, see below.)

### Scene register — Kling discipline

Kling's default look is glossy and dreamy, which is loud. Prompt against it. This is the
brand's own *Fictional Realism* — real enough to believe, off enough to feel made.

- **Prompt for restraint:** muted colour, natural light, film grain, ordinary real people,
  no gloss, no dramatic slow-motion, documentary realism.
- **Stay faceless where possible** — hands, a chair, a room, backs of heads. Sidesteps
  Kling's weak character-consistency and keeps the identity quiet and faceless.
- **Keep clips brief** — ≤6s each; a whole Animated Read uses only a handful.
- **Image-to-video** where control matters (feed a still), text-to-video where a generic
  mood will do.
- **Silent only** — no AI-rendered captions or text; all type is added in VEED.

### Type register — VEED build

- On-screen text cut straight from the Read (fragments, not paragraphs).
- Palette paper `#f6f3ec` / ink `#1b1a17` / rust `#C0593B`; rust reserved for the single
  landing line.
- Restrained entrances; no bounce, no zoom-drama. The motion is calm on purpose.
- Captions burned in (sound-off viewing) — also done here, on-voice, resolution withheld.

### Production pipeline

1. Take a published Read.
2. Cut the beat sheet (Mirror / Turn / Read) — decide the type-to-scene ratio.
3. Generate the Kling clips against the discipline above.
4. Assemble in VEED: type animation + burned captions + sound (one quiet bed, room tone,
   no swells).
5. Export 9:16 primary (+ a second aspect if the platform needs it).
6. Write the caption + metadata (below) and schedule.

### Governance

- **The five format gates apply** (see `CONTENT-STRATEGY.md`): resolution withheld, symptom
  before thesis, no stated moral, one idea, volume check. A cut that fails any gate is the
  faceless-reel format in disguise — do not ship it under the AN name.
- **Metadata withholds the resolution.** The caption teases the tension and points to the
  full Read; it never states the lesson. Three locked tags: #TheRead #SayLessMeanMore
  #OneEighth.
- **Drift watch:** the volume vocabulary a generator reaches for — "stand out", "cut through
  the noise", "show your true self". Flag it in review.

### Worked example — The Narrative Read

Reference implementation. ~50s, vertical.

**1. Mirror — the hook (0:00–0:10)** · *Kling*
- Clip A (6s): "Handheld 1990s camcorder wedding first dance, warm but muted, natural indoor
  light, grain, ordinary real people, no gloss, documentary realism, vertical."
- Hard cut. Clip B (4s): "The same reception room, empty — an untouched chair at the top
  table, a half-drunk glass, cold daylight, still, muted, documentary realism, vertical."
- Type (end of beat): "Same footage. Two films."

**2. Turn — name it (0:10–0:24)** · *Type*
- "Story is what happened." → "Narrative is the shape you give it." → hold:
  "The Story is the footage. The Narrative is the edit." (rust on *edit*)

**3. Turn — the entry point (0:24–0:36)** · *Type + one Kling beat*
- Kling (4s): the vow moment intercut with the empty chair, muted.
- Type: "Start at the vows — a love story. / Start at the empty chair — a warning. / The
  events never moved. Only the entry point did."

**4. Read — the transfer (0:36–0:46)** · *Type*
- "Your competitors hold the same events." → "The narrative is the edit no one else is
  making."

**5. Read — land & withhold (0:46–0:52)** · *Type, rust*
- "Story v Narrative." hold → "You decide." → end card: orbital mark + "The Narrative Read —
  in full ↓".

**Caption:** "Two people, the same wedding video, two completely different films. That gap is
the whole game. Full Read below." + #TheRead #SayLessMeanMore #OneEighth.

### Open decisions (Animated Read)

- **VO vs silent.** Default is silent/type-led (quietest). Decide whether a dry VO is ever
  used, and if so, human or AI voice.
- **Aspect-ratio set.** 9:16 confirmed primary; confirm whether 1:1 and/or 16:9 variants are
  worth the extra export per piece.
- **Cadence.** How the Animated Read sits in the weekly rhythm relative to the Read's publish
  date and the text/tile posts.

---

## LinkedIn publishing

The warmest of the social channels and the one nearest a paying client — the reader here is
already business-minded, so LinkedIn leans on the *transfer* half of a Read: the Screen-craft
hook opens it, the business turn lands it.

**Where & voice (decided 2026-08-17).** Published from the **Aubrey North company page**
(page name: *Aubrey North*), in **AN voice, first person plural ("we")** — the advisory as a
small, composed team; dry and quiet, never corporate. (Landed on "we" over "I" in the live
page copy.) The quiet volume holds.

### Page copy — live (2026-08-17)

Tagline: *Narrative advisory — say less, mean more.*

Overview / About (as published — reproduced here as the record of truth):

> Most businesses aren't forgettable because they're bad. They're forgettable because no one
> decided what the story was.
>
> Aubrey North is a narrative advisory. We work upstream of branding and marketing — at the
> story layer, before the logo and the campaign — to help find and convey the story worth
> sharing.
>
> Say less. Mean more.
>
> The premise is simple: it's usually a clarity problem, not a marketing problem holding the
> business back. Spending more to amplify a message no one understands won't provide the fix.
> Deciding what the story actually is, does.
>
> The Read is our public side of that work — a growing library of short pieces on the power of
> story and how it can work for your business, one idea at a time: aubreynorth.com/reads
>
> If your company has the product but lacks the exposure or retention, that's the problem we
> can solve.
>
> Coffee + Chat = aubreynorth.com

Fields: website aubreynorth.com · custom URL /company/aubreynorthco · industry Business
Consulting and Services · specialties narrative strategy, positioning, brand storytelling,
messaging · hashtags #TheRead #SayLessMeanMore #OneEighth · button "Contact us" →
aubreynorth.com/#contact.

`TODO`: two typos to fix on the live page — "won't provide the fixe" → "fix"; "but lack the
exposure" → "lacks".

### The reach reality — and the levers that beat it

A brand-first choice with a real cost: LinkedIn throttles organic **company-page** reach to a
fraction of a personal profile's. So the strategy works *around* the feed penalty rather than
fighting it:

1. **LinkedIn Newsletter — the primary vehicle.** Run the weekly Read as a newsletter from
   the page. Subscribers are *notified* on every issue, which bypasses feed suppression and
   fits the long-form exactly. The single most important LinkedIn move given the company-page
   decision. (Newsletter name `TODO`: "The Read" vs a distinct title.)
2. **Reshare amplification.** Page posts reshared to personal networks (Demetri, and any
   team) — the standard, and largest, lever for company-page reach. A soft dependency on the
   company-page-only choice; worth deciding how far it goes.
3. **First-hour engagement.** Replies in the first hour read as signal; AN's dry voice
   extends into the comments.
4. **Paid boost** — only ever for a cornerstone post, never as a default.

### Vehicles

- **Newsletter (weekly)** — the long-form Read, adapted to LinkedIn rhythm. The spine.
- **Feed posts (page)** — the hook and lighter micro-posts (one pull-quote + one line),
  link to the canonical Read in the first comment.
- **Carousel / document** — later; shares art with the Instagram tiles.
- **Animated Read video** — later.

### Post anatomy (feed + newsletter intro)

- **Hook = the Read's Mirror line.** The opening scene already does the job — only the first
  ~2 lines show before "…see more", so the symptom-first, resolution-withheld opener is the
  whole game.
- **Native, no body links.** LinkedIn throttles outbound links in-body; the link goes in the
  **first comment**.
- **Whitespace and short lines** for mobile — shaped, not broetry.
- **Three branded tags** (#TheRead #SayLessMeanMore #OneEighth).
- **Lead with the transfer.** The business turn is what this reader is there for.

### The page as an asset

Reach lands on the page before the site, so the tagline, About and Featured section carry the
positioning and a clear path to a Read and to contact. Featured = pin the strongest Reads and
the newsletter.

### Cadence

One newsletter / long-form plus one or two micro-posts a week. The Read is the spine of the
week; 1/8th applied to posting — not everything, the lit fragments.

### Governance

The platform-loudness tension is the live risk: LinkedIn rewards broetry, engagement-bait
("Agree?"), emoji and humblebrags — all of which AN forbids. Restraint is the differentiator,
by contrast, and it compounds slower than bait; accept that. A hyped post to chase reach is a
self-consistency failure, not a growth hack. All five format gates and the drift-watch apply.

### Conversion path

Newsletter / post → company page → Read / site → contact. Every step on-voice; the link is
always to a canonical, indexable Read.

### Open decisions (LinkedIn)

- Newsletter name ("The Read" vs distinct) and start date.
- How far reshare amplification goes, given the company-page-only choice (does Demetri's
  personal profile reshare, even though it isn't the publishing home?).
- Whether a personal-profile presence is ever revisited if company-page reach stays flat.

---

## X publishing

The reach counterpart to LinkedIn. Where LinkedIn's reader is nearest the buyer (and leans on
the business turn), **X is text-native and carries the craft reach** — the writing,
screenwriting, film-craft and marketing communities that are exactly the **Screen /
Foundations** lane. The two channels specialise: same Read, X leads with the craft hook,
LinkedIn lands the business transfer.

**The structural advantage:** X does **not** throttle brand accounts the way LinkedIn buries
company pages. For a faceless brand, X may be the *better organic-reach home* — long-form here
isn't fighting the algorithm.

**Where & voice (decided 2026-08-17).** The Aubrey North X account, **@aubreynorthco**, in
**AN voice with a light first person** — consistent with LinkedIn.

### Long-form vehicle (decided 2026-08-21): the X Article

- **Primary: the X Article.** Publish the full Read as a native X Article — rich blog-style
  formatting, its own tab on the profile, and **links inside are not penalised**, so the
  canonical link back to the site Read belongs in the body. Opened to all Premium tiers as of
  Jan 2026; authored on desktop web.
- **Feed hook: a long post** pointing to the Article — the first ~280 chars are the preview,
  so the Mirror line is the hook.
- **Premium: required** (decided). X Articles and long posts both need X Premium — no longer
  optional; it is the cost of the X long-form plan.

### Vehicles

- **X Article (per Read)** — the native long-form home; canonical link in the body. The spine.
- **Long post (feed hook)** — points to the Article; Mirror line first.
- **Quote posts** — one pull-quote each, on off-days, driving to the Article / site.
- **Animated Read video** — later.

### Post anatomy

- **Hook = the Read's Mirror line** (the first 280 chars are all the timeline shows).
- **Canonical link at the end** — X is friendlier to in-post links than LinkedIn, but keep
  it clean; the link always points to the indexable Read.
- **Hashtags: sparingly.** X hashtags add little and can read as spam. Use at most one
  branded tag (#TheRead) here, unlike Instagram. (Open: drop to none.)
- **Reply early** — first-hour replies drive reach; AN's dry voice extends into them.

### Governance

X's culture pulls harder than any channel toward dunks, hot takes, ratio-chasing and
thread-bro formatting. Same line as everywhere: restraint is the differentiator, the five
gates apply, resolution withheld. A hot take for reach is a self-consistency failure.

### Conversion path

Long post / tweet → profile → Read / site → contact. Canonical link every time.

### Open decisions (X)

- **X Premium: yes/no** — the go/no-go for native long posts vs threads-only.
- Handle: **@aubreynorthco** (recorded 2026-08-17).
- Hashtag use on X — one (#TheRead) or none.
- Whether X or the LinkedIn page proves the stronger reach home, and how budget/effort splits
  once there's data.

---

## Publishing & social pipeline (decided 2026-08-21)

The site publish path is already built (drafting engine → portal editor → `ready` → Publish
click → `publish-read` edge function → GitHub → deploy; see `PORTAL-PUBLISH-SPEC.md` and
`PORTAL-EDITOR-SPEC.md`). Social sits on top of it, and is **generate-and-paste, not API** —
no per-post cost, full control, gate intact.

### Social generates on `ready`, from the final copy

Social versions are produced only when Demetri marks a Read **`ready`** in the portal — from
the edited, final copy, never from a raw draft. (The earlier plan to emit social at draft
time, and the full-API auto-posting plan, are both retired. The drafting engine stays
draft-only.)

### Format map (per Read)

- **Canonical:** the site Read — the SEO home, and the original the platform versions link to.
- **X:** a native **X Article** (rich, links allowed in body) + a **long post** feed hook
  pointing to it + quote posts. Needs X Premium.
- **LinkedIn:** a **Newsletter** entry (notifies subscribers, links not downranked) + a
  **feed post** hook + quote posts. Needs newsletter access on the page.
- **Micro-posts:** the pull-quotes, staggered across the week, driving to the long-form.

The link penalty only bites *feed posts*; the long-form homes (X Article, LinkedIn Newsletter)
both allow the canonical link in the body — so that is where it goes.

### Why no API

X Articles and LinkedIn Newsletters are built in rich editors — there is no clean API for
either, so they are manual by nature. That fits the decision: the portal generates the copy,
Demetri refines it, and pastes it into each composer. Zero API, zero per-post charge. The paid
X API / LinkedIn CMA is only worth revisiting later for the repetitive feed and micro-posts,
if the manual load ever justifies it.

### Where it shows: the portal Social panel

On `ready`, a **Social panel** appears on the Read in the portal (mirrors the editor):

- Sections: **X Article**, **X long post**, **LinkedIn Newsletter**, **LinkedIn post**,
  **micro-posts**.
- Each generated from the final copy, editable inline with the same accept/reject suggestion
  pattern, validated against `VOICE-RULES.md`.
- Each has a **Copy** button and a link to open the right platform composer, and a per-channel
  status (generated → copied → posted, set by Demetri). **No auto-posting.**

### Guardrails

- Nothing generates before `ready`; nothing posts itself. Demetri copies and posts by hand.
- Same voice gate as Reads (`VOICE-RULES.md`); resolution withheld in feed hooks and captions.
- Canonical stays the site; the platform versions are native republications that link back.

### Build status

- Done: format + posting model decided; drafting engine reverted to draft-only.
- Next (portal build): a `PORTAL-SOCIAL-SPEC.md` for the Social panel and the on-`ready`
  generation step (reusing the `suggest-fixes` function and the shared `VOICE-RULES.md`).

---

## Coming next (separate section)

- **Instagram** — quote tiles and carousels; the Reels / Animated Read placement.
