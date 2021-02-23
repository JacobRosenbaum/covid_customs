import { useState, useEffect, useContext } from 'react';
import '../../assets/css/customer.css';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';


function LogoutPage() {

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
        <h1>LOGOUT PAGE</h1>
      </div>
    </>

  );
}

export default LogoutPage