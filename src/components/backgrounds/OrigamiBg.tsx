"use client";

import { motion } from "framer-motion";

// Tiny crane silhouette — stylized folded paper bird
const Crane: React.FC<{ color: string; scale?: number }> = ({
  color,
  scale = 1,
}) => (
  <svg
    width={80 * scale}
    height={60 * scale}
    viewBox="0 0 80 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Body */}
    <path
      d="M 10 30 L 40 20 L 70 32 L 40 38 Z"
      fill={color}
      opacity="0.85"
    />
    {/* Left wing fold */}
    <path
      d="M 40 20 L 30 5 L 45 22 Z"
      fill={color}
      opacity="0.55"
    />
    {/* Right wing fold */}
    <path
      d="M 40 20 L 58 6 L 46 24 Z"
      fill={color}
      opacity="0.7"
    />
    {/* Head/beak */}
    <path
      d="M 70 32 L 78 28 L 72 34 Z"
      fill={color}
      opacity="0.9"
    />
    {/* Tail */}
    <path
      d="M 10 30 L 2 24 L 12 34 Z"
      fill={color}
      opacity="0.75"
    />
    {/* Fold crease */}
    <path
      d="M 10 30 L 70 32"
      stroke={color}
      strokeOpacity="0.3"
      strokeWidth="0.5"
    />
  </svg>
);

export const OrigamiBg: React.FC = () => {
  // Drift seed positions for 6 cranes
  const cranes = [
    { left: "8%", delay: 0, dur: 28, scale: 0.9, color: "#1a1a1a", x: 40 },
    { left: "22%", delay: 3, dur: 34, scale: 1.2, color: "#be123c", x: -30 },
    { left: "42%", delay: 6, dur: 30, scale: 0.7, color: "#1a1a1a", x: 25 },
    { left: "58%", delay: 1.5, dur: 36, scale: 1, color: "#9a3412", x: -20 },
    { left: "74%", delay: 4.5, dur: 32, scale: 0.85, color: "#1a1a1a", x: 35 },
    { left: "88%", delay: 7, dur: 38, scale: 1.1, color: "#be123c", x: -15 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f5f2e9]">
      {/* Warm rice paper gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 15%, #fffdf5 0%, #f5f2e9 50%, #ece5d3 100%)",
        }}
      />

      {/* Subtle fold creases — diagonal light lines */}
      {[
        { x1: 0, y1: 40, x2: 100, y2: 15 },
        { x1: 0, y1: 70, x2: 100, y2: 55 },
        { x1: 20, y1: 0, x2: 60, y2: 100 },
      ].map((ln, i) => (
        <svg
          key={`fold-${i}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line
            x1={ln.x1}
            y1={ln.y1}
            x2={ln.x2}
            y2={ln.y2}
            stroke="rgba(26,26,26,0.08)"
            strokeWidth="0.15"
            strokeDasharray="0.6 0.4"
          />
        </svg>
      ))}

      {/* Ensō ink circle — brush stroke */}
      <motion.svg
        className="absolute"
        style={{ top: "18%", right: "12%" }}
        width="240"
        height="240"
        viewBox="0 0 240 240"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0] }}
        transition={{
          duration: 14,
          times: [0, 0.2, 0.85, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.path
          d="M 120 30 A 90 90 0 1 1 60 180"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="10"
          strokeLinecap="round"
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            duration: 14,
            times: [0, 0.3, 0.8, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: "url(#inkBleed)" }}
        />
        <defs>
          <filter id="inkBleed">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
      </motion.svg>

      {/* Drifting paper cranes — falling and rotating */}
      {cranes.map((c, i) => (
        <motion.div
          key={`crane-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: c.left,
            top: "-80px",
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, c.x, -c.x / 2, c.x, 0],
            rotate: [0, 15, -10, 20, 360],
          }}
          transition={{
            duration: c.dur,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Crane color={c.color} scale={c.scale} />
        </motion.div>
      ))}

      {/* Vermilion seal stamp — upper left */}
      <motion.div
        className="absolute"
        style={{
          top: "8%",
          left: "7%",
          width: "78px",
          height: "78px",
        }}
        animate={{ rotate: [-4, -2, -4], scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: "#be123c",
            border: "3px solid #9a1037",
            borderRadius: "6px",
            boxShadow: "0 2px 0 rgba(154,16,55,0.35)",
            transform: "rotate(-6deg)",
          }}
        >
          <span
            style={{
              color: "#f5f2e9",
              fontFamily: "serif",
              fontSize: "32px",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            印
          </span>
        </div>
      </motion.div>

      {/* Folded paper plane silhouette — faint, bottom right */}
      <motion.svg
        className="absolute"
        style={{ bottom: "14%", right: "8%", opacity: 0.2 }}
        width="180"
        height="120"
        viewBox="0 0 180 120"
        animate={{ y: [0, -8, 0], rotate: [-4, 2, -4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 10 60 L 160 20 L 100 70 Z" fill="#1a1a1a" opacity="0.6" />
        <path d="M 100 70 L 160 20 L 140 90 Z" fill="#1a1a1a" opacity="0.35" />
        <path d="M 10 60 L 100 70 L 60 100 Z" fill="#1a1a1a" opacity="0.25" />
      </motion.svg>

      {/* Minimal ink brush stroke horizontal — mid page accent */}
      <motion.div
        className="absolute left-[12%] top-[62%]"
        style={{
          width: "180px",
          height: "4px",
          background:
            "linear-gradient(to right, transparent, #1a1a1a 20%, #1a1a1a 80%, transparent)",
          borderRadius: "50%",
          filter: "blur(0.5px)",
          opacity: 0.7,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{
          duration: 10,
          times: [0, 0.3, 0.75, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Haiku-style vertical dots — tranquil rhythm */}
      <div
        className="absolute"
        style={{ top: "30%", left: "46%" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`dot-${i}`}
            className="rounded-full mb-3"
            style={{
              width: "6px",
              height: "6px",
              background: "#1a1a1a",
              opacity: 0.5,
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Paper grain texture */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Warm vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(120,80,40,0.12) 100%)",
        }}
      />

      {/* Fade bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f2e9] pointer-events-none" />
    </div>
  );
};
