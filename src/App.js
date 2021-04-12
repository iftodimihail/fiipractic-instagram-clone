import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase, { auth, db } from "utils/firebase";
import createActivityDetector from "activity-detector";

import Home from "pages/Home";
import SignUp from "pages/SignUp";
import LogIn from "pages/LogIn";
import Profile from "pages/Profile";
import Messages from "pages/Messages";
import AppLayout from "components/common/AppLayout";

function useIdle() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const activityDetector = createActivityDetector();
    activityDetector.on("active", () => setIsIdle(false));
    activityDetector.on("idle", () => setIsIdle(true));
    return () => activityDetector.Detector?.stop();
  }, []);
  return isIdle;
}

function App() {
  const [authentication, setAuthentication] = useState({
    loggedIn: false,
    loading: true,
  });

  const isIdle = useIdle();

  if (!isIdle && authentication.loggedIn) {
    db.collection("users").doc(auth.currentUser.uid).set(
      {
        userLastActive: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthentication({
          loggedIn: true,
          loading: false,
        });
      } else {
        setAuthentication({
          loggedIn: false,
          loading: false,
        });
      }
    });
  }, [setAuthentication]);

  if (authentication.loading) return null;
  return authentication.loggedIn ? (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Redirect to="/" />
        </Route>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/direct" component={Messages} />
          <Route path="/profile/:username">
            <Profile />
          </Route>
        </AppLayout>
      </Switch>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
