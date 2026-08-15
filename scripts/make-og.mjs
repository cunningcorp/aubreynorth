// Generate the brand raster images, deterministically.
//
//   public/og-default.png  1200×630  — the Open Graph / Twitter card. Social
//                                       scrapers do not reliably render SVG.
//   public/logo.png        1024×1024 — square logo for JSON-LD Organization /
//                                       publisher (clears Google's 512px min).
//
// The wordmark and label are OUTLINED to vector paths from the real Scenario
// face, so the SVG handed to sharp contains no <text> — nothing depends on a
// system font being installed at raster time.
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

// Font size that makes `text` exactly `targetWidth` wide.
const fitSize = (text, targetWidth) =>
  (100 * targetWidth) / font.getAdvanceWidth(text, 100);

// Centered single run → outlined path, centred in a `canvasW`-wide canvas.
function centeredPath(text, size, y, fill, canvasW) {
  const width = font.getAdvanceWidth(text, size);
  const d = font.getPath(text, (canvasW - width) / 2, y, size).toPathData(2);
  return `<path d="${d}" fill="${fill}"/>`;
}

// Centered run with letter-spacing (label treatment) → glyphs placed by hand.
function centeredTrackedPath(text, size, y, fill, tracking, canvasW) {
  const chars = [...text];
  const advances = chars.map((c) => font.getAdvanceWidth(c, size));
  const total =
    advances.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
  let x = (canvasW - total) / 2;
  let d = '';
  chars.forEach((c, i) => {
    d += font.getPath(c, x, y, size).toPathData(2) + ' ';
    x += advances[i] + tracking;
  });
  return `<path d="${d.trim()}" fill="${fill}"/>`;
}

// Orbital mark: outer ring, filled core, single satellite. Pure geometry.
const orbitalMark = (cx, cy, r, core, sat, stroke) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${RUST}" stroke-width="${stroke}"/>
  <circle cx="${cx}" cy="${cy}" r="${core}" fill="${RUST}"/>
  <circle cx="${cx}" cy="${cy - r}" r="${sat}" fill="${RUST}"/>
`;

async function render(svg, out) {
  await sharp(Buffer.from(svg)).png().toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`wrote ${out} — ${meta.width}×${meta.height} ${meta.format}`);
}

// --- OG card: 1200×630 -------------------------------------------------------
const ogW = 1200;
const ogH = 630;
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ogW}" height="${ogH}" viewBox="0 0 ${ogW} ${ogH}">
  <rect width="${ogW}" height="${ogH}" fill="${PAPER}"/>
  ${orbitalMark(ogW / 2, 218, 95, 26, 12, 4)}
  ${centeredPath('AUBREY NORTH', 92, 445, INK, ogW)}
  ${centeredTrackedPath('A CUNNING CORP COMPANY', 22, 510, RUST, 7, ogW)}
</svg>`;
await render(ogSvg, join(root, 'public/og-default.png'));

// --- Square logo: 1024×1024 --------------------------------------------------
const lg = 1024;
const wordSize = fitSize('AUBREY NORTH', 840); // fit to width with margins
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${lg}" height="${lg}" viewBox="0 0 ${lg} ${lg}">
  <rect width="${lg}" height="${lg}" fill="${PAPER}"/>
  ${orbitalMark(lg / 2, 388, 150, 42, 19, 6)}
  ${centeredPath('AUBREY NORTH', wordSize, 748, INK, lg)}
</svg>`;
await render(logoSvg, join(root, 'public/logo.png'));
