// Bakes the hero photo, in its own colours, and a cut-out of me
// (scripts/hero-mask.png, from hero-mask.py) that is laid over it so the name
// can pass behind me. Run with `node scripts/make-hero.mjs` after changing
// the source photo or the mask.
import sharp from "sharp";

const src = "public/photos/pitt_portrait-1280.webp";
const paper = [243, 246, 253]; // the hero's paper, --hero in globals.css

const { data, info } = await sharp(src)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (const [w, name] of [
  [960, "jay-photo"],
  [640, "jay-photo-640"],
]) {
  await sharp(data, { raw: info })
    .resize({ width: w })
    .sharpen({ sigma: 0.5 })
    .webp({ quality: 78 })
    .toFile(`public/photos/${name}.webp`);
  console.log(name);
}

// The cut-out: the same photo, with the mask as its alpha. Pixels outside me
// are flattened to one colour so they cost almost nothing to store.
const mask = await sharp("scripts/hero-mask.png")
  .resize(info.width, info.height)
  .greyscale()
  .raw()
  .toBuffer();
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let p = 0; p < info.width * info.height; p++) {
  const a = mask[p];
  for (let c = 0; c < 3; c++) rgba[p * 4 + c] = a ? data[p * 3 + c] : paper[c];
  rgba[p * 4 + 3] = a;
}
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .sharpen({ sigma: 0.5 })
  .webp({ quality: 80, alphaQuality: 90 })
  .toFile("public/photos/jay-photo-cut.webp");
console.log("jay-photo-cut");
