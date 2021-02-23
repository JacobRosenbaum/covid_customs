import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Navbar from '../Navbar';
import OrderTable from './OrderTable';
import '../../assets/css/customer.css';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';



function OrderHistory() {

  const [orders, setOrders] = useState<any[]>([]);
  const [error, setErrors] = useState<any>([0]);
  const auth = useContext(AuthContext);

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
        <Link to="/account">My Info</Link>
        <Link to="/cart">View Cart</Link>
        <Link to="/order_history">Order History</Link>
        <Link to="/logout">Logout</Link>
      </div>
      <div>
        <div className="main">
          <h1>Order History</h1>
          {auth.order.masks ? 
          
          (

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
          
          ) : (<h2>No Orders To View</h2>)}
          
        </div>
      </div>




    </>

  );
};

export default OrderHistory;