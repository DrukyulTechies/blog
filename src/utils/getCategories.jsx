export function getCategoryMapFromPosts(posts) {
  const map = {};

  posts.forEach((post) => {
    if (!post.category) return;
    if (!map[post.category]) map[post.category] = new Set();
    if (post.subcategory) map[post.category].add(post.subcategory);
  });

  const categoryMap = {};
  for (const cat in map) {
    categoryMap[cat] = Array.from(map[cat]);
  }

  return categoryMap;
}
