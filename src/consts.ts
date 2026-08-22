// Site-wide constants. Brand facts here come from copylock / the handbook —
// do not invent new ones (see CLAUDE.md, copy governance).

export const SITE = {
  name: 'Aubrey North',
  // Reused verbatim from the live design source <title>/<meta description>.
  title: 'Aubrey North — Narrative Advisory',
  description:
    'Aubrey North — a narrative advisory. We help businesses define the story people actually understand.',
  url: 'https://aubreynorth.com',
  // Endorsement line from copylock (Aubrey North division).
  parent: 'A Cunning Corp company.',
} as const;

// The three Read lanes. Keys match the content-collection enum.
export const LANES = {
  screen: { label: 'Screen', slug: 'screen' },
  // Public label "Archetype" and public URL slug "archetype". The lane KEY stays
  // 'type' — so the content-collection enum, every Read's `lane: type` frontmatter,
  // the Supabase reads_queue value, and the portal are all UNCHANGED. Only the two
  // public-facing surfaces (label + URL) differ from the internal key.
  // Old URL /reads/type/ is redirected to /reads/archetype/ in astro.config.mjs.
  type: { label: 'Archetype', slug: 'archetype' },
  business: { label: 'Business', slug: 'business' },
} as const;

export type LaneKey = keyof typeof LANES;
