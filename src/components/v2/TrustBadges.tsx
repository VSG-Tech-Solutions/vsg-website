"use client";

import {
  ShieldCheck,
  MapPin,
  Users,
  Coins,
  type LucideIcon,
} from "lucide-react";

/**
 * TrustBadges — small icon+label row.
 *
 * Drops under the hero CTAs as a B2B credibility strip. Four signals
 * mid-market buyers actually filter on:
 *   • POPIA-aligned (regulatory)
 *   • Cape Town (location / time zone)
 *   • Founder-led (relationship)
 *   • Fixed-price (commercial)
 *
 * Each badge: small Lucide icon + label, in a subtle outlined chip.
 * Hover lights up the icon + label to orange.
 */

type Badge = { icon: LucideIcon; label: string };

const BADGES: Badge[] = [
  { icon: ShieldCheck, label: "POPIA-aligned" },
  { icon: MapPin, label: "Cape Town" },
  { icon: Users, label: "Founder-led" },
  { icon: Coins, label: "Fixed-price" },
];

export const TrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {BADGES.map((b) => {
        const Icon = b.icon;
        return (
          <div
            key={b.label}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors duration-200"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Icon
              className="w-3 h-3 text-muted group-hover:text-[#FF6B2C] transition-colors"
              strokeWidth={2}
            />
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted group-hover:text-text-primary transition-colors">
              {b.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
