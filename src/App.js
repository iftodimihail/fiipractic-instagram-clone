import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import "./App.css";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* home */}
        <Route exact path="/" component={Home} />
        {/* login */}
        <Route exact path="/signin" component={SignIn} />
        {/* signup */}
        <Route exact path="/signup" component={SignUp} />
        {/* profile */}
      </Switch>
    </Router>
  );
}

export default App;
