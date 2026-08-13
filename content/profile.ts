import type { Profile } from "./types";

// Single source of truth for identity, education, skills, and headline stats.
// Every figure here is drawn from the resume and tagged with its source.
export const profile: Profile = {
  name: "Jay Kapoor",
  tagline:
    "Economics & Statistics student at Pitt. I build things and do research across fintech, healthtech, and investing.",
  location: "Pittsburgh, PA",
  email: "jak581@pitt.edu",
  bio: [
    "I like building things and figuring out how they work. I started a healthcare-access platform for rural communities, and I spent the last year in the founder's office at a fintech startup, working on growth, strategy, and investment research.",
    "I'm studying Economics & Statistics at the University of Pittsburgh with a minor in Information Sciences, and I do research across a few Pitt / UPMC labs. I gravitate toward products that reach underserved users, and toward the research habits behind good investment calls.",
    "Longer term, I want to build and back companies in parallel — somewhere between a venture studio and an investment firm.",
    "This site is just the long version of my resume — the actual projects, with links you can open.",
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
      credential:
        "B.S. Economics & Statistics · Minor: Information Sciences · Pre-Medical Track",
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
    "Team Leader, JumpStart / AmeriCorps, Pittsburgh — led a team of 8 corps members delivering early-childhood literacy programming in Pittsburgh public schools.",
    "Founded the Entrepreneurship Club at the University of Pittsburgh (2021–2023) — hosted 20+ startup workshops mentoring student teams on MVP design and go-to-market.",
    "Vendor Acquisition Head, Vivum Fest (2022) — managed 25+ vendors and a $10k budget for a 4,000+ attendee event.",
    "Contingent Leader, National Economics Fest (2023) — led a team to “Best Contingent” out of 500+ on macroeconomic models and policy.",
    "Relief Coordinator, COVID-19 Relief Group, Assam (2019–2021) — verified medication leads and coordinated hospital-bed availability with local hospitals and volunteers to expand medical access in remote areas.",
  ],
  highlights: [
    { value: "20K", label: "users at the fintech startup I worked at", source: "resume" },
    { value: "10K+", label: "rural users on a healthcare platform I built", source: "resume" },
    { value: "$8k+", label: "revenue from a small artisan-commerce project", source: "resume" },
  ],
  resumeUrl: "/jay-kapoor-resume.pdf",
};
