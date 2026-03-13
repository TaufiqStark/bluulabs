import { db } from "@/db";
import { writings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import dayjs from "dayjs";

export const metadata = {
  title: "Writings | taufiq.",
  description: "Thoughts, tutorials, and essays on software engineering.",
};

export default async function WritingsIndexPage() {
  const allWritings = await db.query.writings.findMany({
    where: eq(writings.isPublished, true),
    orderBy: [desc(writings.createdAt)],
  });

  return (
    <div className="min-h-screen bg-white">
      <header className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">
            Writings
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto text-center">
            Thoughts, tutorials, and essays on software engineering and web development.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {allWritings.length === 0 ? (
          <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-lg">
            No writings published yet.
          </div>
        ) : (
          <div className="space-y-12">
            {allWritings.map((post) => (
              <article key={post.id} className="group relative flex flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs mb-3">
                  <time dateTime={post.createdAt.toISOString()} className="text-gray-500">
                    {dayjs(post.createdAt).format('MMMM D, YYYY')}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-2xl font-semibold leading-6 text-gray-900 group-hover:text-blue-600 transition-colors">
                    <Link href={`/writing/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.excerpt || 'Read more...'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
