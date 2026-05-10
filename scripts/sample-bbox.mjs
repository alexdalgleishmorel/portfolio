// Reads a PNG, finds the bounding rect of magenta-ish (#FF00FF-ish) pixels
// (R≥200, G≤30, B≥200), and prints it as percentages of the image dimensions.
//
// Adds a 0.4% overshoot per side so the dark screen-bezel covers any
// subpixel rounding gaps when the React overlay sits on top.
//
// Usage: node scripts/sample-bbox.mjs public/scene-wide.png

import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

const OVERSHOOT_PCT = 0.4;

const path = process.argv[2];
if (!path) {
  console.error('Usage: node scripts/sample-bbox.mjs <png-file>');
  process.exit(1);
}

const png = PNG.sync.read(readFileSync(path));
const { width: W, height: H, data } = png;

let minX = W, minY = H, maxX = -1, maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r >= 200 && g <= 30 && b >= 200) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

if (maxX < 0) {
  console.error(`No magenta-ish pixels found in ${path}`);
  process.exit(2);
}

const pct = (n) => Math.round(n * 100) / 100;
const rawLeft = (minX / W) * 100;
const rawTop = (minY / H) * 100;
const rawRight = ((maxX + 1) / W) * 100;
const rawBottom = ((maxY + 1) / H) * 100;

const left = pct(Math.max(0, rawLeft - OVERSHOOT_PCT));
const top = pct(Math.max(0, rawTop - OVERSHOOT_PCT));
const right = pct(Math.min(100, rawRight + OVERSHOOT_PCT));
const bottom = pct(Math.min(100, rawBottom + OVERSHOOT_PCT));
const w = pct(right - left);
const h = pct(bottom - top);

console.log(`${path}  (${W}×${H}, AR ${(W / H).toFixed(3)})`);
console.log(`  raw px:    x[${minX}..${maxX}]  y[${minY}..${maxY}]`);
console.log(`  raw %:     L${pct(rawLeft)} T${pct(rawTop)} R${pct(rawRight)} B${pct(rawBottom)}`);
console.log(`  bbox (with ${OVERSHOOT_PCT}% overshoot):`);
console.log(`    { left: ${left}, top: ${top}, width: ${w}, height: ${h} }`);
