import React from 'react';
import editorjsHtml from 'editorjs-html';

// Initialize the parser outside to prevent memory leaks / re-renders
const edjsParser = editorjsHtml({
  // Custom parsers can be added here
  image: (block: any) => {
    // Editor.js Image Tool structure handling
    const url = block?.data?.file?.url || block?.data?.url;
    const caption = block?.data?.caption || '';
    const withBorder = block?.data?.withBorder;
    const withBackground = block?.data?.withBackground;
    const stretched = block?.data?.stretched;

    const classes = [
      withBorder ? 'border border-gray-200' : '',
      withBackground ? 'bg-gray-100 p-4' : '',
      stretched ? 'w-full' : 'max-w-3xl mx-auto',
    ].filter(Boolean).join(' ');

    return `<div class="my-8 ${classes}">
      <img src="${url}" alt="${caption}" class="rounded-lg w-full h-auto object-cover" />
      ${caption ? `<div class="text-center text-sm text-gray-500 mt-2">${caption}</div>` : ''}
    </div>`;
  }
});

const EditorRenderer = ({ data }: { data: any }) => {
  let parsedData = data;
  
  if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse string data", e);
      return <div className="text-red-500">JSON parsing error.</div>;
    }
  }

  if (!parsedData || !parsedData.blocks || !Array.isArray(parsedData.blocks) || parsedData.blocks.length === 0) {
    return null;
  }

  try {
    const htmlString = edjsParser.parse(parsedData) as unknown as string;

    // editorjs-html can either return an array of strings (v3.4.0) or a joined string in some forks/versions.
    // If it is an array, we map it. If it's a string, we wrap it.
    if (Array.isArray(htmlString)) {
       return (
        <div className="prose prose-lg max-w-none w-full prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500">
          {(htmlString as string[]).map((html, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </div>
      );
    } else {
       return (
        <div 
          className="prose prose-lg max-w-none w-full prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      );
    }
  } catch (error: any) {
    console.error("Editor.js Parsing Error:", error);
    return <div className="text-red-500">Failed to render content blocks. Reason: {error.message || String(error)}</div>;
  }
};

export default EditorRenderer;
