import { db } from "@/db";
import { writings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditorRenderer from "@/components/common/EditorRenderer";
import Link from "next/link";
import dayjs from "dayjs";
import { use } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await db.query.writings.findFirst({
    where: eq(writings.slug, resolvedParams.slug)
  });
  
  if (!data) return { title: "Not Found" };
  
  return {
    title: `${data.title} | taufiq.`,
    description: data.excerpt || `${data.title} article`,
  };
}

export default function WritingSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return <WritingSinglePageContent slug={resolvedParams.slug} />;
}

async function WritingSinglePageContent({ slug }: { slug: string }) {
  const writing = await db.query.writings.findFirst({
    where: eq(writings.slug, slug),
  });

  if (!writing) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      <header className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/writing" className="text-sm font-medium text-gray-500 hover:text-gray-900 inline-flex items-center mb-8">
            &larr; Back to writings
          </Link>
          
          <div className="text-sm text-gray-500 mb-4">
            {dayjs(writing.createdAt).format('MMMM D, YYYY')}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {writing.title}
          </h1>
          
          {writing.excerpt && (
            <p className="text-xl text-gray-500 leading-relaxed">
              {writing.excerpt}
            </p>
          )}
        </div>
      </header>

      {writing.coverImage && (
         <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={writing.coverImage} alt={writing.title} className="w-full rounded-2xl shadow-sm border border-gray-100 object-cover aspect-[21/9]" />
         </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <EditorRenderer data={writing.content as any} />
      </div>
    </article>
  );
}
