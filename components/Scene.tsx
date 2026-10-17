"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
export function Scene({children,className=""}:{children:React.ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null); const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
 const y=useTransform(scrollYProgress,[0,1],reduce?[0,0]:[34,-34]);
 return <div ref={ref} className={className}><motion.div style={{y}} className="scene-inner">{children}</motion.div></div>;
}
export function Rise({children,className=""}:{children:React.ReactNode;className?:string;delay?:number}){
 return <div className={className}>{children}</div>;
}
