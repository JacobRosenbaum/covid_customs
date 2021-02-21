import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './assets/css/app.css'

import jwt_decode from 'jwt-decode';
import About from './components/About';
import CovidAPI from './components/CovidAPI';
import Mask from './components/Mask';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import AuthContext from './components/AuthContext';
import { useState } from 'react';


function App() {

  const [user, setUser] = useState(null);

  const login = (token: any) => {
    // {
    //   "iss": "todos",
    //   "sub": "smashdev",
    //   "appUserId": 1,
    //   "authorities": "ROLE_USER",
    //   "exp": 1605235902
    // }
    const { appUserId, sub: username, authorities }: any = jwt_decode(token);
    const roles = authorities.split(',');

    const user: any = {
      appUserId,
      username,
      roles,
      token,
      hasRole(role: any) {
        return this.roles.includes(role);
      }
    }

    setUser(user);
    console.log(user)
  }

  const authenticate = async (username: any, password: any) => {
    const response = await fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.status === 200) {
      const { jwt_token } = await response.json();
      login(jwt_token);
    } else if (response.status === 403) {
      throw new Error('Bad username or password');
    } else {
      throw new Error('There was a problem logging in...');
    }
  }

  const logout = () => {
    setUser(null);
  }

  const auth: any = {
    user,
    login,
    authenticate,
    logout
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Switch>
          <Route path="/aboutUs">
            <About />
          </Route>
          <Route path="/register">
          <Register />
        </Route>
          <Route path="/login">
            <Login />
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
    </AuthContext.Provider>

  );
};

export default App;
