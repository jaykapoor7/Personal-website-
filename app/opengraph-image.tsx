import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Jay Kapoor — founder of StrayPaw. Economics & Statistics at Pitt.";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0b0b",
        color: "#f5f5f4",
        padding: "70px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 24,
          color: "#a3a39e",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            background: "#22c55e",
          }}
        />
        Currently building StrayPaw
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 120, letterSpacing: "-0.05em", lineHeight: 1 }}>
          Jay Kapoor
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#a3a39e",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.25,
          }}
        >
          Software for messy, real-world systems — animal welfare, healthcare
          access, and the operations behind them.
        </div>
      </div>
      <div style={{ display: "flex", gap: 48, fontSize: 24, color: "#fb923c" }}>
        <span>30k+ animal records</span>
        <span>10k+ Juno-AI users</span>
        <span>Pitt Econ & Stats ’28</span>
      </div>
    </div>,
    { ...size },
  );
}
