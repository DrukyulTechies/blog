import { Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import AboutPage from "./about";
import Contribute from "./contribute";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import CategoryPosts from "./CategoryPost";
import Subcategory from "./SubCategory";
import CreatePost from "./create";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/blog" element={<HomePage />} />
      <Route path="/blog/about" element={<AboutPage />} />
      <Route path="/blog/contribute" element={<Contribute />} />
      <Route path="/blog/bloglist" element={<BlogList />} />
      <Route path="/blog/:category" element={<CategoryPosts />} />
      <Route path="/blog/:category/:subcategory" element={<Subcategory />} />

      {/* Added 'post' prefix here */}
      <Route
        path="/blog/post/:category/:subcategory/:slug"
        element={<BlogPost />}
      />
      <Route path="/blog/post/:category/:slug" element={<BlogPost />} />

      <Route path="/blog/blog/:slug" element={<BlogPost />} />
      <Route path="/blog/create" element={<CreatePost />} />
    </Routes>
  );
}
