import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import Login from "pages/Login";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        {/* my-profile */}
      </Switch>
    </Router>
  );
}

export default App;
