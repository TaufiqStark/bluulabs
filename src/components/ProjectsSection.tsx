"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/config";

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [entered, setEntered] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger bg fade when section is about to enter viewport
        const bgObserver = new IntersectionObserver(
            ([entry]) => {
                setEntered(entry.isIntersecting);
            },
            { rootMargin: "0px 0px 200px 0px", threshold: 0 }
        );

        // Trigger content fade-in
        const contentObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            },
            { threshold: 0.08 }
        );

        if (sectionRef.current) {
            bgObserver.observe(sectionRef.current);
            contentObserver.observe(sectionRef.current);
        }

        return () => {
            bgObserver.disconnect();
            contentObserver.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="work"
            data-theme="dark"
            className="relative section-padding"
        >
            <div className="max-w-[1200px] mx-auto">
                {/* Section heading */}
                <div
                    className="flex flex-col md:flex-row md:items-end md:justify-between"
                    style={{
                        gap: "var(--space-4)",
                        marginBottom: "var(--space-16)",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(30px)",
                        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                    }}
                >
                    <h2
                        className="font-medium text-[var(--color-text-primary)]"
                        style={{
                            fontSize: "var(--text-5xl)",
                            letterSpacing: "-0.03em",
                            lineHeight: 0.9,
                        }}
                    >
                        Selected work.
                    </h2>
                    <p
                        className="text-[var(--color-text-secondary)] max-w-[320px]"
                        style={{ fontSize: "var(--text-sm)" }}
                    >
                        Projects I&apos;ve led and contributed to, from concept to launch.
                    </p>
                </div>

                {/* Project cards */}
                <div
                    className="flex flex-col relative"
                    style={{ gap: "var(--space-6)" }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            style={{
                                position: "sticky",
                                top: `calc(15vh + ${index * 40}px)`,
                                zIndex: index + 1,
                            }}
                        >
                            <div
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? "translateY(0)" : "translateY(40px)",
                                    transition: `opacity 0.7s ease-out ${0.15 + index * 0.12}s, transform 0.7s ease-out ${0.15 + index * 0.12}s`,
                                }}
                            >
                                <ProjectCard {...project} index={index} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Extra padding so the last sticky card has scroll space */}
            <div style={{ height: "40vh" }} />
        </section>
    );
}
