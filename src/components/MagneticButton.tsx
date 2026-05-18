"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton — wraps a button/link in a magnetic pull effect.
 * As the cursor approaches, the child translates toward the cursor by
 * a fraction of the offset, then snaps back when the cursor leaves.
 *
 * Pure visual sugar — we don't change the hit-target or focus behavior.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  /** Strength of the pull, 0..1. 0.4 is subtle, 0.8 is strong. */
  strength?: number;
};

export const MagneticButton: React.FC<Props> = ({
  children,
  className,
  strength = 0.45,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};
