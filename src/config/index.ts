/**
 * Config barrel — re-export everything from one import
 * Usage: import { site, projects, about } from "@/config"
 */

export { site, navLinks, socialLinks, themeConfig } from "./site";
export { projects } from "./projects";
export type { Project } from "./projects";
export { about } from "./about";
export { testimonials } from "./testimonials";
export type { Testimonial } from "./testimonials";
export { experiments } from "./experiments";
export type { Experiment } from "./experiments";
export { hero } from "./hero";
export {
    fonts,
    colors,
    themes,
    spacing,
    typography,
    radius,
    shadows,
    transitions,
    getCSSVariables,
} from "./design-tokens";
