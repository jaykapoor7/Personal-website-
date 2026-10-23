import { GovernmentSketch } from "@/components/GovernmentSketch";
import { Arrow } from "@/components/Arrow";
import Link from "next/link";
import dynamic from "next/dynamic";
const EverythingFalls = dynamic(
  () => import("@/components/EverythingFalls").then((m) => m.EverythingFalls),
  { loading: () => <p>Loading…</p> },
);
export const metadata = {
  title: "Experiments",
  description: "Browser games and prototypes by Jay Kapoor.",
};
export default function Play() {
  return (
    <>
      <header className="shell editorial-hero">
        <span className="eyebrow">BROWSER GAMES & PROTOTYPES</span>
        <h1>Experiments.</h1>
      </header>
      <section className="shell experiment-list">
        <article className="experiment-feature">
          <a
            href="https://strike.kapoorjay.com"
            target="_blank"
            rel="noreferrer"
            className="experiment-poster strike-poster"
            aria-label="Everybody’s on Strike — play"
          >
            <span className="picket">ON STRIKE.</span>
            <small>
              EVERYBODY’S ON STRIKE <Arrow />
            </small>
          </a>
          <div>
            <span className="eyebrow">01 / BROWSER GAME</span>
            <h2>
              Everybody’s
              <br />
              on Strike
            </h2>
            <p>A game about an interface on strike.</p>
            <a
              href="https://strike.kapoorjay.com"
              target="_blank"
              rel="noreferrer"
              className="pill dark"
            >
              Play{" "}
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
            aria-label="The World’s Worst Emergency Service — play"
          >
            <span aria-hidden="true">🦕</span>
            <small>
              PLAY <Arrow />
            </small>
          </a>
          <div>
            <span className="eyebrow">02 / BROWSER GAME</span>
            <h2>
              The World’s Worst
              <br />
              Emergency Service
            </h2>
            <p>A game about running an emergency service.</p>
            <a
              href="https://emergency.kapoorjay.com"
              target="_blank"
              rel="noreferrer"
              className="pill dark"
            >
              Play{" "}
              <span>
                <Arrow />
              </span>
            </a>
          </div>
        </article>
        <div className="experiment-embed">
          <details>
            <summary>Everybody’s on Strike</summary>
            <iframe
              title="Everybody’s on Strike — playable game"
              src="https://strike.kapoorjay.com"
              loading="lazy"
              allow="fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </details>
          <details>
            <summary>The World’s Worst Emergency Service</summary>
            <iframe
              title="The World’s Worst Emergency Service — playable game"
              src="https://emergency.kapoorjay.com"
              loading="lazy"
              allow="fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </details>
        </div>
        <article className="physics-preview">
          <div className="section-rule">
            <span>03 / PHYSICS EXPERIMENT</span>
            <Link href="/play/everything-falls">
              Open <Arrow />
            </Link>
          </div>
          <h2>
            Permission
            <br />
            <em>to Fall.</em>
          </h2>
          <p style={{ marginBottom: 25 }}>Drag and release.</p>
          <EverythingFalls compact />
        </article>
        <article className="concept-sketch">
          <GovernmentSketch />
          <div className="concept-copy">
            <span className="eyebrow">04 / PROTOTYPE</span>
            <h2>
              A Very Small
              <br />
              <em>Government.</em>
            </h2>
            <p>A prototype about approving a park.</p>
          </div>
        </article>
      </section>
      <section className="shell reading-list">
        <div className="section-rule">
          <span>OTHER PROTOTYPES</span>
        </div>
        <div className="archive-index">
          {[
            {
              title: "Juno ADHD OS",
              href: "/work/juno-adhd-os",
              detail: "Productivity & behavioral planning",
            },
            {
              title: "Health OS",
              href: "/work/recovery-intelligence",
              detail: "Wearable data, explained",
            },
            {
              title: "Juno Preventive Health",
              href: "/work/juno-preventive-health",
              detail: "Preventive-health information",
            },
            {
              title: "Road360",
              href: "/work/road360",
              detail: "Driving signals",
            },
            {
              title: "Search visibility checker",
              href: "/work/seo-geo-optimiser",
              detail: "Search visibility",
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
