import Image from "next/image";
import { Link } from "next-view-transitions";
import { small } from "../WorkRow";

export type Game = { id: string; name: string; line: string; href: string; image?: string };

/** The games, as three small cards that lift when you point at them. */
export function Play({ games }: { games: Game[] }) {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:gap-4">
      {games.map((g) => (
        <li key={g.id}>
          <Link href={g.href} className="group block">
            <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[16/10] bg-card ring-1 ring-inset ring-fg/[0.08] transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-18px_rgb(var(--fg)/0.5)] group-focus-visible:-translate-y-1">
              {g.image && (
                <Image
                  src={small(g.image)!}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 30vw, 200px"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              )}
            </span>
            <span className="mt-3 block text-[14px] font-semibold leading-snug md:text-[17px] transition-colors group-hover:text-accent">
              {g.name}
            </span>
            <span className="mt-0.5 hidden text-[13px] leading-snug text-muted sm:block md:text-[15px]">
              {g.line}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
