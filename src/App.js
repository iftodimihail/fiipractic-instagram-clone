import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* home */}
        <Route exact path="/" component={Home} />
        {/* login */}
        <Route exact path="/login" component={Login} />
        {/* sign-up */}
        <Route exact path="/signup" component={SignUp} />

        {/* my-profile */}
      </Switch>
    </Router>
  );
}

export default App;
