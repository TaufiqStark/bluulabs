"use client";

import { experiments } from "@/config/experiments";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ExperimentCard from "./ExperimentCard";

export default function ExperimentsSection() {
    const { ref, revealed } = useScrollReveal({ threshold: 0.15 });

    return (
        <section ref={ref} id="experiments" data-theme="light" className="relative section-padding dot-grid-reveal">
            {/* Divider */}
            <div className="section-divider section-divider-light" />

            <div
                className="max-w-[1200px] mx-auto transition-all duration-1000 ease-out"
                style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(40px)"
                }}
            >
                {/* Section heading */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: "var(--space-4)", marginBottom: "var(--space-16)" }}>
                    <h2
                        className="font-medium text-[var(--color-text-primary)]"
                        style={{ fontSize: "var(--text-5xl)", letterSpacing: "-0.03em", lineHeight: 0.9 }}
                    >
                        Experiments.
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-[400px]" style={{ fontSize: "var(--text-sm)" }}>
                        Side projects and explorations — things I build for fun, learning, and curiosity.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "var(--space-6)" }}>
                    {experiments.map((exp, i) => (
                        <ExperimentCard key={i} {...exp} />
                    ))}
                </div>

                {/* View All Button */}
                <div
                    className="flex justify-center"
                    style={{ marginTop: "var(--space-16)" }}
                >
                    <a
                        href="#"
                        className="inline-flex items-center justify-center font-medium transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: "var(--color-text-primary)",
                            color: "var(--color-bg)",
                            padding: "var(--space-4) var(--space-8)",
                            borderRadius: "var(--radius-full)",
                            fontSize: "var(--text-sm)",
                            boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)",
                        }}
                    >
                        View all experiments
                    </a>
                </div>
            </div>
        </section>
    );
}
