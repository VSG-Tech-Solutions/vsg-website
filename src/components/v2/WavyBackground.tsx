"use client";

import { useEffect, useRef } from "react";

/**
 * WavyBackground — Aceternity-school flowing waves.
 *
 * Multiple sine waves drawn to canvas, each with its own amplitude,
 * frequency, phase and speed. Combined creates a slow flowing
 * landscape of overlapping warm waves at the bottom of the section.
 *
 * Pure canvas animation — no React per-frame work.
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
};

const WAVES = [
  { amp: 60,  freq: 0.0035, speed: 0.0008, color: "#FF6B2C", weight: 0.85 },
  { amp: 80,  freq: 0.0024, speed: 0.0006, color: "#FFB45C", weight: 0.65 },
  { amp: 100, freq: 0.0018, speed: 0.0011, color: "#FF4500", weight: 0.55 },
  { amp: 50,  freq: 0.0050, speed: 0.0014, color: "#FFD580", weight: 0.45 },
];

const INTENSITY = {
  subtle: 0.35,
  medium: 0.60,
  strong: 0.85,
};

export const WavyBackground: React.FC<Props> = ({
  intensity = "medium",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const opacityMul = INTENSITY[intensity];
    const startedAt = performance.now();

    const draw = () => {
      const t = performance.now() - startedAt;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const wave of WAVES) {
        ctx.beginPath();
        // Wave centre line at 60% of section height
        const cy = h * 0.65;
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 4) {
          const y = cy + wave.amp * Math.sin(x * wave.freq + t * wave.speed);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        // Fill with vertical gradient — wave colour at top, fading to
        // transparent at the bottom of the canvas.
        const grad = ctx.createLinearGradient(0, cy - wave.amp, 0, h);
        grad.addColorStop(0, wave.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.globalAlpha = wave.weight * opacityMul * 0.35;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [intensity]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
