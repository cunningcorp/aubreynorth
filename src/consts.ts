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
  type: { label: 'Type', slug: 'type' },
  business: { label: 'Business', slug: 'business' },
} as const;

export type LaneKey = keyof typeof LANES;
