// Debug: count pixels by hue and report dominant magenta-ish color in a PNG.
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';

const path = process.argv[2];
const png = PNG.sync.read(readFileSync(path));
const { width: W, height: H, data } = png;

// Bucket pixels where R is high and G is low and B is high — i.e. anything
// that reads as "pinkish/magenta"
const buckets = new Map();
let max = { count: 0, key: null };
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 180 && b > 180 && g < r - 40 && g < b - 40) {
      // round to nearest 10 to group similar shades
      const key = `${Math.round(r / 10) * 10},${Math.round(g / 10) * 10},${Math.round(b / 10) * 10}`;
      const n = (buckets.get(key) || 0) + 1;
      buckets.set(key, n);
      if (n > max.count) max = { count: n, key };
    }
  }
}

console.log(`${path}  (${W}×${H})`);
console.log(`Top 8 magenta-ish color buckets (rounded to nearest 10):`);
const sorted = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
for (const [key, count] of sorted) {
  const pct = ((count / (W * H)) * 100).toFixed(2);
  console.log(`  rgb(${key})  ${count} px  (${pct}%)`);
}
