import { useState, useEffect, useContext } from 'react';
import '../assets/css/customer.css';
import AuthContext from './AuthContext';


function OrderTable(props:any) {

  const [masks, setMasks] = useState<any[]>([]);
  const [total, setTotal] = useState<any>(0);


 



  // useEffect(() => {

  // }, []);

  console.log("all masks per order:")
  console.log(props.order.masks);


  return (
    <>
      <div className="sidenav">
        <a href="/account">My Info</a>
        <a href="/cart">View Cart</a>
        <a href="/order_history">Order History</a>
        <a href="/logout">Logout</a>
      </div>
      <h6>orderId: {props.order.orderId}</h6>
      <table className="table">
        <tbody>
          <tr>
            <th>Mask</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Ext. Cost</th>
          </tr>

          {props.order.masks.map((mask:any) => (
            
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
          <td><strong>$ {props.order.total.toFixed(2)}</strong></td>
        </tr>

         </tbody> 
      </table>
      
      <a className="cartLink" href="/cart">{props.order.purchaseDate ? "":"View Order In Cart"}</a>
    </>

  );

}

export default OrderTable;