const logger = require("./logger");
const config = require("../utils/config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ Error: "Unknown Endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    console.log(error.message);
    return res.status(400).send({ Error: "Malformatted ID" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ Error: Error.message });
  }

  next(error);
};

// Extracts the token in Auth header and places it in request obj
const tokenExtractor = (req, res, next) => {
  const auth = req.get("Authorization");
  let token;

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    token = auth.substring(7);
  } else {
    return res.status(401).json({ error: "token couldn't be found" });
  }

  req.token = token;

  next();
};

// Checks the token and finds the user that token belongs to
const userExtractor = async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  req.user = user;

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
