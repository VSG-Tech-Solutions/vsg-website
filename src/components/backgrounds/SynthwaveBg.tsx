"use client";

import { motion } from "framer-motion";

export const SynthwaveBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0f0524]">
      {/* Sunset sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #2b0a4a 0%, #4a0a5e 25%, #8a1464 50%, #ec4899 65%, #f59e0b 72%, #0f0524 80%)",
        }}
      />

      {/* Big retro sun */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[32%] w-[420px] h-[420px] rounded-full overflow-hidden">
        {/* Gradient body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #fde047 0%, #fb923c 40%, #ec4899 70%, #a855f7 100%)",
            boxShadow:
              "0 0 120px rgba(236,72,153,0.6), 0 0 200px rgba(168,85,247,0.4)",
          }}
        />
        {/* Horizontal slicing bars — vaporwave sun */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 18px, #0f0524 18px, #0f0524 22px)",
            maskImage:
              "linear-gradient(to top, black 55%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 55%, transparent 55%)",
          }}
        />
      </div>

      {/* Stars in upper sky */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 13) % 40}%`,
            width: `${1 + (i % 3) * 0.5}px`,
            height: `${1 + (i % 3) * 0.5}px`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2 + (i % 4),
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Horizon glow line */}
      <div
        className="absolute left-0 right-0 top-[50%] h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, #22d3ee, #ec4899, #22d3ee, transparent)",
          boxShadow:
            "0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 4px #22d3ee",
        }}
      />

      {/* Perspective grid floor */}
      <div
        className="absolute left-0 right-0 top-[50%] bottom-0"
        style={{
          perspective: "600px",
          perspectiveOrigin: "50% 0%",
        }}
      >
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[300%] h-full"
          style={{
            transformOrigin: "50% 0%",
            transform: "rotateX(65deg)",
            backgroundImage:
              "linear-gradient(to right, rgba(236,72,153,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          animate={{ backgroundPositionY: ["0px", "80px"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Horizon magenta haze */}
      <div
        className="absolute left-0 right-0 top-[46%] h-[20%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(236,72,153,0.5), transparent 70%)",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.6) 3px, rgba(0,0,0,0.6) 4px)",
        }}
      />

      {/* Fade bottom so content below is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0524] pointer-events-none" />
    </div>
  );
};
