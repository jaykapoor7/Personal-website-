"use client";
import { useEffect, useState } from "react";
export function usePrototypeMode(){
 const [mode,setMode]=useState<"play"|"professional">("play");
 useEffect(()=>{const sync=()=>setMode(new URL(location.href).searchParams.get("mode")==="professional"?"professional":"play");sync();addEventListener("popstate",sync);return()=>removeEventListener("popstate",sync)},[]);
 function switchMode(){const next=mode==="play"?"professional":"play";const url=new URL(location.href);if(next==="play")url.searchParams.delete("mode");else url.searchParams.set("mode","professional");history.pushState({},"",url);setMode(next)}
 return {mode,switchMode};
}
