import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import Profile from "./components/profile/profile";
import Edit from "./components/edit/edit";

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;