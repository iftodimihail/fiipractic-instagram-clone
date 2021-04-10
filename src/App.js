import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import LogIn from "pages/LogIn";
import Profile from "pages/Profile";
import AppLayout from "components/common/AppLayout";
import { auth } from "utils/firebase";

function App() {
  const [authentication, setAuthentication] = useState({
    loggedIn: false,
    loading: true,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthentication({
          loggedIn: true,
          loading: false,
        });
      } else {
        setAuthentication({
          loggedIn: false,
          loading: false,
        });
      }
    });
  }, [setAuthentication]);

  if (authentication.loading) return null;
  return authentication.loggedIn ? (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Redirect to="/" />
        </Route>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route path="/:username">
            <Profile />
          </Route>
        </AppLayout>
      </Switch>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
