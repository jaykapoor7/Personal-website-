import type { Profile } from "./types";

// Single source of truth for identity, education, skills, and headline stats.
// Every figure here is drawn from the resume and tagged with its source.
export const profile: Profile = {
  name: "Jay Kapoor",
  tagline:
    "Economics & Statistics @ Pitt. I build and research at the intersection of fintech, healthtech, and investing.",
  location: "Pittsburgh, PA",
  email: "jak581@pitt.edu",
  bio: [
    "I'm a builder and investor-in-training. I founded a healthcare-access platform that reached 10,000+ rural users, then spent the last year inside the founder's office of a 20,000-user fintech platform working on growth, strategy, and investment research.",
    "I'm studying Economics & Statistics at the University of Pittsburgh with a minor in Information Sciences. I care about products that reach underserved users and about the research discipline behind good investment decisions.",
    "This site is the long version of my resume — the projects behind it, with links you can open.",
  ],
  portrait: {
    src: "/jay-kapoor.jpg",
    alt: "Jay Kapoor",
    available: false,
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
    technical: ["Python", "SQL", "Excel (PivotTables, VBA)"],
    domain: [
      "Investment Research",
      "Venture Research",
      "Competitive Analysis",
      "Market Mapping",
      "Growth Strategy",
      "Generative Engine Optimization (GEO)",
    ],
  },
  highlights: [
    { value: "20K", label: "users at the fintech platform I helped grow", source: "resume" },
    { value: "10K+", label: "rural users on the platform I founded", source: "resume" },
    { value: "180%", label: "user growth driven in 12 months", source: "resume" },
    { value: "$8k+", label: "revenue from artisan-commerce initiative", source: "resume" },
  ],
  resumeUrl: "/jay-kapoor-resume.pdf",
};
