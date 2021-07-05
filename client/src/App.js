import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import Profile from "./components/profile/profile";
import Edit from "./components/edit/edit";

function App() {

  return (
    <>
      {/* <SignUp /> */}
      {/* <SignIn /> */}
      {/* <Profile /> */}
      <Edit />
    </>
  );
}

export default App;
