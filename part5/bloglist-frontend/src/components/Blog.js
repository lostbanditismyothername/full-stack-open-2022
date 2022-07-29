import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const user = useContext(UserContext);

  // handle delete
  const handleDelete = async () => {
    try {
      const deletedBlog = await blogService.remove(blog.id, blog);
      alert(`${deletedBlog.title} is removed`);
    } catch (exception) {
      alert(exception.message);
    }
  };

  // handle like
  const handleLike = async () => {
    const newBlogObj = { ...blog, likes: blog.likes + 1 };
    return await blogService.update(blog.id, newBlogObj);
  };

  return (
    <div style={{ border: "1px solid gray", padding: "0.5rem" }}>
      {blog.title} {blog.author}
      <button
        style={{ marginLeft: 10, background: "violet" }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "hide" : "view"}
      </button>
      <button
        style={{
          marginLeft: 10,
          background: "red",
          display: user && blog.user.username === user.username ? "" : "none",
        }}
        onClick={handleDelete}
      >
        delete
      </button>
      <button style={{ marginLeft: 10, background: "pink" }} onClick={handleLike}>
        Like
      </button>
      <ul style={{ display: showDetails ? "" : "none" }}>
        <p>URL: {blog.url}</p>
        <p>Created by: {blog.user.username}</p>
        <p>likes {blog.likes}</p>
      </ul>
    </div>
  );
};

export default Blog;
