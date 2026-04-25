"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Drop {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

export const NoirBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let drops: Drop[] = [];
    let splashes: Splash[] = [];

    const COUNT = 220;
    const ANGLE = Math.PI / 2.8; // ~64° — diagonal rain
    const DX = Math.cos(ANGLE);
    const DY = Math.sin(ANGLE);

    const init = () => {
      drops = [];
      for (let i = 0; i < COUNT; i++) {
        drops.push({
          x: Math.random() * w * 1.3 - w * 0.15,
          y: Math.random() * h,
          len: 10 + Math.random() * 22,
          speed: 9 + Math.random() * 14,
          opacity: 0.15 + Math.random() * 0.35,
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
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Rain streaks
      ctx.lineCap = "round";
      for (const d of drops) {
        d.x += DX * d.speed;
        d.y += DY * d.speed;

        if (d.y > h) {
          // spawn splash near ground
          if (Math.random() < 0.4) {
            splashes.push({
              x: d.x,
              y: h - 4 - Math.random() * 6,
              life: 0,
              maxLife: 14 + Math.random() * 10,
            });
          }
          d.y = -10;
          d.x = Math.random() * w * 1.3 - w * 0.15;
        }
        if (d.x > w + 20) {
          d.x = -20;
          d.y = Math.random() * h;
        }

        ctx.strokeStyle = `rgba(200,220,255,${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - DX * d.len, d.y - DY * d.len);
        ctx.stroke();
      }

      // Splashes — tiny expanding ellipses on ground
      splashes = splashes.filter((s) => s.life < s.maxLife);
      for (const s of splashes) {
        s.life += 1;
        const t = s.life / s.maxLife;
        const r = 1 + t * 6;
        ctx.strokeStyle = `rgba(200,220,255,${0.4 * (1 - t)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, r, r * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05060a]">
      {/* Deep night alley gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0a0d18 0%, #050810 50%, #030509 85%, #000104 100%)",
        }}
      />

      {/* Distant building silhouettes */}
      <div
        className="absolute bottom-[35%] left-0 right-0 h-[30%]"
        style={{
          background:
            "linear-gradient(to top, #0b0f1a 0%, #0a0d17 60%, transparent 100%)",
          clipPath:
            "polygon(0% 100%, 0% 55%, 8% 55%, 8% 30%, 16% 30%, 16% 50%, 24% 50%, 24% 20%, 34% 20%, 34% 45%, 42% 45%, 42% 25%, 52% 25%, 52% 40%, 62% 40%, 62% 15%, 70% 15%, 70% 38%, 78% 38%, 78% 28%, 86% 28%, 86% 48%, 94% 48%, 94% 32%, 100% 32%, 100% 100%)",
          opacity: 0.9,
        }}
      />

      {/* Tiny window lights in silhouette */}
      {[
        { x: "10%", y: "52%", c: "#fbbf24" },
        { x: "18%", y: "48%", c: "#fde047" },
        { x: "27%", y: "42%", c: "#fbbf24" },
        { x: "36%", y: "50%", c: "#facc15" },
        { x: "54%", y: "38%", c: "#fbbf24" },
        { x: "65%", y: "34%", c: "#fde047" },
        { x: "72%", y: "44%", c: "#fbbf24" },
        { x: "89%", y: "40%", c: "#facc15" },
      ].map((wnd, i) => (
        <motion.div
          key={`wnd-${i}`}
          className="absolute"
          style={{
            left: wnd.x,
            top: wnd.y,
            width: "3px",
            height: "4px",
            background: wnd.c,
            opacity: 0.7,
            boxShadow: `0 0 8px ${wnd.c}`,
          }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{
            duration: 3 + i,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* HOTEL neon sign — pink flickering */}
      <motion.div
        className="absolute"
        style={{
          top: "18%",
          left: "12%",
          fontFamily: "ui-monospace, monospace",
          fontSize: "42px",
          fontWeight: 900,
          letterSpacing: "4px",
          color: "#f43f5e",
          textShadow:
            "0 0 8px #f43f5e, 0 0 20px #f43f5e, 0 0 40px rgba(244,63,94,0.7), 0 0 70px rgba(244,63,94,0.5)",
          transform: "skewX(-4deg)",
        }}
        animate={{
          opacity: [1, 0.3, 1, 1, 0.6, 1, 1, 1, 0.9, 1],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.02, 0.04, 0.5, 0.52, 0.54, 0.7, 0.85, 0.87, 1],
        }}
      >
        HOTEL
      </motion.div>

      {/* OPEN — cyan neon, other side */}
      <motion.div
        className="absolute"
        style={{
          top: "22%",
          right: "14%",
          fontFamily: "ui-monospace, monospace",
          fontSize: "26px",
          fontWeight: 700,
          letterSpacing: "6px",
          color: "#06b6d4",
          textShadow:
            "0 0 6px #06b6d4, 0 0 16px #06b6d4, 0 0 30px rgba(6,182,212,0.6)",
          border: "2px solid #06b6d4",
          padding: "6px 14px",
          borderRadius: "2px",
          boxShadow: "0 0 14px rgba(6,182,212,0.4)",
        }}
        animate={{
          opacity: [1, 1, 1, 0.4, 1, 1, 1, 0.7, 1],
        }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.3, 0.32, 0.34, 0.36, 0.7, 0.72, 0.74, 1],
        }}
      >
        OPEN
      </motion.div>

      {/* Red neon arrow — smaller accent */}
      <motion.div
        className="absolute"
        style={{
          top: "52%",
          right: "8%",
          fontFamily: "ui-monospace, monospace",
          fontSize: "18px",
          color: "#fb7185",
          textShadow: "0 0 10px #f43f5e, 0 0 18px rgba(244,63,94,0.6)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ►►►
      </motion.div>

      {/* Volumetric fog drifting */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(244,63,94,0.14) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(6,182,212,0.1) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(100,116,139,0.2) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{ x: [0, 30, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Wet pavement reflection — bottom 30% */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[32%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10,13,24,0.4) 30%, rgba(5,6,10,0.95) 100%)",
        }}
      />

      {/* Pavement color smear — pink/cyan wet reflections */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-[30%] pointer-events-none opacity-70 mix-blend-screen"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(244,63,94,0.22) 40%, rgba(244,63,94,0.32) 75%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 80%, transparent 100%)",
          filter: "blur(14px)",
        }}
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-[28%] pointer-events-none opacity-60 mix-blend-screen"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.25) 45%, rgba(6,182,212,0.2) 80%, transparent 100%)",
          transform: "translateX(40%)",
          filter: "blur(14px)",
        }}
        animate={{ x: ["38%", "44%", "38%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Headlight sweep */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "18%",
          width: "280px",
          height: "140px",
          background:
            "radial-gradient(ellipse, rgba(255,240,200,0.35) 0%, rgba(255,240,200,0.12) 30%, transparent 70%)",
          filter: "blur(14px)",
        }}
        animate={{ x: ["-20vw", "120vw"] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 6,
        }}
      />

      {/* Heavy vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center 50%, transparent 30%, rgba(0,1,4,0.75) 95%)",
        }}
      />

      {/* Fade bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a] pointer-events-none" />
    </div>
  );
};
