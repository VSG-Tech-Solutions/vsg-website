"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, X, Check } from "lucide-react";
import { useTheme } from "@/themes/ThemeProvider";
import { ThemeName, themes } from "@/themes/themes";

const swatches: Record<ThemeName, { a: string; b: string; c: string }> = {
  crimson: { a: "#000000", b: "#dc2626", c: "#f87171" },
  aurora: { a: "#0a0b1e", b: "#a855f7", c: "#22d3ee" },
  paper: { a: "#fafaf9", b: "#4f46e5", c: "#818cf8" },
  brutalist: { a: "#0a0a0a", b: "#eab308", c: "#facc15" },
  solar: { a: "#120a04", b: "#f97316", c: "#fbbf24" },
  ember: { a: "#0e0703", b: "#fb923c", c: "#fde047" },
  matrix: { a: "#000000", b: "#22c55e", c: "#4ade80" },
  synthwave: { a: "#0f0524", b: "#ec4899", c: "#22d3ee" },
  cosmos: { a: "#04030f", b: "#60a5fa", c: "#c084fc" },
  glitch: { a: "#0a0512", b: "#d946ef", c: "#4ade80" },
  holo: { a: "#111116", b: "#a78bfa", c: "#5eead4" },
  quantum: { a: "#020617", b: "#38bdf8", c: "#a5f3fc" },
  midcentury: { a: "#f7f1e5", b: "#c2410c", c: "#0f766e" },
  ocean: { a: "#020812", b: "#14b8a6", c: "#67e8f9" },
  origami: { a: "#f5f2e9", b: "#be123c", c: "#9a3412" },
  noir: { a: "#05060a", b: "#f43f5e", c: "#06b6d4" },
  holoblack: { a: "#07070A", b: "#2563EB", c: "#60A5FA" },
};

export const ThemePicker: React.FC = () => {
  const { themeName, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const order: ThemeName[] = [
    "crimson",
    "ember",
    "noir",
    "synthwave",
    "glitch",
    "matrix",
    "cosmos",
    "quantum",
    "ocean",
    "aurora",
    "holo",
    "solar",
    "brutalist",
    "midcentury",
    "origami",
    "paper",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-[family-name:var(--font-body)]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[320px] rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{
              background: "color-mix(in oklab, var(--bg-elev) 85%, transparent)",
              borderColor: "var(--card-border)",
              boxShadow: `0 20px 60px -20px var(--accent-glow), 0 0 0 1px var(--card-border)`,
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span
                  className="text-[11px] uppercase tracking-[0.2em] font-semibold"
                  style={{ color: "var(--fg)" }}
                >
                  Themes
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md transition-colors"
                style={{ color: "var(--muted)" }}
                aria-label="Close theme picker"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {order.map((key) => {
                const t = themes[key];
                const sw = swatches[key];
                const active = themeName === key;
                return (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className="group w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left cursor-pointer"
                    style={{
                      background: active ? "var(--accent-soft)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "var(--card-bg)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                    }}
                  >
                    {/* Swatch */}
                    <div
                      className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border"
                      style={{ borderColor: "var(--card-border)" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ background: sw.a }}
                      />
                      <div
                        className="absolute inset-y-0 right-0 w-1/2"
                        style={{ background: sw.b }}
                      />
                      <div
                        className="absolute top-0 right-0 h-1/2 w-1/2"
                        style={{ background: sw.c }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--fg)" }}
                        >
                          {t.label}
                        </span>
                        {active && (
                          <Check
                            className="w-3.5 h-3.5"
                            style={{ color: "var(--accent)" }}
                          />
                        )}
                      </div>
                      <div
                        className="text-[11px] truncate"
                        style={{ color: "var(--muted)" }}
                      >
                        {t.blurb}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] border-t"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--muted-2)",
              }}
            >
              Saved locally · instant preview
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className="relative h-14 w-14 rounded-full border backdrop-blur-xl flex items-center justify-center cursor-pointer"
        style={{
          background: "color-mix(in oklab, var(--bg-elev) 85%, transparent)",
          borderColor: "var(--card-border)",
          boxShadow: `0 10px 40px -10px var(--accent-glow), 0 0 0 1px var(--card-border)`,
        }}
        aria-label="Open theme picker"
      >
        <Palette className="w-5 h-5" style={{ color: "var(--accent)" }} />
        <span
          className="absolute -top-1 -right-1 h-3 w-3 rounded-full animate-pulse"
          style={{ background: "var(--accent)" }}
        />
      </motion.button>
    </div>
  );
};
