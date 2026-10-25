"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Shot } from "@/content/site";
import { BrowserFrame } from "./frames";

/** The real site scrolls inside its window as you scroll the page. */
export function ScrollShot({
  shot,
  label,
  name,
}: {
  shot: Shot;
  label: string;
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Server HTML assumes motion; switch after mount so hydration matches.
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefers;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const tall = !reduce && !!shot.scroll;
  const ratio = shot.ratio ?? 3;
  // The frame shows a 16:10 window, so the image can travel the rest of its height.
  const travel = (1 - 0.625 / ratio) * 100;
  const y = useTransform(scrollYProgress, [0.05, 0.95], ["0%", `-${travel}%`]);
  const tilt = useTransform(scrollYProgress, [0, 0.15], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);

  return (
    <div ref={ref} className={tall ? "h-[220vh]" : ""}>
      <div className={tall ? "sticky top-[72px]" : ""}>
        <motion.div
          style={
            tall ? { rotateX: tilt, scale, transformPerspective: 1400 } : {}
          }
          className="deep-shadow mx-auto max-w-[1100px] rounded-[14px]"
        >
          <BrowserFrame url={shot.url}>
            <div
              className="relative aspect-[16/10] overflow-hidden"
              style={{ viewTransitionName: name }}
            >
              {tall ? (
                <motion.div style={{ y }} className="absolute inset-x-0 top-0">
                  <Image
                    src={shot.scroll!}
                    alt={`${label}, the whole home page`}
                    width={1200}
                    height={Math.round(1200 * ratio)}
                    sizes="(max-width: 1100px) 100vw, 1100px"
                    className="w-full"
                    priority
                  />
                </motion.div>
              ) : (
                <Image
                  src={shot.src}
                  alt={`${label} home page`}
                  fill
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className="object-cover object-top"
                  priority
                />
              )}
            </div>
          </BrowserFrame>
        </motion.div>
        {tall && (
          <p className="mt-4 text-center text-[13px] font-medium text-muted">
            Scroll to see the whole site
          </p>
        )}
      </div>
    </div>
  );
}
