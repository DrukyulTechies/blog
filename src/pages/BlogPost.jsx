// src/components/BlogPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import { posts } from "../posts/index";

export default function BlogPost() {
  const { category, subcategory, slug } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Find post matching parameters
    const post = posts.find((p) => {
      if (subcategory) {
        return (
          p.category === category &&
          p.subcategory === subcategory &&
          p.slug === slug
        );
      } else {
        // For posts without subcategory (e.g. /blog/class10/:slug)
        return p.category === category && p.slug === slug;
      }
    });

    if (!post) {
      setError("Post not found");
      return;
    }

    post
      .content()
      .then((mod) => setContent(marked.parse(mod.default)))
      .catch(() => setError("Failed to load post content"));
  }, [category, subcategory, slug]);

  if (error)
    return (
      <div className="p-6 text-red-600">
        <Link to="/blog" className="underline text-blue-600">
          ← Back to blog
        </Link>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/blog" className="underline text-blue-600">
        ← Back to blog
      </Link>
      <article
        className="prose mt-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
