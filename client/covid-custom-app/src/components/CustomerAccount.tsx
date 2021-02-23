import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Navbar from './Navbar';
import OrderHistory from './OrderHistory';


function CustomerAccount() {

  // var testCustomer: any = {
  //   customerId: 1,
  // }

  const [customer, setCustomer] = useState<any>([]);
  const [activeOrder, setActiveOrder] = useState<any>([]);

  const [error, setErrors] = useState<any>([0]);



  //setCustomer(testCustomer);

  // useEffect( () => {
  //   fetch(`http://localhost:8080/api/customer/${customer.customerId}`)
  //     .then(response => response.json())
  //     .then(data => setCustomer(data))
  //     .catch(error => console.log(error));
  // },[]);


  useEffect(() => {
    fetch('http://localhost:8080/api/customer/1')
      .then(response => response.json())
      .then(data => setCustomer(data))
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    fetch('http://localhost:8080/api/order/1')
      .then(response => response.json())
      .then(data => setActiveOrder(data))
      .catch(error => console.log(error));
  }, []);


  return (
    <>
      <Navbar/>
      <div className="sidenav">
        <div >
          <h1>Here lie thy customer account</h1>
          <Button>Active Orders</Button>
        </div>
        <div>
          <Button>Order History</Button>
        </div>
        <div>
          <Button>My Info</Button>
            <div>
              <h6>ID: {customer.customerId}</h6>
              <h6>Email: {customer.email}</h6>
              <h6>First: {customer.firstName}</h6>
              <h6>Last: {customer.lastName}</h6>
              <h6>Role: {customer.role}</h6>
            </div>
            <OrderHistory/>
        </div>
      </div>
      
    
      
      
    </>

);




 
};

export default CustomerAccount;