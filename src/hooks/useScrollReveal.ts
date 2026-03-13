"use client";

import { useState, useEffect, useRef } from "react";

interface ScrollRevealOptions {
    threshold?: number | number[];
    rootMargin?: string;
    delayMs?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: ScrollRevealOptions = {}) {
    const { threshold = 0.1, rootMargin = "0px", delayMs = 0 } = options;

    const ref = useRef<T>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (delayMs > 0) {
                        setTimeout(() => setRevealed(true), delayMs);
                    } else {
                        setRevealed(true);
                    }
                } else {
                    setRevealed(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, delayMs]);

    return { ref, revealed };
}
