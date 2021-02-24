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
import CovidAPI from './components/CovidApi/CovidAPI';
import Mask from './components/Mask';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import AuthContext, { AuthContextInterface } from './components/AuthContext';
import { MaskInterface, Order, Customer } from './components/Interfaces';

import AdminCustomers from './components/Admin/AdminCustomers';
import AdminMasks from './components/Admin/AdminMasks';
import AdminOrders from './components/Admin/AdminOrders';
import MaskAdd from './components/Admin/MaskAdd';
import MaskEdit from './components/Admin/MaskEdit';
import { useState, useEffect } from 'react';

import CustomerAccount from './components/Customer/CustomerAccount';
import OrderHistory from './components/Customer/OrderHistory';
import Cart from './components/Cart/Cart';
import LogoutPage from './components/Customer/LogoutPage';
import EditCustomer from './components/Customer/EditCustomer';


function App() {
  interface User {
    email: string;
    roles: String[];
    token: string;
  }

  const [user, setUser] = useState({} as User);
  const [customerId, setCustomerId] = useState<number>(0);
  const [customer, setCustomer] = useState({} as Customer);
  const [customerName, setCustomerName] = useState<string>('Loyal Customer');
  const [order, setOrder] = useState({} as Order);
  const history = useHistory();

  useEffect(() => {
    if (user.email == undefined) {
      // console.log('no user')
    }
    else {
      findCustomerByCustomerEmail()
    }
  }, [user]);

  useEffect(() => {
    if (customer.email == undefined) {
      // console.log('no customer')
      // console.log(auth.customer);
    }
    else {
      findOrderByCustomerId()
    }
  }, [customer]);



  useEffect(() => {
    if (!auth.order.purchased) {
      // console.log('no Order')
      // console.log(auth.order);
    }
    else {
      findOrderByCustomerId()
    }
  }, [order]);



  const updateOrder = (order: any) => {
    setOrder(order)
  }

  const updateCustomer = (customer: any) => {
    setCustomer(customer)
  }

  const findCustomerByCustomerEmail = async () => {

    try {
      const response = await fetch(`http://localhost:8080/api/customer/email/${auth.user.email}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.user.token}`
        },
      })
      if (response.status === 200) {
        const data = await response.json();
        setCustomerId(data.customerId)
        setCustomer(data)
        setCustomerName(data.firstName)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findOrderByCustomerId = async () => {

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

        console.log(data)
        let orderData= null;

        for (let i = 0; i < data.length; i++) {
          if (!data[i].purchased) {
            orderData= data[i];
            break;
          }
        }
        console.log(orderData);
        if (orderData){
          updateOrder(orderData);
        }
        else{
          addOrder()
        }
      }
      else {
        console.log(response)
      }
    } catch (error) {
      //console.log(error + ' EMPTY CART');
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
    const newOrder: Order = {
      orderId: 0,
      customer: auth.customer,
      masks: [
        {
          mask: {
            maskId: 1,
            material: "POLY_COT",
            style: "ATHLETIC",
            colors: [
              "RED"
            ],
            cost: 0.00,
            custom: false,
            image: "",
            deleted: false
          },
          quantity: 0
        }
      ],
      total: 0,
      purchased: false,
      purchaseDate: undefined
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

      if (response.status === 201 || response.status === 400) {
        const data = await response.json();
        if (response.status === 201) {
          console.log(response.status + ' hit message')
          console.log(data)
          setOrder(data)
        } else if (response.status === 400) {
          console.log(response)
        }
      } else {
        console.log(response.status)
        let message = 'Error Error! Sorry:(';
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
    setOrder({} as Order);
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
    updateOrder,
    updateCustomer
  }

  const adminExists = () => {
    if (user.email !== undefined) {
      if (user.roles[0] == "ROLE_ADMIN") {
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
            {adminExists() ? (<AdminMasks />) : (<Redirect to="/login" />)}
          </Route>

          <Route exact path="/admin/orders">
            {adminExists() ? (<AdminOrders />) : (<Redirect to="/login" />)}
          </Route>

          <Route exact path="/admin/customers">
            {adminExists() ? (<AdminCustomers />) : (<Redirect to="/login" />)}
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
            {auth.customerId ? (<CustomerAccount/>):(<Login/>)}
          </Route>

          <Route exact path="/edit_customer">
            <EditCustomer />
          </Route>

          <Route exact path="/order_history">
            <OrderHistory />
          </Route>

          <Route exact path="/cart">
          {auth.customerId ? ( <Cart />) : (<Redirect to="/login" />)}
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