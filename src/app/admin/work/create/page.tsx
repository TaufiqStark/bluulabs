"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";

// Dynamically import editor with no SSR
const Editor = dynamic(() => import("@/components/admin/Editor"), { ssr: false });

export default function CreateWorkPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    role: "",
    year: "",
    link: "",
    accentColor: "#3b82f6",
    glowColor: "#60a5fa",
    isPublished: false,
  });
  
  const [editorData, setEditorData] = useState<OutputData>({ blocks: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSlugAutofill = () => {
    if (!formData.slug && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/works", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          content: editorData,
        }),
      });

      if (res.ok) {
        router.push("/admin/work");
        router.refresh();
      } else {
        const err = await res.json();
        alert(`Failed to save: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight admin-text">Add new work</h1>
          <p className="mt-1 text-sm admin-muted">Create a new project portfolio entry.</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium admin-soft hover:text-[var(--admin-fg)]"
        >
          &larr; Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                onBlur={handleSlugAutofill}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="e.g. Taruna Eduka"
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
                placeholder="taruna-eduka"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
            <div className="mt-1">
              <textarea
                name="description"
                id="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="A brief overview of the project..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <div className="mt-1">
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="e.g. Lead Developer"
              />
            </div>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
            <div className="mt-1">
              <input
                type="text"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="e.g. 2024"
              />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">External/Live Link</label>
            <div className="mt-1">
              <input
                type="url"
                name="link"
                id="link"
                value={formData.link}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="https://"
              />
            </div>
          </div>

          <div>
            <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700">Accent Color</label>
            <div className="mt-1 flex items-center space-x-3">
              <input
                type="color"
                name="accentColor"
                id="accentColor"
                value={formData.accentColor}
                onChange={handleChange}
                className="h-8 w-8 rounded overflow-hidden cursor-pointer"
              />
              <span className="text-sm text-gray-500">{formData.accentColor}</span>
            </div>
          </div>

          <div>
            <label htmlFor="glowColor" className="block text-sm font-medium text-gray-700">Glow Color</label>
            <div className="mt-1 flex items-center space-x-3">
              <input
                type="color"
                name="glowColor"
                id="glowColor"
                value={formData.glowColor}
                onChange={handleChange}
                className="h-8 w-8 rounded overflow-hidden cursor-pointer"
              />
               <span className="text-sm text-gray-500">{formData.glowColor}</span>
            </div>
          </div>

          <div className="sm:col-span-2 mt-4 pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-900 mb-2">Rich Content (Editor.js)</label>
            <Editor data={editorData} onChange={setEditorData} holder="work-editor" />
          </div>

          <div className="sm:col-span-2 flex items-center">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
              Publish this project immediately
            </label>
          </div>
        </div>

        <div className="pt-5 border-t border-gray-200">
          <div className="flex justify-end">
             <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Work"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
