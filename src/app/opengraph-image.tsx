import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "VSG Tech Solutions — Vantage. The operational control layer your ERP was never designed to be.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 20% 10%, rgba(20, 184, 166, 0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(103, 232, 249, 0.18), transparent 55%), #020812",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top row — brand lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(145deg, #14b8a6, #0d9488)",
              boxShadow: "0 0 40px rgba(20, 184, 166, 0.6)",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#020812",
            }}
          >
            V
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 6,
              background: "linear-gradient(120deg, #f8fafc 0%, #67e8f9 60%, #14b8a6 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            VSG
          </div>
          <div
            style={{
              marginLeft: 12,
              fontSize: 13,
              letterSpacing: 5,
              color: "#67e8f9",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Tech Solutions
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#67e8f9",
              fontWeight: 600,
            }}
          >
            Vantage — Operational Control Platform
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 800,
              color: "#f8fafc",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span>Your ERP tracks clean transactions.</span>
            <span
              style={{
                background:
                  "linear-gradient(120deg, #67e8f9 0%, #14b8a6 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Who tracks the exceptions?
            </span>
          </div>
        </div>

        {/* Bottom trust row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 20,
            color: "#94a3b8",
            letterSpacing: 1.5,
          }}
        >
          <span>Pilot cohort · first 5 clients</span>
          <span style={{ color: "#14b8a6" }}>·</span>
          <span>50% off setup · free support</span>
          <span style={{ color: "#14b8a6" }}>·</span>
          <span>POPIA · Cape Town</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
