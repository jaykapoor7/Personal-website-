import Link from "next/link";
export function LabNav({number,title}:{number:string;title:string}){return <nav className="lab-nav" aria-label="Prototype navigation"><Link href="/lab">← All concepts</Link><span>{number} / {title}</span><Link href="/about">Current portfolio ↗</Link></nav>}
