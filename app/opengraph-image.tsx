import { ImageResponse } from "next/og";
import { ventures } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Jay Kapoor. I find broken systems and try to find solutions.";

/** The card shown when the site is shared: the same sentence as the home page. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fafaf8",
        color: "#16181d",
        padding: "64px 76px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: "#5b606b",
        }}
      >
        <span>kapoorjay.com</span>
        <span style={{ color: "#2346a8" }}>Now building StrayPaw</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        <span>Jay Kapoor</span>
        <span style={{ fontSize: 44, letterSpacing: "-0.02em", marginTop: 22 }}>
          I find broken systems and try to find solutions.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 40,
          fontSize: 26,
          color: "#5b606b",
          borderTop: "1px solid #e4e4df",
          paddingTop: 24,
        }}
      >
        {ventures.map((v) => (
          <span key={v.id}>{v.name}</span>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
