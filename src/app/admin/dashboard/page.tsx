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
          <h1 className="text-2xl font-semibold tracking-tight text-white">Overview</h1>
          <p className="mt-1 text-sm text-white/60">A quick pulse check on your portfolio CMS.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <GlassCard key={stat.name} className="p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50">{stat.name}</div>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div className="text-3xl font-semibold tracking-tight text-white">{stat.value}</div>
                <Link
                  href={stat.href}
                  className="text-xs text-white/70 hover:text-white underline underline-offset-4 decoration-white/25 hover:decoration-white/50"
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
                <h2 className="text-sm font-semibold text-white">Quick actions</h2>
                <p className="mt-1 text-sm text-white/60">Create something new without hunting menus.</p>
              </div>
              <Link
                href="/admin/analytics"
                className="text-xs text-white/70 hover:text-white underline underline-offset-4 decoration-white/25 hover:decoration-white/50"
              >
                Analytics
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Link
                href="/admin/work/create"
                className={[
                  "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white",
                  "hover:bg-white/10",
                ].join(" ")}
              >
                Add new work
              </Link>
              <Link
                href="/admin/experiments/create"
                className={[
                  "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white",
                  "hover:bg-white/10",
                ].join(" ")}
              >
                Add experiment
              </Link>
              <Link
                href="/admin/writing/create"
                className={[
                  "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white",
                  "hover:bg-white/10",
                ].join(" ")}
              >
                Write post
              </Link>
            </div>
          </GlassCard>
          
          {/* Recent Activity (Placeholder) */}
          <GlassCard className="p-6">
            <h2 className="text-sm font-semibold text-white">Recent activity</h2>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-white/60">
              Activity integration coming soon.
            </div>
            <div className="mt-3 text-xs text-white/50">
              Tip: track edits + publishes to build a real activity feed.
            </div>
          </GlassCard>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <GlassCard className="p-6 border-red-500/30 bg-red-500/10">
        <h2 className="text-lg font-semibold text-white">Database Connection Error</h2>
        <p className="mt-2 text-sm text-white/70">
          Could not connect to the database to fetch stats. Please ensure your `DATABASE_URL` is correct and the database
          is accessible.
        </p>
        <div className="mt-4 text-xs text-white/50">{String(error)}</div>
      </GlassCard>
    );
  }
}
