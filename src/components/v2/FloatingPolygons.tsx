"use client";

import { motion } from "framer-motion";

/**
 * FloatingPolygons — 3D-rotating wireframe shapes drifting in space.
 *
 * Used ONLY at the footer CTA as a different climax effect — distinct
 * motion vocabulary from the main WaveGrid (which is structured grid
 * with travelling brightness).
 *
 * 5 abstract polygon shapes (triangles / hexagons / squares) rendered
 * as SVG outlines. Each one rotates on its own axis (rotateX, rotateY,
 * rotateZ all with different speeds) AND drifts horizontally.
 *
 * Reads as floating objects in 3D space — like CAD viewport / synth-
 * wave / sci-fi UI. Completely different from grids, orbs, beams,
 * streaks, ribbons, sparkles or text.
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  className?: string;
};

const TINTS = {
  warm: {
    primary: "#FF6B2C",
    secondary: "#FFB45C",
    accent: "#FFD580",
  },
  cool: {
    primary: "#6B8AFF",
    secondary: "#A37CFF",
    accent: "#C5E5FF",
  },
};

const INTENSITY = {
  subtle: { strokeOpacity: 0.30, fillOpacity: 0.04 },
  medium: { strokeOpacity: 0.55, fillOpacity: 0.06 },
  strong: { strokeOpacity: 0.75, fillOpacity: 0.08 },
};

type Shape = {
  type: "hexagon" | "triangle" | "square" | "diamond";
  x: string;
  y: string;
  size: number;
  color: "primary" | "secondary" | "accent";
  durRot: number;
  durDrift: number;
  delay: number;
  axis: "x" | "y" | "z";
  driftAmount: number;
};

const SHAPES: Shape[] = [
  { type: "hexagon",  x: "12%", y: "20%", size: 140, color: "primary",   durRot: 22, durDrift: 18, delay: 0,   axis: "y", driftAmount: 40 },
  { type: "triangle", x: "78%", y: "25%", size: 110, color: "secondary", durRot: 18, durDrift: 22, delay: 1.5, axis: "z", driftAmount: 50 },
  { type: "diamond",  x: "30%", y: "70%", size: 120, color: "accent",    durRot: 26, durDrift: 16, delay: 3,   axis: "x", driftAmount: 35 },
  { type: "square",   x: "65%", y: "72%", size: 100, color: "primary",   durRot: 30, durDrift: 24, delay: 0.8, axis: "y", driftAmount: 45 },
  { type: "hexagon",  x: "88%", y: "55%", size: 80,  color: "secondary", durRot: 16, durDrift: 14, delay: 2.2, axis: "z", driftAmount: 30 },
  { type: "triangle", x: "8%",  y: "60%", size: 90,  color: "accent",    durRot: 20, durDrift: 20, delay: 4,   axis: "x", driftAmount: 38 },
];

const renderShape = (
  type: Shape["type"],
  size: number,
  stroke: string,
  fill: string,
  strokeOpacity: number,
  fillOpacity: number,
) => {
  const half = size / 2;
  switch (type) {
    case "hexagon": {
      // Regular hexagon centred at origin
      const points = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${Math.cos(a) * half},${Math.sin(a) * half}`;
      }).join(" ");
      return (
        <polygon
          points={points}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeOpacity={strokeOpacity}
          strokeWidth={1.5}
        />
      );
    }
    case "triangle": {
      const points = Array.from({ length: 3 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 3 - Math.PI / 2;
        return `${Math.cos(a) * half},${Math.sin(a) * half}`;
      }).join(" ");
      return (
        <polygon
          points={points}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeOpacity={strokeOpacity}
          strokeWidth={1.5}
        />
      );
    }
    case "square":
      return (
        <rect
          x={-half}
          y={-half}
          width={size}
          height={size}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeOpacity={strokeOpacity}
          strokeWidth={1.5}
        />
      );
    case "diamond":
      return (
        <polygon
          points={`0,${-half} ${half},0 0,${half} ${-half},0`}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeOpacity={strokeOpacity}
          strokeWidth={1.5}
        />
      );
  }
};

export const FloatingPolygons: React.FC<Props> = ({
  intensity = "medium",
  tint = "warm",
  className = "",
}) => {
  const C = TINTS[tint];
  const I = INTENSITY[intensity];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ perspective: "1200px" }}
    >
      {SHAPES.map((s, i) => {
        const color = C[s.color];
        const rotate =
          s.axis === "x"
            ? { rotateX: 360 }
            : s.axis === "y"
            ? { rotateY: 360 }
            : { rotate: 360 };
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              x: "-50%",
              y: "-50%",
              willChange: "transform",
              filter: `drop-shadow(0 0 16px ${color}55)`,
            }}
            animate={{
              x: [`-50%`, `${-50 + s.driftAmount / 4}%`, `-50%`],
              ...rotate,
            }}
            transition={{
              x: {
                duration: s.durDrift,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotateX: {
                duration: s.durRot,
                delay: s.delay,
                repeat: Infinity,
                ease: "linear",
              },
              rotateY: {
                duration: s.durRot,
                delay: s.delay,
                repeat: Infinity,
                ease: "linear",
              },
              rotate: {
                duration: s.durRot,
                delay: s.delay,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <svg
              viewBox={`${-s.size / 2 - 4} ${-s.size / 2 - 4} ${s.size + 8} ${s.size + 8}`}
              width={s.size}
              height={s.size}
              style={{ overflow: "visible" }}
            >
              {renderShape(
                s.type,
                s.size,
                color,
                color,
                I.strokeOpacity,
                I.fillOpacity,
              )}
            </svg>
          </motion.div>
        );
      })}

      {/* Soft warm wash bottom — atmospheric weight */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            tint === "warm"
              ? "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,107,44,0.08) 0%, rgba(255,107,44,0) 70%)"
              : "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(107,138,255,0.08) 0%, rgba(107,138,255,0) 70%)",
        }}
      />
    </div>
  );
};
