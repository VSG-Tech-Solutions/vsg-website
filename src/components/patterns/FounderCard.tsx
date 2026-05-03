"use client";

import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

/**
 * FounderCard — flat editorial card sitting in a 1px hairline grid.
 *
 * Used on /about. Avatar initials, role lockup, bio paragraphs as
 * children, mailto + optional LinkedIn. No accent halo, no tinted
 * background — sits flat on the canvas with hairline neighbours.
 */
type FounderCardProps = {
  name: string;
  role: string;
  initials: string;
  email: string;
  linkedin: string;
  linkedinLabel: string;
  children: ReactNode;
};

export const FounderCard: React.FC<FounderCardProps> = ({
  name,
  role,
  initials,
  email,
  linkedin,
  linkedinLabel,
  children,
}) => (
  <div className="p-8 sm:p-10 lg:p-12" style={{ background: "var(--bg)" }}>
    <div className="flex items-center gap-5">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold tracking-tight shrink-0 border"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor:
            "color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
          color: "var(--accent-2)",
          fontFamily: "var(--font-display)",
        }}
      >
        {initials}
      </div>
      <div className="min-w-0">
        <div
          className="text-[10px] uppercase tracking-[0.22em]"
          style={{
            color: "var(--accent-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {role} · VSG Tech Solutions
        </div>
        <h3
          className="mt-1 text-xl sm:text-2xl font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fg)",
            letterSpacing: "-0.015em",
          }}
        >
          {name}
        </h3>
      </div>
    </div>

    <div
      className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed"
      style={{
        color: "var(--muted)",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </div>

    <div className="mt-7 flex flex-wrap gap-3">
      <a
        href={`mailto:${email}`}
        className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
        style={{
          background:
            "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
          color: "#ffffff",
          fontFamily: "var(--font-body)",
        }}
      >
        <Mail className="w-3.5 h-3.5" />
        <span>{email}</span>
      </a>
      {linkedin && (
        <Link
          href={linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all duration-200 cursor-pointer"
          style={{
            borderColor: "var(--card-border)",
            background: "rgba(255,255,255,0.02)",
            color: "var(--fg)",
            fontFamily: "var(--font-body)",
          }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{linkedinLabel}</span>
        </Link>
      )}
    </div>
  </div>
);
