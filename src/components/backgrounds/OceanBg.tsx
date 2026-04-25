"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  hue: number;
  phase: number;
}

export const OceanBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    const COUNT = 60;

    const init = () => {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 2.5,
          vy: -0.15 - Math.random() * 0.35,
          vx: (Math.random() - 0.5) * 0.25,
          hue: 170 + Math.random() * 40, // teal to cyan
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t + p.phase) * 0.15;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const pulse = 0.6 + 0.4 * Math.sin(t * 1.5 + p.phase);

        ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.9)`;
        ctx.shadowBlur = 16;
        ctx.fillStyle = `hsla(${p.hue}, 95%, 80%, ${0.55 * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020812]">
      {/* Depth gradient — light from surface, black at depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0d3a52 0%, #072540 25%, #020812 65%, #000307 100%)",
        }}
      />

      {/* Light shafts from surface */}
      {[15, 35, 55, 75].map((x, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-[60%] w-[140px] pointer-events-none"
          style={{
            left: `${x}%`,
            background:
              "linear-gradient(to bottom, rgba(186,250,255,0.18), transparent 80%)",
            filter: "blur(8px)",
            transformOrigin: "top center",
            transform: "skewX(-8deg)",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4], x: [0, 12, -8, 0] }}
          transition={{
            duration: 8 + i,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Caustic light patches dancing on surface */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[40%] opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 10%, rgba(103,232,249,0.45), transparent 45%), radial-gradient(ellipse at 70% 15%, rgba(20,184,166,0.35), transparent 50%), radial-gradient(ellipse at 50% 8%, rgba(186,250,255,0.3), transparent 40%)",
          filter: "blur(30px)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 10, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bioluminescent canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Rising bubbles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`b-${i}`}
          className="absolute rounded-full border"
          style={{
            left: `${(i * 71) % 100}%`,
            bottom: "-20px",
            width: `${5 + (i % 4) * 3}px`,
            height: `${5 + (i % 4) * 3}px`,
            borderColor: "rgba(186,250,255,0.6)",
            background: "rgba(186,250,255,0.08)",
            boxShadow:
              "inset 2px 2px 0 rgba(255,255,255,0.3), 0 0 8px rgba(103,232,249,0.4)",
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [0, (i % 2 === 0 ? 20 : -20) + "px", 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 10 + (i % 5) * 2,
            delay: i * 0.9,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Deep teal haze glow */}
      <motion.div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(20,184,166,0.2) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center 40%, transparent 40%, rgba(2,8,18,0.7) 90%)",
        }}
      />

      {/* Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020812] pointer-events-none" />
    </div>
  );
};
