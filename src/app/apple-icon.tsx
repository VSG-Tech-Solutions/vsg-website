import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background:
            "radial-gradient(circle at 30% 20%, #67e8f9 0%, #14b8a6 45%, #0d9488 100%)",
          boxShadow: "inset 0 -10px 30px rgba(2,8,18,0.35)",
          color: "#020812",
          fontSize: 108,
          fontWeight: 800,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: -4,
        }}
      >
        V
      </div>
    ),
    { ...size }
  );
}
