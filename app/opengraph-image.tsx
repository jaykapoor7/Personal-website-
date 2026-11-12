import { ImageResponse } from "next/og";
import { ventures } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Jay Kapoor. I find broken systems and try to find solutions.";

/** The card shown when the site is shared: the same sentence as the landing page. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        color: "#1638c8",
        padding: "64px 76px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: "#4259c2",
        }}
      >
        <span>kapoorjay.com</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        <span>Jay Kapoor</span>
        <span style={{ fontSize: 44, letterSpacing: "-0.02em", marginTop: 22 }}>
          I find broken systems and try to find solutions.
        </span>
      </div>
      <div style={{ display: "flex", gap: 40, fontSize: 28, color: "#4259c2" }}>
        {ventures.map((v) => (
          <span key={v.id}>{v.name}</span>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
