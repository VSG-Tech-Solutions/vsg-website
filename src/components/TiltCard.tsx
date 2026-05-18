"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * TiltCard — wrap any child in a 3D mouse-tilt + cursor-following sheen.
 *
 * On mouse-move:
 *   • the card rotates a few degrees on X/Y toward the cursor
 *   • a soft cyan radial highlight tracks the cursor across the surface
 *
 * Springs damp the motion so it never feels twitchy. On leave, everything
 * returns to flat. Disabled on touch / prefers-reduced-motion (the parent
 * page gates rotation by checking `hover: hover` via CSS).
 *
 * Usage:
 *   <TiltCard><YourCard /></TiltCard>
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. Lower = subtler. */
  max?: number;
  /** Whether to render the cursor-tracking highlight. */
  glow?: boolean;
};

export const TiltCard: React.FC<Props> = ({
  children,
  className,
  max = 6,
  glow = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0); // -0.5..0.5
  const my = useMotionValue(0);
  const px = useMotionValue(50); // % across card for the highlight
  const py = useMotionValue(50);

  // Spring-smoothed rotation values driven from the raw mouse offsets.
  const rx = useSpring(useTransform(my, (v) => -v * max), {
    stiffness: 240,
    damping: 24,
  });
  const ry = useSpring(useTransform(mx, (v) => v * max), {
    stiffness: 240,
    damping: 24,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x - 0.5);
    my.set(y - 0.5);
    px.set(x * 100);
    py.set(y * 100);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    px.set(50);
    py.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
        position: "relative",
      }}
    >
      {children}

      {/* Cursor-tracking sheen */}
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background: useTransform(
              [px, py],
              ([x, y]) =>
                `radial-gradient(380px circle at ${x}% ${y}%, rgba(255,255,255,0.08), rgba(255,255,255,0) 55%)`
            ),
            mixBlendMode: "screen",
          }}
          whileHover={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
};
