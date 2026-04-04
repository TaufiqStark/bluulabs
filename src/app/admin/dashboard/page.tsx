import { db } from "@/db";
import { works, experiments, writings } from "@/db/schema";
import { count } from "drizzle-orm";
import Link from "next/link";
import GlassCard from "@/components/admin/GlassCard";

export default async function AdminDashboardPage() {
  // Fetch high-level stats
  // Note: For a real app, you might want to handle errors if db connection fails
  try {
    const worksCount = await db.select({ value: count() }).from(works);
    const experimentsCount = await db.select({ value: count() }).from(experiments);
    const writingsCount = await db.select({ value: count() }).from(writings);

    const stats = [
      { name: "Total Works", value: worksCount[0]?.value || 0, href: "/admin/work" },
      { name: "Total Experiments", value: experimentsCount[0]?.value || 0, href: "/admin/experiments" },
      { name: "Total Writings", value: writingsCount[0]?.value || 0, href: "/admin/writing" },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight admin-text">Overview</h1>
          <p className="mt-1 text-sm admin-muted">A quick pulse check on your portfolio CMS.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <GlassCard key={stat.name} className="p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">{stat.name}</div>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div className="text-3xl font-semibold tracking-tight admin-text">{stat.value}</div>
                <Link
                  href={stat.href}
                  className="text-xs admin-soft hover:text-[var(--admin-fg)] underline underline-offset-4 decoration-current/30 hover:decoration-current/60"
                >
                  View all
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Quick Actions */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold admin-text">Quick actions</h2>
                <p className="mt-1 text-sm admin-muted">Create something new without hunting menus.</p>
              </div>
              <Link
                href="/admin/analytics"
                className="text-xs admin-soft hover:text-[var(--admin-fg)] underline underline-offset-4 decoration-current/30 hover:decoration-current/60"
              >
                Analytics
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Link
                href="/admin/work/create"
                className={[
                  "rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-4 py-3 text-sm font-medium admin-text",
                  "hover:bg-[var(--admin-glass-bg-2)]",
                ].join(" ")}
              >
                Add new work
              </Link>
              <Link
                href="/admin/experiments/create"
                className={[
                  "rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-4 py-3 text-sm font-medium admin-text",
                  "hover:bg-[var(--admin-glass-bg-2)]",
                ].join(" ")}
              >
                Add experiment
              </Link>
              <Link
                href="/admin/writing/create"
                className={[
                  "rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-4 py-3 text-sm font-medium admin-text",
                  "hover:bg-[var(--admin-glass-bg-2)]",
                ].join(" ")}
              >
                Write post
              </Link>
            </div>
          </GlassCard>
          
          {/* Recent Activity (Placeholder) */}
          <GlassCard className="p-6">
            <h2 className="text-sm font-semibold admin-text">Recent activity</h2>
            <div className="mt-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-4 py-6 text-center text-sm admin-muted">
              Activity integration coming soon.
            </div>
            <div className="mt-3 text-xs admin-muted">
              Tip: track edits + publishes to build a real activity feed.
            </div>
          </GlassCard>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <GlassCard className="p-6 border-red-500/30 bg-red-500/10">
        <h2 className="text-lg font-semibold admin-text">Database Connection Error</h2>
        <p className="mt-2 text-sm admin-soft">
          Could not connect to the database to fetch stats. Please ensure your `DATABASE_URL` is correct and the database
          is accessible.
        </p>
        <div className="mt-4 text-xs admin-muted">{String(error)}</div>
      </GlassCard>
    );
  }
}
