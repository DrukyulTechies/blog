// src/components/CategoryView.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../posts/index";

export default function CategoryView() {
  const { category } = useParams();

  // Filter posts matching category and no subcategory (optional: include those without subcategory)
  const filteredPosts = posts.filter((p) => p.category === category);

  if (filteredPosts.length === 0) {
    return <p className="p-6">No posts found in category "{category}"</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">{category} Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={`${post.category}-${post.subcategory ?? "none"}-${post.slug}`}
            to={
              post.subcategory
                ? `/blog/${post.category}/${post.subcategory}/${post.slug}`
                : `/blog/${post.category}/${post.slug}`
            }
            className="block bg-white shadow-md p-4 rounded hover:shadow-lg"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            {post.subcategory && (
              <p className="text-xs text-indigo-600">{post.subcategory}</p>
            )}
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">by {post.author}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
