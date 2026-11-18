import { person } from "@/content/site";
import { Fill } from "./Fill";

/**
 * The first thing on the sheet that slides over the hero: who I am in four
 * short paragraphs, which fill in as you scroll, with the ways in beside them.
 */
export function Intro({ aside }: { aside?: React.ReactNode }) {
  return (
    <section
      aria-label="About me"
      className="shell grid gap-x-20 gap-y-12 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start"
    >
      <Fill
        className="max-w-[660px] space-y-5 text-[clamp(19px,1.7vw,24px)] font-medium leading-[1.45] tracking-[-0.01em] text-fg"
        paras={[
          {
            parts: [
              "I study economics and statistics in the Dietrich School of Arts and Sciences at the University of Pittsburgh. I grew up in Bangalore and started my first company, ",
              { text: "Juno-AI", href: "/work/juno-ai/" },
              ", at 14, to get health information to families in rural India.",
            ],
          },
          {
            parts: [
              "I usually start where a system fails people: talk to them, count what's really there, then build what's missing. Most of that has been in public health.",
            ],
          },
          {
            parts: [
              "Right now I'm building ",
              { text: "StrayPaw", href: "/work/straypaw/" },
              ", a shared record of India's street animals. It holds 30,288 records across 28 cities, kept with 19 NGO partners.",
            ],
          },
          {
            muted: true,
            parts: [
              "Find me at ",
              { text: person.email, href: `mailto:${person.email}`, ext: true },
              ", ",
              { text: "LinkedIn", href: person.links[0].href, ext: true },
              " and ",
              { text: "GitHub", href: person.links[1].href, ext: true },
              ", or read my ",
              { text: "resume", href: person.resume, ext: true },
              ".",
            ],
          },
        ]}
      />
      {aside}
    </section>
  );
}
