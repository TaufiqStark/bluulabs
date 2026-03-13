import { site, socialLinks } from "@/config";

export default function Footer() {
    return (
        <footer id="contact" data-theme="dark" className="relative overflow-hidden">
            {/* Divider */}
            <div className="section-divider" />

            {/* Contact CTA */}
            <div style={{ padding: "var(--space-24) var(--space-6)" }}>
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between" style={{ gap: "var(--space-10)" }}>
                        {/* Left — CTA text */}
                        <div>
                            <p
                                className="text-[var(--color-text-muted)] uppercase"
                                style={{ fontSize: "var(--text-xs)", letterSpacing: "0.15em", marginBottom: "var(--space-6)" }}
                            >
                                Let&apos;s work together
                            </p>
                            <h2
                                className="font-medium text-[var(--color-text-primary)]"
                                style={{ fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
                            >
                                Have a project
                            </h2>
                            <h2
                                className="font-medium text-[var(--color-text-primary)]"
                                style={{ fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
                            >
                                in mind?{" "}
                                <em className="font-[var(--font-instrument)] font-normal italic text-[var(--color-text-secondary)]">
                                    Let&apos;s talk.
                                </em>
                            </h2>
                        </div>

                        {/* Right — email + availability */}
                        <div className="flex flex-col items-start lg:items-end" style={{ gap: "var(--space-4)" }}>
                            <a
                                href={`mailto:${site.email}`}
                                className="group flex items-center bg-white text-[var(--color-bg-dark)] font-medium transition-all duration-300 hover:scale-105"
                                style={{ fontSize: "var(--text-base)", borderRadius: "var(--radius-full)", padding: "var(--space-4) var(--space-8)", gap: "var(--space-3)", boxShadow: "var(--shadow-md)" }}
                            >
                                {site.email}
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </a>
                            <p className="text-[var(--color-text-muted)] flex items-center" style={{ fontSize: "var(--text-xs)", gap: "var(--space-2)" }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-teal)]" />
                                {site.availability}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[var(--color-border-dyn)]" style={{ padding: "var(--space-8) var(--space-6)" }}>
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between" style={{ gap: "var(--space-6)" }}>
                    {/* Social links */}
                    <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                                aria-label={social.name}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d={social.icon} />
                                </svg>
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-[var(--color-text-muted)]" style={{ fontSize: "var(--text-xs)" }}>
                        © {new Date().getFullYear()} {site.fullName}. Crafted with care.
                    </p>
                </div>
            </div>

            {/* Watermark */}
            <div className="relative overflow-hidden">
                <h2
                    className="font-bold text-white/[0.02] leading-none text-center select-none whitespace-nowrap"
                    style={{ fontSize: "clamp(80px, 18vw, 240px)", letterSpacing: "-0.05em", paddingBottom: "var(--space-4)" }}
                >
                    {site.name}
                </h2>
            </div>
        </footer>
    );
}
