import React, { Profiler, useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import SignUp from "pages/SignUp";
import { createBrowserHistory } from "history";
import LoginPage from "pages/LoginPage";
import Profile from "pages/Profile";
import AppLayout from "components/common/AppLayout";
import { auth } from "utils/firebase";

const history = createBrowserHistory();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
      const unsubcribe = auth.onAuthStateChanged((authUser) => {
        setUser(authUser);
      });

      return () => unsubcribe();
  }, [user]);

  return (
  <Router history={history}>
     <Switch>
       <Route exact path="/signup" component={SignUp}/>
       <Route exact path="/login" component={LoginPage}/>
       <AppLayout displayName={user?.displayName} email={user?.email}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/profile" component={ () => <Profile displayName={user?.displayName} />}/>
       </AppLayout>
     </Switch>
  </Router>
  );
}

export default App;
