"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function ModeLink({compact=false}:{compact?:boolean}){const path=usePathname();const playing=path==="/"||path.startsWith("/play");return <Link href={playing?"/about":"/"} className={`mode-link ${compact?"mode-link-compact":""}`} aria-label={playing?"Switch to professional portfolio":"Switch to playground"}><span className="mode-orbit" aria-hidden><i/><i/><i/></span><span>{playing?"Meet Jay":"Playground"}</span><span aria-hidden>↗</span></Link>}
