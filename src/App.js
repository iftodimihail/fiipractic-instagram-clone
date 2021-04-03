import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import LogIn from "pages/LogIn";
import Profile from "pages/Profile";
import AppLayout from "components/common/AppLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </AppLayout>
      </Switch>
    </Router>
  );
}

export default App;
