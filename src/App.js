import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from "pages/Home";
import Login from "pages/Login"
import SignUp from "pages/SignUp";
import { createBrowserHistory } from "history";

import "./App.css";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* home */}
        <Route exact path="/" component={Home}></Route>
        {/* sign up */}
        <Route exact path="/signup" component={SignUp}></Route>
        {/* login */}
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
