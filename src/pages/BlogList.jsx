import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { posts } from "../posts/index";

const POSTS_PER_PAGE = 12;

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const uniqueCategories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Blog Posts</h1>

      <input
        type="text"
        className="border p-2 rounded w-full mb-6"
        placeholder="Search by title, author, or category..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1);
        }}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {uniqueCategories.map((cat) => (
          <Link
            key={cat}
            to={`/blog/category/${cat}`}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedPosts.map((post) => (
          <Link
            key={`${post.category}-${post.slug}`}
            to={`/blog/post/${post.category}/${post.slug}`}
            className="block bg-white shadow-md p-4 rounded hover:shadow-lg transition"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <span className="text-xs text-blue-500">{post.category}</span>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">by {post.author}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-1 rounded border ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
