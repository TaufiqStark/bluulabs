import { db } from "@/db";
import { tags } from "@/db/schema";
import Link from "next/link";

export const metadata = {
  title: "Tags | Admin - taufiq.",
};

export default async function TagsAdminPage() {
  const data = await db.select().from(tags);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight admin-text">Tags</h1>
          <p className="mt-1 text-sm admin-muted">Manage tags to associate with your content.</p>
        </div>
        <Link
          href="/admin/tags/create"
          className="inline-flex justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-glass-bg)] py-2 px-4 text-sm font-medium admin-text hover:bg-[var(--admin-glass-bg-2)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-focus)]"
        >
          Add New
        </Link>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Slug</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.slug}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                    <Link href={`/admin/tags/${item.id}/edit`} className="text-blue-600 hover:text-blue-900">
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              
              {data.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-sm text-gray-500">
                    No tags found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
