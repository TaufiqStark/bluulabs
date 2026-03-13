import { db } from "@/db";
import { works, experiments, writings } from "@/db/schema";
import { count } from "drizzle-orm";
import Link from "next/link";

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
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your portfolio content.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-100">
              <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              <div className="mt-4">
                <Link href={stat.href} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/work/create" className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Add New Work
              </Link>
              <Link href="/admin/experiments/create" className="block w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Add New Experiment
              </Link>
              <Link href="/admin/writing/create" className="block w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Write a Post
              </Link>
            </div>
          </div>
          
          {/* Recent Activity (Placeholder) */}
          <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
            <div className="text-sm text-gray-500 italic py-4 text-center">
              Activity integration coming soon.
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-lg">
        <h2 className="text-lg font-semibold">Database Connection Error</h2>
        <p className="mt-2 text-sm">Could not connect to the database to fetch stats. Please ensure your DATABASE_URL is correct and the database is accessible.</p>
      </div>
    );
  }
}
