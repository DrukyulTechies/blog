import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navBar";

export default function CategoryView() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}posts/index.json`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.category === category);
        setPosts(filtered);
      })
      .catch((err) => console.error("Error loading posts:", err));
  }, [category]);

  if (posts.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No posts found in category "<strong>{category}</strong>"
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto mt-20">
        <h2 className="text-3xl font-bold mb-6 capitalize text-center">
          {category} Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={`${post.category}-${post.subcategory ?? "none"}-${
                post.slug
              }`}
              to={
                post.subcategory
                  ? `/blog/post/${post.category}/${post.subcategory}/${post.slug}`
                  : `/blog/post/${post.category}/${post.slug}`
              }
              className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                {post.subcategory && (
                  <p className="text-xs text-indigo-500 mb-1 uppercase tracking-wide">
                    {post.subcategory}
                  </p>
                )}
                <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-1">by {post.author}</p>
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  {post.wordCount && (
                    <span>
                      ⏱ {Math.max(1, Math.ceil(post.wordCount / 200))} min
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
