/** Playground contains only interactive work built for this website. */
export const playItems=[{slug:"everything-falls",title:"Everything Falls",kind:"Interactive experiment",description:"A small collection of everyday things with gravity, momentum, and a mind of their own.",href:"/play/everything-falls"}] as const;
export type PlayItem=typeof playItems[number];
