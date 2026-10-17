/** Edit this file to update the public portfolio. Keep dates and claims tied to a source. */
export const person = {
  name: "Jay Kapoor",
  email: "jak581@pitt.edu",
  school: "University of Pittsburgh",
  course: "Economics & Statistics",
  place: "Pittsburgh, PA",
  intro: "I’m a student at the University of Pittsburgh. I’m working on StrayPaw and a few research projects. Here’s some of what I’ve been working on.",
  about: [
    "I’m Jay. I study Economics and Statistics at the University of Pittsburgh, with a minor in Information Sciences.",
    "Lately, most of my time outside class has gone into StrayPaw, a way to keep better records for street animals in India. I also work on research with people at Pitt and spend time reading about healthcare, technology, and investing.",
    "Before this, I worked on a healthcare project called Juno-AI, helped run projects at Crowwd, and did a mix of research and operations work. The work page has the details."
  ],
  links: [
    { label: "Email", href: "mailto:jak581@pitt.edu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jay-kapoor7" },
    { label: "GitHub", href: "https://github.com/jaykapoor7" },
    { label: "Résumé", href: "/jay-kapoor-resume.pdf" },
  ],
};

export type Project = {
  slug: string; title: string; eyebrow: string; summary: string; period?: string;
  image?: string; imageAlt?: string; imagePosition?: string; tone: string;
  body: string[]; did?: string[]; gallery?: {src:string;alt:string;caption:string}[]; links: {label:string;href:string}[];
};

