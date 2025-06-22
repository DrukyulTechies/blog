import React, { useState } from "react";

const categories = {
  Aptitude: ["Combinations", "Permutations", "Probability"],
  Tech: ["JavaScript", "React", "CSS"],
  Education: ["Mathematics", "Science", "Computer Science"],
};

export default function MarkdownPostGenerator() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    subcategory: "",
    author: "",
    image: "https://picsum.photos/200/300?grayscale",
    content: "",
  });

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = () => {
    if (!form.title || !form.description || !form.category || !form.author) {
      alert("Please fill in all required fields.");
      return;
    }

    const slug = slugify(form.title);
    const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;

    const markdown = `---
title: "${form.title}"
description: "${form.description}"
date: "${form.date}"
slug: "${slug}"
category: "${form.category.toLowerCase()}"
subcategory: "${form.subcategory ? form.subcategory.toLowerCase() : ""}"
author: "${form.author}"
image: "${form.image}"
wordCount: ${wordCount}
---

${form.content}`;

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug}.mdx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
        📝 Markdown Blog Generator
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title *</label>
          <input
            type="text"
            placeholder="e.g. Notes on Combinations"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description *</label>
          <input
            type="text"
            placeholder="Brief summary of your post"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-semibold">Date *</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-semibold">Author *</label>
          <input
            type="text"
            placeholder="Your name"
            value={form.author}
            onChange={(e) => handleChange("author", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category *</label>
          <select
            value={form.category}
            onChange={(e) => {
              handleChange("category", e.target.value);
              handleChange("subcategory", "");
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Category --</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block mb-1 font-semibold">Subcategory</label>
          <select
            value={form.subcategory}
            onChange={(e) => handleChange("subcategory", e.target.value)}
            disabled={!form.category}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Optional --</option>
            {form.category &&
              categories[form.category].map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
          </select>
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Markdown Content */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Markdown Content</label>
          <textarea
            rows={10}
            placeholder="Write your markdown content here..."
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 font-mono"
          ></textarea>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold shadow"
        >
          ⬇️ Download .md File
        </button>
      </div>
    </div>
  );
}
