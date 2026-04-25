"use client";

import { motion } from "framer-motion";
import { Lightning } from "../Lightning";

export const EmberBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0e0703]">
      {/* Warm base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1f0d05] via-[#110704] to-[#06030a]" />

      {/* Sun orb behind the storm */}
      <motion.div
        className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(251,146,60,0.55) 0%, rgba(253,224,71,0.2) 30%, rgba(251,146,60,0.05) 55%, transparent 75%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Amber lightning — hue 30 = orange/amber */}
      <div className="absolute inset-0 h-[110vh] mix-blend-screen opacity-[0.85]">
        <Lightning hue={28} xOffset={0} speed={1.6} intensity={0.7} size={2.1} />
      </div>

      {/* Cross-lightning on right to make it feel stormy */}
      <div className="absolute inset-0 h-[110vh] mix-blend-screen opacity-60">
        <Lightning
          hue={45}
          xOffset={0.4}
          speed={2.1}
          intensity={0.5}
          size={1.7}
        />
      </div>

      {/* Ember particles floating up */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${(i * 83) % 100}%`,
            bottom: "-10px",
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            background:
              i % 2 === 0
                ? "rgba(251,191,36,0.9)"
                : "rgba(251,146,60,0.9)",
            boxShadow: "0 0 10px rgba(251,146,60,0.9)",
          }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, (i % 2 === 0 ? 30 : -30) + "px", 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + (i % 5),
            delay: i * 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Bottom fog darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0703]/40 to-[#0e0703]" />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};
