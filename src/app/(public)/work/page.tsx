import { db } from "@/db";
import { works } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Works | taufiq.",
  description: "A showcase of selected works and projects.",
};

export default async function WorksIndexPage() {
  const allWorks = await db.query.works.findMany({
    where: eq(works.isPublished, true),
    orderBy: [desc(works.createdAt)],
  });

  return (
    <div className="min-h-screen bg-white">
      <header className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">
            Selected Works
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto text-center">
            A collection of projects and case studies I have been working on.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {allWorks.length === 0 ? (
          <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-lg">
            No works published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allWorks.map((work) => (
              <Link 
                key={work.id} 
                href={`/work/${work.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {work.coverImage ? (
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={work.coverImage} 
                      alt={work.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No cover image</span>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4 flex-1">
                    {work.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                    <span className="line-clamp-1">{work.role || "Project"}</span>
                    <span>{work.year || ""}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
