const logger = require("./logger");

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
    return res.status(400).send({ Error: "Malformatted ID" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ Error: Error.message });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get("Authorization");
  let token;

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    token = auth.substring(7);
  }

  req.token = token;

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
