/**
 * ╔══════════════════════════════════════════════════╗
 *  ABOUT CONFIG — "About" section data
 *  Bio paragraphs, stats, and avatar initial
 * ╚══════════════════════════════════════════════════╝
 */

export const about = {
    heading: "About.",
    avatarInitial: "T",

    /** Bio paragraphs — supports inline HTML-like markup via JSX in the component */
    bio: [
        {
            text: "I'm a {highlight}passionate developer and creative thinker{/highlight} who thrives at the intersection of design and engineering. With a focus on building products that are not only functional but genuinely delightful to use.",
        },
        {
            text: "When I'm not coding, you'll find me exploring new design trends, contributing to open source, or experimenting with the latest web technologies. I believe {highlight}great software{/highlight} is crafted through collaboration, curiosity, and care.",
        },
    ],

    stats: [
        { value: "5+", label: "Years Experience" },
        { value: "30+", label: "Projects" },
        { value: "15+", label: "Happy Clients" },
        { value: "10k+", label: "Commits" },
    ],
} as const;
