"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "mono" | "coffee" | "blue";

interface ThemeCtx { theme: Theme; setTheme: (t: Theme) => void; }
const Ctx = createContext<ThemeCtx>({ theme: "mono", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("mono");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nv_theme") as Theme | null;
      if (saved && ["mono", "coffee", "blue"].includes(saved)) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("nv_theme", t); } catch {}
  };

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
