"use client";

import { useAdminTheme } from "./AdminThemeProvider";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAdminTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium",
        isDark
          ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
          : "border-black/10 bg-black/5 text-black/80 hover:bg-black/10",
        "backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]",
        isDark ? "focus:outline-none focus:ring-2 focus:ring-white/20" : "focus:outline-none focus:ring-2 focus:ring-black/15",
      ].join(" ")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
