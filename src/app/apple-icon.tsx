import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// 180×180 home-screen icon — full mark including corner sparkle (legible at
// this size). Petals + sparkle in cream on the brand teal gradient.
const petals = Array.from({ length: 8 }, (_, i) => i * 45);

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
        }}
      >
        <svg width="140" height="140" viewBox="0 0 100 100">
          <g transform="translate(50 50)">
            {petals.map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <ellipse cx="0" cy="-24" rx="8" ry="20" fill="#f0fdfa" />
              </g>
            ))}
          </g>
          <g transform="translate(82 82)">
            <path
              d="M0,-7 L1.6,-1.6 L7,0 L1.6,1.6 L0,7 L-1.6,1.6 L-7,0 L-1.6,-1.6 Z"
              fill="#f0fdfa"
            />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
