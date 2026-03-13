"use client";

import { useEffect } from "react";
import { getCSSVariables } from "@/config/design-tokens";
import { themeConfig } from "@/config";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Inject all default (light) CSS variables on mount
        const lightVars = getCSSVariables("light");
        const root = document.documentElement;
        Object.entries(lightVars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        const handleScroll = () => {
            const sections = document.querySelectorAll("[data-theme]");
            const viewportTrigger = window.innerHeight * themeConfig.viewportTrigger;

            let activeTheme: "light" | "dark" = "light";

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= viewportTrigger && rect.bottom >= viewportTrigger) {
                    activeTheme = (section.getAttribute("data-theme") as "light" | "dark") || "light";
                }
            });

            // Swap only the dynamic (theme-aware) CSS variables
            const vars = getCSSVariables(activeTheme);
            const dynamicKeys = [
                "--color-bg",
                "--color-text-primary",
                "--color-text-secondary",
                "--color-text-muted",
                "--color-text-inverse",
                "--color-border-dyn",
            ] as const;

            dynamicKeys.forEach((key) => {
                root.style.setProperty(key, vars[key]);
            });

            document.body.setAttribute("data-active-theme", activeTheme);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        setTimeout(handleScroll, 100);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <>{children}</>;
}
