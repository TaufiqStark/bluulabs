"use client";

import Image from "next/image";
import { Experiment } from "@/config/experiments";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ExperimentCard({ title, category, description, tags, link, imageSrc }: Experiment) {
    const { ref, revealed } = useScrollReveal<HTMLAnchorElement>({ threshold: 0.2, rootMargin: "-10% 0px -5% 0px" });

    return (
        <a
            ref={ref}
            href={link}
            className="group flex flex-col bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)] transition-colors duration-300"
            style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden" }}
        >
            {/* Thumbnail */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[var(--color-border-light)]">
                <div
                    className="absolute inset-0"
                    style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed
                            ? "translateY(0) scale(1)"
                            : "translateY(40px) scale(1.08)",
                        transition: `opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s`,
                    }}
                >
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1" style={{ padding: "var(--space-6) var(--space-8)" }}>
                {/* Tags (moved to top as requested) */}
                <p
                    className="text-[var(--color-text-muted)]"
                    style={{
                        fontSize: "var(--text-xs)",
                        letterSpacing: "0.02em",
                    }}
                >
                    {category} · {tags.join(" · ")}
                </p>

                {/* Title */}
                <h3
                    className="font-semibold text-[var(--color-text-primary)]"
                    style={{
                        fontSize: "var(--text-xl)",
                        letterSpacing: "-0.02em",
                        marginTop: "var(--space-3)",
                        marginBottom: "var(--space-2)",
                        lineHeight: 1.1,
                    }}
                >
                    {title}
                </h3 >

                {/* Description */}
                <p className="text-[var(--color-text-secondary)] leading-relaxed flex-1" style={{ fontSize: "var(--text-sm)", marginBottom: "var(--space-8)" }}>
                    {description}
                </p>

                {/* CTA Link */}
                <div
                    className="inline-flex items-center text-[var(--color-text-primary)] font-medium w-fit group/link"
                    style={{
                        fontSize: "var(--text-sm)",
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
                    <span className="border-b border-[var(--color-text-primary)]/20 group-hover/link:border-[var(--color-text-primary)]/60 transition-colors duration-300 pb-[1px]">
                        View Experiment
                    </span>
                </div>
            </div>
        </a>
    );
}
