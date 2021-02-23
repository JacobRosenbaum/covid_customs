import { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import AuthContext from './AuthContext';
import '../assets/css/customer.css';
import Button from 'react-bootstrap/esm/Button';

//must login then declare const auth to get credentials of user

function CustomerAccount() {

  // var testCustomer: any = {
  //   customerId: 1,
  // }


  const auth = useContext(AuthContext);

  console.log(auth.customerId)


  const [customer, setCustomer] = useState<any>([]);
  const [activeOrder, setActiveOrder] = useState<any>([]);
  const [error, setErrors] = useState<any>([0]);

  //setCustomer(auth.user);



  //setCustomer(testCustomer);

  useEffect( () => {
    fetch(`http://localhost:8080/api/customer/${auth.customerId}`)
      .then(response => response.json())
      .then(data => setCustomer(data))
      .catch(error => console.log(error));
  },[]);


  // useEffect(() => {
  //   fetch('http://localhost:8080/api/customer/1')
  //     .then(response => response.json())
  //     .then(data => setCustomer(data))
  //     .catch(error => console.log(error));
  // }, []);





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