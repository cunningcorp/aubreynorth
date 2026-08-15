// Generate the default Open Graph card as a 1200×630 PNG.
//
// Social scrapers (X, Facebook, LinkedIn, iMessage, Slack) do not reliably
// render SVG preview cards, so og:image must be a raster PNG.
//
// The wordmark and endorsement label are OUTLINED to vector paths from the
// real Scenario face, so the SVG we hand to sharp contains no <text> — nothing
// depends on a system font being installed at raster time. Deterministic.
//
// Regenerate with:  node scripts/make-og.mjs
//
// Requires opentype.js (installed transiently — not a project dependency) and
// sharp (already present in the toolchain).
import opentype from 'opentype.js';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontBuf = readFileSync(join(root, 'public/fonts/Scenario-700.ttf'));
const font = opentype.parse(
  fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength)
);

// Locked palette.
const PAPER = '#f6f3ec';
const INK = '#1b1a17';
const RUST = '#C0593B';

const W = 1200;
const H = 630;

// Centered single run → outlined path + its measured width, for centring.
function centeredPath(text, size, y, fill) {
  const width = font.getAdvanceWidth(text, size);
  const x = (W - width) / 2;
  const d = font.getPath(text, x, y, size).toPathData(2);
  return `<path d="${d}" fill="${fill}"/>`;
}

// Centered run with letter-spacing (label treatment) → glyphs placed by hand.
function centeredTrackedPath(text, size, y, fill, tracking) {
  const chars = [...text];
  const advances = chars.map((c) => font.getAdvanceWidth(c, size));
  const total =
    advances.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
  let x = (W - total) / 2;
  let d = '';
  chars.forEach((c, i) => {
    d += font.getPath(c, x, y, size).toPathData(2) + ' ';
    x += advances[i] + tracking;
  });
  return `<path d="${d.trim()}" fill="${fill}"/>`;
}

// Orbital mark: outer ring, filled core, single satellite. Pure geometry.
const cx = W / 2;
const cy = 218;
const mark = `
  <circle cx="${cx}" cy="${cy}" r="95" fill="none" stroke="${RUST}" stroke-width="4"/>
  <circle cx="${cx}" cy="${cy}" r="26" fill="${RUST}"/>
  <circle cx="${cx}" cy="${cy - 95}" r="12" fill="${RUST}"/>
`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${mark}
  ${centeredPath('AUBREY NORTH', 92, 445, INK)}
  ${centeredTrackedPath('A CUNNING CORP COMPANY', 22, 510, RUST, 7)}
</svg>`;

const out = join(root, 'public/og-default.png');
await sharp(Buffer.from(svg)).png().toFile(out);

const meta = await sharp(out).metadata();
console.log(`wrote ${out} — ${meta.width}×${meta.height} ${meta.format}`);
