import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import Profile from "./components/profile/profile";
import Edit from "./components/edit/edit";

import { GoogleAuthContext } from "./components/utils/auth_context";
import { useAuth } from "./components/utils/useAuth";

function App() {

  const googleAuth = useAuth().useGoogleAuth();
  const githubAuth = useAuth().useAuthGithub();
  
  return (
    <>
    <GoogleAuthContext.Provider value={{googleAuth, githubAuth}}>
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
    </GoogleAuthContext.Provider>
    </>
  );
}

export default App;