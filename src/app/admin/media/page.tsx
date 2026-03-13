import { db } from "@/db";
import { media } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

export const metadata = {
  title: "Media Library | Admin - taufiq.",
};

export default async function MediaAdminPage() {
  const data = await db.select().from(media).orderBy(desc(media.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-gray-500 mt-1">Manage files and images uploaded to your portfolio.</p>
        </div>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 opacity-50 cursor-not-allowed"
          title="Upload via Editor.js for now"
        >
          Upload New
        </button>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No media files</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload images directly through the Editor.js content blocks when writing articles or projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {data.map((file) => (
              <div key={file.id} className="relative">
                <div className="group aspect-video block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 relative">
                  <Image
                    src={file.url}
                    alt={file.filename}
                    className="pointer-events-none object-cover group-hover:opacity-75"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {file.filename}</span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.filename}</p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">{(file.size || 0) / 1024} KB</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
