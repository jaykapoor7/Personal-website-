// Bakes the blue two-tone version of each photo in the strip, so the page shows
// a plain image instead of blending and filtering one live while you scroll.
// Matches the old CSS look: grey, brightness 0.9, contrast 1.25, screened over
// the accent blue. Run with `node scripts/make-duo.mjs` after adding a photo.
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const accent = [35, 70, 168].map((c) => c / 255);
const photos = [
  "photos/02_childhood_running-1280.webp",
  "photos/04_childhood_football_team-1280.webp",
  "photos/01_trojans_team-1280.webp",
  "photos/07_school_ceremony-1280.webp",
  "work/crowwd/arthavaad-stage-1280.webp",
  "work/crowwd/arthavaad-audience-800.webp",
  "straypaw/street-dog.webp",
  "photos/pitt_portrait-1280.webp",
];

mkdirSync("public/photos/duo", { recursive: true });
for (const src of photos) {
  const { data, info } = await sharp(`public/${src}`)
    .resize({ width: 900, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    const lum =
      (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    const g = Math.min(1, Math.max(0, (lum * 0.9 - 0.5) * 1.25 + 0.5));
    for (let c = 0; c < 3; c++)
      out[i + c] = Math.round((1 - (1 - accent[c]) * (1 - g)) * 255);
  }
  const name = src.split("/").pop().replace(/-\d+\.webp$|\.webp$/, "");
  await sharp(out, { raw: info })
    .webp({ quality: 74 })
    .toFile(`public/photos/duo/${name}.webp`);
  console.log(name);
}
