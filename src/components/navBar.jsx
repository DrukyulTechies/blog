import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { posts } from "../posts/index";
import { getCategories } from "../utils/getCategories";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openCat, setOpenCat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const categories = getCategories(posts);

  const searchRef = useRef();

  // Filter posts based on search term (title, author, date)
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
  }, [searchTerm]);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation inside search dropdown
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
        const post = searchResults[highlightedIndex];
        const url = buildPostUrl(post);
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

  // Helper to check active route
  const isActive = (path) => location.pathname.startsWith(path);

  // Build post URL from post object
  const buildPostUrl = (post) => {
    if (post.subcategory) {
      return `/blog/${post.category}/${post.subcategory}/${post.slug}`;
    }
    return `/blog/${post.category}/${post.slug}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center text-white bg-transparent backdrop-blur-md shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/blog" className="hover:text-green-400 transition-colors">
          Druk Yul Techies
        </Link>
      </div>

      {/* Categories with dropdown */}
      <div className="flex items-center space-x-6 text-sm md:text-base relative">
        <Link
          to="/blog"
          className={`hover:text-green-400 transition-colors ${
            isActive("/blog") &&
            !Object.keys(categories).some((cat) =>
              location.pathname.startsWith(`/blog/${cat}`)
            )
              ? "underline font-semibold"
              : ""
          }`}
        >
          Home
        </Link>

        {Object.entries(categories).map(([cat, subs]) => (
          <div
            key={cat}
            className="relative"
            onMouseEnter={() => setOpenCat(cat)}
            onMouseLeave={() => setOpenCat(null)}
          >
            <Link
              to={`/blog/${cat}`}
              className={`capitalize px-2 py-1 block hover:text-green-400 transition-colors ${
                isActive(`/blog/${cat}`) ? "underline font-semibold" : ""
              }`}
            >
              {cat.replace(/-/g, " ")}
            </Link>

            {/* Dropdown */}
            {openCat === cat && subs.length > 0 && (
              <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded shadow-lg z-50 min-w-[150px]">
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

        <Link
          to="/blog/about"
          className={`hover:text-green-400 transition-colors ${
            isActive("/blog/about") ? "underline font-semibold" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/blog/contribute"
          className={`hover:text-green-400 transition-colors ${
            isActive("/blog/contribute") ? "underline font-semibold" : ""
          }`}
        >
          Contribute
        </Link>
        <Link
          to="/blog/contact"
          className={`hover:text-green-400 transition-colors ${
            isActive("/blog/contact") ? "underline font-semibold" : ""
          }`}
        >
          Contact
        </Link>
      </div>

      {/* Search bar */}
      <div className="relative ml-6" ref={searchRef}>
        <input
          type="text"
          className="rounded px-3 py-1 w-48 md:w-64 focus:outline-none border border-gray-300 shadow-sm text-black"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSearchDropdown(true);
          }}
          onFocus={() => setShowSearchDropdown(true)}
          onKeyDown={onKeyDown}
          aria-label="Search posts"
          role="searchbox"
          aria-autocomplete="list"
          aria-expanded={showSearchDropdown}
        />

        {/* Dropdown with results */}
        {showSearchDropdown && searchResults.length > 0 && (
          <ul
            className="absolute right-0 mt-1 bg-white rounded shadow-lg w-64 max-h-60 overflow-auto z-50"
            role="listbox"
            aria-activedescendant={
              highlightedIndex >= 0
                ? `search-result-${highlightedIndex}`
                : undefined
            }
          >
            {searchResults.map((post, index) => (
              <li
                id={`search-result-${index}`}
                key={`${post.category}-${post.subcategory ?? "none"}-${
                  post.slug
                }`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`block px-4 py-2 text-gray-900 hover:bg-gray-200 cursor-pointer ${
                  highlightedIndex === index ? "bg-gray-300 font-semibold" : ""
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(-1)}
                onClick={() => {
                  const url = buildPostUrl(post);
                  setSearchTerm("");
                  setShowSearchDropdown(false);
                  setHighlightedIndex(-1);
                  navigate(url);
                }}
              >
                <strong>{post.title}</strong> by {post.author} <br />
                <span className="text-xs text-gray-600">
                  {post.category}
                  {post.subcategory ? ` / ${post.subcategory}` : ""} —{" "}
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* No results */}
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
