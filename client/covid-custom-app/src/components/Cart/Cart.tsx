import { useState, useEffect, useContext } from 'react';
import '../../assets/css/customer.css';
import Navbar from '../Navbar';
import OrderTable from '../Customer/OrderTable';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';


function Cart() {

  const auth = useContext(AuthContext);
  //console.log(auth.orderId);

  return (
    <>
    <Navbar/>
    <div className="sidenav">
        <Link to="/account">My Info</Link>
        <Link to="/cart">View Cart</Link>
        <Link to="/order_history">Order History</Link>
        <Link to="/logout">Logout</Link>
      </div>
      <div className="main">
        <h1>Cart</h1>
        

      </div>
    </>

  );
}

export default Cart