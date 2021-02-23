import { useState, useEffect, useContext } from 'react';
import '../assets/css/customer.css';
import Navbar from './Navbar';
import OrderTable from './OrderTable';

function Cart() {

  return (
    <>
    <Navbar/>
      <div className="main">
        <h1>Cart</h1>
        {/* <OrderTable order={}/> */}
      </div>
    </>

  );
}

export default Cart