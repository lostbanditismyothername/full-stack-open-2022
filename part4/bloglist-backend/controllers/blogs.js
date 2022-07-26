const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.status(200).json(blogs);
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json(blog);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = req.user;

  const newBlogObj = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id,
  });

  const savedBlog = await newBlogObj.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  const user = req.user;
  const creatorUser = await User.findById(blog.user._id.toString());

  if (!blog) {
    logger.error("no such blog");
    res.status(404).send("no such blog in db");
  } else if (creatorUser._id.toString() !== user._id.toString()) {
    res.status(401).send("you are not authorized to perform this action");
  } else {
    await Blog.findByIdAndDelete(blog.id);
    res.status(200);
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
