import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import About from './components/About';
import CovidAPI from './components/CovidAPI';
import Mask from './components/Mask';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import AuthContext from './components/AuthContext';
import AdminCustomers from './components/Admin/AdminCustomers';
import AdminMasks from './components/Admin/AdminMasks';
import AdminOrders from './components/Admin/AdminOrders';
import MaskAdd from './components/Admin/MaskAdd';
import MaskEdit from './components/Admin/MaskEdit';
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
        <Route exact path="/admin">
          <Redirect to="/admin/masks" />
        </Route>
        <Route exact path="/admin/masks/add">
            <MaskAdd />
        </Route>
        <Route path="/admin/masks/edit/:maskId">
            <MaskEdit />
        </Route>
        <Route exact path="/admin/masks">
            <AdminMasks />
        </Route>
        <Route exact path="/admin/orders">
            <AdminOrders />
        </Route>
        <Route exact path="/admin/customers">
            <AdminCustomers />
        </Route>
          <Route exact path="/aboutUs">
            <About />
          </Route>
          <Route exact path="/register">
          <Register />
        </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/shopMask">
            <Mask />
          </Route>
          <Route exact path="/covidInfo">
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
