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
            "Taufiq has an incredible ability to translate complex requirements into elegant, maintainable solutions.",
        name: "Alex Chen",
        role: "CTO at TechFlow",
    },
    {
        quote:
            "Working with Taufiq was outstanding. Every project was completed ahead of schedule with exceptional craftsmanship.",
        name: "Sarah Miller",
        role: "Product Lead at Nexus",
    },
    {
        quote:
            "His combination of technical skill and design sensibility is rare and invaluable.",
        name: "James Park",
        role: "Founder at CloudBase",
    },
];
