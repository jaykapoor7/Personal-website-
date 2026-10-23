import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jay Kapoor — personal website";
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f7f6ef",
        color: "#273e35",
        padding: "65px 75px",
        fontFamily: "Georgia,serif",
      }}
    >
      <div
        style={{
          fontFamily: "Arial,sans-serif",
          fontSize: 22,
          letterSpacing: ".1em",
          textTransform: "uppercase",
        }}
      >
        Software. Research. Access to care.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 125,
          letterSpacing: "-.06em",
          lineHeight: 0.95,
        }}
      >
        Jay Kapoor<span style={{ color: "#e65e38" }}>.</span>
      </div>
      <div style={{ fontFamily: "Arial,sans-serif", fontSize: 28 }}>
        Individual stories. Shared infrastructure.
      </div>
    </div>,
    { ...size },
  );
}
