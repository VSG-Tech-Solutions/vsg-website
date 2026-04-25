"use client";

import { motion } from "framer-motion";

export const BrutalistBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* Raw grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,244,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,244,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Big yellow block — brutalist editorial */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[620px] h-[620px]"
        style={{ background: "#eab308" }}
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Yellow stripe */}
      <div
        className="absolute top-[45%] left-0 w-full h-[2px]"
        style={{ background: "#eab308" }}
      />
      <div
        className="absolute top-[calc(45%+8px)] left-0 w-full h-[1px] opacity-50"
        style={{ background: "#eab308" }}
      />

      {/* Small yellow square */}
      <div
        className="absolute bottom-[20%] left-[8%] w-[160px] h-[160px] border-2"
        style={{ borderColor: "#eab308" }}
      />

      {/* Diagonal stripes corner */}
      <div
        className="absolute bottom-0 right-0 w-[280px] h-[280px] opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #eab308 0px, #eab308 2px, transparent 2px, transparent 14px)",
        }}
      />

      {/* Noise overlay for raw feel */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]" />
    </div>
  );
};
