"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Tear {
  id: number;
  top: number;
  height: number;
  offset: number;
  opacity: number;
}

export const GlitchBg: React.FC = () => {
  const [tears, setTears] = useState<Tear[]>([]);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 320 + Math.random() * 900) {
        last = t;
        // spawn a burst of 2-5 tears briefly
        const n = 2 + Math.floor(Math.random() * 4);
        const next: Tear[] = [];
        for (let i = 0; i < n; i++) {
          next.push({
            id: Math.random(),
            top: Math.random() * 100,
            height: 1 + Math.random() * 8,
            offset: (Math.random() - 0.5) * 60,
            opacity: 0.3 + Math.random() * 0.6,
          });
        }
        setTears(next);
        if (Math.random() > 0.6) setShakeKey((k) => k + 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0512]">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#140826] via-[#0a0512] to-[#000]" />

      {/* Glitch data-grid — three offset layers, RGB-split */}
      <motion.div
        key={`r-${shakeKey}`}
        className="absolute inset-0 mix-blend-screen opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,70,239,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{ x: [-4, 4, -2, 3, -4] }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        key={`g-${shakeKey}`}
        className="absolute inset-0 mix-blend-screen opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{ x: [4, -4, 2, -3, 4] }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        key={`b-${shakeKey}`}
        className="absolute inset-0 mix-blend-screen opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{ x: [2, -2, 4, -3, 2] }}
        transition={{ duration: 0.4 }}
      />

      {/* Massive diagonal datamosh bands */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`band-${i}`}
          className="absolute left-0 right-0 h-[80px]"
          style={{
            top: `${i * 18}%`,
            background:
              i % 2 === 0
                ? "linear-gradient(90deg, transparent, rgba(217,70,239,0.08), transparent)"
                : "linear-gradient(90deg, transparent, rgba(74,222,128,0.06), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.7,
          }}
        />
      ))}

      {/* Horizontal tears — jump instantly */}
      {tears.map((t) => (
        <div
          key={t.id}
          className="absolute left-0 right-0 mix-blend-difference"
          style={{
            top: `${t.top}%`,
            height: `${t.height}px`,
            background: `rgba(217,70,239,${t.opacity})`,
            transform: `translateX(${t.offset}px)`,
            boxShadow: "0 0 16px rgba(74,222,128,0.5)",
          }}
        />
      ))}

      {/* Occasional full-width magenta flash strip */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          top: "50%",
          background: "linear-gradient(90deg, transparent, #d946ef, transparent)",
          boxShadow: "0 0 12px #d946ef",
        }}
        animate={{
          top: ["20%", "65%", "35%", "80%", "15%", "50%"],
          opacity: [0, 1, 0, 1, 0, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* RGB-split dot in corner as signature */}
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest opacity-60 flex gap-1 pointer-events-none">
        <span style={{ color: "#d946ef", mixBlendMode: "screen" }}>SIGNAL</span>
        <span style={{ color: "#4ade80", mixBlendMode: "screen" }}>LOCKED</span>
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 3px)",
        }}
      />

      {/* Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0512] pointer-events-none" />
    </div>
  );
};
