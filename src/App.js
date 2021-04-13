import React from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AllUsers from "./pages/AllUsers";
import UserPage from "./pages/UserPage";
import AppLayout from "./components/common/AppLayout";
// import AuthLayout from "./components/common/AuthLayout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";

const history = createBrowserHistory();

function App({ username }) {
  return (
    <div className="App" history={history}>
      <Router>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Login} />

          <AppLayout>
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/all-users" component={AllUsers} />
            <Route exact path={`/profile/${username}`} component={UserPage} />
          </AppLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
