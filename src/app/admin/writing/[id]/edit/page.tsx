"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";

const Editor = dynamic(() => import("@/components/admin/Editor"), { ssr: false });

export default function EditWritingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    isPublished: false,
  });
  
  const [editorData, setEditorData] = useState<OutputData>({ blocks: [] });

  useEffect(() => {
    fetch(`/api/admin/writings/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert("Article not found");
          router.push("/admin/writing");
          return;
        }
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          isPublished: !!data.isPublished,
        });
        if (data.content) {
          setEditorData(data.content);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [resolvedParams.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: any = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        isPublished: formData.isPublished,
        content: editorData,
      };

      // if (formData.isPublished) {
      //    payload.publishedAt = new Date().toISOString();
      // }

      const res = await fetch(`/api/admin/writings/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/writing");
        router.refresh();
      } else {
        const err = await res.json();
        alert(`Failed to update: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading article data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
        </div>
        <button onClick={() => router.back()} className="text-sm font-medium text-gray-600 hover:text-gray-900">
          &larr; Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">URL Slug</label>
            <div className="mt-1">
              <input
                type="text"
                name="slug"
                id="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt / Intro</label>
            <div className="mt-1">
              <textarea
                name="excerpt"
                id="excerpt"
                rows={3}
                required
                value={formData.excerpt}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>

          <div className="sm:col-span-2 mt-4 pt-4 border-t border-gray-200">
             <label className="block text-sm font-medium text-gray-900 mb-2">Content Body (Editor.js)</label>
             <Editor data={editorData} onChange={setEditorData} holder="writing-editor-edit" />
          </div>

          <div className="sm:col-span-2 flex items-center mt-2">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
              Publish this article
            </label>
          </div>
        </div>

        <div className="pt-5 border-t border-gray-200">
          <div className="flex justify-end">
             <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
