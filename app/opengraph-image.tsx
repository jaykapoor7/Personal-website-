import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Jay Kapoor. I notice what's missing, then I build it. Founder of StrayPaw.";

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
        <span>Jay Kapoor</span>
        <span>kapoorjay.com</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 112,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
        }}
      >
        <span>I notice</span>
        <span
          style={{
            background: "#1d4af5",
            color: "#ffffff",
            padding: "0 14px",
            borderRadius: 12,
            alignSelf: "flex-start",
          }}
        >
          what&apos;s missing,
        </span>
        <span>then I build it.</span>
      </div>
      <div style={{ display: "flex", gap: 44, fontSize: 28, color: "#4259c2" }}>
        <span>Founder of StrayPaw</span>
        <span>30,288 animals on record</span>
        <span>Economics and Statistics at Pitt</span>
      </div>
    </div>,
    { ...size },
  );
}
