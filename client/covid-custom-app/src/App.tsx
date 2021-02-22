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
import { useState, useEffect } from 'react';
import moment from 'moment';


function App() {
  interface User {
    email: string;
    roles: string;
    token: string;
  }

  const [user, setUser] = useState({} as User);
  const [customerId, setCustomerId] = useState<number>(0);
  const [customer, setCustomer] = useState<any[]>([]);
  const [order, setOrder] = useState<any[]>([]);
  const [orderId, setOrderId] = useState<number>(0);

  useEffect(() => {
    findCustomerByCustomerEmail();
  }, [user]);

  useEffect(() => {
    findOrderByCustomerId()
  }, [customerId]);


  const findCustomerByCustomerEmail = async () => {
    console.log(auth.user.email);
    console.log(user.email);
    try {
      const response = await fetch(`http://localhost:8080/api/customer/email/${auth.user.email}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      const data = await response.json();
      if (response.status === 200) {
        setCustomerId(data.customerId)
        setCustomer(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findOrderByCustomerId = async () => {
    console.log(auth.user);
    console.log(auth.customerId);

    try {
      const response = await fetch(`http://localhost:8080/api/order/customer/${auth.customerId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.user.token}`
        },
      })
      const data = await response.json();
      if (response.status === 200) {
        if (data[0].orderId) {
          setOrderId(data[0].orderId);
          console.log(data[0].orderId)
          console.log(customer)
        }
        else {
          console.log('here')
        }
      }
      else {
        console.log(response)
      }
    } catch (error) {
      console.log(error + ' EMPTY CART');
      const errorString = error.toString();
      if (errorString.includes('SyntaxError: Unexpected end of JSON input')) {
        addOrder()
      }
      else {
        console.log(error + ' error does not represent empty cart... look into it')
      }
    }
  };

  async function addOrder() {
    const newOrder = {
      orderId: auth.orderId,
      customer: auth.customer,
      masks: [
        {
          maskId: 0,
          quantity: 0
        }
      ],
      total: 0.00,
      purchased: false,
      purchaseDate: null
    };
    const body = JSON.stringify(newOrder);
    try {
      const response = await fetch('http://localhost:8080/api/order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.user.token}`
        },
        body
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 400) {
        console.log(response.status + ' hit message')
        console.log(data)
        setOrder(data)
      } else {
        console.log(response.status)
        let message = 'Error Error! Sorry:(';
        // setErrors(message)
        throw new Error(message);
      }
    } catch (e) {
      console.log(e);
    };
  }

  const login = (token: string) => {

    const { sub: email, authorities }: any = jwt_decode(token);
    const roles = authorities.split(',');

    const userObject: User = {
      email,
      roles,
      token,
    }

    setUser(userObject)

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
      // console.log(auth.user.token)
      // findCustomerByCustomerEmail()

    } else if (response.status === 403) {
      throw new Error('Bad username or password');
    } else {
      throw new Error('There was a problem logging in...');
    }
  }

  const logout = () => {
    setUser({} as User);
  }

  const auth: any = {
    user,
    login,
    authenticate,
    findCustomerByCustomerEmail,
    findOrderByCustomerId,
    logout,
    customerId,
    orderId,
    customer,
    order
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