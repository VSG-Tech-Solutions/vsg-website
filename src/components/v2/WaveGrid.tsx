"use client";

import { useEffect, useRef } from "react";

/**
 * WaveGrid — structured dot grid with a traveling brightness wave.
 *
 * A regular grid of small dots (rendered to canvas for perf). A
 * sinusoidal wave of "brightness" travels diagonally across the grid
 * over time — dots that fall under the wave-crest light up bright
 * orange, fade back to baseline as the wave passes.
 *
 * Completely different vocabulary from previous attempts:
 *   - Not orbs (these are structured grid points, not blurred volumes)
 *   - Not streaks (no directional travel)
 *   - Not lines/beams (discrete dots)
 *   - Not flowing ribbons (structured, not organic)
 *   - Not text marquee (visual only, no language)
 *
 * Reads as an LED matrix / Apple-walkway / sound-meter aesthetic.
 * Rendered to canvas so 200+ dots animate at 60fps with no React work.
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  /** Spacing between dots, px. Default 36. */
  spacing?: number;
  className?: string;
};

const TINTS = {
  warm: {
    baseR: 255,
    baseG: 107,
    baseB: 44,
    crestR: 255,
    crestG: 220,
    crestB: 140,
  },
  cool: {
    baseR: 107,
    baseG: 138,
    baseB: 255,
    crestR: 197,
    crestG: 229,
    crestB: 255,
  },
};

const INTENSITY = {
  subtle: { baseAlpha: 0.06, crestAlpha: 0.55, dotR: 1.2 },
  medium: { baseAlpha: 0.10, crestAlpha: 0.85, dotR: 1.6 },
  strong: { baseAlpha: 0.14, crestAlpha: 1.00, dotR: 2.0 },
};

export const WaveGrid: React.FC<Props> = ({
  intensity = "medium",
  tint = "warm",
  spacing = 36,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const C = TINTS[tint];
    const I = INTENSITY[intensity];

    let dpr = window.devicePixelRatio || 1;
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

    const startedAt = performance.now();

    // Wave parameters — diagonal travel across the section, with a
    // long wavelength so the crest is wide and the shadow between
    // crests is wide too.
    const WAVELEN = 380;          // px between wave crests
    const SPEED = 60;             // px / second of crest travel
    const ANGLE_DEG = 22;         // direction of wave travel
    const angle = (ANGLE_DEG * Math.PI) / 180;
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);

    const draw = () => {
      const t = (performance.now() - startedAt) / 1000;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const x = cx * spacing;
          const y = cy * spacing;

          // Project (x,y) onto wave direction → distance along wave
          const proj = x * ux + y * uy;
          // Phase: sin wave traveling down the projection axis over time
          const phase = (proj - SPEED * t) / WAVELEN * Math.PI * 2;
          // Crest = peaks of sin, baseline = troughs. Map to [0..1].
          const crest = (Math.sin(phase) + 1) / 2;
          // Sharpen the crest so most dots are dim and only a band lights up
          const lit = Math.pow(crest, 2.5);

          // Lerp between base + crest colour and alpha
          const r = Math.round(C.baseR + (C.crestR - C.baseR) * lit);
          const g = Math.round(C.baseG + (C.crestG - C.baseG) * lit);
          const b = Math.round(C.baseB + (C.crestB - C.baseB) * lit);
          const a = I.baseAlpha + (I.crestAlpha - I.baseAlpha) * lit;
          // Subtle dot scaling — bright dots are slightly bigger
          const r_ = I.dotR + lit * 1.2;

          ctx.beginPath();
          ctx.arc(x, y, r_, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fill();

          // Bright dots get a small bloom halo
          if (lit > 0.55) {
            ctx.beginPath();
            ctx.arc(x, y, r_ * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${C.crestR},${C.crestG},${C.crestB},${(lit - 0.55) * 0.35})`;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [intensity, tint, spacing]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Soft warm wash bottom — atmospheric weight under the grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            tint === "warm"
              ? "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,107,44,0.10) 0%, rgba(255,107,44,0) 70%)"
              : "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(107,138,255,0.10) 0%, rgba(107,138,255,0) 70%)",
        }}
      />
    </div>
  );
};
