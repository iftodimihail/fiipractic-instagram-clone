import React from "react";
import "App.css";
import Home from "pages/Home";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        {/* Home */}
        <Route path="/" component={Home} exact />
        {/* Sign-Up */}
        <Route path="/signup" component={SignUp} exact />
        {/* Login */}
        <Route path="/signin" component={SignIn} exact />
        {/*  My-Profile */}
      </Switch>
    </Router>
  );
};

export default App;
