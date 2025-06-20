import { Link } from "react-router-dom";
import postsIndex from "../posts/index.json";

export default function BlogList() {
  return (
    <div className="space-y-4">
      {postsIndex.map((post) => (
        <Link
          key={post.slug}
          to={`/post/${post.slug}`}
          className="block p-4 bg-white rounded shadow hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-500 text-sm">{post.date}</p>
        </Link>
      ))}
    </div>
  );
}
