import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div>
      <Blogs />
    </div>
  );
};

export default App;
