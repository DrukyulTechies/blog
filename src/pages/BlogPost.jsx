import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import NavBar from "../components/navBar";
import { motion, AnimatePresence } from "framer-motion";
import { MDXProvider } from "@mdx-js/react";

const components = {
  h2: (props) => (
    <h2 {...props} className="scroll-mt-24 text-3xl text-white font-bold" />
  ),
  h3: (props) => (
    <h3 {...props} className="scroll-mt-24 text-2xl text-white font-semibold" />
  ),
  p: (props) => <p {...props} className="text-lg text-white leading-relaxed" />,
  code: (props) => (
    <code
      {...props}
      className="bg-gray-800 text-green-400 p-1 rounded text-sm"
    />
  ),
  table: (props) => (
    <div className="overflow-auto">
      <table
        {...props}
        className="table-auto w-full border border-gray-300 text-sm text-left text-gray-700"
      />
    </div>
  ),
};

// Glob import all MDX files
const mdxModules = import.meta.glob("/src/posts/**/*.mdx", { eager: true });
console.log("MDX modules loaded:", Object.keys(mdxModules));

export default function BlogPost() {
  const { category, subcategory, slug } = useParams();
  const location = useLocation();
  const [MDXContent, setMDXContent] = useState(null);
  const [meta, setMeta] = useState({ title: "", author: "", date: "" });
  const [readingTime, setReadingTime] = useState("");
  const [tocItems, setTocItems] = useState([]);
  const [error, setError] = useState(null);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}posts/index.json`)
      .then((res) => res.json())
      .then((posts) => {
        const post = posts.find(
          (p) =>
            p.category === category &&
            p.slug === slug &&
            (subcategory ? p.subcategory === subcategory : true)
        );

        if (!post) return setError("Post not found");

        // Try different key variations
        let filepath = post.filepath;
        if (filepath.endsWith(".md")) {
          filepath = filepath.replace(".md", ".mdx");
        }
        const mdxPath = `/src/posts/${filepath}`;

        let mdxKey = mdxPath;
        if (!mdxModules[mdxKey]) {
          const alt1 = mdxKey.startsWith("/") ? mdxKey.slice(1) : "/" + mdxKey;
          const alt2 = `.${mdxKey}`;
          if (mdxModules[alt1]) mdxKey = alt1;
          else if (mdxModules[alt2]) mdxKey = alt2;
          else {
            console.error("MDX file not found with any matching key", mdxPath);
            return setError("MDX file not found");
          }
        }

        const mod = mdxModules[mdxKey];
        setMDXContent(() => mod.default);

        setMeta({
          title: post.title || "Untitled",
          author: post.author || "Unknown",
          date: post.date || "Unknown",
        });

        const wordCount = post.wordCount || 400;
        setReadingTime(`${Math.max(1, Math.ceil(wordCount / 200))} min read`);

        const toc = (post.toc || []).map((heading, index) => ({
          text: heading,
          id: `toc-${index}`,
        }));
        setTocItems(toc);
      })
      .catch(() => setError("Failed to load post metadata"));
  }, [category, subcategory, slug]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = document.querySelector("#scroll-progress");
      const scrollTop = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const percent = (scrollTop / maxHeight) * 100;
      progress.style.width = `${percent}%`;

      const headings = document.querySelectorAll("article h2, article h3");
      let active = "";
      headings.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < 200) {
          active = el.id;
        }
      });
      setActiveHeading(active);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <Link to="/blog" className="underline text-blue-600">
          ← Back to blog
        </Link>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        id="scroll-progress"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      ></motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row max-w-screen-xl mx-auto mt-20 px-4 md:px-6 lg:px-8"
        >
          <motion.main
            className="w-full lg:w-3/4 p-4 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/blog" className="text-blue-400 underline mb-6 block">
              ← Back to blog
            </Link>

            <header className="mb-10">
              <h1 className="text-5xl font-bold text-white mb-2">
                {meta.title}
              </h1>
              <p className="text-base text-gray-300">
                ✍️ {meta.author} &nbsp;•&nbsp; 📅 {meta.date} &nbsp;•&nbsp; ⏱{" "}
                {readingTime}
              </p>
            </header>

            <MDXProvider components={components}>
              <article className="prose prose-invert prose-lg max-w-none text-white text-">
                {MDXContent && <MDXContent />}
              </article>
            </MDXProvider>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=Check%20this%20out!%20${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                Share on Twitter
              </a>
              <a
                href={`https://wa.me/?text=Check%20this%20post:%20${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Share on WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
              >
                Share on Facebook
              </a>
            </div>
          </motion.main>

          <motion.aside
            className="hidden lg:block w-full lg:w-1/4 p-4 sticky top-20 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                📘 On This Page
              </h2>
              <p className="text-sm text-gray-500 italic mb-4">
                ⏱ {readingTime}
              </p>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm hover:underline transition-colors duration-200 ${
                      activeHeading === item.id
                        ? "text-blue-800 font-semibold"
                        : "text-blue-600"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
