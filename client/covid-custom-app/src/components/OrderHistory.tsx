import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Navbar from './Navbar';
import OrderTable from './OrderTable';


function OrderHistory() {

  // var testCustomer: any = {
  //   customerId: 1,
  // }

  const [customer, setCustomer] = useState<any>([]);
  const [orders, setOrders] = useState<any[]>([]);

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
    fetch('http://localhost:8080/api/order/customer/1')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.log(error));
  }, []);



  return (
    <>
      <Navbar />
      <div>
        <div >
          <h1>Here lie thy Order History</h1>
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