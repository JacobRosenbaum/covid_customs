import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Navbar from './Navbar';
import OrderTable from './OrderTable';
import '../assets/css/customer.css';
import AuthContext from './AuthContext';


function OrderHistory() {


  //const [customer, setCustomer] = useState<any>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [error, setErrors] = useState<any>([0]);

  const auth = useContext(AuthContext);


  //setCustomer(testCustomer);

  // useEffect( () => {
  //   fetch(`http://localhost:8080/api/customer/${customer.customerId}`)
  //     .then(response => response.json())
  //     .then(data => setCustomer(data))
  //     .catch(error => console.log(error));
  // },[]);


  // useEffect(() => {
  //   fetch('http://localhost:8080/api/customer/1')
  //     .then(response => response.json())
  //     .then(data => setCustomer(data))
  //     .catch(error => console.log(error));
  // }, []);

  console.log(auth.customerId);

  useEffect(() => {
    fetch(`http://localhost:8080/api/order/customer/${auth.customerId}`)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.log(error));
  }, []);


console.log(orders);


  return (
    <>
      <Navbar />
      <div className="sidenav">
        <a href="/account">My Info</a>
        <a href="/cart">View Cart</a>
        <a href="/order_history">Order History</a>
        <a href="/logout">Logout</a>
      </div>
      <div>
        <div className="main">
          <h1>Order History</h1>
          <div className="accordion">
            {orders.map(order => (
              <div key={order.orderId}>
                  <div className="accordion-item" >
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+order.orderId} aria-expanded="false" aria-controls={"collapse"+order.orderId}>
                        Order: {order.orderId} - {order.purchaseDate ? (order.purchaseDate) : ("Active")}
                      </button>
                    </h2>
                    <div id={"collapse"+order.orderId} className="accordion-collapse collapse" aria-labelledby={"heading"+order.orderId} >
                      <div className="accordion-body">
                        <OrderTable order={order}/>
                    </div>
                  </div>
                </div>
              </div>





            ))}

          </div>
        </div>
      </div>




    </>

  );
};

export default OrderHistory;