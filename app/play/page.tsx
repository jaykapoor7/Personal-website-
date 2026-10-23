import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import dynamic from "next/dynamic";
const EverythingFalls = dynamic(
  () => import("@/components/EverythingFalls").then((m) => m.EverythingFalls),
  { loading: () => <p>Setting the desk…</p> },
);
export const metadata = {
  title: "Experiments",
  description:
    "Playful engineering by Jay Kapoor — Everybody’s on Strike, The World’s Worst Emergency Service, and Everything Falls.",
};
export default function Play() {
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">
          EXPERIMENTS / CURIOSITY WITHOUT A BUSINESS CASE
        </span>
        <h1>
          Built because
          <br />
          <em>what if?</em>
        </h1>
        <p>
          Small worlds, strange rules, and things that probably didn’t need
          physics. Finished experiments you can actually play.
        </p>
      </header>
      <section className="shell experiment-list">
        <article className="experiment-feature">
          <a
            href="https://strike.kapoorjay.com"
            target="_blank"
            rel="noreferrer"
            className="experiment-poster strike-poster"
            aria-label="Buttons have rights. Everybody’s on Strike — play the game"
          >
            <span className="picket">
              BUTTONS
              <br />
              HAVE RIGHTS.
            </span>
            <small>
              EVERYBODY’S ON STRIKE <Arrow />
            </small>
          </a>
          <div>
            <span className="eyebrow">01 / BROWSER COMEDY · COMPLETED</span>
            <h2>
              Everybody’s
              <br />
              on Strike
            </h2>
            <p>
              A corporate website discovers collective bargaining. Its buttons
              walk away. Its checkbox withdraws consent. You negotiate.
            </p>
            <a
              href="https://strike.kapoorjay.com"
              target="_blank"
              rel="noreferrer"
              className="pill dark"
            >
              Negotiate with the interface{" "}
              <span>
                <Arrow />
              </span>
            </a>
          </div>
        </article>
        <article className="experiment-feature">
          <a
            href="https://emergency.kapoorjay.com"
            target="_blank"
            rel="noreferrer"
            className="experiment-poster emergency-poster"
            aria-label="Probably the wrong response. The World’s Worst Emergency Service — play the game"
          >
            <span aria-hidden="true">🦕</span>
            <small>
              PROBABLY THE WRONG RESPONSE <Arrow />
            </small>
          </a>
          <div>
            <span className="eyebrow">02 / ILLUSTRATED GAME · COMPLETED</span>
            <h2>
              The World’s Worst
              <br />
              Emergency Service
            </h2>
            <p>
              A cat needs rescuing. You deploy a dinosaur. The dinosaur eats a
              house. Somehow, you get promoted.
            </p>
            <a
              href="https://emergency.kapoorjay.com"
              target="_blank"
              rel="noreferrer"
              className="pill dark"
            >
              Answer the phone{" "}
              <span>
                <Arrow />
              </span>
            </a>
          </div>
        </article>
        <article className="physics-preview">
          <div className="section-rule">
            <span>03 / EVERYTHING FALLS · INTERACTIVE</span>
            <Link href="/play/everything-falls">
              Full desk <Arrow />
            </Link>
          </div>
          <h2>
            A desk with
            <br />
            <em>very little discipline.</em>
          </h2>
          <EverythingFalls compact />
        </article>
      </section>
      <section className="shell reading-list">
        <div className="section-rule">
          <span>UTILITY PROTOTYPES / HEALTH, DATA & EVERYDAY LIFE</span>
        </div>
        <div className="archive-index">
          {[
            {
              title: "Recovery Intelligence",
              href: "/work/recovery-intelligence",
              detail: "Wearable data, explained",
            },
            {
              title: "Juno Preventive Health",
              href: "/work/juno-preventive-health",
              detail: "A preventive health information experiment",
            },
            {
              title: "Road360",
              href: "/work/road360",
              detail: "Exploring road conditions through driving signals",
            },
            {
              title: "Search visibility checker",
              href: "/work/seo-geo-optimiser",
              detail: "How a website appears to search systems",
            },
          ].map((x) => (
            <Link key={x.href} href={x.href}>
              <div>
                {x.title}
                <small>{x.detail} · Prototype</small>
              </div>
              <span>
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
