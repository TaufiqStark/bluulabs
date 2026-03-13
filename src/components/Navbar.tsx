"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { navLinks, site } from "@/config";

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [isDark, setIsDark] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lastScrollY = useRef(0);
    const navRef = useRef<HTMLElement>(null);

    const detectBackground = useCallback(() => {
        // Sample a point just below the navbar center
        const el = document.elementFromPoint(window.innerWidth / 2, 80);
        if (!el) return;
        const section = el.closest("section, footer, main");
        if (!section) return;

        // Read data-theme attribute instead of computed style
        const theme = section.getAttribute("data-theme");
        setIsDark(theme === "dark");
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > lastScrollY.current && currentY > 100) {
                setVisible(false);
                setMobileOpen(false);
            } else {
                setVisible(true);
            }

            lastScrollY.current = currentY;
            detectBackground();
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        detectBackground(); // initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, [detectBackground]);

    // Color tokens based on background
    const logoColor = isDark ? "#fefefe" : "#141414";
    const linkColor = isDark ? "rgba(255,255,255,0.5)" : "#9e9e9e";
    const linkHoverColor = isDark ? "#ffffff" : "#141414";
    const hamburgerColor = isDark ? "#fefefe" : "#141414";
    const btnBg = isDark ? "#fefefe" : "#141414";
    const btnText = isDark ? "#141414" : "#ffffff";

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                transform: visible ? "translateY(0)" : "translateY(-100%)",
            }}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex items-center justify-between h-[72px]">
                {/* Logo */}
                <a
                    href="#hero"
                    className="font-medium text-lg tracking-tight hover:opacity-60 transition-all duration-300"
                    style={{ color: logoColor }}
                >
                    {site.name}
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="transition-colors duration-300 text-sm relative group"
                            style={{ color: linkColor }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                        >
                            {link.label}
                            <span
                                className="absolute left-0 -bottom-1 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                                style={{ backgroundColor: linkHoverColor }}
                            />
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="relative group px-5 py-2.5 text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: btnBg, color: btnText }}
                    >
                        Say hi!
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden relative w-6 h-5 flex flex-col justify-between"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`h-0.5 w-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[9px]" : ""
                            }`}
                        style={{ backgroundColor: hamburgerColor }}
                    />
                    <span
                        className={`h-0.5 w-full transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""
                            }`}
                        style={{ backgroundColor: hamburgerColor }}
                    />
                    <span
                        className={`h-0.5 w-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""
                            }`}
                        style={{ backgroundColor: hamburgerColor }}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden absolute top-[72px] left-0 right-0 bg-[#fefefe]/95 backdrop-blur-xl border-b border-black/5 transition-all duration-500 overflow-hidden ${mobileOpen ? "max-h-[320px] py-6" : "max-h-0 py-0"
                    }`}
            >
                <div className="flex flex-col items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-[#9e9e9e] hover:text-[#141414] transition-colors text-sm"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setMobileOpen(false)}
                        className="px-5 py-2 text-sm font-medium text-white bg-[#141414] rounded-full"
                    >
                        Say hi!
                    </a>
                </div>
            </div>
        </nav>
    );
}
