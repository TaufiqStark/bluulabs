"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCSSVariables } from "@/config/design-tokens";

type AdminTheme = "light" | "dark";

type AdminThemeContextValue = {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
};

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function AdminThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: AdminTheme;
}) {
  const [theme, setTheme] = useState<AdminTheme>(defaultTheme);

  useEffect(() => {
    // Apply design tokens as CSS variables so Tailwind + raw CSS can use them.
    const vars = getCSSVariables(theme);
    const root = document.documentElement;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    document.body.setAttribute("data-active-theme", theme);
    document.body.setAttribute("data-admin", "true");

    return () => {
      document.body.removeAttribute("data-admin");
    };
  }, [theme]);

  const value = useMemo<AdminThemeContextValue>(() => {
    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    };
  }, [theme]);

  return <AdminThemeContext.Provider value={value}>{children}</AdminThemeContext.Provider>;
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error("useAdminTheme must be used within <AdminThemeProvider />");
  return ctx;
}
