// Converts the Figma/Unsplash source photos in assets-src/images/*-source.{jpg,png}
// into public/images/*.webp at the sizes the handoff specifies (board 21): 1x + @2x, quality 78.
// Run: node scripts/optimize-images.mjs [--skip-existing]
import sharp from "sharp";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const srcDir = fileURLToPath(new URL("../assets-src/images/", import.meta.url));
const dir = fileURLToPath(new URL("../public/images/", import.meta.url));

// name → { w, h, fit }  (1x size; @2x is doubled). fit "cover" crops, "inside" keeps the whole image.
const SPEC = {
  "hero-highvoltage-dusk": { w: 1440, h: 824, fit: "cover" },
  "about-line-crew": { w: 560, h: 640, fit: "cover" },
  svc1: { w: 282, h: 176, fit: "cover" },
  svc2: { w: 282, h: 176, fit: "cover" },
  svc3: { w: 282, h: 176, fit: "cover" },
  svc4: { w: 282, h: 176, fit: "cover" },
  proj1: { w: 384, h: 256, fit: "cover" },
  proj2: { w: 384, h: 256, fit: "cover" },
  proj3: { w: 384, h: 256, fit: "cover" },
  news1: { w: 384, h: 240, fit: "cover" },
  news2: { w: 384, h: 240, fit: "cover" },
  news3: { w: 384, h: 240, fit: "cover" },
  "ceo-mutlaq-alotaibi": { w: 440, h: 520, fit: "cover" },
  "vision-engineering": { w: 340, h: 420, fit: "cover" },
  "vision-energy-generation": { w: 340, h: 420, fit: "cover" },
  "vision-construction": { w: 340, h: 420, fit: "cover" },
  "riyadh-night": { w: 1440, h: 834, fit: "cover" },
  "logo-stacked": { w: 170, h: 120, fit: "inside" },
  "partner-saudi-energy": { w: 51, h: 44, fit: "inside" },
  "partner-spark": { w: 72, h: 40, fit: "inside" },
  // inner pages
  "services-hero": { w: 1440, h: 640, fit: "cover" },
  "about-control-room": { w: 1440, h: 640, fit: "cover" },
  "desert-haze-lines": { w: 1440, h: 640, fit: "cover" },
  "energy-aerial-solar": { w: 1440, h: 640, fit: "cover" },
  "team-blueprints": { w: 1440, h: 640, fit: "cover" },
  "chairman-tawfik-alsharhan": { w: 440, h: 520, fit: "cover" },
  "vp-faleh-alsharhan": { w: 440, h: 520, fit: "cover" },
};

const files = readdirSync(srcDir).filter((f) => /-source\.(jpe?g|png|webp)$/i.test(f));
for (const file of files) {
  const name = file.replace(/-source\.\w+$/, "");
  const spec = SPEC[name];
  if (!spec) {
    console.warn(`skip ${file}: no spec (use scripts/make-webp.mjs for one-off sizes)`);
    continue;
  }
  const input = join(srcDir, file);
  const meta = await sharp(input).metadata();
  for (const [suffix, scale] of [["", 1], ["@2x", 2]]) {
    const out = join(dir, `${name}${suffix}.webp`);
    if (existsSync(out) && process.argv.includes("--skip-existing")) continue;
    await sharp(input)
      .resize({ width: spec.w * scale, height: spec.h * scale, fit: spec.fit, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    console.log(`${name}${suffix}.webp ← ${meta.width}×${meta.height}`);
  }
}
