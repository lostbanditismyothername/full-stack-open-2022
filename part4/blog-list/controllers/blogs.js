const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { body } = req;

  const newBlogObj = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const newBlog = await newBlogObj.save();
  res.status(201).json(newBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    logger.error("no such blog");
    res.status(404).send("no such blog in db");
  } else {
    res.status(204);
  }
});

blogRouter.put("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const { body } = req;
  // eslint-disable-next-line object-curly-newline
  const { title, author, url, likes } = body;

  const newBlog = {
    title,
    author,
    url,
    likes,
  };

  if (blog) {
    const newBlogObj = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true });
    res.json(newBlogObj);
  } else {
    res.send("No such blog in db");
  }
});

module.exports = blogRouter;
