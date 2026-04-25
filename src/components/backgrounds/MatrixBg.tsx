"use client";

import { useEffect, useRef } from "react";

export const MatrixBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fontSize = 16;
    let columns: number[] = [];
    let speeds: number[] = [];

    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEF<>/\\|{}[]()=*+-#$%&".split(
        ""
      );

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const colCount = Math.floor(w / fontSize);
      columns = new Array(colCount).fill(0).map(() => Math.random() * -h);
      speeds = new Array(colCount).fill(0).map(() => 0.6 + Math.random() * 1.4);
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      // Fading trail — black with slight alpha
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px ui-monospace, 'SF Mono', Menlo, monospace`;

      for (let i = 0; i < columns.length; i++) {
        const y = columns[i];
        const x = i * fontSize;
        const ch = chars[Math.floor(Math.random() * chars.length)];

        // Head glyph - bright
        ctx.fillStyle = "rgba(220, 255, 220, 0.95)";
        ctx.shadowColor = "rgba(34, 197, 94, 0.9)";
        ctx.shadowBlur = 8;
        ctx.fillText(ch, x, y);

        // Trailing ghost a few cells above
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(34, 197, 94, 0.65)";
        ctx.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          x,
          y - fontSize
        );

        ctx.fillStyle = "rgba(21, 128, 61, 0.4)";
        ctx.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          x,
          y - fontSize * 3
        );

        columns[i] += fontSize * speeds[i];
        if (columns[i] > h + Math.random() * 400) {
          columns[i] = -Math.random() * 200;
          speeds[i] = 0.6 + Math.random() * 1.4;
        }
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
    <div className="absolute inset-0 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Green vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 3px)",
        }}
      />

      {/* Green phosphor glow bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(34,197,94,0.15), transparent)",
        }}
      />

      {/* Fade to bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
    </div>
  );
};
