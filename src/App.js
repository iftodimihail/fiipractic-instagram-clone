import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import LogIn from "pages/LogIn";
import Profile from "pages/Profile";
import AppLayout from "components/common/AppLayout";
import { createBrowserHistory } from "history";
import AuthLayout from "components/common/AuthLayout";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AuthLayout>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
        </AuthLayout>
        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </AppLayout>
      </Switch>
    </Router>
  );
}

export default App;
