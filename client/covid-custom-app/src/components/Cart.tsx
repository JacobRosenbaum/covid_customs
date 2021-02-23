import { useState, useEffect, useContext } from 'react';
import '../assets/css/customer.css';
import Navbar from './Navbar';
import OrderTable from './OrderTable';
import AuthContext from './AuthContext';

function Cart() {

  const auth = useContext(AuthContext);
  console.log(auth.orderId);

  return (
    <>
    <Navbar/>
      <div className="main">
        <h1>Cart</h1>

      </div>
    </>

  );
}

export default Cart