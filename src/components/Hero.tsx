"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function HeroCard({
    children,
    className = "",
    rotate = 0,
    hoverRotate = 0,
}: {
    children: React.ReactNode;
    className?: string;
    rotate?: number;
    hoverRotate?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(${hoverRotate}deg) translateY(-6px) scale(1.02)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) rotate(${rotate}deg) translateY(0px) scale(1)`;
    };

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-500 ease-out cursor-pointer overflow-hidden ${className}`}
            style={{
                transform: `rotate(${rotate}deg)`,
                borderRadius: "var(--radius-xl)",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}

export default function Hero() {
    const { ref, revealed } = useScrollReveal({ threshold: 0.1 });

    return (
        <section
            ref={ref}
            id="hero"
            data-theme="light"
            className="relative flex flex-col items-center justify-center overflow-hidden dot-grid-reveal"
            style={{ minHeight: "100svh", padding: "var(--space-24) var(--space-6)" }}
        >
            {/* Content */}
            <div className="relative z-10 max-w-[1000px] w-full flex flex-col items-center text-center" style={{ gap: "var(--space-5)" }}>
                <h1
                    className="transition-all duration-1000 ease-out"
                    style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? "translateY(0)" : "translateY(24px)",
                        transitionDelay: "0.2s"
                    }}
                >
                    <span
                        className="block font-medium text-[var(--color-text-primary)]"
                        style={{ fontSize: "var(--text-hero)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
                    >
                        Simplifying complexity
                    </span>
                    <span
                        className="block font-medium text-[var(--color-text-primary)]"
                        style={{ fontSize: "var(--text-hero)", lineHeight: 0.9, letterSpacing: "-0.03em", marginTop: "var(--space-2)" }}
                    >
                        through{" "}
                        <em className="font-[var(--font-instrument)] font-normal italic">
                            design thinking
                        </em>
                    </span>
                </h1>

                <p
                    className="max-w-[520px] text-[var(--color-text-secondary)] leading-relaxed transition-all duration-1000 ease-out"
                    style={{
                        fontSize: "var(--text-sm)",
                        marginTop: "var(--space-2)",
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? "translateY(0)" : "translateY(24px)",
                        transitionDelay: "0.4s"
                    }}
                >
                    Full-stack developer crafting elegant digital experiences through clean
                    code and thoughtful design.
                </p>
            </div>

            {/* Cards row */}
            <div
                className="relative z-10 w-full max-w-[1000px] transition-all duration-1000 ease-out"
                style={{
                    marginTop: "var(--space-16)",
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(24px)",
                    transitionDelay: "0.6s"
                }}
            >
                <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "var(--space-4)" }}>
                    {/* Card 1 — Note */}
                    <HeroCard rotate={-2} hoverRotate={-1} className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)]">
                        <div
                            className="w-full bg-[#faf5e6] flex flex-col"
                            style={{ height: 240, padding: "var(--space-6)", gap: "var(--space-3)" }}
                        >
                            <span className="text-[#b8a060] font-semibold uppercase" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.1em" }}>
                                Note
                            </span>
                            <p
                                className="text-[#57471e] leading-relaxed flex-1"
                                style={{ fontSize: "var(--text-sm)", fontFamily: "'Nanum Pen Script', cursive" }}
                            >
                                &quot;The best interfaces feel invisible — design should serve,
                                not distract.&quot;
                            </p>
                            <div className="w-8 h-[2px] bg-[#b8a060]/30 rounded-full" />
                        </div>
                    </HeroCard>

                    {/* Card 2 — Profile */}
                    <HeroCard rotate={1} hoverRotate={0} className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)]">
                        <div
                            className="w-full bg-gradient-to-br from-[#e8f5f3] via-[#ede8f5] to-[#f5e8ef] flex items-center justify-center relative"
                            style={{ height: 240 }}
                        >
                            <span className="text-7xl font-bold text-[var(--color-text-primary)]/[0.05] select-none">T</span>
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm"
                                style={{ padding: "var(--space-3) var(--space-4)" }}
                            >
                                <p className="text-[var(--color-text-primary)] font-medium" style={{ fontSize: "var(--text-xs)" }}>Taufiq</p>
                                <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "10px" }}>Developer & Designer</p>
                            </div>
                        </div>
                    </HeroCard>

                    {/* Card 3 — Dark / Work */}
                    <HeroCard rotate={-1} hoverRotate={0} className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)]">
                        <div
                            className="w-full bg-[var(--color-surface)] flex flex-col justify-between"
                            style={{ height: 240, padding: "var(--space-6)" }}
                        >
                            <div>
                                <div
                                    className="flex items-center justify-center bg-[var(--color-glow-teal)]"
                                    style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", marginBottom: "var(--space-4)" }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-teal)" strokeWidth="2">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                                <p className="text-white/50 leading-relaxed" style={{ fontSize: "var(--text-xs)" }}>
                                    Building scalable apps with modern web technologies.
                                </p>
                            </div>
                            <a
                                href="#work"
                                className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 transition-colors w-fit"
                                style={{ fontSize: "var(--text-xs)", borderRadius: "var(--radius-full)", padding: "var(--space-2) var(--space-4)" }}
                            >
                                View Work
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </a>
                        </div>
                    </HeroCard>

                    {/* Card 4 — Collab */}
                    <HeroCard rotate={2} hoverRotate={1} className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)]">
                        <div
                            className="w-full bg-white flex flex-col justify-end border border-[var(--color-border-light)]"
                            style={{ height: 240, padding: "var(--space-6)" }}
                        >
                            <span className="text-[var(--color-text-primary)] font-medium" style={{ fontSize: "var(--text-xs)" }}>
                                Open to
                            </span>
                            <span
                                className="text-[var(--color-text-primary)] font-medium leading-tight"
                                style={{ fontSize: "var(--text-xl)", marginTop: "var(--space-1)", letterSpacing: "-0.02em" }}
                            >
                                Freelance &
                            </span>
                            <span
                                className="text-[var(--color-text-primary)] font-medium leading-tight"
                                style={{ fontSize: "var(--text-xl)", letterSpacing: "-0.02em" }}
                            >
                                Collaboration
                            </span>
                            <div className="w-full h-[1px] bg-[var(--color-border-light)]" style={{ margin: "var(--space-3) 0" }} />
                            <p className="text-[var(--color-text-secondary)] leading-relaxed" style={{ fontSize: "var(--text-xs)" }}>
                                Let&apos;s build something meaningful together.
                            </p>
                        </div>
                    </HeroCard>
                </div>
            </div>
        </section>
    );
}
