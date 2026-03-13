/**
 * ╔══════════════════════════════════════════════════╗
 *  EXPERIMENTS CONFIG — Side projects / experiments
 * ╚══════════════════════════════════════════════════╝
 */

export interface Experiment {
    title: string;
    category: string;
    description: string;
    tags: string[];
    link: string;
    imageSrc: string;
}

export const experiments: Experiment[] = [
    {
        title: "Roblox Inventory System",
        category: "Game Dev",
        description: "Prototype modular inventory system using Lua.",
        tags: ["Lua", "Roblox Studio"],
        link: "#",
        imageSrc: "/exp-1.png",
    },
    {
        title: "Algorithmic Generative Art",
        category: "Creative Coding",
        description: "Interactive web experience generating intricate geometric patterns.",
        tags: ["WebGL", "Three.js"],
        link: "#",
        imageSrc: "/exp-2.png",
    },
    {
        title: "Immersive 3D Portfolio",
        category: "Web Experience",
        description: "Floating interactive 3D objects with advanced lighting and materials.",
        tags: ["React Three Fiber", "GLSL"],
        link: "#",
        imageSrc: "/exp-3.png",
    },
    {
        title: "Minimalist AI Chatbot",
        category: "UI/UX Design",
        description: "Clean, polished conversational interface with smooth micro-interactions.",
        tags: ["Next.js", "Framer Motion"],
        link: "#",
        imageSrc: "/exp-4.png",
    },
];
