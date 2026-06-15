import type { GalleryImage } from "@/content/types";

// Case-study image gallery. Follows the site's existing image convention
// (plain <img>, grayscale, border-line/rounded-sm — same as components/Portrait)
// since the static export runs with unoptimized images and no next/image.
// The first image renders as a full-width hero; any others sit in a grid below.
export function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;
  const [hero, ...rest] = images;

  // Grayscale by default to match the B&W theme; opt into color per image.
  const imgClass = (img: GalleryImage) =>
    `w-full rounded-sm border border-line object-cover${
      img.color ? "" : " grayscale"
    }`;

  return (
    <div className="space-y-6">
      <figure className="space-y-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.src} alt={hero.alt} className={imgClass(hero)} />
        {hero.caption && (
          <figcaption className="text-sm text-muted">{hero.caption}</figcaption>
        )}
      </figure>

      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((img) => (
            <figure key={img.src} className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className={imgClass(img)} />
              {img.caption && (
                <figcaption className="text-sm text-muted">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
