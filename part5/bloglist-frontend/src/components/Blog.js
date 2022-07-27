import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const handleDelete = async () => {
    try {
      console.log(blog.id);
      const deletedBlog = await blogService.remove(blog.id, blog);
      alert(`${deletedBlog.title} is removed`);
    } catch (exception) {
      alert(exception.message);
    }
  };

  return (
    <div>
      <p>
        {blog.title} {blog.author}
        <button style={{ marginLeft: 10 }} onClick={handleDelete}>
          delete
        </button>
      </p>
    </div>
  );
};

export default Blog;
