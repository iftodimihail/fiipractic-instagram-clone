import React from "react";
import Home from "pages/Home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignUp from "pages/SignUp";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* home */}
        <Route exact path="/" component={Home} />
        {/*sign-up*/}
        <Route exact path="/signup" component={SignUp} />
        {/*login*/}
        {/*my-profile*/}
      </Switch>
    </Router>
  );
}

export default App;
