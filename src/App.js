import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import Profile from "pages/Profile";
import AppLayout from 'components/common/AppLayout'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>

        {/* sign-up */}
        <Route exact path="/signup" component={SignUp} />
        {/* login */}

        <AppLayout>
          {/* home */}
          <Route exact path="/" component={Home} />
          {/* my-profile */}
          <Route exact path="/profile" component={Profile} />
        </AppLayout>
      </Switch>
    </Router>
  );
}

export default App;
