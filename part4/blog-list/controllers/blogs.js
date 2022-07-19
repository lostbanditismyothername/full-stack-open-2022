const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const config = require("../utils/config");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.status(200).json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const token = req.token;

  const decodedToken = jwt.verify(token, config.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

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
