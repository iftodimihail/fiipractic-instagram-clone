import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Feed from "pages/Feed";
import "./App.css";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import Profile from "pages/Profile";
import { createBrowserHistory } from "history";
import AppLayout from "components/common/AppLayout";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/feed" component={Feed} />
          {/*login*/}
          <Route exact path="/login" component={Login} />
          {/*sign-up*/}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/myprofile" component={Profile} />
          <Route path="/profile/:id">
            <Profile />
          </Route>
        </AppLayout>
      </Switch>
    </Router>
  );
}

export default App;
