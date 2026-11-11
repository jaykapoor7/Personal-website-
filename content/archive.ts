/** The entries with a full page at /work/[slug]: every venture, and the jobs
 * with enough to say. Everything else opens in place on the home page. */
import { roles, ventures, type Role, type Venture } from "./site";

export type Case = {
  slug: string;
  title: string;
  line: string;
  /** First page of a document, shown when there is no screenshot or photo. */
  image?: string;
  href: string;
  caseOf: { type: "venture"; v: Venture } | { type: "role"; r: Role };
};

/** A job earns its own page once there are three things to say about it. */
export const hasPage = (r: Role) => r.points.length >= 3;

export const cases: Case[] = [
  ...ventures.map<Case>((v) => ({
    slug: v.id,
    title: v.name,
    line: v.summary,
    image: v.shot?.src ?? v.proof.find((p) => p.cover)?.cover,
    href: `/work/${v.id}`,
    caseOf: { type: "venture", v },
  })),
  ...roles.filter(hasPage).map<Case>((r) => ({
    slug: r.id,
    title: r.org,
    line: r.role,
    image: r.proof.find((p) => p.cover)?.cover,
    href: `/work/${r.id}`,
    caseOf: { type: "role", r },
  })),
];
