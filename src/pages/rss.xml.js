import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET(context) {
  const reads = (await getCollection('reads', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Aubrey North — Reads',
    description:
      'Short pieces on narrative, restraint and the story a business is actually telling.',
    site: context.site ?? SITE.url,
    items: reads.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `/reads/${entry.id}/`,
      categories: entry.data.tags ?? [],
    })),
    customData: '<language>en-gb</language>',
  });
}
