import { db } from "@/db";
import { experiments } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export const metadata = {
  title: "Experiments | taufiq.",
  description: "Mini-projects, open-source work, and tech experiments.",
};

export default async function ExperimentsIndexPage() {
  const allExperiments = await db.query.experiments.findMany({
    where: eq(experiments.isPublished, true),
    orderBy: [desc(experiments.createdAt)],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">
            Experiments
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto text-center">
            Mini-projects, open-source work, and tech experiments.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {allExperiments.length === 0 ? (
          <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 bg-white rounded-lg">
            No experiments published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allExperiments.map((exp) => (
              <div 
                key={exp.id} 
                className="flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {exp.coverImage && (
                  <Link href={`/experiments/${exp.slug}`} className="block aspect-video w-full overflow-hidden bg-gray-100">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={exp.coverImage} 
                      alt={exp.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/experiments/${exp.slug}`}>
                     <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                       {exp.title}
                     </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {exp.description}
                  </p>
                  
                  {exp.techStack && Array.isArray(exp.techStack) && (
                     <div className="flex flex-wrap gap-2 mb-6">
                        {(exp.techStack as string[]).slice(0, 3).map((tech, i) => (
                           <span key={i} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {tech}
                           </span>
                        ))}
                        {(exp.techStack as string[]).length > 3 && (
                           <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                              +{(exp.techStack as string[]).length - 3}
                           </span>
                        )}
                     </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                     <div className="flex gap-4">
                        {exp.githubUrl && (
                          <a href={exp.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-900">
                             <FaGithub className="w-4 h-4" /> Code
                          </a>
                        )}
                        {exp.liveUrl && (
                          <a href={exp.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-900">
                             <FaExternalLinkAlt className="w-3.5 h-3.5" /> Live
                          </a>
                        )}
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
