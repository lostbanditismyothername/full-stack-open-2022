import "./index.css";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {user === null ? (
        <>
          <LoginForm
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <BlogForm setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
          <Blogs />
        </div>
      )}
    </div>
  );
};

export default App;
