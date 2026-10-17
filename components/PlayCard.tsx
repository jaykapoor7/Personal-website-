import Link from "next/link";
import type { PlayItem } from "@/content/play";
export function PlayCard({item,index}:{item:PlayItem;index:number}){return <Link href={`/play/${item.slug}`} className={`play-card play-${item.palette}`}><div className="play-art" aria-hidden><span className="play-grid"/><span className="play-mark">{item.mark}</span><span className="play-art-caption">{item.preview}</span></div><div className="play-caption"><span>0{index+1} / {item.kind}</span><span>Explore ↗</span></div><h2>{item.title}</h2><p>{item.description}</p></Link>}
