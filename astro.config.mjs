// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Static, SEO-first build deployed to GitHub Pages on the apex domain.
// See CLAUDE.md — the point of this site is server-rendered, indexable Reads.
export default defineConfig({
  site: 'https://aubreynorth.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      // Drafts are excluded at the content-collection level, so every page
      // that reaches the build is a page we want indexed.
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: {
    format: 'directory',
  },
});
