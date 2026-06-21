import type { GalleryImage } from "@/content/types";

// Case-study image gallery. Follows the site's existing image convention
// (plain <img>, grayscale, border-line/rounded-sm — same as components/Portrait)
// since the static export runs with unoptimized images and no next/image.
//
// Layout:
//  - 1 image  → full-width (keeps wide screenshots / montages legible)
//  - 2+ images → even 2-up grid with a uniform aspect ratio, so mixed-size
//    phone photos line up cleanly instead of one giant hero + a half-width one.
export function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  const tone = (img: GalleryImage) => (img.color ? "" : " grayscale");

  if (images.length === 1) {
    const img = images[0];
    return (
      <figure className="space-y-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          className={`w-full rounded-sm border border-line object-cover${tone(img)}`}
        />
        {img.caption && (
          <figcaption className="text-sm text-muted">{img.caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {images.map((img) => (
        <figure key={img.src} className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className={`aspect-[4/5] w-full rounded-sm border border-line object-cover object-center${tone(img)}`}
          />
          {img.caption && (
            <figcaption className="text-sm text-muted">{img.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
