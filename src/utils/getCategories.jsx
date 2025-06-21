// utils/getCategories.js
export function getCategories(posts) {
  const map = {};

  posts.forEach(({ category, subcategory }) => {
    if (!category) return;

    if (!map[category]) {
      map[category] = new Set();
    }
    if (subcategory) {
      map[category].add(subcategory);
    }
  });

  // Convert Set to array for ease of use
  const result = {};
  for (const [cat, subSet] of Object.entries(map)) {
    result[cat] = Array.from(subSet);
  }
  return result;
}
