const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const logger = require("../utils/logger");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");

  res.status(200).json({ users: users });
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  // check if user already exists
  const doesUserExist = await User.findOne({ username });
  if (doesUserExist) {
    return res.status(400).json({ error: "username already exists" });
  }

  // check if the inputs are valid`
  if (password.length < 3 || username.length < 3) {
    return res
      .status(400)
      .json({ error: "username and password should contain at least 3 characters" });
  }

  // hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // create a new user object
  const newUser = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
});

module.exports = userRouter;
