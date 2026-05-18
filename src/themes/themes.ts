/**
 * Brand exploration palette set.
 *
 * The previous 17 generic themes (synthwave / matrix / cosmos / etc.) are
 * gone. This file now holds a focused brand-exploration set: orange and
 * white and black variations the team can flip between to lock in the
 * Vantage brand palette.
 *
 * Each theme defines an extended set of CSS variables that components
 * read directly — `--accent`, `--accent-2`, `--card-bg`, `--card-bg-2`,
 * `--card-bg-accent`, `--card-bg-accent-2`, etc — so changing a theme
 * actually re-skins the site.
 */

export type ThemeName =
  | "holoblack"
  | "pureblack"
  | "brightorange"
  | "terracotta"
  | "monodark"
  | "monolight"
  | "editorial"
  | "pinkdark"
  | "bluedark"
  | "tealdark"
  | "greendark"
  | "purpledark"
  | "reddark"
  | "yellowdark"
  | "cyandark"
  | "limedark"
  | "magentadark"
  | "slatedark"
  | "golddark"
  | "indigodark"
  | "sage";

export interface Theme {
  name: ThemeName;
  label: string;
  blurb: string;
  mode: "light" | "dark";
  fontDisplay: string;
  fontBody: string;
  bgMode:
    | "lightning"
    | "aurora"
    | "grid"
    | "brutalist"
    | "solar"
    | "ember"
    | "matrix"
    | "synthwave"
    | "cosmos"
    | "glitch"
    | "holo"
    | "quantum"
    | "midcentury"
    | "noir"
    | "origami"
    | "ocean";
  vars: Record<string, string>;
}

/* ─────────────────────────────────────────────────────────────────────
   Theme — Holo Black (current default)
   ───────────────────────────────────────────────────────────────────── */
