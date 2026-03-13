"use client";

import { testimonials } from "@/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function TestimonialsSection() {
    const { ref, revealed } = useScrollReveal({ threshold: 0.15 });

    return (
        <section ref={ref} data-theme="dark" className="relative section-padding">
            {/* Divider */}
            <div className="section-divider" />

            <div
                className="max-w-[1200px] mx-auto transition-all duration-1000 ease-out"
                style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(40px)"
                }}
            >
                <h2
                    className="font-medium text-[var(--color-text-primary)]"
                    style={{ fontSize: "var(--text-5xl)", letterSpacing: "-0.03em", lineHeight: 0.9, marginBottom: "var(--space-16)" }}
                >
                    What others said.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--space-4)" }}>
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] transition-colors duration-300 flex flex-col justify-between"
                            style={{ borderRadius: "var(--radius-xl)", padding: "var(--space-8)" }}
                        >
                            {/* Quote mark */}
                            <div>
                                <span
                                    className="text-[var(--color-text-muted)] font-serif leading-none block select-none"
                                    style={{ fontSize: "var(--text-4xl)", marginBottom: "var(--space-4)" }}
                                >
                                    &ldquo;
                                </span>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed" style={{ fontSize: "var(--text-sm)" }}>
                                    {t.quote}
                                </p>
                            </div>

                            <div style={{ marginTop: "var(--space-8)" }}>
                                <p className="text-[var(--color-text-primary)] font-medium" style={{ fontSize: "var(--text-sm)" }}>
                                    {t.name}
                                </p>
                                <p className="text-[var(--color-text-muted)]" style={{ fontSize: "var(--text-xs)", marginTop: "var(--space-1)" }}>
                                    {t.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
