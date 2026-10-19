// One-off: compose the Figma mark + wordmark SVG exports into single horizontal lockups.
import { readFileSync, writeFileSync } from "node:fs";
const [,, markPath, wordPath, outPath] = process.argv;
const inner = (p) => readFileSync(p, "utf8").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const vb = (p) => readFileSync(p, "utf8").match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
const [,, mw, mh] = vb(markPath); const [,, ww, wh] = vb(wordPath);
// Nav lockup in Figma: 234 × 36 — mark at 0–26.77 %, wordmark from 29.11 % to 100 %.
const H = 36; const markW = (mw / mh) * H; const wordW = (ww / wh) * H; const gap = 234 * (0.2911 - 0.2677);
const W = markW + gap + wordW;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(2)} ${H}" width="${W.toFixed(2)}" height="${H}" fill="none">
<svg x="0" y="0" width="${markW.toFixed(2)}" height="${H}" viewBox="0 0 ${mw} ${mh}">${inner(markPath)}</svg>
<svg x="${(markW + gap).toFixed(2)}" y="0" width="${wordW.toFixed(2)}" height="${H}" viewBox="0 0 ${ww} ${wh}">${inner(wordPath)}</svg>
</svg>`;
writeFileSync(outPath, svg);
console.log(outPath, W.toFixed(2), "x", H);
