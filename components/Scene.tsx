"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
export function Scene({children,className=""}:{children:React.ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null); const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
 const y=useTransform(scrollYProgress,[0,1],reduce?[0,0]:[34,-34]);
 return <div ref={ref} className={className}><motion.div style={{y}} className="scene-inner">{children}</motion.div></div>;
}
export function Rise({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
 const reduce=useReducedMotion(); return <motion.div className={className} initial={reduce?false:{opacity:0,y:28,clipPath:"inset(0 0 22% 0)"}} whileInView={{opacity:1,y:0,clipPath:"inset(0 0 0% 0)"}} viewport={{once:true,amount:.12}} transition={{duration:.8,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>
}
