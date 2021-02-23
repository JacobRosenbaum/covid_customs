import { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import AuthContext from './AuthContext';
import '../assets/css/customer.css';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

//must login then declare const auth to get credentials of user

function CustomerAccount() {

  // var testCustomer: any = {
  //   customerId: 1,
  // }


  const auth = useContext(AuthContext);


  const [customer, setCustomer] = useState<any>([]);
  const [error, setErrors] = useState<any>([0]);


  useEffect( () => {
    fetch(`http://localhost:8080/api/customer/${auth.customerId}`)
      .then(response => response.json())
      .then(data => setCustomer(data))
      .catch(error => console.log(error)); //set errors here?
  },[]);




//all links in my sideNav need to be <Link to=/abc.src /> because my current setup causes a refresh which loses my auth.user


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
        <h1><strong>Customer Account</strong></h1>
        <h4><strong>Account #:</strong> {customer.customerId}</h4>
        <h4><strong>Name:</strong> {auth.user.firstName} {customer.lastName}</h4>
        <h4><strong>Email(username):</strong> {customer.email}</h4>
        <h4><strong>Phone:</strong> {customer.phone}</h4>
        <h4><strong>Address Line 1:</strong> {customer.addressLine}</h4>
        <h4><strong>Address Line 2:</strong> {customer.city}, {customer.state} {customer.zipCode}</h4>
        <Button>Update Contact Information</Button>

        
      </div>
      

      

    </>

);




 
};

export default CustomerAccount;