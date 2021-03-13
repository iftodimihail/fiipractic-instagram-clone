import React from "react"; //rfce to autocomplete
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //npm install react-router react-router-dom history

import Home from "pages/Home";
import SignUp from "pages/SignUp";

import "./App.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        {/* login */}
        {/* my-profile */}
      </Switch>
    </Router>
  );
}

export default App;
