// scripts/generateIndex.js
import fs from "fs";
import matter from "gray-matter";
import fg from "fast-glob";

const postsDir = "./public/posts";
const outputFile = "./src/posts/index.json";

const run = async () => {
  const files = await fg(`${postsDir}/*.md`);
  const posts = files.map((filepath) => {
    const content = fs.readFileSync(filepath, "utf-8");
    const { data } = matter(content);
    return {
      title: data.title || "Untitled",
      date: data.date || "1970-01-01",
      slug: data.slug || filepath.split("/").pop().replace(".md", ""),
    };
  });

  // Sort by newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log(`✅ Generated ${outputFile} with ${posts.length} posts`);
};

run();
