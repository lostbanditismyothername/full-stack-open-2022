import { useState } from "react";
import loginService from "../services/login";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (exception) {
      console.error("wrong credentials");
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

export default LoginForm;
