import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One collection. Adding a .md file to src/content/reads/ is the whole
// process of publishing a Read (see CLAUDE.md — content model).
const reads = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reads' }),
  schema: z.object({
    title: z.string(),
    // 140–160 chars: used for <meta description> + Open Graph.
    description: z.string(),
    lane: z.enum(['screen', 'type', 'business']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { reads };
