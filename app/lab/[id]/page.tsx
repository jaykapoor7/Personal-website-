import { notFound } from "next/navigation";
import { ConceptDesk } from "@/components/lab/ConceptDesk";
import { ConceptAtlas } from "@/components/lab/ConceptAtlas";
import { ConceptPress } from "@/components/lab/ConceptPress";
import { MorphStudy } from "@/components/lab/MorphStudy";
export const metadata={robots:{index:false,follow:false}};
export function generateStaticParams(){return [{id:"desk"},{id:"atlas"},{id:"press"},{id:"morph"}]}
export default function Concept({params}:{params:{id:string}}){if(params.id==="desk")return <ConceptDesk/>;if(params.id==="atlas")return <ConceptAtlas/>;if(params.id==="press")return <ConceptPress/>;if(params.id==="morph")return <MorphStudy/>;notFound()}
