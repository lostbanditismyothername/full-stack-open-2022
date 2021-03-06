require("dotenv").config();

const { PORT, SECRET } = process.env;

// eslint-disable-next-line operator-linebreak
const MONGO_URI =
  process.env.NODE_ENV === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

module.exports = {
  PORT,
  MONGO_URI,
  SECRET,
};
