"use client";

import { motion } from "framer-motion";

export const MidCenturyBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f1e5]">
      {/* Warm cream paper gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, #fffaf0 0%, #f7f1e5 45%, #efe5d1 100%)",
        }}
      />

      {/* Big coral circle — Eames signature */}
      <motion.div
        className="absolute"
        style={{
          top: "-8%",
          right: "-6%",
          width: "520px",
          height: "520px",
          borderRadius: "9999px",
          background: "#c2410c",
          opacity: 0.9,
        }}
        animate={{ y: [0, 14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Teal half-moon arc, lower-left */}
      <motion.div
        className="absolute bottom-[12%] left-[-120px]"
        style={{
          width: "420px",
          height: "420px",
          borderRadius: "9999px",
          border: "40px solid #0f766e",
          borderLeftColor: "transparent",
          borderBottomColor: "transparent",
          transform: "rotate(-45deg)",
          opacity: 0.75,
        }}
        animate={{ rotate: [-45, -40, -45] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mustard triangle, upper-left */}
      <motion.div
        className="absolute"
        style={{
          top: "18%",
          left: "8%",
          width: 0,
          height: 0,
          borderLeft: "90px solid transparent",
          borderRight: "90px solid transparent",
          borderBottom: "160px solid #ca8a04",
          opacity: 0.85,
        }}
        animate={{ rotate: [0, 8, 0], y: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navy dot cluster — playful */}
      <div className="absolute bottom-[26%] right-[16%]">
        {[
          { x: 0, y: 0, s: 14, o: 0.9 },
          { x: 28, y: -18, s: 10, o: 0.75 },
          { x: -22, y: 20, s: 8, o: 0.65 },
          { x: 40, y: 18, s: 6, o: 0.55 },
        ].map((d, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: d.x,
              top: d.y,
              width: d.s,
              height: d.s,
              background: "#1e3a8a",
              opacity: d.o,
            }}
            animate={{ y: [d.y, d.y - 6, d.y] }}
            transition={{
              duration: 6 + i,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Thin horizontal rule — editorial */}
      <div
        className="absolute left-[10%] right-[10%] top-[52%] h-[1px]"
        style={{ background: "rgba(31,23,18,0.3)" }}
      />

      {/* Concentric Eames-style curve, faint */}
      <svg
        className="absolute"
        style={{
          right: "22%",
          top: "55%",
          opacity: 0.5,
        }}
        width="220"
        height="220"
        viewBox="0 0 220 220"
      >
        {[30, 55, 80, 105].map((r, i) => (
          <motion.path
            key={i}
            d={`M 10 ${110 + r} A ${r} ${r} 0 0 1 ${10 + 2 * r} ${110 + r}`}
            fill="none"
            stroke={i % 2 === 0 ? "#c2410c" : "#0f766e"}
            strokeWidth={3}
            animate={{ pathLength: [0.8, 1, 0.8] }}
            transition={{
              duration: 8 + i,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Paper grain */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(31,23,18,0.06) 100%)",
        }}
      />

      {/* Fade bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f7f1e5] pointer-events-none" />
    </div>
  );
};
