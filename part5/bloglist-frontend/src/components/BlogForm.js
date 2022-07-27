import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setSuccessMessage, setErrorMessage }) => {
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

    console.log(blogObj);

    try {
      await blogService.create(blogObj);
      setSuccessMessage(`${title} created by ${author}`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      setErrorMessage("Blog creation error", exception.message);
      setTimeout(() => setErrorMessage(null), 3000);
    }
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
