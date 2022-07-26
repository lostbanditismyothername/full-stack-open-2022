const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = (blogs) => {
  let favLikes = 0;
  let favIndex = 0;

  blogs.forEach((blog, i) => {
    if (blog.likes > favLikes) {
      favLikes = blog.likes;
      favIndex = i;
    }
  });

  const favBlog = {
    title: blogs[favIndex].title,
    author: blogs[favIndex].author,
    likes: blogs[favIndex].likes,
  };
  return favBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
