import { db } from "@/db";
import { works } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditorRenderer from "@/components/common/EditorRenderer";
import Link from "next/link";
import { use } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await db.query.works.findFirst({
    where: eq(works.slug, resolvedParams.slug)
  });
  
  if (!data) return { title: "Not Found" };
  
  return {
    title: `${data.title} | taufiq.`,
    description: data.description,
  };
}

export default function WorkSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  // Use React `use` hook to unwrap the Promise in Next.js 15+ App Router
  const resolvedParams = use(params);
  
  return <WorkSinglePageContent slug={resolvedParams.slug} />;
}

async function WorkSinglePageContent({ slug }: { slug: string }) {
  const work = await db.query.works.findFirst({
    where: eq(works.slug, slug),
  });

  if (!work) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Basic header layout */}
      <header className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/work" className="text-sm font-medium text-gray-500 hover:text-gray-900 inline-flex items-center mb-8">
            &larr; Back to all works
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {work.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto mb-8">
            {work.description}
          </p>
          
          <div className="flex items-center justify-center gap-x-6 text-sm text-gray-600">
             {work.role && <div><span className="font-semibold text-gray-900 line-clamp-1">Role:</span> {work.role}</div>}
             {work.year && <div><span className="font-semibold text-gray-900">Year:</span> {work.year}</div>}
          </div>
          
          {work.link && (
            <div className="mt-8">
              <a 
                href={work.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                Visit Live Project
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Editor.js Content rendering area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
         {/* @ts-ignore - Temporary bypass to suppress JSON DB type conflicts with Editor.js object */}
        <EditorRenderer data={work.content as any} />
      </div>
    </article>
  );
}
