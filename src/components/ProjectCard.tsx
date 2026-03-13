"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProjectCardProps {
    title: string;
    role: string;
    year: string;
    category: string;
    description: string;
    tags: string[];
    badges: string[];
    imageSrc?: string;
    accentColor: string;
    glowColor: string;
    link?: string;
    index: number;
}

export default function ProjectCard({
    title,
    role,
    year,
    category,
    description,
    tags,
    badges,
    imageSrc,
    accentColor,
    glowColor,
    link = "#",
    index,
}: ProjectCardProps) {
    const previewRef = useRef<HTMLDivElement>(null);
    const [imageRevealed, setImageRevealed] = useState(false);

    // Scroll-reveal: observe the right preview panel
    useEffect(() => {
        const el = previewRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setImageRevealed(true), 150);
                } else {
                    setImageRevealed(false);
                }
            },
            {
                threshold: 0.3,
                rootMargin: "-10% 0px -5% 0px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="group relative bg-[var(--color-bg-card)] overflow-hidden transition-all duration-500 cursor-pointer"
            style={{
                borderRadius: "var(--radius-2xl)",
            }}
        >
            {/* Glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
                }}
            />

            <div className="relative z-10 h-full flex flex-col md:flex-row items-stretch">
                {/* ─── Left: Text Content ─── */}
                <div
                    className="flex-1 flex flex-col min-w-0"
                    style={{ padding: "var(--space-12) var(--space-10) var(--space-10)" }}
                >
                    {/* Logo icon */}
                    <div
                        className="flex items-center justify-center font-bold"
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: "var(--radius-lg)",
                            backgroundColor: accentColor + "22",
                            color: accentColor,
                            fontSize: "var(--text-xl)",
                            border: `1.5px solid ${accentColor}33`,
                        }}
                    >
                        {title.charAt(0)}
                    </div>

                    {/* Meta row */}
                    <p
                        className="text-[var(--color-text-muted)]"
                        style={{
                            fontSize: "var(--text-xs)",
                            marginTop: "var(--space-6)",
                            letterSpacing: "0.02em",
                        }}
                    >
                        {year} · {category}
                    </p>

                    {/* Title */}
                    <h3
                        className="font-semibold text-white"
                        style={{
                            fontSize: "var(--text-3xl)",
                            letterSpacing: "-0.02em",
                            marginTop: "var(--space-3)",
                            lineHeight: 1.1,
                        }}
                    >
                        {title}
                    </h3>

                    {/* Description */}
                    <p
                        className="text-[var(--color-text-secondary)] leading-relaxed max-w-[420px]"
                        style={{ fontSize: "var(--text-sm)", marginTop: "var(--space-4)" }}
                    >
                        {description}
                    </p>

                    {/* CTA link */}
                    <a
                        href={link}
                        className="inline-flex items-center text-white font-medium w-fit group/link"
                        style={{
                            fontSize: "var(--text-sm)",
                            marginTop: "var(--space-6)",
                            gap: "var(--space-2)",
                        }}
                    >
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                        <span className="border-b border-white/20 group-hover/link:border-white/60 transition-colors duration-300 pb-[1px]">
                            View Project
                        </span>
                    </a>

                    {/* Spacer */}
                    <div className="flex-1" style={{ minHeight: "var(--space-10)" }} />

                    {/* Badges — stacked vertically */}
                    <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
                        {badges.map((badge) => (
                            <span
                                key={badge}
                                className="inline-flex items-center text-white/80 w-fit"
                                style={{
                                    fontSize: "var(--text-xs)",
                                    borderRadius: "var(--radius-full)",
                                    padding: "var(--space-2) var(--space-4)",
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    gap: "var(--space-2)",
                                }}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ─── Right: Preview Area — FULL HEIGHT, accent bg ─── */}
                <div
                    ref={previewRef}
                    className="w-full md:w-[50%] flex-shrink-0 relative overflow-hidden"
                    style={{
                        background: `linear-gradient(145deg, ${accentColor}cc 0%, ${accentColor}99 50%, ${accentColor}66 100%)`,
                        minHeight: 520,
                        alignSelf: "stretch",
                    }}
                >
                    {/* Subtle dot pattern */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />

                    {/* Image — scroll reveal with ZOOM effect */}
                    <div
                        className="absolute z-10"
                        style={{
                            bottom: 0,
                            left: "6%",
                            right: "6%",
                            top: "var(--space-10)",
                            opacity: imageRevealed ? 1 : 0,
                            transform: imageRevealed
                                ? "translateY(0) scale(1)"
                                : "translateY(60px) scale(1.08)",
                            transition: `opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)`,
                        }}
                    >
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                                boxShadow: "0 -8px 40px rgba(0,0,0,0.3), 0 -2px 12px rgba(0,0,0,0.2)",
                            }}
                        >
                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={title}
                                    fill
                                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                />
                            ) : (
                                <div className="w-full h-full" style={{ background: `${accentColor}44` }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom border glow */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)`,
                }}
            />
        </div>
    );
}
