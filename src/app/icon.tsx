import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Static port of <VSGLogo /> — 8 elliptical petals radiating from centre.
// Sparkle is dropped at this size (illegible noise at 32×32 once browsers
// downscale). Petals render in cream (#f0fdfa) on the brand teal gradient.
const petals = Array.from({ length: 8 }, (_, i) => i * 45);

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
          borderRadius: 14,
          background: "linear-gradient(145deg, #14b8a6, #0d9488)",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 100 100">
          <g transform="translate(50 50)">
            {petals.map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <ellipse cx="0" cy="-24" rx="8" ry="20" fill="#f0fdfa" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
