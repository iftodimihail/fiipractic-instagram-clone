import React, {useState} from "react";
import Layout from 'components/layout/Layout';

import Home from "pages/Home";
import Login from 'pages/Login';

function App() {
  const [auth, setAuth] = useState(true);

  return auth ? 
    <Layout>
      {/* home */}
      {/* <Home /> */}
      <Home/>
      {/* login */}
      {/* sign-up */}
      {/* my-profile */}
    </Layout>
   : 
    <Login/>
}

export default App;
