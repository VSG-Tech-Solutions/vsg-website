"use client";

import { motion } from "framer-motion";

export const SolarBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#120a04]">
      {/* Warm base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d1007] via-[#120a04] to-[#0a0502]" />

      {/* Sun orb */}
      <motion.div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.55) 0%, rgba(251,191,36,0.2) 30%, rgba(249,115,22,0.05) 55%, transparent 75%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Amber ember bottom left */}
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Peach accent */}
      <div
        className="absolute top-[55%] right-[8%] w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(254,215,170,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal glow lines */}
      <div
        className="absolute top-[38%] left-0 w-full h-[1px] opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#120a04]" />
    </div>
  );
};
