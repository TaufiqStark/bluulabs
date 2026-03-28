"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  FiBarChart2,
  FiBookOpen,
  FiFolder,
  FiGrid,
  FiImage,
  FiSettings,
  FiTag,
  FiBox,
  FiLayers,
  FiMenu,
  FiX,
  FiArrowLeft,
  FiChevronLeft,
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useAdminTheme } from "./AdminThemeProvider";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  isDark,
  collapsed,
}: NavItem & { isActive: boolean; isDark: boolean; collapsed: boolean }) {
  return (
    <Link
      href={href}
      className={[
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
        "border border-transparent",
        collapsed ? "justify-center" : "",
        isActive
          ? isDark
            ? "bg-white/10 border-white/10 text-white"
            : "bg-black/5 border-black/10 text-black/90"
          : isDark
            ? "text-white/75 hover:bg-white/5 hover:text-white"
            : "text-black/70 hover:bg-black/5 hover:text-black",
      ].join(" ")}
    >
      <Icon
        className={[
          "h-4 w-4",
          isActive ? (isDark ? "text-white" : "text-black/80") : isDark ? "text-white/60 group-hover:text-white" : "text-black/45 group-hover:text-black/80",
        ].join(" ")}
      />
      <span className={collapsed ? "sr-only" : "truncate"}>{label}</span>
    </Link>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useAdminTheme();
  const isDark = theme === "dark";

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin-sidebar-collapsed");
      if (stored === "1") setCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("admin-sidebar-collapsed", collapsed ? "1" : "0");
    } catch {
      // ignore
    }
  }, [collapsed]);

  const navGroups = useMemo<NavGroup[]>(
    () => [
      {
        label: "Insights",
        items: [
          { href: "/admin/dashboard", label: "Overview", icon: FiGrid },
          { href: "/admin/analytics", label: "Analytics", icon: FiBarChart2 },
        ],
      },
      {
        label: "Content",
        items: [
          { href: "/admin/work", label: "Works", icon: FiBox },
          { href: "/admin/experiments", label: "Experiments", icon: FiLayers },
          { href: "/admin/writing", label: "Writings", icon: FiBookOpen },
        ],
      },
      {
        label: "Library",
        items: [{ href: "/admin/media", label: "Media", icon: FiImage }],
      },
      {
        label: "Taxonomy",
        items: [
          { href: "/admin/categories", label: "Categories", icon: FiFolder },
          { href: "/admin/tags", label: "Tags", icon: FiTag },
        ],
      },
      {
        label: "System",
        items: [{ href: "/admin/settings", label: "Settings", icon: FiSettings }],
      },
    ],
    []
  );

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span
            className={[
              "inline-flex h-8 w-8 items-center justify-center rounded-xl border",
              isDark ? "bg-white/10 border-white/10" : "bg-black/5 border-black/10",
            ].join(" ")}
          >
            <FiGrid className={["h-4 w-4", isDark ? "text-white" : "text-black/80"].join(" ")} />
          </span>
          {!collapsed && (
            <div className="leading-tight">
              <div className={["text-sm font-semibold tracking-tight", isDark ? "text-white" : "text-black/90"].join(" ")}>
                Admin
              </div>
              <div className={["text-[11px]", isDark ? "text-white/60" : "text-black/55"].join(" ")}>Bluulabs CMS</div>
            </div>
          )}
        </Link>
      </div>

      <div className="px-4 pb-3">
        <div className={["h-px", isDark ? "bg-white/10" : "bg-black/10"].join(" ")} />
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div
                className={[
                  "px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest",
                  isDark ? "text-white/45" : "text-black/45",
                ].join(" ")}
              >
                {group.label}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href))}
                  isDark={isDark}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 pb-4">
        <Link
          href="/"
          className={[
            "flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
            isDark
              ? "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              : "border border-black/10 bg-white/60 text-black/75 hover:bg-white hover:text-black",
            "backdrop-blur-xl",
          ].join(" ")}
        >
          <FiArrowLeft className={["h-4 w-4", isDark ? "text-white" : "text-black/70"].join(" ")} />
          Back to site
        </Link>
      </div>
    </div>
  );

  return (
    <div className={["min-h-screen", isDark ? "bg-[#050505] text-white" : "bg-[#f8fafc] text-zinc-950"].join(" ")}>
      {/* Ambient background layers */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className={[
            "absolute inset-0",
            isDark
              ? "bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.14),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(244,114,182,0.12),transparent_45%)]"
              : "bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(96,165,250,0.18),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(244,114,182,0.14),transparent_45%)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-0 [background-size:22px_22px]",
            isDark
              ? "opacity-[0.18] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]"
              : "opacity-[0.22] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-0 bg-gradient-to-b from-transparent via-transparent",
            isDark ? "to-black/40" : "to-white/60",
          ].join(" ")}
        />
      </div>

      <a
        href="#admin-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white/10 focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex">
          {/* Desktop sidebar */}
          <aside className={["hidden lg:block shrink-0", collapsed ? "w-[92px]" : "w-[280px]"].join(" ")}>
            <div className="sticky top-0 h-screen p-4">
              <div
                className={[
                  "h-full rounded-3xl border backdrop-blur-2xl",
                  isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white/60",
                  isDark
                    ? "shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_40px_120px_rgba(0,0,0,0.5)]"
                    : "shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_40px_120px_rgba(0,0,0,0.12)]",
                ].join(" ")}
              >
                {sidebar}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1">
            <header
              className={[
                "sticky top-0 z-20 border-b backdrop-blur-xl",
                isDark ? "border-white/10 bg-black/30" : "border-black/10 bg-white/70",
              ].join(" ")}
            >
              <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileOpen(true)}
                      className={[
                        "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border",
                        isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/60 hover:bg-white",
                      ].join(" ")}
                      aria-label="Open menu"
                    >
                      <FiMenu className={["h-5 w-5", isDark ? "text-white" : "text-black/80"].join(" ")} />
                    </button>

                    <div className="hidden sm:block">
                      <div className={["text-sm font-semibold tracking-tight", isDark ? "text-white" : "text-black/90"].join(" ")}>
                        {pathname === "/admin/dashboard"
                          ? "Overview"
                          : pathname.startsWith("/admin/analytics")
                            ? "Analytics"
                            : "Admin"}
                      </div>
                      <div className={["text-[11px]", isDark ? "text-white/60" : "text-black/55"].join(" ")}>
                        Shipping content, calmly.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCollapsed((v) => !v)}
                      className={[
                        "hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-xl border",
                        isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/60 hover:bg-white",
                      ].join(" ")}
                      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                      <FiChevronLeft
                        className={[
                          "h-5 w-5 transition-transform duration-300",
                          collapsed ? "rotate-180" : "rotate-0",
                          isDark ? "text-white" : "text-black/80",
                        ].join(" ")}
                      />
                    </button>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>

            <main id="admin-content" className="relative">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className={["absolute inset-0", isDark ? "bg-black/60" : "bg-black/30"].join(" ")}
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[320px] max-w-[90vw] p-4">
            <div
              className={[
                "h-full rounded-3xl border backdrop-blur-2xl",
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white/70",
                isDark
                  ? "shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_40px_120px_rgba(0,0,0,0.55)]"
                  : "shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_40px_120px_rgba(0,0,0,0.14)]",
              ].join(" ")}
            >
              <div className="flex h-14 items-center justify-between px-4">
                <div className={["text-sm font-semibold tracking-tight", isDark ? "text-white" : "text-black/90"].join(" ")}>
                  Menu
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl border",
                    isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/60 hover:bg-white",
                  ].join(" ")}
                  aria-label="Close menu"
                >
                  <FiX className={["h-5 w-5", isDark ? "text-white" : "text-black/80"].join(" ")} />
                </button>
              </div>
              <div className="px-4 pb-3">
                <div className={["h-px", isDark ? "bg-white/10" : "bg-black/10"].join(" ")} />
              </div>
              {sidebar}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
