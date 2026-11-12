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
        borderRadius: 18,
        background: "#2346a8",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontWeight: 700,
        fontSize: 44,
        paddingBottom: 2,
      }}
    >
      J
    </div>,
    { ...size },
  );
}
