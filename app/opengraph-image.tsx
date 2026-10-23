import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Jay Kapoor. Founder of StrayPaw. Economics and Statistics at Pitt.";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f2f0eb",
        color: "#0f0f0e",
        padding: "72px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ fontSize: 28, color: "#62605a" }}>kapoorjay.com</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          }}
        >
          Jay Kapoor
        </div>
        <div style={{ fontSize: 40, color: "#62605a", marginTop: 28 }}>
          Founder of StrayPaw. Economics and Statistics at Pitt.
        </div>
      </div>
      <div style={{ display: "flex", gap: 48, fontSize: 28, color: "#d64226" }}>
        <span>30,288 animal records</span>
        <span>10,000+ Juno-AI users</span>
      </div>
    </div>,
    { ...size },
  );
}
