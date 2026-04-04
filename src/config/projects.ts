/**
 * ╔══════════════════════════════════════════════════╗
 *  PROJECTS CONFIG — "Selected Work" section data
 *  Add, remove, or reorder projects here
 * ╚══════════════════════════════════════════════════╝
 */

export interface Project {
    title: string;
    role: string;
    year: string;
    category: string;
    description: string;
    tags: string[];
    badges: string[];
    imageSrc?: string;
    accentColor: string;
    glowColor: string;
    link?: string;
}

export const projects: Project[] = [
    {
        title: "CloudFlow Dashboard",
        role: "Lead Developer",
        year: "2025",
        category: "Web App · Data Visualization",
        description:
            "A real-time analytics dashboard for monitoring cloud infrastructure metrics. Built with a focus on performance and clarity, handling over 10k data points per second.",
        tags: ["React", "TypeScript", "D3.js", "WebSocket"],
        badges: ["Real-time data pipeline", "10k+ data points/sec"],
        imageSrc: "/project-1.png",
        accentColor: "#60a5fa",
        glowColor: "rgba(96, 165, 250, 0.06)",
        link: "#",
    },
    {
        title: "Resonance",
        role: "Full-Stack Developer",
        year: "2024",
        category: "Mobile App · AI/ML",
        description:
            "A music discovery platform with AI-powered recommendations. Features real-time audio visualization and social sharing capabilities.",
        tags: ["Next.js", "Python", "AI/ML", "PostgreSQL"],
        badges: ["AI-powered recommendations", "Real-time audio viz"],
        imageSrc: "/project-2.png",
        accentColor: "#f472b6",
        glowColor: "rgba(244, 114, 182, 0.06)",
        link: "#",
    },
    {
        title: "Nexus Commerce",
        role: "Frontend Architect",
        year: "2024",
        category: "E-Commerce · Performance",
        description:
            "High-performance e-commerce platform handling 50k+ daily transactions. Optimized for conversion with sub-second page loads and seamless checkout.",
        tags: ["Next.js", "Stripe", "Redis", "Tailwind"],
        badges: ["50k+ daily transactions", "Sub-second page loads"],
        imageSrc: "/project-3.png",
        accentColor: "#a78bfa",
        glowColor: "rgba(167, 139, 250, 0.06)",
        link: "#",
    },
    {
        title: "DevForge IDE",
        role: "Core Contributor",
        year: "2023",
        category: "Dev Tool · Collaboration",
        description:
            "Cloud-based development environment with real-time collaboration, integrated CI/CD, and AI-assisted code completion.",
        tags: ["Electron", "Node.js", "WebRTC", "Monaco"],
        badges: ["Real-time collab", "AI code completion"],
        imageSrc: "/project-4.png",
        accentColor: "#60a5fa",
        glowColor: "rgba(96, 165, 250, 0.06)",
        link: "#",
    },
];
