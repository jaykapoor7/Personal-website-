import { ImageResponse } from "next/og";
export const size={width:64,height:64};
export const contentType="image/png";
export default function Icon(){return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:32,background:"#183a31",color:"#f3f0e7",fontFamily:"Georgia,serif",fontSize:40,paddingBottom:5}}>j.</div>,{...size})}
