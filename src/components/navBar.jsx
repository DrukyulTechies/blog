// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCategoryMapFromPosts } from "../utils/getCategories";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}posts/index.json`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log("✅ Loaded posts:", data);
        const map = getCategoryMapFromPosts(data);
        console.log("✅ Built category map (from util):", map);
        setCategoryMap(map);
      })
      .catch((err) => console.error("❌ Failed to fetch posts:", err));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setHighlightedIndex(-1);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        (p.author && p.author.toLowerCase().includes(term)) ||
        (p.date && p.date.includes(term))
    );

    setSearchResults(filtered.slice(0, 8));
    setHighlightedIndex(-1);
  }, [searchTerm, posts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildPostUrl = (post) =>
    post.subcategory
      ? `/blog/${post.category}/${post.subcategory}/${post.slug}`
      : `/blog/${post.category}/${post.slug}`;

  const onKeyDown = (e) => {
    if (!showSearchDropdown || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
        const url = buildPostUrl(searchResults[highlightedIndex]);
        setSearchTerm("");
        setShowSearchDropdown(false);
        setHighlightedIndex(-1);
        navigate(url);
      }
    } else if (e.key === "Escape") {
      setShowSearchDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  const isActive = (path) => {
    if (path === "/blog") return location.pathname === "/blog"; // exact match for Home
    return location.pathname.startsWith(path); // fallback for other paths
  };

  const activeClass =
    "font-semibold text-green-400 border-b-2 border-green-400";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center text-white bg-transparent backdrop-blur-md shadow-md mb-20">
      <div className="text-2xl font-bold">
        <Link to="/blog" className="hover:text-green-400 transition-colors">
          Druk Yul Techies
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-sm md:text-base relative">
        <Link
          to="/blog"
          className={`hover:text-green-400 transition-colors ${
            isActive("/blog") ? activeClass : ""
          }`}
        >
          Home
        </Link>

        {Object.entries(categoryMap).map(([cat, subs]) => (
          <div key={cat} className="relative group">
            <Link
              to={`/blog/${cat}`}
              className={`capitalize px-2 py-1 block hover:text-green-400 transition-colors ${
                isActive(`/blog/${cat}`) ? activeClass : ""
              }`}
            >
              {cat.replace(/-/g, " ")}
            </Link>
            {subs.length > 0 && (
              <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded shadow-lg z-50 min-w-[150px] hidden group-hover:block">
                {subs.map((sub) => (
                  <Link
                    key={sub}
                    to={`/blog/${cat}/${sub}`}
                    className={`block px-4 py-2 whitespace-nowrap hover:bg-gray-700 ${
                      isActive(`/blog/${cat}/${sub}`)
                        ? "bg-gray-700 font-semibold"
                        : ""
                    }`}
                  >
                    {sub.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Additional static links */}
        <Link
          to="/blog/about"
          className={`hover:text-green-400 transition-colors ${
            isActive("/blog/about") ? activeClass : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/blog/contribute"
          className={`hover:text-green-400 transition-colors ${
            isActive("/blog/contribute") ? activeClass : ""
          }`}
        >
          Contribute
        </Link>
      </div>

      {/* Search */}
      <div className="relative ml-6" ref={searchRef}>
        <input
          type="text"
          className="rounded px-3 py-1 w-48 md:w-64 focus:outline-none border border-gray-300 shadow-sm text-white"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSearchDropdown(true);
          }}
          onFocus={() => setShowSearchDropdown(true)}
          onKeyDown={onKeyDown}
        />

        {showSearchDropdown && searchResults.length > 0 && (
          <ul className="absolute right-0 mt-1 bg-white rounded shadow-lg w-64 max-h-60 overflow-auto z-50">
            {searchResults.map((post, index) => (
              <li
                key={`${post.category}-${post.subcategory ?? "none"}-${
                  post.slug
                }`}
                className={`block px-4 py-2 text-gray-900 hover:bg-gray-200 cursor-pointer ${
                  highlightedIndex === index ? "bg-gray-300 font-semibold" : ""
                }`}
                onClick={() => {
                  const url = buildPostUrl(post);
                  console.log("🔍 Navigating to:", url);
                  setSearchTerm("");
                  setShowSearchDropdown(false);
                  setHighlightedIndex(-1);
                  navigate(url);
                }}
              >
                <strong>{post.title}</strong> by {post.author}
                <br />
                <span className="text-xs text-gray-600">
                  {post.category}
                  {post.subcategory ? ` / ${post.subcategory}` : ""} —{" "}
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}

        {showSearchDropdown &&
          searchTerm.trim() &&
          searchResults.length === 0 && (
            <div className="absolute right-0 mt-1 bg-white rounded shadow-lg w-64 p-4 text-gray-900 z-50">
              No posts found.
            </div>
          )}
      </div>
    </nav>
  );
}
