"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/** Coordinate route changes with the browser's View Transitions API. */
export function NavigationMotion(){
 const router=useRouter(); const pathname=usePathname(); const pending=useRef<null|(()=>void)>(null);
 useEffect(()=>{pending.current?.();pending.current=null},[pathname]);
 useEffect(()=>{
  function onClick(event:MouseEvent){
   if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
   const anchor=(event.target as Element|null)?.closest("a[href]") as HTMLAnchorElement|null;
   if(!anchor||anchor.target||anchor.hasAttribute("download")||anchor.hasAttribute("data-no-transition"))return;
   const destination=new URL(anchor.href,location.href);
   if(destination.origin!==location.origin||destination.pathname===location.pathname||/\.(pdf|csv|xlsx|jpg|jpeg|png|webp|svg)$/i.test(destination.pathname))return;
   const api=document as Document & {startViewTransition?:(update:()=>Promise<void>)=>void};
   if(!api.startViewTransition||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
   event.preventDefault();
   api.startViewTransition(()=>new Promise<void>(resolve=>{
    const timeout=setTimeout(()=>{pending.current=null;resolve()},900);
    pending.current=()=>{clearTimeout(timeout);resolve()};
    router.push(destination.pathname+destination.search+destination.hash);
   }));
  }
  document.addEventListener("click",onClick,true);return()=>document.removeEventListener("click",onClick,true);
 },[router]);
 return null;
}
