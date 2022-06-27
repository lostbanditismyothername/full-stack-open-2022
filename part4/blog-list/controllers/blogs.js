const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
require("express-async-errors");

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

blogRouter.delete("/:id", async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    logger.error("no such blog");
    res.status(404).send("no such blog in db");
  } else {
    res.status(204).json(blog);
  }
});

module.exports = blogRouter;
