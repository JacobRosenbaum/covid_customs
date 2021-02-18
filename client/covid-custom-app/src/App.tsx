import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import About from './components/About';
import CovidAPI from './components/CovidAPI';
import Mask from './components/Mask';
import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/aboutUs">
          <About />
        </Route>
        <Route path="/shopMask">
          <Mask />
        </Route>
        <Route path="/covidInfo">
          <CovidAPI />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>


  );
};

export default App;
