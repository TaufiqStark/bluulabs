/**
 * ╔══════════════════════════════════════════════════╗
 *  HERO CONFIG — Hero section content
 *  Headline, subtitle, and bento card data
 * ╚══════════════════════════════════════════════════╝
 */

export const hero = {
    headline: {
        line1: "Simplifying complexity",
        line2: "through",
        emphasis: "design thinking",
    },
    subtitle:
        "Full-stack developer crafting elegant digital experiences through clean code and thoughtful design.",

    /** Bento cards displayed below the headline */
    cards: {
        note: {
            label: "Note",
            quote:
                '"The best interfaces feel invisible — design should serve, not distract."',
        },
        profile: {
            name: "Taufiq",
            role: "Developer & Designer",
            initial: "T",
        },
        work: {
            tagline: "Building scalable apps with modern web technologies.",
            ctaLabel: "View Work",
            ctaHref: "#work",
        },
        collab: {
            preTitle: "Open to",
            title: "Freelance & Collaboration",
            subtitle: "Let's build something meaningful together.",
        },
    },
} as const;