export const projects: Project[] = [
  {
    slug: "straypaw", title: "StrayPaw", eyebrow: "Founder · Current project", period: "Current",
    summary: "A shared record for street animals in India, from the first sighting to the care they receive.",
    image: "/straypaw/field-observation.webp", imageAlt: "Street dog photographed for StrayPaw’s field observation atlas", imagePosition: "center 54%", tone: "forest",
    body: [
      "StrayPaw gives residents, rescue teams, and local governments a way to work from the same record. Someone can report an animal; a field team can follow the case; a city can see where care is happening and where it is missing.",
      "I started it because much of this work already happens through feeders, rescuers, and NGOs, but the records are often scattered. The product now includes animal profiles, case tracking, and a live map."
    ],
    did: ["Product design and development", "Field workflows for reports and case follow-up", "Outreach to feeder networks and NGOs"],
    gallery: [{src:"/straypaw/street-dog.jpg",alt:"Street dog documented in Delhi",caption:"From StrayPaw’s field photographs"},{src:"/straypaw/skyline-dog.webp",alt:"StrayPaw’s city and street dog image",caption:"StrayPaw, from the street up"}],
    links: [{label:"Visit StrayPaw",href:"https://straypaw.kapoorjay.com"},{label:"Explore the live map",href:"https://straypaw.kapoorjay.com/map"}],
  },
  {
    slug: "juno-ai", title: "Juno-AI", eyebrow: "Founder · Healthcare", period: "2019–2024",
    summary: "A healthcare access project I started to help people find information, doctors, and pharmacies.",
    image: "/work/juno-ai/juno-product-dashboard.webp", imageAlt: "Juno-AI product screens and dashboard", tone: "lilac",
    body: ["I started Juno-AI as a teenager in India. It combined health information with tools for finding care, especially for people in places where reliable guidance can be hard to get.", "I worked on the product, outreach, and partnerships. The original research paper and product images are still available below."],
    did: ["Health information and care navigation", "Doctor and pharmacy discovery", "Research paper on the approach"],
    links: [{label:"Read the paper",href:"/work/juno-ai/Juno-AI-Research-Paper.pdf"}],
  },
  {
    slug: "crowwd", title: "Crowwd", eyebrow: "Founder’s office internship · Fintech", period: "2025–2026",
    summary: "Growth, events, and research at an investing platform in India.",
    image: "/work/crowwd/arthavaad-stage.jpg", imageAlt: "Arthavaad event at The Circle.Work", tone: "clay",
    body: ["At Crowwd, I worked with the founder on distribution, competitive research, and a speaker series called Arthavaad.", "The work ranged from looking at acquisition channels to finding speakers and running events. I also wrote research notes on fintech products."],
    did: ["Arthavaad speaker series", "Research on investing products", "User acquisition experiments"],
    gallery: [{src:"/work/crowwd/arthavaad-audience.jpg",alt:"Audience at an Arthavaad event",caption:"Arthavaad speaker series"}],
    links: [{label:"Visit Crowwd",href:"https://crowwd.io"},{label:"Selected research",href:"/work/crowwd/Crowwd-Selected-Research-and-Strategy.pdf"}],
  },
  {
    slug: "project-nidaan", title: "Project Nidaan", eyebrow: "Field research · Health", period: "2022–2024",
    summary: "Research into medication access for delivery riders in Bengaluru.",
    tone: "sand", body: ["I interviewed delivery riders about how they access medicines and care, then organized and analyzed the responses. The project looked at barriers that do not always show up in formal healthcare data."],
    links: [{label:"Field research brief",href:"/work/project-nidaan/Project-Nidaan-Field-Research-Brief.pdf"}],
  },
  {
    slug: "finer-things-club", title: "The Finer Things Club", eyebrow: "Founder · Commerce", period: "2021–2024",
    summary: "A small marketplace project working with rural artisans in India.", tone: "peach",
    body: ["This began as a way to help artisans sell their work through NGO and marketplace partnerships. I worked on onboarding, distribution, and the day-to-day operations."],
    links: [{label:"Project one-pager",href:"/work/finer-things-club/Finer-Things-Marketplace-One-Pager.pdf"}],
  },
  {
    slug: "tot-schools", title: "TOT Schools", eyebrow: "Operations", period: "2025–now",
    summary: "Operations work for an early childhood education business.", tone: "blue",
    body: ["I worked across practical parts of running the schools, including software, hiring, facilities, and documentation."],
    links: [{label:"Operations case study",href:"/work/tot-schools/TOT-Schools-Operations-Case-Study.pdf"}],
  },
  {
    slug: "hdfc-bank", title: "HDFC Bank", eyebrow: "Wealth management internship", period: "Summer 2025",
    summary: "Investment research for the wealth management team.", tone: "sand",
    body: ["I researched equities, mutual funds, and other products for portfolio reviews. These are two examples of the work."],
    links: [{label:"Apollo Hospitals note",href:"/work/hdfc-bank/Apollo-Hospitals-Research-Note-Aug-2025.pdf"},{label:"Portfolio review",href:"/work/hdfc-bank/HNI-Portfolio-Allocation-Review.pdf"}],
  },
];

export const experience = [
  { name: "StrayPaw", detail: "Founder", href: "/work/straypaw" },
  { name: "Accessible SmartTech Lab", detail: "Research and media internship" },
  { name: "SCI 3Sixty", detail: "Fellowship" },
  { name: "SeaX Ventures", detail: "Venture work" },
  { name: "Bolder Futures", detail: "Project work" },
  { name: "Prof. Rosta Farzan", detail: "Research on AI adoption among nonprofits" },
  { name: "Prof. Yasir Khan", detail: "Economics research on Kisan Rail" },
  { name: "Contrary Research", detail: "Research" },
  { name: "Crowwd", detail: "Founder’s office internship", href: "/work/crowwd" },
  { name: "HDFC Bank", detail: "Wealth management internship", href: "/work/hdfc-bank" },
];

