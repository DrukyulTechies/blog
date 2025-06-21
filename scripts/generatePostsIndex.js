import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fg from "fast-glob";

const postsDir = path.resolve("src/posts");
const outputFile = path.resolve("src/posts/index.js");

// Helper to generate slugs
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

(async () => {
  const files = await fg("**/*.md", { cwd: postsDir });

  const posts = [];

  for (const filepath of files) {
    const fullPath = path.join(postsDir, filepath);
    let content;

    try {
      content = fs.readFileSync(fullPath, "utf-8");
    } catch (err) {
      console.warn(`⚠️ Could not read file: ${filepath}. Skipping...`);
      continue;
    }

    let data;
    try {
      const parsed = matter(content);
      data = parsed.data;
    } catch (err) {
      console.warn(`⚠️ Invalid frontmatter in: ${filepath}. Skipping...`);
      continue;
    }

    if (!data.title || !data.date || !data.category) {
      console.warn(`⚠️ Missing required fields in: ${filepath}. Skipping...`);
      continue;
    }

    const parts = filepath.split("/");
    const category = parts[0] || "blog";
    const subcategory = parts.length >= 3 ? parts[1] : null;
    const slug = data.slug || slugify(data.title);

    posts.push({
      title: data.title,
      date: data.date,
      slug,
      category,
      subcategory,
      author: data.author || "Unknown",
      image: data.image || null,
      filepath,
    });
  }

  // Sort by newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate output JS
  const output = `
export const posts = [
  ${posts
    .map(
      (post) => `{
    title: ${JSON.stringify(post.title)},
    date: "${post.date}",
    slug: "${post.slug}",
    category: "${post.category}",
    subcategory: ${post.subcategory ? `"${post.subcategory}"` : null},
    author: "${post.author}",
    image: ${post.image ? `"${post.image}"` : "null"},
    content: () => import("../posts/${post.filepath}?raw")
  }`
    )
    .join(",\n")}
];
`;

  fs.writeFileSync(outputFile, output.trim());
  console.log(`✅ Generated ${outputFile} with ${posts.length} valid posts`);
})();
