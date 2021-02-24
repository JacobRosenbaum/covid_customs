import { useState, useEffect, useContext } from 'react';
import '../../assets/css/customer.css';
import Navbar from '../Navbar';
import OrderTable from '../Customer/OrderTable';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';


function Cart() {

  const auth = useContext(AuthContext);


  const [order, setOrder] = useState<any>({});
  const [error, setErrors] = useState<any>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/order/${auth.order.orderId}`)
      .then(response => response.json())
      .then(data => setOrder(data))
      .catch(error => console.log(error));
  }, []);


  console.log(auth.order);
  //console.log(order);

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
        <h1>Cart</h1>
    

        {auth.order.masks[0].quantity != 0 ? 
          
          (


        <>
      <h6>orderId: {auth.order.orderId}</h6>
      <table className="table">
        <tbody>
          <tr>
            <th>Mask</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Ext. Cost</th>
          </tr>

          {auth.order.masks.map((mask:any) => (
            
          <tr >
            <td>
              <img id='mask' src={process.env.PUBLIC_URL + mask.mask.image} alt="Mask" width="100"/>
            </td>
            <td>$ {mask.mask.cost.toFixed(2)}</td>
            <td>{mask.quantity}</td>
            <td><strong>$ {(mask.mask.cost * mask.quantity).toFixed(2)}</strong></td>
          </tr>

      ))}
        
        <tr className="bg-warning">
          <td><strong>TOTAL</strong></td>
          <td></td>
          <td></td>
          <td><strong>$ {auth.order.total.toFixed(2)}</strong></td>
        </tr>

         </tbody> 
      </table>
      
      <Link className="cartLink" to="/cart">{auth.order.purchaseDate ? "":"View Order In Cart"}</Link>
    </>

) : (<h2>No Orders To View</h2>)}
        

      </div>
    </>

  );
}

export default Cart