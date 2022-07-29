import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes);
      setBlogs(sortedBlogs);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
