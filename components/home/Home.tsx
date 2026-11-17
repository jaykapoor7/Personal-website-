import { Link } from "next-view-transitions";
import { selected } from "@/content/cases";
import { education, leadership } from "@/content/site";
import { experience, items } from "@/content/work";
import { SheetBackdrop } from "../Backdrop";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { List, type Entry } from "./List";
import { Photos } from "./Photos";
import { Play } from "./Play";
import { Section } from "./Section";
import { Tiles } from "./Tiles";

const of = (group: string) => items.filter((i) => i.group === group);
const writing = of("Writing");
const games = of("Play");
const tools = of("Projects");
const labs = of("Research").filter((i) => i.id !== "straypaw-research-models");

/** What each lab works on, in a few words. */
const topic: Record<string, string> = {
  smarttech: "Accessible smart technology",
  "3sixty": "How nonprofits adopt AI",
  upmc: "Prehospital and emergency care",
  apodaca: "How bladder cells sense stretch",
  sociology: "Survey research in R and Stata",
  max: "Emergency and internal medicine",
  "kisan-rail": "Economics, with Prof. Yasir Khan",
};

const school: Entry[] = [
  {
    id: "pitt",
    name: education[0].school,
    detail: "B.S. Economics and Statistics, minor in Information Sciences",
    years: "2028",
  },
  {
    id: "tisb",
    name: education[1].school,
    detail:
      "IB Diploma. Founded the entrepreneurship club and ran a 4,000-guest event.",
    years: "2021–2023",
  },
  ...leadership
    .filter((l) => !/Bangalore/.test(l.org))
    .map((l) => ({
      id: l.title,
      name: l.org,
      detail: `${l.title}. ${l.detail}`,
      years: /\d{4}/.test(l.period) ? l.period : "",
    })),
];

/** Splits a list into two columns for wide screens, first column longer. */
const halves = <T,>(list: T[]) => {
  const cut = Math.ceil(list.length / 2);
  return [list.slice(0, cut), list.slice(cut)] as const;
};

const labEntries: Entry[] = labs.map((l) => ({
  id: l.id,
  name: l.name,
  detail: `${l.meta} · ${topic[l.id] ?? l.line}`,
  years: l.years,
  href: l.href || undefined,
  external: l.external,
}));

const writingEntries: Entry[] = [
  items.find((i) => i.id === "straypaw-research-models")!,
  ...writing,
].map((w) => ({
  id: w.id,
  name: w.name,
  detail: w.meta,
  years: w.years,
  href: w.href,
  external: w.external,
  pic: w.image
    ? {
        src: w.image,
        shape: "tall",
      }
    : undefined,
}));

/**
 * The home page: the old hero, then one sheet that slides up over it with a
 * short CV after cali.so. Who I am beside the ways in, then six numbered
 * sections, each a short list laid out across the page.
 */
export function Home() {
  const [labsA, labsB] = halves(labEntries);
  const [writeA, writeB] = halves(writingEntries);
  return (
    <div className="relative">
      <Hero />
      <div className="landing-sheet relative z-10 bg-bg">
        <SheetBackdrop />
        <div className="relative">
          <Intro
            aside={
              <Tiles
                tiles={[
                  {
                    label: "Work",
                    count: `${items.length} entries`,
                    href: "/work/",
                    pics: [
                      "/previews/juno-light-d.webp",
                      "/previews/research-models-d.webp",
                      "/previews/straypaw-map-d.webp",
                    ],
                  },
                  {
                    label: "Writing",
                    count: `${writing.length + 1} pieces`,
                    href: "/#writing",
                    tall: true,
                    pics: writing
                      .slice(0, 3)
                      .map((w) => w.image!)
                      .reverse(),
                  },
                  {
                    label: "Photos",
                    count: "8 photos",
                    href: "/#photos",
                    tall: true,
                    pics: [
                      "/photos/01_trojans_team-640.webp",
                      "/photos/07_school_ceremony-640.webp",
                      "/photos/pitt_portrait-640.webp",
                    ],
                  },
                  {
                    label: "Play",
                    count: `${games.length} games`,
                    href: "/#play",
                    pics: games.map((g) => g.image!).reverse(),
                  },
                ]}
              />
            }
          />

          <Section
            id="work"
            n="01"
            title="Selected work"
            action={{ label: `All work (${items.length})`, href: "/work/" }}
          >
            <List
              big
              entries={selected.map((c, i) => ({
                id: c.slug,
                num: String(i + 1).padStart(2, "0"),
                name: c.name,
                detail: c.short ?? c.line,
                years: c.years,
                href: `/work/${c.slug}/`,
                pic: c.image ? { src: c.image, shape: "wide" } : undefined,
                vt: c.slug,
              }))}
            />
            <p className="mt-4 text-[15px] text-muted">
              Also built{" "}
              {tools.map((t, i) => (
                <span key={t.id}>
                  <Link href={t.href} className="link font-semibold text-fg">
                    {t.name}
                  </Link>
                  {i < tools.length - 2
                    ? ", "
                    : i === tools.length - 2
                      ? " and "
                      : "."}
                </span>
              ))}
            </p>
          </Section>

          <Section id="experience" n="02" title="Experience">
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-2">
              <div>
                <h3 className="label mb-1">Work</h3>
                <List
                  entries={experience.map((e) => ({
                    id: e.id,
                    name: e.name,
                    detail: e.role,
                    years: e.years,
                    href: e.href,
                  }))}
                />
              </div>
              <div>
                <h3 className="label mb-1">Education and leadership</h3>
                <List entries={school} />
              </div>
            </div>
          </Section>

          <Section id="research" n="03" title="Research">
            <div className="grid gap-x-16 lg:grid-cols-2">
              <List entries={labsA} />
              <List entries={labsB} />
            </div>
          </Section>

          <Section id="writing" n="04" title="Writing">
            <div className="grid gap-x-16 lg:grid-cols-2">
              <List entries={writeA} />
              <List entries={writeB} />
            </div>
          </Section>

          <Section id="photos" n="05" title="Photos">
            <p className="mb-6 max-w-[640px] text-[16px] leading-relaxed text-muted">
              Sports days and football in Bangalore, school, summers working in
              Delhi, and now Pittsburgh. Also the dog that started StrayPaw.
            </p>
            <Photos />
          </Section>

          <Section id="play" n="06" title="Play">
            <p className="mb-6 max-w-[640px] text-[16px] leading-relaxed text-muted">
              Small browser games I make for fun. All of them run here.
            </p>
            <Play
              games={games.map((g) => ({
                id: g.id,
                name: g.name,
                line: g.line,
                href: g.href,
                image: g.image,
              }))}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}
