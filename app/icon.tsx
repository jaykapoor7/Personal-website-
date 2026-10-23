import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
        background: "#0c0c0c",
        color: "#fafaf9",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        fontSize: 42,
        paddingBottom: 6,
      }}
    >
      j
    </div>,
    { ...size },
  );
}
