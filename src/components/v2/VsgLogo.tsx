"use client";

/**
 * VsgLogo — clean inline SVG mark + wordmark.
 *
 * Mark: angular "V" shape rendered in orange — single unbroken stroke,
 * reads as a chevron + a hint of "v"-for-VSG. Wordmark: "VSG" in
 * heavy Geist next to it. Sized via the `size` prop (defaults to 22).
 *
 * Used in the navbar (small) and the footer (larger). Pass
 * `wordmark={false}` for the icon-only version.
 */

type Props = {
  size?: number;
  wordmark?: boolean;
  className?: string;
};

export const VsgLogo: React.FC<Props> = ({
  size = 22,
  wordmark = true,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="VSG"
    >
      <svg
        width={size * 1.25}
        height={size}
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        {/* Bold V — single stroke, rounded caps */}
        <path
          d="M3 4 L15 20 L27 4"
          stroke="#FF6B2C"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner shadow stroke for a slight 3D feel */}
        <path
          d="M3 4 L15 20 L27 4"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ mixBlendMode: "overlay" }}
        />
      </svg>

      {wordmark && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            fontSize: size * 0.78,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "currentColor",
          }}
        >
          VSG
        </span>
      )}
    </span>
  );
};
