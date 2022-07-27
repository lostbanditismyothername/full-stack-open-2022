import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import { useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  // check if user exists in the local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // handleLogout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogger");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <>
        <LoginForm setUser={setUser} />
      </>
    );
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <BlogForm />
      <Blogs />
    </div>
  );
};

export default App;
