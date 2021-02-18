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
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <div >
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
          <Link to="/" className="navbar-brand">CovidCustoms</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/shopMask" className="nav-link">Shop</Link>
                </li>
                <li className="nav-item">
                  <Link to="/aboutUs" className="nav-link">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link to="/covidInfo" className="nav-link">Covid Info</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
     
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
