const blogRouter = require("express").Router();
const Blog = require("../models/blog");
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

module.exports = blogRouter;
