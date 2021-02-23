import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './assets/css/app.css';
import { useHistory } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import About from './components/About';
import CovidAPI from './components/CovidAPI';
import Mask from './components/Mask';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import AuthContext, { AuthContextInterface } from './components/AuthContext';

import AdminCustomers from './components/Admin/AdminCustomers';
import AdminMasks from './components/Admin/AdminMasks';
import AdminOrders from './components/Admin/AdminOrders';
import MaskAdd from './components/Admin/MaskAdd';
import MaskEdit from './components/Admin/MaskEdit';
import { useState, useEffect } from 'react';

import CustomerAccount from './components/CustomerAccount';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import LogoutPage from './components/LogoutPage';
import EditCustomer from './components/EditCustomer';


function App() {
  interface User {
    email: string;
    roles: String[];
    token: string;
  }

  const [user, setUser] = useState({} as User);
  const [customerId, setCustomerId] = useState<number>(0);
  const [customer, setCustomer] = useState<[]>([]);
  const [customerName, setCustomerName] = useState<string>('Loyal Customer');
  const [order, setOrder] = useState<[]>([]);
  const history = useHistory();

  useEffect(() => {
    findCustomerByCustomerEmail();
  }, [user]);

  useEffect(() => {
    findOrderByCustomerId()
  }, [customerId]);

  const updateOrder = (order: any) => {
    setOrder(order)
  }

  const findCustomerByCustomerEmail = async () => {
    console.log(auth.user.email);
    console.log(user.email);
    try {
      const response = await fetch(`http://localhost:8080/api/customer/email/${auth.user.email}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.user.token}`
        },
      })
      const data = await response.json();
      if (response.status === 200) {
        setCustomerId(data.customerId)
        setCustomer(data)
        setCustomerName(data.firstName)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findOrderByCustomerId = async () => {
    console.log(auth.user);
    console.log(auth.customerId);

    try {
      console.log(auth.user.token);
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
          console.log(customer)
          console.log(data[0])
          updateOrder(data[0])

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
      customer: auth.customer,
      masks: [
        {
          maskId: 1,
          quantity: 1
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
      if (response.status === 201 || response.status === 400) {
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

    } else if (response.status === 403) {
      throw new Error('Bad username or password');
    } else {
      throw new Error('There was a problem logging in...');
    }
  }


  const logout = () => {
    setUser({} as User);
    setOrder([]);
    history.push('/');
  }

  const auth: AuthContextInterface = {
    user,
    login,
    authenticate,
    logout,
    customerId,
    customer,
    order,
    customerName,
    updateOrder
  }

  const adminExists = () => {
    console.log(user.email);
    if (user.email!==undefined)
    {if (user.roles[0] == "ROLE_ADMIN"){
      return true;
    }
    } 
    return false;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Switch>
          <Route exact path="/admin">
            <Redirect to="/admin/masks" />
          </Route>


          <Route exact path="/admin/masks/add">
            {adminExists() ? (<MaskAdd />) : (<Redirect to="/login" />)}
          </Route>
          <Route path="/admin/masks/edit/:maskId">
            {adminExists() ? (<MaskEdit />) : (<Redirect to="/login" />)}
          </Route>

          <Route exact path="/admin/masks">
            {adminExists()? (<AdminMasks />) : (<Redirect to="/login" />)}
          </Route>

          <Route exact path="/admin/orders">
            {adminExists() ? (<AdminOrders />) : (<Redirect to="/login" />)}
          </Route>

          <Route exact path="/admin/customers">
            {adminExists()? (<AdminCustomers />) : (<Redirect to="/login" />)}
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

          <Route exact path="/account">
            <CustomerAccount />
          </Route>

          <Route exact path="/edit_customer">
            <EditCustomer />
          </Route>

          <Route exact path="/order_history">
            <OrderHistory />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route exact path="/logout">
            <LogoutPage />
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