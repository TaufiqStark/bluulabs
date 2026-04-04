/**
 * ╔══════════════════════════════════════════════════╗
 *  TESTIMONIALS CONFIG — "What others said" section
 *  Add, remove, or reorder testimonials here
 * ╚══════════════════════════════════════════════════╝
 */

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
}

export const testimonials: Testimonial[] = [
    {
        quote:
            "Taufiq doesn’t just ship features, he brings structure. The codebase got cleaner, the UI got sharper, and the team moved faster.",
        name: "Alex Chen",
        role: "CTO · Product & Engineering",
    },
    {
        quote:
            "He’s rare: strong taste, solid engineering instincts, and calm execution under pressure. The handoff was spotless.",
        name: "Sarah Miller",
        role: "Product Lead · B2B SaaS",
    },
    {
        quote:
            "The work felt intentional end to end: information architecture, micro-interactions, and performance. It elevated the whole product.",
        name: "James Park",
        role: "Founder · Startup Studio",
    },
];
