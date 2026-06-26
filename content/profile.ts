import type { Profile } from "./types";

// Single source of truth for identity, education, skills, and headline stats.
// Every figure here is drawn from the resume and tagged with its source.
export const profile: Profile = {
  name: "Jay Kapoor",
  tagline:
    "Economics & Statistics @ Pitt. I build and research at the intersection of fintech, healthtech, and investment research.",
  location: "Pittsburgh, PA",
  email: "jak581@pitt.edu",
  bio: [
    "I'm a builder and researcher. I founded a healthcare-access platform that reached 10,000+ rural users, then spent the last year inside the founder's office of a 20,000-user fintech platform working on growth, strategy, and investment research.",
    "I'm studying Economics & Statistics at the University of Pittsburgh with a minor in Information Sciences, and I do research across three Pitt / UPMC labs. I care about products that reach underserved users and about the research discipline behind good investment decisions.",
    "My long-term goal: a venture studio or multi-project investment firm — underwriting deals and building startups in parallel.",
    "This site is the long version of my resume — the projects behind it, with links you can open.",
  ],
  seeking: "Open to operations / BizOps and venture (VC/PE) roles.",
  portrait: {
    src: "/jay-kapoor.jpg",
    alt: "Jay Kapoor",
    available: true,
  },
  education: [
    {
      school: "University of Pittsburgh",
      credential: "B.S. Economics & Statistics · Minor: Information Sciences",
      location: "Pittsburgh, PA",
      period: "Expected May 2028",
    },
    {
      school: "The International School of Bangalore",
      credential: "International Baccalaureate Diploma",
      location: "Bengaluru, India",
      period: "May 2021 — May 2023",
    },
  ],
  skills: {
    technical: ["Python", "SQL", "Excel (PivotTables, VBA)", "Tableau", "REDCap"],
    domain: [
      "Investment Research",
      "Venture Research",
      "Financial Modeling",
      "Competitive Analysis",
      "Market Mapping",
      "Growth Strategy",
      "Generative Engine Optimization (GEO)",
    ],
  },
  leadership: [
    "Founded the Entrepreneurship Club at the University of Pittsburgh (2021–2023) — hosted 20+ startup workshops mentoring student teams on MVP design and go-to-market.",
    "Vendor Acquisition Head, Vivum Fest (2022) — managed 25+ vendors and a $10k budget for a 4,000+ attendee event.",
    "Contingent Leader, National Economics Fest (2023) — led a team to “Best Contingent” out of 500+ on macroeconomic models and policy.",
  ],
  highlights: [
    { value: "20K", label: "users at the fintech platform I helped grow", source: "resume" },
    { value: "10K+", label: "rural users on the platform I founded", source: "resume" },
    { value: "180%", label: "user growth driven in 12 months", source: "resume" },
    { value: "$8k+", label: "revenue from artisan-commerce initiative", source: "resume" },
  ],
  resumeUrl: "/jay-kapoor-resume.pdf",
};
