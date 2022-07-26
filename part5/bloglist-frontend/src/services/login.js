import axios from "axios";

const baseURL = "api/login";

const login = async (credentials) => {
  const res = await axios.post(baseURL, credentials);
  return res.data; // will return username, name and token
};

export default { login };