export const writingItems = [
  { title: "India HealthTech Market Map", description: "A map of companies working across healthcare in India, with the underlying data.", type: "Research", links: [{label:"Open PDF",href:"/research/India-HealthTech-Market-Map.pdf"},{label:"Download CSV",href:"/research/India-HealthTech-Companies.csv"}] },
  { title: "Memo Library & Calibration Ledger", description: "Investment memos and a dated list of forecasts. I keep the calls and their outcomes together.", type: "Memos", links: [{label:"See the ledger",href:"/ledger"},{label:"Open PDF",href:"/research/Memo-Library-and-Ledger.pdf"}] },
  { title: "India’s GLP-1 Inflection", description: "Notes on the companies and products around metabolic care in India.", type: "Research", links: [{label:"Open PDF",href:"/research/India-GLP1-Sector-Thesis.pdf"}] },
  { title: "India’s Retail-Investing Reset", description: "A look at where India’s retail investing market may go next.", type: "Research", links: [{label:"Open PDF",href:"/research/India-Fintech-Sector-Thesis.pdf"}] },
  { title: "Juno-AI research paper", description: "The research behind the healthcare access project.", type: "Paper", links: [{label:"Open PDF",href:"/work/juno-ai/Juno-AI-Research-Paper.pdf"}] },
];

/** Smaller projects remain accessible without taking over the main work page. */
export const archiveProjects: Project[] = [
  {slug:"juno-preventive-health",title:"Juno Preventive Health",eyebrow:"Small build · Healthcare",period:"2026",summary:"An experiment with AI and preventive health information.",tone:"lilac",body:["I built an early version using the Claude API to explore how people might make sense of preventive care."],links:[{label:"Open the build",href:"https://preventive-healthcare-xi.vercel.app/"}]},
  {slug:"tarc",title:"TARC",eyebrow:"Project and operations work",period:"2025",summary:"Feasibility research for potential real estate projects.",tone:"sand",body:["I looked at regulations, pricing, and project assumptions for possible developments."],links:[{label:"Read a feasibility memo",href:"/work/tarc/Development-Feasibility-Memo-2025.pdf"}]},
  {slug:"seo-geo-optimiser",title:"Search visibility checker",eyebrow:"Small build · Search",period:"2026",summary:"A tool that reviews a site’s search visibility and produces a report.",tone:"blue",body:["I made this after working on search distribution at Crowwd. It looks at conventional search and AI search results."],links:[{label:"Open the tool",href:"https://llm-ai-search-checker.vercel.app/"}]},
  {slug:"recovery-intelligence",title:"Recovery Intelligence",eyebrow:"Small build · Health data",period:"2026",summary:"An experiment for explaining wearable data in plain language.",tone:"peach",body:["The tool turns recovery and activity numbers into a simpler explanation."],links:[{label:"Open the tool",href:"https://explain-my-whoop-stats.vercel.app/"}]},
  {slug:"road360",title:"Road360",eyebrow:"Small build · Transport",period:"2026",summary:"A driving experiment built around Delhi’s road conditions.",tone:"clay",body:["I explored whether horn noise and harsh braking could help describe a drive."],links:[{label:"Open the tool",href:"https://road360.vercel.app/"}]},
  {slug:"apodaca-lab",title:"Apodaca Lab",eyebrow:"Research assistant · Pitt",period:"2025",summary:"Cell biology research at the Pitt School of Medicine.",tone:"sand",body:["I cultured primary bladder cells for work studying how cells respond to stretch."],links:[]},
  {slug:"pitt-sociology",title:"Pitt Sociology",eyebrow:"Research assistant · Pitt",summary:"Literature review and data work in Pitt’s sociology department.",tone:"blue",body:["The work involved reading studies, working with surveys, and analysis in R and Stata."],links:[]},
  {slug:"upmc-emergency-medicine",title:"UPMC Emergency Medicine",eyebrow:"Research assistant",period:"2024",summary:"Clinical data work for retrospective trauma research.",tone:"lilac",body:["I abstracted and coded medical record data in REDCap."],links:[]},
  {slug:"max-hospital",title:"Max Hospital",eyebrow:"Clinical shadowing",period:"2023–2024",summary:"Clinical shadowing in emergency and internal medicine.",tone:"peach",body:["I observed care at a hospital in New Delhi."],links:[]},
];
export const allProjects = [...projects, ...archiveProjects];
