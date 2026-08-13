import { ImageResponse } from "next/og";

// Social share card (1200x630), generated at build time. On-brand dark
// editorial layout so links to the site preview cleanly everywhere.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jay Kapoor — Portfolio";

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
          background: "#f5f0e6",
          color: "#242019",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7c756a",
          }}
        >
          Creator &amp; Operator · Pittsburgh, PA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Jay Kapoor
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#7c756a",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Fintech, healthtech &amp; investment research — the work behind the
            resume.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#7c756a" }}>@jaybuildsvx</div>
      </div>
    ),
    { ...size },
  );
}
