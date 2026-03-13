import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard - taufiq.",
  description: "Portfolio CMS Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin/dashboard" className="text-xl font-bold tracking-tight">
            Admin Panel
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/admin/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Dashboard
              </Link>
            </li>
            
            <li className="pt-4 pb-2">
              <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</span>
            </li>
            <li>
              <Link href="/admin/work" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Works
              </Link>
            </li>
            <li>
              <Link href="/admin/experiments" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Experiments
              </Link>
            </li>
            <li>
              <Link href="/admin/writing" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Writings
              </Link>
            </li>
            
            <li className="pt-4 pb-2">
              <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">System</span>
            </li>
            <li>
              <Link href="/admin/categories" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/tags" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Tags
              </Link>
            </li>
            <li>
              <Link href="/admin/media" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Media Library
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100">
            &larr; Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header visible only on small screens */}
        <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
          <Link href="/admin/dashboard" className="text-xl font-bold">Admin Panel</Link>
          <button className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-md">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
