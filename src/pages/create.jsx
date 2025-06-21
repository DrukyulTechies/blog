import React, { useState, useEffect } from "react";
// Import your posts index JSON or pass as prop
import { posts } from "../posts/index"; // adjust path as needed

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    subcategory: "",
    author: "",
    image: "",
    description: "",
    content: "",
  });

  const [markdown, setMarkdown] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Extract unique categories and subcategories from posts
  const categoriesMap = React.useMemo(() => {
    const map = {};
    posts.forEach((post) => {
      if (!map[post.category]) map[post.category] = new Set();
      if (post.subcategory) map[post.category].add(post.subcategory);
    });
    // Convert subcategory sets to arrays
    for (const key in map) {
      map[key] = Array.from(map[key]);
    }
    return map;
  }, []);

  const categories = Object.keys(categoriesMap);

  // When category changes, reset subcategory if not valid
  useEffect(() => {
    if (
      formData.subcategory &&
      (!categoriesMap[formData.category] ||
        !categoriesMap[formData.category].includes(formData.subcategory))
    ) {
      setFormData((f) => ({ ...f, subcategory: "" }));
    }
  }, [formData.category, formData.subcategory, categoriesMap]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generateMarkdown = () => {
    const {
      title,
      slug,
      date,
      category,
      subcategory,
      author,
      image,
      description,
      content,
    } = formData;

    return `---
title: "${title}"
description: "${description}"
date: "${date}"
slug: "${slug}"
category: "${category}"
subcategory: "${subcategory}"
author: "${author}"
image: "${image}"
---

${content}
`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mdText = generateMarkdown();
    setMarkdown(mdText);
    const blob = new Blob([mdText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post Markdown</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Other inputs ... */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Subcategory (optional)
          </label>
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            disabled={
              !formData.category ||
              categoriesMap[formData.category]?.length === 0
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Subcategory --</option>
            {formData.category &&
              categoriesMap[formData.category]?.map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat.replace(/-/g, " ")}
                </option>
              ))}
          </select>
        </div>

        {/* Rest of form inputs (title, slug, author, etc.) */}
        {/* ... */}

        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Slug (URL friendly)
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="e.g. understanding-photosynthesis"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Image URL (optional)
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g. /images/post-cover.jpg"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description or excerpt"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={2}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your markdown content here"
            className="w-full border border-gray-300 rounded px-3 py-2 font-mono"
            rows={10}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Generate Markdown File
        </button>
      </form>

      {downloadUrl && (
        <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-300">
          <h2 className="font-semibold mb-2">Your Markdown is ready!</h2>
          <pre className="max-h-48 overflow-auto bg-white p-3 rounded text-sm whitespace-pre-wrap">
            {markdown}
          </pre>
          <a
            href={downloadUrl}
            download={`${formData.slug || "post"}.md`}
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download .md file
          </a>
        </div>
      )}
    </div>
  );
}
