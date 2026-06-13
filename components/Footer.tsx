import Link from "next/link";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="hr-line mt-32 border-t">
      <div className="shell flex flex-col gap-10 py-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="display max-w-xl text-3xl leading-tight sm:text-4xl">
            Let&rsquo;s talk.
            <br />
            <a href={`mailto:${profile.email}`} className="link-underline text-muted">
              {profile.email}
            </a>
          </p>
          <ul className="flex flex-wrap gap-6 text-sm">
            {socials.map((s) => (
              <li key={s.type}>
                <a
                  href={s.url}
                  target={s.type === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="link-underline text-muted"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resumeUrl} className="link-underline text-paper">
                Resume ↗
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-2 text-xs text-muted sm:flex-row">
          <span>
            © {year} {profile.name}. {profile.location}.
          </span>
          <span>
            <Link href="/work" className="link-underline">
              Every claim here links to proof.
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
