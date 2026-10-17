/** Existing small builds only. Add a new entry when an original experiment is ready. */
export const playItems = [
  {slug:"road360",title:"Road360",kind:"Driving experiment",description:"A drive through Delhi, with the road itself as the data.",href:"https://road360.vercel.app/",mark:"↝",palette:"road",preview:"A road that responds"},
  {slug:"recovery-intelligence",title:"Recovery Intelligence",kind:"Health data experiment",description:"A simpler explanation of recovery and activity numbers.",href:"https://explain-my-whoop-stats.vercel.app/",mark:"◒",palette:"recovery",preview:"Make sense of the numbers"},
  {slug:"search-visibility",title:"Search visibility checker",kind:"Search tool",description:"A quick look at how a website shows up in search and AI answers.",href:"https://llm-ai-search-checker.vercel.app/",mark:"⌕",palette:"search",preview:"Find what is visible"},
  {slug:"juno-preventive-health",title:"Juno Preventive Health",kind:"Healthcare experiment",description:"An early attempt to make preventive health information easier to use.",href:"https://preventive-healthcare-xi.vercel.app/",mark:"✳",palette:"health",preview:"A little more clarity"},
] as const;
export type PlayItem = typeof playItems[number];
