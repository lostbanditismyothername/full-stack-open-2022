import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);

  if (!isLoggedIn) {
    return (
      <>
        <LoginForm setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} />
      </>
    );
  }

  return (
    <div>
      <p>{loggedInUser.name} logged in</p>
      <Blogs />
    </div>
  );
};

export default App;
