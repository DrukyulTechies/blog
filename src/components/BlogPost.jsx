import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { marked } from "marked";

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/posts/${slug}.md`)
      .then((res) => res.text())
      .then((text) => setContent(marked.parse(text)));
  }, [slug]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <Link to="/" className="text-blue-600 underline">
        ← Back
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose mt-4"
      />
    </div>
  );
}
