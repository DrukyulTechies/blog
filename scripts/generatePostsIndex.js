import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.resolve("src/posts"); // ✅ Move to src!
const OUTPUT_JSON = path.resolve("public/posts/index.json");

const isMdxFile = (filename) => filename.endsWith(".mdx");

const walkDir = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (isMdxFile(fullPath)) {
      fileList.push(fullPath);
    }
  });

  return fileList;
};

const generatePostsIndex = () => {
  const mdxFiles = walkDir(POSTS_DIR);
  const posts = [];

  mdxFiles.forEach((filePath) => {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      // Skip drafts if you use `draft: true` in frontmatter
      if (data.draft) return;

      const relPath = path.relative(POSTS_DIR, filePath).replace(/\\/g, "/");
      const parts = relPath.split("/");

      const category = parts[0];
      const subcategory = parts.length > 2 ? parts[1] : null;
      const slug = data.slug || path.basename(filePath, ".mdx");

      const requiredFields = ["title", "date"];
      const hasAllFields = requiredFields.every((field) => data[field]);

      if (!hasAllFields) {
        console.warn(`⚠️ Skipping file with missing fields: ${relPath}`);
        return;
      }

      const wordCount = fileContent.split(/\s+/).length;

      // Optional: generate Table of Contents from headings
      const headings = [...fileContent.matchAll(/^#{2,3}\s+(.*)$/gm)].map(
        (m) => m[1]
      );

      posts.push({
        title: data.title,
        description: data.description || "",
        date: data.date,
        category,
        subcategory,
        slug,
        author: data.author || "Unknown",
        image: data.image || "",
        filepath: relPath,
        wordCount,
        toc: headings,
      });
    } catch (err) {
      console.error(`❌ Failed to parse file: ${filePath}`);
      console.error(err.message);
    }
  });

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });

  try {
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(posts, null, 2));
    console.log(`✅ Generated ${OUTPUT_JSON} with ${posts.length} posts`);
  } catch (err) {
    console.error(`❌ Failed to write index.json`);
    console.error(err.message);
  }
};

generatePostsIndex();
