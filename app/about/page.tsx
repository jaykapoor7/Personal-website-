import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { person } from "@/content/site";
import { Rise } from "@/components/Scene";
import { ModeLink } from "@/components/ModeLink";
export const metadata:Metadata={title:"About",description:"A little about Jay Kapoor."};
export default function About(){return <><header className="page-hero wrap"><span className="eyebrow">03 / About</span><h1>A bit about <em>me.</em></h1><p>Hey, I’m Jay. I’m a student at the University of Pittsburgh, working on StrayPaw and a few research projects.</p><ModeLink/></header><section className="about-layout wrap"><div className="about-photo"><Image src="/jay-kapoor.jpg" alt="Portrait of Jay Kapoor" fill sizes="(max-width: 800px) 100vw, 42vw"/></div><div className="about-copy">{person.about.map((x,i)=><Rise key={x} delay={i*.06}><p>{x}</p></Rise>)}<div className="about-facts"><div><span>Based in</span><strong>Pittsburgh, Pennsylvania</strong></div><div><span>At school</span><strong>University of Pittsburgh</strong></div><div><span>Studying</span><strong>Economics & Statistics</strong></div></div><Link href="/work" className="text-link">See my work <span>↗</span></Link></div></section><section className="about-end wrap"><span className="eyebrow">Also here</span><p>I keep some research notes and longer pieces on this site, too.</p><Link href="/writing" className="text-link">Writing & research <span>↗</span></Link></section></>}
