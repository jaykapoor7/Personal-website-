import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Photos } from "./Photos";
import { WorkIndex } from "./WorkIndex";

/**
 * The whole site on one page. The hero stays put while one white sheet
 * slides up over it; on the sheet are a short introduction, an index of
 * everything I have done, and the photos.
 */
export function Home() {
  return (
    <div className="relative">
      <Hero />
      <div className="relative z-10 -mt-14 rounded-t-[28px] bg-bg md:rounded-t-[44px]">
        <Intro />
        <WorkIndex />
        <Photos />
      </div>
    </div>
  );
}
