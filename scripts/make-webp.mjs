// One image → WebP 1x + @2x at a given display size (quality 78), following handoff board 21.
// Usage: node scripts/make-webp.mjs <sourceFile> <name> <width> <height> [cover|inside]
//   e.g. node scripts/make-webp.mjs assets-src/images/services-hero-source.jpg services-hero 1440 640
// Outputs public/images/<name>.webp and public/images/<name>@2x.webp (never enlarges the source).
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const [, , source, name, w, h, fit = "cover"] = process.argv;
if (!source || !name || !w || !h) {
  console.error("usage: node scripts/make-webp.mjs <sourceFile> <name> <width> <height> [cover|inside]");
  process.exit(1);
}
const outDir = fileURLToPath(new URL("../public/images/", import.meta.url));
const meta = await sharp(source).metadata();
for (const [suffix, scale] of [["", 1], ["@2x", 2]]) {
  const out = join(outDir, `${name}${suffix}.webp`);
  await sharp(source)
    .resize({ width: Number(w) * scale, height: Number(h) * scale, fit, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  console.log(`${name}${suffix}.webp ← ${meta.width}×${meta.height}`);
}
