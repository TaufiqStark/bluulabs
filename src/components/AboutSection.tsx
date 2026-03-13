"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IMAGES = [
    { src: "/project-2.png", tx: 0, ty: -50, tr: -5, itx: -2, ity: 2, itr: -2, z: 10 },    // Top
    { src: "/exp-4.png", tx: 48, ty: -15, tr: 15, itx: 2, ity: -2, itr: 2, z: 20 },      // Top Right
    { src: "/exp-1.png", tx: 29, ty: 40, tr: -8, itx: -1, ity: -1, itr: -1, z: 30 },     // Bottom Right
    { src: "/exp-3.png", tx: -29, ty: 40, tr: 12, itx: 0, ity: 0, itr: 0, z: 40 },       // Bottom Left
    { src: "/project-1.png", tx: -48, ty: -15, tr: -10, itx: 1, ity: 1, itr: 1, z: 50 }, // Top Left
];

export default function AboutSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        let rafId: number;
        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                if (!trackRef.current) return;
                const rect = trackRef.current.getBoundingClientRect();

                // Track goes from viewport-bottom (rect.top = window.innerHeight) 
                // to completely scrolled past (rect.bottom = 0).
                const scrollableDistance = rect.height - window.innerHeight;

                if (scrollableDistance <= 0) return; // Prevent divide by zero if track is too short

                // Calculate progress clamped between 0 and 1
                const p = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

                trackRef.current.style.setProperty('--scroll-p', p.toString());

                // Update text highlight index
                if (p < 0.33) setActiveIndex(0);
                else if (p < 0.66) setActiveIndex(1);
                else if (p < 0.98) setActiveIndex(2);
                else setActiveIndex(3); // All highlighted at the very end
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // init on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const isAnyHovered = hoveredIndex !== null;

    return (
        <section id="about" className="relative w-full bg-[var(--color-bg)]">
            <div className="section-divider section-divider-light" />

            {/* The tall scrollable track driving the animation */}
            <div ref={trackRef} className="relative w-full" style={{ height: "300vh" }}>

                {/* The Sticky Container */}
                <div
                    className="sticky top-0 h-screen w-full flex flex-col md:grid md:grid-cols-12 items-center max-w-[1200px] mx-auto px-6 md:px-12"
                    style={{ gap: "var(--space-8)" }}
                >

                    {/* Left: Scattered Images (4 Columns) */}
                    <div className="w-full md:col-span-5 lg:col-span-4 h-1/2 md:h-full flex items-center justify-center relative perspective-1000">
                        {/* Anchor Point Box */}
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                            {IMAGES.map((img, i) => {
                                const isHovered = hoveredIndex === i;

                                return (
                                    <div
                                        key={i}
                                        className="scatter-card absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-[var(--color-border-dyn)] cursor-pointer"
                                        style={{
                                            // The core magic: multiply CSS variable by the target offsets. 
                                            // If progress is 0, it falls back to the tight initial stack offsets.
                                            // If hovered, it centers strictly and scales up to 1 for full visibility.
                                            // If not hovered, it scatters and scales down to 0.75 so it doesn't block text.
                                            transform: isHovered
                                                ? `translate(0, 0) rotate(0deg) scale(1.08)`
                                                : `translate(calc(var(--scroll-p, 0) * ${img.tx}% + ${img.itx}%), calc(var(--scroll-p, 0) * ${img.ty}% + ${img.ity}%)) rotate(calc(var(--scroll-p, 0) * ${img.tr}deg + ${img.itr}deg)) scale(0.65)`,

                                            // Bring to front if hovered
                                            zIndex: isHovered ? 100 : img.z,

                                            // Make other images completely disappear on hover
                                            opacity: isAnyHovered && !isHovered ? 0 : 1,

                                            // Disable pointer events if invisible to avoid hovering invisible cards
                                            pointerEvents: isAnyHovered && !isHovered ? 'none' : 'auto',

                                            // Transition smoothing
                                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, z-index 0s',
                                        }}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={`About visual ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 50vw, 40vw"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Scrollytelling Text (8 Columns) */}
                    <div className="w-full md:col-span-7 lg:col-span-8 flex flex-col justify-center mt-8 md:mt-0 lg:pl-4">
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-medium leading-[1.4] tracking-tight">
                            <span
                                className={`transition-all duration-700 ${activeIndex === 0 || activeIndex === 3 ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] opacity-30"}`}
                            >
                                Hi, I&apos;m a developer and designer who makes life easier through elegant code and no-nonsense design.{" "}
                            </span>
                            <span
                                className={`transition-all duration-700 ${activeIndex === 1 || activeIndex === 3 ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] opacity-30"}`}
                            >
                                I focus on quality, aesthetics, and creating measurable value in real-world web experiences.{" "}
                            </span>
                            <span
                                className={`transition-all duration-700 ${activeIndex === 2 || activeIndex === 3 ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] opacity-30"}`}
                            >
                                I&apos;m driven by emotion, intent, and the belief that good software need not shout — unless it needs to.
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Outro Stats (Below the track) */}
            <div className="py-24 bg-[var(--color-bg)] relative z-10 border-t border-[var(--color-border-dyn)]">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: "5+", label: "Years Experience" },
                        { value: "30+", label: "Projects" },
                        { value: "15+", label: "Happy Clients" },
                        { value: "10k+", label: "Commits" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div
                                className="font-bold text-[var(--color-text-primary)] text-4xl mb-2"
                                style={{ letterSpacing: "-0.02em" }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="text-[var(--color-text-muted)] uppercase text-xs font-medium tracking-[0.08em]"
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
