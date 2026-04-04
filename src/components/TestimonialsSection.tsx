"use client";

import { testimonials } from "@/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function TestimonialCard({
    quote,
    name,
    role,
    featured = false,
}: {
    quote: string;
    name: string;
    role: string;
    featured?: boolean;
}) {
    return (
        <article
            className={[
                "relative overflow-hidden transition-colors duration-300",
                featured ? "" : "bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)]",
            ].join(" ")}
            style={{
                borderRadius: "var(--radius-2xl)",
                padding: featured ? "var(--space-10)" : "var(--space-8)",
                border: featured ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(255,255,255,0.06)",
                background: featured ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))" : undefined,
                boxShadow: featured ? "0 40px 120px rgba(0,0,0,0.55)" : "var(--shadow-lg)",
                backdropFilter: featured ? "blur(18px)" : undefined,
                WebkitBackdropFilter: featured ? "blur(18px)" : undefined,
            }}
        >
            {/* Accent border glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                    background:
                        "radial-gradient(420px circle at 12% 8%, var(--color-glow-teal), transparent 45%), radial-gradient(520px circle at 88% 70%, var(--color-glow-purple), transparent 55%)",
                }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between" style={{ gap: "var(--space-6)" }}>
                        <span
                            className="select-none font-serif leading-none text-[var(--color-text-muted)]"
                            style={{ fontSize: featured ? "var(--text-5xl)" : "var(--text-4xl)" }}
                        >
                            &ldquo;
                        </span>
                        {featured && (
                            <span
                                className="inline-flex items-center text-[var(--color-text-muted)]"
                                style={{
                                    fontSize: "10px",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    borderRadius: "var(--radius-full)",
                                    padding: "6px 10px",
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: "rgba(255,255,255,0.04)",
                                }}
                            >
                                Featured
                            </span>
                        )}
                    </div>

                    <p
                        className="text-[var(--color-text-secondary)] leading-relaxed"
                        style={{ fontSize: featured ? "var(--text-base)" : "var(--text-sm)", marginTop: "var(--space-3)" }}
                    >
                        {quote}
                    </p>
                </div>

                <div style={{ marginTop: featured ? "var(--space-10)" : "var(--space-8)" }}>
                    <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                        <span
                            className="inline-flex"
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 9999,
                                background: "var(--color-accent-teal)",
                                boxShadow: "0 0 18px var(--color-glow-teal)",
                                opacity: 0.9,
                            }}
                        />
                        <p className="text-[var(--color-text-primary)] font-medium" style={{ fontSize: "var(--text-sm)" }}>
                            {name}
                        </p>
                    </div>
                    <p
                        className="text-[var(--color-text-muted)]"
                        style={{ fontSize: "var(--text-xs)", marginTop: "var(--space-1)", paddingLeft: 13 }}
                    >
                        {role}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default function TestimonialsSection() {
    const { ref, revealed } = useScrollReveal({ threshold: 0.15 });

    const repeated = [...testimonials, ...testimonials, ...testimonials, ...testimonials];
    const laneA = repeated.filter((_, idx) => idx % 2 === 0);
    const laneB = repeated.filter((_, idx) => idx % 2 === 1);
    const featured = testimonials[0] ?? { quote: "", name: "", role: "" };

    return (
        <section ref={ref} data-theme="dark" className="relative section-padding overflow-hidden">
            {/* Divider */}
            <div className="section-divider" />

            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute -top-20 left-1/2 h-[520px] w-[900px] -translate-x-1/2 opacity-60"
                style={{
                    background:
                        "radial-gradient(closest-side, var(--color-glow-teal), transparent 68%), radial-gradient(closest-side, var(--color-glow-blue), transparent 72%)",
                    filter: "blur(22px)",
                }}
            />

            <div className="max-w-[1200px] mx-auto">
                <div
                    className="transition-all duration-1000 ease-out"
                    style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? "translateY(0)" : "translateY(40px)",
                    }}
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: "var(--space-6)" }}>
                        <div>
                            <p
                                className="text-[var(--color-text-muted)] uppercase"
                                style={{ fontSize: "var(--text-xs)", letterSpacing: "0.15em", marginBottom: "var(--space-6)" }}
                            >
                                Testimonials
                            </p>
                            <h2
                                className="font-medium text-[var(--color-text-primary)]"
                                style={{ fontSize: "var(--text-5xl)", letterSpacing: "-0.03em", lineHeight: 0.9 }}
                            >
                                Notes from teams
                                <br />
                                I&apos;ve worked with.
                            </h2>
                        </div>
                        <p className="text-[var(--color-text-secondary)] max-w-[360px]" style={{ fontSize: "var(--text-sm)" }}>
                            Small quotes, big signal: clarity, craft, and calm execution. Curated for a personal portfolio.
                        </p>
                    </div>
                </div>

                <div
                    className="relative"
                    style={{
                        marginTop: "var(--space-16)",
                    }}
                >
                    {/* Masked marquee lanes */}
                    <div
                        className="relative overflow-hidden"
                        style={{
                            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                        }}
                    >
                        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
                            <div
                                className="flex w-max animate-marquee-left"
                                style={{ gap: "var(--space-4)", animation: "marquee-left 28s linear infinite" }}
                            >
                                {laneA.concat(laneA).map((t, idx) => (
                                    <div key={`a-${idx}`} style={{ width: 360 }}>
                                        <TestimonialCard {...t} />
                                    </div>
                                ))}
                            </div>

                            <div
                                className="flex w-max animate-marquee-right"
                                style={{ gap: "var(--space-4)", animation: "marquee-right 34s linear infinite" }}
                            >
                                {laneB.concat(laneB).map((t, idx) => (
                                    <div key={`b-${idx}`} style={{ width: 360 }}>
                                        <TestimonialCard {...t} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Featured card on top */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2"
                        style={{
                            padding: "0 var(--space-6)",
                        }}
                    >
                        <div className="pointer-events-auto">
                            <TestimonialCard {...featured} featured />
                        </div>
                    </div>
                </div>

                {/* Spacer so featured card doesn't feel cramped on small screens */}
                <div className="md:hidden" style={{ height: "var(--space-24)" }} />
            </div>
        </section>
    );
}
