"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { DEFAULT_THEME, Theme, ThemeName, themes } from "./themes";

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Ocean Deep is the permanent production theme. The theme picker has been
// removed; this provider exists purely to apply the theme's CSS variables
// once on mount. localStorage is actively cleared so any stale dev choice
// from an old session cannot override the brand.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeName: ThemeName = DEFAULT_THEME;

  useEffect(() => {
    const t = themes[themeName];
    const root = document.documentElement;
    Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty("--font-display", t.fontDisplay);
    root.style.setProperty("--font-body", t.fontBody);
    root.dataset.theme = t.name;
    root.dataset.mode = t.mode;
    // Scrub any stale theme choice from prior visits.
    try {
      localStorage.removeItem("vsg-theme");
      localStorage.removeItem("vsg-theme-v2");
    } catch {}
  }, [themeName]);

  const value = useMemo(
    () => ({
      theme: themes[themeName],
      themeName,
      setTheme: () => {
        /* locked to Ocean Deep */
      },
    }),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
