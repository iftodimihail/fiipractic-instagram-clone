import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Profile from "pages/Profile";
import PageLoader from "templates/PageLoader";
import { createBrowserHistory } from "history";
import { auth } from "utils/firebase";

import "./App.css";

const history = createBrowserHistory();

const GuardedRoute = ({ auth, redirectTo, ...rest }) => {
  return auth ? <Route {...rest} /> : <Redirect to={redirectTo} />;
};

function App() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return () => unsubcribe();
  }, [user]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <Router history={history}>
      <Switch>
        {/* home */}
        <GuardedRoute
          auth={user}
          redirectTo="/login"
          exact
          path="/"
          render={() => <Home user={user} />}
        ></GuardedRoute>
        {/* profile */}
        <GuardedRoute
          auth={user}
          redirectTo="/login"
          exact
          path="/profile"
          render={() => <Profile user={user} />}
        ></GuardedRoute>

        {/* login */}
        <GuardedRoute
          auth={!user}
          redirectTo="/"
          exact
          path="/login"
          component={Login}
        ></GuardedRoute>
        {/* sign up */}
        <GuardedRoute
          auth={!user}
          redirectTo="/"
          exact
          path="/signup"
          component={SignUp}
        ></GuardedRoute>
      </Switch>
    </Router>
  );
}

export default App;
