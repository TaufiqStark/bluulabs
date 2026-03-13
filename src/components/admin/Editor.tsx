"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface EditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
  holder?: string;
}

const EditorComponent: React.FC<EditorProps> = ({ data, onChange, holder = "editorjs-container" }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Use a ref for onChange so the callback doesn't go stale
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if editor is already initialized to prevent strict-mode double instances
    if (editorRef.current) return;

    const initializeEditor = async () => {
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Embed = (await import("@editorjs/embed")).default;
      const ImageTool = (await import("@editorjs/image")).default;

      if (!editorRef.current) {
        editorRef.current = new EditorJS({
          holder: holder,
          data: data || { blocks: [] },
          onChange: async () => {
            if (editorRef.current) {
              try {
                const savedData = await editorRef.current.save();
                onChangeRef.current(savedData);
              } catch (e) {
                console.error("Editor saving error:", e);
              }
            }
          },
          tools: {
            header: { class: Header, inlineToolbar: true },
            list: { class: List, inlineToolbar: true },
            paragraph: { class: Paragraph, inlineToolbar: true },
            embed: { class: Embed, inlineToolbar: true },
            image: {
              class: ImageTool,
              config: {
                endpoints: {
                  byFile: '/api/upload/image', // Upload to backend
                }
              }
            }
          },
        });
      }
    };

    initializeEditor();

    return () => {
      // Cleanup Editor instance on component unmount
      if (editorRef.current && editorRef.current.destroy) {
        try {
          editorRef.current.destroy();
        } catch (e) {
          console.error("EditorJS cleanup error", e);
        }
        editorRef.current = null;
      }
    };
    // ONLY run once when mounted. Passing `data` as a dependency was causing 
    // the editor to re-initialize and lose cursor focus on every keystroke!
  }, [isMounted, holder]);

  if (!isMounted) return <div className="p-4 rounded-md bg-gray-50 border border-gray-200 min-h-[300px] flex items-center justify-center text-gray-400">Loading editor...</div>;

  return (
    <div className="w-full border border-gray-300 rounded-md py-4 pr-4 pl-14 min-h-[400px] bg-white editorjs-wrapper">
      <div id={holder} className="min-h-[350px]" />
    </div>
  );
};

export default EditorComponent;
