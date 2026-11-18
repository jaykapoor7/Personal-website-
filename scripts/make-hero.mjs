// Bakes the hero photo as a cyanotype: shadows in deep cobalt, highlights in
// the hero's paper colour, so the sky dissolves into the page around it. Also
// bakes a cut-out of me (scripts/hero-mask.png, from hero-mask.py), laid over
// the photo so the name can pass behind me.
// Run with `node scripts/make-hero.mjs` after changing the source photo.
import sharp from "sharp";

const src = "public/photos/pitt_portrait-1280.webp";
const paper = [243, 246, 253]; // keep in step with --paper-hero in globals.css
// Luminance → colour, from shadow to highlight.
const stops = [
  [0, 18, 40, 120],
  [0.5, 46, 88, 205],
  [0.82, 188, 205, 245],
  [0.93, ...paper],
  [1, ...paper],
];

const { data, info } = await sharp(src)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 3) {
  let l = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  l = Math.min(1, Math.max(0, (l - 0.5) * 1.35 + 0.53));
  let j = 0;
  while (j < stops.length - 2 && l > stops[j + 1][0]) j++;
  const [t0, ...c0] = stops[j];
  const [t1, ...c1] = stops[j + 1];
  const f = Math.min(1, Math.max(0, (l - t0) / (t1 - t0)));
  for (let c = 0; c < 3; c++) out[i + c] = Math.round(c0[c] + (c1[c] - c0[c]) * f);
}
for (const [w, name] of [
  [960, "jay-cyan"],
  [640, "jay-cyan-640"],
]) {
  await sharp(out, { raw: info })
    .resize({ width: w })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 70 })
    .toFile(`public/photos/${name}.webp`);
  console.log(name);
}

// The cut-out: the same print, with the mask as its alpha. Pixels outside me
// are flattened to one colour so they cost almost nothing to store.
const mask = await sharp("scripts/hero-mask.png")
  .resize(info.width, info.height)
  .greyscale()
  .raw()
  .toBuffer();
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let p = 0; p < info.width * info.height; p++) {
  const a = mask[p];
  for (let c = 0; c < 3; c++) rgba[p * 4 + c] = a ? out[p * 3 + c] : paper[c];
  rgba[p * 4 + 3] = a;
}
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .sharpen({ sigma: 0.6 })
  .webp({ quality: 72, alphaQuality: 90 })
  .toFile("public/photos/jay-cut.webp");
console.log("jay-cut");
