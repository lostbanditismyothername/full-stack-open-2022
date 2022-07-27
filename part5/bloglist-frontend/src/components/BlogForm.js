import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogObj = {
      title,
      author,
      url,
    };

    await blogService.create(blogObj);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="title.."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            placeholder="author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="url"
            placeholder="url..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default BlogForm;
