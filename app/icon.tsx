import { ImageResponse } from "next/og";

// Favicon, generated at build time — a "JK" monogram matching the site's
// black-and-white editorial mark. No binary asset to maintain.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f4f2ed",
          fontSize: 34,
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.04em",
        }}
      >
        JK
      </div>
    ),
    { ...size },
  );
}
