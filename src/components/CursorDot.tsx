"use client";

import { useEffect, useRef } from "react";

export default function CursorDot() {
    const dotRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const isDark = useRef(false);
    const rafId = useRef<number>(0);

    useEffect(() => {
        const dot = dotRef.current;
        if (!dot) return;

        // Cache dot-grid-reveal sections
        const revealSections = document.querySelectorAll<HTMLElement>(".dot-grid-reveal");

        const handleMouseMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };

            // Update cursor position on each reveal section (relative to that section)
            revealSections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const relX = e.clientX - rect.left;
                const relY = e.clientY - rect.top;
                section.style.setProperty("--cursor-x", `${relX}px`);
                section.style.setProperty("--cursor-y", `${relY}px`);
            });

            // Global cursor position for full-page fixed overlays
            document.documentElement.style.setProperty("--cursor-clientX", `${e.clientX}px`);
            document.documentElement.style.setProperty("--cursor-clientY", `${e.clientY}px`);

            // Detect section background for dot color
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (!el) return;
            const section = el.closest("section, footer, nav, main");
            if (!section) return;

            const theme = section.getAttribute("data-theme");
            const light = theme !== "dark";

            if (light && isDark.current) {
                isDark.current = false;
                dot.style.background = "#141414";
                dot.style.boxShadow = "none";
                dot.style.width = "10px";
                dot.style.height = "10px";
            } else if (!light && !isDark.current) {
                isDark.current = true;
                dot.style.background = "#2dd4bf";
                dot.style.boxShadow = "0 0 16px rgba(45, 212, 191, 0.4)";
                dot.style.width = "12px";
                dot.style.height = "12px";
            }
        };

        const handleMouseEnter = () => {
            dot.style.opacity = "1";
        };

        const handleMouseLeave = () => {
            dot.style.opacity = "0";
        };

        // Smooth follow for the dot
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.15;
            pos.current.y += (target.current.y - pos.current.y) * 0.15;
            dot.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
            rafId.current = requestAnimationFrame(animate);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        rafId.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div
            ref={dotRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#141414",
                opacity: 0,
                willChange: "transform",
                transition: "background 0.3s, opacity 0.4s, box-shadow 0.3s, width 0.3s, height 0.3s",
            }}
        />
    );
}

function isLightColor(bgColor: string): boolean {
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return true;
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}
