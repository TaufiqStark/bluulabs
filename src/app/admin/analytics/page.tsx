import GlassCard from "@/components/admin/GlassCard";
import { db } from "@/db";
import { categories, experiments, media, works, worksToCategories, writings } from "@/db/schema";
import dayjs from "dayjs";
import { count, desc, eq, gte } from "drizzle-orm";
import Link from "next/link";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function MiniBars({ values }: { values: number[] }) {
  const w = 220;
  const h = 44;
  const gap = 6;
  const barW = Math.floor((w - gap * (values.length - 1)) / values.length);
  const max = Math.max(1, ...values);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Content velocity">
      {values.map((v, idx) => {
        const x = idx * (barW + gap);
        const barH = Math.max(2, Math.round((v / max) * (h - 6)));
        const y = h - barH;
        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={6}
            fill="rgba(45, 212, 191, 0.65)"
          />
        );
      })}
    </svg>
  );
}

export const metadata = {
  title: "Analytics | Admin - taufiq.",
};

export default async function AdminAnalyticsPage() {
  try {
    const categoryCount = count(worksToCategories.workId);
    const [
      worksTotal,
      worksPublished,
      experimentsTotal,
      experimentsPublished,
      writingsTotal,
      writingsPublished,
      mediaTotal,
    ] = await Promise.all([
      db.select({ value: count() }).from(works),
      db.select({ value: count() }).from(works).where(eq(works.isPublished, true)),
      db.select({ value: count() }).from(experiments),
      db.select({ value: count() }).from(experiments).where(eq(experiments.isPublished, true)),
      db.select({ value: count() }).from(writings),
      db.select({ value: count() }).from(writings).where(eq(writings.isPublished, true)),
      db.select({ value: count() }).from(media),
    ]);

    const totals = {
      works: worksTotal[0]?.value ?? 0,
      worksPublished: worksPublished[0]?.value ?? 0,
      experiments: experimentsTotal[0]?.value ?? 0,
      experimentsPublished: experimentsPublished[0]?.value ?? 0,
      writings: writingsTotal[0]?.value ?? 0,
      writingsPublished: writingsPublished[0]?.value ?? 0,
      media: mediaTotal[0]?.value ?? 0,
    };

    const start = dayjs().subtract(6, "day").startOf("day").toDate();
    const [recentWorks, recentExperiments, recentWritings, topCategories] = await Promise.all([
      db
        .select({ createdAt: works.createdAt })
        .from(works)
        .where(gte(works.createdAt, start)),
      db
        .select({ createdAt: experiments.createdAt })
        .from(experiments)
        .where(gte(experiments.createdAt, start)),
      db
        .select({ createdAt: writings.createdAt })
        .from(writings)
        .where(gte(writings.createdAt, start)),
      db
        .select({
          name: categories.name,
          slug: categories.slug,
          value: categoryCount,
        })
        .from(worksToCategories)
        .innerJoin(categories, eq(worksToCategories.categoryId, categories.id))
        .groupBy(categories.id)
        .orderBy(desc(categoryCount))
        .limit(6),
    ]);

    const velocityMap = new Map<string, number>();
    const bump = (dt: Date) => {
      const key = dayjs(dt).format("YYYY-MM-DD");
      velocityMap.set(key, (velocityMap.get(key) ?? 0) + 1);
    };
    recentWorks.forEach((r) => bump(r.createdAt));
    recentExperiments.forEach((r) => bump(r.createdAt));
    recentWritings.forEach((r) => bump(r.createdAt));

    const velocityDays = Array.from({ length: 7 }).map((_, i) => dayjs().subtract(6 - i, "day"));
    const velocityValues = velocityDays.map((d) => velocityMap.get(d.format("YYYY-MM-DD")) ?? 0);

    const [latestWorks, latestExperiments, latestWritings] = await Promise.all([
      db
        .select({ id: works.id, title: works.title, updatedAt: works.updatedAt })
        .from(works)
        .orderBy(desc(works.updatedAt))
        .limit(5),
      db
        .select({ id: experiments.id, title: experiments.title, updatedAt: experiments.updatedAt })
        .from(experiments)
        .orderBy(desc(experiments.updatedAt))
        .limit(5),
      db
        .select({ id: writings.id, title: writings.title, updatedAt: writings.updatedAt })
        .from(writings)
        .orderBy(desc(writings.updatedAt))
        .limit(5),
    ]);

    const latest = [
      ...latestWorks.map((x) => ({ type: "Work", title: x.title, updatedAt: x.updatedAt, href: `/admin/work/${x.id}/edit` })),
      ...latestExperiments.map((x) => ({
        type: "Experiment",
        title: x.title,
        updatedAt: x.updatedAt,
        href: `/admin/experiments/${x.id}/edit`,
      })),
      ...latestWritings.map((x) => ({
        type: "Writing",
        title: x.title,
        updatedAt: x.updatedAt,
        href: `/admin/writing/${x.id}/edit`,
      })),
    ]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 8);

    const publishRate =
      totals.works + totals.experiments + totals.writings === 0
        ? 0
        : Math.round(
            ((totals.worksPublished + totals.experimentsPublished + totals.writingsPublished) /
              (totals.works + totals.experiments + totals.writings)) *
              100
          );

    return (
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight admin-text">Analytics</h1>
            <p className="mt-1 text-sm admin-muted">
              Content health, publishing velocity, and what deserves attention next.
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-sm admin-soft hover:text-[var(--admin-fg)] underline underline-offset-4 decoration-current/30 hover:decoration-current/60"
          >
            Back to overview
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <GlassCard className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Publish rate</div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div className="text-3xl font-semibold tracking-tight admin-text">{publishRate}%</div>
              <div className="text-xs admin-muted">
                {formatNumber(totals.worksPublished + totals.experimentsPublished + totals.writingsPublished)} published
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Works</div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div className="text-3xl font-semibold tracking-tight admin-text">{formatNumber(totals.works)}</div>
              <div className="text-xs admin-muted">{formatNumber(totals.worksPublished)} published</div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Experiments</div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div className="text-3xl font-semibold tracking-tight admin-text">{formatNumber(totals.experiments)}</div>
              <div className="text-xs admin-muted">{formatNumber(totals.experimentsPublished)} published</div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Writings</div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div className="text-3xl font-semibold tracking-tight admin-text">{formatNumber(totals.writings)}</div>
              <div className="text-xs admin-muted">{formatNumber(totals.writingsPublished)} published</div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <GlassCard className="p-5 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Velocity</div>
                <div className="mt-1 text-sm admin-soft">New items created (last 7 days)</div>
              </div>
              <MiniBars values={velocityValues} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {velocityDays.map((d, idx) => (
                <div
                  key={d.format("YYYY-MM-DD")}
                  className="rounded-full border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-3 py-1 text-xs admin-soft"
                  title={d.format("YYYY-MM-DD")}
                >
                  {d.format("ddd")} <span className="admin-text">{velocityValues[idx]}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Media library</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight admin-text">{formatNumber(totals.media)}</div>
            <div className="mt-1 text-sm admin-muted">Files in storage</div>
            <div className="mt-4 text-xs admin-muted">
              Tip: add image compression + hash dedupe to keep it lean.
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Top categories</div>
                <div className="mt-1 text-sm admin-soft">Works distribution</div>
              </div>
              <Link
                href="/admin/categories"
                className="text-xs admin-soft hover:text-[var(--admin-fg)] underline underline-offset-4 decoration-current/30 hover:decoration-current/60"
              >
                Manage
              </Link>
            </div>

            <div className="mt-4 space-y-2">
              {topCategories.length === 0 ? (
                <div className="text-sm admin-muted">No categories yet.</div>
              ) : (
                topCategories.map((c) => (
                  <div key={c.slug} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium admin-text">{c.name}</div>
                      <div className="text-xs admin-muted">{c.slug}</div>
                    </div>
                    <div className="shrink-0 rounded-full border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-3 py-1 text-xs admin-soft">
                      {formatNumber(Number(c.value))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest admin-muted">Recently updated</div>
                <div className="mt-1 text-sm admin-soft">Last 8 edits</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {latest.length === 0 ? (
                <div className="text-sm admin-muted">No content yet.</div>
              ) : (
                latest.map((item) => (
                  <Link
                    key={`${item.type}-${item.href}`}
                    href={item.href}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-3 py-2 hover:bg-[var(--admin-glass-bg-2)]"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium admin-text">{item.title}</div>
                      <div className="text-xs admin-muted">
                        {item.type} · {dayjs(item.updatedAt).format("D MMM YYYY")}
                      </div>
                    </div>
                    <div className="shrink-0 text-xs admin-muted group-hover:text-[var(--admin-fg)]">Open</div>
                  </Link>
                ))
              )}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold admin-text">Upgrade to real traffic analytics</div>
              <div className="text-sm admin-muted">
                This page currently analyzes content in your database. If you want visitor analytics, plug in Plausible, GA,
                or your own event pipeline.
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/settings"
                className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-3 py-2 text-xs font-medium admin-soft hover:bg-[var(--admin-glass-bg-2)] hover:text-[var(--admin-fg)]"
              >
                Settings
              </Link>
              <Link
                href="/admin/media"
                className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] px-3 py-2 text-xs font-medium admin-soft hover:bg-[var(--admin-glass-bg-2)] hover:text-[var(--admin-fg)]"
              >
                Media library
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  } catch (error) {
    return (
      <GlassCard className="p-6">
        <div className="text-lg font-semibold admin-text">Database Connection Error</div>
        <p className="mt-2 text-sm admin-soft">
          Could not connect to the database to fetch analytics. Please ensure your `DATABASE_URL` is correct and the
          database is accessible.
        </p>
        <div className="mt-4 text-xs admin-muted">{String(error)}</div>
      </GlassCard>
    );
  }
}
