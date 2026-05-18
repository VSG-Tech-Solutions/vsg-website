"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  PackageCheck,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
  ClipboardCheck,
  Plus,
  X,
  ArrowRight,
  Layers,
  Box,
} from "lucide-react";

/**
 * VantageConfigurator — let visitors build their own pilot.
 *
 * Three-step interactive form on the /vantage page:
 *
 *   1. Deployment type — single standalone module OR full Vantage platform
 *   2. Module selection — pick the modules to include (chips/checkbox cards)
 *   3. Custom features — chip-add input for custom dashboards / workflows /
 *      integrations / anything bespoke
 *
 * Submits to /contact with a query string carrying the configuration so the
 * follow-up email pre-fills with what they picked. (Or just opens the
 * Calendly with notes, depending on how the user wants to wire it.)
 *
 * Uses the matte+amber aesthetic. Lives inline on the Vantage page below
 * the architecture diagram.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type ModuleId =
  | "procurement"
  | "receiving"
  | "approvals"
  | "compliance"
  | "onboarding"
  | "quality";

type DeploymentType = "standalone" | "full";

const MODULES: {
  id: ModuleId;
  name: string;
  status: "live" | "design" | "planned";
  icon: typeof ShoppingCart;
  short: string;
}[] = [
  {
    id: "procurement",
    name: "Procurement AI",
    status: "live",
    icon: ShoppingCart,
    short: "Forecaster + Auctioneer · live today",
  },
  {
    id: "receiving",
    name: "Receiving AI",
    status: "live",
    icon: PackageCheck,
    short: "Inspector + 3-way match · live today",
  },
  {
    id: "approvals",
    name: "Approval AI",
    status: "design",
    icon: CheckCircle2,
    short: "Routing + edge-case detection · in design",
  },
  {
    id: "compliance",
    name: "Compliance AI",
    status: "design",
    icon: ShieldCheck,
    short: "Cert + doc expiry tracking · in design",
  },
  {
    id: "onboarding",
    name: "Onboarding AI",
    status: "design",
    icon: UserPlus,
    short: "Customer + vendor intake · in design",
  },
  {
    id: "quality",
    name: "Quality AI",
    status: "planned",
    icon: ClipboardCheck,
    short: "QC flow + defect patterns · planned",
  },
];

const SUGGESTED_CUSTOMS = [
  "Custom dashboard",
  "Custom workflow",
  "ERP integration",
  "Custom reporting",
  "Custom field set",
  "Third-party system integration",
];

export const VantageConfigurator: React.FC = () => {
  const [deployment, setDeployment] = useState<DeploymentType>("full");
  const [selected, setSelected] = useState<Set<ModuleId>>(
    new Set(["procurement", "receiving"])
  );
  const [customs, setCustoms] = useState<string[]>([]);
  const [draftCustom, setDraftCustom] = useState("");

  const toggleModule = (id: ModuleId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      // Standalone: only one at a time.
      if (deployment === "standalone") {
        return new Set([id]);
      }
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const setDeploymentMode = (mode: DeploymentType) => {
    setDeployment(mode);
    if (mode === "standalone") {
      // Collapse to first selected (or first live).
      const first = Array.from(selected)[0] ?? "procurement";
      setSelected(new Set([first as ModuleId]));
    }
  };

  const addCustom = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    if (customs.includes(trimmed)) return;
    setCustoms((c) => [...c, trimmed]);
    setDraftCustom("");
  };

  const removeCustom = (label: string) => {
    setCustoms((c) => c.filter((x) => x !== label));
  };

  // Build the contact-form pre-fill query string.
  const buildHref = () => {
    const params = new URLSearchParams();
    params.set("deployment", deployment);
    params.set("modules", Array.from(selected).join(","));
    if (customs.length > 0) params.set("customs", customs.join(" | "));
    return `/contact?${params.toString()}`;
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 40px 100px -30px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Subtle warm corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,168,114,0.06) 0%, rgba(244,168,114,0) 70%)",
        }}
      />

      <div className="relative p-8 sm:p-12 lg:p-16">
        {/* Header */}
        <div
          className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "var(--accent)" }}
          />
          Build your pilot
        </div>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
            lineHeight: 0.98,
            color: "var(--fg)",
          }}
        >
          Configure exactly what you need.
          <br />
          <span style={{ color: "var(--muted)" }}>
            Quote in your inbox the same day.
          </span>
        </h2>
        <p
          className="mt-6 max-w-2xl text-base leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Pick a single module as a standalone, or the full Vantage
          platform with the modules you actually want. Add any custom
          dashboards, workflows or integrations — we&rsquo;ll quote it.
        </p>

        {/* STEP 1 — deployment */}
        <Step n={1} label="Deployment">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DeploymentCard
              active={deployment === "standalone"}
              icon={Box}
              title="Standalone module"
              sub="One workflow only. Lighter footprint, lower price, ships fastest. Pick a single module."
              onClick={() => setDeploymentMode("standalone")}
            />
            <DeploymentCard
              active={deployment === "full"}
              icon={Layers}
              title="Full Vantage platform"
              sub="Vantage Core + the modules you pick + room to add more later. The growth path most pilots choose."
              onClick={() => setDeploymentMode("full")}
            />
          </div>
        </Step>

        {/* STEP 2 — modules */}
        <Step
          n={2}
          label={
            deployment === "standalone"
              ? "Pick a module"
              : "Pick your modules"
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODULES.map((m) => {
              const Icon = m.icon;
              const isSelected = selected.has(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleModule(m.id)}
                  className="group relative text-left rounded-xl p-5 transition-all duration-300"
                  style={{
                    background: isSelected
                      ? "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)"
                      : "linear-gradient(180deg, #16161A 0%, #0C0C0E 100%)",
                    border: `1px solid ${isSelected ? "rgba(244, 168, 114, 0.4)" : "rgba(255, 255, 255, 0.07)"}`,
                    boxShadow: isSelected
                      ? "inset 0 1px 0 rgba(244,168,114,0.18)"
                      : "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                      style={{
                        background: isSelected
                          ? "var(--accent-soft)"
                          : "rgba(255, 255, 255, 0.04)",
                        border: `1px solid ${isSelected ? "var(--card-border-accent-strong)" : "rgba(255, 255, 255, 0.08)"}`,
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{
                          color: isSelected
                            ? "var(--accent)"
                            : "rgba(255, 255, 255, 0.65)",
                        }}
                        strokeWidth={1.6}
                      />
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-[0.22em] font-semibold flex items-center gap-1.5 mt-0.5"
                      style={{
                        color:
                          m.status === "live"
                            ? "var(--accent)"
                            : m.status === "design"
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(255,255,255,0.32)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {m.status === "live" && (
                        <span
                          className="inline-block w-1 h-1 rounded-full animate-pulse"
                          style={{ background: "var(--accent)" }}
                        />
                      )}
                      {m.status === "live"
                        ? "Live"
                        : m.status === "design"
                          ? "In design"
                          : "Planned"}
                    </span>
                  </div>
                  <div
                    className="mt-4 text-[15px] font-semibold"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    className="mt-1 text-[12px] leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {m.short}
                  </div>
                  {/* Selected indicator */}
                  {isSelected && (
                    <div
                      className="absolute top-3 right-3 inline-flex items-center justify-center w-5 h-5 rounded-full"
                      style={{
                        background: "var(--accent)",
                        color: "#0A0A0A",
                      }}
                    >
                      <CheckCircle2 className="w-3 h-3" strokeWidth={2.4} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Step>

        {/* STEP 3 — customs */}
        <Step n={3} label="Custom features (optional)">
          <p
            className="text-[14px] leading-relaxed mb-4"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Anything else you want — custom dashboards, custom workflows,
            ERP integrations, unique reporting. Add them and we&rsquo;ll
            scope each one. Most customs ship in 1–2 weeks at a fraction
            of new-build pricing.
          </p>

          {/* Suggested chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTED_CUSTOMS.map((s) => {
              const isAdded = customs.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => (isAdded ? removeCustom(s) : addCustom(s))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200"
                  style={{
                    background: isAdded
                      ? "var(--accent-soft)"
                      : "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${isAdded ? "var(--card-border-accent-strong)" : "rgba(255, 255, 255, 0.10)"}`,
                    color: isAdded ? "var(--accent)" : "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {isAdded ? (
                    <X className="w-3 h-3" strokeWidth={2} />
                  ) : (
                    <Plus className="w-3 h-3" strokeWidth={2} />
                  )}
                  {s}
                </button>
              );
            })}
          </div>

          {/* Free-form add */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={draftCustom}
              onChange={(e) => setDraftCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustom(draftCustom);
                }
              }}
              placeholder="Describe a custom feature you want…"
              className="flex-1 px-4 py-3 rounded-xl text-[14px] outline-none transition-colors duration-200"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "var(--fg)",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              type="button"
              onClick={() => addCustom(draftCustom)}
              disabled={!draftCustom.trim()}
              className="px-5 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--card-border-accent-strong)",
                color: "var(--accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              Add custom
            </button>
          </div>

          {/* Added customs list */}
          <AnimatePresence>
            {customs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex flex-wrap gap-2 overflow-hidden"
              >
                {customs.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                    style={{
                      background: "var(--accent-soft)",
                      border: "1px solid rgba(244, 168, 114, 0.35)",
                      color: "var(--accent)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => removeCustom(c)}
                      aria-label={`Remove ${c}`}
                      className="opacity-70 hover:opacity-100"
                    >
                      <X className="w-3 h-3" strokeWidth={2.2} />
                    </button>
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Step>

        {/* SUMMARY + CTA */}
        <div
          className="mt-12 pt-10 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
        >
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.32em] font-semibold"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Your configuration
            </div>
            <div
              className="mt-2 text-[14px] sm:text-[15px]"
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span style={{ fontWeight: 600 }}>
                {deployment === "standalone"
                  ? "Standalone module"
                  : "Full Vantage platform"}
              </span>{" "}
              · {selected.size} {selected.size === 1 ? "module" : "modules"}
              {customs.length > 0 && (
                <>
                  {" "}
                  · {customs.length} custom{" "}
                  {customs.length === 1 ? "feature" : "features"}
                </>
              )}
            </div>
          </div>

          <a
            href={buildHref()}
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-200 group"
            style={{
              background: "linear-gradient(180deg, #FFFFFF, #E5E5E5)",
              color: "#0A0A0A",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.85) inset, 0 6px 20px rgba(0,0,0,0.5)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span>Get my pilot quote</span>
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ---------------- subcomponents ---------------- */

const Step: React.FC<{
  n: number;
  label: string;
  children: React.ReactNode;
}> = ({ n, label, children }) => (
  <div className="mt-12">
    <div
      className="text-[11px] uppercase tracking-[0.28em] font-semibold flex items-center gap-3 mb-5"
      style={{
        color: "var(--muted-2)",
        fontFamily: "var(--font-body)",
      }}
    >
      <span style={{ color: "var(--accent)", fontWeight: 700 }}>
        {String(n).padStart(2, "0")}
      </span>
      <span
        className="inline-block w-6 h-px"
        style={{ background: "rgba(255, 255, 255, 0.18)" }}
      />
      {label}
    </div>
    {children}
  </div>
);

const DeploymentCard: React.FC<{
  active: boolean;
  icon: typeof Box;
  title: string;
  sub: string;
  onClick: () => void;
}> = ({ active, icon: Icon, title, sub, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left rounded-xl p-5 transition-all duration-300 relative"
    style={{
      background: active
        ? "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)"
        : "linear-gradient(180deg, #16161A 0%, #0C0C0E 100%)",
      border: `1px solid ${active ? "rgba(244, 168, 114, 0.4)" : "rgba(255, 255, 255, 0.07)"}`,
      boxShadow: active
        ? "inset 0 1px 0 rgba(244,168,114,0.18)"
        : "inset 0 1px 0 rgba(255,255,255,0.04)",
    }}
  >
    <div className="flex items-start gap-4">
      <span
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
        style={{
          background: active
            ? "var(--accent-soft)"
            : "rgba(255, 255, 255, 0.04)",
          border: `1px solid ${active ? "var(--card-border-accent-strong)" : "rgba(255, 255, 255, 0.08)"}`,
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: active ? "var(--accent)" : "rgba(255, 255, 255, 0.65)" }}
          strokeWidth={1.6}
        />
      </span>
      <div className="flex-1">
        <div
          className="text-[16px] font-semibold"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-body)",
          }}
        >
          {title}
        </div>
        <div
          className="mt-1.5 text-[13px] leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {sub}
        </div>
      </div>
    </div>
    {active && (
      <div
        className="absolute top-3 right-3 inline-flex items-center justify-center w-5 h-5 rounded-full"
        style={{
          background: "var(--accent)",
          color: "#0A0A0A",
        }}
      >
        <CheckCircle2 className="w-3 h-3" strokeWidth={2.4} />
      </div>
    )}
  </button>
);