const HOLOBLACK: Theme = {
  name: "holoblack",
  label: "Holo Black · Warm Amber",
  blurb: "Deep matte canvas · soft amber accent (current default)",
  mode: "dark",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "noir",
  vars: {
    "--bg": "#07070A",
    "--bg-elev": "#0E0E10",
    "--fg": "#F5F5F5",
    "--muted": "rgba(245,245,245,0.70)",
    "--muted-2": "rgba(245,245,245,0.45)",

    "--accent": "#F4A872",
    "--accent-2": "#F4A872",
    "--accent-soft": "rgba(244,168,114,0.12)",
    "--accent-glow": "rgba(244,168,114,0.32)",
    "--accent-strong": "rgba(244,168,114,0.45)",

    "--card-bg": "#161618",
    "--card-bg-2": "#0E0E10",
    "--card-bg-elev": "#15151A",
    "--card-bg-elev-2": "#0B0B0D",
    "--card-bg-accent": "#1F1611",
    "--card-bg-accent-2": "#100A06",
    "--card-border": "rgba(255,255,255,0.07)",
    "--card-border-strong": "rgba(255,255,255,0.10)",
    "--card-border-accent": "rgba(244,168,114,0.24)",
    "--card-border-accent-strong": "rgba(244,168,114,0.32)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
    "--ring": "rgba(244,168,114,0.5)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Theme — Pure Black (max-contrast OLED)
   ───────────────────────────────────────────────────────────────────── */
const PUREBLACK: Theme = {
  name: "pureblack",
  label: "Pure Black · Warm Amber",
  blurb: "True OLED black · same warm amber accent",
  mode: "dark",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "noir",
  vars: {
    "--bg": "#000000",
    "--bg-elev": "#070707",
    "--fg": "#FFFFFF",
    "--muted": "rgba(255,255,255,0.72)",
    "--muted-2": "rgba(255,255,255,0.46)",

    "--accent": "#F4A872",
    "--accent-2": "#F4A872",
    "--accent-soft": "rgba(244,168,114,0.12)",
    "--accent-glow": "rgba(244,168,114,0.32)",
    "--accent-strong": "rgba(244,168,114,0.45)",

    "--card-bg": "#0B0B0B",
    "--card-bg-2": "#050505",
    "--card-bg-elev": "#0F0F0F",
    "--card-bg-elev-2": "#070707",
    "--card-bg-accent": "#1A0F08",
    "--card-bg-accent-2": "#0B0703",
    "--card-border": "rgba(255,255,255,0.07)",
    "--card-border-strong": "rgba(255,255,255,0.11)",
    "--card-border-accent": "rgba(244,168,114,0.24)",
    "--card-border-accent-strong": "rgba(244,168,114,0.36)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
    "--ring": "rgba(244,168,114,0.5)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Theme — Bright Orange (saturated brand voice)
   ───────────────────────────────────────────────────────────────────── */
const BRIGHTORANGE: Theme = {
  name: "brightorange",
  label: "Bright Orange · Dark",
  blurb: "Dark canvas · saturated orange accent (louder brand voice)",
  mode: "dark",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "noir",
  vars: {
    "--bg": "#0A0A0C",
    "--bg-elev": "#101012",
    "--fg": "#FFFFFF",
    "--muted": "rgba(255,255,255,0.70)",
    "--muted-2": "rgba(255,255,255,0.45)",

    "--accent": "#FF7A1A",
    "--accent-2": "#FF7A1A",
    "--accent-soft": "rgba(255,122,26,0.14)",
    "--accent-glow": "rgba(255,122,26,0.40)",
    "--accent-strong": "rgba(255,122,26,0.55)",

    "--card-bg": "#161618",
    "--card-bg-2": "#0E0E10",
    "--card-bg-elev": "#15151A",
    "--card-bg-elev-2": "#0B0B0D",
    "--card-bg-accent": "#1E0F05",
    "--card-bg-accent-2": "#0F0703",
    "--card-border": "rgba(255,255,255,0.07)",
    "--card-border-strong": "rgba(255,255,255,0.10)",
    "--card-border-accent": "rgba(255,122,26,0.30)",
    "--card-border-accent-strong": "rgba(255,122,26,0.45)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
    "--ring": "rgba(255,122,26,0.55)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Theme — Terracotta (deeper / more grounded orange)
   ───────────────────────────────────────────────────────────────────── */
const TERRACOTTA: Theme = {
  name: "terracotta",
  label: "Terracotta · Dark",
  blurb: "Deeper rust-orange accent · earthy, grounded brand feel",
  mode: "dark",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "noir",
  vars: {
    "--bg": "#0A0807",
    "--bg-elev": "#10100E",
    "--fg": "#F5EFE8",
    "--muted": "rgba(245,239,232,0.68)",
    "--muted-2": "rgba(245,239,232,0.42)",

    "--accent": "#D86A3F",
    "--accent-2": "#D86A3F",
    "--accent-soft": "rgba(216,106,63,0.12)",
    "--accent-glow": "rgba(216,106,63,0.30)",
    "--accent-strong": "rgba(216,106,63,0.45)",

    "--card-bg": "#1A1614",
    "--card-bg-2": "#0F0C0A",
    "--card-bg-elev": "#171311",
    "--card-bg-elev-2": "#0C0907",
    "--card-bg-accent": "#23120A",
    "--card-bg-accent-2": "#120903",
    "--card-border": "rgba(245,239,232,0.07)",
    "--card-border-strong": "rgba(245,239,232,0.10)",
    "--card-border-accent": "rgba(216,106,63,0.26)",
    "--card-border-accent-strong": "rgba(216,106,63,0.40)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
    "--ring": "rgba(216,106,63,0.50)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Theme — Mono Dark (white-only accent · zero colour)
   ───────────────────────────────────────────────────────────────────── */
const MONODARK: Theme = {
  name: "monodark",
  label: "Mono Dark · No Colour",
  blurb: "Pure black/white · zero colour accent (test the discipline)",
  mode: "dark",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "noir",
  vars: {
    "--bg": "#08080A",
    "--bg-elev": "#0E0E10",
    "--fg": "#FFFFFF",
    "--muted": "rgba(255,255,255,0.70)",
    "--muted-2": "rgba(255,255,255,0.45)",

    "--accent": "#FFFFFF",
    "--accent-2": "#FFFFFF",
    "--accent-soft": "rgba(255,255,255,0.10)",
    "--accent-glow": "rgba(255,255,255,0.18)",
    "--accent-strong": "rgba(255,255,255,0.30)",

    "--card-bg": "#15151A",
    "--card-bg-2": "#0B0B0D",
    "--card-bg-elev": "#15151A",
    "--card-bg-elev-2": "#0B0B0D",
    "--card-bg-accent": "#1A1A1F",
    "--card-bg-accent-2": "#0E0E11",
    "--card-border": "rgba(255,255,255,0.08)",
    "--card-border-strong": "rgba(255,255,255,0.16)",
    "--card-border-accent": "rgba(255,255,255,0.20)",
    "--card-border-accent-strong": "rgba(255,255,255,0.32)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
    "--ring": "rgba(255,255,255,0.40)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Theme — Mono Light
   ───────────────────────────────────────────────────────────────────── */
const MONOLIGHT: Theme = {
  name: "monolight",
  label: "Mono Light · No Colour",
  blurb: "Off-white canvas · black-only accent · editorial discipline",
  mode: "light",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "grid",
  vars: {
    "--bg": "#FAFAF7",
    "--bg-elev": "#FFFFFF",
    "--fg": "#0A0A0C",
    "--muted": "rgba(10,10,12,0.70)",
    "--muted-2": "rgba(10,10,12,0.46)",

    "--accent": "#0A0A0C",
    "--accent-2": "#0A0A0C",
    "--accent-soft": "rgba(10,10,12,0.06)",
    "--accent-glow": "rgba(10,10,12,0.10)",
    "--accent-strong": "rgba(10,10,12,0.22)",

    "--card-bg": "#FFFFFF",
    "--card-bg-2": "#F3F2EE",
    "--card-bg-elev": "#FFFFFF",
    "--card-bg-elev-2": "#F5F4F0",
    "--card-bg-accent": "#F0EFE9",
    "--card-bg-accent-2": "#E6E5DE",
    "--card-border": "rgba(10,10,12,0.10)",
    "--card-border-strong": "rgba(10,10,12,0.18)",
    "--card-border-accent": "rgba(10,10,12,0.18)",
    "--card-border-accent-strong": "rgba(10,10,12,0.28)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
    "--ring": "rgba(10,10,12,0.40)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Theme — Editorial Light (cream + warm amber)
   ───────────────────────────────────────────────────────────────────── */
const EDITORIAL: Theme = {
  name: "editorial",
  label: "Editorial · Cream · Amber",
  blurb: "Warm cream paper · ink-dark text · soft amber accent",
  mode: "light",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "origami",
  vars: {
    "--bg": "#F7F2E8",
    "--bg-elev": "#FBF7EE",
    "--fg": "#1A1614",
    "--muted": "rgba(26,22,20,0.70)",
    "--muted-2": "rgba(26,22,20,0.45)",

    "--accent": "#C25E2C",
    "--accent-2": "#C25E2C",
    "--accent-soft": "rgba(194,94,44,0.10)",
    "--accent-glow": "rgba(194,94,44,0.20)",
    "--accent-strong": "rgba(194,94,44,0.40)",

    "--card-bg": "#FBF7EE",
    "--card-bg-2": "#F0EADE",
    "--card-bg-elev": "#FBF7EE",
    "--card-bg-elev-2": "#EFEAE0",
    "--card-bg-accent": "#F4E5D2",
    "--card-bg-accent-2": "#E8D5BA",
    "--card-border": "rgba(26,22,20,0.10)",
    "--card-border-strong": "rgba(26,22,20,0.18)",
    "--card-border-accent": "rgba(194,94,44,0.26)",
    "--card-border-accent-strong": "rgba(194,94,44,0.40)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
    "--ring": "rgba(194,94,44,0.45)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Coloured-accent dark themes
   Same dark canvas as Holo Black — only the accent + warm card surface
   change, so every component re-tints in one click. One per major hue.
   ───────────────────────────────────────────────────────────────────── */

const accentDark = (
  name: ThemeName,
  label: string,
  blurb: string,
  hex: string,
  rgb: string,
  warmCardBg: string,
  warmCardBg2: string
): Theme => ({
  name,
  label,
  blurb,
  mode: "dark",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "noir",
  vars: {
    "--bg": "#07070A",
    "--bg-elev": "#0E0E10",
    "--fg": "#FFFFFF",
    "--muted": "rgba(255,255,255,0.70)",
    "--muted-2": "rgba(255,255,255,0.45)",

    "--accent": hex,
    "--accent-2": hex,
    "--accent-soft": `rgba(${rgb},0.12)`,
    "--accent-glow": `rgba(${rgb},0.36)`,
    "--accent-strong": `rgba(${rgb},0.50)`,

    "--card-bg": "#161618",
    "--card-bg-2": "#0E0E10",
    "--card-bg-elev": "#15151A",
    "--card-bg-elev-2": "#0B0B0D",
    "--card-bg-accent": warmCardBg,
    "--card-bg-accent-2": warmCardBg2,
    "--card-border": "rgba(255,255,255,0.07)",
    "--card-border-strong": "rgba(255,255,255,0.10)",
    "--card-border-accent": `rgba(${rgb},0.28)`,
    "--card-border-accent-strong": `rgba(${rgb},0.42)`,

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",

    "--ring": `rgba(${rgb},0.50)`,
  },
});

const PINKDARK = accentDark(
  "pinkdark",
  "Pink · Dark",
  "Black + white + electric pink",
  "#FF4D8F",
  "255,77,143",
  "#1F0B14",
  "#100308"
);

const BLUEDARK = accentDark(
  "bluedark",
  "Blue · Dark",
  "Black + white + electric blue",
  "#3B82F6",
  "59,130,246",
  "#0B1424",
  "#040810"
);

const TEALDARK = accentDark(
  "tealdark",
  "Teal · Dark",
  "Black + white + cyan-teal",
  "#14B8A6",
  "20,184,166",
  "#06201D",
  "#02100E"
);

const GREENDARK = accentDark(
  "greendark",
  "Green · Dark",
  "Black + white + emerald green",
  "#22C55E",
  "34,197,94",
  "#062014",
  "#02100A"
);

const PURPLEDARK = accentDark(
  "purpledark",
  "Purple · Dark",
  "Black + white + electric violet",
  "#A855F7",
  "168,85,247",
  "#180A28",
  "#0B0414"
);

const REDDARK = accentDark(
  "reddark",
  "Red · Dark",
  "Black + white + crimson",
  "#EF4444",
  "239,68,68",
  "#1F0808",
  "#100303"
);

const YELLOWDARK = accentDark(
  "yellowdark",
  "Yellow · Dark",
  "Black + white + lemon yellow",
  "#FACC15",
  "250,204,21",
  "#1A1605",
  "#0D0B02"
);

const CYANDARK = accentDark(
  "cyandark",
  "Cyan · Dark",
  "Black + white + cyan",
  "#06B6D4",
  "6,182,212",
  "#04141A",
  "#020A0E"
);

const LIMEDARK = accentDark(
  "limedark",
  "Lime · Dark",
  "Black + white + lime",
  "#A3E635",
  "163,230,53",
  "#101A05",
  "#080D02"
);

const MAGENTADARK = accentDark(
  "magentadark",
  "Magenta · Dark",
  "Black + white + magenta",
  "#D946EF",
  "217,70,239",
  "#1F081F",
  "#100410"
);

const SLATEDARK = accentDark(
  "slatedark",
  "Slate · Dark",
  "Black + white + corporate slate",
  "#64748B",
  "100,116,139",
  "#10131A",
  "#08090F"
);

const GOLDDARK = accentDark(
  "golddark",
  "Gold · Dark",
  "Black + white + warm gold (premium / luxury feel)",
  "#D4A24C",
  "212,162,76",
  "#1A1308",
  "#0D0904"
);

const INDIGODARK = accentDark(
  "indigodark",
  "Indigo · Dark",
  "Black + white + deep indigo (Linear-ish)",
  "#6366F1",
  "99,102,241",
  "#0E0F22",
  "#070811"
);

/* ─────────────────────────────────────────────────────────────────────
   Theme — Sage (soft warm-paper light theme — softer than Editorial)
   ───────────────────────────────────────────────────────────────────── */
const SAGE: Theme = {
  name: "sage",
  label: "Sage · Soft Paper",
  blurb: "Soft warm paper · sage green accent · the calmest light theme",
  mode: "light",
  fontDisplay: "var(--font-fraunces)",
  fontBody: "var(--font-inter)",
  bgMode: "origami",
  vars: {
    "--bg": "#EFEAE0",
    "--bg-elev": "#F4EFE6",
    "--fg": "#1B1F1C",
    "--muted": "rgba(27,31,28,0.70)",
    "--muted-2": "rgba(27,31,28,0.46)",

    "--accent": "#7A8B6E",
    "--accent-2": "#7A8B6E",
    "--accent-soft": "rgba(122,139,110,0.10)",
    "--accent-glow": "rgba(122,139,110,0.20)",
    "--accent-strong": "rgba(122,139,110,0.40)",

    "--card-bg": "#F4EFE6",
    "--card-bg-2": "#E9E2D5",
    "--card-bg-elev": "#F4EFE6",
    "--card-bg-elev-2": "#E8E1D3",
    "--card-bg-accent": "#E5E5D8",
    "--card-bg-accent-2": "#D8D8C5",
    "--card-border": "rgba(27,31,28,0.10)",
    "--card-border-strong": "rgba(27,31,28,0.18)",
    "--card-border-accent": "rgba(122,139,110,0.26)",
    "--card-border-accent-strong": "rgba(122,139,110,0.42)",

    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",

    "--ring": "rgba(122,139,110,0.45)",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Export
   ───────────────────────────────────────────────────────────────────── */

export const themes: Record<ThemeName, Theme> = {
  holoblack: HOLOBLACK,
  pureblack: PUREBLACK,
  brightorange: BRIGHTORANGE,
  terracotta: TERRACOTTA,
  golddark: GOLDDARK,
  pinkdark: PINKDARK,
  magentadark: MAGENTADARK,
  reddark: REDDARK,
  bluedark: BLUEDARK,
  cyandark: CYANDARK,
  indigodark: INDIGODARK,
  tealdark: TEALDARK,
  greendark: GREENDARK,
  limedark: LIMEDARK,
  yellowdark: YELLOWDARK,
  purpledark: PURPLEDARK,
  slatedark: SLATEDARK,
  monodark: MONODARK,
  monolight: MONOLIGHT,
  editorial: EDITORIAL,
  sage: SAGE,
};

export const DEFAULT_THEME: ThemeName = "holoblack";
