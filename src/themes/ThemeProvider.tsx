"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_THEME, Theme, ThemeName, themes } from "./themes";

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "vsg-theme-explorer";

/**
 * ThemeProvider — temporarily unlocked so the brand team can preview every
 * available palette via the floating ThemePicker dock. Persists the chosen
 * theme to localStorage so the choice survives reloads.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME);

  // On mount: hydrate from localStorage if present.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      if (stored && themes[stored]) {
        setThemeName(stored);
      }
    } catch {}
  }, []);

  // Apply CSS variables every time the theme changes.
  useEffect(() => {
    const t = themes[themeName];
    const root = document.documentElement;
    Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty("--font-display", t.fontDisplay);
    root.style.setProperty("--font-body", t.fontBody);
    root.dataset.theme = t.name;
    root.dataset.mode = t.mode;
    try {
      localStorage.setItem(STORAGE_KEY, themeName);
    } catch {}
  }, [themeName]);

  const setTheme = (name: ThemeName) => {
    if (themes[name]) setThemeName(name);
  };

  const value = useMemo(
    () => ({
      theme: themes[themeName],
      themeName,
      setTheme,
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
