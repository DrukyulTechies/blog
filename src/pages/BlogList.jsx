import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import NavBar from "../components/navBar";

const POSTS_PER_PAGE = 12;

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}posts/index.json`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load post index", err));
  }, []);

  const filteredPosts = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    let result = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
    );

    if (sortBy === "title")
      result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "oldest")
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "newest")
      result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return result;
  }, [debouncedQuery, sortBy, posts]);

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const uniqueCategories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <NavBar />
      <h1 className="text-3xl font-bold mb-4 text-center">All Blog Posts</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full sm:w-1/2"
          placeholder="Search by title, author, or category..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border p-2 rounded w-full sm:w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSearchQuery(cat);
              setPage(1);
            }}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-gray-500 text-center w-full">No posts found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedPosts.map((post) => (
          <Link
            key={`${post.category}-${post.slug}`}
            to={`/blog/post/${post.category}/${
              post.subcategory ? `${post.subcategory}/` : ""
            }${post.slug}`}
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
            {post.wordCount && (
              <p className="text-xs text-gray-500">
                ⏱ {Math.max(1, Math.ceil(post.wordCount / 200))} min read
              </p>
            )}
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
