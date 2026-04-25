"use client";

import { motion } from "framer-motion";

export const Aurora: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0b1e]">
      {/* Deep indigo base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#111333] to-[#0a0b1e]" />

      {/* Violet orb */}
      <motion.div
        className="absolute top-[15%] left-[20%] w-[700px] h-[700px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)",
        }}
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan orb */}
      <motion.div
        className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.45) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)",
        }}
        animate={{ x: [0, -50, 40, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pink highlight */}
      <motion.div
        className="absolute top-[45%] left-[60%] w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glass noise */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Fade to bg at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b1e]" />
    </div>
  );
};
