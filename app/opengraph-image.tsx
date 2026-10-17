import { ImageResponse } from "next/og";
export const size={width:1200,height:630};
export const contentType="image/png";
export const alt="Jay Kapoor — personal website";
export default function OpengraphImage(){return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#f3f0e7",color:"#183a31",padding:"65px 75px",fontFamily:"Georgia,serif"}}><div style={{fontFamily:"Arial,sans-serif",fontSize:22,letterSpacing:".1em",textTransform:"uppercase"}}>A personal site / Pittsburgh, PA</div><div style={{display:"flex",fontSize:125,letterSpacing:"-.06em",lineHeight:.95}}>Jay Kapoor<span style={{color:"#bd5d3b"}}>.</span></div><div style={{fontFamily:"Arial,sans-serif",fontSize:28}}>StrayPaw, research, and other work.</div></div>,{...size})}
