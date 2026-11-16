// Small copies of every screenshot and document cover, for the lists on the
// home page and the work index, so a list never downloads a full-size image.
// Run with `node scripts/make-thumbs.mjs` after adding a preview or a cover.
import { mkdirSync, readdirSync } from "node:fs";
import sharp from "sharp";

mkdirSync("public/thumbs", { recursive: true });
for (const dir of ["previews", "covers"]) {
  for (const f of readdirSync(`public/${dir}`)) {
    if (!/\.(webp|png|jpg)$/.test(f) || /scroll/.test(f)) continue;
    await sharp(`public/${dir}/${f}`)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(`public/thumbs/${f.replace(/\.(png|jpg)$/, ".webp")}`);
  }
}
console.log(readdirSync("public/thumbs").length, "thumbnails");
