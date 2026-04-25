"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

export const CosmosBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    const STAR_COUNT = 520;
    const SPEED = 0.6; // warp speed

    const reset = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() * 2 - 1) * w,
          y: (Math.random() * 2 - 1) * h,
          z: Math.random() * w,
          pz: 0,
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
      reset();
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      // Slight trail — dark blue/purple fade
      ctx.fillStyle = "rgba(4, 3, 15, 0.25)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= SPEED * 6;
        if (s.z < 1) {
          s.x = (Math.random() * 2 - 1) * w;
          s.y = (Math.random() * 2 - 1) * h;
          s.z = w;
          s.pz = s.z;
        }

        const sx = (s.x / s.z) * 200 + cx;
        const sy = (s.y / s.z) * 200 + cy;
        const px = (s.x / s.pz) * 200 + cx;
        const py = (s.y / s.pz) * 200 + cy;

        const size = Math.max(0.4, (1 - s.z / w) * 2.4);
        const alpha = 0.2 + (1 - s.z / w) * 0.8;

        // Star color - subtle hue variance toward blue/violet
        const hueMix = (s.x + s.y) * 0.0005;
        const colorR = Math.floor(200 + hueMix * 40);
        const colorG = Math.floor(210 + hueMix * 20);
        const colorB = 255;

        ctx.strokeStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
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
    <div className="absolute inset-0 overflow-hidden bg-[#04030f]">
      {/* Deep nebula gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04030f] via-[#0a0820] to-[#04030f]" />

      {/* Parallax star streaks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Nebula cloud 1 — blue */}
      <motion.div
        className="absolute top-[12%] left-[8%] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.35) 0%, rgba(96,165,250,0.08) 40%, transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Nebula cloud 2 — violet */}
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(192,132,252,0.3) 0%, rgba(192,132,252,0.05) 45%, transparent 70%)",
        }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Distant galaxy streak */}
      <div
        className="absolute top-[35%] left-[-10%] w-[120%] h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(96,165,250,0.4) 40%, rgba(192,132,252,0.3) 60%, transparent)",
          transform: "rotate(-6deg)",
        }}
      />

      {/* Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04030f] pointer-events-none" />
    </div>
  );
};
