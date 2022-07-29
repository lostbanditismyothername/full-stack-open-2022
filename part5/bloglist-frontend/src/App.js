import "./index.css";
import { useState, useEffect, useMemo } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  // check if user exists in the local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogger");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // handle logout
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
          <hr />
          <button onClick={() => setShowNewBlogForm(!showNewBlogForm)}>
            {showNewBlogForm ? "cancel" : "new blog"}
          </button>
          <NewBlogForm
            visible={showNewBlogForm}
            setVisible={setShowNewBlogForm}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
      )}
      <hr />
      <UserContext.Provider value={user}>
        <Blogs />
      </UserContext.Provider>
    </div>
  );
};
export default App;
