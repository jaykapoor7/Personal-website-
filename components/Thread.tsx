import { Link } from "next-view-transitions";

type Item = { name: string; href: string };

/** The same three threads run through everything; each item links to its page. */
const threads: { label: string; items: Item[] }[] = [
  {
    label: "Health and access",
    items: [
      { name: "Juno-AI", href: "/work/juno-ai" },
      { name: "Project Nidaan", href: "/work/project-nidaan" },
      { name: "Max Hospital", href: "/work/max-hospital" },
      { name: "the Apodaca Lab", href: "/work/apodaca-lab" },
      {
        name: "UPMC Emergency Medicine",
        href: "/work/upmc-emergency-medicine",
      },
      {
        name: "the Accessible SmartTech Lab",
        href: "/work/accessible-smarttech",
      },
      { name: "StrayPaw", href: "/work/straypaw" },
    ],
  },
  {
    label: "Records and data",
    items: [
      { name: "Juno-AI's paper", href: "/work/juno-ai" },
      { name: "Nidaan's rider interviews", href: "/work/project-nidaan" },
      { name: "trauma records at UPMC", href: "/work/upmc-emergency-medicine" },
      { name: "survey work in Pitt Sociology", href: "/work/pitt-sociology" },
      { name: "the forecast ledger", href: "/ledger" },
      { name: "the small tools", href: "/projects" },
      { name: "StrayPaw", href: "/work/straypaw" },
    ],
  },
  {
    label: "Money and operations",
    items: [
      { name: "The Finer Things Club", href: "/work/finer-things-club" },
      { name: "HDFC Bank", href: "/work/hdfc-bank" },
      { name: "Crowwd", href: "/work/crowwd" },
      { name: "TOT Schools", href: "/work/tot-schools" },
      { name: "TARC", href: "/work/tarc" },
      { name: "the investment memos", href: "/research" },
      { name: "StrayPaw", href: "/work/straypaw" },
    ],
  },
];

function List({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((it, i) => (
        <span key={it.name}>
          {i > 0 && (i === items.length - 1 ? " and " : ", ")}
          <Link
            href={it.href}
            className="underline decoration-1 underline-offset-4 hover:text-accent"
          >
            {it.name}
          </Link>
        </span>
      ))}
      .
    </>
  );
}

/** Why so many different things: the loop, the threads, and where they meet. */
export function Thread() {
  return (
    <div className="space-y-5 text-[17.5px] leading-[1.75]">
      <p>
        From the outside it looks scattered: a health app at 14, an artisan
        marketplace, a bladder-cell lab, a bank, eight preschools, a housing
        site, a record of street dogs, and some comedy games.
      </p>
      <p>
        From the inside it is one loop, run in different places. I notice
        someone falling through a gap. I go inside the system that gap sits in,
        whether that is a hospital, a lab, a bank or a chain of preschools. I
        build the thing that closes it. Then I write it down and measure it.
        Economics and Statistics is the same loop as a degree: how systems
        behave, and how to measure them.
      </p>
      <p>Three threads keep coming back.</p>
      {threads.map((t) => (
        <p key={t.label}>
          <span className="font-semibold">{t.label}:</span>{" "}
          <List items={t.items} />
        </p>
      ))}
      <p>
        StrayPaw is the one place all three meet. It started with something I
        noticed outside a cafe. It is a public-health problem, since
        sterilisation and vaccination decide how cities live with street dogs.
        It is a records problem, since nobody kept one. And it only works
        through operations: 19 NGO partners and a pilot with a municipality.
      </p>
    </div>
  );
}
