import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes, { string } from "prop-types";

const LoginForm = ({ setUser, setErrorMessage, setSuccessMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogger", JSON.stringify(user)); // set user to local storage
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setSuccessMessage(`${user.username} login successfull`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
