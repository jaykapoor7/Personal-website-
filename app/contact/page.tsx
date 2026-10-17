import type { Metadata } from "next";
import { person } from "@/content/site";
export const metadata:Metadata={title:"Contact",description:"Get in touch with Jay Kapoor."};
export default function Contact(){return <section className="contact-page wrap"><span className="eyebrow">04 / Contact</span><h1>Say <em>hello.</em></h1><p>Email is the easiest way to reach me.</p><a className="contact-email" href={`mailto:${person.email}`}>{person.email}<span>↗</span></a><div className="contact-other"><span className="eyebrow">Or find me here</span>{person.links.filter(x=>x.label!=="Email").map(x=><a key={x.label} href={x.href} target={x.href.startsWith("http")?"_blank":undefined} rel="noreferrer">{x.label}<span>↗</span></a>)}</div></section>}
