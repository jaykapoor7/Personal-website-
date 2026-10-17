"use client";
import {useRef,useState} from "react";
import Link from "next/link";
import {motion,useReducedMotion} from "framer-motion";
import {LabNav} from "./LabNav";

type Point=[number,number];
type Cell={x:number;y:number;w:number;h:number;skew?:number};
const scenes=[
 {slug:"straypaw",name:"StrayPaw",kind:"A shared record for street animals",image:"/straypaw/field-observation.webp",alt:"Street dog photographed for StrayPaw",label:"PAW / RECORD / MAP",color:["#1b4e48","#2d7168","#4b8f7e","#88b79b","#d29b63","#d9ba80","#1c5e55","#348371","#6da38b","#c68d57","#e4c999","#2a7165"],cells:[
  {x:110,y:74,w:64,h:70},{x:215,y:39,w:66,h:74},{x:326,y:53,w:68,h:75},{x:430,y:105,w:63,h:72},
  {x:131,y:220,w:88,h:89},{x:214,y:180,w:88,h:90},{x:305,y:174,w:90,h:92},{x:392,y:217,w:83,h:88},
  {x:164,y:299,w:91,h:83},{x:253,y:296,w:91,h:84},{x:342,y:300,w:90,h:82},{x:255,y:379,w:83,h:46}
 ]},
 {slug:"juno-ai",name:"Juno-AI",kind:"Healthcare information and care navigation",image:"/work/juno-ai/juno-product-dashboard.webp",alt:"Juno-AI dashboard screens",label:"CARE / QUESTION / ANSWER",color:["#706899","#8175aa","#9a8fbe","#b3abd0","#584e83","#70619d","#bcb2d5","#a69ac6","#8179a4","#595188","#aaa1c6","#d4cadd"],cells:[
  {x:232,y:36,w:76,h:76},{x:309,y:36,w:76,h:76},{x:232,y:113,w:76,h:76},{x:309,y:113,w:76,h:76},
  {x:77,y:190,w:76,h:76},{x:154,y:190,w:76,h:76},{x:231,y:190,w:76,h:76},{x:308,y:190,w:76,h:76},
  {x:385,y:190,w:76,h:76},{x:462,y:190,w:76,h:76},{x:231,y:267,w:76,h:76},{x:308,y:267,w:76,h:76}
 ]},
 {slug:"crowwd",name:"Crowwd",kind:"Growth, events, and research at an investing platform",image:"/work/crowwd/arthavaad-stage.jpg",alt:"Crowwd Arthavaad event stage",label:"PEOPLE / MARKETS / IDEAS",color:["#7e382f","#a14d3a","#c6744d","#e2a36e","#9e563e","#bb7354","#d99768","#f1c48b","#6c3935","#99574b","#c78361","#e4b17d"],cells:[
  {x:75,y:332,w:103,h:62},{x:75,y:269,w:103,h:62},{x:106,y:206,w:38,h:38},{x:116,y:139,w:18,h:18},
  {x:220,y:332,w:103,h:62},{x:220,y:269,w:103,h:62},{x:220,y:206,w:103,h:62},{x:252,y:141,w:38,h:38},
  {x:365,y:332,w:103,h:62},{x:365,y:269,w:103,h:62},{x:365,y:206,w:103,h:62},{x:365,y:143,w:103,h:62}
 ]}
] as const;
function path(cell:Cell){const {x,y,w,h,skew=0}=cell;const q=7;const points:Point[]=[[x+q,y],[x+w-q,y+skew],[x+w,y+q+skew],[x+w,y+h-q],[x+w-q,y+h],[x+q,y+h-skew],[x,y+h-q-skew],[x,y+q]];return `M ${points.map(p=>p.map(v=>Math.round(v)).join(" ")).join(" L ")} Z`}
const routePaths=["M 58 421 L 140 400 L 218 419 L 310 392 L 395 417 L 520 384","M 52 418 L 140 418 L 220 380 L 301 418 L 398 418 L 520 418","M 52 422 L 140 362 L 220 379 L 301 287 L 398 304 L 520 169"];
export function MorphStudy(){const [index,setIndex]=useState(0);const reduce=useReducedMotion();const start=useRef<number|null>(null);const scene=scenes[index];function go(n:number){setIndex((index+n+scenes.length)%scenes.length)}return <main className="concept-lab morph-study"><LabNav number="04" title="Project transformations"/><header className="morph-study-header"><div><span>One set of pieces / Three subjects</span><h1>Projects change shape.</h1></div><p>Choose a project. The same twelve pieces form a paw, a care cross, and an ascending set of market bars.</p></header><div className="morph-study-main"><div className="morph-study-art" tabIndex={0} role="group" aria-label="Project composition. Use left and right arrow keys to change projects." onKeyDown={e=>{if(e.key==="ArrowRight")go(1);if(e.key==="ArrowLeft")go(-1)}} onTouchStart={e=>{start.current=e.touches[0]?.clientX??null}} onTouchEnd={e=>{if(start.current===null)return;const dx=e.changedTouches[0].clientX-start.current;if(Math.abs(dx)>50)go(dx<0?1:-1);start.current=null}}><div className="morph-study-grid"/><svg viewBox="0 0 580 460" role="img" aria-label={`${scene.name} geometric composition`}><motion.path d={routePaths[index]} animate={{d:routePaths[index]}} transition={reduce?{duration:0}:{duration:.95,ease:[.22,.7,.2,1]}} fill="none" stroke={scene.color[4]} strokeWidth="3" strokeDasharray="3 10" opacity=".65"/>{scene.cells.map((cell,i)=><motion.path key={i} d={path(cell)} animate={{d:path(cell),fill:scene.color[i]}} transition={reduce?{duration:0}:{duration:1.04,delay:i*.023,ease:[.76,0,.2,1]}} stroke="#edece4" strokeWidth="3"/> )}</svg><span className="morph-study-art-label">{scene.label}</span></div><div className="morph-study-side"><div className="morph-study-count">0{index+1} / 0{scenes.length}</div><div className="morph-study-photo" key={scene.slug}><img src={scene.image} alt={scene.alt}/></div><span className="morph-study-category">Selected work</span><h2 key={scene.name}>{scene.name}</h2><p>{scene.kind}</p><Link href={`/work/${scene.slug}`}>Read about {scene.name} ↗</Link><div className="morph-study-arrows"><button onClick={()=>go(-1)} aria-label="Previous project">←</button><button onClick={()=>go(1)} aria-label="Next project">→</button></div></div></div><nav className="morph-study-list" aria-label="Choose a project">{scenes.map((project,i)=><button key={project.slug} aria-pressed={index===i} onClick={()=>setIndex(i)}><span>0{i+1}</span><strong>{project.name}</strong><span>↗</span></button>)}</nav><div className="morph-study-alternative"><span>Direct links</span>{scenes.map(project=><Link href={`/work/${project.slug}`} key={project.slug}>{project.name} ↗</Link>)}</div></main>}
