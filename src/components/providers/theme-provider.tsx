"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "mission-controller-theme";
const DEFAULT_THEME: Theme = "light";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readTheme(): Theme {
  if (typeof document === "undefined") {
    return DEFAULT_THEME;
  }

  const theme = document.documentElement.dataset.theme;
  return theme === "dark" || theme === "light" ? theme : DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme);

  useEffect(() => {
    const nextTheme = readTheme();
    setThemeState(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      toggleTheme: () => {
        setThemeState((current) => (current === "light" ? "dark" : "light"));
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export const themeScript = `
(() => {
  const storageKey = "${STORAGE_KEY}";
  const fallback = "${DEFAULT_THEME}";

  try {
    const saved = window.localStorage.getItem(storageKey);
    const theme = saved === "dark" || saved === "light" ? saved : fallback;
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = fallback;
  }
})();
`;
