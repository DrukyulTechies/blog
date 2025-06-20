import { useState } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const handleGenerate = () => {
    const markdown = `# ${title}\n\n${content}`;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.md`;
    a.click();
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Create a Blog Post</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Slug (e.g., my-first-post)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-4 h-40"
        placeholder="Markdown content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
      >
        Download Markdown File
      </button>
    </div>
  );
}
