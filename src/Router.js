import React from 'react';
import Feed  from './pages/Feed';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return <BrowserRouter>
    <Switch>
      <Route path="/">
        <Feed />
      </Route>
    </Switch>
  </BrowserRouter>;
}

export default App;
