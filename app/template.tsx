"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Template({children}:{children:React.ReactNode}){const reduce=useReducedMotion();return <motion.div initial={reduce?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={reduce?undefined:{opacity:0,y:-12}} transition={{duration:.55,ease:[.16,1,.3,1]}}>{children}</motion.div>}
