import { db } from "@/db";
import { experiments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditorRenderer from "@/components/common/EditorRenderer";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { use } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await db.query.experiments.findFirst({
    where: eq(experiments.slug, resolvedParams.slug)
  });
  
  if (!data) return { title: "Not Found" };
  
  return {
    title: `${data.title} | taufiq.`,
    description: data.description,
  };
}

export default function ExperimentSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return <ExperimentSinglePageContent slug={resolvedParams.slug} />;
}

async function ExperimentSinglePageContent({ slug }: { slug: string }) {
  const experiment = await db.query.experiments.findFirst({
    where: eq(experiments.slug, slug),
  });

  if (!experiment) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      <header className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiments" className="text-sm font-medium text-gray-500 hover:text-gray-900 inline-flex items-center mb-8">
            &larr; Back to all experiments
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {experiment.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-500 max-w-3xl mb-8">
            {experiment.description}
          </p>
          
          {experiment.techStack && Array.isArray(experiment.techStack) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {(experiment.techStack as string[]).map((tech, i) => (
                <span key={i} className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-x-4">
             {experiment.liveUrl && (
               <a 
                 href={experiment.liveUrl} 
                 target="_blank" 
                 rel="noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
               >
                 <FaExternalLinkAlt /> Visit Live App
               </a>
             )}
             {experiment.githubUrl && (
               <a 
                 href={experiment.githubUrl} 
                 target="_blank" 
                 rel="noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
               >
                 <FaGithub className="text-lg" /> View Source
               </a>
             )}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <EditorRenderer data={experiment.content as any} />
      </div>
    </article>
  );
}
