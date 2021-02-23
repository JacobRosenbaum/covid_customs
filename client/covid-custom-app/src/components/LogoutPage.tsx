import { useState, useEffect, useContext } from 'react';
import '../assets/css/customer.css';
import Navbar from './Navbar';

function LogoutPage() {

  return (
    <>
      <Navbar/>
      <div className="sidenav">
        <a href="/account">My Info</a>
        <a href="/cart">View Cart</a>
        <a href="/order_history">Order History</a>
        <a href="/logout">Logout</a>
      </div>
      <div className="main">
        <h1>LOGOUT PAGE</h1>
      </div>
    </>

  );
}

export default LogoutPage