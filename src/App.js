import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect  } from "react-router-dom"

import Home from "pages/Home";
import Login from "pages/Login"
import SignUp from "pages/SignUp";
import Profile from "pages/Profile"
import Auth from 'templates/Auth'
import { createBrowserHistory } from "history";
import { auth } from "utils/firebase";

import "./App.css";

const history = createBrowserHistory();

const GuardedRoute = ({ auth, redirectTo, ...rest }) => {
  return auth ? <Route {...rest} /> : <Redirect to={redirectTo} />;
};

function App() {
  return (
    <Router history={history}>
      <Switch>

        {/* home */}
        <GuardedRoute auth={auth.currentUser} redirectTo="/login" exact path="/" component={Home}></GuardedRoute>
        {/* profile */}
        <GuardedRoute auth={auth.currentUser} redirectTo="/login" exact path="/profile" component={Profile}></GuardedRoute>

        <Auth>
          {/* login */}
          <GuardedRoute auth={!(auth.currentUser)} redirectTo="/" exact path="/login" component={Login}></GuardedRoute>
          {/* sign up */}
          <GuardedRoute auth={!(auth.currentUser)} redirectTo="/" exact path="/signup" component={SignUp}></GuardedRoute>
        </Auth>

      </Switch>
    </Router>
  );
}

export default App;
