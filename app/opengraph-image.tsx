import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jay Kapoor — personal website";
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f4f0",
          color: "#17181c",
          padding: "65px 75px",
          fontFamily: "Arial,sans-serif",
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
          Jay Kapoor · Software, data, access to care.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 125,
            letterSpacing: "-.06em",
            lineHeight: 0.95,
          }}
        >
          Jay Kapoor<span style={{ color: "#304cf4" }}>.</span>
        </div>
        <div style={{ fontFamily: "Arial,sans-serif", fontSize: 28 }}>
          I build systems for real-world problems.
        </div>
      </div>
    ),
    { ...size },
  );
}
