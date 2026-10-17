import Link from "next/link";
import {EverythingFalls} from "@/components/EverythingFalls";
export const metadata={title:"Playground",description:"An interactive little experiment by Jay Kapoor."};
export default function Play(){return <div className="new-play"><section className="shell standalone-play"><span className="kicker">Playground / 01</span><h1>Small things.<br/><em>Big reactions.</em></h1><p>Right now, the playground has one thing to try. More can join when they’re ready.</p><EverythingFalls/><Link className="feature-link" href="/play/everything-falls">Everything Falls — full page <span>↗</span></Link></section></div>}
