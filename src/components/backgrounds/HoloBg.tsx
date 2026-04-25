"use client";

import { motion } from "framer-motion";

export const HoloBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#111116]">
      {/* Polished chrome base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 10%, #2a2a36 0%, #111116 55%, #08080c 100%)",
        }}
      />

      {/* Large iridescent conic gradient — rotates slowly */}
      <motion.div
        className="absolute -inset-[20%] blur-3xl opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, #a78bfa 0%, #5eead4 15%, #fde047 30%, #fb7185 45%, #60a5fa 60%, #c084fc 75%, #5eead4 90%, #a78bfa 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Second conic rotating opposite — adds interference */}
      <motion.div
        className="absolute -inset-[10%] blur-[120px] opacity-40 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 180deg at 30% 70%, #22d3ee 0%, #a855f7 25%, #f472b6 50%, #fb923c 75%, #22d3ee 100%)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Hue-shifting blob that drifts — adds shimmer motion */}
      <motion.div
        className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full blur-3xl opacity-50 mix-blend-color-dodge"
        style={{
          background:
            "radial-gradient(circle, #67e8f9 0%, #a78bfa 50%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -60, 40, 0],
          filter: [
            "hue-rotate(0deg)",
            "hue-rotate(90deg)",
            "hue-rotate(180deg)",
            "hue-rotate(270deg)",
            "hue-rotate(360deg)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fine concentric chrome rings */}
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Sharp specular highlight streaking across — slow */}
      <motion.div
        className="absolute top-0 left-0 h-full w-[40%] pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
          filter: "blur(20px)",
        }}
        animate={{ x: ["-100%", "350%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dark chrome darkening in center-to-edges for body */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(17,17,22,0.65) 70%, #111116 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111116] pointer-events-none" />
    </div>
  );
};
