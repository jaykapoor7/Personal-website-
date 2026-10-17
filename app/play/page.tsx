import type { Metadata } from "next";
import { playItems } from "@/content/play";
import { PlayCard } from "@/components/PlayCard";
export const metadata:Metadata={title:"Playground",description:"Small interactive projects and experiments by Jay Kapoor."};
export default function Play(){return <div className="playground"><header className="play-page-hero wrap"><span className="eyebrow">Playground / 01</span><h1>Things to <em>play with.</em></h1><p>Small things I’ve built. This part of the site will grow as new experiments are ready.</p></header><section className="play-gallery wrap"><div className="play-grid-cards">{playItems.map((item,i)=><PlayCard item={item} index={i} key={item.slug}/>)}</div></section></div>}
